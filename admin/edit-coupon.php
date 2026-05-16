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
            <button type="button" class="btn btn-main rounded-pill py-9" id="editCouponBtn">Publish Course</button>




        </div>
    </div>

    <ul class="step-list mb-24">
        <li class="step-list__item py-15 px-24 text-15 text-heading fw-medium flex-center gap-6 active">
            <span class="icon text-xl d-flex"><i class="ph ph-circle"></i></span>
            Edit Coupon
            <span class="line position-relative"></span>
        </li>
    </ul>

    <div class="card">
        <div class="card-header border-bottom border-gray-100 flex-align gap-8">
            <h5 class="mb-0">Edit Coupon </h5>
            <button type="button" class="text-main-600 text-md d-flex" data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-title="Course Details">
                <i class="ph-fill ph-question"></i>
            </button>
        </div>
        <div class="card-body">
            <form action="#">
                <div class="row gy-20">
                    <div class="col-xxl-12 col-md-8 col-sm-7">
                        <div class="row g-20">

                            <!-- Coupon Name -->
                            <div class="col-sm-4">
                                <label class="h5 mb-8 fw-semibold font-heading">Coupon Name</label>
                                <input type="text" class="form-control py-9 placeholder-13 text-15" id="couponCode"
                                    placeholder="Enter Coupon Name">
                            </div>

                            <!-- Discount Type -->
                            <div class="col-sm-4">
                                <label class="h5 mb-8 fw-semibold font-heading">Discount Type</label>
                                <select id="discountType" class="form-select py-9 placeholder-13 text-15">
                                    <option value="">Select discount type</option>
                                    <option value="FLAT">FLAT</option>
                                    <option value="PERCENT">PERCENT</option>
                                </select>
                            </div>

                            <!-- Discount Value -->
                            <div class="col-sm-4">
                                <label class="h5 mb-8 fw-semibold font-heading">Discount Value</label>
                                <input type="number" class="form-control py-9 placeholder-13 text-15" id="discountValue"
                                    placeholder="Enter Discount Value">
                            </div>

                            <!-- Min Order Value -->
                            <div class="col-sm-4">
                                <label class="h5 mb-8 fw-semibold font-heading">Min Order Value</label>
                                <input type="number" class="form-control py-9 placeholder-13 text-15" id="minOrderValue"
                                    placeholder="Enter Min Order Value">
                            </div>

                            <!-- Max Discount -->
                            <div class="col-sm-4">
                                <label class="h5 mb-8 fw-semibold font-heading">Max Discount</label>
                                <input type="number" class="form-control py-9 placeholder-13 text-15" id="maxDiscount"
                                    placeholder="Enter Max Discount">
                            </div>

                            <!-- Start Date -->
                            <div class="col-sm-4">
                                <label class="h5 mb-8 fw-semibold font-heading">Start Date</label>
                                <input type="date" class="form-control py-9 placeholder-13 text-15" id="startdate">
                            </div>

                            <!-- End Date -->
                            <div class="col-sm-4">
                                <label class="h5 mb-8 fw-semibold font-heading">End Date</label>
                                <input type="date" class="form-control py-9 placeholder-13 text-15" id="enddate">
                            </div>

                            <div class="col-sm-4">
                                <label class="h5 mb-8 fw-semibold font-heading">Select Course</label>
                                <select id="courseId" class="form-select py-9 text-15">
                                    <option value="">Select Course</option>
                                </select>
                            </div>

                            <!-- Status -->
                            <div class="col-12">
                                <label class="h5 mb-8 fw-semibold font-heading d-block">
                                    Status
                                </label>

                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="statusCoupon" checked>
                                    <label class="form-check-label" for="statusCoupon" id="statuscheckcoupon">
                                        Active
                                    </label>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>

                <!-- Status Text Change Script -->
                <script>
                    const checkbox = document.getElementById("statusCoupon");
                    const text = document.getElementById("statuscheckcoupon");

                    checkbox.addEventListener("change", () => {
                        text.textContent = checkbox.checked ? "Active" : "Inactive";
                    });

                    // Discount type UX improvement
                    document.getElementById("discountType").addEventListener("change", function () {
                        const discountInput = document.getElementById("discountValue");

                        if (this.value === "PERCENT") {
                            discountInput.max = 100;
                            discountInput.placeholder = "Enter % (1–100)";
                        } else {
                            discountInput.removeAttribute("max");
                            discountInput.placeholder = "Enter flat amount";
                        }
                    });
                </script>

            </form>
        </div>
    </div>
</div>

<?php include './include/footer.php'; ?>