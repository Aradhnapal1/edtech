<?php include './include/header.php'; ?>


<div class="dashboard-body">
    <!-- Breadcrumb Start -->
    <div class="breadcrumb mb-24">
        <ul class="flex-align gap-4">
            <li><a href="index.html" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
            <li> <span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span> </li>
            <li><span class="text-main-600 fw-normal text-15">Setting</span></li>
        </ul>
    </div>
    <!-- Breadcrumb End -->

    <div class="card overflow-hidden">
        <div class="card-body p-0">
            <ul class="step-list mb-24">
                <li class="step-list__item py-10 px-24 text-15 text-heading fw-medium flex-center gap-6 active">
                    <span class="icon text-xl d-flex"><i class="ph ph-circle"></i></span>
                    Add Dashboard Admin
                    <span class="line position-relative"></span>
                </li>
            </ul>

            <div class="setting-profile px-24">
              
                <ul class="nav common-tab style-two nav-pills mb-0" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-details-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-details" type="button" role="tab" aria-controls="pills-details"
                            aria-selected="true">Add User</button>
                    </li>
                    <!-- <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                            aria-selected="false">Profile</button>
                    </li> -->
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-password-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-password" type="button" role="tab" aria-controls="pills-password"
                            aria-selected="false">Password</button>
                    </li>

                </ul>
            </div>

        </div>
    </div>

    <div class="tab-content" id="pills-tabContent">
        <!-- My Details Tab start -->
        <div class="tab-pane fade show active" id="pills-details" role="tabpanel" aria-labelledby="pills-details-tab"
            tabindex="0">
            <div class="card mt-24">
                <div class="card-header border-bottom">
                    <h4 class="mb-4">Add User</h4>
                    <p class="text-gray-600 text-15">Please fill full details about yourself</p>
                </div>
                <div class="card-body">
                    <form action="#">
                        <div class="row gy-4">
                            <div class="col-sm-6 col-xs-6">
                                <label for="fname" class="form-label mb-8 h6">First Name</label>
                                <input type="text" class="form-control py-11" id="fnameadmin"
                                    placeholder="Enter First Name">
                            </div>
                            <div class="col-sm-6 col-xs-6">
                                <label for="lname" class="form-label mb-8 h6">Last Name</label>
                                <input type="text" class="form-control py-11" id="lnameadmin"
                                    placeholder="Enter Last Name">
                            </div>
                            <div class="col-sm-6 col-xs-6">
                                <label for="email" class="form-label mb-8 h6">Email</label>
                                <input type="email" class="form-control py-11" id="emailadmin"
                                    placeholder="Enter Email">
                            </div>
                            <div class="col-sm-6 col-xs-6">
                                <label for="phone" class="form-label mb-8 h6">Phone Number</label>
                                <input type="number" class="form-control py-11" id="phoneadmin"
                                    placeholder="Enter Phone Number">
                            </div>
                            <div class="col-sm-6">
                                <label for="role" class="h5 mb-8 fw-semibold font-heading">Role</label>
                                <div class="position-relative">
                                    <select id="roleadmin" class="form-select py-9 text-15">
                                        <option value="" disabled selected>Select Role</option>
                                        <option value="1">ADMIN</option>
                                        <option value="2">SUPERADMIN</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-6">
                                <label for="current-password" class="form-label mb-8 h6">Current Password</label>
                                <div class="position-relative">
                                    <input type="password" class="form-control py-11" id="current-password"
                                        placeholder="Enter Current Password">
                                    <span
                                        class="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph ph-eye-slash"
                                        id="#current-password"></span>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="flex-align justify-content-end gap-8">
                                    <button type="reset"
                                        class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Cancel</button>
                                    <button type="submit" id="addAdmin" class="btn btn-main rounded-pill py-9">Save
                                        Changes</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- My Details Tab End -->

        <!-- Profile Tab Start -->
        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
            <div class="row gy-4">
                <div class="col-lg-6">
                    <div class="card mt-24">
                        <div class="card-body">
                            <h6 class="mb-12">About Me</h6>
                            <p class="text-gray-600 text-15 rounded-8 border border-gray-100 p-16">Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit. Commodo pellentesque massa tellus ac augue. Lectus
                                arcu at in in rhoncus malesuada ipsum turpis.</p>
                        </div>
                    </div>
                    <div class="card mt-24">
                        <div class="card-body">
                            <h6 class="mb-12">Recent Messages</h6>

                            <div class="rounded-8 border border-gray-100 p-16 mb-16">
                                <div class="comments-box__content flex-between gap-8">
                                    <div class="flex-align align-items-start gap-12">
                                        <img src="assets/images/thumbs/user-img1.png"
                                            class="w-32 h-32 rounded-circle object-fit-cover flex-shrink-0"
                                            alt="User Image">
                                        <div>
                                            <h6 class="text-lg mb-8">Michel Smith</h6>
                                            <p class="text-gray-600 text-15">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit. Commodo pellentesque massa </p>
                                        </div>
                                    </div>
                                    <button type="button"
                                        class="flex-shrink-0 fw-bold text-13 text-main-600 flex-align gap-8 hover-text-main-800">Reply
                                        <i class="ph ph-arrow-bend-up-left d-flex text-lg"></i> </button>
                                </div>
                            </div>

                            <div class="rounded-8 border border-gray-100 p-16 mb-16">
                                <div class="comments-box__content flex-between gap-8">
                                    <div class="flex-align align-items-start gap-12">
                                        <img src="assets/images/thumbs/user-img5.png"
                                            class="w-32 h-32 rounded-circle object-fit-cover flex-shrink-0"
                                            alt="User Image">
                                        <div>
                                            <h6 class="text-lg mb-8">Zara Maliha</h6>
                                            <p class="text-gray-600 text-15">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit. Commodo pellentesque massa </p>
                                        </div>
                                    </div>
                                    <button type="button"
                                        class="flex-shrink-0 fw-bold text-13 text-main-600 flex-align gap-8 hover-text-main-800">Reply
                                        <i class="ph ph-arrow-bend-up-left d-flex text-lg"></i> </button>
                                </div>
                            </div>

                            <div class="rounded-8 border border-gray-100 p-16 mb-16">
                                <div class="comments-box__content flex-between gap-8">
                                    <div class="flex-align align-items-start gap-12">
                                        <img src="assets/images/thumbs/user-img3.png"
                                            class="w-32 h-32 rounded-circle object-fit-cover flex-shrink-0"
                                            alt="User Image">
                                        <div>
                                            <h6 class="text-lg mb-8">Simon Doe</h6>
                                            <p class="text-gray-600 text-15">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit. Commodo pellentesque massa </p>
                                        </div>
                                    </div>
                                    <button type="button"
                                        class="flex-shrink-0 fw-bold text-13 text-main-600 flex-align gap-8 hover-text-main-800">Reply
                                        <i class="ph ph-arrow-bend-up-left d-flex text-lg"></i> </button>
                                </div>
                            </div>

                            <div class="rounded-8 border border-gray-100 p-16 mb-16">
                                <div class="comments-box__content flex-between gap-8">
                                    <div class="flex-align align-items-start gap-12">
                                        <img src="assets/images/thumbs/user-img4.png"
                                            class="w-32 h-32 rounded-circle object-fit-cover flex-shrink-0"
                                            alt="User Image">
                                        <div>
                                            <h6 class="text-lg mb-8">Elejabeth Jenny</h6>
                                            <p class="text-gray-600 text-15">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit. Commodo pellentesque massa </p>
                                        </div>
                                    </div>
                                    <button type="button"
                                        class="flex-shrink-0 fw-bold text-13 text-main-600 flex-align gap-8 hover-text-main-800">Reply
                                        <i class="ph ph-arrow-bend-up-left d-flex text-lg"></i> </button>
                                </div>
                            </div>

                            <div class="rounded-8 border border-gray-100 p-16 mb-16">
                                <div class="flex-between gap-8">
                                    <div class="flex-align align-items-start gap-12">
                                        <img src="assets/images/thumbs/user-img8.png"
                                            class="w-32 h-32 rounded-circle object-fit-cover flex-shrink-0"
                                            alt="User Image">
                                        <div>
                                            <h6 class="text-lg mb-8">Ronald Doe</h6>
                                            <p class="text-gray-600 text-15">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit. Commodo pellentesque massa </p>
                                        </div>
                                    </div>
                                    <button type="button"
                                        class="flex-shrink-0 fw-bold text-13 text-main-600 flex-align gap-8 hover-text-main-800">Reply
                                        <i class="ph ph-arrow-bend-up-left d-flex text-lg"></i> </button>
                                </div>
                            </div>

                            <a href="#"
                                class="flex-shrink-0 fw-bold text-13 text-main-600 flex-align gap-8 hover-text-main-800 hover-text-decoration-underline">
                                View All <i class="ph ph-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                    <div class="card mt-24">
                        <div class="card-body">
                            <h6 class="mb-12">Social Media</h6>
                            <ul class="flex-align flex-wrap gap-8">
                                <li>
                                    <a href="https://www.facebook.com"
                                        class="flex-center w-36 h-36 border border-main-600 text-main-600 rounded-circle text-xl hover-bg-main-100 hover-border-main-800"><i
                                            class="ph ph-facebook-logo"></i></a>
                                </li>
                                <li>
                                    <a href="https://www.google.com"
                                        class="flex-center w-36 h-36 border border-main-600 text-main-600 rounded-circle text-xl hover-bg-main-100 hover-border-main-800">
                                        <i class="ph ph-twitter-logo"></i></a>
                                </li>
                                <li>
                                    <a href="https://www.twitter.com"
                                        class="flex-center w-36 h-36 border border-main-600 text-main-600 rounded-circle text-xl hover-bg-main-100 hover-border-main-800"><i
                                            class="ph ph-linkedin-logo"></i></a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com"
                                        class="flex-center w-36 h-36 border border-main-600 text-main-600 rounded-circle text-xl hover-bg-main-100 hover-border-main-800"><i
                                            class="ph ph-instagram-logo"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card mt-24">
                        <div class="card-body">
                            <div class="row gy-4">
                                <div class="col-xxl-4 col-xl-6 col-md-4 col-sm-6">
                                    <div class="statistics-card p-xl-4 p-16 flex-align gap-10 rounded-8 bg-main-50">
                                        <span
                                            class="text-white bg-main-600 w-36 h-36 rounded-circle flex-center text-xl flex-shrink-0"><i
                                                class="ph ph-users-three"></i></span>
                                        <div>
                                            <h4 class="mb-0">450k</h4>
                                            <span class="fw-medium text-main-600">Followers</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-4 col-xl-6 col-md-4 col-sm-6">
                                    <div class="statistics-card p-xl-4 p-16 flex-align gap-10 rounded-8 bg-info-50">
                                        <span
                                            class="text-white bg-info-600 w-36 h-36 rounded-circle flex-center text-xl flex-shrink-0"><i
                                                class="ph ph-users-three"></i></span>
                                        <div>
                                            <h4 class="mb-0">289k</h4>
                                            <span class="fw-medium text-info-600">Following</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-4 col-xl-6 col-md-4 col-sm-6">
                                    <div class="statistics-card p-xl-4 p-16 flex-align gap-10 rounded-8 bg-purple-50">
                                        <span
                                            class="text-white bg-purple-600 w-36 h-36 rounded-circle flex-center text-xl flex-shrink-0"><i
                                                class="ph ph-thumbs-up"></i></span>
                                        <div>
                                            <h4 class="mb-0">1256k</h4>
                                            <span class="fw-medium text-purple-600">Likes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-24">
                                <div class="flex-align gap-8 flex-wrap mb-16">
                                    <span
                                        class="flex-center w-36 h-36 text-main-600 bg-main-100 rounded-circle text-xl">
                                        <i class="ph ph-phone"></i>
                                    </span>
                                    <div class="flex-align gap-8 flex-wrap text-gray-600">
                                        <span>+00 123 456 789</span>
                                        <span>+00 123 456 789</span>
                                    </div>
                                </div>
                                <div class="flex-align gap-8 flex-wrap mb-16">
                                    <span
                                        class="flex-center w-36 h-36 text-main-600 bg-main-100 rounded-circle text-xl">
                                        <i class="ph ph-envelope-simple"></i>
                                    </span>
                                    <div class="flex-align gap-8 flex-wrap text-gray-600">
                                        <span>exampleinfo1@mail.com,</span>
                                        <span>exampleinfo2@mail.com</span>
                                    </div>
                                </div>
                                <div class="flex-align gap-8 flex-wrap mb-16">
                                    <span
                                        class="flex-center w-36 h-36 text-main-600 bg-main-100 rounded-circle text-xl">
                                        <i class="ph ph-map-pin"></i>
                                    </span>
                                    <div class="flex-align gap-8 flex-wrap text-gray-600">
                                        <span>Inner Circular Road, New York City, 0123</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mt-24">
                        <div class="card-body">
                            <h6 class="mb-12">About Me</h6>
                            <div class="recent-post rounded-8 border border-gray-100 p-16 d-flex gap-12 mb-16">
                                <div class="d-inline-flex w-100 max-w-130 flex-shrink-0">
                                    <img src="assets/images/thumbs/recent-post-img1.png" alt=""
                                        class="rounded-6 cover-img max-w-130">
                                </div>
                                <div>
                                    <p class="text-gray-600 text-line-3">Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Commodo pellentesque massa tellus ac augue. Lectus arcu at in
                                        in rhoncus malesuada ipsum turpis.</p>
                                    <div class="flex-align gap-8 mt-24">
                                        <img src="assets/images/thumbs/user-img1.png" alt=""
                                            class="w-32 h-32 rounded-circle cover-img">
                                        <span class="text-gray-600 text-13">Michel Bruice</span>
                                    </div>
                                </div>
                            </div>
                            <div class="recent-post rounded-8 border border-gray-100 p-16 d-flex gap-12 mb-16">
                                <div class="d-inline-flex w-100 max-w-130 flex-shrink-0">
                                    <img src="assets/images/thumbs/recent-post-img2.png" alt=""
                                        class="rounded-6 cover-img max-w-130">
                                </div>
                                <div>
                                    <p class="text-gray-600 text-line-3">Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Commodo pellentesque massa tellus ac augue. Lectus arcu at in
                                        in rhoncus malesuada ipsum turpis.</p>
                                    <div class="flex-align gap-8 mt-24">
                                        <img src="assets/images/thumbs/user-img2.png" alt=""
                                            class="w-32 h-32 rounded-circle cover-img">
                                        <span class="text-gray-600 text-13">Sara Smith</span>
                                    </div>
                                </div>
                            </div>

                            <h6 class="mb-12 mt-24">Add New Post</h6>
                            <div class="editor style-two">
                                <div id="editorTwo">
                                    <p>Write something new...</p>
                                </div>
                            </div>

                            <div class="flex-between flex-wrap gap-8 mt-24">
                                <div class="flex-align flex-wrap gap-8">
                                    <button type="button"
                                        class="flex-center w-26 h-26 text-gray-600 bg-gray-50 hover-bg-gray-100 rounded-circle text-md">
                                        <i class="ph ph-smiley"></i>
                                    </button>
                                    <button type="button"
                                        class="flex-center w-26 h-26 text-gray-600 bg-gray-50 hover-bg-gray-100 rounded-circle text-md">
                                        <i class="ph ph-camera"></i>
                                    </button>
                                    <button type="button"
                                        class="flex-center w-26 h-26 text-gray-600 bg-gray-50 hover-bg-gray-100 rounded-circle text-md">
                                        <i class="ph ph-image"></i>
                                    </button>
                                    <button type="button"
                                        class="flex-center w-26 h-26 text-gray-600 bg-gray-50 hover-bg-gray-100 rounded-circle text-md">
                                        <i class="ph ph-video-camera"></i>
                                    </button>
                                    <button type="button"
                                        class="flex-center w-26 h-26 text-gray-600 bg-gray-50 hover-bg-gray-100 rounded-circle text-md">
                                        <i class="ph ph-google-drive-logo"></i>
                                    </button>
                                </div>
                                <button type="submit" class="btn btn-main rounded-pill py-9"> Post Now</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Profile Tab End -->

        <!-- Password Tab Start -->
        <div class="tab-pane fade" id="pills-password" role="tabpanel" aria-labelledby="pills-password-tab"
            tabindex="0">
            <div class="card mt-24">
                <div class="card-header border-bottom">
                    <h4 class="mb-4">Password Settings</h4>
                    <p class="text-gray-600 text-15">Please fill full details about yourself</p>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <form action="#">
                                <div class="row gy-4">
                                    <div class="col-12">
                                        <label for="current-password" class="form-label mb-8 h6">Current
                                            Password</label>
                                        <div class="position-relative">
                                            <input type="password" class="form-control py-11" id="oldpassword"
                                                placeholder="Enter Current Password">
                                            <span
                                                class="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph ph-eye-slash"
                                                id="#current-password"></span>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <label for="new-password" class="form-label mb-8 h6">New Password</label>
                                        <div class="position-relative">
                                            <input type="password" class="form-control py-11" id="new-password"
                                                placeholder="Enter New Password">
                                            <span
                                                class="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph ph-eye-slash"
                                                id="#new-password"></span>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <label for="confirm-password" class="form-label mb-8 h6">Confirm
                                            Password</label>
                                        <div class="position-relative">
                                            <input type="password" class="form-control py-11" id="confirm-password"
                                                placeholder="Enter Confirm Password">
                                            <span
                                                class="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph ph-eye-slash"
                                                id="#confirm-password"></span>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <label class="form-label mb-8 h6">Password Requirements:</label>
                                        <ul class="list-inside">
                                            <li class="text-gray-600 mb-4">At least one lowercase character</li>
                                            <li class="text-gray-600 mb-4">Minimum 8 characters long - the more, the
                                                better</li>
                                            <li class="text-gray-300 mb-4">At least one number, symbol, or whitespace
                                                character</li>
                                        </ul>
                                    </div>
                                    <div class="col-12">
                                        <label class="form-label mb-8 h6">Two-Step Verification</label>
                                        <ul>
                                            <li class="text-gray-600 mb-4 fw-semibold">Two-factor authentication is not
                                                enabled yet.</li>
                                            <li class="text-gray-600 mb-4 fw-medium">Two-factor authentication adds a
                                                layer of security to your account by requiring more than just a password
                                                to log in. Learn more.</li>
                                        </ul>
                                        <button type="submit" class="btn btn-main rounded-pill py-9 mt-24">Enable
                                            two-factor authentication</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="col-12">
                            <div class="flex-align justify-content-end gap-8">
                                <button type="reset"  id="passwordResetForm"
                                    class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Cancel</button>
                                <button type="submit" id="changePasswordButton" class="btn btn-main rounded-pill py-9">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Password Tab End -->

        <!-- Plan Tab Start -->

        <!-- Plan Tab End -->

        <!-- Billing Tab Start -->
        <!-- <div class="tab-pane fade" id="pills-billing" role="tabpanel" aria-labelledby="pills-billing-tab" tabindex="0">
                   
                    <div class="card mt-24">
                        <div class="card-header border-bottom">
                            <h4 class="mb-4">Payment Method</h4>
                            <p class="text-gray-600 text-15">Update your billing details and address</p>
                        </div>
                        <div class="card-body">
                            <div class="row gy-4">
                                <div class="col-lg-5">
                                    <div class="card border border-gray-100">
                                        <div class="card-header border-bottom border-gray-100">
                                            <h6 class="mb-0">Contact Email</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="payment-method payment-method-one form-check form-radio d-flex align-items-center justify-content-between mb-16 rounded-16 bg-main-50 p-20 cursor-pointer position-relative transition-2">
                                                <div>
                                                    <h6 class="title mb-14">Send to my email account</h6>
                                                    <span class="d-block">exampleinfo@mail.com</span>
                                                </div>
                                                <label class="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 cursor-pointer" for="emailOne"></label>
                                                <input class="form-check-input payment-method-one" type="radio" name="emailCheck" id="emailOne">
                                            </div>
                                            <div class="payment-method payment-method-one form-check form-radio d-block rounded-16 bg-main-50 p-20 cursor-pointer position-relative transition-2 mt-24">
                                                <div class="flex-between  mb-14 gap-4">
                                                    <h6 class="title mb-0">Send to an alternative email</h6>
                                                    <input class="form-check-input payment-method-one" type="radio" name="emailCheck" id="emailTwo">
                                                </div>
                                                <label class="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 cursor-pointer" for="emailTwo"></label>
                                                <span class="border-text d-block bg-white border border-main-200 px-20 py-8 rounded-8">exampleinfo@mail.com</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-7">
                                    <div class="card border border-gray-100">
                                        <div class="card-header border-bottom border-gray-100 flex-between gap-8">
                                            <h6 class="mb-0">Card Details</h6>
                                            <a href="#" class="btn btn-outline-main rounded-pill py-6">Add New Card</a>
                                        </div>
                                        <div class="card-body">
                                            <div class="payment-method payment-method-two form-check form-radio d-flex align-items-center justify-content-between mb-16 rounded-16 bg-main-50 p-20 cursor-pointer position-relative transition-2">
                                                <div class="flex-align align-items-start gap-16">
                                                    <div>
                                                        <img src="assets/images/thumbs/payment-method1.png" alt="" class="w-54 h-40 rounded-8">
                                                    </div>
                                                    <div>
                                                        <h6 class="title mb-0">Visa **** **** 5890</h6>
                                                        <span class="d-block">Up to 60 User and 100GB team data</span>
                                                        <div class="text-13 flex-align gap-8 mt-12 pt-12 border-top border-gray-100">
                                                            <span>Set as default</span>
                                                            <a href="#" class="fw-bold">Edit</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <label class="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 cursor-pointer" for="visaCard"></label>
                                                <input class="form-check-input payment-method-two" type="radio" name="cardDetails" id="visaCard">
                                            </div>
                                            <div class="payment-method payment-method-two form-check form-radio d-flex align-items-center justify-content-between rounded-16 bg-main-50 p-20 cursor-pointer position-relative transition-2">
                                                <div class="flex-align align-items-start gap-16">
                                                    <div>
                                                        <img src="assets/images/thumbs/payment-method2.png" alt="" class="w-54 h-40 rounded-8">
                                                    </div>
                                                    <div>
                                                        <h6 class="title mb-0">Mastercard **** **** 1895</h6>
                                                        <span class="d-block">Up to 60 User and 100GB team data</span>
                                                    </div>
                                                </div>
                                                <label class="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 cursor-pointer" for="masterCard"></label>
                                                <input class="form-check-input payment-method-two" type="radio" name="cardDetails" id="masterCard">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
              

                
                    <div class="card mt-24">
                        <div class="card-header border-bottom">
                            <div class="flex-between flex-wrap  gap-16">
                                <div>
                                    <h4 class="mb-4">Billing History</h4>
                                    <p class="text-gray-600 text-15">See the transaction you made</p>
                                </div>
                                <div class="flex-align flex-wrap justify-content-end gap-8">
                                    <button type="button" class="toggle-search-btn btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Add Filter</button>
                                    <button type="button" class="btn btn-main rounded-pill py-9">Download All</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card toggle-search-box border-bottom border-gray-100 rounded-0">
                            <div class="card-body">
                                <form action="#" class="search-input-form">
                                    <div class="search-input">
                                        <select class="form-control form-select h6 rounded-4 mb-0 py-6 px-8">
                                            <option value="" selected disabled>Invoice Type</option>
                                            <option value="">Credit Invoice</option>
                                            <option value="">Debit Invoice</option>
                                            <option value="">Mixed Invoice</option>
                                            <option value="">Commercial Invoice</option>
                                        </select>
                                    </div>
                                    <div class="search-input">
                                        <select class="form-control form-select h6 rounded-4 mb-0 py-6 px-8">
                                            <option value="" selected disabled>amount</option>
                                            <option value="">1</option>
                                            <option value="">2</option>
                                            <option value="">3</option>
                                        </select>
                                    </div>
                                    <div class="search-input">
                                        <input type="date" class="form-control form-select h6 rounded-4 mb-0 py-6 px-8">
                                    </div>
                                    <div class="search-input">
                                        <select class="form-control form-select h6 rounded-4 mb-0 py-6 px-8">
                                            <option value="" selected disabled>plan</option>
                                            <option value="">Basic Plan</option>
                                            <option value="">Standard Plan</option>
                                            <option value="">Premium Plan </option>
                                        </select>
                                    </div>
                                    <div class="search-input">
                                        <button type="submit" class="btn btn-main rounded-pill py-9 w-100">Apply Filter</button>
                                    </div>
                                </form>                    
                            </div>
                        </div>

                        <div class="card-body p-0 overflow-x-auto">
                            <table id="studentTable" class="table table-lg table-striped w-100">
                                <thead>
                                    <tr>
                                        <th class="fixed-width w-40 h-40 ps-20">
                                            <div class="form-check">
                                                <input class="form-check-input border-gray-200 rounded-4" type="checkbox" id="selectAll">
                                            </div>
                                        </th>
                                        <th class="h6 text-gray-600">
                                            <span class="position-relative">
                                                Invoices
                                            </span>
                                        </th>
                                        <th class="h6 text-gray-600 text-center">Amount</th>
                                        <th class="h6 text-gray-600 text-center">Dates</th>
                                        <th class="h6 text-gray-600 text-center">Status</th>
                                        <th class="h6 text-gray-600 text-center">Plan</th>
                                        <th class="h6 text-gray-600 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="fixed-width w-40 h-40">
                                            <div class="form-check">
                                                <input class="form-check-input border-gray-200 rounded-4" type="checkbox">
                                            </div>
                                        </td>
                                        <td>
                                            <div class="flex-align gap-10">
                                                <div class="w-32 h-32 bg-gray-50 flex-center rounded-circle p-2"> 
                                                    <img src="assets/images/thumbs/invoice-logo1.png" alt="" class="">
                                                </div>
                                                <div class="">
                                                    <h6 class="mb-0">Design Accesibility</h6>
                                                    <span class="text-13 fw-medium text-gray-200">Edmate - #012500</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-gray-600">$180</span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-gray-600">06/22/2024</span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-success-600 bg-success-100 py-2 px-10 rounded-pill">Paid</span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-gray-600">Basic</span>
                                        </td>
                                        <td class="text-center">
                                            <button type="button" class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-12">Download</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="fixed-width w-40 h-40">
                                            <div class="form-check">
                                                <input class="form-check-input border-gray-200 rounded-4" type="checkbox">
                                            </div>
                                        </td>
                                        <td>
                                            <div class="flex-align gap-10">
                                                <div class="w-32 h-32 bg-gray-50 flex-center rounded-circle p-2"> 
                                                    <img src="assets/images/thumbs/invoice-logo2.png" alt="" class="">
                                                </div>
                                                <div class="">
                                                    <h6 class="mb-0">Design System</h6>
                                                    <span class="text-13 fw-medium text-gray-200">Edmate - #012500</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-gray-600">$250</span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-gray-600">06/22/2024</span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-info-600 bg-info-100 py-2 px-10 rounded-pill">Unpaid</span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-gray-600">Professional</span>
                                        </td>
                                        <td class="text-center">
                                            <button type="button" class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-12">Download</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="fixed-width w-40 h-40">
                                            <div class="form-check">
                                                <input class="form-check-input border-gray-200 rounded-4" type="checkbox">
                                            </div>
                                        </td>
                                        <td>
                                            <div class="flex-align gap-10">
                                                <div class="w-32 h-32 bg-gray-50 flex-center rounded-circle p-2"> 
                                                    <img src="assets/images/thumbs/invoice-logo1.png" alt="" class="">
                                                </div>
                                                <div class="">
                                                    <h6 class="mb-0">Frondend Develop</h6>
                                                    <span class="text-13 fw-medium text-gray-200">Edmate - #012500</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-gray-600">$128</span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-gray-600">06/22/2024</span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-success-600 bg-success-100 py-2 px-10 rounded-pill">Paid</span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-gray-600">Basic</span>
                                        </td>
                                        <td class="text-center">
                                            <button type="button" class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-12">Download</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="fixed-width w-40 h-40">
                                            <div class="form-check">
                                                <input class="form-check-input border-gray-200 rounded-4" type="checkbox">
                                            </div>
                                        </td>
                                        <td>
                                            <div class="flex-align gap-10">
                                                <div class="w-32 h-32 bg-gray-50 flex-center rounded-circle p-2"> 
                                                    <img src="assets/images/thumbs/invoice-logo1.png" alt="" class="">
                                                </div>
                                                <div class="">
                                                    <h6 class="mb-0">Design Usability</h6>
                                                    <span class="text-13 fw-medium text-gray-200">Edmate - #012500</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-gray-600">$132</span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-gray-600">06/22/2024</span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-info-600 bg-info-100 py-2 px-10 rounded-pill">Unpaid</span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-gray-600">Basic</span>
                                        </td>
                                        <td class="text-center">
                                            <button type="button" class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-12">Download</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="fixed-width w-40 h-40">
                                            <div class="form-check">
                                                <input class="form-check-input border-gray-200 rounded-4" type="checkbox">
                                            </div>
                                        </td>
                                        <td>
                                            <div class="flex-align gap-10">
                                                <div class="w-32 h-32 bg-gray-50 flex-center rounded-circle p-2"> 
                                                    <img src="assets/images/thumbs/invoice-logo4.png" alt="" class="">
                                                </div>
                                                <div class="">
                                                    <h6 class="mb-0">Digital Marketing</h6>
                                                    <span class="text-13 fw-medium text-gray-200">Edmate - #012500</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-gray-600">$186</span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-gray-600">06/22/2024</span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-success-600 bg-success-100 py-2 px-10 rounded-pill">Paid</span>
                                        </td>
                                        <td class="text-center">
                                            <span class="text-gray-600">Advance</span>
                                        </td>
                                        <td class="text-center">
                                            <button type="button" class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-12">Download</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="card-footer border-top border-gray-100">
                            <div class="flex-align justify-content-end gap-8">
                                <button type="reset" class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Cancel</button>
                                <button type="submit" class="btn btn-main rounded-pill py-9">Save  Changes</button>
                            </div>
                        </div>
                    </div>
                  
                </div> -->


        <!-- Notification Tab Start -->
        <!-- <div class="tab-pane fade" id="pills-notification" role="tabpanel" aria-labelledby="pills-notification-tab" tabindex="0">
                    <div class="card mt-24">
                        <div class="card-header border-bottom">
                            <h4 class="mb-4">Notifiction Settings</h4>
                            <p class="text-gray-600 text-15">We may still send you important notification about your account outside of your notification settings.</p>
                        </div>
                        <div class="card-body">
                            <div class="pt-24 pb-24 border-bottom border-gray-100">
                                <div class="row gy-4">
                                    <div class="col-sm-6 col-xs-6">
                                        <h6 class="mb-8">Comments</h6>
                                        <p class="max-w-280 text-gray-600 text-13">These are notifications for comments on your posts and replies to your comments</p>
                                    </div>
                                    <div class="col-sm-6 col-xs-6">
                                        <div class="form-switch switch-primary d-flex align-items-center gap-8 mb-16">
                                            <input class="form-check-input" type="checkbox" role="switch" id="switch1">
                                            <label class="form-check-label line-height-1 fw-medium text-secondary-light" for="switch1">Push</label>
                                        </div>
                                        <div class="form-switch switch-primary d-flex align-items-center gap-8 mb-16">
                                            <input class="form-check-input" type="checkbox" role="switch" id="switch2" checked>
                                            <label class="form-check-label line-height-1 fw-medium text-secondary-light" for="switch2">Email</label>
                                        </div>
                                        <div class="form-switch switch-primary d-flex align-items-center gap-8 mb-16">
                                            <input class="form-check-input" type="checkbox" role="switch" id="switch3" checked>
                                            <label class="form-check-label line-height-1 fw-medium text-secondary-light" for="switch3">SMS</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pt-24 pb-24 border-bottom border-gray-100">
                                <div class="row gy-4">
                                    <div class="col-sm-6 col-xs-6">
                                        <h6 class="mb-8">Tags</h6>
                                        <p class="max-w-280 text-gray-600 text-13">These are notifications for when someone tags you in a comment, post or story</p>
                                    </div>
                                    <div class="col-sm-6 col-xs-6">
                                        <div class="form-switch switch-primary d-flex align-items-center gap-8 mb-16">
                                            <input class="form-check-input" type="checkbox" role="switch" id="switch4" checked>
                                            <label class="form-check-label line-height-1 fw-medium text-secondary-light" for="switch4">Push</label>
                                        </div>
                                        <div class="form-switch switch-primary d-flex align-items-center gap-8 mb-16">
                                            <input class="form-check-input" type="checkbox" role="switch" id="switch5" >
                                            <label class="form-check-label line-height-1 fw-medium text-secondary-light" for="switch5">Email</label>
                                        </div>
                                        <div class="form-switch switch-primary d-flex align-items-center gap-8 mb-16">
                                            <input class="form-check-input" type="checkbox" role="switch" id="switch6" >
                                            <label class="form-check-label line-height-1 fw-medium text-secondary-light" for="switch6">SMS</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pt-24 pb-24 border-bottom border-gray-100">
                                <div class="row gy-4">
                                    <div class="col-sm-6 col-xs-6">
                                        <h6 class="mb-8">Reminders</h6>
                                        <p class="max-w-280 text-gray-600 text-13">These are notifications to reminds you of updates you might have missed.</p>
                                    </div>
                                    <div class="col-sm-6 col-xs-6">
                                        <div class="form-switch switch-primary d-flex align-items-center gap-8 mb-16">
                                            <input class="form-check-input" type="checkbox" role="switch" id="switch7" checked>
                                            <label class="form-check-label line-height-1 fw-medium text-secondary-light" for="switch7">Push</label>
                                        </div>
                                        <div class="form-switch switch-primary d-flex align-items-center gap-8 mb-16">
                                            <input class="form-check-input" type="checkbox" role="switch" id="switch8">
                                            <label class="form-check-label line-height-1 fw-medium text-secondary-light" for="switch8">Email</label>
                                        </div>
                                        <div class="form-switch switch-primary d-flex align-items-center gap-8 mb-16">
                                            <input class="form-check-input" type="checkbox" role="switch" id="switch9" checked>
                                            <label class="form-check-label line-height-1 fw-medium text-secondary-light" for="switch9">SMS</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pt-24 border-bottom border-gray-100">
                                <div class="row gy-4">
                                    <div class="col-sm-6 col-xs-6">
                                        <h6 class="mb-8">More activity about you</h6>
                                        <p class="max-w-280 text-gray-600 text-13">These are notification for posts on your profile, likes and other reactions to your posts, and more.</p>
                                    </div>
                                    <div class="col-sm-6 col-xs-6">
                                        <div class="form-switch switch-primary d-flex align-items-center gap-8 mb-16">
                                            <input class="form-check-input" type="checkbox" role="switch" id="switch10" checked>
                                            <label class="form-check-label line-height-1 fw-medium text-secondary-light" for="switch10">Push</label>
                                        </div>
                                        <div class="form-switch switch-primary d-flex align-items-center gap-8 mb-16">
                                            <input class="form-check-input" type="checkbox" role="switch" id="switch11" >
                                            <label class="form-check-label line-height-1 fw-medium text-secondary-light" for="switch11">Email</label>
                                        </div>
                                        <div class="form-switch switch-primary d-flex align-items-center gap-8 mb-16">
                                            <input class="form-check-input" type="checkbox" role="switch" id="switch12" checked>
                                            <label class="form-check-label line-height-1 fw-medium text-secondary-light" for="switch12">SMS</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="flex-align justify-content-end gap-8">
                                <button type="reset" class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Cancel</button>
                                <button type="submit" class="btn btn-main rounded-pill py-9">Save  Changes</button>
                            </div>
                        </div>
                    </div>
                </div> -->
        <!-- Notification Tab End -->

    </div>
</div>


<?php include './include/footer.php'; ?>