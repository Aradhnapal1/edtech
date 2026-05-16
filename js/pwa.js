// 1. Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('✅ Service Worker registered successfully', reg.scope))
            .catch(err => console.error('❌ Service Worker registration failed', err));
    });
}

const PWA_INSTALLED_KEY = 'pwaInstalled';
const PWA_DISMISSED_KEY = 'pwaPromptDismissed';

let deferredPrompt = null;
let installCheckPromise = null;

function isRunningAsInstalledPwa() {
    return (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: fullscreen)').matches ||
        window.matchMedia('(display-mode: minimal-ui)').matches ||
        window.navigator.standalone === true
    );
}

async function detectInstalledRelatedApps() {
    if (!('getInstalledRelatedApps' in navigator)) {
        return false;
    }
    try {
        const relatedApps = await navigator.getInstalledRelatedApps();
        return relatedApps.length > 0;
    } catch (err) {
        console.warn('getInstalledRelatedApps failed', err);
        return false;
    }
}

async function isPwaInstalledOnDevice() {
    if (isRunningAsInstalledPwa()) {
        localStorage.setItem(PWA_INSTALLED_KEY, 'true');
        return true;
    }

    if (localStorage.getItem(PWA_INSTALLED_KEY) === 'true') {
        return true;
    }

    if ('getInstalledRelatedApps' in navigator) {
        const installedViaApi = await detectInstalledRelatedApps();
        if (installedViaApi) {
            localStorage.setItem(PWA_INSTALLED_KEY, 'true');
            return true;
        }
    }

    return false;
}

function refreshInstallCheck() {
    installCheckPromise = isPwaInstalledOnDevice();
    return installCheckPromise;
}

function getInstallCheck() {
    if (!installCheckPromise) {
        installCheckPromise = isPwaInstalledOnDevice();
    }
    return installCheckPromise;
}

function hideInstallPrompt() {
    const installPrompt = document.getElementById('pwaInstallPrompt');
    if (installPrompt) {
        installPrompt.classList.remove('show');
    }
}

async function shouldShowInstallPrompt() {
    if (await getInstallCheck()) {
        return false;
    }
    return localStorage.getItem(PWA_DISMISSED_KEY) !== 'true';
}

async function maybeShowInstallPrompt() {
    if (!(await shouldShowInstallPrompt()) || !deferredPrompt) {
        hideInstallPrompt();
        return;
    }
    const installPrompt = document.getElementById('pwaInstallPrompt');
    if (installPrompt) {
        installPrompt.classList.add('show');
    }
}

installCheckPromise = isPwaInstalledOnDevice();

window.addEventListener('beforeinstallprompt', async (e) => {
    if (localStorage.getItem(PWA_INSTALLED_KEY) === 'true') {
        hideInstallPrompt();
        return;
    }

    if (await refreshInstallCheck()) {
        hideInstallPrompt();
        return;
    }

    if (localStorage.getItem(PWA_DISMISSED_KEY) === 'true') {
        return;
    }

    e.preventDefault();
    deferredPrompt = e;

    if (await refreshInstallCheck()) {
        deferredPrompt = null;
        hideInstallPrompt();
        return;
    }

    await maybeShowInstallPrompt();
});

document.addEventListener('DOMContentLoaded', async () => {
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
            display: none;
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

    document.body.insertAdjacentHTML('beforeend', [
        '<div class="pwa-install-prompt" id="pwaInstallPrompt">',
        '<motion class="pwa-install-content">',
        '<motion class="pwa-install-icon-cell">',
        '<img class="pwa-install-icon" src="assets/images/favicon.webp" alt="EdTech">',
        '</motion>',
        '<motion class="pwa-install-text-cell">',
        '<strong>Install EdTech</strong>',
        '<p>Get quick access from your home screen</p>',
        '</motion>',
        '<button class="pwa-install-btn" id="pwaInstallBtn">Install</button>',
        '<button class="pwa-dismiss-btn" id="pwaDismissBtn">×</button>',
        '</motion>',
        '</div>'
    ].join('').replace(/<\/?motion/g, (tag) => tag.replace('motion', 'div')));

    const installPrompt = document.getElementById('pwaInstallPrompt');
    const installBtn = document.getElementById('pwaInstallBtn');
    const dismissBtn = document.getElementById('pwaDismissBtn');

    if (await refreshInstallCheck()) {
        hideInstallPrompt();
    } else if (deferredPrompt) {
        await maybeShowInstallPrompt();
        setTimeout(async () => {
            if (await refreshInstallCheck()) {
                hideInstallPrompt();
            }
        }, 800);
    }

    window.addEventListener('pageshow', async () => {
        if (await refreshInstallCheck()) {
            hideInstallPrompt();
        }
    });

    installBtn.addEventListener('click', async () => {
        installPrompt.classList.remove('show');
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            deferredPrompt = null;
            if (outcome === 'accepted') {
                localStorage.setItem(PWA_INSTALLED_KEY, 'true');
            } else if (await refreshInstallCheck()) {
                localStorage.setItem(PWA_INSTALLED_KEY, 'true');
            }
        } else if (await refreshInstallCheck()) {
            localStorage.setItem(PWA_INSTALLED_KEY, 'true');
        } else if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'info',
                title: 'App Installation',
                text: 'To install the app, use the install icon in your browser URL bar. If it is not there, the app may already be installed.',
                confirmButtonText: 'Got it!'
            });
        } else {
            alert('To install the app, use the install icon in your browser URL bar.');
        }
    });

    dismissBtn.addEventListener('click', () => {
        installPrompt.classList.remove('show');
        localStorage.setItem(PWA_DISMISSED_KEY, 'true');
    });

    window.addEventListener('appinstalled', () => {
        installPrompt.classList.remove('show');
        deferredPrompt = null;
        localStorage.setItem(PWA_INSTALLED_KEY, 'true');
        refreshInstallCheck();
    });
});
