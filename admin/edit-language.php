<?php include './include/header.php'; ?>

<div class="dashboard-body">

    <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <!-- Breadcrumb Start -->
        <div class="breadcrumb mb-24">
            <ul class="flex-align gap-4">
                <li><a href="index.php" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
                <li> <span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span> </li>
                <li><span class="text-main-600 fw-normal text-15">Update Language </span></li>
            </ul>
        </div>
        <!-- Breadcrumb End -->

        <!-- Buttons Start -->
<div class="flex-align justify-content-end gap-8">
    <button type="button" class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Save as Draft</button>
    <button type="button" id="updateLanguage" class="btn btn-main rounded-pill py-9">Updated Language</button>
</div>

<script>
    // Attach a click handler to the Dev button (id="btn") if needed
    const devBtn = document.getElementById('btn');
    if (devBtn) {
        devBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Dev button clicked');
            alert('Dev: Language published (test)');
        });
    }
</script>
        <!-- Buttons End -->
    </div>

    <!-- Create Language Step List Start -->
    <ul class="step-list mb-24">
        <li class="step-list__item py-15 px-24 text-15 text-heading fw-medium flex-center gap-6 active">
            <span class="icon text-xl d-flex"><i class="ph ph-circle"></i></span>
            Edit Language 
            <span class="line position-relative"></span>
        </li>

    </ul>
    <!-- Create Language Step List End -->

    <!-- Language Tab Start -->
    <div class="card">
        <div class="card-header border-bottom border-gray-100 flex-align gap-8">
            <h5 class="mb-0">Language</h5>
            <button type="button" class="text-main-600 text-md d-flex" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Language Details">
                <i class="ph-fill ph-question"></i>
            </button>
        </div>
 <div class="card-body">
    <form action="#">
        <div class="row gy-20">

            <!-- Language Name -->
            <div class="col-sm-12">
                <label for="LanguageName" class="h5 mb-8 fw-semibold font-heading">
                    Language Name <span class="text-13 text-gray-400 fw-medium">(Required)</span>
                </label>
                <div class="position-relative">
                    <input type="text" class="text-counter placeholder-13 form-control py-11 pe-76"
                        maxlength="100" id="LanguageName" placeholder="Enter Language Name">
                    <div class="text-gray-400 position-absolute inset-inline-end-0 top-50 translate-middle-y me-16">
                        <span id="current">0</span>
                        <span id="maximum">/ 100</span>
                    </div>
                </div>
            </div>


            <!-- Description -->
            <div class="col-sm-12">
                <label for="LanguageDescription" class="h5 mb-8 fw-semibold font-heading">
                    Description
                </label>
                <textarea id="LanguageDescription" rows="4"
                    class="form-control placeholder-13 text-15"
                    placeholder="Enter Description"></textarea>
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
    <!-- Language Tab End -->
</div>
<script>
const toggle = document.getElementById("statusToggle");
const statusText = document.getElementById("statusText");

toggle.addEventListener("change", () => {
    if (toggle.checked) {
        statusText.textContent = "Active";
        statusText.classList.remove("text-danger");
        statusText.classList.add("text-success");
    } else {
        statusText.textContent = "Inactive";
        statusText.classList.remove("text-success");
        statusText.classList.add("text-danger");
    }
});
</script>

  <script src="adminApi/languageApi.js"></script>

<?php include './include/footer.php'; ?>
