<?php include 'include/header.php'; ?>

<div class="dashboard-body">

    <!-- Breadcrumb Start -->
    <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div class="breadcrumb mb-24">
            <ul class="flex-align gap-4">
                <li><a href="index.php" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
                <li> <span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span> </li>
                <li><a href="order.php" class="text-gray-200 fw-normal text-15 hover-text-main-600">All Orders</a></li>
                <li> <span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span> </li>
                <li><span class="text-main-600 fw-normal text-15">Order Details</span></li>
            </ul>
        </div>
    </div>
    <!-- Breadcrumb End -->

    <div class="row gy-4">
        <!-- Left Side: Order Items -->
        <div class="col-lg-8">
            <div class="card h-100">
                <div class="card-header border-bottom border-gray-100 flex-between align-items-center flex-wrap gap-8">
                    <h5 class="mb-0">Order #<span id="orderNumber">...</span></h5>
                </div>
                <div class="card-body p-0 overflow-x-auto">
                    <table class="table table-striped mb-0">
                        <thead>
                            <tr>
                                <th class="h6 text-gray-300 ps-20">Course Details</th>
                                <th class="h6 text-gray-300 text-end">Price</th>
                                <th class="h6 text-gray-300 text-end">Qty</th>
                                <th class="h6 text-gray-300 text-end pe-20">Total</th>
                            </tr>
                        </thead>
                        <tbody id="orderItemsTable">
                            <!-- Populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Right Side: Summary + Customer + Status -->
        <div class="col-lg-4">
            
            <!-- Customer Details -->
            <div class="card mb-24">
                <div class="card-header border-bottom border-gray-100">
                    <h5 class="mb-0">Customer Details</h5>
                </div>
                <div class="card-body">
                    <ul class="list-unstyled mb-0">
                        <li class="d-flex align-items-center gap-16 mb-20">
                            <span class="w-48 h-48 flex-center rounded-circle bg-main-50 text-main-600 text-2xl flex-shrink-0">
                                <i class="ph ph-user"></i>
                            </span>
                            <div class="flex-grow-1">
                                <span class="text-13 text-gray-400 d-block mb-4">Customer Name</span>
                                <h6 class="mb-0 text-15 fw-medium" id="customerName">...</h6>
                            </div>
                        </li>
                        <li class="d-flex align-items-center gap-16 mb-20">
                            <span class="w-48 h-48 flex-center rounded-circle bg-info-50 text-info-600 text-2xl flex-shrink-0">
                                <i class="ph ph-envelope-simple"></i>
                            </span>
                            <div class="flex-grow-1">
                                <span class="text-13 text-gray-400 d-block mb-4">Email Address</span>
                                <h6 class="mb-0 text-15 fw-medium" id="customerEmail">...</h6>
                            </div>
                        </li>
                        <li class="d-flex align-items-center gap-16">
                            <span class="w-48 h-48 flex-center rounded-circle bg-warning-50 text-warning-600 text-2xl flex-shrink-0">
                                <i class="ph ph-phone"></i>
                            </span>
                            <div class="flex-grow-1">
                                <span class="text-13 text-gray-400 d-block mb-4">Phone Number</span>
                                <h6 class="mb-0 text-15 fw-medium" id="customerPhone">...</h6>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Payment & Order Status -->
            <div class="card mb-24">
                <div class="card-header border-bottom border-gray-100">
                    <h5 class="mb-0">Payment & Order Status</h5>
                </div>
                <div class="card-body">
                    <div class="flex-between align-items-center mb-16">
                        <span class="text-gray-500">Payment Status</span>
                        <span id="paymentStatus" class="badge bg-success-50 text-success-600 px-16 py-6 rounded-pill">...</span>
                    </div>
                    <div class="flex-between align-items-center">
                        <span class="text-gray-500">Order Status</span>
                        <span id="orderStatus" class="badge bg-success-50 text-success-600 px-16 py-6 rounded-pill">...</span>
                    </div>
                </div>
            </div>

            <!-- Order Summary -->
            <div class="card">
                <div class="card-header border-bottom border-gray-100">
                    <h5 class="mb-0">Order Summary</h5>
                </div>
                <div class="card-body">
                    <div class="flex-between mb-16">
                        <span class="text-gray-500">Sub Total</span>
                        <span class="text-heading fw-medium" id="subtotal">₹0.00</span>
                    </div>
                    <div class="flex-between mb-16">
                        <span class="text-gray-500">Discount</span>
                        <span class="text-danger-600 fw-medium" id="discount">- ₹0.00</span>
                    </div>
                    <div class="flex-between pt-16 border-top border-gray-100">
                        <span class="text-heading fw-bold text-lg">Total Amount</span>
                        <span class="text-main-600 fw-bold text-lg" id="totalAmount">₹0.00</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<!-- Load the Centralized Order API Script -->
<!-- <script src="adminApi/order.js"></script> -->

<?php include 'include/footer.php'; ?>