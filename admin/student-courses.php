<?php include './include/header.php'; ?>


<div class="dashboard-body">

    <!-- Breadcrumb -->
    <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div class="breadcrumb mb-24">
            <ul class="flex-align gap-4">
                <li><a href="index.php" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
                <li> <span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span> </li>
                <li><span class="text-main-600 fw-normal text-15">Courses</span></li>
            </ul>
        </div>

       
    </div>

    <!-- Courses Table -->
    <div class="card overflow-hidden">
        <div class="card-body p-0 overflow-x-auto">
            <table id="courseTable" class="table table-striped">
                <thead>
                    <tr>
                        <th class="h6 text-gray-300">S.No.</th>
                        <th class="h6 text-gray-300">Course Name</th>
                        <th class="h6 text-gray-300">Category</th>
                        <th class="h6 text-gray-300">Level</th>
                        <th class="h6 text-gray-300">Edit</th>
                        <th class="h6 text-gray-300">Delete</th>
                    </tr>
                </thead>
                <tbody id="courseTableBody">
                    <!-- JS will populate rows here -->
                </tbody>
            </table>
        </div>

        <div class="card-footer flex-between flex-wrap">
            <!-- <span class="text-gray-900" id="courseTableInfo">Showing 1 to 10 of X entries</span> -->
            <ul class="pagination flex-align flex-wrap" id="coursePagination">
                <!-- JS can dynamically generate page links -->
            </ul>
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


</body>

</html>