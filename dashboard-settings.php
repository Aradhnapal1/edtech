<?php include 'dashboard-header.php'; ?>

<body class="dashboard-page">



    <!-- Dashboard Menu Start -->
    <div class="dashboard-menu">

        <!-- Dashboard Menu Close Start -->
        <div class="dashboard-menu__close">
            <button class="close-btn"><i class="fas fa-times"></i></button>
        </div>
        <!-- Dashboard Menu Close End -->

        <!-- Dashboard Menu Content Start -->
        <div class="dashboard-menu__content">
            <div class="dashboard-menu__image">
                <img src="assets/images/canvas-menu-image.png" alt="Images" width="984" height="692">
            </div>
            <div class="dashboard-menu__main-menu">
                <ul class="dashboard-menu__menu-link">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Courses</a></li>
                    <li><a href="#">Events</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <div class="dashboard-menu__search">
                    <form action="#">
                        <input type="text" placeholder="Search…">
                        <button class="search-btn"><i class="far fa-search"></i></button>
                    </form>
                </div>
            </div>
        </div>
        <!-- Dashboard Menu Content End -->

    </div>
    <!-- Dashboard Menu End -->


    <!-- Dashboard Main Wrapper Start -->
    <main class="dashboard-main-wrapper">







        <!-- Dashboard Content Start -->
        <div class="dashboard-content">

            <div class="container">
                <h4 class="dashboard-title">Settings</h4>

                <!-- Dashboard Settings Start -->
                <div class="dashboard-settings">

                    <!-- Dashboard Tabs Start -->
                    <div class="dashboard-tabs-menu">
                        <ul>
                            <li><a class="active" href="dashboard-settings.php">Profile</a></li>
                            <li><a href="dashboard-settings-reset-password.php">Reset Password</a></li>
                        </ul>
                    </div>
                    <!-- Dashboard Tabs End -->

                    <form action="#">
                        <div class="row gy-6">
                            <div class="col-lg-6">

                                <!-- Dashboard Settings Info Start -->
                                <div class="dashboard-content-box">

                                    <h4 class="dashboard-content-box__title">Contact information</h4>
                                    <p>Provide your details below to create your account profile</p>

                                    <div class="row gy-4">
                                        <div class="col-md-6">
                                            <!-- Account Account details Start -->
                                            <div class="dashboard-content__input">
                                                <label class="form-label-02" >First name</label>
                                                <input type="text" class="form-control" id="firstName">
                                            </div>
                                            <!-- Account Account details End -->
                                        </div>
                                        <div class="col-md-6">
                                            <!-- Account Account details Start -->
                                            <div class="dashboard-content__input">
                                                <label class="form-label-02">Last name</label>
                                                <input type="text" class="form-control" id="lastName">
                                            </div>
                                            <!-- Account Account details End -->
                                        </div>
                                        <div class="col-md-6">
                                            <div class="dashboard-content__input">
                                                <label class="form-label-02">Gender</label>
                                                <select class="form-control" >
                                                    <option value="">Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="dashboard-content__input">
                                                <label class="form-label-02">Date of Birth</label>
                                                <input type="date" class="form-control"  id="dob">
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <!-- Account Account details Start -->
                                            <div class="dashboard-content__input">
                                                <label class="form-label-02">Phone Number</label>
                                                <input type="text" class="form-control"  id="phone">
                                            </div>
                                            <!-- Account Account details End -->
                                        </div>

                                        <div class="col-md-12">
                                            <!-- Account Account details Start -->
                                            <div class="dashboard-content__input">
                                                <label class="form-label-02">Address</label>
                                                <textarea class="form-control" id="address"></textarea>
                                            </div>
                                            <!-- Account Account details End -->
                                        </div>

                                    </div>

                                </div>
                                <!-- Dashboard Settings Info End -->

                            </div>
                            <div class="col-lg-6">
                                <!-- Dashboard Settings Info Start -->
                                <div class="dashboard-content-box">
                                    <h4 class="dashboard-content-box__title">Photo</h4>
                                    <p>Upload your profile photo.</p>

                                    <div id="dashboard-profile-cover-photo-editor" class="dashboard-settings-profile">

                                        <!-- Cover Photo Area -->
                                        <div id="dashboard-cover-area" class="dashboard-settings-profile__cover"
                                            data-fallback="assets/images/cover-photo.jpg"
                                            style="background-image:url(assets/images/cover-photo.jpg)">
                                            <span class="cover-deleter">
                                                <i class="fa-solid fa-trash-alt"></i>
                                            </span>
                                            <div class="overlay">
                                                <!-- <button class="cover-uploader" type="button">
                                                    <i class="fa-solid fa-camera"></i>&nbsp;
                                                    <span>Update Cover Photo</span>
                                                </button> -->
                                            </div>
                                        </div>

                                        <!-- Photo Meta Info (Size sirf info ke liye, no validation) -->
                                        <div id="photo-meta-area" class="dashboard-settings-profile__photo-meta">
                                            <img src="assets/images/info-icon.svg" alt="icon" />
                                            <!-- <span>Recommended Profile Photo Size: <strong>200x200</strong>
                                                pixels,</span>
                                            <span>Recommended Cover Photo Size: <strong>700x430</strong> pixels</span> -->
                                            <!-- No loader if not needed -->
                                        </div>

                                        <!-- Profile Photo Circle -->
                                        <input type="file" id="photoInput" style="display: none;">
                                        <div id="profile-photo" class="dashboard-settings-profile__photo"
                                            data-fallback="assets/images/avatar-placeholder.jpg"
                                            style="background-image:url(assets/images/avatar-placeholder.jpg); cursor: pointer;" 
                                            onclick="document.getElementById('photoInput').click()">
                                            <div class="overlay">
                                                <i class="fa-solid fa-camera"></i>
                                            </div>
                                        </div>

                                        <!-- Upload/Delete Options -->
                                        <div id="profile-photo-option" class="dashboard-settings-profile__photo-option">
                                            <span class="profile-photo-uploader" onclick="document.getElementById('photoInput').click()">
                                                <i class="fa-solid fa-upload"></i> Upload Photo
                                            </span>
                                            <span class="profile-photo-deleter" id="deleteProfilePhotoBtn">
                                                <i class="fa-solid fa-trash-alt"></i> Delete
                                            </span>
                                        </div>
                                    </div>


                                </div>
                                <!-- Dashboard Settings Info End -->
                            </div>
                        </div>

                        <div class="dashboard-settings__btn">
                            <button class="btn btn-primary btn-hover-secondary" >Update Profile</button>
                        </div>
                    </form>

                </div>
                <!-- Dashboard Settings End -->
            </div>


        </div>
        <!-- Dashboard Content End -->


    </main>
    <!-- Dashboard Main Wrapper End -->



    <script>
        document.addEventListener('DOMContentLoaded', function () {

            // Cover Photo ke liye alag hidden input
            let coverInput = document.createElement('input');
            coverInput.type = 'file';
            coverInput.id = 'cover-photo-input';
            coverInput.style.display = 'none';
            document.body.appendChild(coverInput);

            // Preview function (no size check)
            function previewImage(file, targetElementId) {
                if (!file) return;
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imgUrl = e.target.result;
                    const target = document.getElementById(targetElementId);
                    if (target) {
                        target.style.backgroundImage = `url(${imgUrl})`;
                    }
                };
                reader.readAsDataURL(file);
            }

            // Cover photo trigger
            document.querySelector('.cover-uploader')?.addEventListener('click', () => coverInput.click());

            coverInput.addEventListener('change', (e) => {
                previewImage(e.target.files[0], 'dashboard-cover-area');
            });

            // Profile photo trigger and preview
            const photoInput = document.getElementById('photoInput');
            if (photoInput) {
                photoInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        if (file.size > 5 * 1024 * 1024) { // 5MB in bytes
                            Swal.fire("File Too Large", "Profile photo must be under 5MB.", "warning");
                            e.target.value = ''; // Input file ko clear kar dena
                            return;
                        }
                        previewImage(file, 'profile-photo');
                    }
                });
            }

            // Delete profile photo
            document.querySelector('#deleteProfilePhotoBtn')?.addEventListener('click', function () {
                const profilePhoto = document.getElementById('profile-photo');
                if(profilePhoto) profilePhoto.style.backgroundImage = `url(${profilePhoto.dataset.fallback})`;
                
                const photoInput = document.getElementById('photoInput');
                if(photoInput) photoInput.value = '';
            });

            // Delete cover photo
            document.querySelector('.cover-deleter')?.addEventListener('click', function () {
                const defaultCover = document.getElementById('dashboard-cover-area').dataset.fallback;
                document.getElementById('dashboard-cover-area').style.backgroundImage = `url(${defaultCover})`;
                coverInput.value = '';
            });
        });
    </script>