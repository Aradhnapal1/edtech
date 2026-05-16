(function() {
    'use strict';

    // IMMEDIATE CHECK - Run before DOMContentLoaded for faster execution
    checkAuthStatusImmediate();

    let fetchedDisplayName = null;

    // Also check on DOMContentLoaded for safety
    document.addEventListener('DOMContentLoaded', function() {
        checkAuthStatus();
        initLoginForm();
        
        // Failsafe for off-canvas mobile menus that might generate dynamically after DOM load
        setTimeout(checkAuthStatus, 500);
        setTimeout(checkAuthStatus, 2000);
        // Removed initRegisterForm() as it's handled in separate script below
    });

    // Function to decode JWT token
    function decodeJWT(token) {
        try {
            // Split the token into parts
            const parts = token.split('.');
            if (parts.length !== 3) {
                console.error('Invalid token format');
                return null;
            }

            // Decode the payload (second part)
            const payload = parts[1];
            const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding JWT:', error);
            return null;
        }
    }

    // IMMEDIATE AUTH CHECK - Runs as soon as script loads (no expiration check)
    function checkAuthStatusImmediate() {
        const token = localStorage.getItem('authToken');
        
        if (token) {
            try {
                const decodedToken = decodeJWT(token);
                if (decodedToken) {
                    console.log('User is logged in (immediate check)');
                    console.log('Decoded Token Data:', decodedToken);
                    
                    // Try to update header immediately if element exists
                    const headerAuthButtons = document.getElementById('headerAuthButtons') || document.querySelectorAll('.header-top-bar-wrap__info-list')[1] || document.querySelector('.header-top-bar-wrap__info-list.d-none.d-lg-flex');
                    if (headerAuthButtons) {
                        updateHeaderForLoggedInUser(decodedToken);
                    }
                }
            } catch (error) {
                console.error('Error in immediate auth check:', error);
            }
        }
    }

    // Regular auth check (runs on DOMContentLoaded) - no expiration check
    function checkAuthStatus() {
        const token = localStorage.getItem('authToken');
        
        if (token) {
            console.log('User is logged in');
            console.log('Auth Token:', token);
            
            try {
                const decodedToken = decodeJWT(token);
                if (decodedToken) {
                    console.log('Decoded Token Data:', decodedToken);
                    updateHeaderForLoggedInUser(decodedToken);
                } else {
                    console.error('Failed to decode token - treating as invalid');
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userData');
                    restoreAuthButtons();
                }
            } catch (error) {
                console.error('Error parsing token data:', error);
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                restoreAuthButtons();
            }
        } else {
            console.log('User is not logged in');
            restoreAuthButtons();
        }
    }

    // Initialize login form
    function initLoginForm() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
    }

    // Removed empty handleRegister as it's handled in separate script below

    // Handle login form submission
    async function handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        
        if (!email || !password) {
            showAlert('Error', 'Please enter both email and password', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Logging in...';
            submitBtn.disabled = true;

            // Use apiCall for consistency (adds auth header if token exists, though not needed for login)
            const response = await window.apiCall('https://edtech.colaborazia.com/api/login', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            if (response.ok && data.token) {
                // Store token in 'authToken' variable name as requested
                localStorage.setItem('authToken', data.token);
                
                // Decode token to get user info
                const decodedToken = decodeJWT(data.token);
                if (decodedToken) {
                    // Store decoded user data
                    localStorage.setItem('userData', JSON.stringify(decodedToken));
                }

                console.log('Login successful!');
                console.log('Auth Token:', data.token);
                console.log('Decoded User Data:', decodedToken);

                showAlert('Success', 'Login successful!', 'success');

                // Close modal
                const loginModal = document.querySelector('#loginModal');
                if (loginModal) {
                    const bsModal = bootstrap.Modal.getInstance(loginModal);
                    if (bsModal) {
                        bsModal.hide();
                    }
                }

                // Update header immediately
                if (decodedToken) {
                    updateHeaderForLoggedInUser(decodedToken);
                }

                // Reset form
                e.target.reset();

                // Reload page after short delay to ensure all elements update
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                showAlert('Error', data.message || 'Login failed. Please check your credentials.', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showAlert('Error', 'An error occurred. Please try again later.', 'error');
            
            const submitBtn = e.target.querySelector('button[type="submit"]');
            submitBtn.innerHTML = 'Log In';
            submitBtn.disabled = false;
        }
    }

    // Update header for logged in user with settings dropdown
    function updateHeaderForLoggedInUser(tokenData) {
        const headerAuthButtons = document.getElementById('headerAuthButtons') || document.querySelectorAll('.header-top-bar-wrap__info-list')[1] || document.querySelector('.header-top-bar-wrap__info-list.d-none.d-lg-flex');
        const mobileAuthButtons = document.querySelectorAll('.offcanvas-user');
        
        if (headerAuthButtons || mobileAuthButtons.length > 0) {
            // Extract user name from token data
            // Priority: name > FirstName > UserName > email
            const userName = fetchedDisplayName || tokenData.name || 
                           tokenData.FirstName || 
                           tokenData.UserName || 
                           tokenData.email || 
                           'User';
            
            console.log('Updating header for user:', userName);
            
            const authHtml = (isMobile) => `
                <ul class="header-top-bar-wrap__info-list d-flex justify-content-${isMobile ? 'between' : 'center'} align-items-center flex-wrap w-100 m-0 p-0" style="list-style: none;">
                    <li style="display: flex; align-items: center; gap: 15px;">
                        <span class="headerWelcomeName" style="color: #ffffff; font-weight: 500; font-size: ${isMobile ? '16px' : 'inherit'};">Welcome, ${userName}</span>
                    </li>
                    <li style="position: relative; margin-left: ${isMobile ? 'auto' : '0'};">
                        <button class="userSettingsBtn" style="background: none; border: none; color: #ffffff; cursor: pointer; padding: 5px; font-size: 18px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-cog"></i>
                        </button>
                        
                        <!-- Dropdown Menu -->
                        <div class="userSettingsDropdown" style="
                            display: none;
                            position: absolute;
                            ${isMobile ? 'bottom: 150%; top: auto; margin-bottom: 10px;' : 'top: 450%; bottom: auto; margin-top: 10px;'}
                            right: 0;
                            background: #ffffff;
                            border: 1px solid #e0e0e0;
                            border-radius: 8px;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                            min-width: 200px;
                            z-index: 1000;
                            overflow: hidden;
                        ">
                            <div style="padding: 12px 16px; border-bottom: 1px solid #f0f0f0; background: #f8f9fa;">
                                <strong style="color: #333; font-size: 14px;">Account Settings</strong>
                            </div>
                            <ul style="list-style: none; margin: 0; padding: 8px 0;">
                                <li>
                                    <a href="dashboard-index.php" class="profileLink" style="
                                        display: flex;
                                        align-items: center;
                                        gap: 12px;
                                        padding: 12px 16px;
                                        color: #333;
                                        text-decoration: none;
                                        transition: background 0.2s;
                                        cursor: pointer;
                                    " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
                                        <i class="fas fa-user" style="color: #007bff; font-size: 16px;"></i>
                                        <span style="font-size: 14px; font-weight: 500;">Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <button class="logoutBtn" style="
                                        display: flex;
                                        align-items: center;
                                        gap: 12px;
                                        width: 100%;
                                        padding: 12px 16px;
                                        background: none;
                                        border: none;
                                        color: #dc3545;
                                        text-align: left;
                                        cursor: pointer;
                                        transition: background 0.2s;
                                        font-size: 14px;
                                        font-weight: 500;
                                    " onmouseover="this.style.background='#fff5f5'" onmouseout="this.style.background='transparent'">
                                        <i class="fas fa-sign-out-alt" style="color: #dc3545; font-size: 16px;"></i>
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            `;

            if (headerAuthButtons) {
                // Ensure the container is visible on mobile by removing hiding classes
                headerAuthButtons.classList.remove('d-none', 'd-lg-flex');
                headerAuthButtons.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'flex-wrap');
                headerAuthButtons.innerHTML = authHtml(false);
            }

            if (mobileAuthButtons.length > 0) {
                mobileAuthButtons.forEach(btnContainer => {
                    // Make sure spacing and borders match off-canvas aesthetics
                    btnContainer.style.padding = '15px 20px';
                    btnContainer.style.borderTop = '1px solid rgba(255,255,255,0.1)';
                    btnContainer.innerHTML = authHtml(true);
                });
            }

            initSettingsDropdown();
            initLogout();
            
            // Fetch latest display name from profile API
            fetchAndSetDisplayName();
        } else {
            console.warn('Header auth buttons element not found');
        }
    }

    // Initialize settings dropdown functionality
    function initSettingsDropdown() {
        const settingsBtns = document.querySelectorAll('.userSettingsBtn, #userSettingsBtn');
        const dropdowns = document.querySelectorAll('.userSettingsDropdown, #userSettingsDropdown');
        
        settingsBtns.forEach((settingsBtn, index) => {
            const dropdown = dropdowns[index];
            if (settingsBtn && dropdown) {
                // Toggle dropdown on button click
                settingsBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const isVisible = dropdown.style.display === 'block';
                    
                    // Close all other dropdowns
                    dropdowns.forEach(d => { if(d) d.style.display = 'none'; });
                    
                    dropdown.style.display = isVisible ? 'none' : 'block';
                    console.log('Settings dropdown toggled:', !isVisible);
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', function(e) {
                    if (!settingsBtn.contains(e.target) && !dropdown.contains(e.target)) {
                        dropdown.style.display = 'none';
                    }
                });

                // Prevent dropdown from closing when clicking inside it
                dropdown.addEventListener('click', function(e) {
                    if (e.target.id === 'logoutBtn' || e.target.classList.contains('logoutBtn') || e.target.closest('.logoutBtn')) {
                        // Allow logout button click to proceed
                        return;
                    }
                    if (e.target.id === 'profileLink' || e.target.classList.contains('profileLink') || e.target.closest('.profileLink')) {
                        // Allow profile link click to proceed
                        return;
                    }
                    e.stopPropagation();
                });

                console.log('Settings dropdown initialized');
            }
        });
    }

    // Initialize logout functionality
    function initLogout() {
        const logoutBtns = document.querySelectorAll('.logoutBtn, #logoutBtn');
        logoutBtns.forEach(logoutBtn => {
            if (logoutBtn) {
                logoutBtn.removeEventListener('click', handleLogout);
                logoutBtn.addEventListener('click', handleLogout);
                console.log('Logout button initialized');
            }
        });
    }

    // Fetch user profile and update display name
    async function fetchAndSetDisplayName() {
        const token = localStorage.getItem('authToken');
        if (!token) return;
        
        // Prevent redundant network calls
        if (fetchedDisplayName) {
            const welcomeSpans = document.querySelectorAll('.headerWelcomeName, #headerWelcomeName');
            welcomeSpans.forEach(span => { span.textContent = `Welcome, ${fetchedDisplayName}`; });
            return;
        }
        
        try {
            const response = await fetch("https://edtech.colaborazia.com/api/user/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const result = await response.json();
                if (result && result.user && result.user.displayName) {
                    fetchedDisplayName = result.user.displayName;
                    const welcomeSpans = document.querySelectorAll('.headerWelcomeName, #headerWelcomeName');
                    welcomeSpans.forEach(span => {
                        span.textContent = `Welcome, ${result.user.displayName}`;
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching user profile for header:', error);
        }
    }

    // Handle logout
    function handleLogout(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close dropdown
        const dropdowns = document.querySelectorAll('.userSettingsDropdown, #userSettingsDropdown');
        dropdowns.forEach(dropdown => {
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        });
        
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to logout?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, logout!',
                cancelButtonText: 'No, cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    performLogout();
                }
            });
        } else {
            if (confirm('Are you sure you want to logout?')) {
                performLogout();
            }
        }
    }

    // Perform logout
    function performLogout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        
        console.log('User logged out');
        console.log('Token cleared from localStorage');
        
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Logged Out!',
                text: 'You have been successfully logged out.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                restoreAuthButtons();
                window.location.href = 'index.php';
            });
        } else {
            alert('Logged out successfully!');
            restoreAuthButtons();
            window.location.href = 'index.php';
        }
    }

    // Restore auth buttons after logout
    function restoreAuthButtons() {
        const headerAuthButtons = document.getElementById('headerAuthButtons') || document.querySelectorAll('.header-top-bar-wrap__info-list')[1] || document.querySelector('.header-top-bar-wrap__info-list.d-none.d-lg-flex');
        const mobileAuthButtons = document.querySelectorAll('.offcanvas-user');

        if (headerAuthButtons) {
            // Ensure the container is visible on mobile by removing hiding classes
            headerAuthButtons.classList.remove('d-none', 'd-lg-flex');
            headerAuthButtons.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'flex-wrap');

            headerAuthButtons.innerHTML = `
                <li><button data-bs-toggle="modal" data-bs-target="#loginModal">Log in</button></li>
                <li><button data-bs-toggle="modal" data-bs-target="#registerModal">Register</button></li>
            `;
            console.log('Auth buttons restored');
        }
        
        if (mobileAuthButtons.length > 0) {
            mobileAuthButtons.forEach(btnContainer => {
                btnContainer.style.padding = '';
                btnContainer.style.borderTop = '';
                btnContainer.innerHTML = `
                    <div class="offcanvas-user__button">
                        <button class="offcanvas-user__login btn btn-secondary btn-hover-secondarys" data-bs-toggle="modal" data-bs-target="#loginModal">Log In</button>
                    </div>
                    <div class="offcanvas-user__button">
                        <button class="offcanvas-user__signup btn btn-primary btn-hover-primary" data-bs-toggle="modal" data-bs-target="#registerModal">Sign Up</button>
                    </div>
                `;
            });
        }
    }

    // Show alert function
    function showAlert(title, text, icon) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: title,
                text: text,
                icon: icon,
                confirmButtonColor: '#ff6b6b'
            });
        } else {
            alert(text);
        }
    }

    // API utility with token (unchanged - server may still reject expired tokens on API calls)
    window.apiCall = async function(url, options = {}) {
        const token = localStorage.getItem('authToken');
        
        const headers = {
            ...options.headers
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        return fetch(url, {
            ...options,
            headers: headers
        });
    };

    // REMOVED: window.checkTokenValidity function and periodic interval
    // REMOVED: visibilitychange listener for auth check

})();


// ------------------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Register API @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("registerForm");
  
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const firstName = document.getElementById("firstName").value.trim();
      const lastName  = document.getElementById("lastName").value.trim();
      const email     = document.getElementById("email").value.trim();
      const phone     = document.getElementById("phone").value.trim();
      const password  = document.getElementById("password").value.trim();
      const privacy   = document.getElementById("privacy").checked;
  
      if (!firstName || !lastName || !email || !phone || !password) {
        Swal.fire("Error", "All fields are required", "error");
        return;
      }
  
      if (!privacy) {
        Swal.fire("Warning", "Please accept Terms & Privacy Policy", "warning");
        return;
      }
  
      const formData = new FormData();
      formData.append("firstname", firstName);
      formData.append("lastname", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("role", "USER");
  
      try {
        // Fixed: Use https:// and apiCall for consistency (uses stored auth if present)
        const response = await window.apiCall("https://edtech.colaborazia.com/add-user", {
          method: "POST",
          body: formData
        });
  
        const result = await response.json();
  
        if (response.ok) {
          // 🎉 SweetAlert Success
          Swal.fire({
            title: "Registration Successful 🎉",
            text: "You can now login with your credentials",
            icon: "success",
            confirmButtonText: "Login Now"
          }).then(() => {
  
            registerForm.reset();
  
            // 🔴 Close Register Modal (Bootstrap)
            const registerModal = document.getElementById("registerModal");
            if (registerModal) {
              const modalInstance = bootstrap.Modal.getInstance(registerModal);
              modalInstance.hide();
            }
  
            // 🟢 Open Login Modal
            const loginModal = new bootstrap.Modal(
              document.getElementById("loginModal")
            );
            loginModal.show();
          });
  
        } else {
          Swal.fire("Failed", result.message || "Registration failed", "error");
        }
  
      } catch (error) {
        console.error(error);
        Swal.fire("Server Error", "Please try again later", "error");
      }
    });
  
  });


//   -----------------------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Contact Form API @@@@@@@@@@@@@@@@@@@@@@@@@@@@@


document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");
  
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const name   = document.getElementById("contactName").value.trim();
      const email  = document.getElementById("contactEmail").value.trim();
      const phone = document.getElementById("contactNumber").value.trim();
      const message = document.getElementById("contactMessage").value.trim();
  
      if (!name || !email || !phone || !message ) {
        Swal.fire("Error", "All fields are required", "error");
        return;
      }
  
  
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("contact", phone);
      formData.append("message", message);
  
      try {
        // Updated: Use apiCall for consistency (uses stored auth if present)
        const response = await window.apiCall("https://edtech.colaborazia.com/api/contact/create", {
          method: "POST",
          body: formData
        });
  
        const result = await response.json();
  
        if (response.ok) {
          // 🎉 SweetAlert Success
          Swal.fire("Success", "Message sent successfully", "success");
          contactForm.reset();
        } else {
          Swal.fire("Failed", result.message || "Registration failed", "error");
        }
  
      } catch (error) {
        console.error(error);
        Swal.fire("Server Error", "Please try again later", "error");
      }
    });
  
  });

// --------------------------------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Career Form code ----------------------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

document.addEventListener("DOMContentLoaded", () => {

    const careerForm = document.getElementById("careerForm");
  
    careerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const name    = document.getElementById("careerName").value.trim();
      const email   = document.getElementById("careerEmail").value.trim();
      const contact = document.getElementById("careerMobile").value.trim();
      const subject = document.getElementById("careerSubject").value.trim();
      const message = document.getElementById("careerMessage").value.trim();
      const resumeInput = document.getElementById("careerResume");
  
      // ✅ SAFE resume check
      const resume = resumeInput.files.length > 0 ? resumeInput.files[0] : null;
  
      // ✅ REQUIRED FIELD CHECK (CORRECT)
      if (!name || !email || !contact || !subject || !resume) {
        Swal.fire("Error", "All required fields must be filled", "error");
        return;
      }
  
      // ✅ Resume validation
      if (resume.type !== "application/pdf") {
        Swal.fire("Invalid File", "Only PDF files are allowed", "warning");
        return;
      }
  
      if (resume.size > 5 * 1024 * 1024) {
        Swal.fire("File Too Large", "Resume must be under 5MB", "warning");
        return;
      }
  
      // ✅ FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("contact", contact);
      formData.append("subject", subject);
      formData.append("message", message); // optional
      formData.append("resume", resume);
  
      try {
        // Updated: Use apiCall for consistency (uses stored auth if present)
        const response = await window.apiCall(
          "https://edtech.colaborazia.com/api/contact/career",
          {
            method: "POST",
            body: formData
          }
        );
  
        const result = await response.json();
  
        if (response.ok) {
          Swal.fire({
            title: "Application Submitted 🎉",
            text: "Your application has been sent successfully",
            icon: "success"
          });
          careerForm.reset();
        } else {
          Swal.fire("Failed", result.message || "Submission failed", "error");
        }
  
      } catch (error) {
        console.error(error);
        Swal.fire("Server Error", "Please try again later", "error");
      }
    });
  
  });




  