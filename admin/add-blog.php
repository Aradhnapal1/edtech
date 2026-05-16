<?php include './include/header.php'; ?>

<div class="dashboard-body">

    <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div class="breadcrumb mb-24">
            <ul class="flex-align gap-4">
                <li><a href="index.php" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
                <li><span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span></li>
                <li><span class="text-main-600 fw-normal text-15">Add Blog</span></li>
            </ul>
        </div>

        <div class="flex-align justify-content-end gap-8">
            <button type="button" class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Save as Draft</button>
            <button type="button" id="addblog" class="btn btn-main rounded-pill py-9">Publish Blog</button>
        </div>
    </div>

    <ul class="step-list mb-24">
        <li class="step-list__item py-15 px-24 text-15 text-heading fw-medium flex-center gap-6 active">
            <span class="icon text-xl d-flex"><i class="ph ph-circle"></i></span>
            Blog Details
            <span class="line position-relative"></span>
        </li>
    </ul>

    <div class="card">
        <div class="card-header border-bottom border-gray-100 flex-align gap-8">
            <h5 class="mb-0">Blog Details</h5>
            <button type="button" class="text-main-600 text-md d-flex" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Course Details">
                <i class="ph-fill ph-question"></i>
            </button>
        </div>
<div class="card-body">
    <form action="#">
        <div class="row gy-20">
            <div class="col-xxl-3 col-md-4 col-sm-5">
                <div class="mb-20">
                    <label class="h5 fw-semibold font-heading mb-0">Thumbnail Image <span class="text-13 text-gray-400 fw-medium">(Required)</span></label>
                </div>
                <div id="fileUpload" class="fileUpload image-upload"></div>
            </div>
            <div class="col-xxl-9 col-md-8 col-sm-7">
                <div class="row g-20">
                    <div class="col-sm-12">
                        <label for="courseTitle" class="h5 mb-8 fw-semibold font-heading">Blog Name <span class="text-13 text-gray-400 fw-medium">(Required)</span></label>
                        <div class="position-relative">
                            <input type="text" class="text-counter placeholder-13 form-control py-11 pe-76" maxlength="100" id="courseTitle" placeholder="Blog Title">
                            <div class="text-gray-400 position-absolute inset-inline-end-0 top-50 translate-middle-y me-16">
                                <span id="current">0</span>
                                <span id="maximum">/ 100</span>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <label for="overview" class="h5 mb-8 fw-semibold font-heading">Overview</label>
                        <textarea id="overview" rows="4" class="form-control py-9 placeholder-13 text-15" placeholder="Write a brief overview of the course"></textarea>
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
</div>

<?php include './include/footer.php'; ?>
