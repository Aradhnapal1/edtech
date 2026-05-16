<?php include './include/header.php'; ?>



<div class="dashboard-body">

    <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <!-- Breadcrumb Start -->
        <div class="breadcrumb mb-24">
            <ul class="flex-align gap-4">
                <li><a href="index.php" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
                <li> <span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span> </li>
                <li><span class="text-main-600 fw-normal text-15"> Edit Course Category</span></li>
            </ul>
        </div>
        <!-- Breadcrumb End -->

        <!-- Buttons Start -->
        <div class="flex-align justify-content-end gap-8">
            <button type="button"
                class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Save as
                Draft</button>
            <!-- <button type="button" class="btn btn-main rounded-pill py-9" >Publish </button> -->
            <button type="button" id="publishCategoryBtn" class="btn btn-main rounded-pill py-9">
                Publish
            </button>

        </div>
        <!-- Buttons End -->
    </div>

    <!-- Create Course Step List Start -->
    <ul class="step-list mb-24">
        <li class="step-list__item py-15 px-24 text-15 text-heading fw-medium flex-center gap-6  active">
            <span class="icon text-xl d-flex"><i class="ph ph-circle"></i></span>
           Edit Course Category
            <span class="line position-relative"></span>
        </li>

    </ul>
    <!-- Create Course Step List End -->

    <!-- Course Tab Start -->
    <div class="card">
        <div class="card-header border-bottom border-gray-100 flex-align gap-8">
            <h5 class="mb-0">Course Details</h5>
            <button type="button" class="text-main-600 text-md d-flex" data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-title="Course Details">
                <i class="ph-fill ph-question"></i>
            </button>
        </div>
        <div class="card-body">
            <form action="#">
                <div class="row gy-20">
                    <div class="col-xxl-3 col-md-4 col-sm-5">
                        <div class="mb-20">
                            <label class="h5 fw-semibold font-heading mb-0">Thumbnail Image <span
                                    class="text-13 text-gray-400 fw-medium">(Required)</span> </label>
                        </div>
                        <div id="fileUpload" class="fileUpload image-upload file-container">
                            <label for="fileUpload-2" class="file-upload image-upload__box">
                                <div class="image-upload__boxInner">
                                    <i class="ph ph-image mb-8 image-upload__icon"></i>
                                    <h5 class="mb-4">Drag or <span class="text-main-600"> Browse</span></h5>
                                    <p class="text-13">PNG, JPEG (max 5mb size)</p>
                                </div>
                                <input type="file" id="fileUpload-2" name="categoryImage" accept="image/png, image/jpeg"
                                    hidden>
                            </label>
                        </div>
                    </div>
                    <div class="col-xxl-9 col-md-8 col-sm-7">
                        <div class="row g-20">
                            <div class="col-sm-12">
                                <label for="courseTitle" class="h5 mb-8 fw-semibold font-heading">Category Name<span
                                        class="text-13 text-gray-400 fw-medium">(Required)</span> </label>
                                <div class="position-relative">
                                    <input type="text" class="text-counter placeholder-13 form-control py-11 pe-76"
                                        maxlength="100" id="courseTitle" placeholder="Name of the Lesson">
                                    <div
                                        class="text-gray-400 position-absolute inset-inline-end-0 top-50 translate-middle-y me-16">
                                        <span id="current">18</span>
                                        <span id="maximum">/ 100</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <label for="categoryDescription" class="h5 mb-8 fw-semibold font-heading">Category
                                    Description</label>
                                <textarea id="categoryDescription" class="form-control py-11 placeholder-13" rows="4"
                                    placeholder="Enter category description"></textarea>
                            </div>

                            <!-- <div class="col-sm-6">
                                <label class="h5 mb-8 fw-semibold font-heading">Status</label>

                                <div class="form-check mt-2">
                                    <input class="form-check-input" type="checkbox" id="visibilityCheck">
                                    <label class="form-check-label" for="visibilityCheck">
                                        <span id="statusText">Inactive</span>
                                    </label>
                                </div>
                            </div> -->
                            <div class="col-sm-6">
                                <label class="h5 mb-8 fw-semibold font-heading">Status</label>
                                <div class="form-check mt-2">
                                    <input class="form-check-input" type="checkbox" id="visibilityCheck">
                                    <label class="form-check-label" for="visibilityCheck">
                                        <span id="statusText">Inactive</span>
                                    </label>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- Course Tab End -->
</div>


<?php include './include/footer.php'; ?>