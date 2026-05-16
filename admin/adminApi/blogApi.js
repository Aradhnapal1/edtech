const blogApi = "https://edtech.colaborazia.com/api/admin/get-all-blogs";
const addBlogApi = "https://edtech.colaborazia.com/api/admin/add-blogs";
const DOMAIN = "https://edtech.colaborazia.com";
const editBlogApi = "https://edtech.colaborazia.com/api/admin/update-blog";
const deleteBlogApi = "https://edtech.colaborazia.com/api/admin/del-blog";

let currentBlogPage = 1;
const BLOG_PER_PAGE = 8;

// Initialize page-specific behavior
document.addEventListener("DOMContentLoaded", () => {
    fetchBlogs();
    initAddBlog();
    initEditBlog();
    initImagePreviewOnChange(); // New: live preview when selecting new image
});

//-------------------------- Get All BLOGS Start -------------------------//

async function fetchBlogs() {
    const token = localStorage.getItem("token");
    if (!token) {
        console.warn('blogApi: token not found in localStorage');
        return;
    }

    try {
        const response = await fetch(blogApi, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error('blogApi: network response not ok', response.status);
            return;
        }

        const result = await response.json();
        console.log("Blog API Response:", result);

        const data = result && (result.data || result.result || result.blogs || []);
        if (Array.isArray(data) && data.length) {
            window.blogListArray = data;
            renderBlogTable(data);
        } else {
            const tbody = document.getElementById("blogTableBody");
            if (tbody) tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No blogs found</td></tr>`;
        }
    } catch (error) {
        console.error("blogApi: API Error:", error);
    }
}

function renderBlogTable(blogs = window.blogListArray, page = 1) {
    const tbody = document.getElementById("blogTableBody");
    if (!tbody) return;
    currentBlogPage = page;
    const totalItems = blogs.length;
    const totalPages = Math.ceil(totalItems / BLOG_PER_PAGE);
    if (currentBlogPage < 1) currentBlogPage = 1;
    if (currentBlogPage > totalPages && totalPages > 0) currentBlogPage = totalPages;
    const startIndex = (currentBlogPage - 1) * BLOG_PER_PAGE;
    const endIndex = Math.min(startIndex + BLOG_PER_PAGE, totalItems);
    const pageBlogs = blogs.slice(startIndex, endIndex);

    tbody.innerHTML = "";

    pageBlogs.forEach((blog, index) => {
        tbody.innerHTML += `
<tr>
    <!-- S.No -->
    <td class="align-middle">
        <span class="h6 mb-0 fw-medium text-gray-300">
            ${startIndex + index + 1}
        </span>
    </td>

    <!-- Blog -->
    <td class="align-middle">
        <div class="d-flex align-items-center gap-8">
            <img 
                src="${blog.image ?  blog.image : 'assets/images/thumbs/blogTable-img1.png'}"
                class="w-40 h-40 rounded-circle"
                alt="blog-image"
            >
            <span class="h6 mb-0 fw-medium text-gray-300">
                ${blog.name}
            </span>
        </div>
    </td>

    <!-- Status -->
    <td class="align-middle">
        ${
            (blog.isActive || blog.is_active || blog.status === 1)
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

    <!-- Edit -->
    <td class="align-middle">
        <i 
            class="bi bi-pencil-square text-success fs-5 cursor-pointer"
            onclick="editBlog(${blog.id})"
        ></i>
    </td>

    <!-- Delete -->
    <td class="align-middle">
        <i 
            class="bi bi-trash text-danger fs-5 cursor-pointer"
            onclick="confirmDeleteBlog(${blog.id})"
        ></i>
    </td>
</tr>
`;
    });
    renderBlogPagination(totalItems, startIndex, endIndex, totalPages);
}
window.renderBlogTable = renderBlogTable;

function renderBlogPagination(totalItems, startIndex, endIndex, totalPages) {
    const tableBody = document.getElementById('blogTableBody');
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
        const activeClass = i === currentBlogPage ? 'active' : '';
        paginationHTML += `
            <li class="page-item ${activeClass}">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium cursor-pointer" onclick="window.renderBlogTable(window.blogListArray, ${i})">${i}</a>
            </li>
        `;
    }
    paginationHTML += `</ul></div>`;
    footer.innerHTML = paginationHTML;
}    

// -------------------------- Get All BLOGS End -------------------------//

async function addBlog() {
    const token = localStorage.getItem("token");
    if (!token) {
        Swal.fire("Unauthorized", "Please login again", "error");
        return;
    }

    const blogName = document.getElementById("courseTitle").value.trim();
    const blogDescription = document.getElementById("overview").value.trim();
    const isActive = document.getElementById("statusToggle").checked;

    const fileInput = document.querySelector("#fileUpload input[type='file']");
    const blogImage = fileInput?.files[0];

    // Enhanced validation
    if (!blogName) {
        Swal.fire("Required", "Blog Name required", "warning");
        return;
    }
    if (!blogImage) {
        Swal.fire("Required", "Blog Image required", "warning");
        return;
    }
    if (!blogImage.type.startsWith('image/')) {
        Swal.fire("Invalid File", "Please select an image file (JPG, PNG, etc.)", "warning");
        return;
    }
    if (blogImage.size > 5 * 1024 * 1024) { // 5MB limit
        Swal.fire("Too Large", "Image must be under 5MB", "warning");
        return;
    }

    // Debug logs (remove in production if needed)
    console.log('Uploading Blog:', { blogName, hasImage: !!blogImage, imageName: blogImage?.name, size: blogImage?.size });

    const formData = new FormData();
    formData.append("blogName", blogName);
    formData.append("blogDescription", blogDescription || '');
    formData.append("blogImage", blogImage);
    formData.append("is_active", isActive ? "true" : "false"); // String for server consistency

    // Log FormData entries for debugging
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    try {
        const response = await fetch(addBlogApi, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        let result;
        try {
            result = await response.json();
        } catch {
            throw new Error("Invalid server response");
        }

        console.log("Add Blog Response:", result);

        if (response.ok && result.success) {
            Swal.fire({
                icon: "success",
                title: "Blog Added Successfully",
                showConfirmButton: false,
                timer: 1500
            })
            .then(() => {
                // Navigate to list after alert closes
                window.location.href = 'blog.php';
            });

            // Refresh table without full redirect (add redirect if needed)
            fetchBlogs();

            // Reset form
            document.getElementById("courseTitle").value = "";
            document.getElementById("overview").value = "";
            document.getElementById("statusToggle").checked = false;
            fileInput.value = ""; // Clear file input
            const previewImg = document.getElementById("previewImg");
            const imagePreview = document.getElementById("imagePreview");
            if (previewImg) previewImg.style.display = "none";
            if (imagePreview) imagePreview.style.display = "none";

            // Optional: Full page reload after delay
            // setTimeout(() => { window.location.href = "blog.php"; }, 1500);

        } else {
            Swal.fire("Error", result.message || "Blog add failed. Check image upload.", "error");
        }

    } catch (error) {
        console.error("Add Blog Error:", error);
        Swal.fire("Server Error", "Something went wrong. Please try again.", "error");
    }
}

function initAddBlog() {
    const addBlogBtn = document.getElementById("addblog");
    if (!addBlogBtn) return;
    addBlogBtn.addEventListener("click", addBlog);
}

// -------------------------- Delete BLOG Start -------------------------//
async function confirmDeleteBlog(id) {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete this blog? This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel'
    });

    if (result.isConfirmed) {
        deleteBlog(id);
    }
}

async function deleteBlog(id) {
    const token = localStorage.getItem('token');
    if (!token) { Swal.fire('Error', 'Token not found. Please login again.', 'error'); return; }
    try {
        const response = await fetch(`${deleteBlogApi}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        if (response.ok && result.success !== false) {
            Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Blog deleted successfully.', timer: 1500, showConfirmButton: false });
            fetchBlogs();
        } else {
            Swal.fire({ icon: 'error', title: 'Failed', text: result.message || 'Failed to delete blog' });
        }
    } catch (err) {
        console.error('Delete Blog Error:', err);
        Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
    }
}

// -------------------------- Edit BLOG Start -------------------------//

function editBlog(id) {
    window.location.href = `edit-blog.php?id=${id}`;
}

async function updateBlog(id) {
    const token = localStorage.getItem("token");
    if (!token) { Swal.fire('Unauthorized', 'Please login again', 'error'); return; }

    const blogName = document.getElementById("courseTitle")?.value.trim();
    const blogDescription = document.getElementById("overview")?.value.trim();
    const isActive = document.getElementById("statusToggle")?.checked;

    const fileInput = document.querySelector("#fileUpload input[type='file']");
    const blogImage = fileInput?.files[0];

    // Enhanced validation (similar to add)
    if (!blogName) {
        Swal.fire("Required", "Blog Name required", "warning");
        return;
    }
    if (blogImage) { // Optional for updates
        if (!blogImage.type.startsWith('image/')) {
            Swal.fire("Invalid File", "Please select an image file (JPG, PNG, etc.)", "warning");
            return;
        }
        if (blogImage.size > 5 * 1024 * 1024) {
            Swal.fire("Too Large", "Image must be under 5MB", "warning");
            return;
        }
    }

    // Debug logs
    console.log('Updating Blog:', { id, blogName, hasNewImage: !!blogImage });

    const formData = new FormData();
    formData.append("blogName", blogName);
    formData.append("blogDescription", blogDescription || '');
    formData.append("is_active", isActive ? "true" : "false");
    if (blogImage) formData.append("blogImage", blogImage);

    const updateUrl = `${editBlogApi}/${id}`;

    try {
        const response = await fetch(updateUrl, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        const result = await response.json();
        console.log("Update Blog Response:", result);

        if (response.ok && result.success) {
            Swal.fire({ icon: "success", title: "Blog Updated Successfully", showConfirmButton: false, timer: 1500 })
            .then(() => {window.location.href = "blog.php";});
            fetchBlogs(); // Refresh if on list page, or redirect
            // setTimeout(() => { window.location.href = "blog.php"; }, 1500);
        } else {
            Swal.fire("Error", result.message || "Update failed. Check image if changed.", "error");
        }
    } catch (error) {
        console.error("Update Blog Error:", error);
        Swal.fire("Server Error", "Something went wrong", "error");
    }
}

// Helper: prefill edit page, show existing image, and bind update
function initEditBlog() {
    const editBtn = document.getElementById('editblog');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) return; // not on edit page

    (async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const res = await fetch(blogApi, { 
                method: 'GET', 
                headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${token}` } 
            });
            if (!res.ok) return;

            const json = await res.json();
            const list = json && (json.data || json.result || json.blogs || []);
            const blog = (Array.isArray(list) && list.find(b => String(b.id) === String(id))) || null;

            if (!blog) { 
                console.warn('Blog not found for id', id); 
                return; 
            }

            // Prefill text fields
            document.getElementById('courseTitle').value = blog.name || blog.title || '';
            document.getElementById('overview').value = blog.description || blog.overview || '';

            // Prefill status toggle
            const statusToggle = document.getElementById('statusToggle');
            if (statusToggle) {
                statusToggle.checked = blog.isActive === 1 || blog.is_active === 1 || blog.isActive === true || blog.is_active === true;
            }

            // ========== SHOW EXISTING IMAGE ==========
            const imagePreview = document.getElementById('imagePreview');
            const previewImg = document.getElementById('previewImg');
            const fileUploadLabel = document.querySelector('#fileUpload label');

            if (blog.image && previewImg) {
                const fullImageUrl =  blog.image;
                
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
            // ========================================

            // Change button text
            if (editBtn) editBtn.innerText = 'Update Blog';

        } catch (err) {
            console.error('initEditBlog error', err);
        }
    })();

    if (editBtn) {
        editBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            updateBlog(id); 
        });
    }
}

// New: Live preview when user selects a new image (works on both add & edit pages)
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
            // If no file selected (cleared), hide preview or revert to existing (for edit)
            // For simplicity, hide; enhance if needed to show original on clear
            previewImg.style.display = 'none';
            if (imagePreview) imagePreview.style.display = 'none';
        }
    });
}
// -------------------------- Edit BLOG End -------------------------//