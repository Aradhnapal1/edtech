// ====================== BASE API URL ======================
const BASE_API = "https://edtech.colaborazia.com/api/admin";

let currentCareerPage = 1;
const CAREER_PER_PAGE = 8;

let currentContactPage = 1;
const CONTACT_PER_PAGE = 8;

// ====================== SINGLE DOM CONTENT LOADED ======================
document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("token") ||
                  (window.auth && typeof window.auth.get === "function" ? window.auth.get() : null);

    if (!token) {
        console.warn("No authentication token found!");
        return;
    }

    window.fullMessages = {};   // Global storage for full messages

    // =============================================
    // 1. LOAD ALL CAREER ENQUIRIES
    // =============================================
    fetch(`${BASE_API}/enquiry/all-career`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(result => {
        console.log("Career API Response:", result);
        if (result.success && Array.isArray(result.data)) {
            window.careerListArray = result.data;
            renderCareerTable(result.data);
        } else {
            console.warn("Career data not in expected format", result);
        }
    })
    .catch(err => {
        console.error("Career Enquiry API Error:", err);
    });

    // =============================================
    // 2. LOAD ALL CONTACT ENQUIRIES
    // =============================================
    fetch(`${BASE_API}/enquiry/all`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(result => {
        console.log("Contact API Response:", result);
        const data = result.data || result;   // Handle different response structures
        if (Array.isArray(data)) {
            window.contactListArray = data;
            renderContactTable(data);
        }
    })
    .catch(err => {
        console.error("Contact Enquiry API Error:", err);
    });
});

    // ====================== RENDER CAREER TABLE ======================
    function renderCareerTable(data = window.careerListArray, page = 1) {
        const tbody = document.getElementById("careerTableBody");
        if (!tbody) return console.error("careerTableBody not found");

        currentCareerPage = page;
        const totalItems = data ? data.length : 0;
        const totalPages = Math.ceil(totalItems / CAREER_PER_PAGE);
        if (currentCareerPage < 1) currentCareerPage = 1;
        if (currentCareerPage > totalPages && totalPages > 0) currentCareerPage = totalPages;
        const startIndex = (currentCareerPage - 1) * CAREER_PER_PAGE;
        const endIndex = Math.min(startIndex + CAREER_PER_PAGE, totalItems);
        const pageData = data ? data.slice(startIndex, endIndex) : [];

        tbody.innerHTML = "";

        pageData.forEach((item, index) => {
            const originalIndex = window.careerListArray.findIndex(r => r.id === item.id);
            window.fullMessages[`career_${originalIndex}`] = item.message ?? "—";

            const fullFileName = item.resume ? item.resume.split("/").pop() : "No file";
            const nameWithoutExt = fullFileName.replace(/\.[^/.]+$/, "");
            const fileExt = fullFileName.split(".").pop() || "";

            const fileWords = nameWithoutExt.split(/[\s-_]+/);
            const shortFileName = fileWords.length > 2 
                ? fileWords.slice(0, 2).join(" ") + "..." 
                : nameWithoutExt;

            const displayFileName = shortFileName + "." + fileExt;

            const row = `
            <tr>
                <td><span class="h6 mb-0 fw-medium text-gray-300">${startIndex + index + 1}</span></td>
                <td>
                    <div class="d-flex align-items-center gap-8">
                        <span class="h6 mb-0 fw-medium text-gray-300">${item.name || "—"}</span>
                    </div>
                </td>
                <td><span class="h6 mb-0 fw-medium text-gray-300">${item.email || "—"}</span></td>
                <td><span class="h6 mb-0 fw-medium text-gray-300">${item.contact || "—"}</span></td>
                <td><span class="h6 mb-0 fw-medium text-gray-300">${item.subject || "—"}</span></td>
                <td>
                    <span class="h6 mb-0 fw-medium text-gray-300">
                        ${item.message && item.message.length > 15 
                            ? item.message.substring(0, 15) + "..." 
                            : (item.message ?? "—")}
                    </span>
                    ${item.message && item.message.length > 15 ? `
                        <button class="btn btn-sm btn-outline-primary ms-2" 
                            onclick="showCareerMessage(${originalIndex})">View</button>` : ""}
                </td>
                <td>
                    ${item.resume ? `
                    <a href="${item.resume}" download class="d-flex align-items-center gap-2 text-decoration-none" 
                       title="${fullFileName}">
                        <i class="fa-solid fa-file-pdf text-danger"></i>
                        ${displayFileName}
                    </a>` : "—"}
                </td>
                <td><span class="h6 mb-0 fw-medium text-gray-300">
                    ${item.created_at ? new Date(item.created_at).toLocaleDateString() : "—"}
                </span></td>
            </tr>`;

            tbody.insertAdjacentHTML("beforeend", row);
        });
        renderCareerPagination(totalItems, startIndex, endIndex, totalPages);
    }
    window.renderCareerTable = renderCareerTable;
    
    function renderCareerPagination(totalItems, startIndex, endIndex, totalPages) {
        const tableBody = document.getElementById('careerTableBody');
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
            const activeClass = i === currentCareerPage ? 'active' : '';
            paginationHTML += `
                <li class="page-item ${activeClass}">
                    <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium cursor-pointer" onclick="window.renderCareerTable(window.careerListArray, ${i})">${i}</a>
                </li>
            `;
        }
        paginationHTML += `</ul></div>`;
        footer.innerHTML = paginationHTML;
    }

    // ====================== RENDER CONTACT TABLE ======================
    function renderContactTable(data = window.contactListArray, page = 1) {
        const tbody = document.getElementById("contactTableBody");
        if (!tbody) return console.error("contactTableBody not found");

        currentContactPage = page;
        const totalItems = data ? data.length : 0;
        const totalPages = Math.ceil(totalItems / CONTACT_PER_PAGE);
        if (currentContactPage < 1) currentContactPage = 1;
        if (currentContactPage > totalPages && totalPages > 0) currentContactPage = totalPages;
        const startIndex = (currentContactPage - 1) * CONTACT_PER_PAGE;
        const endIndex = Math.min(startIndex + CONTACT_PER_PAGE, totalItems);
        const pageData = data ? data.slice(startIndex, endIndex) : [];

        tbody.innerHTML = "";

        pageData.forEach((item, index) => {
            const message = item.message ?? "—";
            const originalIndex = window.contactListArray.findIndex(r => r.id === item.id);
            window.fullMessages[`contact_${originalIndex}`] = message;

            const shortMessage = message.length > 15 ? message.substring(0, 15) + "..." : message;

            const row = `
            <tr>
                <td><span class="h6 mb-0 fw-medium text-gray-300">${startIndex + index + 1}</span></td>
                <td>
                    <div class="d-flex align-items-center gap-8">
                        <span class="h6 mb-0 fw-medium text-gray-300">${item.name || "—"}</span>
                    </div>
                </td>
                <td><span class="h6 mb-0 fw-medium text-gray-300">${item.email || "—"}</span></td>
                <td><span class="h6 mb-0 fw-medium text-gray-300">${item.contact || "—"}</span></td>
                <td>
                    <span class="h6 mb-0 fw-medium text-gray-300">${shortMessage}</span>
                    ${message.length > 15 ? `
                    <button class="btn btn-sm btn-outline-primary ms-2" 
                        onclick="showContactMessage(${originalIndex})">View</button>` : ""}
                </td>
                <td><span class="h6 mb-0 fw-medium text-gray-300">
                    ${item.created_at ? new Date(item.created_at).toLocaleDateString() : "—"}
                </span></td>
                <td>
                    <i class="bi bi-trash text-danger fs-5 cursor-pointer" 
                       onclick="deleteEnquiry(${item.id})"></i>
                </td>
            </tr>`;

            tbody.insertAdjacentHTML("beforeend", row);
        });
        renderContactPagination(totalItems, startIndex, endIndex, totalPages);
    }
    window.renderContactTable = renderContactTable;

    function renderContactPagination(totalItems, startIndex, endIndex, totalPages) {
        const tableBody = document.getElementById('contactTableBody');
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
            const activeClass = i === currentContactPage ? 'active' : '';
            paginationHTML += `
                <li class="page-item ${activeClass}">
                    <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium cursor-pointer" onclick="window.renderContactTable(window.contactListArray, ${i})">${i}</a>
                </li>
            `;
        }
        paginationHTML += `</ul></div>`;
        footer.innerHTML = paginationHTML;
    }

// ====================== GLOBAL MODAL FUNCTIONS ======================

// Show Career Message
window.showCareerMessage = function (index) {
    showMessageModal(`career_${index}`);
};

// Show Contact Message
window.showContactMessage = function (index) {
    showMessageModal(`contact_${index}`);
};

// Common Modal Function
function showMessageModal(key) {
    let modal = document.getElementById("messageModal");

    if (!modal) {
        modal = document.createElement("div");
        modal.className = "modal fade";
        modal.id = "messageModal";
        modal.tabIndex = "-1";

        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Full Message</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p id="fullMessageText" class="mb-0"></p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    const fullText = window.fullMessages[key] || "No message available";
    document.getElementById("fullMessageText").innerText = fullText;

    new bootstrap.Modal(modal).show();
}

// ====================== DELETE ENQUIRY ======================
window.deleteEnquiry = function (id) {
    if (!id) return;

    Swal.fire({
        title: "Are you sure?",
        text: "This enquiry will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (!result.isConfirmed) return;

        const token = localStorage.getItem("token") ||
                      (window.auth && typeof window.auth.get === "function" ? window.auth.get() : null);

        if (!token) {
            Swal.fire("Error", "No authentication token found", "error");
            return;
        }

        fetch(`${BASE_API}/enquiry/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.ok) {
                Swal.fire("Deleted!", "Enquiry deleted successfully.", "success");
                setTimeout(() => location.reload(), 1200);
            } else {
                Swal.fire("Error", "Failed to delete enquiry", "error");
            }
        })
        .catch(err => {
            console.error("Delete error:", err);
            Swal.fire("Error", "Something went wrong", "error");
        });
    });
};