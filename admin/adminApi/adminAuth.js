// ==================== ADMIN LOGIN SCRIPT - CLEAN VERSION ====================

console.log("✅ Admin Auth Script Loaded Successfully!");

function initLoginScript() {
    
    const loginBtn = document.getElementById("loginBtn");
    
    if (!loginBtn) {
        console.error("❌ Error: loginBtn element not found!");
        return;
    }

    console.log("✅ Login button found, listener attached.");

    loginBtn.addEventListener("click", async () => {
        
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorBox = document.getElementById("loginError");

        // Reset error
        errorBox.style.display = "none";

        if (!email || !password) {
            errorBox.innerText = "Email and Password are required";
            errorBox.style.display = "block";
            return;
        }

        // Disable button
        loginBtn.disabled = true;
        loginBtn.innerText = "Logging in...";

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const loginApi = "https://edtech.colaborazia.com/api/login";

        try {
            const response = await fetch(loginApi, {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            console.log("Login Response:", result);

            if (result && result.success === true) {
                
                // Save token
                const token = result.token || 
                             result.access_token || 
                             (result.data && (result.data.token || result.data.access_token));

                if (token) {
                    localStorage.setItem('token', token);
                }

                // ==================== SWEET ALERT SUCCESS ====================
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'Welcome back!',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "index.php";   // Redirect after alert
                });

            } 
            else {
                const errorMsg = result.message || "Invalid email or password";
                errorBox.innerText = errorMsg;
                errorBox.style.display = "block";
            }

        } catch (error) {
            console.error("❌ Login Error:", error);
            errorBox.innerText = "Server error. Please try again later.";
            errorBox.style.display = "block";
        } 
        finally {
            // Re-enable button
            loginBtn.disabled = false;
            loginBtn.innerText = "Login";
        }
    });
}

// Safe DOM ready check
if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initLoginScript);
} else {
    initLoginScript();
}
