<?php include './include/header.php'; ?>
<div class="dashboard-body">
   <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
      <div class="breadcrumb mb-24">
         <ul class="flex-align gap-4">
            <li><a href="index.php" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
            <li><span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span></li>
            <li><span class="text-main-600 fw-normal text-15">Add Faculty</span></li>
         </ul>
      </div>
      <div class="flex-align justify-content-end gap-8">
         <button type="button" class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Save as Draft</button>
         <button type="button" id="addFaculty" class="btn btn-main rounded-pill py-9">Publish Faculty</button>
      </div>
   </div>
   <ul class="step-list mb-24">
      <li class="step-list__item py-15 px-24 text-15 text-heading fw-medium flex-center gap-6 active">
         <span class="icon text-xl d-flex"><i class="ph ph-circle"></i></span>
         Faculty Details
         <span class="line position-relative"></span>
      </li>
   </ul>
   <div class="card">
      <div class="card-header border-bottom border-gray-100 flex-align gap-8">
         <h5 class="mb-0">Faculty Details</h5>
         <button type="button" class="text-main-600 text-md d-flex" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Course Details">
         <i class="ph-fill ph-question"></i>
         </button>
      </div>
      <div class="card-body">
         <form action="#">
            <div class="row gy-20">
               <div class="col-xxl-3 col-md-4 col-sm-5">
                  <div class="mb-20">
                     <label class="h5 fw-semibold font-heading mb-0">Thumbnail Image <span class="text-13 text-gray-400 fw-medium">(Required)</span></label>
                  </div>
                  <div id="fileUpload" class="fileUpload image-upload"></div>
               </div>
               <div class="col-xxl-9 col-md-8 col-sm-7">
                  <div class="row g-20">
                     <div class="col-sm-6">
                        <label for="facultyFirstName" class="h5 mb-8 fw-semibold font-heading">First Name <span class="text-13 text-gray-400 fw-medium">(Required)</span> </label>
                        <div class="position-relative">
                           <input type="text" class=" placeholder-13 form-control py-11 pe-76" id="facultyFirstName" placeholder="Enter Faculty First Name">
                        </div>
                     </div>
                     <div class="col-sm-6">
                        <label for="facultyLastName" class="h5 mb-8 fw-semibold font-heading">Last Name <span class="text-13 text-gray-400 fw-medium">(Required)</span> </label>
                        <div class="position-relative">
                           <input type="text" class="placeholder-13 form-control py-11 pe-76" id="facultyLastName" placeholder="Enter Faculty Last Name">
                        </div>
                     </div>
                     <div class="col-sm-6">
                        <label for="facultyEmail" class="h5 mb-8 fw-semibold font-heading">Email <span class="text-13 text-gray-400 fw-medium">(Required)</span> </label>
                        <div class="position-relative">
                           <input type="text" class="placeholder-13 form-control py-11 pe-76" id="facultyEmail" placeholder="Enter Faculty Email">
                        </div>
                     </div>
                     <div class="col-sm-6">
                        <label for="facultyPhone" class="h5 mb-8 fw-semibold font-heading">Phone <span class="text-13 text-gray-400 fw-medium">(Required)</span> </label>
                        <div class="position-relative">
                           <input type="number" class=" placeholder-13 form-control py-11 pe-76" maxlength="100" id="facultyPhone" placeholder="Enter Faculty Phone">
                        </div>
                     </div>
                     <div class="col-sm-6">
                        <label for="facultyPosition" class="h5 mb-8 fw-semibold font-heading">Position</label>
                        <div class="position-relative">
                           <select id="facultyPosition" class="form-select py-9 placeholder-13 text-15">
                              <option value="" disabled selected>Select Position</option>
                              <option value="Lecturer">Lecturer</option>
                              <option value="Assistant Professor">Assistant Professor</option>
                              <option value="Associate Professor">Associate Professor</option>
                              <option value="Professor">Professor</option>
                              <option value="Head of Department">Head of Department</option>
                           </select>
                        </div>
                     </div>
                     <div class="col-sm-6">
                        <label for="facultyExperience" class="h5 mb-8 fw-semibold font-heading">Experience</label>
                        <div class="position-relative">
                           <select id="facultyExperience" class="form-select py-9 placeholder-13 text-15">
                              <option value="" disabled selected>Select Experience</option>
                              <option value="1-3 Years">1-3 Years</option>
                              <option value="3-5 Years">3-5 Years</option>
                              <option value="5-10 Years">5-10 Years</option>
                              <option value="10+ Years">10+ Years</option>
                           </select>
                        </div>
                     </div>
                     <div class="col-sm-6">
                        <label for="facultySpecialization" class="h5 mb-8 fw-semibold font-heading">Specialization</label>
                        <div class="position-relative">
                           <select id="facultySpecialization" class="form-select py-9 placeholder-13 text-15">
                              <option value="" disabled selected>Select Specialization</option>
                              <option value="Data Structures">Data Structures</option>
                              <option value="Machine Learning">Machine Learning</option>
                              <option value="Economics">Economics</option>
                              <option value="Psychology">Psychology</option>
                              <option value="Marketing">Marketing</option>
                              <option value="Finance">Finance</option>
                           </select>
                        </div>
                     </div>
                                          <div class="col-sm-6">
                        <label for="facultyPassword" class="h5 mb-8 fw-semibold font-heading">Password <span class="text-13 text-gray-400 fw-medium">(Required)</span> </label>
                        <div class="position-relative">
                           <input type="password" class=" placeholder-13 form-control py-11 pe-76" maxlength="100" id="facultyPassword" placeholder="Enter Faculty Phone">
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <!-- Added Toggle Button for Status at the bottom -->
            <div class="mt-30">
               <div class="d-flex align-items-center">
                  <label class="h5 fw-semibold font-heading mb-0 me-16">Status</label>
                  <div class="form-check form-switch">
                     <input class="form-check-input" type="checkbox" role="switch" id="statusToggle" checked>
                     <label class="form-check-label ms-3" for="statusToggle">
                     <span class="active-text fw-medium text-success">Active</span>
                     <span class="inactive-text fw-medium text-danger" style="display: none;">Inactive</span>
                     </label>
                  </div>
               </div>
            </div>
         </form>
      </div>
      <script>
         const toggle = document.getElementById('statusToggle');
         const activeText = document.querySelector('.active-text');
         const inactiveText = document.querySelector('.inactive-text');
         
         function updateText() {
             if (toggle.checked) {
                 activeText.style.display = 'inline';
                 inactiveText.style.display = 'none';
             } else {
                 activeText.style.display = 'none';
                 inactiveText.style.display = 'inline';
             }
         }
         
         toggle.addEventListener('change', updateText);
         updateText(); // Initialize on load
      </script>
   </div>
</div>
<?php include './include/footer.php'; ?>