<?php include 'header.php'; ?>


        <!-- Page Banner Section Start -->
        <div class="page-banner bg-color-05">
            <div class="page-banner__wrapper">
                <div class="container">
                    <!-- Page Breadcrumb Start -->
                    <div class="page-breadcrumb">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li class="breadcrumb-item active">FAQs</li>
                        </ul>
                    </div>
                    <!-- Page Breadcrumb End -->
                </div>
                <div class="container custom-container">

                    <div class="row">
                        <div class="col-md-6">
                            <!-- Page Banner Start -->
                            <div class="page-banner__search">
                                <h2 class="page-banner__main-title">How may we help you?</h2>

                                <form action="#">
                                    <div class="page-banner__search-form">
                                        <input class="page-banner__field" placeholder="Search...">
                                        <button type="submit" class="page-banner__submit">
                                            <i class="search-btn-icon fas fa-search"></i>
                                        </button>
                                    </div>
                                </form>

                            </div>
                            <!-- Page Banner End -->
                        </div>
                    </div>

                </div>
                <div class="page-banner__bg" style="background-image: url(assets/images/banner-image-06.png);"></div>
            </div>
        </div>
        <!-- Page Banner Section End -->

        <!-- Offcanvas Start -->
       <div class="offcanvas offcanvas-end offcanvas-mobile" id="offcanvasMobileMenu" style="background-image: url(assets/images/mobile-bg.jpg);">
            <div class="offcanvas-header bg-white">
                <div class="offcanvas-logo">
                    <a class="offcanvas-logo__logo" href="#"><img src="assets/images/hyperscripts.png" alt="Logo"></a>
                </div>
                <button type="button" class="offcanvas-close" data-bs-dismiss="offcanvas"><i class="fas fa-times"></i></button>
            </div>

            <div class="offcanvas-body">
                <nav class="canvas-menu">
                    <ul class="offcanvas-menu">
                        <li><a class="active" href="index.php"><span>Home</span></a>
                        </li>
                        <li>
                            <a href="course.php"><span>Courses</span></a>
                           
                        </li>
                        <li>
                            <a href="blog.php"><span>Blog</span></a>
                          
                        </li>
                        <li>
                            <a href="#"><span>Pages</span></a>
                           
                        </li>
                        <li>
                            <a href="#"><span>Features</span></a>
                               
                        </li>


                    </ul>
                </nav>
            </div>

            <!-- Header User Button Start -->
            <div class="offcanvas-user d-lg-none">
                <div class="offcanvas-user__button">
                    <button class="offcanvas-user__login btn btn-secondary btn-hover-secondarys" data-bs-toggle="modal" data-bs-target="#loginModal">Log In</button>
                </div>
                <div class="offcanvas-user__button">
                    <button class="offcanvas-user__signup btn btn-primary btn-hover-primary" data-bs-toggle="modal" data-bs-target="#registerModal">Sign Up</button>
                </div>
            </div>
            <!-- Header User Button End -->

        </div>
        <!-- Offcanvas End -->


        <section class="container py-5 my-5">
            <div class="text-center mb-5">
              <h2>Frequently Asked Questions</h2>
              <p class="text-muted mt-3">Please reach us at <a href="info.hyperscripts@gmail.com">info.hyperscripts@gmail.com</a> if you cannot find an answer to your question.</p>
            </div>
          
            <div class="accordion" id="faqAccordion">
              <!-- FAQ 1 -->
              <div class="accordion-item bg-transparent">
                <h3 class="accordion-header" id="headingOne">
                  <button class="accordion-button  bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    How is the training delivered?
                  </button>
                </h3>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    All courses are conducted online via platforms such as Zoom and Google Meet, allowing us to reach students from all parts of India. This format offers flexibility, convenience, and accessibility, enabling learners to join from the comfort of their homes. The online approach also facilitates a diverse learning environment, connecting students nationwide, making in-person classes less feasible.                  </div>
                </div>
              </div>
          
              
              <!-- <style>
                .accordion-button:focus {
  box-shadow: none;
  border-color: #dee2e6;
  outline: none;
}

.accordion-button:not(.collapsed) {
  background-color: transparent;
  color: inherit;
  box-shadow: none;
}
              </style> -->
              <!-- FAQ 2 -->
              <div class="accordion-item">
                <h3 class="accordion-header" id="headingTwo">
                  <button class="accordion-button bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Who is eligible to apply for any course mentioned at hyperscripts website?
                  </button>
                </h3>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    This course is open to anyone eager to learn, including IT professionals, fresh graduates, and students from various backgrounds such as B.E., B.Tech, B.Sc., MCA, M.Sc. (Computers), M.Tech, BCA, B.Com, and other streams. Essentially, anyone with a passion for learning is welcome to join.                  </div>
                </div>
              </div>
          
              <!-- FAQ 3 -->
              <div class="accordion-item">
                <h3 class="accordion-header" id="headingThree">
                  <button class="accordion-button bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    What is the duration of the program?
                  </button>
                </h3>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    The duration of our programs varies depending on the course. For example, the Service Transition and Operations course typically lasts 45 days with 2-hour daily sessions, while more intensive technical courses, such as SAP, can take up to 5 months, with 7-8 hours of daily instruction. Please refer to our program syllabus for detailed information on each course.
                  </div>
                </div>
              </div>

               <!-- FAQ 4 -->
               <div class="accordion-item bg-transparent">
                <h3 class="accordion-header" id="headingFour">
                  <button class="accordion-button bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    Will I receive a certificate at the end of the course?
                  </button>
                </h3>
                <div id="collapseFour" class="accordion-collapse collapse " aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Yes, upon completion of the course, you will receive a training certificate along with an experience letter.
                  </div>
                </div>
              </div>
          
              <!-- FAQ 5 -->
              <div class="accordion-item">
                <h3 class="accordion-header" id="headingFive">
                  <button class="accordion-button bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    Is prior coding experience required?
                  </button>
                </h3>
                <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Coding experience is not mandatory and varies by course. If coding knowledge is needed, we will guide you from the basics to advanced levels within the course duration. For managerial courses, no coding or technical background is necessary.
                  </div>
                </div>
              </div>
          
              <!-- FAQ 6 -->
              <div class="accordion-item">
                <h3 class="accordion-header" id="headingSix">
                  <button class="accordion-button bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                    What happens if I drop out midway?
                  </button>
                </h3>
                <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    We are committed to supporting you throughout the course. However, if you find yourself needing to leave the course midway, we would value the opportunity to discuss your reasons and explore potential solutions together.
                  </div>
                </div>
              </div>

               <!-- FAQ 7 -->
               <div class="accordion-item bg-transparent">
                <h3 class="accordion-header" id="headingSeven">
                  <button class="accordion-button bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                    How can I apply for the course?
                  </button>
                </h3>
                <div id="collapseSeven" class="accordion-collapse collapse " aria-labelledby="headingSeven" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    You can easily apply by sending us an email or joining our Telegram channel. Just fill in the required details and follow the instructions to complete the joining formalities. Alternatively, you can share your contact number, and we will reach out to assist you.                  </div>
                </div>
              </div>
          
              <!-- FAQ 8 -->
              <div class="accordion-item">
                <h3 class="accordion-header" id="headingEight">
                  <button class="accordion-button bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                    Is there a selection criterion? If so, what is it?
                  </button>
                </h3>
                <div id="collapseEight" class="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Yes, we have a selection process. We conduct a straightforward interview to assess the student's capabilities, vocabulary skills, and interest in learning.
                  </div>
                </div>
              </div>
          
              <!-- FAQ 9 -->
              <div class="accordion-item">
                <h3 class="accordion-header" id="headingNine">
                  <button class="accordion-button bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                    I applied for a course but haven't heard back yet. When should I expect a response?
                  </button>
                </h3>
                <div id="collapseNine" class="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    We will get back to you in two working days if we are unable to get in touch with you on the same day.
                  </div>
                </div>
              </div>

               <!-- FAQ 10 -->
               <div class="accordion-item bg-transparent">
                <h3 class="accordion-header" id="headingTen">
                  <button class="accordion-button bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                    How many placement opportunities will I receive with the placement guarantee program?
                  </button>
                </h3>
                <div id="collapseTen" class="accordion-collapse collapse " aria-labelledby="headingTen" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    You will have access to unlimited placement opportunities until you secure a position.
                  </div>
                </div>
              </div>
          
              <!-- FAQ 11 -->
              <div class="accordion-item">
                <h3 class="accordion-header" id="headingEleven">
                  <button class="accordion-button bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
                    What is the "Pay After Placement" policy?
                  </button>
                </h3>
                <div id="collapseEleven" class="accordion-collapse collapse" aria-labelledby="headingEleven" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Our "Pay After Placement" policy allows you to focus on your learning without upfront financial pressure. You only pay the course fee after you've successfully secured a job placement, ensuring that our priority is your success.
                  </div>
                </div>
              </div>
          
             
          
              <!-- Add more FAQs as needed -->
            </div>
          </section>
          


          
          <?php include 'footer.php'; ?>