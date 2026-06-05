<?php include 'dashboard-header.php'; ?>

    <!-- Dashboard Main Wrapper Start -->
    <main class="dashboard-main-wrapper">






        <!-- Dashboard Content Start -->
        <div class="dashboard-content">

            <div class="container">
                <h4 class="dashboard-title">Dashboard</h4>

                <!-- Dashboard Info Start -->
                <div class="dashboard-info">
                    <div class="row gy-2 gy-sm-6">
                        <div class="col-md-4 col-sm-6">
                            <!-- Dashboard Info Card Start -->
                            <div class="dashboard-info__card">
                                <a class="dashboard-info__card-box" href="#">
                                    <div class="dashboard-info__card-icon icon-color-01">
                                        <i class="edumi edumi-open-book"></i>
                                    </div>
                                    <div class="dashboard-info__card-content">
                                        <div class="dashboard-info__card-value" id="enrolledCoursesCount">0</div>
                                        <div class="dashboard-info__card-heading">Enrolled Courses</div>
                                    </div>
                                </a>
                            </div>
                            <!-- Dashboard Info Card End -->
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <!-- Dashboard Info Card Start -->
                            <div class="dashboard-info__card">
                                <a class="dashboard-info__card-box" href="#">
                                    <div class="dashboard-info__card-icon icon-color-02">
                                        <i class="edumi edumi-streaming"></i>
                                    </div>
                                    <div class="dashboard-info__card-content">
                                        <div class="dashboard-info__card-value" id="activeCoursesCount">0</div>
                                        <div class="dashboard-info__card-heading">Active Courses</div>
                                    </div>
                                </a>
                            </div>
                            <!-- Dashboard Info Card End -->
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <!-- Dashboard Info Card Start -->
                            <div class="dashboard-info__card">
                                <a class="dashboard-info__card-box" href="#">
                                    <div class="dashboard-info__card-icon icon-color-03">
                                        <i class="edumi edumi-correct"></i>
                                    </div>
                                    <div class="dashboard-info__card-content">
                                        <div class="dashboard-info__card-value" id="completedCoursesCount">0</div>
                                        <div class="dashboard-info__card-heading">Completed Courses</div>
                                    </div>
                                </a>
                            </div>
                            <!-- Dashboard Info Card End -->
                        </div>
                        
                    </div>
                </div>
              
            </div>


        </div>
        <!-- Dashboard Content End -->


    </main>
    <!-- Dashboard Main Wrapper End -->

    <script>
        document.addEventListener("DOMContentLoaded", async function () {
            // Retrieve token from local storage
            const token =  localStorage.getItem("authToken");
            if (!token) return;

            try {
                const response = await fetch("https://edtech.colaborazia.com/api/user/dashboard", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    if (data.success && data.dashboard && data.dashboard.stats) {
                        const stats = data.dashboard.stats;
                        document.getElementById("enrolledCoursesCount").innerText = stats.enrolledCourses || 0;
                        document.getElementById("activeCoursesCount").innerText = stats.activeCourses || 0;
                        document.getElementById("completedCoursesCount").innerText = stats.completedCourses || 0;
                    }
                } else {
                    console.error("Failed to load dashboard data");
                }
            } catch (error) {
                console.error("Error fetching dashboard details:", error);
            }
        });
    </script>
