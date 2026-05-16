<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Title -->
    <title>Hyperscripts</title>
    <!-- Favicon -->
    <!-- <link rel="shortcut icon" href="assets/images/favicon.webp" type="image/x-icon"> -->
    <link rel="shortcut icon" href="assets/images/logo/favicon.webp">

    <!-- Bootstrap -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <!-- file upload -->
    <link rel="stylesheet" href="assets/css/file-upload.css">
    <!-- file upload -->
    <link rel="stylesheet" href="assets/css/plyr.css">
    <!-- DataTables -->
    <link rel="stylesheet" href="https://cdn.datatables.net/2.0.8/css/dataTables.dataTables.min.css">
    <!-- full calendar -->
    <link rel="stylesheet" href="assets/css/full-calendar.css">
    <!-- jquery Ui -->
    <link rel="stylesheet" href="assets/css/jquery-ui.css">
    <!-- editor quill Ui -->
    <link rel="stylesheet" href="assets/css/editor-quill.css">
    <!-- apex charts Css -->
    <link rel="stylesheet" href="assets/css/apexcharts.css">
    <!-- calendar Css -->
    <link rel="stylesheet" href="assets/css/calendar.css">
    <!-- jvector map Css -->
    <link rel="stylesheet" href="assets/css/jquery-jvectormap-2.0.5.css">
    <!-- Main css -->
    <link rel="stylesheet" href="assets/css/main.css">
    <!-- SweetAlert2 CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
</head>
<script>
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
                        window.location.href = "index.php"; // Redirect after alert
                    });

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
</script>

<body>

    <!--==================== Preloader Start ====================-->
    <div class="preloader">
        <div class="loader"></div>
    </div>
    <!--==================== Preloader End ====================-->

    <!--==================== Sidebar Overlay End ====================-->
    <div class="side-overlay"></div>
    <!--==================== Sidebar Overlay End ====================-->

    <section class="auth d-flex">
        <div class="auth-left bg-main-50 flex-center p-24">
            <img src="assets/images/logo/auth-img.png" alt="">
        </div>

        <div class="auth-right py-40 px-24 flex-center flex-column">
            <div class="auth-right__inner mx-auto w-100">
                <a href="index.php" class="auth-right__logo">
                    <img src="assets/images/logo/hyperscripts.png" alt="">
                </a>

                <h2 class="mb-8">Welcome Back! 👋</h2>
                <p class="text-gray-600 text-15 mb-32">
                    Please sign in to your account and start the adventure
                </p>

                <!-- Error Message -->
                <div id="loginError" style="color:red; margin-bottom:10px; display:<?php echo !empty($login_error) ? 'block' : 'none'; ?>;"><?php echo htmlspecialchars($login_error); ?></div>

                <!-- Email -->
                <div class="mb-24">
                    <label class="form-label mb-8 h6">Email</label>
                    <div class="position-relative">
                        <input type="email" id="email" class="form-control py-11 ps-40" placeholder="Enter your email">
                        <span class="position-absolute top-50 translate-middle-y ms-16 text-gray-600">
                            <i class="ph ph-user"></i>
                        </span>
                    </div>
                </div>

                <!-- Password -->
                <div class="mb-24">
                    <label class="form-label mb-8 h6">Password</label>
                    <div class="position-relative">
                        <input type="password" id="password" class="form-control py-11 ps-40" placeholder="Enter password">
                        <span class="position-absolute top-50 translate-middle-y ms-16 text-gray-600">
                            <i class="ph ph-lock"></i>
                        </span>
                    </div>
                </div>

                <!-- Remember & Forgot -->
                <div class="mb-32 flex-between flex-wrap gap-8">
                    <div class="form-check mb-0">
                        <input class="form-check-input rounded-4" type="checkbox" id="remember">
                        <label class="form-check-label text-15" for="remember">Remember Me</label>
                    </div>
                    <a href="forgot-password.php" class="text-main-600 text-15 fw-medium">
                        Forgot Password?
                    </a>
                </div>

                <!-- Login Button -->
                <button id="loginBtn" class="btn btn-main rounded-pill w-100">
                    Sign In
                </button>
            </div>
        </div>
    </section>




    <!-- Jquery js -->
    <script src="assets/js/jquery-3.7.1.min.js"></script>
    <!-- Bootstrap Bundle Js -->
    <script src="assets/js/boostrap.bundle.min.js"></script>
    <!-- Phosphor Js -->
    <script src="assets/js/phosphor-icon.js"></script>
    <!-- file upload -->
    <script src="assets/js/file-upload.js"></script>
    <!-- file upload -->
    <script src="assets/js/plyr.js"></script>
    <!-- dataTables -->
    <script src="https://cdn.datatables.net/2.0.8/js/dataTables.min.js"></script>
    <!-- full calendar -->
    <script src="assets/js/full-calendar.js"></script>
    <!-- jQuery UI -->
    <script src="assets/js/jquery-ui.js"></script>
    <!-- jQuery UI -->
    <script src="assets/js/editor-quill.js"></script>
    <!-- apex charts -->
    <script src="assets/js/apexcharts.min.js"></script>
    <!-- Calendar Js -->
    <script src="assets/js/calendar.js"></script>
    <!-- jvectormap Js -->
    <script src="assets/js/jquery-jvectormap-2.0.5.min.js"></script>
    <!-- jvectormap world Js -->
    <script src="assets/js/jquery-jvectormap-world-mill-en.js"></script>
    <!-- SweetAlert2 JS -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- main js -->
    <script src="assets/js/main.js"></script>


    <!-- self js write conected -->

    <!-- custom admin APIs -->
    <script src="adminApi/adminAuth.js"></script>

</body>

</html>