<?php include 'header.php'; ?>
<!-- Page Banner Section Start -->
<div class="page-banner bg-color-05">
   <div class="page-banner__wrapper">
      <div class="container">
         <!-- Page Breadcrumb Start -->
         <div class="page-breadcrumb">
            <ul class="breadcrumb">
               <li class="breadcrumb-item"><a href="index.php">Home</a></li>
               <li class="breadcrumb-item active">Courses</li>
            </ul>
         </div>
         <!-- Page Breadcrumb End -->
         <!-- Page Banner Caption Start -->
         <div class="page-banner__caption text-center">
            <h2 class="page-banner__main-title">Courses</h2>
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
<!-- Courses Start -->
<div class="courses-section section-padding-01">
   <div class="container">
      <div class="row gy-10 flex-row-reverse">
         <div class="col-lg-9">
            <!-- Archive Filter Bars Start -->
            <div class="archive-filter-bars">
               <div class="archive-filter-bar">
                  <p>We found <span id="courseCount">0</span> courses available for you</p>
               </div>
               <div class="archive-filter-bar">
                  <div class="filter-bar-wrapper">
                     <span>See</span>
                     <ul class="nav">
                        <li><button class="active" data-bs-toggle="tab" data-bs-target="#grid"><i
                                 class="fas fa-th"></i></button></li>
                        <li><button data-bs-toggle="tab" data-bs-target="#list"><i class="fas fa-bars"></i></button>
                        </li>
                     </ul>
                     <button class="btn btn-light btn-hover-primary course-filter-toggle d-lg-none" type="button"
                        data-bs-toggle="offcanvas" data-bs-target="#courseFilterDrawer"
                        aria-controls="courseFilterDrawer">
                        <i class="fas fa-filter"></i>
                        Filters
                     </button>
                  </div>
               </div>
            </div>
            <!-- Archive Filter Bars End -->
            <div class="tab-content">
             <div class="tab-pane fade show active" id="grid">
    <div class="row gy-6"></div>
</div>

               <div class="tab-pane fade" id="list">
                  <!-- Course List Start -->
                  <div class="course-list-item">
                     <div class="course-list-header">
                        <div class="course-list-header__thumbnail">
                           <a href="course-detail.php"><img src="assets/images/courses/courses-1.jpg" alt="courses"
                                 width="270" height="181"></a>
                        </div>
                     </div>
                     <div class="course-list-info">
                        <h3 class="course-list-info__title"><a href="course-detail.php">Successful Negotiation: Master
                              Your Negotiating Skills</a></h3>
                        <div class="course-list-info__meta">
                           <span><i class="fas fa-play-circle"></i> 5 Lessons</span>
                           <span><i class="fas fa-clock"></i> 2.3 hours</span>
                           <span><i class="fas fa-sliders-h"></i> All Levels</span>
                        </div>
                        <div class="course-list-info__description">
                           <p>Negotiation is a skill well worth mastering – by putting …</p>
                        </div>
                        <div class="course-list-info__action">
                           <button class="btn btn-primary btn-hover-secondary" id="addToCart">Add to cart</button>
                           <button class="btn-icon btn-light btn-hover-primary" data-bs-tooltip="tooltip"
                              data-bs-placement="top" title="Add to wishlist"><i class="far fa-heart"></i></button>
                        </div>
                        <div class="course-list-info__footer">
                           <div class="course-list-info__price">
                              <span class="sale-price">$42.<small class="separator">00</small></span>
                           </div>
                           <div class="course-list-info__rating">
                              <div class="rating-star">
                                 <div class="rating-label" style="width: 100%;"></div>
                              </div>
                              <div class="rating-average">
                                 <span class="rating-average__average">5.0</span>
                                 <span class="rating-average__total">/5</span>
                              </div>
                              <p class="course-list-info__rating-count">(2 ratings)</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <!-- Course List End -->
               
                 
                  <!-- Course List End -->
               </div>
            </div>
            <!-- Page Pagination Start -->
            <div class="page-pagination">
               <ul class="pagination justify-content-center" id="coursePagination"></ul>
            </div>
            <!-- Page Pagination End -->
         </div>
         <!-- our course -->
         <div class="col-lg-3">
            <!-- Sidebar Widget Start -->
            <div class="sidebar-widget-wrapper">
               <!-- Sidebar Widget Wrapper Start -->
               <div class="sidebar-widget-wrap bg-color-10">
                  <h4 class="sidebar-widget-wrap__title">Filter by category</h4>
                  <!-- Widget Filter Start -->
                  <div class="widget-filter">
                     <!-- Widget Filter Wrapper Start -->
                     <div class="widget-filter__wrapper">
                        <ul class="widget-filter__list" id="categoryList">
                           <!-- Categories will load here dynamically -->
                        </ul>

                     </div>
                     <!-- Widget Filter Wrapper End -->
                  </div>
                  <!-- Widget Filter End -->
               </div>
               <!-- Sidebar Widget Wrapper End -->
               <!-- Sidebar Widget Wrapper Start -->
               <div class="sidebar-widget-wrap bg-color-10 mt-4">
                  <h4 class="sidebar-widget-wrap__title">Filter by</h4>
                  <!-- Widget Filter Start -->
                 
                 
                
                  <!-- Widget Filter End -->
                  <!-- Widget Filter Start -->
                  <div class="widget-filter">
                     <h4 class="widget-filter__title">Language</h4>

                     <div class="widget-filter__wrapper">
                        <ul class="widget-filter__list" id="languageList">
                           <!-- Languages will load here -->
                        </ul>
                     </div>
                  </div>

                  <!-- Widget Filter End -->
                  <!-- Widget Filter Start -->
                  <div class="widget-filter">
                     <h4 class="widget-filter__title-02">Rating</h4>
                     <!-- Widget Filter Wrapper Start -->
                     <div class="widget-filter__wrapper">
                        <ul class="widget-filter__list">
                           <li>
                              <!-- Widget Filter Item Start -->
                              <div class="widget-filter__item">
                                 <input type="checkbox" id="rating6" name="sort-by">
                                 <label for="rating6">
                                    <span class="star-line">
                                       <span class="star" style="width: 100%;"></span>
                                    </span>
                                    <span>(07)</span>
                                 </label>
                              </div>
                           </li>
                           <li>
                              <!-- Widget Filter Item Start -->
                              <div class="widget-filter__item">
                                 <input type="checkbox" id="rating7" name="sort-by">
                                 <label for="rating7">
                                    <span class="star-line">
                                       <span class="star" style="width: 80%;"></span>
                                    </span>
                                    <span>(0)</span>
                                 </label>
                              </div>
                           </li>
                           <li>
                              <!-- Widget Filter Item Start -->
                              <div class="widget-filter__item">
                                 <input type="checkbox" id="rating8" name="sort-by">
                                 <label for="rating8">
                                    <span class="star-line">
                                       <span class="star" style="width: 60%;"></span>
                                    </span>
                                    <span>(0)</span>
                                 </label>
                              </div>
                           </li>
                           <li>
                              <!-- Widget Filter Item Start -->
                              <div class="widget-filter__item">
                                 <input type="checkbox" id="rating9" name="sort-by">
                                 <label for="rating9">
                                    <span class="star-line">
                                       <span class="star" style="width: 40%;"></span>
                                    </span>
                                    <span>(0)</span>
                                 </label>
                              </div>
                           </li>
                           <li>
                              <!-- Widget Filter Item Start -->
                              <div class="widget-filter__item">
                                 <input type="checkbox" id="rating10" name="sort-by">
                                 <label for="rating10">
                                    <span class="star-line">
                                       <span class="star" style="width: 20%;"></span>
                                    </span>
                                    <span>(0)</span>
                                 </label>
                              </div>
                           </li>
                        </ul>
                     </div>
                     <!-- Widget Filter Wrapper End -->
                  </div>
                 
                  <!-- Widget Filter End -->
               </div>
               <!-- Sidebar Widget Wrapper End -->
            </div>
            <!-- Sidebar Widget End -->
         </div>
      </div>
   </div>
</div>
<!-- Courses End -->


<!-- slider  -->
<div class="hiring-logo-carousel container">
    <h2 class="hiring-section-title__title-03">Hiring Partners</h2>
    <div class="hiring-carousel-wrapper">
        <button class="hiring-carousel-arrow left" aria-label="Slide Left">
            <i class="fas fa-angle-left"></i>
        </button>
        <div class="hiring-carousel-view" id="hiringCarouselView">
            <div class="hiring-carousel-track" id="hiringCarouselTrack" style="transform: translateX(-440px);">
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Accenture.webp" alt="Accenture Logo">
                </div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Amazon.webp" alt="Amazon Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Amdocs.webp" alt="Amdocs Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Axis Bank.webp" alt="Axis Bank Logo">
                </div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Bain &amp;.webp"
                        alt="Bain &amp; Company Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Bank of America.webp"
                        alt="Bank of America Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/BCG.webp" alt="BCG Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/CapGemini.webp" alt="CapGemini Logo">
                </div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Deloitte.webp" alt="Deloitte Logo">
                </div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Diebold Nixdorf.webp"
                        alt="Diebold Nixdorf Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Ericson.webp" alt="Ericsson Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/EY.webp" alt="EY Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/FIS.webp" alt="FIS Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Fujitsu.webp" alt="Fujitsu Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Google.webp" alt="Google Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/HCL.webp" alt="HCL Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Hdfc Bank.webp" alt="HDFC Bank Logo">
                </div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/HSBC.webp" alt="HSBC Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/IBM.webp" alt="IBM Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Infosys.webp" alt="Infosys Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/ITC Infotech.webp"
                        alt="ITC Infotech Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Jio.webp" alt="Jio Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Kone Elevator.webp"
                        alt="Kone Elevator Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/KPMG.webp" alt="KPMG Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Lenovo.webp" alt="Lenovo Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/lti mindtree.webp"
                        alt="LTI Mindtree Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Mckinsey.webp" alt="McKinsey Logo">
                </div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Microsoft.webp" alt="Microsoft Logo">
                </div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Morgan Stanley.webp"
                        alt="Morgan Stanley Logo"></div>
                <div class="hiring-carousel-item-custom"><img src="https://careercracker.com/front/assets/images/jp.png"
                        alt="MSCI Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Nokia.webp" alt="Nokia Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Novo Nordisk.webp"
                        alt="Novo Nordisk Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/NTT Data.webp" alt="NTT Data Logo">
                </div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Oracle.webp" alt="Oracle Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Salesforce.webp" alt="Salesforce Logo">
                </div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Sap.webp" alt="SAP Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/tcs.webp" alt="TCS Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Tech Mahindra.webp"
                        alt="Tech Mahindra Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Thomson Reuters.webp"
                        alt="Thomson Reuters Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Vodafone.webp" alt="Vodafone Logo">
                </div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/Wipro.webp" alt="Wipro Logo"></div>
                <div class="hiring-carousel-item-custom"><img
                        src="https://careercracker.com/front/assets/images/logo/WNS.webp" alt="WNS Logo"></div>
            </div>
        </div>
        <button class="hiring-carousel-arrow right" aria-label="Slide Right">
            <i class="fas fa-angle-right"></i>
        </button>
    </div>
</div>
<style>
    .hiring-logo-carousel {
        padding: 60px 0;
        text-align: center;
    }

    .hiring-section-title__title-03 {
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 40px;
    }

    /* Wrapper */
    .hiring-carousel-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    /* View Area */
    .hiring-carousel-view {
        overflow: hidden;
        width: 100%;
    }

    /* Track */
    .hiring-carousel-track {
        display: flex;
        gap: 20px;
        transition: transform 0.5s ease;
    }

    /* Item */
    .hiring-carousel-item-custom {
        min-width: 200px;
        height: 200px;
        background: #fff;
        border: 1px solid #eee;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px;
        transition: all 0.3s ease;
        margin: 15px;
    }

    /* Logo */
    .hiring-carousel-item-custom img {
        max-width: 120px;
        max-height: 90px;
        object-fit: contain;
        /* filter: grayscale(100%); */
        transition: all 0.3s ease;
    }

    /* Hover Effect */
    .hiring-carousel-item-custom {
        /* transform: translateY(-8px); */
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .hiring-carousel-item-custom:hover img {
        /* transform: translateY(-8px); */
        transform: scale(1.20);

        filter: grayscale(0%);
    }

    /* Arrows */
    .hiring-carousel-arrow {
        background: #000;
        color: #fff;
        border: none;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        cursor: pointer;
        position: absolute;
        z-index: 2;
        transition: 0.3s;
    }

    .hiring-carousel-arrow.left {
        left: 0px;
    }

    .hiring-carousel-arrow.right {
        right: 0px;
    }

    .hiring-carousel-arrow:hover {
        background: #333;
    }

    /* Responsive */

    @media (max-width: 992px) {
        .hiring-carousel-item-custom {
            min-width: 160px;
        }
    }

    @media (max-width: 576px) {
        .hiring-carousel-item-custom {
            min-width: 130px;
            height: 90px;
        }

        .hiring-section-title__title-03 {
            font-size: 26px;
        }
    }
</style>


<script>
    
 const track = document.getElementById("hiringCarouselTrack");
    const leftBtn = document.querySelector(".hiring-carousel-arrow.left");
    const rightBtn = document.querySelector(".hiring-carousel-arrow.right");

    let scrollAmount = 0;
    const scrollStep = 220; // ek logo + gap ke approx

    rightBtn.addEventListener("click", () => {
        scrollAmount += scrollStep;
        track.style.transform = `translateX(-${scrollAmount}px)`;
    });

    leftBtn.addEventListener("click", () => {
        scrollAmount -= scrollStep;
        if (scrollAmount < 0) scrollAmount = 0;
        track.style.transform = `translateX(-${scrollAmount}px)`;
    });


</script>


<!-- Newsletter Start -->
<div class="section-padding-0">
   <div class="">
      <div class="newsletter-section scene">
         <!-- Newsletter Wrapper Start -->
         <div class="newsletter-wrapper d-flex">
            <div class="newsletter__content">
               <h3 class="newsletter__title"><span class="orange">Subscribe Our</span> <span
                     class="text-white">Newsletter</span> </h3>
               <p class=" text-white">Get the latest updates, tips, and exclusive <br> offers straight to your inbox.
               </p>
            </div>
            <div class="newsletter__form">
               <form action="#">
                  <input type="text" placeholder="Your e-mail">
                  <button class="btn btn-orange btn-hover-primary">Subscribe</button>
               </form>
            </div>
         </div>
         <!-- Newsletter Wrapper End -->
         <div class="newsletter-section__shape-01" data-depth="-0.4"></div>
         <div class="newsletter-section__shape-02" data-depth="0.4"></div>
         <div class="newsletter-section__shape-03" data-depth="-0.5"></div>
         <div class="newsletter-section__shape-04" data-depth="0.5"></div>
      </div>
   </div>
</div>
<!-- Newsletter End -->

<!-- Mobile Filter Drawer (body level for correct width & overlay) -->
<div class="offcanvas offcanvas-end course-filter-offcanvas" tabindex="-1" id="courseFilterDrawer"
   aria-labelledby="courseFilterDrawerLabel">
   <div class="offcanvas-header course-filter-offcanvas__header border-bottom">
      <h5 class="offcanvas-title" id="courseFilterDrawerLabel">Filters</h5>
      <button type="button" class="course-filter-offcanvas__close" data-bs-dismiss="offcanvas" aria-label="Close">
         <i class="fas fa-times" aria-hidden="true"></i>
      </button>
   </div>
   <div class="offcanvas-body">
      <div class="widget-filter">
         <h4 class="widget-filter__title">Categories</h4>
         <div class="widget-filter__wrapper widgetScroll">
            <ul class="widget-filter__list" id="categoryList2"></ul>
         </div>
      </div>
      <div class="widget-filter mt-4">
         <h4 class="widget-filter__title">Language</h4>
         <div class="widget-filter__wrapper widgetScroll">
            <ul class="widget-filter__list" id="languageList2"></ul>
         </div>
      </div>
      <div class="widget-filter mt-4">
         <h4 class="widget-filter__title-02">Rating</h4>
         <div class="widget-filter__wrapper">
            <ul class="widget-filter__list">
               <li>
                  <div class="widget-filter__item">
                     <input type="checkbox" id="drawerRating5" name="rating-filter">
                     <label for="drawerRating5">
                        <span class="star-line"><span class="star" style="width: 100%;"></span></span>
                        <span>(07)</span>
                     </label>
                  </div>
               </li>
               <li>
                  <div class="widget-filter__item">
                     <input type="checkbox" id="drawerRating4" name="rating-filter">
                     <label for="drawerRating4">
                        <span class="star-line"><span class="star" style="width: 80%;"></span></span>
                        <span>(0)</span>
                     </label>
                  </div>
               </li>
               <li>
                  <div class="widget-filter__item">
                     <input type="checkbox" id="drawerRating3" name="rating-filter">
                     <label for="drawerRating3">
                        <span class="star-line"><span class="star" style="width: 60%;"></span></span>
                        <span>(0)</span>
                     </label>
                  </div>
               </li>
               <li>
                  <div class="widget-filter__item">
                     <input type="checkbox" id="drawerRating2" name="rating-filter">
                     <label for="drawerRating2">
                        <span class="star-line"><span class="star" style="width: 40%;"></span></span>
                        <span>(0)</span>
                     </label>
                  </div>
               </li>
               <li>
                  <div class="widget-filter__item">
                     <input type="checkbox" id="drawerRating1" name="rating-filter">
                     <label for="drawerRating1">
                        <span class="star-line"><span class="star" style="width: 20%;"></span></span>
                        <span>(0)</span>
                     </label>
                  </div>
               </li>
            </ul>
         </div>
      </div>
   </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
   var drawer = document.getElementById('courseFilterDrawer');
   if (drawer && drawer.parentElement !== document.body) {
      document.body.appendChild(drawer);
   }

   var mobileMenu = document.getElementById('offcanvasMobileMenu');
   if (!mobileMenu) return;

   mobileMenu.addEventListener('show.bs.offcanvas', function () {
      if (drawer && drawer.classList.contains('show')) {
         var filterInstance = bootstrap.Offcanvas.getInstance(drawer);
         if (filterInstance) filterInstance.hide();
      }
      document.querySelectorAll('.offcanvas-backdrop').forEach(function (el, index, list) {
         if (index < list.length - 1) el.remove();
      });
   });
});
</script>

<?php include 'footer.php'; ?>