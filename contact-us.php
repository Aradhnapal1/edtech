<?php include 'header.php'; ?>


        <!-- Page Banner Section Start -->
        <div class="page-banner bg-color-05">
            <div class="page-banner__wrapper">
                <div class="container">

                    <!-- Page Breadcrumb Start -->
                    <div class="page-breadcrumb">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li class="breadcrumb-item active">Contact us</li>
                        </ul>
                    </div>
                    <!-- Page Breadcrumb End -->

                </div>
            </div>
        </div>
        <!-- Page Banner Section End -->

        <!-- Offcanvas Start -->
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

        <!-- Contact us Section Start -->
        <div class="contact-section">
            <div class="container custom-container">

                <!-- Contact Title Start -->
                <div class="contact-title text-center section-padding-02" data-aos="fade-up" data-aos-duration="1000">
                    <h2 class="contact-title__title">How can we help you?</h2>
                    <p>We understand that each student's situation and needs are unique to them. Tell us more about what you're looking for, and we will get back to you soon.</p>
                </div>
                <!-- Contact Title End -->

                <!-- Contact Info Start -->
                <div class="contact-info section-padding-02">
                    <div class="row gy-4">
                        <div class="col-lg-4 col-md-6">
                            <!-- Contact Info Start -->
                            <div class="contact-info__item" data-aos="fade-up" data-aos-duration="1000">
                                <div class="contact-info__icon">
                                    <i class="fas  fa-map-marker-alt"></i>
                                </div>
                                <div class="contact-info__content">
                                    <h3 class="contact-info__title">Address</h3>
                                    <p>Delhi , Noida</p>
                                </div>
                            </div>
                            <!-- Contact Info End -->
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <!-- Contact Info Start -->
                            <div class="contact-info__item" data-aos="fade-up" data-aos-duration="1000">
                                <div class="contact-info__icon">
                                    <i class="fas fa-phone"></i>
                                </div>
                                <div class="contact-info__content">
                                    <h3 class="contact-info__title">Contact</h3>
                                    <p>Mobile: <strong> 8527430152</strong></p>
                                    <p>Hotline: <strong>8527430152</strong></p>
                                    <p>Mail: info@hyperscripts.in</p>
                                </div>
                            </div>
                            <!-- Contact Info End -->
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <!-- Contact Info Start -->
                            <div class="contact-info__item" data-aos="fade-up" data-aos-duration="1000">
                                <div class="contact-info__icon">
                                    <i class="fas  fa-clock"></i>
                                </div>
                                <div class="contact-info__content">
                                    <h3 class="contact-info__title">Hour of operation</h3>
                                    <p>Monday - Friday: 09:00 - 20:00</p>
                                    <p>Sunday & Saturday: 10:30 - 22:00</p>
                                </div>
                            </div>
                            <!-- Contact Info End -->
                        </div>
                    </div>
                </div>
                <!-- Contact Info End -->

                <!-- Contact Map Start -->
                <div class="contact-map section-padding-02" data-aos="fade-up" data-aos-duration="1000">

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1752.991062880622!2d77.37935033886005!3d28.51018549393302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce937dd33a677%3A0xf2482b431fe4c606!2sATS%20Bouquet!5e0!3m2!1sen!2sin!4v1765020256923!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                </div>
                <!-- Contact Map End -->

                <!-- Contact Form Start -->
                <div class="contact-form section-padding-01">

                    <!-- Section Title Start -->
                    <div class="section-title text-center" data-aos="fade-up" data-aos-duration="1000">
                        <h2 class="section-title__title">Fill the form below so we can get to know you and your needs better.</h2>
                    </div>
                    <!-- Section Title End -->

                    <!-- Contact Form Wrapper Start -->
                    <div class="contact-form__wrapper" data-aos="fade-up" data-aos-duration="1000">
                        <form action="#" id="contactForm">
                            <div class="row gy-4">
                                <div class="col-md-6">
                                    <div class="contact-form__input">
                                        <input class="form-control" id="contactName" type="text" placeholder="Your name">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="contact-form__input">
                                        <input class="form-control" id="contactEmail" type="email" placeholder="Email">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="contact-form__input">
                                        <textarea class="form-control" id="contactMessage" placeholder="Message"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="contact-form__input">
                                        <input class="form-control" id="contactNumber" placeholder="Contact"></input>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="contact-form__input text-center">
                                        <button type="submit" class="btn btn-primary btn-hover-secondary" id="contactSubmitBtn">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!-- Contact Form Wrapper End -->

                </div>
                <!-- Contact Form End -->

            </div>
        </div>
        <!-- Contact us Section End -->

        <?php include 'footer.php'; ?>