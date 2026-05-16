const studentApi = "https://edtech.colaborazia.com/user-get";
const addStudentApi = "https://edtech.colaborazia.com/add-user";
const editStudentApi = "https://edtech.colaborazia.com/user-update";
const deleteStudentApi = "https://edtech.colaborazia.com/user-delete";

// Global student list
let studentList = [];
let currentStudentPage = 1;
const STUDENTS_PER_PAGE = 8;


// -------------------------- On Page Load --------------------------
document.addEventListener("DOMContentLoaded", () => {
    // If table exists, we are on the main students list page
    const tableBody = document.getElementById('studentTableBody');
    if (tableBody) {
        fetchStudents();
    }

    // If update button exists, we are on edit-student.php page
    const updateBtn = document.getElementById("updateStudentBtn");
    if (updateBtn) {
        initEditStudentPage();
    }
    // Event delegation for Edit and Delete buttons
    if (tableBody) {
        tableBody.addEventListener('click', function(e) {
            // Find the closest span with data attributes
            const editBtn = e.target.closest('[data-action="edit"]');
            const deleteBtn = e.target.closest('[data-action="delete"]');

            if (editBtn) {
                const studentId = editBtn.getAttribute('data-id');
                editStudent(studentId);
            }

            if (deleteBtn) {
                const email = deleteBtn.getAttribute('data-email');
                deleteStudent(email);
            }
        });
    }
});

// -------------------------- Fetch Students --------------------------
async function fetchStudents() {
    try {
        const headers = { 'Accept': 'application/json' };
        const token = getToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(studentApi, {
            method: 'GET',
            headers
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();

        let users = [];
        if (Array.isArray(data.users)) users = data.users;
        else if (Array.isArray(data.data)) users = data.data;
        else if (Array.isArray(data)) users = data;

        studentList = users;
        window.studentList = users; // Expose to window for inline onclick handler
        renderStudentTable(users);

    } catch (error) {
        console.error("Fetch error:", error);
    }
}

// -------------------------- Render Table --------------------------
function renderStudentTable(users = window.studentList, page = 1) {
    const tableBody = document.getElementById('studentTableBody');
    if (!tableBody) {
        console.warn('studentTableBody element not found');
        return;
    }

    currentStudentPage = page;
    const totalItems = users.length;
    const totalPages = Math.ceil(totalItems / STUDENTS_PER_PAGE);

    if (currentStudentPage < 1) currentStudentPage = 1;
    if (currentStudentPage > totalPages && totalPages > 0) currentStudentPage = totalPages;

    const startIndex = (currentStudentPage - 1) * STUDENTS_PER_PAGE;
    const endIndex = Math.min(startIndex + STUDENTS_PER_PAGE, totalItems);

    const pageUsers = users.slice(startIndex, endIndex);

    tableBody.innerHTML = '';

    if (!Array.isArray(users) || users.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-muted">
                    No students found.
                </td>
            </tr>`;
        return;
    }

    // Safe escaping
    const esc = (str) =>
        String(str || '').replace(/[&<>"]/g, s =>
            ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[s])
        );

    const rows = pageUsers.map((user, index) => {
        const id = user.id || user._id || '';
        const fullName = esc(`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A');
        const email = esc(user.email || 'N/A');
        const rawEmail = user.email || '';
        const phone = esc(user.phoneNumber || user.phone || 'N/A');

        const isActive = !!user.isActive || user.status === 'active';
        const statusClass = isActive ? 'bg-success-50 text-success-600' : 'bg-warning-50 text-warning-600';
        const dotClass = isActive ? 'bg-success-600' : 'bg-warning-600';
        const statusText = isActive ? 'Active' : 'In Progress';

        // ================= IMAGE LOGIC START =================
        // const baseImageUrl = "https://api.workarya.com/uploads/profile/";
        let profileImage = "assets/images/default-user.png";

        if (user.profileImage && user.profileImage.trim() !== "") {
            if (user.profileImage.startsWith("http")) {
                profileImage = user.profileImage; // full URL from API
            } else if (user.profileImage.includes("uploads")) {
                profileImage = "https://edtech.colaborazia.com/" + user.profileImage; // partial path
            } else {
                profileImage = baseImageUrl + user.profileImage; // only file name
            }
        }
        // ================= IMAGE LOGIC END =================

        return `
            <tr>
                <td><span class="h6 mb-0 fw-medium text-gray-300">${startIndex + index + 1}</span></td>

                <td>
                    <div class="d-flex align-items-center gap-8">
                        <img src="${profileImage}" class="w-40 h-40 rounded-circle" alt="">
                        <span class="h6 mb-0 fw-medium text-gray-300">${fullName}</span>
                    </div>
                </td>

                <td><span class="h6 mb-0 fw-medium text-gray-300">${email}</span></td>
                <td><span class="h6 mb-0 fw-medium text-gray-300">${phone}</span></td>

                <td>
                    <span class="text-13 py-2 px-8 ${statusClass} d-inline-flex align-items-center gap-8 rounded-pill">
                        <span class="w-6 h-6 ${dotClass} rounded-circle"></span>
                        ${statusText}
                    </span>
                </td>

                <td>
                    <span class="text-success fs-18 cursor-pointer" title="Edit" data-action="edit" data-id="${esc(id)}">
                        <i class="bi bi-pencil-square"></i>
                    </span>
                </td>

                <td>
                    <span class="text-danger fs-18 cursor-pointer" title="Delete" data-action="delete" data-email="${esc(rawEmail)}">
                        <i class="bi bi-trash"></i>
                    </span>
                </td>
            </tr>
        `;
    }).join('');

    tableBody.innerHTML = rows;
    renderStudentPagination(totalItems, startIndex, endIndex, totalPages);
}
window.renderStudentTable = renderStudentTable;

function renderStudentPagination(totalItems, startIndex, endIndex, totalPages) {
    const tableBody = document.getElementById('studentTableBody');
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
        const activeClass = i === currentStudentPage ? 'active' : '';
        paginationHTML += `
            <li class="page-item ${activeClass}">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium cursor-pointer" onclick="window.renderStudentTable(window.studentList, ${i})">${i}</a>
            </li>
        `;
    }
    paginationHTML += `</ul></div>`;
    footer.innerHTML = paginationHTML;
}

// -------------------------- Edit Student - Redirect to Edit Page --------------------------
function editStudent(studentId) {
    if (!studentId) {
        console.error("No student ID provided for edit");
        return;
    }
    // Redirect to edit-student.php with id in query param
    window.location.href = `edit-student.php?id=${encodeURIComponent(studentId)}`;
}

// -------------------------- Delete Student - Shows Alert with Email --------------------------
// -------------------------- Delete Student - SweetAlert Confirmation --------------------------
async function deleteStudent(email) {
    if (!email || email.trim() === '') {
        Swal.fire("Error", "No email provided for deletion", "error");
        return;
    }

    const result = await Swal.fire({
        title: 'Are you sure?',
        html: `Do you want to delete user with email:<br><strong>${email}</strong>?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    try {
        const token = getToken();
        const headers = { 'Authorization': `Bearer ${token}` };

        const formData = new FormData();
        formData.append('email', email);

        const response = await fetch(deleteStudentApi, {
            method: 'POST',
            headers,
            body: formData
        });

        let resData = {};
        try { resData = await response.json(); } catch (e) {}

        if (!response.ok) {
            throw new Error(resData.message || 'Delete failed');
        }

        // ✅ Success SweetAlert
        await Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: resData.message || 'Student deleted successfully',
            timer: 1500,
            showConfirmButton: false
        });

        // ✅ Refresh student list AFTER success alert
        fetchStudents();

    } catch (error) {
        console.error('Delete error:', error);
        Swal.fire("Error", "Failed to delete student. Please try again.", "error");
    }
}


// -------------------------- Add Student Api Start --------------------------
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("addStudentForm");
  const publishBtn = document.getElementById("publishStudentBtn");

  if (!form) return; // Prevent script crash if form doesn't exist on this page

  // =========================================
  // PUBLISH BUTTON (OUTSIDE FORM)
  // =========================================
  if (publishBtn) {
    publishBtn.addEventListener("click", function () {

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    });
  }

  // =========================================
  // FORM SUBMIT
  // =========================================
  form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const token = getToken();

    if (!token) {
      Swal.fire("Unauthorized", "You must be logged in", "error");
      return;
    }

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("LastName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const phone = document.getElementById("studentPhone").value.trim();
    const password = document.getElementById("studentPassword").value.trim();
    const status = document.getElementById("statusToggle").checked ? 1 : 0;
    const imageFile = document.getElementById("fileUpload-2").files[0];

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", "USER");
    formData.append("isActive", status);

    if (imageFile) {
      formData.append("profile_image", imageFile);
    }

    // =========================================
    // SWEET ALERT LOADER
    // =========================================
    Swal.fire({
      title: "Adding Student...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {

      const response = await fetch(addStudentApi, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        },
        body: formData
      });

      const data = await response.json().catch(() => ({}));

      console.log("API Response:", data);

      // =========================================
      // SUCCESS CHECK FIX
      // =========================================
      if (response.ok && data.success) {

        Swal.fire({
          icon: "success",
          title: data.message || "Student added successfully!",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {

          // redirect after success
          window.location.href = "all-students.php";

        });

        form.reset();

      } else {

        Swal.fire({
          icon: "error",
          title: "Failed",
          text: data.message || "Student add failed"
        });

      }

    } catch (error) {

      console.error("Add Student Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!"
      });

    }

  });

});
// -------------------------- Add Student Api End --------------------------



// ---------------------------Edit Api start -----------------------------------
// Initialize edit-student.php page: fetch student by ID and fill form, bind update button
async function initEditStudentPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get("id");

    if (!studentId) {
        console.warn("No student ID found in URL for edit-student.php");
        return;
    }

    try {
        const token = getToken();
        if (!token) {
            Swal.fire("Unauthorized", "You must be logged in to edit a student", "error");
            return;
        }

        // Fetch all students and find the one we need
        const headers = { "Accept": "application/json", "Authorization": `Bearer ${token}` };
        const response = await fetch(studentApi, { method: "GET", headers });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        let users = [];
        if (Array.isArray(data.users)) users = data.users;
        else if (Array.isArray(data.data)) users = data.data;
        else if (Array.isArray(data)) users = data;

        const student = users.find(
            (u) => String(u.id || u._id) === String(studentId)
        );

        if (!student) {
            // Swal.fire("Not Found", "Student not found for the provided ID", "error");
            console.warn(`Student with ID ${studentId} not found in fetched data`);
            return;
        }

        // Fill form fields
        const maybe = (id) => document.getElementById(id);
        if (maybe("firstName")) maybe("firstName").value = student.firstName || "";
        if (maybe("LastName")) maybe("LastName").value = student.lastName || "";
        if (maybe("studentEmail")) maybe("studentEmail").value = student.email || "";
        if (maybe("studentPhone")) maybe("studentPhone").value = student.phoneNumber || student.phone || "";

        const statusToggle = maybe("statusToggle");
        if (statusToggle) {
            statusToggle.checked = !!student.isActive || student.status === 'active';
        }

        // Preview existing image
        const previewImg = maybe("previewImg");
        const imagePreview = maybe("imagePreview");
        if (previewImg && student.profileImage && student.profileImage.trim() !== "") {
            let profileImageUrl = "assets/images/default-user.png";
            if (student.profileImage.startsWith("http")) {
                profileImageUrl = student.profileImage;
            } else if (student.profileImage.includes("uploads")) {
                profileImageUrl = "https://edtech.colaborazia.com/" + student.profileImage;
            }
            previewImg.src = profileImageUrl;
            previewImg.style.display = "block";
            if (imagePreview) imagePreview.style.display = "block";
        }

        // Store current student ID in a hidden field for update
        let hiddenId = document.getElementById("editStudentId");
        if (!hiddenId) {
            hiddenId = document.createElement("input");
            hiddenId.type = "hidden";
            hiddenId.id = "editStudentId";
            document.body.appendChild(hiddenId);
        }
        hiddenId.value = studentId;

        // Bind update button
        const updateBtn = document.getElementById("updateStudentBtn");
        if (updateBtn) {
            updateBtn.addEventListener("click", updateStudent);
        }
    } catch (error) {
        console.error("Error initializing edit student page:", error);
        Swal.fire("Error", "Failed to load student details", "error");
    }
}

// --------------------------- Update Student (Edit) -----------------------------------
async function updateStudent() {

    const token = getToken();

    if (!token) {
        Swal.fire("Unauthorized", "Login required", "error");
        return;
    }

    const hiddenIdEl = document.getElementById("editStudentId");
    const studentId = hiddenIdEl ? hiddenIdEl.value : "";

    const firstName = document.getElementById("firstName")?.value.trim() || "";
    const lastName = document.getElementById("LastName")?.value.trim() || "";
    const email = document.getElementById("studentEmail")?.value.trim() || "";
    const phone = document.getElementById("studentPhone")?.value.trim() || "";
    const statusToggle = document.getElementById("statusToggle");
    const imageFile = document.getElementById("fileUpload-2")?.files[0];

    if (!firstName || !email || !phone) {
        Swal.fire(
            "Validation Error",
            "First Name, Email and Phone are required",
            "error"
        );
        return;
    }

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("role", "USER");
    
    if (statusToggle) {
        formData.append("isActive", statusToggle.checked ? 1 : 0);
    }

    if (imageFile) {
        formData.append("profile_image", imageFile);
    }

    const updateBtn = document.getElementById("updateStudentBtn");
    updateBtn.disabled = true;

    Swal.fire({
        title: "Updating Student...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    try {

        const apiUrl = `${editStudentApi}/${studentId}`;

        console.log("Update API:", apiUrl);

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        const result = await response.json().catch(() => ({}));

        console.log("Status:", response.status);
        console.log("Result:", result);

        if (response.ok) {

            await Swal.fire({
                icon: "success",
                title: result.message || "Student Updated Successfully",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "all-students.php"; // Redirect to list page after update
            });

        } else {

            Swal.fire(
                "Update Failed",
                result.message || `Error ${response.status}`,
                "error"
            );
        }

    } catch (error) {

        console.error("Update Error:", error);

        Swal.fire(
            "Server Error",
            "Something went wrong",
            "error"
        );

    } finally {

        updateBtn.disabled = false;
    }
}





// --------------------------- Page Load ---------------------------
document.addEventListener(
    "DOMContentLoaded",
    initEditStudentPage
);
