<?php include 'header.php'; ?>



        <!-- Page Banner Section Start -->
        <div class="page-banner bg-color-05">
            <div class="page-banner__wrapper">
                <div class="container">

                    <!-- Page Breadcrumb Start -->
                    <div class="page-breadcrumb">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                            <li class="breadcrumb-item active" id="blogBreadcrumbTitle"></li>
                        </ul>
                    </div>
                    <!-- Page Breadcrumb End -->

                    <!-- Page Banner Caption Start -->
                    <div class="page-banner__caption text-center">
                        <h2 class="page-banner__main-title">Blog Details</h2>
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
            <div class="container custom-container">
                <div class="row gy-10">
                    <div class="col-lg-8">

                        <!-- Blog Dtails Start -->
                        <div class="blog-details">

                            <div class="blog-details__image">
                                <img id="blogDetailImage" src="" alt="Blog" width="770" height="418" style="object-fit: cover; width: 100%;">
                                <div class="blog-details__categories">
                                    <a href="#">Video & Tips</a>
                                </div>
                            </div>

                            <div class="blog-details__content">
                                <div class="blog-details__meta">
                                    <a class="meta-action" href="#">
                                        <img class="meta-action__avatar" src="assets/images/avatar/avatar-01.jpg" alt="Avatar" width="32" height="32">
                                        <span class="meta-action__value">Admin</span>
                                    </a>
                                    <span class="meta-action"><i class="fas fa-calendar"></i> <span class="meta-action__value" id="blogDetailDate">Loading...</span></span>
                                    <span class="meta-action"><i class="fas fa-eye"></i> <span class="meta-action__value">0 views</span></span>
                                    <a class="meta-action" href="#"><i class="fas fa-comment"></i> <span class="meta-action__value">0 comments</span></a>
                                </div>
                                <h3 class="blog-details__title" id="blogDetailTitle">Loading...</h3>
                                <div id="blogDetailDescription">
                                    <p>Loading blog content...</p>
                                </div>
                            </div>

                            <div class="blog-details__footer">

                                <div class="blog-details__tags">
                                    <span class="blog-details__tags-label"><i class="fas fa-tags"></i></span>
                                    <div class="blog-details__tags-list">
                                        <a href="#"> deep learning,</a>
                                        <a href="#"> language</a>
                                    </div>
                                </div>

                                <div class="blog-details__share">
                                    <span class="blog-details__share-label">Share this post</span>

                                    <div class="blog-details__share-media">
                                        <div class="blog-details__share-icon">
                                            <i class="fas fa-share-alt"></i>
                                        </div>
                                        <ul class="blog-details__share-social">
                                            <li><a href="#" data-bs-tooltip="tooltip" data-bs-placement="top" title="Twitter"><i class="fab fa-twitter"></i></a></li>
                                            <li><a href="#" data-bs-tooltip="tooltip" data-bs-placement="top" title="Facebook"><i class="fab fa-facebook-f"></i></a></li>
                                            <li><a href="#" data-bs-tooltip="tooltip" data-bs-placement="top" title="Linkedin"><i class="fab fa-linkedin"></i></a></li>
                                            <li><a href="#" data-bs-tooltip="tooltip" data-bs-placement="top" title="Tumblr"><i class="fab fa-tumblr-square"></i></a></li>
                                            <li><a href="#" data-bs-tooltip="tooltip" data-bs-placement="top" title="Email"><i class="fas fa-envelope"></i></a></li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                            <div class="blog-details__nav">
                                <div class="blog-details__nav-item prev">
                                    <a class="blog-details__nav-link" href="#">
                                        <div class="blog-details__hover-bg" style="background-image: url(assets/images/blog/blog-11.jpg);"></div>
                                        <span class="text">The Challenge Of Global Learning In Public Education</span>
                                    </a>
                                </div>
                                <div class="blog-details__nav-item next">
                                    <a class="blog-details__nav-link" href="#">
                                        <div class="blog-details__hover-bg" style="background-image: url(assets/images/blog/blog-13.jpg);"></div>
                                        <span class="text">It’s Time To Think Differently About Writing In The Classroom</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                        <!-- Blog Dtails End -->

                        <!-- Related Post Start -->
                        <div class="related-post mt-8">
                            <h3 class="related-post__title">Related Posts</h3>

                            <div class="related-posts swiper-button-style">
                                <div class="swiper">
                                    <div class="swiper-wrapper" id="relatedPostsContainer">
                                        <!-- All related posts will be loaded here dynamically -->
                                    </div>
                                </div>

                                <div class="swiper-button-next"><i class="fas fa-angle-right"></i></div>
                                <div class="swiper-button-prev"><i class="fas fa-angle-left"></i></div>
                            </div>

                        </div>
                        <!-- Related Post End -->

                        <!-- Comment Start -->
                        <div class="comments-area">

                            <!-- Comment Wrapper Start -->
                            <div class="comment-wrap mt-8">
                                <h3 class="comment-title">Leave your thought here</h3>
                                <p>Your email address will not be published. Required fields are marked *</p>

                                <!-- Comment Form Start -->
                                <div class="comment-form">
                                    <form action="#" id="contactForm">
                                        <div class="row gy-4">
                                            <div class="col-md-6">
                                                <div class="comment-form__input">
                                                    <input type="text" class="form-control" id="contactName" placeholder="Your Name *">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="comment-form__input">
                                                    <input type="email" class="form-control" id="contactEmail" placeholder="Your Email *">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="comment-form__input">
                                                    <input type="phone" class="form-control" id="contactNumber"  placeholder="Your Phone *">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="comment-form__input">
                                                    <input class="form-control" id="contactMessage" placeholder="Your Comment"/>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="comment-form__input form-check">
                                                    <input type="checkbox" id="save">
                                                    <label for="save">Save my name, email, and website in this browser for the next time I comment.</label>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="comment-form__input">
                                                    <button class="btn btn-primary btn-hover-secondary">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <!-- Comment Form End -->

                            </div>
                            <!-- Comment Wrapper End -->

                        </div>
                        <!-- Comment End -->

                    </div>
                    <div class="col-lg-4">
                        <!-- Sidebar Widget Start -->
                        <div class="sidebar-widget-weap-02 ps-xl-6">

                            <!-- Sidebar Widget Start -->
                            <div class="sidebar-widget-02">
                                <h4 class="sidebar-widget-02__title">Search</h4>

                                <!-- Sidebar Widget Search Start -->
                                <div class="sidebar-widget-02-search">
                                    <form method="get" action="#">
                                        <input type="search" class="sidebar-widget-02-search__field" placeholder="Search…">
                                        <button type="submit" class="sidebar-widget-02-search__submit">
                                            <span class="search-btn-icon fas fa-search"></span>
                                        </button>
                                    </form>
                                </div>
                                <!-- Sidebar Widget Search End -->
                            </div>
                            <!-- Sidebar Widget End -->

                            <!-- Sidebar Widget Start -->
                            <div class="sidebar-widget-02">
                                <h4 class="sidebar-widget-02__title">Categories</h4>

                                <!-- Sidebar Widget Search Start -->
                                <ul class="sidebar-widget-02__link">
                                    <li><a href="#">Business <span class="count">(6)</span> </a></li>
                                    <li><a href="#">HR and L&D <span class="count">(5)</span> </a></li>
                                    <li><a href="#">Video & Tips <span class="count">(5)</span> </a></li>
                                </ul>
                                <!-- Sidebar Widget Search End -->
                            </div>
                            <!-- Sidebar Widget End -->

                            <!-- Sidebar Widget Start -->
                            <div class="sidebar-widget-02">
                                <h4 class="sidebar-widget-02__title">Latest Posts</h4>

                                <!-- Sidebar Widget Search Start -->
                                <ul class="sidebar-widget-02__psot" id="latestPostsContainer">
                                    <!-- Latest 3 posts will be loaded here dynamically -->
                                </ul>
                                <!-- Sidebar Widget Search End -->
                            </div>
                            <!-- Sidebar Widget End -->

                            <!-- Sidebar Widget Start -->
                            <div class="sidebar-widget-02">
                                <h4 class="sidebar-widget-02__title">Popular Tags</h4>

                                <!-- Sidebar Widget Search Start -->
                                <ul class="sidebar-widget-02__tags">
                                    <li><a href="#">data science</a></li>
                                    <li><a href="#">deep learning</a></li>
                                    <li><a href="#">education</a></li>
                                    <li><a href="#">language</a></li>
                                    <li><a href="#">learning</a></li>
                                    <li><a href="#">machine learning</a></li>
                                    <li><a href="#">tips</a></li>
                                    <li><a href="#">videos</a></li>
                                    <li><a href="#">web development</a></li>
                                </ul>
                                <!-- Sidebar Widget Search End -->
                            </div>
                            <!-- Sidebar Widget End -->

                        </div>
                        <!-- Sidebar Widget End -->
                    </div>
                </div>
            </div>
        </div>
        <!-- Blog End -->

        <?php include 'footer.php'; ?>