<?php include 'header.php'; ?>
<div class="page-banner bg-color-05 __web-inspector-hide-shortcut__">
   <div class="page-banner__wrapper" style="margin-top: 152.391px;">
      <div class="container">
         <div class="page-breadcrumb">
            <ul class="breadcrumb">
               <li class="breadcrumb-item"><a href="./index.php">Home</a></li>
               <li class="breadcrumb-item active">Career</li>
            </ul>
         </div>
         <div class="page-banner__caption text-center">
            <h2 class="page-banner__main-title">Join Our Team</h2>
         </div>
      </div>
   </div>
</div>
<div class="career-section section-padding-01">
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-lg-8">
            <div class="career-form-wrapper ">
               <form action="#" id="careerForm"> 
                  <div class="row gy-4">
                     <div class="col-md-6">
                        <div class="career-form__input">
                           <label for="name" class="form-label">Name *</label>
                           <input type="text" name="name" id="careerName" placeholder="Enter your full name" class="form-control " value="" required="">
                        </div>
                     </div>
                     <div class="col-md-6">
                        <div class="career-form__input">
                           <label for="email" class="form-label">Email *</label>
                           <input type="email" name="email" id="careerEmail" placeholder="Enter your email address" class="form-control " value="" required="">
                        </div>
                     </div>
                     <div class="col-md-6">
                        <div class="career-form__input">
                           <label for="mobile" class="form-label">Mobile *</label>
                           <input type="text" name="mobile" id="careerMobile" placeholder="Enter your mobile number" class="form-control " value="" required="">
                        </div>
                     </div>
                     <div class="col-md-6">
                        <div class="career-form__input">
                           <label for="subject" class="form-label">Subject/Position *</label>
                           <input type="text" name="subject" id="careerSubject" placeholder="Enter the position you're applying for" class="form-control " value="" required="">
                        </div>
                     </div>
                     <div class="col-6">
                        <div class="career-form__input">
                           <label for="resume" class="form-label">Upload Resume (PDF, max 5MB) *</label>
                           <input type="file" name="resume" id="careerResume" class="form-control " accept=".pdf" required="">
                        </div>
                     </div>
                     <div class="col-md-6">
                                    <div class="career-form__input">
                                        <textarea class="form-control" id="careerMessage" placeholder="Message"></textarea>
                                    </div>
                                </div>
                     <div class="col-12 text-center">
                        <button type="submit" class="btn btn-primary btn-hover-secondary">Submit Application</button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
</div>


<?php include 'footer.php'; ?>