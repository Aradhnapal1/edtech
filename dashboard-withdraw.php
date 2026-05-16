<?php include 'dashboard-header.php'; ?>


    <!-- Dashboard Main Wrapper Start -->
    <main class="dashboard-main-wrapper">

      





        <!-- Dashboard Content Start -->
        <div class="dashboard-content">

            <div class="container">
                <!-- Dashboard Withdraw Box Start -->
                <div class="dashboard-content-box">
                    <h4 class="dashboard-content-box__title">Current Balance</h4>
                    <div class="dashboard-content-box__content">
                        <p>You currently have <strong><span class="sale-price">$8.<small class="separator">01</small></span></strong> and this is insufficient balance to withdraw.</p>
                    </div>
                    <div class="dashboard-content-box__content">
                        <i class="fas fa-question-circle"></i>
                        <p>The preferred payment method is selected as Bank Transfer. You can change your <a href="dashboard-settings-withdraw.php"> withdrawal preference </a></p>
                    </div>
                </div>
                <!-- Dashboard Withdraw Box End -->

                <!-- Dashboard Withdraw Box Start -->
                <div class="dashboard-content-box">
                    <h4 class="dashboard-content-box__title">Withdrawal History</h4>

                    <div class="dashboard-table">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Withdrawal Method</th>
                                    <th>Requested On</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Withdrawal Method</div>
                                        <div class="dashboard-table__withdraw-method">
                                            <img src="assets/images/icon-paypal.svg" alt="Paypal">
                                            <p>
                                                <strong class="name">PayPal</strong>
                                                <small>in****r@edumall.com</small>
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Requested On</div>
                                        <div class="dashboard-table__text">December 24, 2020 10:05 am</div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Amount</div>
                                        <div class="dashboard-table__price">
                                            <span class="sale-price">$100.<small class="separator">00</small></span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Status</div>
                                        <div class="dashboard-table__withdraw-status approved">Approved</div>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Withdrawal Method</div>
                                        <div class="dashboard-table__withdraw-method">
                                            <img src="assets/images/icon-paypal.svg" alt="Paypal">
                                            <p>
                                                <strong class="name">PayPal</strong>
                                                <small>in****r@edumall.com</small>
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Requested On</div>
                                        <div class="dashboard-table__text">December 23, 2020 5:58 am</div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Amount</div>
                                        <div class="dashboard-table__price">
                                            <span class="sale-price">$100.<small class="separator">00</small></span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Status</div>
                                        <div class="dashboard-table__withdraw-status pending">Pending</div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__text">
                                            <button class="question-icon" data-bs-tooltip="tooltip" data-bs-placement="left" title="Withdrawal request is pending for approval, please hold tight.">
                                                <i class="fas fa-question-circle"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Withdrawal Method</div>
                                        <div class="dashboard-table__withdraw-method">
                                            <img src="assets/images/icon-paypal.svg" alt="Paypal">
                                            <p>
                                                <strong class="name">PayPal</strong>
                                                <small>in****r@edumall.com</small>
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Requested On</div>
                                        <div class="dashboard-table__text">December 15, 2020 2:40 am</div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Amount</div>
                                        <div class="dashboard-table__price">
                                            <span class="sale-price">$90.<small class="separator">00</small></span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Status</div>
                                        <div class="dashboard-table__withdraw-status pending">Pending</div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__text">
                                            <button class="question-icon" data-bs-tooltip="tooltip" data-bs-placement="left" title="Withdrawal request is pending for approval, please hold tight.">
                                                <i class="fas fa-question-circle"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Withdrawal Method</div>
                                        <div class="dashboard-table__withdraw-method">
                                            <img src="assets/images/icon-paypal.svg" alt="Paypal">
                                            <p>
                                                <strong class="name">PayPal</strong>
                                                <small>in****r@edumall.com</small>
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Requested On</div>
                                        <div class="dashboard-table__text">December 15, 2020 2:40 am</div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Amount</div>
                                        <div class="dashboard-table__price">
                                            <span class="sale-price">$95.<small class="separator">00</small></span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Status</div>
                                        <div class="dashboard-table__withdraw-status rejected">Rejected</div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__text">
                                            <button class="question-icon" data-bs-tooltip="tooltip" data-bs-placement="left" title="Please contact the site administrator for more information.">
                                                <i class="fas fa-question-circle"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Withdrawal Method</div>
                                        <div class="dashboard-table__withdraw-method">
                                            <img src="assets/images/icon-paypal.svg" alt="Paypal">
                                            <p>
                                                <strong class="name">PayPal</strong>
                                                <small>in****r@edumall.com</small>
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Requested On</div>
                                        <div class="dashboard-table__text">December 14, 2020 4:12 am</div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Amount</div>
                                        <div class="dashboard-table__price">
                                            <span class="sale-price">$85.<small class="separator">00</small></span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="dashboard-table__mobile-heading">Status</div>
                                        <div class="dashboard-table__withdraw-status approved">Approved</div>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- Dashboard Withdraw Box End -->

            </div>

        </div>
        <!-- Dashboard Content End -->


    </main>
    <!-- Dashboard Main Wrapper End -->

  



    <!-- JS Vendor, Plugins & Activation Script Files -->

    <!-- Vendors JS -->
    <script src="assets/js/vendor/modernizr-3.11.7.min.js"></script>
    <script src="assets/js/vendor/jquery-3.6.0.min.js"></script>
    <script src="assets/js/vendor/jquery-migrate-3.3.2.min.js"></script>
    <script src="assets/js/vendor/bootstrap.bundle.min.js"></script>

    <!-- Plugins JS -->
    <script src="assets/js/plugins/aos.js"></script>
    <script src="assets/js/plugins/parallax.js"></script>
    <script src="assets/js/plugins/swiper-bundle.min.js"></script>
    <script src="assets/js/plugins/perfect-scrollbar.min.js"></script>
    <script src="assets/js/plugins/jquery.powertip.min.js"></script>
    <script src="assets/js/plugins/nice-select.min.js"></script>
    <script src="assets/js/plugins/glightbox.min.js"></script>
    <script src="assets/js/plugins/jquery.sticky-kit.min.js"></script>
    <script src="assets/js/plugins/imagesloaded.pkgd.min.js"></script>
    <script src="assets/js/plugins/masonry.pkgd.min.js"></script>
    <script src="assets/js/plugins/flatpickr.js"></script>
    <script src="assets/js/plugins/range-slider.js"></script>
    <script src="assets/js/plugins/select2.min.js"></script>


    <!-- Activation JS -->
    <script src="assets/js/main.js"></script>


</body>


<!-- Mirrored from htmldemo.net/edumall/edumall/dashboard-withdraw.php by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 14 Apr 2025 09:36:25 GMT -->
</html>