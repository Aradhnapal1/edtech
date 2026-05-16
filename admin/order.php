<?php include './include/header.php'; ?>



<div class="dashboard-body">

    <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <!-- Breadcrumb Start -->
        <div class="breadcrumb mb-24">
            <ul class="flex-align gap-4">
                <li><a href="index.php" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
                <li> <span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span> </li>
                <li><span class="text-main-600 fw-normal text-15">Order</span></li>
            </ul>
        </div>
        <!-- Breadcrumb End -->

        <!-- Breadcrumb Right Start -->
        <div class="flex-align gap-8 flex-wrap">
            <div class="position-relative text-gray-500 flex-align gap-4 text-13">
                <span class="text-inherit">Sort by: </span>
                <div
                    class="flex-align text-gray-500 text-13 border border-gray-100 rounded-4 ps-20 focus-border-main-600 bg-white">
                    <span class="text-lg"><i class="ph ph-funnel-simple"></i></span>
                    <select class="form-control ps-8 pe-20 py-16 border-0 text-inherit rounded-4 text-center">
                        <option value="1" selected>Popular</option>
                        <option value="1">Latest</option>
                        <option value="1">Trending</option>
                        <option value="1">Matches</option>
                    </select>
                </div>
            </div>
            <div
                class="flex-align text-gray-500 text-13 border border-gray-100 rounded-4 ps-20 focus-border-main-600 bg-white">
                <span class="text-lg"><i class="ph ph-layout"></i></span>
                <select class="form-control ps-8 pe-20 py-16 border-0 text-inherit rounded-4 text-center"
                    id="exportOptions">
                    <option value="" selected disabled>Export</option>
                    <option value="csv">CSV</option>
                    <option value="json">JSON</option>
                </select>
            </div>
        </div>
        <!-- Breadcrumb Right End -->
    </div>


    <div class="card overflow-hidden">
        <div class="card-body p-0 overflow-x-auto">
            <table id="orderTable" class="table table-striped">
                <thead>
                    <tr>
                        <th class="h6 text-gray-300">S.No</th>
                        <th class="h6 text-gray-300">User Name</th>
                        <th class="h6 text-gray-300">Subtotal</th>
                        <th class="h6 text-gray-300">Discount Amount</th>
                        <th class="h6 text-gray-300">Total Amount</th>
                        <th class="h6 text-gray-300">Payment Status</th>
                        <th class="h6 text-gray-300">Order Status</th>
                        <th class="h6 text-gray-300">View</th>
                    </tr>
                </thead>

                <tbody id="orderTableBody"></tbody>

            </table>

        </div>
        <div class="card-footer flex-between flex-wrap">
            <!-- <span class="text-gray-900">Showing 1 to 10 of 12 entries</span>
            <ul class="pagination flex-align flex-wrap">
                <li class="page-item active">
                    <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">1</a>
                </li>
                <li class="page-item">
                    <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">2</a>
                </li>
                <li class="page-item">
                    <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">3</a>
                </li>
                <li class="page-item">
                    <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">...</a>
                </li>
                <li class="page-item">
                    <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">8</a>
                </li>
                <li class="page-item">
                    <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">9</a>
                </li>
                <li class="page-item">
                    <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">10</a>
                </li>
            </ul> -->
        </div>
    </div>

</div>
<div class="dashboard-footer">
    <div class="flex-between flex-wrap gap-16">
        <p class="text-gray-300 text-13 fw-normal"> &copy; Copyright Hyperscripts 2026, All Right Reserverd</p>
        <div class="flex-align flex-wrap gap-16">
            <a href="#"
                class="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">License</a>
            <a href="#" class="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">More
                Themes</a>
            <a href="#"
                class="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">Documentation</a>
            <a href="#"
                class="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">Support</a>
        </div>
    </div>
</div>
</div>

<!-- Jquery js -->
<script src="assets/js/jquery-3.7.1.min.js"></script>
<!-- Bootstrap Bundle Js -->
<script src="assets/js/boostrap.bundle.min.js"></script>
<!-- Phosphor Js -->
<script src="assets/js/phosphor-icon.js"></script>
<!-- file upload -->
<script src="assets/js/file-upload.js"></script>
<!-- file upload -->
<script src="assets/js/plyr.js"></script>
<!-- dataTables -->
<script src="https://cdn.datatables.net/2.0.8/js/dataTables.min.js"></script>
<!-- full calendar -->
<script src="assets/js/full-calendar.js"></script>
<!-- jQuery UI -->
<script src="assets/js/jquery-ui.js"></script>
<!-- jQuery UI -->
<script src="assets/js/editor-quill.js"></script>
<!-- apex charts -->
<script src="assets/js/apexcharts.min.js"></script>
<!-- Calendar Js -->
<script src="assets/js/calendar.js"></script>
<!-- jvectormap Js -->
<script src="assets/js/jquery-jvectormap-2.0.5.min.js"></script>
<!-- jvectormap world Js -->
<script src="assets/js/jquery-jvectormap-world-mill-en.js"></script>

<!-- main js -->
<script src="assets/js/main.js"></script>



<script>
    // ========================== Export Js Start ==============================
    document.getElementById('exportOptions').addEventListener('change', function() {
        const format = this.value;
        const table = document.getElementById('orderTable');
        let data = [];
        const headers = [];

        // Get the table headers
        table.querySelectorAll('thead th').forEach(th => {
            headers.push(th.innerText.trim());
        });

        // Get the table rows
        table.querySelectorAll('tbody tr').forEach(tr => {
            const row = {};
            tr.querySelectorAll('td').forEach((td, index) => {
                row[headers[index]] = td.innerText.trim();
            });
            data.push(row);
        });

        if (format === 'csv') {
            downloadCSV(data);
        } else if (format === 'json') {
            downloadJSON(data);
        }
    });

    function downloadCSV(data) {
        const csv = data.map(row => Object.values(row).join(',')).join('\n');
        const blob = new Blob([csv], {
            type: 'text/csv'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'orderTables.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function downloadJSON(data) {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'orderTables.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    // ========================== Export Js End ==============================

    // Table Header Checkbox checked all js Start
    $('#selectAll').on('change', function() {
        $('.form-check .form-check-input').prop('checked', $(this).prop('checked'));
    });

    // Data Tables
    new DataTable('#orderTable', {
        searching: false,
        lengthChange: false,
        info: false, // Bottom Left Text => Showing 1 to 10 of 12 entries
        paging: false, // Pagination False
        "columnDefs": [{
                "orderable": false,
                "targets": [0, 9, 8, 7, 6, 5, 4, 3, 2, 1]
            } // Disables sorting on the 7th column (index 6)
        ]
    });

    if (typeof ensureDtColumnOrderSpans === 'function') {
        ensureDtColumnOrderSpans('#orderTable');
    }
</script>



</body>

</html>