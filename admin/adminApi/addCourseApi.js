// ====================== API ENDPOINTS ======================
const addCourseApi = "https://edtech.colaborazia.com/api/admin/add-course";
const getCategoriesApi = "https://edtech.colaborazia.com/api/admin/get-categories";
const getLanguagesApi = "https://edtech.colaborazia.com/api/admin/get-all-lang";
const getAllCoursesApi = "https://edtech.colaborazia.com/api/admin/get-all-course";
const getCourseApi = (id) => `https://edtech.colaborazia.com/api/admin/get-course/${id}`;
const updateCourseApi = (id) => `https://edtech.colaborazia.com/api/admin/update-course/${id}`;
const deleteCourseApi = (id) => `https://edtech.colaborazia.com/api/admin/del-course/${id}`;

let currentCoursePage = 1;
const COURSE_PER_PAGE = 8;

// ====================== SHARED HELPERS ======================
function getElValue(id) {
  const el = document.getElementById(id);
  if (!el) return "";
  if (el.tagName === "SELECT") {
    return (el.value || "").trim();
  }
  return (el.value || "").trim();
}

function setElValue(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) {
    el.value = value;
  }
}

function formatDateForInput(dateString) {
  if (!dateString) return "";
  return dateString.split("T")[0]; // Convert to YYYY-MM-DD
}

// ====================== FILE UPLOAD HANDLING ======================
const fileUploadWrapper = document.getElementById("fileUploadWrapper");
const fileUploadInput = document.querySelector("#fileUpload input[type='file']") || document.getElementById("fileUpload") || document.querySelector('input[type="file"]');
const previewContainer = document.getElementById("previewContainer");
const imagePreview = document.getElementById("imagePreview");
const fileNameDisplay = document.getElementById("fileName");
const uploadPrompt = document.getElementById("uploadPrompt");
const removeImageBtn = document.getElementById("removeImage");

function resetUploadUI() {
  if (previewContainer) previewContainer.style.display = "none";
  if (uploadPrompt) uploadPrompt.style.display = "block";
  if (imagePreview) imagePreview.src = "";
  if (fileNameDisplay) fileNameDisplay.textContent = "";
}

if (fileUploadWrapper && fileUploadInput) {
  fileUploadWrapper.addEventListener("click", (e) => {
    if (e.target.id === "removeImage" || e.target.closest("#removeImage")) return;
    fileUploadInput.click();
  });

  fileUploadInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) {
      resetUploadUI();
      return;
    }

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload PNG, JPG, JPEG, or WEBP only.");
      this.value = "";
      resetUploadUI();
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image too large. Maximum 5MB allowed.");
      this.value = "";
      resetUploadUI();
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (imagePreview) imagePreview.src = e.target.result;
      if (fileNameDisplay) fileNameDisplay.textContent = file.name;
      if (previewContainer) previewContainer.style.display = "block";
      if (uploadPrompt) uploadPrompt.style.display = "none";
    };
    reader.readAsDataURL(file);
  });

  if (removeImageBtn) {
    removeImageBtn.addEventListener("click", () => {
      fileUploadInput.value = "";
      resetUploadUI();
    });
  }
}

// ====================== LOAD DROPDOWNS ======================
async function loadDropdowns() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found. User may not be logged in.");
    return;
  }

  // Categories
  const catSelect = document.getElementById("courseCategory");
  if (catSelect) {
    catSelect.innerHTML = '<option value="" disabled selected>Loading categories...</option>';
    try {
      const res = await fetch(getCategoriesApi, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      catSelect.innerHTML = '<option value="" disabled selected>Select Category</option>';
      if (data.data?.length) {
        data.data.forEach(cat => {
          if (cat.isActive === true || cat.isActive === 1) {
            const opt = new Option(cat.categoryName || "Unnamed", cat.id);
            catSelect.appendChild(opt);
          }
        });
      }
    } catch (err) {
      console.error("Category load error:", err);
      catSelect.innerHTML = '<option value="" disabled>Error loading categories</option>';
    }
  }

  // Languages
  const langSelect = document.getElementById("courseLanguage");
  if (langSelect) {
    langSelect.innerHTML = '<option value="" disabled selected>Loading languages...</option>';
    try {
      const res = await fetch(getLanguagesApi, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      langSelect.innerHTML = '<option value="" disabled selected>Select Language</option>';
      if (data.data?.length) {
        data.data.forEach(lang => {
          if (lang.is_active === true || lang.is_active === 1) {
            const opt = new Option(lang.language_name || "Unnamed", lang.id);
            langSelect.appendChild(opt);
          }
        });
      }
    } catch (err) {
      console.error("Language load error:", err);
      langSelect.innerHTML = '<option value="" disabled>Error loading languages</option>';
    }
  }
}

// ====================== ADD COURSE ======================
async function addCourse() {
  const token = localStorage.getItem("token");
  if (!token) {
    Swal.fire("Unauthorized", "Please login again", "error");
    return;
  }

  const formData = new FormData();

  // Append form fields
  formData.append("courseName", getElValue("courseTitle"));
  formData.append("categoryId", getElValue("courseCategory"));
  formData.append("courseLanguage", getElValue("courseLanguage"));
  formData.append("courseLevel", getElValue("courseLevel"));
  formData.append("duration", getElValue("courseTime"));
  formData.append("totalLectures", getElValue("courseLectures"));
  formData.append("startClassDate", getElValue("startclassdate"));
  formData.append("demoStartDate", getElValue("demoStartDate"));
  formData.append("demoEndDate", getElValue("startEnddate"));
  formData.append("mrpPrice", getElValue("mrpPrice"));
  formData.append("salingPrice", getElValue("sellingPrice"));
  formData.append("maximumLpa", getElValue("maxLpa"));
  formData.append("minimumLpa", getElValue("minLpa"));
  formData.append("courseDescription", getElValue("description"));
  formData.append("overview", getElValue("overview"));
  formData.append("courseHighlights", getElValue("courseHighlights"));
  formData.append("courseDetails", getElValue("courseDetails"));
  formData.append("whyChooseUs", getElValue("whyChooseUs"));
  formData.append("progress", document.getElementById("uploadSlider")?.value || "0");

  const isActive = document.getElementById("statusCheckbox")?.checked || false;
  formData.append("IsActive", isActive ? "true" : "false");

  // Image handling
  const fileInput = document.querySelector("#fileUpload input[type='file']") || document.getElementById("fileUpload") || document.querySelector('input[type="file"]');
  const imageFile = fileInput?.files?.[0];

  if (!imageFile) {
    Swal.fire("Required", "Please upload a thumbnail image (required)", "warning");
    return;
  }
  if (!imageFile.type.startsWith("image/") || imageFile.size > 5 * 1024 * 1024) {
    Swal.fire("Invalid File", "Please select a valid image under 5MB", "warning");
    return;
  }

  formData.append("courseImage", imageFile);

  const publishBtn = document.getElementById("publishCourseBtn");
  if (publishBtn) {
    publishBtn.disabled = true;
    publishBtn.textContent = "Publishing...";
  }

  try {
    const response = await fetch(addCourseApi, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    let result;
    try {
      result = await response.json();
    } catch (e) {
      throw new Error("Invalid JSON response from server");
    }

    if (response.ok && (result.success || result.status === true || result.message?.toLowerCase().includes("added"))) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: result.message || "Course added successfully!",
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            window.location.href = "student-courses.php";
          });
        } else {
          Swal.fire("Failed", result.message || "Failed to add course", "error");
        }
  } catch (error) {
    console.error("Add course error:", error);
    Swal.fire("Server Error", "Something went wrong while adding the course.", "error");
  } finally {
    if (publishBtn) {
      publishBtn.disabled = false;
      publishBtn.textContent = "Publish Course";
    }
  }
}

// ====================== LOAD ALL COURSES TABLE ======================
async function loadCoursesTable() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token for loading courses");
    return;
  }

  const tbody = document.getElementById("courseTableBody");
  if (!tbody) return console.error("courseTableBody not found");

  try {
    const res = await fetch(getAllCoursesApi, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const response = await res.json();
    console.log("Courses API Response:", response);

    const courses = Array.isArray(response.data) ? response.data : (Array.isArray(response) ? response : []);
    window.courseListArray = courses;
    renderCourseTable(courses);
  } catch (err) {
    console.error("Load courses error:", err);
    tbody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Failed to load courses</td></tr>`;
  }
}

function renderCourseTable(courses = window.courseListArray, page = 1) {
    const tbody = document.getElementById("courseTableBody");
    if (!tbody) return;

    currentCoursePage = page;
    const totalItems = courses.length;
    const totalPages = Math.ceil(totalItems / COURSE_PER_PAGE);

    if (currentCoursePage < 1) currentCoursePage = 1;
    if (currentCoursePage > totalPages && totalPages > 0) currentCoursePage = totalPages;

    const startIndex = (currentCoursePage - 1) * COURSE_PER_PAGE;
    const endIndex = Math.min(startIndex + COURSE_PER_PAGE, totalItems);

    const pageCourses = courses.slice(startIndex, endIndex);

    let html = "";
    pageCourses.forEach((course, index) => {
      const courseName = course.course_name || "No Name";
      const courseLevel = course.course_level || "All Levels";
      const categoryName = course.category?.category_name || course.category_name || "N/A";
      const courseImage = course.course_image
        ? `${course.course_image}`
        : "assets/images/courses/courses-1.jpg";

      html += `
        <tr>
          <td class="align-middle"><span class="h6 mb-0 fw-medium text-gray-300">${startIndex + index + 1}</span></td>
          <td class="align-middle">
            <div class="d-flex align-items-center gap-8">
              <img src="${courseImage}" class="w-40 h-40 rounded-circle" alt="${courseName}" onerror="this.src='assets/images/courses/courses-1.jpg'">
              <span class="h6 mb-0 fw-medium text-gray-300">${courseName}</span>
            </div>
          </td>
          <td class="align-middle"><span class="h6 mb-0 fw-medium text-gray-300">${categoryName}</span></td>
          <td class="align-middle"><span class="h6 mb-0 fw-medium text-gray-300">${courseLevel}</span></td>
          <td class="align-middle"><i class="bi bi-pencil-square text-success fs-5 cursor-pointer" onclick="editCourse(${course.id})"></i></td>
          <td class="align-middle"><i class="bi bi-trash text-danger fs-5 cursor-pointer" onclick="deleteCourse(${course.id})"></i></td>
        </tr>
      `;
    });

    tbody.innerHTML = html || `<tr><td colspan="6" class="text-center">No courses found</td></tr>`;

    renderCoursePagination(totalItems, startIndex, endIndex, totalPages);
}
window.renderCourseTable = renderCourseTable;

function renderCoursePagination(totalItems, startIndex, endIndex, totalPages) {
    const tableBody = document.getElementById('courseTableBody');
    if (!tableBody) return;
    const card = tableBody.closest('.card');
    if (!card) return;

    let footer = card.querySelector('.card-footer');
    if (!footer) {
        footer = document.createElement('div');
        footer.className = 'card-footer flex-between flex-wrap';
        card.appendChild(footer);
    }

    if (totalItems === 0) {
        footer.innerHTML = `<span class="text-gray-900">Showing 0 to 0 of 0 entries</span><div style="overflow-x: auto; max-width: 100%;"><ul class="pagination flex-align" style="flex-wrap: nowrap; margin-bottom: 0;"></ul></div>`;
        return;
    }

    let paginationHTML = `<span class="text-gray-900">Showing ${startIndex + 1} to ${endIndex} of ${totalItems} entries</span>`;
    paginationHTML += `<div style="overflow-x: auto; max-width: 60%; padding-bottom: 4px;"><ul class="pagination flex-align" style="margin-bottom: 0; gap: 4px; flex-wrap: nowrap;">`;
    
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentCoursePage ? 'active' : '';
        paginationHTML += `
            <li class="page-item ${activeClass}">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium cursor-pointer" onclick="window.renderCourseTable(window.courseListArray, ${i})">${i}</a>
            </li>
        `;
    }
    paginationHTML += `</ul></div>`;
    footer.innerHTML = paginationHTML;
}

// ====================== DELETE COURSE ======================
async function deleteCourse(id) {
  if (!id) return;

  const confirmResult = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!"
  });

  if (!confirmResult.isConfirmed) return;

  const token = localStorage.getItem("token");
  if (!token) return Swal.fire("Unauthorized", "Please login again", "error");

  try {
    const res = await fetch(deleteCourseApi(id), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Delete failed");
    }

    Swal.fire("Deleted!", "Course deleted successfully!", "success");
    loadCoursesTable(); // Refresh table
  } catch (err) {
    console.error("Delete error:", err);
    Swal.fire("Error", err.message || "Failed to delete course", "error");
  }
}

// ====================== EDIT COURSE ======================
function editCourse(id) {
  if (id) window.location.href = `edit-course.php?id=${id}`;
}

async function updateCourse(id) {
  if (!id) return console.error("Course ID missing");

  const token = localStorage.getItem("token");
  if (!token) return Swal.fire("Unauthorized", "Please login again", "error");

  const formData = new FormData();

  const courseTitle = getElValue("courseTitle");
  if (courseTitle) formData.append("courseName", courseTitle);

  formData.append("categoryId", getElValue("courseCategory"));
  formData.append("courseLanguage", getElValue("courseLanguage"));
  formData.append("courseLevel", getElValue("courseLevel"));
  formData.append("duration", getElValue("courseTime"));
  formData.append("totalLectures", getElValue("courseLectures"));
  formData.append("startClassDate", getElValue("startclassdate"));
  formData.append("demoStartDate", getElValue("demoStartDate"));
  formData.append("demoEndDate", getElValue("startEnddate"));
  formData.append("mrpPrice", getElValue("mrpPrice"));
  formData.append("salingPrice", getElValue("sellingPrice"));
  formData.append("maximumLpa", getElValue("maxLpa"));
  formData.append("minimumLpa", getElValue("minLpa"));
  formData.append("courseDescription", getElValue("description"));
  formData.append("overview", getElValue("overview"));
  formData.append("courseHighlights", getElValue("courseHighlights"));
  formData.append("courseDetails", getElValue("courseDetails"));
  formData.append("whyChooseUs", getElValue("whyChooseUs"));
  formData.append("progress", document.getElementById("uploadSlider")?.value || "0");

  formData.append("IsActive", !!document.getElementById("statusCheckbox")?.checked);

  // Optional new image
  const fileInput = document.querySelector("#fileUpload input[type='file']") || document.getElementById("fileUpload") || document.querySelector('input[type="file"]');
  if (fileInput?.files?.length) {
    formData.append("courseImage", fileInput.files[0]);
  }

  try {
    const response = await fetch(updateCourseApi(id), {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { success: false, message: text }; }

    if (response.ok && (data.success || data.message?.toLowerCase().includes("updated"))) {
      Swal.fire("Success", "Course updated successfully!", "success")
        .then(() => window.location.href = "student-courses.php");
    } else {
      Swal.fire("Error", data.message || "Update failed", "error");
    }
  } catch (error) {
    console.error("Update error:", error);
    Swal.fire("Error", error.message || "Something went wrong", "error");
  }
}

// ====================== INIT EDIT PAGE ======================
async function initEditCourse() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await loadDropdowns();

    const res = await fetch(getCourseApi(id), {
      headers: { Authorization: `Bearer ${token}` }
    });
    const json = await res.json();
    const course = json.data || json;

    if (!course) return;

    // Prefill fields
    setElValue("courseTitle", course.course_name);
    setElValue("courseCategory", course.category_id || course.category?.id);
    setElValue("courseLanguage", course.course_language);
    setElValue("courseLevel", course.course_level);
    setElValue("courseTime", course.duration);
    setElValue("courseLectures", course.total_lectures);
    setElValue("startclassdate", formatDateForInput(course.start_class_date));
    setElValue("demoStartDate", formatDateForInput(course.demo_start_date));
    setElValue("startEnddate", formatDateForInput(course.demo_end_date));
    setElValue("mrpPrice", course.mrp_price);
    setElValue("sellingPrice", course.saling_price);
    setElValue("maxLpa", course.maximum_lpa);
    setElValue("minLpa", course.minimum_lpa);
    setElValue("description", course.course_description);
    setElValue("overview", course.overview);
    setElValue("courseHighlights", course.course_highlights);
    setElValue("courseDetails", course.course_details);
    setElValue("whyChooseUs", course.why_choose_us);

    // Progress slider
    const slider = document.getElementById("uploadSlider");
    if (slider && course.progress !== undefined) slider.value = course.progress;

    // Status
    const statusCheckbox = document.getElementById("statusCheckbox");
    if (statusCheckbox) {
      statusCheckbox.checked = course.is_active == 1;
    }

    // Image preview (existing)
    if (course.course_image && imagePreview && previewContainer && uploadPrompt) {
      imagePreview.src = `${course.course_image}`;
      previewContainer.style.display = "block";
      uploadPrompt.style.display = "none";
    }

    // Button setup
    const btn = document.getElementById("editpublishCourseBtn");
    if (btn) {
      btn.textContent = "Update Course";
      btn.onclick = (e) => {
        e.preventDefault();
        updateCourse(id);
      };
    }
  } catch (error) {
    console.error("Init edit course error:", error);
  }
}

// ====================== PAGE INITIALIZATION ======================
document.addEventListener("DOMContentLoaded", () => {
  loadDropdowns();
  loadCoursesTable();
  initEditCourse();

  // Add Course Button
  const publishBtn = document.getElementById("publishCourseBtn");
  if (publishBtn) {
    publishBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addCourse();
    });
  }
});