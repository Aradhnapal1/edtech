<?php include './include/header.php'; ?>

<div class="dashboard-body">

    <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <!-- Breadcrumb Start -->
        <div class="breadcrumb mb-24">
            <ul class="flex-align gap-4">
                <li><a href="index.php" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
                <li> <span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span> </li>
                <li><span class="text-main-600 fw-normal text-15">Add Review</span></li>
            </ul>
        </div>
        <!-- Breadcrumb End -->

        <!-- Buttons Start -->
        <div class="flex-align justify-content-end gap-8">
            <button type="button" class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Save as Draft</button>
            <button type="button" class="btn btn-main rounded-pill py-9" id="publishReview">Publish Review</button>
        </div>

        <!-- Buttons End -->
    </div>

    <!-- Create Batch Step List Start -->
    <ul class="step-list mb-24">
        <li class="step-list__item py-15 px-24 text-15 text-heading fw-medium flex-center gap-6 active">
            <span class="icon text-xl d-flex"><i class="ph ph-circle"></i></span>
            Add Review
            <span class="line position-relative"></span>
        </li>

    </ul>
    <!-- Create Batch Step List End -->

    <!-- Batch Tab Start -->
    <div class="card">
        <div class="card-header border-bottom border-gray-100 flex-align gap-8">
            <h5 class="mb-0">Review Details</h5>
            <button type="button" class="text-main-600 text-md d-flex" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Batch Details">
                <i class="ph-fill ph-question"></i>
            </button>
        </div>
        <div class="card-body">
            <form id="reviewForm">
                <div class="row gy-20">

                    <div class="col-sm-12">
                        <label class="h5 mb-8 fw-semibold">Review Name</label>
                        <input type="text" class="form-control py-11" id="reviewTitle" placeholder="Enter Review Name" required>
                    </div>

                    <div class="col-sm-6">
                        <label class="h5 mb-8 fw-semibold">Review Course</label>
                        <select id="courseSelect" class="form-select py-9" required>
                            <option value="" disabled selected>Select Course</option>
                            <option value="1">Web Development</option>
                            <option value="2">Data Science</option>
                            <option value="3">Graphic Design</option>
                            <option value="4">Digital Marketing</option>
                        </select>
                    </div>

                    <div class="col-sm-6">
                        <label class="h5 mb-8 fw-semibold">Review Email</label>
                        <input type="email" class="form-control py-11" id="reviewEmail" placeholder="Enter Email" required>
                    </div>

                    <div class="col-sm-6">
                        <label class="h5 mb-8 fw-semibold">Review Rating</label>
                        <div class="star-rating d-flex gap-1" id="starRating">
                            <?php for ($i = 1; $i <= 5; $i++): ?>
                                <i class="ph ph-star text-2xl text-gray-400 cursor-pointer" data-value="<?= $i ?>"></i>
                            <?php endfor; ?>
                        </div>
                        <input type="hidden" name="review_rating" id="ratingValue" required>
                    </div>

                    <!-- raitn start and script  -->
                    <script>
                        const stars = document.querySelectorAll('#starRating .ph');
                        const ratingInput = document.getElementById('ratingValue');

                        stars.forEach((star, index) => {
                            star.addEventListener('click', () => {
                                const rating = index + 1;
                                ratingInput.value = rating;

                                stars.forEach((s, i) => {
                                    s.classList.remove('ph-fill');
                                    s.classList.add('ph');
                                    s.classList.toggle('text-yellow-400', i < rating);
                                    s.classList.toggle('text-gray-400', i >= rating);
                                    if (i < rating) s.classList.add('ph-fill');
                                });
                            });
                        });
                    </script>
                    <style>
                        .text-yellow-400 {
                            color: #facc15 !important;
                        }

                        .text-gray-400 {
                            color: #9ca3af !important;
                        }

                        .cursor-pointer {
                            cursor: pointer;
                        }
                    </style>

                    <div class="col-sm-6">
                        <label class="h5 mb-8 fw-semibold">Review</label>
                        <textarea class="form-control py-11" id="reviewText" rows="3" maxlength="500" required></textarea>
                    </div>
                    

                    

                </div>
            </form>
        </div>
    </div>
    <!-- Batch Tab End -->
</div>




<?php include './include/footer.php'; ?>