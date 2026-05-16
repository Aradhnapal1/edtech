<!DOCTYPE html>
<html lang="en">

<head>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- api js  -->
    <script src="adminApi/languageApi.js"></script>
    <script src="adminApi/apiFaculty.js"></script>
    <script src="adminApi/blogApi.js"></script>
    <script src="adminApi/studentApi.js"></script>
    <script src="adminApi/allcareerApi.js"></script>
    <script src="adminApi/coupon.js"></script>
    <script src="adminApi/reviewApi.js"></script>

    <script src="adminApi/batchApi.js"></script>
    <script src="adminApi/adminProfile.js"></script>
    <script src="adminApi/testimonial.js"></script>
    <script src="adminApi/order.js"></script>
    <script src="adminApi/changePassword.js"></script>
    <script src="adminApi/dashboard.js"></script>

    <!-- icon -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Title -->
    <title> HyperScripts</title>
    <!-- Favicon -->
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
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">


    <script src="adminApi/getcategoryApi.js"></script>
    <script src="adminApi/addCourseApi.js"></script>
    <script src="adminApi/liveclass.js"></script>


    <!-- login  -->

<script>
// Silent Authentication Check - No alert, no message
function checkAuth() {
    const token = localStorage.getItem('token');

    // If no token → instantly redirect to login (silent)
    if (!token) {
        window.location.replace("login.php");   // Use replace() so user can't go back with browser back button
        return;
    }

    // If token exists → user is allowed to see the page
    console.log("✅ Authenticated - Token found");
}

// Run check immediately (as early as possible)
checkAuth();
</script>

    <!-- Global Search Script -->
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const searchInput = document.getElementById("globalSearchInput");
            if (searchInput) {
                searchInput.addEventListener("input", function() {
                    const query = this.value.toLowerCase().trim();

                    // Search inside all Table Rows on the page
                    const tableRows = document.querySelectorAll("table tbody tr");
                    tableRows.forEach(row => {
                        const text = row.textContent.toLowerCase();
                        row.style.display = text.includes(query) ? "" : "none";
                    });

                    // Search inside grid cards (if applicable on dashboard)
                    const cards = document.querySelectorAll(".resource-item, .dashboard-course-item, .course-item");
                    cards.forEach(card => {
                        const text = card.textContent.toLowerCase();
                        card.style.display = text.includes(query) ? "" : "none";
                    });
                });
            }
        });
    </script>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Decode JWT payload safely
                    const payload = token.split('.')[1];
                    const decodedPayload = JSON.parse(decodeURIComponent(atob(payload.replace(/-/g, '+').replace(/_/g, '/')).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join('')));
                    
                    // Extract first and last name
                    const firstName = decodedPayload.FirstName || decodedPayload.firstName || decodedPayload.name || decodedPayload.firstname || 'U';
                    const lastName = decodedPayload.LastName || decodedPayload.lastName || decodedPayload.lastname || '';
                    
                    const initials = (firstName.charAt(0) + (lastName ? lastName.charAt(0) : '')).toUpperCase();
                    
                    const initialEl1 = document.getElementById('headerUserInitials1');
                    const initialEl2 = document.getElementById('headerUserInitials2');
                    const userNameEl = document.getElementById('userName');
                    const userEmailEl = document.getElementById('userEmail');
                    
                    if (initialEl1) initialEl1.textContent = initials;
                    if (initialEl2) initialEl2.textContent = initials;
                    if (userNameEl && userNameEl.textContent === 'Loading...') userNameEl.textContent = `${firstName} ${lastName}`.trim();
                    if (userEmailEl && userEmailEl.textContent === 'Loading...' && decodedPayload.email) userEmailEl.textContent = decodedPayload.email;
                } catch (error) {
                    console.error("Error decoding token for profile initials", error);
                }
            }
        });
    </script>

    <!-- <script src="adminApi/addCetegoryApi.js"></script> -->
</head>

<body>


    <!--==================== Preloader Start ====================-->
    <div class="preloader">
        <div class="loader"></div>
    </div>
    <!--==================== Preloader End ====================-->

    <!--==================== Sidebar Overlay End ====================-->
    <div class="side-overlay"></div>
    <!--==================== Sidebar Overlay End ====================-->

    <!-- ============================ Sidebar Start ============================ -->

    <aside class="sidebar">
        <!-- sidebar close btn -->
        <button type="button"
            class="sidebar-close-btn text-gray-500 hover-text-white hover-bg-main-600 text-md w-24 h-24 border border-gray-100 hover-border-main-600 d-xl-none d-flex flex-center rounded-circle position-absolute"><i
                class="ph ph-x"></i></button>
        <!-- sidebar close btn -->

        <a href="index.php"
            class="sidebar__logo text-center p-20 position-sticky inset-block-start-0 bg-white w-100 z-1 pb-10">
            <img src="assets/images/logo/career.png" alt="Logo">
        </a>

        <div class="sidebar-menu-wrapper overflow-y-auto scroll-sm">
            <div class="p-20 pt-10">
                <ul class="sidebar-menu">
                    <li class="sidebar-menu__item ">
                        <a href="index.php" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-squares-four"></i></span>
                            <span class="text">Dashboard</span>

                        </a>

                    </li>
                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-graduation-cap"></i></span>
                            <span class="text">Courses</span>
                        </a>
                        <!-- Submenu start -->
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="student-courses.php" class="sidebar-submenu__link"> Student Courses </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="create-course.php" class="sidebar-submenu__link"> Create Course </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="course-category.php" class="sidebar-submenu__link">All Courese Category </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="add-course-category.php" class="sidebar-submenu__link">Add Courese Category
                                </a>
                            </li>
                            <!-- <li class="sidebar-submenu__item">
                                <a href="sub-course-category.php" class="sidebar-submenu__link">All Sub Courese Category
                                </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="add-sub-course-category.php" class="sidebar-submenu__link">Add Sub Courese
                                    Category </a>
                            </li> -->
                        </ul>
                        <!-- Submenu End -->
                    </li>
                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-users-three"></i></span>
                            <span class="text">Students</span>
                        </a>
                        <!-- Submenu start -->
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="all-students.php" class="sidebar-submenu__link">All Student </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="add-students.php" class="sidebar-submenu__link"> Add Student </a>
                            </li>
                        </ul>
                        <!-- Submenu End -->
                    </li>
                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-shopping-cart"></i></span>
                            <span class="text">Order</span>
                        </a>
                        <!-- Submenu start -->
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="order.php" class="sidebar-submenu__link">All Order </a>
                            </li>
                        </ul>
                        <!-- Submenu End -->
                    </li>

                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-users-three"></i></span>
                            <span class="text">Faculty</span>
                        </a>
                        <!-- Submenu start -->
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="all-faculty.php" class="sidebar-submenu__link">All Faculty </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="add-faculty.php" class="sidebar-submenu__link"> Add Faculty </a>
                            </li>
                        </ul>
                        <!-- Submenu End -->
                    </li>
                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-translate"></i></span>
                            <span class="text">Language</span>
                        </a>
                        <!-- Submenu start -->
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="all-language.php" class="sidebar-submenu__link">All Language </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="add-language.php" class="sidebar-submenu__link"> Add Language </a>
                            </li>
                        </ul>
                        <!-- Submenu End -->
                    </li>


                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-tag"></i></span>
                            <span class="text">Coupon</span>
                        </a>
                        <!-- Submenu start -->
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="all-coupon.php" class="sidebar-submenu__link">All Coupon </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="add-coupon.php" class="sidebar-submenu__link"> Add Coupon </a>
                            </li>
                        </ul>
                        <!-- Submenu End -->
                    </li>

                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-newspaper"></i></span>
                            <span class="text">Blog</span>
                        </a>
                        <!-- Submenu start -->
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="blog.php" class="sidebar-submenu__link"> All Blog </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="add-blog.php" class="sidebar-submenu__link"> Add blog </a>
                            </li>

                        </ul>
                        <!-- Submenu End -->
                    </li>

                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-stack"></i></span>
                            <span class="text">Batch</span>
                        </a>
                        <!-- Submenu start -->
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="all-batch.php" class="sidebar-submenu__link">All Batch </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="add-batch.php" class="sidebar-submenu__link"> Add Batch </a>
                            </li>
                        </ul>
                        <!-- Submenu End -->
                    </li>

                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-broadcast"></i></span>
                            <span class="text">Live Class</span>
                        </a>
                        <!-- Submenu start -->
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="all-live-class.php" class="sidebar-submenu__link">All Live Class </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="add-live-class.php" class="sidebar-submenu__link"> Add Live Class </a>
                            </li>
                        </ul>
                        <!-- Submenu End -->
                    </li>


                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-quotes"></i></span>
                            <span class="text">Testimonial</span>
                        </a>
                        <!-- Submenu start -->
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="all-testimonial.php" class="sidebar-submenu__link">All Testimonial </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="add-testimonial.php" class="sidebar-submenu__link"> Add Testimonial </a>
                            </li>
                        </ul>
                        <!-- Submenu End -->
                    </li>
                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-star"></i></span>
                            <span class="text">Review</span>
                        </a>
                        <!-- Submenu start -->
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="all-review.php" class="sidebar-submenu__link">All Review </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="add-review.php" class="sidebar-submenu__link"> Add Review </a>
                            </li>
                        </ul>
                        <!-- Submenu End -->
                    </li>




                    <li class="sidebar-menu__item">
                        <a href="career.php" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-handshake"></i></span>
                            <span class="text">Career </span>
                        </a>
                    </li>
                    <li class="sidebar-menu__item">
                        <a href="contact.php" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-phone"></i>
                            </span>
                            <span class="text">Contact </span>
                        </a>
                    </li>


                    <li class="sidebar-menu__item">
                        <span
                            class="text-gray-300 text-sm px-20 pt-20 fw-semibold border-top border-gray-100 d-block text-uppercase">Settings</span>
                    </li>
                    <li class="sidebar-menu__item">
                        <a href="setting.php" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-gear"></i></span>
                            <span class="text">Account Settings</span>
                        </a>
                    </li>

                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-shield-check"></i></span>
                            <span class="text">Authetication</span>
                        </a>
                        <!-- Submenu start -->
                        <ul class="sidebar-submenu">

                            <li class="sidebar-submenu__item">
                                <a href="forgot-password.php" class="sidebar-submenu__link">Forgot Password</a>
                            </li>
                            <!-- <li class="sidebar-submenu__item">
                                <a href="reset-password.php" class="sidebar-submenu__link">Reset Password</a>
                            </li> -->

                        </ul>
                        <!-- Submenu End -->
                    </li>

                </ul>
            </div>

        </div>

    </aside>
    <!-- ============================ Sidebar End  ============================ -->

    <div class="dashboard-main-wrapper">
        <div class="top-navbar flex-between gap-16">

            <div class="flex-align gap-16">
                <!-- Toggle Button Start -->
                <button type="button" class="toggle-btn d-xl-none d-flex text-26 text-gray-500"><i
                        class="ph ph-list"></i></button>
                <!-- Toggle Button End -->

                <form action="#" class="w-350 d-sm-block d-none">
                    <div class="position-relative">
                        <button type="submit" class="input-icon text-xl d-flex text-gray-100 pointer-event-none"><i
                                class="ph ph-magnifying-glass"></i></button>
                        <input type="text" id="globalSearchInput"
                            class="form-control ps-40 h-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15"
                            placeholder="Search...">
                    </div>
                </form>
            </div>

            <div class="flex-align gap-16">
                <div class="flex-align gap-8">
                    <!-- Notification Start -->
                    <!-- <div class="dropdown">
                        <button
                            class="dropdown-btn shaking-animation text-gray-500 w-40 h-40 bg-main-50 hover-bg-main-100 transition-2 rounded-circle text-xl flex-center"
                            type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="position-relative">
                                <i class="ph ph-bell"></i>
                                <span class="alarm-notify position-absolute end-0"></span>
                            </span>
                        </button>
                        <div class="dropdown-menu dropdown-menu--lg border-0 bg-transparent p-0">
                            <div class="card border border-gray-100 rounded-12 box-shadow-custom p-0 overflow-hidden">
                                <div class="card-body p-0">
                                    <div class="py-8 px-24 bg-main-600">
                                        <div class="flex-between">
                                            <h5 class="text-xl fw-semibold text-white mb-0">Notifications</h5>
                                            <div class="flex-align gap-12">
                                                <button type="button"
                                                    class="bg-white rounded-6 text-sm px-8 py-2 hover-text-primary-600">
                                                    New </button>
                                                <button type="button"
                                                    class="close-dropdown hover-scale-1 text-xl text-white"><i
                                                        class="ph ph-x"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-24 max-h-270 overflow-y-auto scroll-sm">
                                        <div class="d-flex align-items-start gap-12">
                                            <img src="assets/images/thumbs/notification-img1.png" alt=""
                                                class="w-48 h-48 rounded-circle object-fit-cover">
                                            <div class="border-bottom border-gray-100 mb-24 pb-24">
                                                <div class="flex-align gap-4">
                                                    <a href="#"
                                                        class="fw-medium text-15 mb-0 text-gray-300 hover-text-main-600 text-line-2">Ashwin
                                                        Bose is requesting access to Design File - Final Project. </a>
                                               
                                                    <div class="dropdown flex-shrink-0">
                                                        <button class="text-gray-200 rounded-4" type="button"
                                                            data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i class="ph-fill ph-dots-three-outline"></i>
                                                        </button>
                                                        <div
                                                            class="dropdown-menu dropdown-menu--md border-0 bg-transparent p-0">
                                                            <div
                                                                class="card border border-gray-100 rounded-12 box-shadow-custom">
                                                                <div class="card-body p-12">
                                                                    <div
                                                                        class="max-h-200 overflow-y-auto scroll-sm pe-8">
                                                                        <ul>
                                                                            <li class="mb-0">
                                                                                <a href="#"
                                                                                    class="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 rounded-8 fw-normal text-xs d-block">
                                                                                    <span class="text">Mark as
                                                                                        read</span>
                                                                                </a>
                                                                            </li>
                                                                            <li class="mb-0">
                                                                                <a href="#"
                                                                                    class="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 rounded-8 fw-normal text-xs d-block">
                                                                                    <span class="text">Delete
                                                                                        Notification</span>
                                                                                </a>
                                                                            </li>
                                                                            <li class="mb-0">
                                                                                <a href="#"
                                                                                    class="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 rounded-8 fw-normal text-xs d-block">
                                                                                    <span class="text">Report</span>
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                              
                                                </div>
                                                <div class="flex-align gap-6 mt-8">
                                                    <img src="assets/images/icons/google-drive.png" alt="">
                                                    <div class="flex-align gap-4">
                                                        <p class="text-gray-900 text-sm text-line-1">Design brief and
                                                            ideas.txt</p>
                                                        <span class="text-xs text-gray-200 flex-shrink-0">2.2 MB</span>
                                                    </div>
                                                </div>
                                                <div class="mt-16 flex-align gap-8">
                                                    <button type="button"
                                                        class="btn btn-main py-8 text-15 fw-normal px-16">Accept</button>
                                                    <button type="button"
                                                        class="btn btn-outline-gray py-8 text-15 fw-normal px-16">Decline</button>
                                                </div>
                                                <span class="text-gray-200 text-13 mt-8">2 mins ago</span>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-start gap-12">
                                            <img src="assets/images/thumbs/notification-img2.png" alt=""
                                                class="w-48 h-48 rounded-circle object-fit-cover">
                                            <div class="">
                                                <a href="#"
                                                    class="fw-medium text-15 mb-0 text-gray-300 hover-text-main-600 text-line-2">Patrick
                                                    added a comment on Design Assets - Smart Tags file:</a>
                                                <span class="text-gray-200 text-13">2 mins ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#"
                                        class="py-13 px-24 fw-bold text-center d-block text-primary-600 border-top border-gray-100 hover-text-decoration-underline">
                                        View All </a>

                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!-- Notification Start -->

                    <!-- Language Start -->
                    <!-- <div class="dropdown">
                        <button
                            class="text-gray-500 w-40 h-40 bg-main-50 hover-bg-main-100 transition-2 rounded-circle text-xl flex-center"
                            type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="ph ph-globe"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu--md border-0 bg-transparent p-0">
                            <div class="card border border-gray-100 rounded-12 box-shadow-custom">
                                <div class="card-body">
                                    <div class="max-h-270 overflow-y-auto scroll-sm pe-8">
                                        <div
                                            class="form-check form-radio d-flex align-items-center justify-content-between ps-0 mb-16">
                                            <label
                                                class="ps-0 form-check-label line-height-1 fw-medium text-secondary-light"
                                                for="arabic">
                                                <span
                                                    class="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                                                    <img src="assets/images/thumbs/flag1.png" alt=""
                                                        class="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0">
                                                    <span class="text-15 fw-semibold mb-0">Arabic</span>
                                                </span>
                                            </label>
                                            <input class="form-check-input" type="radio" name="language" id="arabic">
                                        </div>
                                        <div
                                            class="form-check form-radio d-flex align-items-center justify-content-between ps-0 mb-16">
                                            <label
                                                class="ps-0 form-check-label line-height-1 fw-medium text-secondary-light"
                                                for="germany">
                                                <span
                                                    class="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                                                    <img src="assets/images/thumbs/flag2.png" alt=""
                                                        class="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0">
                                                    <span class="text-15 fw-semibold mb-0">Germany</span>
                                                </span>
                                            </label>
                                            <input class="form-check-input" type="radio" name="language" id="germany">
                                        </div>
                                        <div
                                            class="form-check form-radio d-flex align-items-center justify-content-between ps-0 mb-16">
                                            <label
                                                class="ps-0 form-check-label line-height-1 fw-medium text-secondary-light"
                                                for="english">
                                                <span
                                                    class="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                                                    <img src="assets/images/thumbs/flag3.png" alt=""
                                                        class="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0">
                                                    <span class="text-15 fw-semibold mb-0">English</span>
                                                </span>
                                            </label>
                                            <input class="form-check-input" type="radio" name="language" id="english">
                                        </div>
                                        <div
                                            class="form-check form-radio d-flex align-items-center justify-content-between ps-0">
                                            <label
                                                class="ps-0 form-check-label line-height-1 fw-medium text-secondary-light"
                                                for="spanish">
                                                <span
                                                    class="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                                                    <img src="assets/images/thumbs/flag4.png" alt=""
                                                        class="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0">
                                                    <span class="text-15 fw-semibold mb-0">Spanish</span>
                                                </span>
                                            </label>
                                            <input class="form-check-input" type="radio" name="language" id="spanish">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->

                </div>


                <!-- User Profile Start -->
                <div class="dropdown">
                    <button
                        class="users arrow-down-icon border border-gray-200 rounded-pill p-4 d-inline-block pe-40 position-relative"
                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="position-relative">
                            <span id="headerUserInitials1" class="h-32 w-32 rounded-circle d-flex align-items-center justify-content-center bg-main-600 text-white fw-bold text-sm"></span>
                            <span
                                class="activation-badge w-8 h-8 position-absolute inset-block-end-0 inset-inline-end-0"></span>
                        </span>
                    </button>
                    <div class="dropdown-menu dropdown-menu--lg border-0 bg-transparent p-0">
                        <div class="card border border-gray-100 rounded-12 box-shadow-custom">
                            <div class="card-body">
                                <div class="flex-align gap-8 mb-20 pb-20 border-bottom border-gray-100">
                                    <span id="headerUserInitials2" class="w-54 h-54 rounded-circle d-flex align-items-center justify-content-center bg-main-600 text-white fw-bold text-xl"></span>
                                    <div>
                                        <h4 class="mb-0" id="userName">Loading...</h4>
                                        <p class="fw-medium text-13 text-gray-200" id="userEmail">Loading...</p>
                                    </div>
                                </div>
                                <ul class="max-h-270 overflow-y-auto scroll-sm pe-4">
                                    <li class="mb-4">
                                        <a href="setting.php"
                                            class="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                            <span class="text-2xl text-dark-600 d-flex"><i
                                                    class="ph ph-gear"></i></span>
                                            <span class="text">Account Settings</span>
                                        </a>
                                    </li>
                                    <!-- <li class="mb-4">
                                        <a href="pricing-plan.php"
                                            class="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                            <span class="text-2xl text-primary-600 d-flex"><i
                                                    class="ph ph-chart-bar"></i></span>
                                            <span class="text">Upgrade Plan</span>
                                        </a>
                                    </li>
                                    <li class="mb-4">
                                        <a href="analytics.php"
                                            class="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                            <span class="text-2xl text-primary-600 d-flex"><i
                                                    class="ph ph-chart-line-up"></i></span>
                                            <span class="text">Daily Activity</span>
                                        </a>
                                    </li>
                                    <li class="mb-4">
                                        <a href="message.php"
                                            class="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                            <span class="text-2xl text-primary-600 d-flex"><i
                                                    class="ph ph-chats-teardrop"></i></span>
                                            <span class="text">Inbox</span>
                                        </a>
                                    </li> -->
                                    <!-- <li class="mb-4">
                                        <a href="email.php"
                                            class="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                            <span class="text-2xl text-primary-600 d-flex"><i
                                                    class="ph ph-envelope-simple"></i></span>
                                            <span class="text">Email</span>
                                        </a>
                                    </li> -->
                                    <li class="pt-8 border-top border-gray-100" id="logout-item" style="cursor: pointer;">
                                        <span
                                            class="py-12 text-15 px-20 hover-bg-danger-50 text-gray-300 hover-text-danger-600 rounded-8 flex-align gap-8 fw-medium text-15">
                                            <span class="text-2xl text-danger-600 d-flex"><i
                                                    class="ph ph-sign-out"></i></span>
                                            <span class="text">Log Out</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- User Profile Start -->

            </div>
        </div>