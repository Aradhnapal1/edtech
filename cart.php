<?php include 'header.php'; ?>
<!-- Page Banner Section Start -->
<div class="page-banner bg-color-05">
   <div class="page-banner__wrapper">
      <div class="container">
         <!-- Page Breadcrumb Start -->
         <div class="page-breadcrumb">
            <ul class="breadcrumb">
               <li class="breadcrumb-item"><a href="index.php">Home</a></li>
               <li class="breadcrumb-item active">Cart</li>
            </ul>
         </div>
         <!-- Page Breadcrumb End -->
         <!-- Page Banner Caption Start -->
         <div class="page-banner__caption text-center">
            <h2 class="page-banner__main-title">Cart</h2>
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


<!-- Cart Section Start -->
<div class="cart-section section-padding-01">
   <div class="container custom-container">
      <form action="#">
         <!-- Cart Table Start -->
         <div class="cart-table table-responsive">
            <table class="table">
               <thead>
                  <tr>
                     <th class="product">Product</th>
                     <th class="price">Price</th>
                     <!-- <th class="quantity">Quantity</th> -->
                     <th class="subtotal">Subtotal</th>
                     <th class="action"></th>
                  </tr>
               </thead>
               <tbody id="cartTableBody">
                  <tr>
                     <td class="product">
                        <div class="cart-product">
                           <div class="cart-product__thumbnail">
                              <img src="assets/images/product/product-2.png" alt="Product" width="70" height="81">
                           </div>
                           <div class="cart-product__content">
                              <h3 class="cart-product__name">Awesome for Websites</h3>
                           </div>
                        </div>
                     </td>
                     <td class="price">
                        <div class="cart-product__price">
                           <span class="sale-price">$59.<small class="separator">00</small></span>
                        </div>
                     </td>
                     <td class="quantity">
                        <div class="cart-product">
                           <div class="product-quantity">
                              <button type="button" class="sub"></button>
                              <input type="text" value="1">
                              <button type="button" class="add"></button>
                           </div>
                        </div>
                     </td>
                     <td class="subtotal">
                        <div class="cart-product__total-price">
                           <span class="sale-price discount">$59.<small class="separator">00</small></span>
                        </div>
                     </td>
                     <td class="action">
                        <div class="cart-product__remove">
                           <button class="remove" data-id="${item._id}">Remove</button>
                        </div>
                     </td>
                  </tr>

               </tbody>
            </table>
         </div>
         <!-- Cart Table End -->
         <!-- Cart Actions Start -->
         <div class="cart-action d-flex flex-wrap justify-content-between gap-2">
            <div class="cart-action__left">
               <a class="btn btn-light btn-hover-primary" href="course.php" >Continue shopping</a>
               <span id="clearCart" style="cursor:pointer" class="cart-action__item" ><i class="fas fa-times"></i> Clear shopping cart</span>
            </div>
            <div class="cart-action__right">
               <button class="btn btn-secondary btn-hover-primary" href="course.php">Update cart</button>
            </div>
         </div>
         <!-- Cart Actions End -->
         <!-- Cart Collaterals Start -->
         <div class="cart-collaterals">
            <div class="row gy-6 justify-content-between">
               <div class="col-lg-4">
                  <!-- Cart Collaterals Start -->
                  <div class="cart-collaterals__item">
                     <h5 class="cart-collaterals__title">Coupon Discount</h5>
                     <p>Enter your coupon code if you have one.</p>
                     <div class="cart-collaterals__input">
                        <input type="text" class="form-control" id="couponCode" placeholder="Coupon code">
                     </div>
                     <div class="cart-collaterals__input">
                        <button class="btn btn-primary btn-hover-secondary" id="applyCoupon">Apply coupon</button>
                     </div>
                  </div>
                  <!-- Cart Collaterals End -->
               </div>
               <div class="col-lg-4">
                  <!-- Cart Collaterals Start -->
                  <div class="cart-collaterals__item">
                     <div class="cart-collaterals__box">
                        <table class="cart-collaterals__table">
                           <tbody>
                              <tr class="cart-subtotal">
                                 <th>Subtotal</th>
                                 <td>
                                    <span class="subtotal-price" id="subtotalPrice">
                                       ₹0<span class="separator">.00</span>
                                    </span>
                                 </td>
                              </tr>

                              <tr class="order-total">
                                 <th>Total</th>
                                 <td>
                                    <span class="total-price" id="totalPrice">
                                       ₹0<span class="separator">.00</span>
                                    </span>
                                 </td>
                              </tr>
                           </tbody>

                        </table>
                        <div class="cart-collaterals__btn">
                           <button class="btn btn-primary btn-hover-secondary w-100" id="checkoutbtn">
                              Checkout
                           </button>

                        </div>
                     </div>
                  </div>
                  <!-- Cart Collaterals End -->
               </div>
            </div>
         </div>
         <!-- Cart Collaterals End -->
      </form>
   </div>
</div>
<!-- Cart Section End -->
<?php include 'footer.php'; ?>