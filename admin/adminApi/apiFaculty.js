const getAllFacultiesEndpoint = "https://edtech.colaborazia.com/api/admin/faculties";
const createFacultyEndpoint = "https://edtech.colaborazia.com/api/admin/add-faculty";
const baseDomain = "https://edtech.colaborazia.com";
const modifyFacultyEndpoint = "https://edtech.colaborazia.com/api/admin/update-faculty";
const removeFacultyEndpoint = "https://edtech.colaborazia.com/api/admin/delete-faculty/";

// Global Faculty List for Pagination
let currentFacultyPage = 1;
const FACULTY_PER_PAGE = 8;

// Setup initial page actions
document.addEventListener("DOMContentLoaded", function() {
    loadAllFaculties();
    setupCreateFacultyHandler();
    setupModifyFacultyHandler();
    setupImagePreviewHandler();
    setupToggleDisplayHandler();
});

//-------------------------- Load All FACULTIES Section -------------------------//

async function loadAllFaculties() {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
        console.warn('facultiesEndpoint: no auth token available');
        return;
    }

    try {
        const apiResponse = await fetch(getAllFacultiesEndpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!apiResponse.ok) {
            console.error('facultiesEndpoint: response status invalid', apiResponse.status);
            return;
        }

        const apiData = await apiResponse.json();
        console.log("Faculties Response Data:", apiData);

        const itemsList = Array.isArray(apiData) ? apiData : apiData && (apiData.data || apiData.result || apiData.faculties || []);
        if (Array.isArray(itemsList) && itemsList.length > 0) {
            window.facultyListArray = itemsList;
            displayFacultyList(itemsList);
        } else {
            const tableBodyElement = document.getElementById("facultyTableBody");
            if (tableBodyElement) {
                tableBodyElement.innerHTML = `<tr><td colspan="9" class="text-center text-muted">No faculty members available</td></tr>`;
            }
        }
    } catch (err) {
        console.error("facultiesEndpoint: request failed", err);
    }
}

function displayFacultyList(facultyList = window.facultyListArray, page = 1) {
    const tableBody = document.getElementById("facultyTableBody");
    if (!tableBody) return;

    currentFacultyPage = page;
    const totalItems = facultyList.length;
    const totalPages = Math.ceil(totalItems / FACULTY_PER_PAGE);

    if (currentFacultyPage < 1) currentFacultyPage = 1;
    if (currentFacultyPage > totalPages && totalPages > 0) currentFacultyPage = totalPages;

    const startIndex = (currentFacultyPage - 1) * FACULTY_PER_PAGE;
    const endIndex = Math.min(startIndex + FACULTY_PER_PAGE, totalItems);

    const pageFaculties = facultyList.slice(startIndex, endIndex);

    tableBody.innerHTML = "";

    pageFaculties.forEach((facultyItem, itemIndex) => {
        let imageUrl = 'assets/images/thumbs/facultyTable-img1.png';
        if (typeof facultyItem.profileImage === 'string' && facultyItem.profileImage) {
            imageUrl = facultyItem.profileImage.startsWith('http') ? facultyItem.profileImage :  facultyItem.profileImage;
        } else if (facultyItem.profileImage && facultyItem.profileImage.url) {
            imageUrl =  facultyItem.profileImage.url;
        } else if (typeof facultyItem.image === 'string' && facultyItem.image) {
            imageUrl = facultyItem.image.startsWith('http') ? facultyItem.image :  facultyItem.image;
        }

        tableBody.innerHTML += `
<tr>
    <!-- Serial Number -->
    <td class="align-middle">
        <span class="h6 mb-0 fw-medium text-gray-300">
            ${startIndex + itemIndex + 1}
        </span>
    </td>

    <!-- Faculty Profile -->
    <td class="align-middle">
        <div class="d-flex align-items-center gap-8">
            <img 
                src="${imageUrl}"
                class="w-40 h-40 rounded-circle"
                alt="faculty-image"
            >
            <span class="h6 mb-0 fw-medium text-gray-300">
                ${facultyItem.name}
            </span>
        </div>
    </td>
    <td>
        <span class="h6 mb-0 fw-medium text-gray-300">
            ${facultyItem.email}
        </span>
    </td>
    <td>
        <span class="h6 mb-0 fw-medium text-gray-300">
            ${facultyItem.phoneNumber}
        </span>
    </td>
    <td>
        <span class="h6 mb-0 fw-medium text-gray-300">
            ${facultyItem.position}
        </span>
    </td>
    <td>
        <span class="h6 mb-0 fw-medium text-gray-300">
            ${facultyItem.experience}
        </span>
    </td>
    <td>
        <span class="h6 mb-0 fw-medium text-gray-300">
            ${facultyItem.specialization}
        </span>
    </td>

    <!-- Activity Indicator -->
    <td class="align-middle">
        ${
            facultyItem.status
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

    <!-- Modify Action -->
    <td class="align-middle">
        <i 
            class="bi bi-pencil-square text-success fs-5 cursor-pointer"
            onclick="modifyFacultyRecord('${facultyItem.id || facultyItem._id}')"
        ></i>
    </td>

    <!-- Remove Action -->
    <td class="align-middle">
        <i 
            class="bi bi-trash text-danger fs-5 cursor-pointer"
            onclick="confirmRemoveFaculty('${facultyItem.slug || facultyItem._id}')"
        ></i>
    </td>
</tr>
`;
    });

    renderFacultyPagination(totalItems, startIndex, endIndex, totalPages);
}
window.displayFacultyList = displayFacultyList;

function renderFacultyPagination(totalItems, startIndex, endIndex, totalPages) {
    const tableBody = document.getElementById('facultyTableBody');
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
        const activeClass = i === currentFacultyPage ? 'active' : '';
        paginationHTML += `
            <li class="page-item ${activeClass}">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium cursor-pointer" onclick="window.displayFacultyList(window.facultyListArray, ${i})">${i}</a>
            </li>
        `;
    }
    paginationHTML += `</ul></div>`;
    footer.innerHTML = paginationHTML;
}

// -------------------------- Load All FACULTIES Section End -------------------------//

async function createNewFaculty() {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
        Swal.fire("Unauthorized", "Please login again", "error");
        return;
    }

    const givenName = document.getElementById("facultyFirstName")?.value.trim();
    const familyName = document.getElementById("facultyLastName")?.value.trim();
    const contactEmail = document.getElementById("facultyEmail")?.value.trim();
    const contactPhone = document.getElementById("facultyPhone")?.value.trim();
    const jobRole = document.getElementById("facultyPosition")?.value.trim();
    const workYears = document.getElementById("facultyExperience")?.value.trim();
    const expertArea = document.getElementById("facultySpecialization")?.value.trim();
    const securePass = document.getElementById("facultyPassword")?.value.trim();
    const activeStatus = document.getElementById("statusToggle")?.checked;

    const imageSelector = document.querySelector("#fileUpload input[type='file']");
    const selectedImage = imageSelector?.files[0];

    if (!givenName || !familyName || !contactEmail || !contactPhone || !selectedImage) {
        Swal.fire("Required", "First Name, Last Name, Email, Phone & Image required", "warning");
        return;
    }

    if (!selectedImage.type.startsWith('image/')) {
        Swal.fire("Invalid File", "Please select an image file (JPG, PNG, etc.)", "warning");
        return;
    }
    if (selectedImage.size > 5 * 1024 * 1024) {
        Swal.fire("Too Large", "Image must be under 5MB", "warning");
        return;
    }

    console.log('Creating Faculty:', { givenName, hasImage: !!selectedImage, imageName: selectedImage?.name });

    const uploadPayload = new FormData();
    uploadPayload.append("firstName", givenName);
    uploadPayload.append("lastName", familyName);
    uploadPayload.append("email", contactEmail);
    uploadPayload.append("phoneNumber", contactPhone);
    uploadPayload.append("position", jobRole || '');
    uploadPayload.append("experience", workYears || '');
    uploadPayload.append("specialization", expertArea || '');
    uploadPayload.append("password", securePass || '');
    uploadPayload.append("profileImage", selectedImage);
    uploadPayload.append("status", activeStatus ? "1" : "0");

    for (let [formKey, formValue] of uploadPayload.entries()) {
        console.log(formKey, formValue);
    }

    try {
        const apiResponse = await fetch(createFacultyEndpoint, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            body: uploadPayload
        });

        let parsedResult;
        try {
            parsedResult = await apiResponse.json();
        } catch {
            throw new Error("Invalid server response");
        }

        console.log("Create Faculty Response:", parsedResult);

        if (apiResponse.ok && parsedResult.success) {
            Swal.fire({
                icon: "success",
                title: "Faculty Added Successfully",
                showConfirmButton: false,
                timer: 1500
            })
            .then(() => {window.location.href = "all-faculty.php";});


            loadAllFaculties();

            // Reset inputs
            if (document.getElementById("facultyFirstName")) document.getElementById("facultyFirstName").value = "";
            if (document.getElementById("facultyLastName")) document.getElementById("facultyLastName").value = "";
            if (document.getElementById("facultyEmail")) document.getElementById("facultyEmail").value = "";
            if (document.getElementById("facultyPhone")) document.getElementById("facultyPhone").value = "";
            if (document.getElementById("facultyPosition")) document.getElementById("facultyPosition").value = "";
            if (document.getElementById("facultyExperience")) document.getElementById("facultyExperience").value = "";
            if (document.getElementById("facultySpecialization")) document.getElementById("facultySpecialization").value = "";
            if (document.getElementById("facultyPassword")) document.getElementById("facultyPassword").value = "";
            if (document.getElementById("statusToggle")) document.getElementById("statusToggle").checked = false;
            imageSelector.value = "";
            const previewImage = document.getElementById("previewImg");
            const previewContainer = document.getElementById("imagePreview");
            if (previewImage) previewImage.style.display = "none";
            if (previewContainer) previewContainer.style.display = "none";

        } else {
            Swal.fire("Error", parsedResult.message || "Faculty creation failed. Verify image upload.", "error");
        }

    } catch (err) {
        console.error("Create Faculty Error:", err);
        Swal.fire("Server Error", "Something went wrong. Please try again.", "error");
    }
}

function setupCreateFacultyHandler() {
    const createBtn = document.getElementById("addFaculty");
    if (!createBtn) return;
    createBtn.addEventListener("click", createNewFaculty);
}

// -------------------------- Toggle Display Setup -------------------------//
function setupToggleDisplayHandler() {
    const toggleSwitch = document.getElementById('statusToggle');
    if (!toggleSwitch) return;

    const toggleLabel = toggleSwitch.closest('label') || toggleSwitch.parentElement?.querySelector('label');
    const onText = toggleLabel?.querySelector('.active-text');
    const offText = toggleLabel?.querySelector('.inactive-text');

    if (!onText || !offText) return;

    function refreshToggleText() {
        if (toggleSwitch.checked) {
            onText.style.display = 'inline';
            offText.style.display = 'none';
        } else {
            onText.style.display = 'none';
            offText.style.display = 'inline';
        }
    }

    refreshToggleText();
    toggleSwitch.addEventListener('change', refreshToggleText);
}

// -------------------------- Remove FACULTY Section -------------------------//
async function confirmRemoveFaculty(slug) {
    const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete this faculty? This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel'
    });

    if (confirmation.isConfirmed) {
        removeFacultyMember(slug);
    }
}   

async function removeFacultyMember(slug) {
    const authToken = localStorage.getItem('token');
    if (!authToken) { Swal.fire('Error', 'Token not found. Please login again.', 'error'); return; }
    try {
        const apiResponse = await fetch(`${removeFacultyEndpoint}${slug}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' }
        });
        
        let parsedResult = {};
        try {
            parsedResult = await apiResponse.json();
        } catch(e) {}
        
        if (apiResponse.ok && parsedResult.success !== false) {
            Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Faculty deleted successfully.', timer: 1500, showConfirmButton: false });
            loadAllFaculties();
        } else {
            Swal.fire({ icon: 'error', title: 'Failed', text: parsedResult.message || 'Failed to delete faculty' });
        }
    } catch (err) {
        console.error('Remove Faculty Error:', err);
        Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
    }
}

// -------------------------- Modify FACULTY Section -------------------------//

function modifyFacultyRecord(facultyId) {
    window.location.href = `edit-faculty.php?id=${facultyId}`;
}

async function applyFacultyChanges(facultyId) {
    const authToken = localStorage.getItem("token");
    if (!authToken) { Swal.fire('Unauthorized', 'Please login again', 'error'); return; }

    const givenName = document.getElementById("facultyFirstName")?.value.trim();
    const familyName = document.getElementById("facultyLastName")?.value.trim();
    const contactEmail = document.getElementById("facultyEmail")?.value.trim();
    const contactPhone = document.getElementById("facultyPhone")?.value.trim();
    const jobRole = document.getElementById("facultyPosition")?.value.trim();
    const workYears = document.getElementById("facultyExperience")?.value.trim();
    const expertArea = document.getElementById("facultySpecialization")?.value.trim();
    const securePass = document.getElementById("facultyPassword")?.value.trim();
    const activeStatus = document.getElementById("statusToggle")?.checked;

    const imageSelector = document.querySelector("#fileUploade input[type='file']");
    const selectedImage = imageSelector?.files[0];

    if (!givenName || !familyName || !contactEmail || !contactPhone) {
        Swal.fire("Required", "First Name, Last Name, Email & Phone required", "warning");
        return;
    }

    if (selectedImage) {
        if (!selectedImage.type.startsWith('image/')) {
            Swal.fire("Invalid File", "Please select an image file (JPG, PNG, etc.)", "warning");
            return;
        }
        if (selectedImage.size > 5 * 1024 * 1024) {
            Swal.fire("Too Large", "Image must be under 5MB", "warning");
            return;
        }
    }

    console.log('Updating Faculty:', { facultyId, givenName, hasNewImage: !!selectedImage });

    const updatePayload = new FormData();
    updatePayload.append("firstName", givenName);
    updatePayload.append("lastName", familyName);
    updatePayload.append("email", contactEmail);
    updatePayload.append("phoneNumber", contactPhone);
    updatePayload.append("position", jobRole || '');
    updatePayload.append("experience", workYears || '');
    updatePayload.append("specialization", expertArea || '');
    updatePayload.append("password", securePass || '');
    updatePayload.append("status", activeStatus ? "true" : "false");
    if (selectedImage) updatePayload.append("profile_image", selectedImage);

    const modifyUrl = `${modifyFacultyEndpoint}/${facultyId}`;

    try {
        const apiResponse = await fetch(modifyUrl, {
            method: "PUT",
            headers: { Authorization: `Bearer ${authToken}` },
            body: updatePayload
        });

        let parsedResult = {};
        try {
            parsedResult = await apiResponse.json();
        } catch (e) { }
        
        console.log("Modify Faculty Response:", parsedResult);

        if (apiResponse.ok && parsedResult.success !== false) {
            Swal.fire({ icon: "success", title: "Faculty Updated Successfully", showConfirmButton: false, timer: 1500 })
            .then (() => {window.location.href = "all-faculty.php";});
            loadAllFaculties();
        } else {
            Swal.fire("Error", parsedResult.message || "Update failed. Check image if changed.", "error");
        }
    } catch (err) {
        console.error("Modify Faculty Error:", err);
        Swal.fire("Server Error", "Something went wrong", "error");
    }
}

// Setup for edit page: populate fields, display current image, attach update handler
function setupModifyFacultyHandler() {
    const updateBtn = document.getElementById('editFaculty');
    const queryString = new URLSearchParams(window.location.search);
    const facultyId = queryString.get('id');
    if (!facultyId) return; // Not edit mode

    (async function() {
        try {
            const authToken = localStorage.getItem('token');
            if (!authToken) return;

            const apiResponse = await fetch(getAllFacultiesEndpoint, { 
                method: 'GET', 
                headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${authToken}` } 
            });
            if (!apiResponse.ok) return;

            const apiData = await apiResponse.json();
        const itemsList = Array.isArray(apiData) ? apiData : apiData && (apiData.data || apiData.result || apiData.faculties || []);
        const targetFaculty = (Array.isArray(itemsList) && itemsList.find(f => String(f.id || f._id) === String(facultyId))) || null;

            if (!targetFaculty) { 
                console.warn('Faculty not located for ID', facultyId); 
                return; 
            }

        // Populate form elements safely
            const fullNameParts = (targetFaculty.name || '').split(' ');
        if (document.getElementById('facultyFirstName')) document.getElementById('facultyFirstName').value = fullNameParts[0] || '';
        if (document.getElementById('facultyLastName')) document.getElementById('facultyLastName').value = fullNameParts.slice(1).join(' ') || '';
        if (document.getElementById('facultyEmail')) document.getElementById('facultyEmail').value = targetFaculty.email || '';
        if (document.getElementById('facultyPhone')) document.getElementById('facultyPhone').value = targetFaculty.phoneNumber || '';

        if (document.getElementById('facultyPosition')) document.getElementById('facultyPosition').value = targetFaculty.position || '';
        if (document.getElementById('facultyExperience')) document.getElementById('facultyExperience').value = targetFaculty.experience || '';
        if (document.getElementById('facultySpecialization')) document.getElementById('facultySpecialization').value = targetFaculty.specialization || '';

            // Set toggle state
            const toggleSwitch = document.getElementById('statusToggle');
            if (toggleSwitch) {
                toggleSwitch.checked = !!targetFaculty.status;
            const toggleLabel = toggleSwitch.closest('label') || toggleSwitch.parentElement?.querySelector('label');
                const onText = toggleLabel?.querySelector('.active-text');
                const offText = toggleLabel?.querySelector('.inactive-text');
                if (onText && offText) {
                    if (toggleSwitch.checked) {
                        onText.style.display = 'inline';
                        offText.style.display = 'none';
                    } else {
                        onText.style.display = 'none';
                        offText.style.display = 'inline';
                    }
                }
            }

            // Display current profile image
            const previewContainer = document.getElementById('imagePreview');
            const previewImage = document.getElementById('previewImg');
            const uploadLabel = document.querySelector('#fileUpload label');

            let imageUrl = '';
            if (typeof targetFaculty.profileImage === 'string' && targetFaculty.profileImage) {
                imageUrl = targetFaculty.profileImage.startsWith('http') ? targetFaculty.profileImage :  targetFaculty.profileImage;
            } else if (targetFaculty.profileImage && targetFaculty.profileImage.url) {
                imageUrl =  targetFaculty.profileImage.url;
            } else if (typeof targetFaculty.image === 'string' && targetFaculty.image) {
                imageUrl = targetFaculty.image.startsWith('http') ? targetFaculty.image :  targetFaculty.image;
            }

            if (imageUrl && previewImage) {
                
                previewImage.src = imageUrl;
                previewImage.style.display = 'block';

                if (previewContainer) {
                    previewContainer.style.display = 'block';
                }

                if (uploadLabel) {
                    uploadLabel.innerText = "Change Image";
                }
            } else {
                if (previewImage) previewImage.style.display = 'none';
                if (previewContainer) previewContainer.style.display = 'none';
                if (uploadLabel) {
                    uploadLabel.innerText = "Upload Image";
                }
            }

            if (updateBtn) updateBtn.innerText = 'Update Faculty';

        } catch (err) {
            console.error('setupModifyFacultyHandler error', err);
        }
    })();

    if (updateBtn) {
        updateBtn.addEventListener('click', (event) => { 
            event.preventDefault(); 
            applyFacultyChanges(facultyId); 
        });
    }
}

// Image preview on selection for create and modify pages
function setupImagePreviewHandler() {
    const imageInput = document.querySelector('#fileUpload input[type="file"]');
    if (!imageInput) return;

    imageInput.addEventListener('change', function(event) {
        const chosenFile = event.target.files[0];
        const previewImage = document.getElementById('previewImg');
        const previewContainer = document.getElementById('imagePreview');

        if (chosenFile && previewImage) {
            const fileReader = new FileReader();
            fileReader.onload = function(loadEvent) {
                previewImage.src = loadEvent.target.result;
                previewImage.style.display = 'block';
                if (previewContainer) previewContainer.style.display = 'block';
            };
            fileReader.readAsDataURL(chosenFile);
        } else if (!chosenFile && previewImage) {
            previewImage.style.display = 'none';
            if (previewContainer) previewContainer.style.display = 'none';
        }
    });
}
// -------------------------- Modify FACULTY Section End -------------------------//