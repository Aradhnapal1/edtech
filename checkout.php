<?php include 'header.php'; ?>
<!-- Page Banner Section Start -->
<div class="page-banner bg-color-05">
    <div class="page-banner__wrapper">
        <div class="container">
            <!-- Page Breadcrumb Start -->
            <div class="page-breadcrumb">
                <ul class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                    <li class="breadcrumb-item active">Checkout</li>
                </ul>
            </div>
            <!-- Page Breadcrumb End -->
            <!-- Page Banner Caption Start -->
            <div class="page-banner__caption text-center">
                <h2 class="page-banner__main-title">Checkout</h2>
            </div>
            <!-- Page Banner Caption End -->
        </div>
    </div>
</div>
<!-- Page Banner Section End -->


<!-- Offcanvas Start -->
<div class="offcanvas offcanvas-end offcanvas-mobile" id="offcanvasMobileMenu"
    style="background-image: url(assets/images/mobile-bg.jpg);">
    <div class="offcanvas-header bg-white">
        <div class="offcanvas-logo">
            <a class="offcanvas-logo__logo" href="#"><img src="assets/images/career.png" alt="Logo"></a>
        </div>
        <button type="button" class="offcanvas-close" data-bs-dismiss="offcanvas"><i class="fas fa-times"></i></button>
    </div>

    <div class="offcanvas-body">
        <nav class="canvas-menu">
            <ul class="offcanvas-menu">
                <li><a class="active" href="index.php"><span>Home</span></a>

                </li>
                 <li>
                    <a href="about.php"><span>About</span></a>

                </li>
                <li>
                    <a href="course.php"><span>Courses</span></a>

                </li>
                <li>
                    <a href="blog.php"><span>Blog</span></a>

                </li>
                <li>
                    <a href="contact-us.php"><span>Contact</span></a>

                </li>
               

            </ul>
        </nav>
    </div>

    <!-- Header User Button Start -->
    <div class="offcanvas-user d-lg-none">
        <div class="offcanvas-user__button">
            <button class="offcanvas-user__login btn btn-secondary btn-hover-secondarys" data-bs-toggle="modal"
                data-bs-target="#loginModal">Log In</button>
        </div>
        <div class="offcanvas-user__button">
            <button class="offcanvas-user__signup btn btn-primary btn-hover-primary" data-bs-toggle="modal"
                data-bs-target="#registerModal">Sign Up</button>
        </div>
    </div>
    <!-- Header User Button End -->

</div>
<!-- Offcanvas End -->

<!-- Checkout Section Start -->
<style>
    /* General Styles */
    .card {
        border-radius: 8px;
        border: none;
    }

    .btn-primary {
        background-color: #3c4852;
        border-color: #3c4852;
    }

    .btn-primary:hover {
        background-color: #2d3741;
        border-color: #2d3741;
    }

    .text-success {
        color: #08BD80 !important;
    }

    /* User Avatar */
    .user-avatar {
        width: 50px;
        height: 50px;
        flex-shrink: 0;
    }

    .avatar-placeholder {
        width: 100%;
        height: 100%;
        background-color: #e9ecef;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }

    /* 
    
    
    ment Options */
    .payment-option {
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .payment-option:hover {
        border-color: #ced4da;
    }

    .payment-option.active {
        border-color: #08BD80;
        background-color: rgba(8, 189, 128, 0.05);
    }

    .payment-icon {
        width: 24px;
        text-align: center;
    }

    /* UPI Logos */
    .upi-logos {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .upi-logos img {
        max-height: 30px;
        width: auto;
    }

    /* QR Code */
    .qr-container {
        max-width: 200px;
        margin: 0 auto;
    }

    .qr-code-placeholder {
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 10px;
        background-color: white;
    }

    .generate-btn {
        min-width: 120px;
        font-weight: 500;
    }

    /* Bank Options */
    .bank-option {
        border: 1px solid #e9ecef;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        /* height: 100%; */
    }

    .bank-option img {
        width: 20px !important;
        object-fit: cover !important;
    }

    .bank-option:hover {
        border-color: #ced4da;
        background-color: #f8f9fa;
    }

    /* Course Image */
    .course-image {
        width: 80px;
        height: 100px;
        flex-shrink: 0;
    }

    /* Responsive Adjustments */
    @media (max-width: 767.98px) {
        .payment-options .col-md-4 {
            margin-bottom: 10px;
        }

        .bank-option {
            margin-bottom: 10px;
        }

        .upi-logos {
            margin-bottom: 20px;
        }

        .qr-container {
            max-width: 150px;
        }

        .row.align-items-center {
            flex-direction: column;
            align-items: center;
        }

        .col-md-3 {
            width: 100%;
            max-width: 300px;
        }
    }
</style>
</head>

<body>
    <main class="container my-4">
        <div class="row">
            <!-- Left Column - User Info & Payment Methods -->
            <div class="col-lg-8 mb-4">
                <!-- User Information -->
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="flex-grow-1">
                                <h5 class="mb-1" id="userName"></h5>
                                <div class="text-muted small">
                                    <!-- <span id="userPhone"></span>  -->
                                    <span id="userEmail"></span> 

                                </div>
                            </div>

                            <div class="user-avatar">
                                <div class="avatar-placeholder">
                                    <i class="fa-solid fa-user text-secondary"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Payment Method Selection -->
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <h5 class="mb-4">Choose a payment method</h5>

                        <!-- Payment Options -->
                        <div class="payment-options">
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <div class="payment-option active" data-method="upi">
                                        <div class="d-flex align-items-center">
                                            <div class="payment-icon me-3">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png"
                                                    alt="UPI" width="40">
                                            </div>
                                            <div>UPI</div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <!-- UPI Payment Section -->
                        <div class="payment-section" id="upi-section">



                            <div class="mt-4">




                                <div class="d-grid mt-4">
                                    <button id="paymentBtn" class="btn btn-primary ">Pay</button>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>
            </div>

            <!-- Right Column - Order Summary -->
            <div class="col-lg-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <!-- Course Information -->
                        <div class="d-flex mb-4" id="coursesList"></div>


                        <!-- Price Breakdown -->
                        <div class="price-breakdown">
                            <div class="d-flex justify-content-between mb-2">
                                <div>Item price</div>
                                <div id="checkoutSubTotal">₹1,499</div>
                            </div>
                            <div class="d-flex justify-content-between mb-2 text-success">
                                <div>Offer discount </div>
                                <div id="coupunDiscount">- ₹251</div>
                            </div>

                            <hr>

                            <div class="d-flex justify-content-between fw-bold">
                                <div>Total <span class="fw-normal text-muted small ">(incl. of all taxes)</span></div>
                                <div id="checkTotal">₹1,248</div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Bootstrap JS and Popper.js -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Payment method selection
            const paymentOptions = document.querySelectorAll('.payment-option');
            const paymentSections = document.querySelectorAll('.payment-section');

            paymentOptions.forEach(option => {
                option.addEventListener('click', function () {
                    // Remove active class from all options
                    paymentOptions.forEach(opt => opt.classList.remove('active'));

                    // Add active class to clicked option
                    this.classList.add('active');

                    // Hide all payment sections
                    paymentSections.forEach(section => section.classList.add('d-none'));

                    // Show selected payment section
                    const method = this.getAttribute('data-method');
                    document.getElementById(`${method}-section`).classList.remove('d-none');
                });
            });

            // Generate QR code button
            const generateButton = document.querySelector('.generate-btn');
            generateButton.addEventListener('click', function () {
                // Simulate QR code regeneration
                const qrImage = document.querySelector('.qr-code-placeholder img');
                qrImage.classList.add('opacity-50');

                setTimeout(() => {
                    qrImage.classList.remove('opacity-50');
                    // In a real application, you would generate a new QR code here
                    alert('New QR code generated!');
                }, 1000);
            });


            // Bank selection in netbanking
            const bankOptions = document.querySelectorAll('.bank-option');
            bankOptions.forEach(bank => {
                bank.addEventListener('click', function () {
                    bankOptions.forEach(b => b.classList.remove('bg-light'));
                    this.classList.add('bg-light');
                });
            });

            // Form validation for card payment
            const cardNumber = document.getElementById('cardNumber');
            cardNumber.addEventListener('input', function (e) {
                // Format card number with spaces after every 4 digits
                let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                let formattedValue = '';

                for (let i = 0; i < value.length; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formattedValue += ' ';
                    }
                    formattedValue += value[i];
                }

                e.target.value = formattedValue;
            });


            // Expiry date formatting
            const expiryDate = document.getElementById('expiryDate');
            expiryDate.addEventListener('input', function (e) {
                let value = e.target.value.replace(/\D/g, '');

                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }

                e.target.value = value;
            });


            // Bank dropdown selection
            document.querySelectorAll('.dropdown-item').forEach(function (item) {
                item.addEventListener('click', function (e) {
                    e.preventDefault();
                    const selectedBank = this.getAttribute('data-bank');
                    document.querySelector('#bankDropdownButton span').textContent = selectedBank;
                });
            });
        });
    </script>
    <!-- Checkout Section End -->
    <?php include 'footer.php'; ?>