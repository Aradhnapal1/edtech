let currentBatchPage = 1;
const BATCH_PER_PAGE = 8;

document.addEventListener("DOMContentLoaded", () => {
    
    const token = (window.auth && typeof window.auth.get === "function")
            ? window.auth.get()
            : localStorage.getItem("token");
    const DOMAIN = "https://edtech.colaborazia.com";       
    const tableBody = document.getElementById("batchTableBody");

    // Call init functions for edit page
    initEditBatch();
    initBatchImagePreview();

    fetch("https://edtech.colaborazia.com/api/admin/get-batch", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => {

        if (!res.success) {
            tableBody.innerHTML = `<tr><td colspan="8">No Data Found</td></tr>`;
            return;
        }

        window.batchListArray = res.data;
        renderBatchTable(res.data);
    })
    .catch(err => console.error("API Error:", err));
});

function renderBatchTable(batches = window.batchListArray, page = 1) {
    const tableBody = document.getElementById("batchTableBody");
    if (!tableBody) return;
    currentBatchPage = page;
    const totalItems = batches.length;
    const totalPages = Math.ceil(totalItems / BATCH_PER_PAGE);
    if (currentBatchPage < 1) currentBatchPage = 1;
    if (currentBatchPage > totalPages && totalPages > 0) currentBatchPage = totalPages;
    const startIndex = (currentBatchPage - 1) * BATCH_PER_PAGE;
    const endIndex = Math.min(startIndex + BATCH_PER_PAGE, totalItems);
    const pageBatches = batches.slice(startIndex, endIndex);

    const rows = pageBatches.map((item, index) => {

            const startDate = new Date(item.start_date).toLocaleDateString();
            const endDate = new Date(item.end_date).toLocaleDateString();

            return `
                <tr id="row-${item.id}">
                    <td>
                        <span class="h6 mb-0 fw-medium text-gray-300">${startIndex + index + 1}</span>

                    </td>
                    <td>
                        <div class="flex-align gap-8">
                            <img src="${item.batch_image ? `${item.batch_image}` : 'https://via.placeholder.com/40'}" class="w-40 h-40 rounded-circle" alt="${item.course_name}">
                            <span class="h6 mb-0 fw-medium text-gray-300">${item.course_name}</span>
                        </div>
                    </td>
                    
                    <td>
                        <span class="h6 mb-0 fw-medium text-gray-300">${item.batch_name}</span>
                    </td>
                    <td>
                        <span class="h6 mb-0 fw-medium text-gray-300">${startDate}</span>
                    </td>
                    <td>
                        <span class="h6 mb-0 fw-medium text-gray-300">${endDate}</span>
                    </td>
                    <td>
                        <span class="h6 mb-0 fw-medium text-gray-300">${item.start_time}</span>
                    </td>
                    <td>
                        <span class="h6 mb-0 fw-medium text-gray-300">${item.end_time}</span>
                    </td>
                    <td>
                        <span class="h6 mb-0 fw-medium text-gray-300">${item.max_students}</span>
                    </td>
                    <td class="align-middle">
                        ${
                            item.is_active
                            ? `
                            <span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                <span class="w-6 h-6 bg-success-600 rounded-circle"></span>
                                Active
                            </span>
                            `
                            : `
                            <span class="text-13 py-2 px-8 bg-danger-50 text-danger-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                <span class="w-6 h-6 bg-danger-600 rounded-circle"></span>
                                Inactive
                            </span>
                            `
                        }
                    </td>
                    <td>
                        <i class="bi bi-pencil-square text-success fs-5 cursor-pointer"
                           style="cursor:pointer"
                           onclick="editBatch(${item.id})"></i>

                        
                    </td>
                    <td>
                    <i class="bi bi-trash text-danger fs-5"
                           style="cursor:pointer"
                           onclick="deleteBatch(${item.id})"></i>
                    </td>
                </tr>
            `;
        }).join("");

        tableBody.innerHTML = rows;
        renderBatchPagination(totalItems, startIndex, endIndex, totalPages);
}
window.renderBatchTable = renderBatchTable;

function renderBatchPagination(totalItems, startIndex, endIndex, totalPages) {
    const tableBody = document.getElementById('batchTableBody');
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
        const activeClass = i === currentBatchPage ? 'active' : '';
        paginationHTML += `
            <li class="page-item ${activeClass}">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium cursor-pointer" onclick="window.renderBatchTable(window.batchListArray, ${i})">${i}</a>
            </li>
        `;
    }
    paginationHTML += `</ul></div>`;
    footer.innerHTML = paginationHTML;
}

// *******************************************************Edit api start*******************************************************
// Edit
/*************************************************
 * DATE FORMAT HELPER
 * YYYY-MM-DD → DD-MM-YYYY
 *************************************************/
function toDDMMYYYY(dateStr) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
}

/*************************************************
 * REDIRECT TO EDIT PAGE
 *************************************************/
function editBatch(id) {
    window.location.href = `edit-batch.php?id=${id}`;
}

/*************************************************
 * UPDATE BATCH
 *************************************************/
async function updateBatch(id) {
    const token = localStorage.getItem("token");
    if (!token) {
        Swal.fire("Unauthorized", "Please login again", "error");
        return;
    }

    const DOMAIN = "https://edtech.colaborazia.com";

    const courseId = document.getElementById("editCourseName")?.value;
    const batchTitle = document.getElementById("batchTitle")?.value.trim();
    const batchStudent = document.getElementById("batchStudent")?.value;
    const startDate = document.getElementById("BatchStartDate")?.value;
    const endDate = document.getElementById("BatchEndDate")?.value;
    const startTime = document.getElementById("BatchStartTime")?.value;
    const endTime = document.getElementById("BatchEndTime")?.value;
    const isActive = document.getElementById("statusToggle")?.checked;

    const fileInput = document.getElementById("fileUpload-2");
    const batchImage = fileInput?.files[0];

    /* ========= VALIDATION ========= */
    if (!batchTitle) {
        Swal.fire("Required", "Batch title is required", "warning");
        return;
    }

    if (batchImage) {
        if (!batchImage.type.startsWith("image/")) {
            Swal.fire("Invalid File", "Please select an image file", "warning");
            return;
        }
        if (batchImage.size > 5 * 1024 * 1024) {
            Swal.fire("Too Large", "Image must be under 5MB", "warning");
            return;
        }
    }

    /* ========= FORM DATA ========= */
    const formData = new FormData();
    formData.append("course_id", courseId);
    formData.append("batch_name", batchTitle);

    // 🔥 SEND DATE AS DD-MM-YYYY
    formData.append("start_date", toDDMMYYYY(startDate));
    formData.append("end_date", toDDMMYYYY(endDate));

    formData.append("start_time", startTime);
    formData.append("end_time", endTime);
    formData.append("max_students", batchStudent);
    formData.append("is_active", isActive ? "true" : "false");

    if (batchImage) {
        formData.append("batch_image", batchImage);
    }

    // Laravel PUT support

    try {
        const response = await fetch(`${DOMAIN}/api/admin/update-batch/${id}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        const result = await response.json();

        if (response.ok && result.success) {
            Swal.fire({
                icon: "success",
                title: "Batch Updated Successfully",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = "all-batch.php";
            });
        } else {
            Swal.fire("Error", result.message || "Batch update failed", "error");
        }

    } catch (error) {
        console.error("Update Batch Error:", error);
        Swal.fire("Server Error", "Something went wrong", "error");
    }
}

/*************************************************
 * INIT EDIT BATCH (PREFILL DATA)
 *************************************************/
function initEditBatch() {
    const editBtn = document.getElementById("updateBatch");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    const DOMAIN = "https://edtech.colaborazia.com";
    const token = localStorage.getItem("token");
    if (!token) return;

    // API → input[type=date] needs YYYY-MM-DD
    const formatDateForInput = (dateStr) =>
        dateStr ? dateStr.split(" ")[0].split("-").reverse().reverse().join("-") : "";

    (async () => {
        try {
            const res = await fetch(`${DOMAIN}/api/admin/get-batch`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const json = await res.json();
            const batch = json.data.find(b => String(b.id) === String(id));
            if (!batch) return;

            document.getElementById("batchTitle").value = batch.batch_name || "";
            document.getElementById("batchStudent").value = batch.max_students || "";
            document.getElementById("BatchStartDate").value = formatDateForInput(batch.start_date);
            document.getElementById("BatchEndDate").value = formatDateForInput(batch.end_date);
            document.getElementById("BatchStartTime").value = batch.start_time || "";
            document.getElementById("BatchEndTime").value = batch.end_time || "";

            document.getElementById("statusToggle").checked = batch.is_active == 1;

            /* LOAD COURSES */
            const courseRes = await fetch(`${DOMAIN}/api/admin/get-all-course`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const courseJson = await courseRes.json();

            const courseSelect = document.getElementById("editCourseName");
            courseSelect.innerHTML = "";

            courseJson.data
                .filter(c => c.is_active == 1)
                .forEach(c => {
                    courseSelect.innerHTML += `
                        <option value="${c.id}" ${c.id == batch.course_id ? "selected" : ""}>
                            ${c.course_name}
                        </option>
                    `;
                });

            /* IMAGE PREVIEW */
            const previewImg = document.getElementById("previewImg");
            const imagePreview = document.getElementById("imagePreview");

            if (batch.batch_image && previewImg) {
                previewImg.src =  batch.batch_image;
                previewImg.style.display = "block";
                if (imagePreview) imagePreview.style.display = "block";
            }

            if (editBtn) editBtn.innerText = "Update Batch";

        } catch (err) {
            console.error("initEditBatch error:", err);
        }
    })();

    if (editBtn) {
        editBtn.addEventListener("click", (e) => {
            e.preventDefault();
            updateBatch(id);
        });
    }
}

/*************************************************
 * IMAGE PREVIEW ON CHANGE
 *************************************************/
function initBatchImagePreview() {
    const fileInput = document.getElementById("fileUpload-2");
    if (!fileInput) return;

    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        const previewImg = document.getElementById("previewImg");
        const imagePreview = document.getElementById("imagePreview");

        if (file && previewImg) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                previewImg.style.display = "block";
                if (imagePreview) imagePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });
}

/*************************************************
 * INIT ON PAGE LOAD
 *************************************************/
document.addEventListener("DOMContentLoaded", () => {
    initEditBatch();
    initBatchImagePreview();
});



// *******************************************************Edit api end*******************************************************
// *********************************************************Delete api start*******************************************************
// Delete
function deleteBatch(id) {
    const token = localStorage.getItem("token");
    if (!token) {
        Swal.fire("Unauthorized", "Please login again", "error");
        return;
    }

    Swal.fire({
        title: 'Are you sure?',
        text: "This batch will be permanently deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {

            fetch(`https://edtech.colaborazia.com/api/admin/delete-batches/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            })
            .then(res => res.json())
            .then(res => {
                if (res.success || res.status === true || res.message?.toLowerCase().includes("delete")) {
                    Swal.fire(
                        'Deleted!',
                        'The batch has been deleted.',
                        'success'
                    );

                    // Remove row from table instantly
                    const rowEl = document.getElementById(`row-${id}`);
                    if (rowEl) rowEl.remove();
                    else window.location.reload();
                } else {
                    Swal.fire(
                        'Failed!',
                        res.message || 'Unable to delete batch.',
                        'error'
                    );
                }
            })
            .catch(err => {
                console.error("Delete Error:", err);
                Swal.fire("Error", "Server error. Could not delete batch.", "error");
            });
        }
    });
}
// *********************************************************Delete api end*******************************************************

// ************************************************** add batch api start************************************************************
document.addEventListener("DOMContentLoaded", function () {

 const token = localStorage.getItem("token");
const courseSelect = document.getElementById("courseName");
const publishBtn = document.getElementById("publishBatch");

if (!token) {
  Swal.fire("Unauthorized", "Please login again", "error");
  return;
}

/* ==========================
   DATE FORMATTER
========================== */
function formatDateToDDMMYYYY(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}

/* ==========================
   FETCH ACTIVE COURSES
========================== */
fetch("https://edtech.colaborazia.com/api/admin/get-all-course", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Accept": "application/json"
  }
})
.then(res => {
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }
  return res.json();
})
.then(response => {
  console.log("API Response:", response);

  if (!response || !Array.isArray(response.data)) {
    Swal.fire("Error", "Invalid response from server", "error");
    return;
  }

  const activeCourses = response.data.filter(
    course => course.is_active === true || course.is_active === 1
  );

  if (activeCourses.length === 0) {
    Swal.fire("Info", "No active courses available", "info");
    return;
  }

  // Clear old optionsff (important)
  courseSelect.innerHTML = `<option value="">Select Course</option>`;
  
  activeCourses.forEach(course => {
    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = course.course_name;
    courseSelect.appendChild(option);
  });
})


/* ==========================
   ADD BATCH
========================== */
publishBtn.addEventListener("click", function () {

    const courseId = courseSelect.value;
    const batchName = document.getElementById("batchTitle").value.trim();
    const maxStudents = document.getElementById("batchStudent").value;
    const startDate = formatDateToDDMMYYYY(document.getElementById("BatchStartDate").value);
    const endDate = formatDateToDDMMYYYY(document.getElementById("BatchEndDate").value);
    const startTime = document.getElementById("BatchStartTime").value;
    const endTime = document.getElementById("BatchEndTime").value;
    const imageInput = document.getElementById("fileUpload-2");

    // Basic validation
    if (!courseId || !batchName || !startDate || !endDate) {
        Swal.fire("Required", "Please fill all required fields", "warning");
        return;
    }

    const formData = new FormData();
    formData.append("course_id", courseId);
    formData.append("batch_name", batchName);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);
    formData.append("max_students", maxStudents);

    if (imageInput.files.length > 0) {
        formData.append("batch_image", imageInput.files[0]);
    }

    // Loader
    Swal.fire({
        title: "Publishing Batch...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    fetch("https://edtech.colaborazia.com/api/admin/new-batch", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        },
        body: formData
    })
    .then(res => res.json())
    .then(response => {
        Swal.close();

        if (response.success) {
            Swal.fire("Success", "Batch created successfully!", "success")
            .then(() => window.location.href = "all-batch.php");
            
        } else {
            Swal.fire("Failed", response.message || "Something went wrong", "error");
        }
    })
    .catch(error => {
        Swal.close();
        console.error(error);
        Swal.fire("Server Error", "Unable to create batch", "error");
    });

});

});
// **************************************************add batch api end***************************************************************