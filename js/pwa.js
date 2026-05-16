// 1. Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('✅ Service Worker registered successfully', reg.scope))
            .catch(err => console.error('❌ Service Worker registration failed', err));
    });
}

let deferredPrompt;

// Capture the install prompt event early (it might fire before DOMContentLoaded)
window.addEventListener('beforeinstallprompt', (e) => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    if (isStandalone) {
        return;
    }

    // If this event fires, it means the app is NOT installed (e.g., user uninstalled it).
    // Clear the pwaInstalled flag so they can see the prompt again.
    localStorage.removeItem('pwaInstalled');

    // Do not show prompt if user dismissed it
    if (localStorage.getItem('pwaPromptDismissed') === 'true') {
        return;
    }

    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    console.log('✅ beforeinstallprompt event fired!');
    
    // If the DOM is already loaded, show the prompt immediately
    const installPrompt = document.getElementById('pwaInstallPrompt');
    if (installPrompt) {
        installPrompt.classList.add('show');
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // 2. Inject PWA Install Prompt Styles
    const style = document.createElement('style');
    style.innerHTML = `
        .pwa-install-prompt {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ffffff;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            border-radius: 12px;
            padding: 15px;
            z-index: 9999;
            width: 90%;
            max-width: 400px;
            font-family: sans-serif;
            display: none; /* hidden by default */
        }
        .pwa-install-prompt.show {
            display: block;
            animation: slideUpPwa 0.4s ease-out forwards;
        }
        @keyframes slideUpPwa {
            from { bottom: -100px; opacity: 0; }
            to { bottom: 20px; opacity: 1; }
        }
        .pwa-install-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .pwa-install-icon-cell img {
            width: 45px;
            height: 45px;
            border-radius: 8px;
            object-fit: cover;
        }
        .pwa-install-text-cell {
            flex-grow: 1;
        }
        .pwa-install-text-cell strong {
            display: block;
            font-size: 15px;
            color: #333;
        }
        .pwa-install-text-cell p {
            margin: 2px 0 0 0;
            font-size: 13px;
            color: #666;
        }
        .pwa-install-btn {
            background: #007bff;
            color: #fff;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: background 0.2s;
        }
        .pwa-install-btn:hover {
            background: #0056b3;
        }
        .pwa-dismiss-btn {
            background: none;
            border: none;
            font-size: 24px;
            line-height: 1;
            color: #999;
            cursor: pointer;
            padding: 0 5px;
        }
    `;
    document.head.appendChild(style);

    // 3. Inject the HTML provided for the prompt
    const promptHTML = `
        <div class="pwa-install-prompt" id="pwaInstallPrompt">
            <div class="pwa-install-content">
                <div class="pwa-install-icon-cell">
                    <img class="pwa-install-icon" src="assets/images/favicon.webp" alt="EdTech">
                </div>
                <div class="pwa-install-text-cell">
                    <strong>Install EdTech</strong>
                    <p>Get quick access from your home screen</p>
                </div>
                <button class="pwa-install-btn" id="pwaInstallBtn">Install</button>
                <button class="pwa-dismiss-btn" id="pwaDismissBtn">×</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', promptHTML);

    // 4. Handle Installation Logic
    const installPrompt = document.getElementById('pwaInstallPrompt');
    const installBtn = document.getElementById('pwaInstallBtn');
    const dismissBtn = document.getElementById('pwaDismissBtn');

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    // Ensure prompt never shows if the user is using the standalone PWA
    if (isStandalone && installPrompt) {
        installPrompt.classList.remove('show');
    } else if (deferredPrompt && installPrompt) {
        // Show the prompt ONLY if the browser fired the install event (meaning it is not installed)
        if (localStorage.getItem('pwaPromptDismissed') !== 'true') {
            installPrompt.classList.add('show');
        }
    }

    // Handle the install button click
    installBtn.addEventListener('click', async () => {
        installPrompt.classList.remove('show');
        if (deferredPrompt) {
            // Show the native browser install prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            // Clear the saved prompt since it can't be used again
            deferredPrompt = null;
            if (outcome === 'accepted') {
                localStorage.setItem('pwaInstalled', 'true');
            }
        } else {
            // Graceful fallback if Chrome blocked the native prompt
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'info',
                    title: 'App Installation',
                    text: 'To install the app, click the install icon (monitor with a down arrow) on the right side of your browser URL bar. If it is not there, the app might already be installed.',
                    confirmButtonText: 'Got it!'
                });
            } else {
                alert("To install the app, click the install icon on the right side of your browser URL bar.");
            }
        }
    });

    // Handle the dismiss button click
    dismissBtn.addEventListener('click', () => {
        installPrompt.classList.remove('show');
        localStorage.setItem('pwaPromptDismissed', 'true');
    });

    // Log when the app is successfully installed
    window.addEventListener('appinstalled', () => {
        installPrompt.classList.remove('show');
        deferredPrompt = null;
        localStorage.setItem('pwaInstalled', 'true');
        console.log('✅ PWA was installed successfully');
    });
});