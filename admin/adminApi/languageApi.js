// ======================================
// LANGUAGE MANAGEMENT - FIXED CODE (Edit + Delete Fixed)
// ======================================

const BASE_URL = "https://edtech.colaborazia.com";

const API = {
  getAllLanguages: `${BASE_URL}/api/admin/get-all-lang`,
  addLanguage: `${BASE_URL}/api/admin/add-lang`,
  updateLanguage: (id) => `${BASE_URL}/api/admin/update-lang/${id}`,
  deleteLanguage: (id) => `${BASE_URL}/api/admin/del-lang/${id}`,
};

// Global token check
const getToken = () => localStorage.getItem("token");

console.log('Language Module Loaded. Token exists:', !!getToken());

let currentLanguagePage = 1;
const LANGUAGE_PER_PAGE = 8;

// ====================== INIT ======================
document.addEventListener("DOMContentLoaded", () => {
  getLanguageList();
  initAddLanguage();
  initEditLanguage();        // Will only run on edit page
});

// ====================== GET ALL LANGUAGES ======================
async function getLanguageList() {
  const token = getToken();
  if (!token) {
    console.warn("No token found");
    return;
  }

  try {
    const response = await fetch(API.getAllLanguages, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        console.warn("Unauthorized - Token may be expired");
        // localStorage.removeItem('token');
        return;
      }
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    console.log("Get All Languages Response:", result);

    if (result.success && Array.isArray(result.data)) {
      window.languageListArray = result.data;
      renderLanguageTable(result.data);
    } else {
      console.error("Invalid response format", result);
    }
  } catch (error) {
    console.error("Get Languages Error:", error);
  }
}

function renderLanguageTable(languages = window.languageListArray, page = 1) {
  const tbody = document.getElementById("languageTableBody");
  if (!tbody) return;

  currentLanguagePage = page;
  const totalItems = languages.length;
  const totalPages = Math.ceil(totalItems / LANGUAGE_PER_PAGE);
  if (currentLanguagePage < 1) currentLanguagePage = 1;
  if (currentLanguagePage > totalPages && totalPages > 0) currentLanguagePage = totalPages;
  const startIndex = (currentLanguagePage - 1) * LANGUAGE_PER_PAGE;
  const endIndex = Math.min(startIndex + LANGUAGE_PER_PAGE, totalItems);
  const pageLanguages = languages.slice(startIndex, endIndex);

  tbody.innerHTML = "";

  if (languages.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No Language Found</td></tr>`;
    return;
  }

  const esc = (str) => String(str || '').replace(/[&<>"]/g, (s) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));

  pageLanguages.forEach((lang) => {
    const statusHTML = lang.is_active
      ? `<span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
           <span class="w-6 h-6 bg-success-600 rounded-circle"></span> Active
         </span>`
      : `<span class="text-13 py-2 px-8 bg-danger-50 text-danger-600 d-inline-flex align-items-center gap-8 rounded-pill">
           <span class="w-6 h-6 bg-danger-600 rounded-circle"></span> Inactive
         </span>`;

    tbody.innerHTML += `
      <tr>
        <td class="fixed-width">
          <div class="form-check">
            <input class="form-check-input border-gray-200 rounded-4" type="checkbox">
          </div>
        </td>
        <td>
          <span class="h6 mb-0 fw-medium text-gray-300">${esc(lang.language_name)}</span>
        </td>
        <td>${statusHTML}</td>
        <td class="text-center">
          <span class="text-main-600 fs-18 cursor-pointer" title="Edit"
                onclick="editLanguage(${lang.id})">
            <i class="bi bi-pencil-square"></i>
          </span>
        </td>
        <td class="text-center">
          <span class="text-danger fs-18 cursor-pointer" title="Delete"
                onclick="confirmDeleteLanguage(${lang.id})">
            <i class="bi bi-trash"></i>
          </span>
        </td>
      </tr>`;
  });

  renderLanguagePagination(totalItems, startIndex, endIndex, totalPages);
}
window.renderLanguageTable = renderLanguageTable;

function renderLanguagePagination(totalItems, startIndex, endIndex, totalPages) {
    const tableBody = document.getElementById('languageTableBody');
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
        const activeClass = i === currentLanguagePage ? 'active' : '';
        paginationHTML += `
            <li class="page-item ${activeClass}">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium cursor-pointer" onclick="window.renderLanguageTable(window.languageListArray, ${i})">${i}</a>
            </li>
        `;
    }
    paginationHTML += `</ul></div>`;
    footer.innerHTML = paginationHTML;
}

// ====================== ADD LANGUAGE ======================
let publishBtn, languageNameEl, languageDescriptionEl, statusToggleEl;

function initAddLanguage() {
  publishBtn = document.getElementById("publishLanguage");
  languageNameEl = document.getElementById("LanguageName");
  languageDescriptionEl = document.getElementById("LanguageDescription");
  statusToggleEl = document.getElementById("statusToggle");

  if (!publishBtn) return;

  // Enable button only when name is filled
  if (languageNameEl) {
    const checkButtonState = () => {
      publishBtn.disabled = languageNameEl.value.trim() === "";
    };
    checkButtonState();
    languageNameEl.addEventListener("input", checkButtonState);
  }

  publishBtn.addEventListener("click", handleAddLanguage);
}

async function handleAddLanguage(e) {
  e?.preventDefault();

  const token = getToken();
  if (!token) {
    return Swal.fire({ icon: 'error', title: 'Unauthorized', text: 'Please login again' });
  }

  const langName = languageNameEl?.value.trim() || "";
  const langDesc = languageDescriptionEl?.value.trim() || "";
  const isActive = statusToggleEl?.checked ?? false;

  if (!langName) {
    return Swal.fire({ icon: 'warning', title: 'Required', text: 'Language Name is required' });
  }

  const formData = new FormData();
  formData.append("language_name", langName);
  formData.append("language_discription", langDesc);
  formData.append("is_active", isActive);

  try {
    publishBtn.disabled = true;
    publishBtn.innerText = "Publishing...";

    const response = await fetch(API.addLanguage, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    const result = await response.json();

    if (response.ok && result.success !== false) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Language added successfully',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        window.location.href = 'all-language.php';
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: result.message || 'Failed to add language'
      });
    }
  } catch (error) {
    console.error("Add Language Error:", error);
    Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong' });
  } finally {
    if (publishBtn) {
      publishBtn.disabled = false;
      publishBtn.innerText = "Publish Language";
    }
  }
}

// ====================== EDIT LANGUAGE ======================
function editLanguage(id) {
  if (!id) return;
  window.location.href = `edit-language.php?id=${id}`;
}

async function getLanguageById(id) {
  const token = getToken();
  if (!token || !id) return null;

  try {
    const response = await fetch(API.getAllLanguages, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) return null;

    const result = await response.json();
    if (!result.success || !Array.isArray(result.data)) return null;

    return result.data.find(l => String(l.id) === String(id)) || null;
  } catch (err) {
    console.error('getLanguageById error', err);
    return null;
  }
}

function initEditLanguage() {
  const updateBtn = document.getElementById('updateLanguage');
  if (!updateBtn) return; // Not on edit page

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (!id) {
    console.warn('No id in URL');
    return;
  }

  // Prefill form
  (async () => {
    const language = await getLanguageById(id);
    if (!language) {
      Swal.fire({ icon: 'error', title: 'Not Found', text: 'Language not found!' });
      return;
    }

    const nameEl = document.getElementById('LanguageName');
    const descEl = document.getElementById('LanguageDescription');
    const statusEl = document.getElementById('statusToggle');

    if (nameEl) nameEl.value = language.language_name || '';
    if (descEl) descEl.value = language.language_discription || '';
    if (statusEl) statusEl.checked = !!language.is_active;
  })();

  // Update handler
  updateBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      return Swal.fire({ icon: 'warning', title: 'Session Expired', text: 'Please login again' });
    }

    const nameEl = document.getElementById('LanguageName');
    const descEl = document.getElementById('LanguageDescription');
    const statusEl = document.getElementById('statusToggle');

    const langName = nameEl?.value.trim() || '';
    const langDesc = descEl?.value.trim() || '';
    const isActive = statusEl?.checked ?? false;

    if (!langName) {
      return Swal.fire({ icon: 'error', title: 'Required', text: 'Language Name is required' });
    }

    const formData = new FormData();
    formData.append('language_name', langName);
    formData.append('language_discription', langDesc);
    formData.append('is_active', isActive);

    try {
      updateBtn.disabled = true;
      updateBtn.innerText = 'Updating...';

      const response = await fetch(API.updateLanguage(id), {
        method: 'POST',                    // Most reliable with FormData
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success !== false) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Language updated successfully',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          window.location.href = 'all-language.php';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: result.message || 'Update failed'
        });
      }
    } catch (err) {
      console.error('Update Error:', err);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong' });
    } finally {
      updateBtn.disabled = false;
      updateBtn.innerText = 'Update Language';
    }
  });
}

// ====================== DELETE LANGUAGE ======================
async function confirmDeleteLanguage(id) {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "This action cannot be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    deleteLanguage(id);
  }
}

async function deleteLanguage(id) {
  const token = getToken();
  if (!token) {
    return Swal.fire('Error', 'Token not found. Please login again.', 'error');
  }

  try {
    const response = await fetch(API.deleteLanguage(id), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok && result.success !== false) {
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Language has been deleted successfully.',
        timer: 2000,
        showConfirmButton: false
      });
      getLanguageList();   // Refresh table
    } else {
      Swal.fire('Error', result.message || 'Failed to delete language', 'error');
    }
  } catch (error) {
    console.error("Delete Error:", error);
    Swal.fire('Error', 'Something went wrong!', 'error');
  }
}