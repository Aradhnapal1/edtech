<?php include './include/header.php'; ?>

<div class="dashboard-body">

    <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <!-- Breadcrumb Start -->
        <div class="breadcrumb mb-24">
            <ul class="flex-align gap-4">
                <li><a href="index.php" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
                <li> <span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span> </li>
                <li><span class="text-main-600 fw-normal text-15">Add Student</span></li>
            </ul>
        </div>
        <!-- Breadcrumb End -->

        <!-- Buttons Start -->
        <div class="flex-align justify-content-end gap-8">
            <button type="button" class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Save as Draft</button>
            <button type="button" class="btn btn-main rounded-pill py-9" id="publishStudentBtn" >Publish Student</button>
        </div>
        <!-- Buttons End -->
    </div>
 

    <!-- Create Student Step List Start -->
    <ul class="step-list mb-24">
        <li class="step-list__item py-15 px-24 text-15 text-heading fw-medium flex-center gap-6 active">
            <span class="icon text-xl d-flex"><i class="ph ph-circle"></i></span>
           Add Student Details
            <span class="line position-relative"></span>
        </li>
    </ul>
    <!-- Create Student Step List End -->

    <!-- Student Tab Start -->
    <div class="card">
        <div class="card-header border-bottom border-gray-100 flex-align gap-8">
            <h5 class="mb-0">Add Student Details</h5>
            <button type="button" class="text-main-600 text-md d-flex" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Student Details">
                <i class="ph-fill ph-question"></i>
            </button>
        </div>
        <div class="card-body">
            <form id="addStudentForm" action="#">
                <div class="row gy-20">
                    <div class="col-xxl-3 col-md-4 col-sm-5">
                        <div class="mb-20">
                            <label class="h5 fw-semibold font-heading mb-0">Profile Image <span class="text-13 text-gray-400 fw-medium">(Optional)</span> </label>
                        </div>
                        <div id="fileUpload" class="fileUpload image-upload file-container">
                        <label for="fileUpload-2" class="file-upload image-upload__box">
                            <div class="image-upload__boxInner">
                                <i class="ph ph-image mb-8 image-upload__icon"></i>
                                <h5 class="mb-4">Drag or <span class="text-main-600"> Browse</span></h5>
                                <p class="text-13">PNG, JPEG (max 5mb size)</p>
                                
                            </div>
                            <input type="file" id="fileUpload-2" name="[]" multiple="" hidden="">
                        </label>
                    </div>
                </div>
                    <div class="col-xxl-9 col-md-8 col-sm-7">
                        <div class="row g-20">
                            
                            <div class="col-sm-6">
                                <label for="firstName" class="h5 mb-8 fw-semibold font-heading">First Name</label>
                                <div class="position-relative">
                                    <input type="text" id="firstName" class="form-control py-9 placeholder-13 text-15" placeholder="Enter First Name">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label for="LastName" class="h5 mb-8 fw-semibold font-heading">Last Name</label>
                                <div class="position-relative">
                                    <input type="text" id="LastName" class="form-control py-9 placeholder-13 text-15" placeholder="Enter Last Name">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label for="studentEmail" class="h5 mb-8 fw-semibold font-heading">Email Address</label>
                                <div class="position-relative">
                                    <input type="email" id="studentEmail" class="form-control py-9 placeholder-13 text-15" placeholder="Enter Email Address">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label for="studentPhone" class="h5 mb-8 fw-semibold font-heading">Phone Number</label>
                                <div class="position-relative">
                                    <input type="text" id="studentPhone" class="form-control py-9 placeholder-13 text-15" placeholder="Enter Phone Number">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label for="studentPassword" class="h5 mb-8 fw-semibold font-heading">password</label>
                                <div class="position-relative">
                                    <input type="text" id="studentPassword" class="form-control py-9 placeholder-13 text-15" placeholder="Enter Password">
                                </div>
                            </div>
                            
                            <!-- <div class="col-sm-6">
                                <label for="studentGender" class="h5 mb-8 fw-semibold font-heading">Gender</label>
                                <div class="position-relative">
                                    <select id="studentGender" class="form-select py-9 placeholder-13 text-15">
                                        <option value="" disabled selected>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div> -->
                            <!-- <div class="col-sm-6">
                                <label for="studentDOB" class="h5 mb-8 fw-semibold font-heading">Date of Birth</label>
                                <div class="position-relative">
                                    <input type="date" id="studentDOB" class="form-control py-9 placeholder-13 text-15">
                                </div>
                            </div> -->
                            <!-- <div class="col-sm-12">
                                <label for="studentAddress" class="h5 mb-8 fw-semibold font-heading">Address</label>
                                <div class="position-relative">
                                    <textarea id="studentAddress" class="form-control py-9 placeholder-13 text-15" rows="3" placeholder="Enter Address"></textarea>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <!-- Status Toggle -->
                    <div class="col-sm-12">
                        <label class="h5 mb-8 fw-semibold font-heading">Status</label>
                        <div class="d-flex align-items-center gap-12">
                            <label class="switch">
                                <input type="checkbox" id="statusToggle" checked>
                                <span class="slider"></span>
                            </label>
                            <span id="statusText" class="fw-semibold text-success">Active</span>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    </div>
    <!-- Student Tab End -->
</div>


<?php include './include/footer.php'; ?>

