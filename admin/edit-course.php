<?php include './include/header.php'; ?>

<div class="dashboard-body">

    <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div class="breadcrumb mb-24">
            <ul class="flex-align gap-4">
                <li><a href="index.php" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
                <li><span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span></li>
                <li><span class="text-main-600 fw-normal text-15">Create Account</span></li>
            </ul>
        </div>

        <div class="flex-align justify-content-end gap-8">
            <button type="button"
                class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Save as
                Draft</button>
            <button type="button" class="btn btn-main rounded-pill py-9" id="editpublishCourseBtn">Publish Course</button>




        </div>
    </div>

    <ul class="step-list mb-24">
        <li class="step-list__item py-15 px-24 text-15 text-heading fw-medium flex-center gap-6 active">
            <span class="icon text-xl d-flex"><i class="ph ph-circle"></i></span>
            Edit Course Details
            <span class="line position-relative"></span>
        </li>
    </ul>

    <div class="card">
        <div class="card-header border-bottom border-gray-100 flex-align gap-8">
            <h5 class="mb-0"> Edit Course Details</h5>
            <button type="button" class="text-main-600 text-md d-flex" data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-title="Course Details">
                <i class="ph-fill ph-question"></i>
            </button>
        </div>
        <div class="card-body">
            <form action="#">
                <div class="row gy-20">
                    <div class="col-xxl-3 col-md-4 col-sm-5 mb-3">
                        <div class="mb-2">
                            <label class="h5 fw-semibold font-heading mb-0">
                                Thumbnail Image <span class="text-13 text-gray-400 fw-medium">(Required)</span>
                            </label>
                        </div>

                
                        <div id="fileUploadWrapper" class="fileUpload image-upload position-relative"
                            style="border:2px dashed #ccc; padding:20px; cursor:pointer; text-align:center; min-height:220px; background:#f9f9f9; border-radius:8px;">

                            <div id="uploadPrompt">
                                <i class="bi bi-cloud-upload" style="font-size:40px; color:#ccc;"></i>
                                <p class="mt-3 mb-0" id="fileUploadText">Click to upload thumbnail image<br>
                                    <small class="text-muted">(PNG, JPG, JPEG, WEBP • Max 5MB recommended)</small></p>
                            </div>

                            <div id="previewContainer" style="display:none;">
                                <img id="imagePreview" style="width:100%;height:120px;object-fit:cover;border-radius:8px;" />
                                <p id="fileName" class="mt-2 mb-0 text-success fw-bold"></p>
                                <button type="button" id="removeImage" class="btn btn-sm btn-danger mt-2">Remove Image</button>
                            </div>

                            <input type="file" id="fileUpload" accept="image/png,image/jpeg,image/jpg,image/webp" style="display:none;" />
                        </div>

                    </div>



                  




                    <div class="col-xxl-9 col-md-8 col-sm-7">
                        <div class="row g-20">
                            <div class="col-sm-12">
                                <label for="courseTitle" class="h5 mb-8 fw-semibold font-heading">Course Name <span
                                        class="text-13 text-gray-400 fw-medium">(Required)</span></label>
                                <div class="position-relative">
                                    <input type="text" class="text-counter placeholder-13 form-control py-11 pe-76"
                                        maxlength="100" id="courseTitle" placeholder="Name of the Lesson">
                                    <div
                                        class="text-gray-400 position-absolute inset-inline-end-0 top-50 translate-middle-y me-16">
                                        <span id="current">0</span>
                                        <span id="maximum">/ 100</span>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <label for="courseCategory" class="h5 mb-8 fw-semibold font-heading">Course
                                    Category</label>
                                <select id="courseCategory" class="form-select py-9 placeholder-13 text-15"></select>
                            </div>

                            <div class="col-sm-6">
                                <label for="courseLevel" class="h5 mb-8 fw-semibold font-heading">Course Level</label>
<select id="courseLevel" class="form-select py-9 placeholder-13 text-15">
    <option value="" disabled selected>Select course level</option>
    <option value="Beginner">Beginner</option>
    <option value="Intermediate">Intermediate</option>
    <option value="Advanced">Advanced</option>
    <!-- If you have more levels, add them here -->
    <!-- Example: -->
    <!-- <option value="Expert">Expert</option> -->
</select>
                            </div>

                            <div class="col-sm-6">
                                <label for="courseTime" class="h5 mb-8 fw-semibold font-heading">Duration</label>
                                <select id="courseTime" class="form-select py-9 placeholder-13 text-15">
                                    <option value="1" disabled selected>Enter course duration</option>
                                    <option value="2">5 Hours</option>
                                    <option value="2">10 Hours</option>
                                    <option value="2">15 Hours</option>
                                    <option value="2">20 Hours</option>
                                </select>
                            </div>

                            <div class="col-sm-6">
                                <label for="courseLesson" class="h5 mb-8 fw-semibold font-heading">Total Lesson</label>
                                <select id="courseLesson" class="form-select py-9 placeholder-13 text-15">
                                    <option value="1" disabled selected>Select lesson type</option>
                                    <option value="2">Objectives</option>
                                    <option value="2">Activities</option>
                                    <option value="2">Materials</option>
                                    <option value="2">Timeline</option>
                                    <option value="2">Take home tasks</option>
                                    <option value="2">Pedagogical methods</option>
                                    <option value="2">Teacher's expectations</option>
                                    <option value="2">Assessment</option>
                                </select>
                            </div>

                            <!-- New Fields -->
                            <div class="col-sm-6">
                                <label for="courseLectures" class="h5 mb-8 fw-semibold font-heading">Total
                                    Lectures</label>
                                <input type="number" class="form-control py-9 placeholder-13 text-15"
                                    id="courseLectures" placeholder="Enter number of lectures">
                            </div>

                            <div class="col-sm-6">
                                <label for="courseLanguage" class="h5 mb-8 fw-semibold font-heading">
                                    Language
                                </label>

                                <select class="form-control py-9 placeholder-13 text-15" id="courseLanguage"> </select>
                            </div>

                            <div class="col-sm-6">
                                <label for="startclassdate" class="h5 mb-8 fw-semibold font-heading">
                                    Start Class Date
                                </label>
                                <input type="date" class="form-control py-9 placeholder-13 text-15" id="startclassdate">
                            </div>
                            <div class="col-sm-6">
                                <label for="demoStartDate" class="h5 mb-8 fw-semibold font-heading">
                                    Demo Start Date
                                </label>
                                <input type="date" class="form-control py-9 placeholder-13 text-15" id="demoStartDate">
                            </div>

                            <div class="col-sm-6">
                                <label for="demoEndDate" class="h5 mb-8 fw-semibold font-heading">
                                    Demo End Date
                                </label>
                                <input type="date" class="form-control py-9 placeholder-13 text-15" id="startEnddate">
                            </div>
                            <div class="col-sm-6">
                                <label for="maxLpa" class="h5 mb-8 fw-semibold font-heading">
                                    Maximum LPA
                                </label>
                                <input type="number" class="form-control py-9 placeholder-13 text-15" id="maxLpa"
                                    placeholder="e.g. 25" min="0" step="0.1">
                            </div>
                            <div class="col-sm-6">
                                <label for="minLpa" class="h5 mb-8 fw-semibold font-heading">
                                    Minimum LPA
                                </label>
                                <input type="number" class="form-control py-9 placeholder-13 text-15" id="minLpa"
                                    placeholder="e.g. 5" min="0" step="0.1">
                            </div>
                            <div class="col-sm-6">
                                <label for="mrpPrice" class="h5 mb-8 fw-semibold font-heading">
                                    MRP Price
                                </label>
                                <input type="number" class="form-control py-9 placeholder-13 text-15" id="mrpPrice"
                                    placeholder="e.g. 999" min="0" step="0.01">
                            </div>
                            <div class="col-sm-6">
                                <label for="sellingPrice" class="h5 mb-8 fw-semibold font-heading">
                                    Selling Price
                                </label>
                                <input type="number" class="form-control py-9 placeholder-13 text-15" id="sellingPrice"
                                    placeholder="e.g. 799" min="0" step="0.01">
                            </div>
                            <div class="col-6">
                                <label class="h5 mb-8 fw-semibold font-heading">Course Progress</label>
                                <input type="range" id="uploadSlider" min="0" max="100" value="0"
                                    style="width: 100%;" />
                                <span id="sliderValue">0%</span>
                            </div>

                            <script>const slider = document.getElementById("uploadSlider");
                                const sliderValue = document.getElementById("sliderValue");

                                // Update text when slider changes manually
                                slider.addEventListener("input", () => {
                                    sliderValue.textContent = slider.value + "%";
                                });

                                // Example: update slider programmatically (e.g., during upload)
                                function updateSliderProgress(percent) {
                                    slider.value = percent;
                                    sliderValue.textContent = percent + "%";
                                }
                            </script>







                            <div class="col-sm-12">
                                <label for="description" class="h5 mb-8 fw-semibold font-heading">Description</label>
                                <textarea id="description" rows="4" class="form-control py-9 placeholder-13 text-15"
                                    placeholder="Write a brief Description of the course"></textarea>
                            </div>

                            <div class="col-sm-12">
                                <label for="overview" class="h5 mb-8 fw-semibold font-heading">Overview</label>
                                <textarea id="overview" rows="4" class="form-control py-9 placeholder-13 text-15"
                                    placeholder="Write a brief overview of the course"></textarea>
                            </div>

                            <div class="col-sm-12">
                                <label for="courseHighlights" class="h5 mb-8 fw-semibold font-heading">Course
                                    Highlights</label>
                                <textarea id="courseHighlights" rows="4"
                                    class="form-control py-9 placeholder-13 text-15"
                                    placeholder="Highlight key features of the course"></textarea>
                            </div>

                            <div class="col-sm-12">
                                <label for="courseDetails" class="h5 mb-8 fw-semibold font-heading">Course
                                    Details</label>
                                <textarea id="courseDetails" rows="4" class="form-control py-9 placeholder-13 text-15"
                                    placeholder="Provide in-depth course details"></textarea>
                            </div>

                            <div class="col-sm-12">
                                <label for="whyChooseUs" class="h5 mb-8 fw-semibold font-heading">Why Choose Us</label>
                                <textarea id="whyChooseUs" rows="4" class="form-control py-9 placeholder-13 text-15"
                                    placeholder="Explain why learners should choose this course"></textarea>
                            </div>
                            <div class="col-12">
                                <label class="h5 mb-8 fw-semibold font-heading d-block">
                                    Status
                                </label>

                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="statusCheckbox" checked>
                                    <label class="form-check-label" for="statusCheckbox" id="statusText">
                                        Active
                                    </label>
                                </div>
                            </div>

                            <script>
                                const checkbox = document.getElementById("statusCheckbox");
                                const text = document.getElementById("statusText");

                                checkbox.addEventListener("change", () => {
                                    text.textContent = checkbox.checked ? "Active" : "Inactive";
                                });
                            </script>


                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<?php include './include/footer.php'; ?>