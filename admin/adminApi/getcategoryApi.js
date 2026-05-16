// ======================================
// CATEGORY MANAGEMENT - FIXED VERSION
// ======================================

// const BASE_URL = "https://edtech.colaborazia.com";
const TOKEN = () => localStorage.getItem("token");

let currentCategoryPage = 1;
const CATEGORY_PER_PAGE = 8;

const category = {
  getCategories: `${BASE_URL}/api/admin/get-categories`,
  addCategory: `${BASE_URL}/api/admin/insert-category`,
  updateCategory: (id) => `${BASE_URL}/api/admin/update-category/${id}`,
  deleteCategory: (id) => `${BASE_URL}/api/admin/del-categories/${id}`,
};

// ====================== INIT ======================
document.addEventListener("DOMContentLoaded", () => {
  const pathname = window.location.pathname || window.location.href;

  loadCategories();

  if (pathname.includes("add-course-category.php")) {
    initAddCategory();
  }
  if (pathname.includes("edit-course-category.php")) {
    initEditCategory();
  }
});

// ====================== LOAD CATEGORIES ======================
function loadCategories() {
  if (!TOKEN()) return console.warn("No token found");

  fetch(category.getCategories, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN()}`,
      "Content-Type": "application/json",
    },
  })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      const categories = data.data || data || [];
      window.categoryListArray = categories;
      renderCategoryTable(categories);
    })
    .catch(err => {
      console.error("Load Categories Error:", err);
      Swal.fire("Error", "Failed to load categories", "error");
    });
}

function renderCategoryTable(categories = window.categoryListArray, page = 1) {
    const tbody = document.getElementById("categoryTableBody");
    if (!tbody) return;

    currentCategoryPage = page;
    const totalItems = categories.length;
    const totalPages = Math.ceil(totalItems / CATEGORY_PER_PAGE);

    if (currentCategoryPage < 1) currentCategoryPage = 1;
    if (currentCategoryPage > totalPages && totalPages > 0) currentCategoryPage = totalPages;

    const startIndex = (currentCategoryPage - 1) * CATEGORY_PER_PAGE;
    const endIndex = Math.min(startIndex + CATEGORY_PER_PAGE, totalItems);

    const pageCategories = categories.slice(startIndex, endIndex);

    tbody.innerHTML = "";

      pageCategories.forEach(cat => {
        const isActive = cat.isActive === true || cat.isActive === true;
        const statusClass = isActive ? "bg-success-50 text-success-600" : "bg-danger-50 text-danger-600";
        const dotClass = isActive ? "bg-success-600" : "bg-danger-600";

        tbody.innerHTML += `
          <tr>
            <td class="fixed-width">
              <div class="form-check"><input class="form-check-input border-gray-200 rounded-4" type="checkbox"></div>
            </td>
            <td>
              <div class="flex-align gap-8">
                <img src="${cat.image ?  cat.image : "assets/images/thumbs/student-img2.png"}" 
                     class="w-40 h-40 rounded-circle" alt="Category">
                <span class="h6 mb-0 fw-medium text-gray-300">${cat.categoryName || "N/A"}</span>
              </div>
            </td>
            <td><span class="h6 mb-0 fw-medium text-gray-300">${cat.description || "No Description"}</span></td>
            <td>
              <span class="text-13 py-2 px-8 ${statusClass} d-inline-flex align-items-center gap-8 rounded-pill">
                <span class="w-6 h-6 ${dotClass} rounded-circle"></span>${isActive ? "Active" : "Inactive"}
              </span>
            </td>
            <td>
              <a href="edit-course-category.php?id=${cat.id}" class="bg-main-50 text-main-600 py-2 px-14 rounded-pill d-inline-flex align-items-center gap-8" title="Edit">
                <i class="fas fa-edit"></i>
              </a>
            </td>
            <td>
              <span class="text-danger fs-18" style="cursor:pointer;" onclick="confirmDeleteCategory(${cat.id})" title="Delete">
                <i class="fas fa-trash-alt"></i>
              </span>
            </td>
          </tr>`;
      });

      renderCategoryPagination(totalItems, startIndex, endIndex, totalPages);
}
window.renderCategoryTable = renderCategoryTable;

function renderCategoryPagination(totalItems, startIndex, endIndex, totalPages) {
    const tableBody = document.getElementById('categoryTableBody');
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
        const activeClass = i === currentCategoryPage ? 'active' : '';
        paginationHTML += `
            <li class="page-item ${activeClass}">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium cursor-pointer" onclick="window.renderCategoryTable(window.categoryListArray, ${i})">${i}</a>
            </li>
        `;
    }
    paginationHTML += `</ul></div>`;
    footer.innerHTML = paginationHTML;
}

// ====================== ADD CATEGORY ======================
function initAddCategory() {
  const publishBtn = document.getElementById("publishCategoryBtn");
  if (!publishBtn) return;

  const visibilityCheck = document.getElementById("visibilityCheck");
  const statusText = document.getElementById("statusText");

  if (visibilityCheck && statusText) {
    statusText.textContent = visibilityCheck.checked ? "Active" : "Inactive";
    visibilityCheck.addEventListener("change", () => {
      statusText.textContent = visibilityCheck.checked ? "Active" : "Inactive";
    });
  }

  publishBtn.addEventListener("click", () => {
    if (!TOKEN()) return Swal.fire("Error", "Please login first", "error");

    const categoryName = document.getElementById("courseTitle")?.value.trim() || "";
    const description = document.getElementById("categoryDescription")?.value.trim() || "";
    const imageFile = document.getElementById("fileUpload-2")?.files[0] || null;
    const isActive = visibilityCheck?.checked ? true : false;   // ← Changed to true/false

    if (!categoryName) return Swal.fire("Error", "Category Name is required", "error");

    const formData = new FormData();
    formData.append("CategoryName", categoryName);
    formData.append("Description", description);
    formData.append("IsActive", isActive);
    if (imageFile) formData.append("categoryImage", imageFile);

    console.log("Add Payload:", { categoryName, description, isActive, hasImage: !!imageFile });

    fetch(category.addCategory, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN()}` },
      body: formData,
    })
      .then(res => {
        console.log("Add Response Status:", res.status);
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then(response => {
        console.log("Add Response Body:", response);
        if (response.success || response.status) {
          Swal.fire("Success", "Category added successfully", "success").then(() => {
            window.location.href = "course-category.php";
          });
        } else {
          Swal.fire("Error", response.message || "Failed to add category", "error");
        }
      })
      .catch(err => {
        console.error("Add Catch Error:", err);
        Swal.fire("Server Error", "Something went wrong on server. Check console.", "error");
      });
  });
}

// ====================== DELETE ======================
async function confirmDeleteCategory(id) {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  });

  if (result.isConfirmed) deleteCategory(id);
}

async function deleteCategory(id) {
  if (!TOKEN()) return Swal.fire("Error", "Token not found", "error");

  Swal.fire({ title: "Deleting...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

  try {
    const response = await fetch(category.deleteCategory(id), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN()}`,
        "Content-Type": "application/json"
      }
    });

    console.log("Delete Status:", response.status);

    const result = await response.json().catch(() => ({}));

    if (response.ok && result.success !== false) {
      Swal.fire({ icon: "success", title: "Deleted!", timer: 1500, showConfirmButton: false });
      loadCategories();
    } else {
      Swal.fire("Error", result.message || `Failed (Status: ${response.status})`, "error");
    }
  } catch (error) {
    console.error("Delete Error:", error);
    Swal.fire("Error", "Network or CORS error. Check console.", "error");
  }
}

// ====================== EDIT CATEGORY ======================
async function getCategoryById(id) {
  try {
    const resp = await fetch(category.getCategories, {
      headers: { Authorization: `Bearer ${TOKEN()}` }
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    const list = data.data || data || [];
    return list.find(c => String(c.id) === String(id)) || null;
  } catch (e) {
    console.error("getCategoryById failed", e);
    return null;
  }
}

function initEditCategory() {
  const publishBtn = document.getElementById("publishCategoryBtn");
  if (!publishBtn) return;

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (!id) return console.warn("No ID in URL");

  // Prefill
  (async () => {
    await new Promise(r => setTimeout(r, 300)); // small delay for DOM

    const category = await getCategoryById(id);
    if (!category) {
      return Swal.fire("Error", "Category not found or failed to load", "error");
    }

    console.log("Loaded category for edit:", category);

    document.getElementById("courseTitle").value = category.categoryName || "";
    document.getElementById("categoryDescription").value = category.description || "";

    const visEl = document.getElementById("visibilityCheck");
    const statusText = document.getElementById("statusText");

    if (visEl) {
      visEl.checked = category.isActive === 1 || category.isActive === true;
      if (statusText) statusText.textContent = visEl.checked ? "Active" : "Inactive";

      visEl.addEventListener("change", () => {
        statusText.textContent = visEl.checked ? "Active" : "Inactive";
      });
    }
  })();

  publishBtn.textContent = "Update Category";

  publishBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!TOKEN()) return Swal.fire("Error", "Please login first", "error");

    const categoryName = document.getElementById("courseTitle")?.value.trim() || "";
    const description = document.getElementById("categoryDescription")?.value.trim() || "";
    const imageFile = document.getElementById("fileUpload-2")?.files[0] || null;
    const isActive = document.getElementById("visibilityCheck")?.checked ? true : false;

    if (!categoryName) return Swal.fire("Error", "Category Name is required", "error");

    const formData = new FormData();
    formData.append("id", id);
    formData.append("CategoryName", categoryName);
    formData.append("Description", description);
    formData.append("IsActive", isActive);
    if (imageFile) formData.append("categoryImage", imageFile);

    try {
      publishBtn.disabled = true;
      publishBtn.textContent = "Updating...";

      const response = await fetch(category.updateCategory(id), {
        method: "POST",
        headers: { Authorization: `Bearer ${TOKEN()}` },
        body: formData
      });

      console.log("Update Status:", response.status);

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success !== false) {
        Swal.fire("Success", "Category updated successfully!", "success").then(() => {
          window.location.href = "course-category.php";
        });
      } else {
        Swal.fire("Error", result.message || `Update failed (Status: ${response.status})`, "error");
      }
    } catch (err) {
      console.error("Update Error:", err);
      Swal.fire("Error", "Something went wrong - check console", "error");
    } finally {
      publishBtn.disabled = false;
      publishBtn.textContent = "Update Category";
    }
  });
}