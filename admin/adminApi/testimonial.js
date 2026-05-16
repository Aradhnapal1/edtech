const getAllTestimonialsApi = "https://edtech.colaborazia.com/api/admin/get-all-testimonial";
const deleteTestimonialApi  = "https://edtech.colaborazia.com/api/admin/del-testimonial";

let allTestimonials = [];

let currentTestimonialPage = 1;
const TESTIMONIAL_PER_PAGE = 8;

document.addEventListener("DOMContentLoaded", function () {
    console.log("Testimonials page loaded");
    fetchTestimonials();
});

// ================== FETCH ==================
async function fetchTestimonials() {
    // Prevent duplicate calls if already running
    if (document.body.dataset.testimonialsLoading === "true") {
        console.log("Fetch already in progress – skipping duplicate call");
        return;
    }
    document.body.dataset.testimonialsLoading = "true";

    console.log("Fetching testimonials...");

    const token = localStorage.getItem("token");
    if (!token) {
        console.warn("Token not found");
        Swal.fire("Unauthorized", "Please log in first", "warning");
        document.body.dataset.testimonialsLoading = "false";
        return;
    }

    try {
        const response = await fetch(getAllTestimonialsApi, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Testimonials data:", result);

        allTestimonials = Array.isArray(result) ? result : result.data || result.testimonials || [];

        renderTestimonials(allTestimonials);
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        Swal.fire("Error", "Failed to load testimonials: " + error.message, "error");
    } finally {
        document.body.dataset.testimonialsLoading = "false";
    }
}

// ================== RENDER (with anti-flicker improvements) ==================
function renderTestimonials(testimonials = allTestimonials, page = 1) {
    const tbody = document.getElementById("testimonialTableBody");
    if (!tbody) {
        console.error("ERROR: #testimonialTableBody not found in DOM");
        return;
    }

    currentTestimonialPage = page;
    const totalItems = testimonials ? testimonials.length : 0;
    const totalPages = Math.ceil(totalItems / TESTIMONIAL_PER_PAGE);
    if (currentTestimonialPage < 1) currentTestimonialPage = 1;
    if (currentTestimonialPage > totalPages && totalPages > 0) currentTestimonialPage = totalPages;
    const startIndex = (currentTestimonialPage - 1) * TESTIMONIAL_PER_PAGE;
    const endIndex = Math.min(startIndex + TESTIMONIAL_PER_PAGE, totalItems);
    const pageTestimonials = testimonials ? testimonials.slice(startIndex, endIndex) : [];

    if (!testimonials || testimonials.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4">No testimonials found</td></tr>`;
        return;
    }

    tbody.innerHTML = ""; // clear once

    const fragment = document.createDocumentFragment();

    pageTestimonials.forEach((t, index) => {
        // XSS-safe escaping
        const escape = (str) => String(str || "").replace(/[&<>"']/g, m => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[m]));

        const name     = escape(t.test_name || "Unnamed");
        const desc     = escape(t.discription || t.description || "—");
        const content  = escape(t.test_content || t.content || "").substring(0, 100) + (t.test_content?.length > 100 ? "..." : "");
        const status   = t.is_active ? "Active" : "Inactive";
        const statusClass = t.is_active ? "bg-success" : "bg-secondary";

        // Safe image logic – same as blogs/live classes
        const imgSrc = (typeof t.image === 'string' && t.image.trim())
            ?  t.image.trim()
            : 'assets/images/default-testimonial.jpg';

        // Format date
        let dateDisplay = "—";
        if (t.updated_at) {
            try {
                const d = new Date(t.updated_at);
                if (!isNaN(d)) {
                    dateDisplay = d.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    });
                }
            } catch {}
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="align-middle ">
                <span class="h6 mb-0 fw-medium text-gray-300">${startIndex + index + 1}</span>
            </td>

            <td class="align-middle">
                <div class="d-flex align-items-center gap-8">
                    <img src="${imgSrc}"
                         class="w-40 h-40 rounded-circle"
                         alt="${name}"
                         loading="lazy"
                         onerror="this.src='assets/images/default-testimonial.jpg'; this.onerror=null;"
                         onload="this.classList.add('loaded')">
                    <span class="h6 mb-0 fw-medium text-gray-300">${name}</span>
                </div>
            </td>

            <td class="text-gray-300">${desc}</td>
            <td class="text-gray-300">${content}</td>

            <td class="">
                <span class="badge ${statusClass} px-3 py-2 fw-medium">${status}</span>
            </td>

            <td class="text-gray-300 ">${dateDisplay}</td>

            <td class="">
                <i class="bi bi-pencil-square text-success fs-5 cursor-pointer me-2"
                   onclick="redirectEdit(${t.id})"
                   title="Edit Testimonial"></i>
            </td>

            <td class="">
                <i class="bi bi-trash text-danger fs-5 cursor-pointer"
                   onclick="deleteTestimonial(${t.id})"
                   title="Delete Testimonial"></i>
            </td>
        `;

        fragment.appendChild(row);
    });

    tbody.appendChild(fragment);
    renderTestimonialPagination(totalItems, startIndex, endIndex, totalPages);
}
window.renderTestimonials = renderTestimonials;

function renderTestimonialPagination(totalItems, startIndex, endIndex, totalPages) {
    const tableBody = document.getElementById('testimonialTableBody');
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
        const activeClass = i === currentTestimonialPage ? 'active' : '';
        paginationHTML += `
            <li class="page-item ${activeClass}">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium cursor-pointer" onclick="window.renderTestimonials(allTestimonials, ${i})">${i}</a>
            </li>
        `;
    }
    paginationHTML += `</ul></div>`;
    footer.innerHTML = paginationHTML;
}

// ================== DELETE ==================
async function deleteTestimonial(id) {
    const swalResult = await Swal.fire({
        title: "Confirm Delete",
        text: "This testimonial will be permanently removed. This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel"
    });

    if (!swalResult.isConfirmed) return;

    const token = localStorage.getItem("token");
    if (!token) {
        Swal.fire("Error", "Authentication token missing", "error");
        return;
    }

    try {
        const response = await fetch(`${deleteTestimonialApi}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Deleted",
                text: "Testimonial removed successfully",
                timer: 1800,
                showConfirmButton: false
            });
            fetchTestimonials(); // Refresh table
        } else {
            Swal.fire("Failed", data.message || "Could not delete testimonial", "error");
        }
    } catch (err) {
        console.error("Delete failed:", err);
        Swal.fire("Error", "Server error occurred", "error");
    }
}

// ================== EDIT REDIRECT ==================
function redirectEdit(id) {

    window.location.href = `edit-testimonial.php?id=${id}`;
   
}
// const editTestimonialApi = "https://edtech.colaborazia.com/api/admin/edit-testimonial";



const editTestimonialApi = "https://edtech.colaborazia.com/api/admin/update-testimonial"; 
// const getAllTestimonialsApi = "https://edtech.colaborazia.com/api/admin/get-all-testimonial"; // for fetching all to find by ID
// const DOMAIN = "https://edtech.colaborazia.com";

// Helper: prefill edit page, show existing image, and bind update
function initEditTestimonial() {
    const editBtn = document.getElementById('edittestimonial');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) return; // not on edit page

    (async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const res = await fetch(getAllTestimonialsApi, { 
                method: 'GET', 
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}` 
                } 
            });
            if (!res.ok) return;

            const json = await res.json();
            const list = json && (json.data || json.testimonials || json.result || []);
            const testimonial = (Array.isArray(list) && list.find(t => String(t.id) === String(id))) || null;

            if (!testimonial) { 
                console.warn('Testimonial not found for id', id); 
                return; 
            }

            // Prefill text fields
            document.getElementById('testimonialname').value = testimonial.test_name || '';
            document.getElementById('description').value     = testimonial.discription || '';
            document.getElementById('content').value         = testimonial.test_content || '';

            // Prefill status toggle
            const statusToggle = document.getElementById('statusToggle');
            if (statusToggle) {
                statusToggle.checked = testimonial.is_active === 1 || 
                                       testimonial.is_active === true || 
                                       testimonial.is_active === "1";
            }

            // Show existing image (same as blog)
            const imagePreview = document.getElementById('imagePreview');
            const previewImg   = document.getElementById('previewImg');
            const fileUploadLabel = document.querySelector('#fileUpload label');

            if (testimonial.image && previewImg) {
                const fullImageUrl =  testimonial.image;
                
                previewImg.src = fullImageUrl;
                previewImg.style.display = 'block';

                if (imagePreview) {
                    imagePreview.style.display = 'block';
                }

                if (fileUploadLabel) {
                    fileUploadLabel.innerText = "Change Image";
                }
            } else {
                if (previewImg) previewImg.style.display = 'none';
                if (imagePreview) imagePreview.style.display = 'none';
            }

            // Change button text
            if (editBtn) editBtn.innerText = 'Update Testimonial';

        } catch (err) {
            console.error('initEditTestimonial error', err);
        }
    })();

    if (editBtn) {
        editBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            updateTestimonial(id); 
        });
    }
}

// Update function (same structure as your blog update)
async function updateTestimonial(id) {
    const token = localStorage.getItem("token");
    if (!token) { 
        Swal.fire('Unauthorized', 'Please login again', 'error'); 
        return; 
    }

    const testimonialName   = document.getElementById("testimonialname")?.value.trim();
    const description       = document.getElementById("description")?.value.trim();
    const content           = document.getElementById("content")?.value.trim();
    const isActive          = document.getElementById("statusToggle")?.checked;

    const fileInput = document.querySelector("#fileUpload input[type='file']");
    const testimonialImage = fileInput?.files[0];

    // Enhanced validation (similar to add)
    if (!testimonialName) {
        Swal.fire("Required", "Testimonial Name required", "warning");
        return;
    }
    if (testimonialImage) { // Optional for updates
        if (!testimonialImage.type.startsWith('image/')) {
            Swal.fire("Invalid File", "Please select an image file (JPG, PNG, etc.)", "warning");
            return;
        }
        if (testimonialImage.size > 5 * 1024 * 1024) {
            Swal.fire("Too Large", "Image must be under 5MB", "warning");
            return;
        }
    }

    // Debug logs
    console.log('Updating Testimonial:', { id, testimonialName, hasNewImage: !!testimonialImage });

    const formData = new FormData();
    formData.append("test_name", testimonialName);
    formData.append("discription", description || '');
    formData.append("test_content", content || '');
    formData.append("is_active", isActive ? "true" : "false");
    if (testimonialImage) formData.append("image", testimonialImage);

    const updateUrl = `${editTestimonialApi}/${id}`;

    try {
        const response = await fetch(updateUrl, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        const result = await response.json();
        console.log("Update Testimonial Response:", result);

        if (response.ok && result.success) {
            Swal.fire({ 
                icon: "success", 
                title: "Testimonial Updated Successfully", 
                showConfirmButton: false, 
                timer: 1500 
            });
            
            // Redirect to list after success
            setTimeout(() => { 
                window.location.href = "all-testimonial.php"; 
            }, 1500);
        } else {
            Swal.fire("Error", result.message || "Update failed. Check image if changed.", "error");
        }
    } catch (error) {
        console.error("Update Testimonial Error:", error);
        Swal.fire("Server Error", "Something went wrong", "error");
    }
}

// New: Live preview when user selects a new image (same as blog)
function initImagePreviewOnChange() {
    const fileInput = document.querySelector('#fileUpload input[type="file"]');
    if (!fileInput) return;

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const previewImg = document.getElementById('previewImg');
        const imagePreview = document.getElementById('imagePreview');

        if (file && previewImg) {
            const reader = new FileReader();
            reader.onload = function(event) {
                previewImg.src = event.target.result;
                previewImg.style.display = 'block';
                if (imagePreview) imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else if (!file && previewImg) {
            previewImg.style.display = 'none';
            if (imagePreview) imagePreview.style.display = 'none';
        }
    });
}

// Call init on page load
document.addEventListener("DOMContentLoaded", function () {
    initEditTestimonial();
    initImagePreviewOnChange();
});





// 8**************************************************************************add testimonial function*************************************************************************
// *
// Correct API endpoints


const addTestimonialApi = "https://edtech.colaborazia.com/api/admin/add-testimonial";

document.addEventListener("DOMContentLoaded", function () {
    const addBtn = document.getElementById("addtestimonial");
    if (addBtn) {
        addBtn.addEventListener("click", addTestimonial);
    }

    // Image preview
    const fileInput = document.getElementById("fileUpload-2");
    if (fileInput) {
        fileInput.addEventListener("change", previewImage);
    }
});

async function addTestimonial() {
    const token = localStorage.getItem("token");
    if (!token) {
        Swal.fire("Error", "Please login first", "error");
        return;
    }

    const btn = document.getElementById("addtestimonial");
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = "Publishing...";

    // Get form values
    const name     = document.getElementById("testimonialname")?.value.trim();
    const desc     = document.getElementById("description")?.value.trim();
    const content  = document.getElementById("content")?.value.trim();
    const date     = document.getElementById("date")?.value;
    const statusToggle = document.getElementById("statusToggle");
    const isActive = statusToggle ? statusToggle.checked : false;

    const fileInput = document.getElementById("fileUpload-2");
    const imageFile = fileInput?.files?.[0];

    // Validation
    if (!name) {
        Swal.fire("Required", "Testimonial Name is required", "warning");
        restore();
        return;
    }
    if (!content) {
        Swal.fire("Required", "Content is required", "warning");
        restore();
        return;
    }
    if (!imageFile) {
        Swal.fire("Required", "Thumbnail image is required", "warning");
        restore();
        return;
    }
    if (!imageFile.type.startsWith("image/")) {
        Swal.fire("Invalid", "Please select a valid image file", "warning");
        restore();
        return;
    }
    if (imageFile.size > 5 * 1024 * 1024) {
        Swal.fire("Too Large", "Image must be under 5MB", "warning");
        restore();
        return;
    }

    const formData = new FormData();
    formData.append("test_name",     name);
    formData.append("discription",   desc || "");
    formData.append("test_content",  content);
    formData.append("is_active",     isActive ? "true" : "false");  // Recommended format for most backends

    if (date) formData.append("date", date);

    formData.append("image", imageFile);

    // Debug logs
    console.log("Sending to:", addTestimonialApi);
    for (let [key, value] of formData.entries()) {
        console.log(key, value instanceof File ? `${value.name} (${value.size} bytes)` : value);
    }

    try {
        const response = await fetch(addTestimonialApi, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        let result;
        try {
            result = await response.json();
        } catch {
            throw new Error("Invalid response from server");
        }

        console.log("Server response:", result);

        if (response.ok && (result.success || result.message?.toLowerCase().includes("success"))) {
            // Success alert
            await Swal.fire({
                icon: "success",
                title: "Success",
                text: "Testimonial published successfully",
                timer: 2000,
                showConfirmButton: false
            });

            // RESET FORM
            document.getElementById("testimonialname").value = "";
            document.getElementById("description").value = "";
            document.getElementById("content").value = "";
            document.getElementById("date").value = "";
            if (statusToggle) statusToggle.checked = true;
            fileInput.value = "";

            const preview = document.getElementById("previewImg");
            if (preview) preview.style.display = "none";

            // REDIRECT to all-testimonial.php after success
            window.location.href = "all-testimonial.php";

        } else {
            Swal.fire("Error", result.message || "Failed to add testimonial", "error");
        }
    } catch (err) {
        console.error("Add failed:", err);
        Swal.fire("Error", "Network or server error – check console", "error");
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }

    function restore() {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

function previewImage(e) {
    const file = e.target.files[0];
    const preview = document.getElementById("previewImg");

    if (file && preview) {
        const reader = new FileReader();
        reader.onload = function (ev) {
            preview.src = ev.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
}


// 8**************************************************************************add testimonial function end*************************************************************************