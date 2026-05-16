<?php include 'dashboard-header.php'; ?>
<style>
    /* .dashboard-tabs-menu ul li a.active {
    color: #fff;
} */
.dashboard-tabs-menu ul li a.active {
    color: #fff !important;
}
</style>



    <!-- Dashboard Main Wrapper -->
    <main class="dashboard-main-wrapper">
    <div class="dashboard-content">
        <div class="container">
            <h4 class="dashboard-title">Enrolled Courses</h4>

            <div class="dashboard-course">
                <!-- Tabs Menu -->
                <div class="dashboard-tabs-menu">
                    <ul>
                        <li><a class="tab-button active" href="#" data-tab="all-courses">All Courses</a></li>
                        
                    </ul>
                </div>

                <!-- Courses List -->
                <div class="dashboard-course-list">
                    <!-- All Courses Tab Content -->
                    <div id="all-courses" class="course-tab-content">
                        <!-- Course Item 1 -->
                        <!-- <div class="dashboard-course-item">
                            <a class="dashboard-course-item__link" href="#">
                                <div class="dashboard-course-item__thumbnail">
                                    <img src="assets/images/courses/courses-4.jpg" alt="Courses" width="260"
                                        height="160">
                                </div>
                                <div class="dashboard-course-item__content">
                                    <div class="dashboard-course-item__rating">
                                        <div class="rating-star">
                                            <div class="rating-label" style="width: 80%;"></div>
                                        </div>
                                    </div>
                                    <h3 class="dashboard-course-item__title">Consulting Approach to Problem Solving</h3>
                                    <div class="dashboard-course-item__meta">
                                        <ul class="dashboard-course-item__meta-list">
                                            <li><span class="meta-label">Total Lessons:</span><span
                                                    class="meta-value">6</span></li>
                                            <li><span class="meta-label">Completed Lessons:</span><span
                                                    class="meta-value">0/6</span></li>
                                        </ul>
                                    </div>
                                  
                                </div>
                            </a>
                        </div> -->
               
                    </div>

                    <!-- Live Class Tab Content -->
                    <div id="live-class" class="course-tab-content">
                        <div class="dashboard-course-item">
                            <a class="dashboard-course-item__link" href="#">
                                <div class="dashboard-course-item__thumbnail">
                                    <img src="assets/images/courses/courses-5.jpg" alt="Courses" width="260"
                                        height="160">
                                </div>
                                <div class="dashboard-course-item__content">
                                    <div class="dashboard-course-item__rating">
                                        <div class="rating-star">
                                            <div class="rating-label" style="width: 80%;"></div>
                                        </div>
                                    </div>
                                    <h3 class="dashboard-course-item__title">Ultimate Photoshop Training: From Beginner to Pro</h3>
                                    <div class="dashboard-course-item__meta">
                                        <ul class="dashboard-course-item__meta-list">
                                            <li><span class="meta-label">Total Lessons:</span><span
                                                    class="meta-value">6</span></li>
                                            <li><span class="meta-label">Completed Lessons:</span><span
                                                    class="meta-value">0/6</span></li>
                                        </ul>
                                    </div>
                                    <div class="dashboard-course-item__progress-bar-wrap">
                                        <div class="dashboard-course-item__progress-bar">
                                            <div class="dashboard-course-item__progress-bar-line" style="width: 22%;">
                                            </div>
                                        </div>
                                        <div class="dashboard-course-item__progress-bar-text">22% Complete</div>
                                    </div>
                                   
                                </div>
                                <div class="dashboard-course-item__join-now">
                                        <a href="#" class="btn btn-primary">Join Now</a>
                                    </div>
                            </a>
                        </div>
                    </div>

                    <!-- Completed Courses Tab Content -->
                    <div id="completed-courses" class="course-tab-content">
                        <div class="dashboard-course-item">
                            <a class="dashboard-course-item__link" href="#">
                                <div class="dashboard-course-item__thumbnail">
                                    <img src="assets/images/courses/courses-6.jpg" alt="Courses" width="260"
                                        height="160">
                                </div>
                                <div class="dashboard-course-item__content">
                                    <div class="dashboard-course-item__rating">
                                        <div class="rating-star">
                                            <div class="rating-label" style="width: 80%;"></div>
                                        </div>
                                    </div>
                                    <h3 class="dashboard-course-item__title">Consulting Approach to Problem Solving</h3>
                                    <div class="dashboard-course-item__meta">
                                        <ul class="dashboard-course-item__meta-list">
                                            <li><span class="meta-label">Total Lessons:</span><span
                                                    class="meta-value">6</span></li>
                                            <li><span class="meta-label">Completed Lessons:</span><span
                                                    class="meta-value">0/6</span></li>
                                        </ul>
                                    </div>
                                    <div class="dashboard-course-item__progress-bar-wrap">
                                        <div class="dashboard-course-item__progress-bar">
                                            <div class="dashboard-course-item__progress-bar-line" style="width: 22%;">
                                            </div>
                                        </div>
                                        <div class="dashboard-course-item__progress-bar-text">22% Complete</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="dashboard-course-item">
                            <a class="dashboard-course-item__link" href="#">
                                <div class="dashboard-course-item__thumbnail">
                                    <img src="assets/images/courses/courses-7.jpg" alt="Courses" width="260"
                                        height="160">
                                </div>
                                <div class="dashboard-course-item__content">
                                    <div class="dashboard-course-item__rating">
                                        <div class="rating-star">
                                            <div class="rating-label" style="width: 80%;"></div>
                                        </div>
                                    </div>
                                    <h3 class="dashboard-course-item__title">Essential Digital Tools for Student Engagement</h3>
                                    <div class="dashboard-course-item__meta">
                                        <ul class="dashboard-course-item__meta-list">
                                            <li><span class="meta-label">Total Lessons:</span><span
                                                    class="meta-value">6</span></li>
                                            <li><span class="meta-label">Completed Lessons:</span><span
                                                    class="meta-value">0/6</span></li>
                                        </ul>
                                    </div>
                                    <div class="dashboard-course-item__progress-bar-wrap">
                                        <div class="dashboard-course-item__progress-bar">
                                            <div class="dashboard-course-item__progress-bar-line" style="width: 22%;">
                                            </div>
                                        </div>
                                        <div class="dashboard-course-item__progress-bar-text">22% Complete</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
  
    .dashboard-main-wrapper {
        padding: 15px;
    }

    .dashboard-content {
        background-color: #f4f4f4;
        padding: 15px;
    }

    .dashboard-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .dashboard-tabs-menu {
        margin-bottom: 15px;
    }

    .dashboard-tabs-menu ul {
        display: flex;
        list-style: none;
        padding: 0;
        overflow-x: auto;
        white-space: nowrap;
    }

    .dashboard-tabs-menu ul li {
        margin-right: 10px;
    }

    .tab-button {
        padding: 8px 15px;
        background-color: #f1f1f1;
        text-decoration: none;
        color: #333;
        font-weight: bold;
        border-radius: 5px;
        transition: background-color 0.3s;
        font-size: 14px;
    }

    .tab-button:hover {
        background-color: #ddd;
    }

    .tab-button.active {
        background-color: #000;
        color: white;
    }

    .dashboard-course-list {
        margin-top: 15px;
    }

    .course-tab-content {
        display: none;
    }

    .course-tab-content.active {
        display: block;
    }

    .dashboard-course-item {
        margin-bottom: 15px;
        background-color: white;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .dashboard-course-item__thumbnail {
        width: 100%;
    }

    .dashboard-course-item__thumbnail img {
        width: 100%;
        height: auto;
        display: block;
    }

    .dashboard-course-item__content {
        padding: 15px;
        width: 100%;
    }

    .dashboard-course-item__rating {
        margin-bottom: 10px;
    }

    .dashboard-course-item__title {
        font-size: 16px;
        margin-bottom: 10px;
    }

    .dashboard-course-item__meta-list {
        list-style: none;
        padding: 0;
        font-size: 14px;
    }

    .dashboard-course-item__progress-bar-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
    }

    .dashboard-course-item__progress-bar {
        width: 70%;
        background-color: #f1f1f1;
        border-radius: 5px;
    }

    .dashboard-course-item__progress-bar-line {
        height: 5px;
        background-color: #007BFF;
        border-radius: 5px;
    }

    .dashboard-course-item__progress-bar-text {
        font-size: 12px;
        color: #666;
    }

    .dashboard-course-item__join-now {
        padding: 0 15px 15px;
        text-align: center;
    }

    .btn.btn-primary {
        padding: 0px 20px;
        background-color: #007BFF;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-size: 14px;
    }

    /* Mobile Responsive Styles */
    @media (max-width: 768px) {
        .dashboard-course-item {
            flex-direction: column;
        }

        .dashboard-tabs-menu ul {
            /* flex-wrap: nowrap; */
            /* justify-content: flex-start; */
            justify-content: space-around;
        }

        .tab-button {
            flex: 0 0 auto;
            margin-right: 8px;
            padding: 6px 12px;
            font-size: 13px;
        }

        .dashboard-course-item__thumbnail {
            width: 100%;
        }

        .dashboard-course-item__content {
            width: 100%;
        }

        .dashboard-course-item__progress-bar {
            width: 65%;
        }
    }

    /* Larger Screens */
    @media (min-width: 769px) {
        .dashboard-course-item {
            display: flex;
            flex-direction: row;
        }

        .dashboard-course-item__thumbnail {
            width: 40%;
        }

        .dashboard-course-item__content {
            width: 60%;
        }

        .dashboard-tabs-menu ul {
            justify-content: flex-start;
        }

        .tab-button {
            padding: 10px 20px;
            font-size: 14px;
        }
    }
</style>

<script>
    // JavaScript to handle tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const courseTabs = document.querySelectorAll('.course-tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            // Remove active class from all buttons and hide all tabs
            tabButtons.forEach(button => button.classList.remove('active'));
            courseTabs.forEach(tab => tab.classList.remove('active'));

            // Add active class to clicked button and show the corresponding tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Set initial display for the "All Courses" tab
    document.getElementById('all-courses').classList.add('active');
</script>