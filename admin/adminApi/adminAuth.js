
// ==================== ADMIN LOGIN SCRIPT - WITH ROLE CHECK ====================

console.log("✅ Admin Auth Script Loaded Successfully!");

// ✅ JWT Decode Function (no library needed)
function decodeJWT(token) {
    try {
        const base64Payload = token.split('.')[1];
        const decoded = atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decoded);
    } catch (e) {
        console.error("❌ JWT Decode Failed:", e);
        return null;
    }
}

function initLoginScript() {

    const loginBtn = document.getElementById("loginBtn");

    if (!loginBtn) {
        console.error("❌ Error: loginBtn element not found!");
        return;
    }

    loginBtn.addEventListener("click", async () => {

        const email    = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorBox = document.getElementById("loginError");

        errorBox.style.display = "none";

        if (!email || !password) {
            errorBox.innerText = "Email and Password are required";
            errorBox.style.display = "block";
            return;
        }

        loginBtn.disabled  = true;
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

                // ✅ Token extract karo
                const token = result.token ||
                              result.access_token ||
                              (result.data && (result.data.token || result.data.access_token));

                if (!token) {
                    errorBox.innerText = "Token not received. Please try again.";
                    errorBox.style.display = "block";
                    return;
                }

                // ✅ Token save karo localStorage mein (redirect se pehle)
                localStorage.setItem('token', token);

                // ✅ JWT decode karke role nikalo
                const decoded  = decodeJWT(token);
                const roleKey  = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
                const userRole = decoded ? decoded[roleKey] : null;

                console.log("User Role:", userRole);

                // ✅ Role check: sirf ADMIN ya SUPERADMIN allowed
                const allowedRoles = ["ADMIN", "SUPERADMIN"];

                if (allowedRoles.includes(userRole)) {

                    // ✅ ADMIN / SUPERADMIN → Success alert + redirect
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful!',
                        text: `Welcome, ${decoded.FirstName || userRole}!`,
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        window.location.href = "index.php";
                    });

                } else {

                    // ❌ USER role → token delete karo, access deny karo
                    localStorage.removeItem('token');

                    Swal.fire({
                        icon: 'error',
                        title: 'Access Denied!',
                        text: 'You do not have admin privileges to access this panel.',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#e74c3c'
                    });

                }

            } else {
                const errorMsg = result.message || "Invalid email or password";
                errorBox.innerText = errorMsg;
                errorBox.style.display = "block";
            }

        } catch (error) {
            console.error("❌ Login Error:", error);
            errorBox.innerText = "Server error. Please try again later.";
            errorBox.style.display = "block";
        } finally {
            loginBtn.disabled  = false;
            loginBtn.innerText = "Login";
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initLoginScript);
} else {
    initLoginScript();
}