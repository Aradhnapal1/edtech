const liveClassApi = "https://edtech.colaborazia.com/api/admin/get-all-live-class";

// Global variable to store the fetched data
let allLiveClasses = [];

let currentLiveClassPage = 1;
const LIVECLASS_PER_PAGE = 8;

document.addEventListener("DOMContentLoaded", function () {
   console.log("Live class page loaded");
   fetchLiveClasses(); // This will fetch and then render
   renderLiveClassData();
      fetchBatches();
    fetchFaculties();
    initAddLiveClass();
    

  
});

async function fetchLiveClasses() {
   console.log("Fetching live classes...");

   const token = localStorage.getItem("token");
   if (!token) {
      console.warn("Token not found in localStorage");
      alert("Please log in first (token missing)");
      return;
   }

   try {
      const response = await fetch(liveClassApi, {
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
      console.log("Live classes data:", result);

      // Assuming the API returns an array directly or { data: [...] } or similar
      // Adjust this line based on your actual response structure
      allLiveClasses = Array.isArray(result) ? result : result.data || result.liveClasses || [];

      renderLiveClassData(allLiveClasses); // Now render with the real data
   } catch (error) {
      console.error("Error fetching live classes:", error);
   }
}

function renderLiveClassData(liveClasses = allLiveClasses, page = 1) {
   const tbody = document.getElementById("liveClassTableBody");
   if (!tbody) {
      console.error("ERROR: #liveClassTableBody not found in HTML!");
      return;
   }

   currentLiveClassPage = page;
   const totalItems = liveClasses ? liveClasses.length : 0;
   const totalPages = Math.ceil(totalItems / LIVECLASS_PER_PAGE);
   if (currentLiveClassPage < 1) currentLiveClassPage = 1;
   if (currentLiveClassPage > totalPages && totalPages > 0) currentLiveClassPage = totalPages;
   const startIndex = (currentLiveClassPage - 1) * LIVECLASS_PER_PAGE;
   const endIndex = Math.min(startIndex + LIVECLASS_PER_PAGE, totalItems);
   const pageLiveClasses = liveClasses ? liveClasses.slice(startIndex, endIndex) : [];

   if (!liveClasses || liveClasses.length === 0) {
    
      tbody.innerHTML = "<tr><td colspan='5'>No live classes found</td></tr>";
      return;
   }

   tbody.innerHTML = ""; // Clear previous content

   pageLiveClasses.forEach((liveClass, index) => {
      const imgSrc = liveClass.image ?  liveClass.image : 'assets/images/thumbs/liveClassTable-img1.png';


      // Example: adapt these fields to your actual API response
      const row = document.createElement("tr");
      row.innerHTML = `
            <td class="align-middle"><span class="h6 mb-0 fw-medium text-gray-300">${startIndex + index + 1}</span></td>
                <td class="align-middle">
         <div class="d-flex align-items-center gap-8">
             <img src="${imgSrc}" class="w-40 h-40 rounded-circle" alt="live-class-image">
             <span class="h6 mb-0 fw-medium text-gray-300">${liveClass.topic || 'Unnamed'}</span>
        </div>
    </td>
           <td class="text-gray-300">${liveClass.faculty?.name || liveClass.faculty?.firstName || liveClass.faculty_name || 'N/A'}</td>
          <td class="text-gray-300">${liveClass.startTime || 'N/A'}</td>
          <td class="text-gray-300">${liveClass.endTime || 'N/A'}</td>
          <td class="text-gray-300">${liveClass.classDate || 'N/A'}</td>

          <td>
            <a href="${liveClass.meetingLink || "#"}" target="_blank"
               class="bg-main-50 text-main-600 py-2 px-14 rounded-pill">
              Join
            </a>
          </td>

          <!-- ACTIONS -->
         <td>
  <i class="bi bi-pencil-square text-success fs-5 cursor-pointer"
     onclick="redirectToEdit(${liveClass.id})"></i>
</td>


          <td >
            <i class="bi bi-trash text-danger fs-5 cursor-pointer"
               onclick="deleteLiveClass(${liveClass.id})"></i>
          </td>
        `;
      tbody.appendChild(row);
   });

   renderLiveClassPagination(totalItems, startIndex, endIndex, totalPages);
}
window.renderLiveClassData = renderLiveClassData;

function renderLiveClassPagination(totalItems, startIndex, endIndex, totalPages) {
    const tableBody = document.getElementById('liveClassTableBody');
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
        const activeClass = i === currentLiveClassPage ? 'active' : '';
        paginationHTML += `
            <li class="page-item ${activeClass}">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium cursor-pointer" onclick="window.renderLiveClassData(allLiveClasses, ${i})">${i}</a>
            </li>
        `;
    }
    paginationHTML += `</ul></div>`;
    footer.innerHTML = paginationHTML;
}

// -------------------------Add Live Class Functions Start-------------------------

async function fetchBatches() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const res = await fetch("https://edtech.colaborazia.com/api/admin/get-batch", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        console.log("Batches API response:", json);

        const data = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
        const batchSelect = document.getElementById("batchType");
        if (!batchSelect || !data) return;

        batchSelect.innerHTML = '<option value="" disabled selected>Select Batch</option>';
        data.forEach(batch => {
            const option = document.createElement("option");
            option.value = batch.id;
            option.textContent = batch.batch_name;
            batchSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Batch Fetch Error:", error);
    }
}

async function fetchFaculties() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const res = await fetch("https://edtech.colaborazia.com/api/admin/faculties", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        console.log("Faculties API response:", json);

        const data = Array.isArray(json.data) ? json.data : (Array.isArray(json.faculties) ? json.faculties : (Array.isArray(json) ? json : []));
        const facultySelect = document.getElementById("faculty");
        if (!facultySelect || !data) return;

        facultySelect.innerHTML = '<option value="" disabled selected>Select Faculty</option>';
        data.forEach(faculty => {
            const option = document.createElement("option");
            option.value = faculty.email;
            option.textContent = faculty.name || faculty.firstName || faculty.email;
            facultySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Faculty Fetch Error:", error);
    }
}

async function addLiveClass(event) {
    // If button is inside <form>, prevent default submit & page refresh
    if (event) event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        Swal.fire("Unauthorized", "Please login again", "error");
        return;
    }

    const btn = document.getElementById("addliveclass");
    if (!btn) return;

    btn.disabled = true;
    const originalText = btn.innerHTML;
    btn.innerHTML = "Adding...";

    // Get values
    const topic = document.getElementById("liveClassName").value.trim();
    const facultyEmail = document.getElementById("faculty").value;
    const classDate = document.getElementById("date").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const batch = document.getElementById("batchType").value;
    const meetingLink = document.getElementById("meetingLink").value.trim();
    const fileInput = document.querySelector("#fileUpload input[type='file']");
    const thumbnail = fileInput?.files[0];

    // ========== VALIDATION (Only runs when user clicks button) ==========
    if (!topic) {
        Swal.fire("Required", "Live Class Name required", "warning");
        restoreButton();
        return;
    }
    if (!facultyEmail) {
        Swal.fire("Required", "Faculty required", "warning");
        restoreButton();
        return;
    }
    if (!classDate || !startTime || !endTime) {
        Swal.fire("Required", "Date & Time required", "warning");
        restoreButton();
        return;
    }
    if (!batch) {
        Swal.fire("Required", "Please select a Batch", "warning");
        restoreButton();
        return;
    }
    if (!meetingLink) {
        Swal.fire("Required", "Meeting link required", "warning");
        restoreButton();
        return;
    }
    if (!thumbnail) {
        Swal.fire("Required", "Thumbnail image required", "warning");
        restoreButton();
        return;
    }
    if (!thumbnail.type.startsWith("image/")) {
        Swal.fire("Invalid File", "Only image files allowed", "warning");
        restoreButton();
        return;
    }
    if (thumbnail.size > 5 * 1024 * 1024) {
        Swal.fire("Too Large", "Image must be under 5MB", "warning");
        restoreButton();
        return;
    }

    // ========== FormData & API Call ==========
    const formData = new FormData();
    formData.append("topic_name", topic);
    formData.append("email", facultyEmail);
    formData.append("class_date", classDate);
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);
    formData.append("meeting_link", meetingLink);
    formData.append("batch_id", batch);
    formData.append("image", thumbnail);

    try {
        const response = await fetch("https://edtech.colaborazia.com/api/admin/add-live-class", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        const result = await response.json();

        if (response.ok && result.success) {
            Swal.fire({
                icon: "success",
                title: "Live Class Published Successfully",
                showConfirmButton: false,
                timer: 1500
            })
            .then(() => {
                // Navigate to list after alert closes
                window.location.href = 'all-live-class.php';
            });

            // Reset form only on success
            document.getElementById("liveClassName").value = "";
            document.getElementById("faculty").value = "";
            document.getElementById("date").value = "";
            document.getElementById("startTime").value = "";
            document.getElementById("endTime").value = "";
            document.getElementById("batchType").value = "";
            document.getElementById("meetingLink").value = "";
            fileInput.value = "";
        } else {
            Swal.fire("Error", result.message || "Failed to add live class", "error");
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire("Server Error", "Something went wrong", "error");
    } finally {
        restoreButton();
    }

    function restoreButton() {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}
function initAddLiveClass() {
    const btn = document.getElementById("addliveclass");
    if (!btn) return;

    // Use click + preventDefault to be 100% safe
    btn.addEventListener("click", addLiveClass);
}

// ----------------------------------Add Live Class Functions End----------------------------------

// ----------------------------------Edit live class start Functions----------------------------------

const updateLiveClassApi = "https://edtech.colaborazia.com/api/admin/update-live-class/";


function redirectToEdit(id) {
    window.location.href = `edit-live-class.php?id=${id}`;
}
document.addEventListener("DOMContentLoaded", function () {
    console.log("Edit live class page loaded");

    const id = getLiveClassIdFromURL();
    if (!id) {
        return;
    }

    // Load dropdown data first, then load & fill the live class
    initEditPage(id);
});

function getLiveClassIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function initEditPage(id) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login again");
        return;
    }

    // 1) Load batches + faculties for dropdowns
    await fetchBatches();    // you already have this function
    await fetchFaculties();  // you already have this function

    // 2) Fetch all live classes and find the one with this id
    try {
        const response = await fetch(liveClassApi, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to load live classes");
        }

        const result = await response.json();
        allLiveClasses = Array.isArray(result) ? result : result.data || result.liveClasses || [];

        const liveClass = allLiveClasses.find(item => String(item.id) === String(id));
        if (!liveClass) {
            // alert("Live class not found");
            return;
        }

        // 3) Prefill the form
        fillEditForm(liveClass);

        // 4) Bind update button
        initUpdateLiveClass(id);
    } catch (error) {
        console.error("Error loading live class for edit:", error);
        alert("Failed to load live class details");
    }
}

function fillEditForm(liveClass) {
    // Cache elements
    const liveClassNameEl = document.getElementById("liveClassName");
    const dateEl = document.getElementById("date");
    const startEl = document.getElementById("startTime");
    const endEl = document.getElementById("endTime");
    const meetingEl = document.getElementById("meetingLink");
    const facultyEl = document.getElementById("faculty");
    const batchEl = document.getElementById("batchType");

    // Topic/title
    liveClassNameEl.value = liveClass.topic || liveClass.topic_name || "";

    // Date handling: accept classDate, class_date or datetime strings and normalize to YYYY-MM-DD
    const rawDate = liveClass.classDate || liveClass.class_date || liveClass.date || "";
    if (rawDate) {
        let datePart = String(rawDate).split("T")[0].split(" ")[0];
        const parsed = new Date(datePart);
        if (!isNaN(parsed.getTime())) {
            const y = parsed.getFullYear();
            const m = String(parsed.getMonth() + 1).padStart(2, "0");
            const d = String(parsed.getDate()).padStart(2, "0");
            dateEl.value = `${y}-${m}-${d}`;
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
            dateEl.value = datePart;
        } else {
            dateEl.value = "";
        }
    } else {
        dateEl.value = "";
    }

    // Time handling: prefer HH:MM (strip seconds if present)
    const normalizeTime = (t) => {
        if (!t) return "";
        const match = String(t).match(/(\d{1,2}:\d{2})/);
        return match ? match[1] : "";
    };

    startEl.value = normalizeTime(liveClass.startTime || liveClass.start_time || "");
    endEl.value = normalizeTime(liveClass.endTime || liveClass.end_time || "");

    // Meeting link
    meetingEl.value = liveClass.meetingLink || liveClass.meeting_link || "";

    // Faculty: API may return faculty as object or string; fetch option value accordingly
    let facultyValue = liveClass.email || liveClass.faculty_email 
     || (liveClass.faculty && liveClass.faculty.email) || (typeof liveClass.faculty === 'string' ? liveClass.faculty : "");
    if (facultyEl && facultyValue) {
        facultyEl.value = facultyValue;
    }

    // Batch: support batch_id, batchId, nested batch object, or direct batch
    let batchValue =  liveClass.batchId || liveClass.batch_id || (liveClass.batch && (liveClass.batch.id || liveClass.batch.batch_id || liveClass.batch._id)) || liveClass.batch;
    if (batchEl && batchValue !== undefined && batchValue !== null) {
        batchEl.value = String(batchValue);
    }
}

function initUpdateLiveClass(id) {
    const btn = document.getElementById("editLiveClass");
    if (!btn) return;

    btn.addEventListener("click", function (event) {
        event.preventDefault();
        updateLiveClass(id);
    });
}

async function updateLiveClass(id) {
    const token = localStorage.getItem("token");
    if (!token) {
        Swal.fire("Unauthorized", "Please login again", "error");
        return;
    }

    const btn = document.getElementById("editLiveClass");
    if (!btn) return;

    btn.disabled = true;
    const originalText = btn.innerHTML;
    btn.innerHTML = "Updating...";

    // Get values
    const topic = document.getElementById("liveClassName").value.trim();
    const facultyEmail = document.getElementById("faculty").value;
    const classDate = document.getElementById("date").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const batch = document.getElementById("batchType").value;
    const meetingLink = document.getElementById("meetingLink").value.trim();
    const fileInput = document.querySelector("#fileUpload input[type='file']");
    const thumbnail = fileInput?.files[0];  // OPTIONAL on edit

    // ========== VALIDATION (similar to add, but image optional) ==========
    if (!topic) {
        Swal.fire("Required", "Live Class Name required", "warning");
        restoreButton();
        return;
    }
    if (!facultyEmail) {
        Swal.fire("Required", "Faculty required", "warning");
        restoreButton();
        return;
    }
    if (!classDate || !startTime || !endTime) {
        Swal.fire("Required", "Date & Time required", "warning");
        restoreButton();
        return;
    }
    if (!batch) {
        Swal.fire("Required", "Please select a Batch", "warning");
        restoreButton();
        return;
    }
    if (!meetingLink) {
        Swal.fire("Required", "Meeting link required", "warning");
        restoreButton();
        return;
    }

    if (thumbnail) {
        if (!thumbnail.type.startsWith("image/")) {
            Swal.fire("Invalid File", "Only image files allowed", "warning");
            restoreButton();
            return;
        }
        if (thumbnail.size > 5 * 1024 * 1024) {
            Swal.fire("Too Large", "Image must be under 5MB", "warning");
            restoreButton();
            return;
        }
    }

    // ========== FormData & API Call (same keys as add-live-class) ==========
    const formData = new FormData();
    formData.append("topic_name", topic);
    formData.append("email", facultyEmail);
    formData.append("class_date", classDate);
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);
    formData.append("meeting_link", meetingLink);
    formData.append("batch_id", batch);

    // image optional on edit – only send if user selected new file
    if (thumbnail) {
        formData.append("image", thumbnail);
    }

    try {
        const response = await fetch(`${updateLiveClassApi}${id}`, {
            method: "POST",   // or "PUT" if your API expects it
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        const result = await response.json();
        console.log("Update result:", result);

        if (response.ok && result.success) {
            Swal.fire({
                icon: "success",
                title: "Live Class Updated Successfully",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                // Go back to list page after success
                window.location.href = "all-live-class.php";
            });
        } else {
            Swal.fire("Error", result.message || "Failed to update live class", "error");
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire("Server Error", "Something went wrong", "error");
    } finally {
        restoreButton();
    }

    function restoreButton() {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

// ----------------------------------Edit live End class Functions----------------------------------



// *************************************delete live class api**********************************************


const deleteLiveClassApi ="https://edtech.colaborazia.com/api/admin/delete-live-class";

async function deleteLiveClass(id) {

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This live class will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (!result.isConfirmed) return;

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${deleteLiveClassApi}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("Delete API RESPONSE:", data);

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Live class deleted successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      fetchLiveClasses(); // refresh list
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: data.message || "Something went wrong.",
      });
    }

  } catch (error) {
    console.error("Delete live class error:", error);

    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Server error. Please try again later.",
    });
  }
}

// *************************************end delete live class api**********************************************
