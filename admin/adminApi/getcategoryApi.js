// ======================================
// CATEGORY MANAGEMENT - FIXED VERSION
// ======================================
// const BASE_URL = "https://edtech.colaborazia.com";
const TOKEN = () => localStorage.getItem("token");

let currentCategoryPage = 1;
const CATEGORY_PER_PAGE = 8;

const categoryAPI = {  // ✅ FIX 1: Rename to avoid conflict with local variable in initEditCategory
  getCategories: `${BASE_URL}/api/admin/get-categories`,
  addCategory: `${BASE_URL}/api/admin/insert-category`,
  updateCategory: (id) => `${BASE_URL}/api/admin/update-category/${id}`,
  deleteCategory: (id) => `${BASE_URL}/api/admin/del-categories/${id}`,
};

// ====================== INIT ======================
document.addEventListener("DOMContentLoaded", () => {
  // ✅ FIX 2: href use karo pathname ki jagah — PHP files ke saath reliable hai
  const pathname = window.location.href;

  loadCategories();

  if (pathname.includes("add-course-category")) {
    initAddCategory();
  }
  if (pathname.includes("edit-course-category")) {
    initEditCategory();
  }

  initCategoryImagePreview();
});

// ====================== LOAD CATEGORIES ======================
function loadCategories() {
  if (!TOKEN()) return console.warn("No token found");

  fetch(categoryAPI.getCategories, {
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
    // ✅ FIX 3: isActive === 1 bhi check karo (API number return karta hai)
    const isActive = cat.isActive === true || cat.isActive === 1;
    const statusClass = isActive ? "bg-success-50 text-success-600" : "bg-danger-50 text-danger-600";
    const dotClass = isActive ? "bg-success-600" : "bg-danger-600";

    tbody.innerHTML += `
      <tr>
        <td class="fixed-width">
          <div class="form-check"><input class="form-check-input border-gray-200 rounded-4" type="checkbox"></div>
        </td>
        <td>
          <div class="flex-align gap-8">
            <img src="${cat.image ? cat.image : "assets/images/thumbs/student-img2.png"}" 
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
      </li>`;
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

  publishBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!TOKEN()) return Swal.fire("Error", "Please login first", "error");

    const categoryName = document.getElementById("courseTitle")?.value.trim() || "";
    const description = document.getElementById("categoryDescription")?.value.trim() || "";
    const imageFile = document.getElementById("fileUpload-2")?.files[0] || null;
    const isActive = visibilityCheck?.checked ? 1 : 0;

    if (!categoryName) return Swal.fire("Error", "Category Name is required", "error");

    const formData = new FormData();
    formData.append("CategoryName", categoryName);
    formData.append("Description", description);
    formData.append("IsActive", isActive);
    if (imageFile) formData.append("categoryImage", imageFile);

    try {
      publishBtn.disabled = true;
      publishBtn.innerText = "Publishing...";

      const res = await fetch(categoryAPI.addCategory, {  // ✅ categoryAPI use karo
        method: "POST",
        headers: { Authorization: `Bearer ${TOKEN()}` },
        body: formData,
      });

      const response = await res.json();

      if (res.ok && (response.success || response.status)) {
        const fileInput = document.getElementById("fileUpload-2");
        if (fileInput) fileInput.value = "";
        const previewWrapper = document.getElementById("previewWrapper");
        if (previewWrapper) previewWrapper.style.display = "none";

        Swal.fire("Success", "Category added successfully", "success").then(() => {
          window.location.href = "course-category.php";
        });
      } else {
        Swal.fire("Error", response.message || "Failed to add category", "error");
      }
    } catch (err) {
      console.error("Add Catch Error:", err);
      Swal.fire("Server Error", "Something went wrong on server. Check console.", "error");
    } finally {
      publishBtn.disabled = false;
      publishBtn.innerText = "Publish";
    }
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
    const response = await fetch(categoryAPI.deleteCategory(id), {  // ✅ categoryAPI use karo
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN()}`,
        "Content-Type": "application/json"
      }
    });

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
    const resp = await fetch(categoryAPI.getCategories, {  // ✅ categoryAPI use karo
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
    await new Promise(r => setTimeout(r, 300));

    // ✅ FIX 1 (MAIN BUG): 'category' naam ki variable outer scope ke 'categoryAPI' object ko override kar rahi thi
    // isliye category.updateCategory(id) call fail ho raha tha
    const categoryData = await getCategoryById(id);  // ✅ 'category' ki jagah 'categoryData' use karo
    if (!categoryData) {
      return Swal.fire("Error", "Category not found or failed to load", "error");
    }

    console.log("Loaded category for edit:", categoryData);

    document.getElementById("courseTitle").value = categoryData.categoryName || "";
    document.getElementById("categoryDescription").value = categoryData.description || "";

    const visEl = document.getElementById("visibilityCheck");
    const statusText = document.getElementById("statusText");

    if (visEl) {
      // ✅ FIX 3: isActive === 1 bhi handle karo
      visEl.checked = categoryData.isActive === 1 || categoryData.isActive === true;
      if (statusText) statusText.textContent = visEl.checked ? "Active" : "Inactive";

      visEl.addEventListener("change", () => {
        statusText.textContent = visEl.checked ? "Active" : "Inactive";
      });
    }

    // ========== SHOW EXISTING IMAGE ==========
    let imageUrl = '';
    if (categoryData.image) {
        imageUrl = categoryData.image.startsWith('http') ? categoryData.image : `https://edtech.colaborazia.com/${categoryData.image.replace(/^\/+/, '')}`;
    }

    if (imageUrl) {
        let previewWrapper = document.getElementById('previewWrapper');
        const fileInput = document.getElementById('fileUpload-2');
        const fileUploadDiv = fileInput ? fileInput.closest('.fileUpload') : document.getElementById('fileUpload');

        if (!previewWrapper && fileUploadDiv) {
            fileUploadDiv.insertAdjacentHTML('beforeend', `
                <div id="previewWrapper" class="image-upload__boxInner" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; background: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <img id="previewImg" src="${imageUrl}" class="image-upload__image" style="max-width: 85%; max-height: 85%; object-fit: contain; border-radius: 8px;">
                    <button type="button" id="removePreviewBtn" class="image-upload__deleteBtn" style="position: absolute; top: 5px; right: 5px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; padding: 0;"><i class="ph ph-x"></i></button>
                </div>
            `);
            
            document.getElementById('removePreviewBtn').addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                document.getElementById('previewWrapper').style.display = 'none';
                if (fileInput) fileInput.value = '';
            });
        } else if (previewWrapper) {
            const previewImg = document.getElementById('previewImg');
            if (previewImg) previewImg.src = imageUrl;
            previewWrapper.style.display = 'flex';
        }
    } else {
        let previewWrapper = document.getElementById('previewWrapper');
        if (previewWrapper) previewWrapper.style.display = 'none';
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

      const response = await fetch(categoryAPI.updateCategory(id), {  // ✅ categoryAPI use karo — yahi asli bug tha
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

// ====================== IMAGE PREVIEW HELPER ======================
function initCategoryImagePreview() {
    const fileInput = document.getElementById("fileUpload-2");
    if (!fileInput) return;

    fileInput.addEventListener("change", function (event) {
        const chosenFile = event.target.files[0];
        let previewWrapper = document.getElementById('previewWrapper');
        const fileUploadDiv = fileInput.closest('.fileUpload') || document.getElementById('fileUpload');

        if (chosenFile) {
            if (!previewWrapper && fileUploadDiv) {
                fileUploadDiv.insertAdjacentHTML('beforeend', `
                    <div id="previewWrapper" class="image-upload__boxInner" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; background: #fff; border-radius: 8px; display: none; align-items: center; justify-content: center;">
                        <img id="previewImg" class="image-upload__image" style="max-width: 85%; max-height: 85%; object-fit: contain; border-radius: 8px;">
                        <button type="button" id="removePreviewBtn" class="image-upload__deleteBtn" style="position: absolute; top: 5px; right: 5px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; padding: 0;"><i class="ph ph-x"></i></button>
                    </div>
                `);
                previewWrapper = document.getElementById('previewWrapper');
                
                document.getElementById('removePreviewBtn').addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (previewWrapper) previewWrapper.style.display = 'none';
                    if (fileInput) fileInput.value = '';
                });
            }
            
            const previewImage = document.getElementById('previewImg');
            if (previewImage) {
                const fileReader = new FileReader();
                fileReader.onload = function(loadEvent) {
                    previewImage.src = loadEvent.target.result;
                    if (previewWrapper) previewWrapper.style.display = 'flex';
                };
                fileReader.readAsDataURL(chosenFile);
            }
        } else if (!chosenFile && previewWrapper) {
            previewWrapper.style.display = 'none';
        }
    });
}