<?php include './include/header.php'; ?>


<div class="dashboard-body">

    <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div class="breadcrumb mb-24">
            <ul class="flex-align gap-4">
                <li><a href="index.php" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
                <li><span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span></li>
                <li><span class="text-main-600 fw-normal text-15">Add New Testimonial</span></li>
            </ul>
        </div>

        <div class="flex-align justify-content-end gap-8">
            <button type="button"
                class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Save as
                Draft</button>
            <button type="button" class="btn btn-main rounded-pill py-9" id="addtestimonial">Publish
                Testimonial</button>
        </div>
    </div>

    <ul class="step-list mb-24">
        <li class="step-list__item py-15 px-24 text-15 text-heading fw-medium flex-center gap-6 active">
            <span class="icon text-xl d-flex"><i class="ph ph-circle"></i></span>
            Edit Testimonial Details
            <span class="line position-relative"></span>
        </li>
    </ul>

    <div class="card">
        <div class="card-header border-bottom border-gray-100 flex-align gap-8">
            <h5 class="mb-0">Testimonial Details</h5>
            <button type="button" class="text-main-600 text-md d-flex" data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-title="Testimonial Details">
                <i class="ph-fill ph-question"></i>
            </button>
        </div>

        <div class="card-body">
            <form action="#">
                <div class="row gy-20">
                    <div class="col-xxl-3 col-md-4 col-sm-5">
                        <div class="mb-20">
                            <label class="h5 fw-semibold font-heading mb-0">Testimonial Thumbnail <span
                                    class="text-13 text-gray-400 fw-medium">(Required)</span></label>
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


                            <div class="col-sm-12">
                                <label for="testimonialname" class="h5 mb-8 fw-semibold font-heading">Testimonial Name
                                </label>
                                <div class="position-relative">
                                    <input type="text" class="form-control py-11" id="testimonialname"
                                        placeholder="Enter Testimonial Name">
                                </div>
                            </div>

                            <!-- Session (if you want to keep it) -->
                            <div class="col-sm-6">
                                <label for="description" class="h5 mb-8 fw-semibold font-heading">Description</label>
                                <div class="position-relative">
                                    <input type="text" id="description" class="form-control py-11"
                                        placeholder="Enter Testimonial Description" required>

                                </div>
                            </div>


                            <div class="col-sm-6">
                                <label for="content" class="h5 mb-8 fw-semibold font-heading">Content </label>
                                <div class="position-relative">
                                    <textarea class="form-control py-11" id="content" rows="1"
                                        placeholder="Enter Testimonial Content"></textarea>
                                </div>
                            </div>


                            <!-- Live Class Date and Time -->
                            <div class="col-sm-6">
                                <label for="date" class="h5 mb-8 fw-semibold font-heading"> Date
                                </label>
                                <div class="position-relative">
                                    <input type="date" class="form-control py-11" id="date">
                                </div>
                            </div>





                        </div>
                    </div>
                </div>
                <!-- Added Toggle Button for Status at the bottom -->
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
            </form>
        </div>
    
    </div>

</div>


<?php include './include/footer.php'; ?>