<?php include 'header.php'; ?>


        <!-- Page Banner Section Start -->
        <div class="page-banner bg-color-05">
            <div class="page-banner__wrapper">
                <div class="container">

                    <!-- Page Breadcrumb Start -->
                    <div class="page-breadcrumb">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                            <li class="breadcrumb-item active">Blog</li>
                        </ul>
                    </div>
                    <!-- Page Breadcrumb End -->

                    <!-- Page Banner Caption Start -->
                    <div class="page-banner__caption text-center">
                        <h2 class="page-banner__main-title">Latest Blogs <br> are on top all times</h2>
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
        <!-- Blog Start -->
        <div class="blog-section section-padding-01">
            <div class="container  ">

                <div class="row gy-10 " id="allblogContainer">
                    <!-- <div class="col-xl-3 col-lg-4 col-md-6 grid-item">

                     
                        <div class="blog-item" data-aos="fade-up" data-aos-duration="1000">
                            <div class="blog-item__image">
                                <a href="blog-details-right-sidebar.php"><img src="assets/images/blog/blog-10.jpg" alt="Blog" width="330" height="179"></a>
                            </div>
                            <div class="blog-item__content">
                                <div class="blog-item__meta">
                                    <span class="meta-action"><i class="fas fa-calendar"></i> August 10, 2</span>
                                    <span class="meta-action"><i class="fas fa-eye"></i> 4,036 views</span>
                                </div>
                                <h3 class="blog-item__title"><a href="blog-details-right-sidebar.php">Back To School Social-Emotional Basics: Relationship, Rhythm, Release</a></h3>
                                <p>As our elementary students head back to school in person, …</p>
                                <a class="blog-item__more btn btn-light btn-hover-white" href="blog-details-right-sidebar.php">Read More <i class="fas  fa-long-arrow-right"></i></a>
                            </div>
                        </div>
                     

                    </div> -->
                    
                
                 
                </div>

                <!-- Page Pagination Start -->
                <!-- <div class="page-pagination">
                    <ul class="pagination justify-content-center">
                        <li><a class="active" href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">...</a></li>
                        <li><a href="#">7</a></li>
                        <li><a href="#"><i class="fas fa-angle-double-right"></i></a></li>
                    </ul>
                </div> -->
                <!-- Page Pagination End -->

            </div>
        </div>
        <!-- Blog End -->

        <?php include 'footer.php'; ?>