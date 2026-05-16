<?php include './include/header.php'; ?>


<div class="dashboard-body">

    <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <!-- Breadcrumb Start -->
        <div class="breadcrumb mb-24">
            <ul class="flex-align gap-4">
                <li><a href="index.php" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
                <li> <span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span> </li>
                <li><span class="text-main-600 fw-normal text-15">Add Batch</span></li>
            </ul>
        </div>
        <!-- Breadcrumb End -->

        <!-- Buttons Start -->
        <div class="flex-align justify-content-end gap-8">
            <button type="button" class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Save as Draft</button>
            <button type="button" class="btn btn-main rounded-pill py-9" id="updateBatch">Update Batch</button>
        </div>
        <!-- Buttons End -->
    </div>

    <!-- Create Batch Step List Start -->
    <ul class="step-list mb-24">
        <li class="step-list__item py-15 px-24 text-15 text-heading fw-medium flex-center gap-6 active">
            <span class="icon text-xl d-flex"><i class="ph ph-circle"></i></span>
            Batch Details
            <span class="line position-relative"></span>
        </li>
       
    </ul>
    <!-- Create Batch Step List End -->

    <!-- Batch Tab Start -->
    <div class="card">
        <div class="card-header border-bottom border-gray-100 flex-align gap-8">
            <h5 class="mb-0">Batch Details</h5>
            <button type="button" class="text-main-600 text-md d-flex" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Batch Details">
                <i class="ph-fill ph-question"></i>
            </button>
        </div>
        <div class="card-body">
            <form action="#">
                <div class="row gy-20">
                    <div class="col-xxl-3 col-md-4 col-sm-5">
                        <div class="mb-20">
                            <label class="h5 fw-semibold font-heading mb-0">Batch Thumbnail <span class="text-13 text-gray-400 fw-medium">(Required)</span> </label>
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
                                <label for="batchTitle" class="h5 mb-8 fw-semibold font-heading">Batch Name <span class="text-13 text-gray-400 fw-medium">(Required)</span> </label>
                                <div class="position-relative">
                                    <input type="text" class="text-counter placeholder-13 form-control py-11 pe-76" maxlength="100" id="batchTitle" placeholder="Enter Batch Name">
                                   
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label for="batchTitle" class="h5 mb-8 fw-semibold font-heading">Course Name <span class="text-13 text-gray-400 fw-medium">(Required)</span> </label>
                                <div class="position-relative">
                                    <select id="editCourseName" class="form-select py-9 placeholder-13 text-15">
                                        <option value="">Select Course</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label for="batchStudent" class="h5 mb-8 fw-semibold font-heading">Student  </label>
                                <div class="position-relative">
                                    <input type="text" class="text-counter placeholder-13 form-control py-11 pe-76" maxlength="100" id="batchStudent" placeholder="Enter Student count ">
                                   
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label for="batchDate" class="h5 mb-8 fw-semibold font-heading">Batch Start Date  </label>
                                <div class="position-relative">
                                    <input type="date" class="form-control py-9 placeholder-13 text-15" maxlength="100" id="BatchStartDate" placeholder="date">
                                   
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label for="batchDate" class="h5 mb-8 fw-semibold font-heading">Batch End Date</label>
                                <div class="position-relative">
                                    <input type="date" class="form-control py-9 placeholder-13 text-15" maxlength="100" id="BatchEndDate" placeholder="date">
                                   
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label for="batchTime" class="h5 mb-8 fw-semibold font-heading">Batch Start Time</label>
                                <div class="position-relative">
                                    <input type="text" class="text-counter placeholder-13 form-control py-11 pe-76" maxlength="100" id="BatchStartTime" placeholder="Enter Start Time">
                                   
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label for="batchTime" class="h5 mb-8 fw-semibold font-heading">Batch End Time</label>
                                <div class="position-relative">
                                    <input type="text" class="text-counter placeholder-13 form-control py-11 pe-76" maxlength="100" id="BatchEndTime" placeholder="Enter End Time">
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-30">
                        <div class="d-flex align-items-center">
                            <label class="h5 fw-semibold font-heading mb-0 me-16">Status</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="statusToggle" checked>
                                <label class="form-check-label ms-3" for="statusToggle">
                                <span class="active-text fw-medium text-success">Active</span>
                                <span class="inactive-text fw-medium text-danger" style="display: none;">Inactive</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <script>
         const toggle = document.getElementById('statusToggle');
         const activeText = document.querySelector('.active-text');
         const inactiveText = document.querySelector('.inactive-text');
         
         function updateText() {
             if (toggle.checked) {
                 activeText.style.display = 'inline';
                 inactiveText.style.display = 'none';
             } else {
                 activeText.style.display = 'none';
                 inactiveText.style.display = 'inline';
             }
         }
         
         toggle.addEventListener('change', updateText);
         updateText(); // Initialize on load
      </script>
    </div>
    <!-- Batch Tab End -->
</div>

<?php include './include/footer.php'; ?>