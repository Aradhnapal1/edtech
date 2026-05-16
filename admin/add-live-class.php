<?php include './include/header.php'; ?>


<div class="dashboard-body">

    <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div class="breadcrumb mb-24">
            <ul class="flex-align gap-4">
                <li><a href="index.php" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
                <li><span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span></li>
                <li><span class="text-main-600 fw-normal text-15">Live Class Upload</span></li>
            </ul>
        </div>

        <div class="flex-align justify-content-end gap-8">
            <button type="button"
                class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Save as
                Draft</button>
            <button type="button" class="btn btn-main rounded-pill py-9" id="addliveclass">Publish Live Class</button>
        </div>
    </div>

    <ul class="step-list mb-24">
        <li class="step-list__item py-15 px-24 text-15 text-heading fw-medium flex-center gap-6 active">
            <span class="icon text-xl d-flex"><i class="ph ph-circle"></i></span>
            Live Class Details
            <span class="line position-relative"></span>
        </li>
    </ul>

    <div class="card">
        <div class="card-header border-bottom border-gray-100 flex-align gap-8">
            <h5 class="mb-0">Live Class Details</h5>
            <button type="button" class="text-main-600 text-md d-flex" data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-title="Live Class Details">
                <i class="ph-fill ph-question"></i>
            </button>
        </div>

        <div class="card-body">
            <form action="#">
                <div class="row gy-20" >
                    <div class="col-xxl-3 col-md-4 col-sm-5">
                        <div class="mb-20">
                            <label class="h5 fw-semibold font-heading mb-0">Live Class Thumbnail <span
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

                            <!-- Live Class Name -->
                            <div class="col-sm-12">
                                <label for="liveClassName" class="h5 mb-8 fw-semibold font-heading">Live Class Name
                                </label>
                                <div class="position-relative">
                                    <input type="text" class="form-control py-11" id="liveClassName"
                                        placeholder="Enter Live Class Name">
                                </div>
                            </div>

                            <!-- Attend Live Class Teacher Name -->
                            <div class="col-sm-6">
                                <label for="faculty" class="h5 mb-8 fw-semibold font-heading">Attend Live Class
                                    Teacher Name</label>
                                <div class="position-relative">
                                    <select id="faculty" class="form-select py-9 text-15">
                                        <option value="" disabled selected>Select Faculty</option>
                                        <option value="1">Faculty 1</option>
                                        <option value="2">Faculty 2</option>
                                        <option value="3">Faculty 3</option>
                                    </select>

                                </div>
                            </div>

                            <!-- Live Class Date and Time -->
                            <div class="col-sm-6">
                                <label for="classDateTime" class="h5 mb-8 fw-semibold font-heading">Live Class Date
                                </label>
                                <div class="position-relative">
                                    <input type="date" class="form-control py-11" id="date">
                                </div>
                            </div>
                            <!-- start time -->
                            <div class="col-sm-6">
                                <label for="startTime" class="h5 mb-8 fw-semibold font-heading">Start Time</label>
                                <div class="position-relative">
                                    <input type="time" id="startTime" class="form-control py-11" required>
                                </div>
                            </div>

                            <!-- end time -->


                            <div class="col-sm-6">
                                <label for="endTime" class="h5 mb-8 fw-semibold font-heading">End Time</label>
                                <div class="position-relative">
                                    <input type="time" id="endTime" class="form-control py-11" required>
                                </div>
                            </div>


                            <!-- Batch -->
                            <div class="col-sm-6">
                                <label for="batchType" class="h5 mb-8 fw-semibold font-heading">Batch</label>
                                <div class="position-relative">
                                    <select id="batchType" class="form-select py-9 text-15">
                                        <option value="" disabled selected>Select Batch</option>
                                        <option value="Morning">Morning Batch</option>
                                        <option value="Evening">Evening Batch</option>
                                        <option value="Weekend">Weekend Batch</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Session (if you want to keep it) -->
                            <div class="col-sm-6">
                                <label for="batchSession" class="h5 mb-8 fw-semibold font-heading">Zoom Meeting
                                    Link</label>
                                <div class="position-relative">
                                    <input type="url" id="meetingLink" class="form-control py-11"
                                        placeholder="Enter Meeting Link (Zoom / Google Meet)" required>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

</div>


<?php include './include/footer.php'; ?>