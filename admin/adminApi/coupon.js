// ********************************************get coupon api start *********************************


const getCouponApi = "https://edtech.colaborazia.com/api/coupon/get-all-coupon";

let currentCouponPage = 1;
const COUPON_PER_PAGE = 8;

// ===============================
// FUNCTION TO LOAD COUPONS
// ===============================
async function loadCoupons() {
    const tbody = document.getElementById("getcoupon");
    tbody.innerHTML = ""; // clear previous data

    try {
        const res = await fetch(getCouponApi, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!res.ok) throw new Error(`Failed to fetch coupons. Status: ${res.status}`);

        const response = await res.json();
        console.log("COUPON API:", response);

        const coupons = response.data || response; // adjust based on API
        window.couponListArray = coupons;
        renderCouponTable(coupons);

    } catch (err) {
        console.error("Coupon Error:", err);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to load coupons. Please try again.",
        });
    }
}

function renderCouponTable(coupons = window.couponListArray, page = 1) {
    const tbody = document.getElementById("getcoupon");
    if (!tbody) return;
    currentCouponPage = page;
    const totalItems = coupons.length;
    const totalPages = Math.ceil(totalItems / COUPON_PER_PAGE);
    if (currentCouponPage < 1) currentCouponPage = 1;
    if (currentCouponPage > totalPages && totalPages > 0) currentCouponPage = totalPages;
    const startIndex = (currentCouponPage - 1) * COUPON_PER_PAGE;
    const endIndex = Math.min(startIndex + COUPON_PER_PAGE, totalItems);
    const pageCoupons = coupons.slice(startIndex, endIndex);

    tbody.innerHTML = "";

    pageCoupons.forEach((coupon, index) => {
        
            const discount =
                coupon.discount_type === "FLAT"
                    ? `₹${coupon.discount_value}`
                    : `${coupon.discount_value}%`;

            const status = coupon.is_active
                ? `<span class="badge bg-success">Active</span>`
                : `<span class="badge bg-danger">Inactive</span>`;

            tbody.innerHTML += `
                <tr>
                    <td class="align-middle">
                        <span class="h6 mb-0 fw-medium text-gray-300">${startIndex + index + 1}</span>
                    </td>
                    <td class="align-middle">
                        <span class="h6 mb-0 fw-medium text-gray-300">${coupon.code}</span>
                    </td>
                    <td class="align-middle">
                        <span class="h6 mb-0 fw-medium text-gray-300">${coupon.discount_type}</span>
                    </td>
                    <td class="align-middle">
                        <span class="h6 mb-0 fw-medium text-gray-300">${discount}</span>
                    </td>
                    <td class="align-middle">
                        <span class="h6 mb-0 fw-medium text-gray-300">₹${coupon.min_order_value}</span>
                    </td>
                    <td class="align-middle">
                        <span class="h6 mb-0 fw-medium text-gray-300">₹${coupon.max_discount}</span>
                    </td>
                    <td class="align-middle">
                        <span class="h6 mb-0 fw-medium text-gray-300">${coupon.start_date.split("T")[0]}</span>
                    </td>
                    <td class="align-middle">
                        <span class="h6 mb-0 fw-medium text-gray-300">${coupon.end_date.split("T")[0]}</span>
                    </td>
                    <td class="align-middle">${status}</td>
                    <td class="align-middle">
                        <i class="bi bi-pencil-square text-success fs-5 cursor-pointer"
                           onclick="editCoupon(${coupon.id})"></i>
                    </td>
                    <td class="align-middle">
                        <i class="bi bi-trash text-danger fs-5 cursor-pointer"
                           onclick="deleteCoupon(${coupon.id})"></i>
                    </td>
                </tr>
            `;
        });

    renderCouponPagination(totalItems, startIndex, endIndex, totalPages);
}
window.renderCouponTable = renderCouponTable;

function renderCouponPagination(totalItems, startIndex, endIndex, totalPages) {
    const tableBody = document.getElementById('getcoupon');
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
        const activeClass = i === currentCouponPage ? 'active' : '';
        paginationHTML += `
            <li class="page-item ${activeClass}">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium cursor-pointer" onclick="window.renderCouponTable(window.couponListArray, ${i})">${i}</a>
            </li>
        `;
    }
    paginationHTML += `</ul></div>`;
    footer.innerHTML = paginationHTML;
}

// ===============================
// CALL FUNCTION TO LOAD COUPONS
// ===============================
document.addEventListener("DOMContentLoaded", loadCoupons);






//   ************************************** get api end ********************************************




// **************************************ADD API START ***********************************************
document.addEventListener("DOMContentLoaded", function () {
    // const addCouponApi = "http://edtech.colaborazia.com/api/coupon/add-coupon";
    const addCouponApi = "https://edtech.colaborazia.com/api/coupon/add-coupon";
    const publishBtn = document.getElementById("publishCouponBtn");
    const courseDropdown = document.getElementById("courseId");

    if (!publishBtn || !courseDropdown) return;

    // ===============================
    // LOAD COURSES
    // ===============================
    async function loadCoursesDropdown() {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("❌ No token found. Please log in.");
            return;
        }

        courseDropdown.innerHTML = '<option value="">Select Course</option>';

        try {
            const res = await fetch(
                "https://edtech.colaborazia.com/api/admin/get-all-course",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!res.ok) {
                throw new Error(`Failed to load courses. Status: ${res.status}`);
            }

            const data = await res.json();
            (data.data || []).forEach(course => {
                const opt = document.createElement("option");
                opt.value = course.id;
                opt.textContent = course.course_name;
                courseDropdown.appendChild(opt);
            });

        } catch (err) {
            console.error("❌ Course load error:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load courses. Please try again."
            });
        }
    }

    loadCoursesDropdown();

    // ===============================
    // ADD COUPON
    // ===============================
    publishBtn.addEventListener("click", async function () {
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "Unauthorized",
                text: "Please log in."
            });
            return;
        }

        if (!courseDropdown.value) {
            Swal.fire({
                icon: "warning",
                title: "Validation",
                text: "Please select a course."
            });
            return;
        }

        const code = document.getElementById("couponCode").value.trim();
        if (!code) {
            Swal.fire({
                icon: "warning",
                title: "Validation",
                text: "Coupon code is required."
            });
            return;
        }

        const discountType = document.getElementById("discountType").value;
        const discountValue = Number(document.getElementById("discountValue").value);
        const minOrderValue = Number(document.getElementById("minOrderValue").value || 0);
        const maxDiscount = Number(document.getElementById("maxDiscount").value || 0);
        const startDate = document.getElementById("startdate").value;
        const endDate = document.getElementById("enddate").value;
        const isActive = document.getElementById("statusCoupon").checked ? true : false;

        if (discountValue <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Validation",
                text: "Discount value must be greater than 0."
            });
            return;
        }

        if (!startDate || !endDate) {
            Swal.fire({
                icon: "warning",
                title: "Validation",
                text: "Start date and end date are required."
            });
            return;
        }

        const formData = new FormData();
        formData.append("couponName", code);
        formData.append("discount_type", discountType);
        formData.append("discount_value", discountValue);
        formData.append("min_order_value", minOrderValue);
        formData.append("max_discount", maxDiscount);
        formData.append("course_id", courseDropdown.value);
        formData.append("usage_limit_per_user", 1);
        formData.append("total_usage_limit", 1);
        formData.append("start_date", startDate);
        formData.append("end_date", endDate);
        formData.append("is_active", isActive);

        publishBtn.disabled = true;
        publishBtn.innerText = "Saving...";

        try {
            const res = await fetch(addCouponApi, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            let data = null;
            const ct = res.headers.get("content-type");
            if (ct && ct.includes("application/json")) {
                data = await res.json();
            }

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Coupon saved successfully ✅"
                }).then(() => {
                window.location.href = 'all-coupon.php'; // Redirect to list page
            });

                document.getElementById("couponCode").value = "";
                document.getElementById("discountType").value = "";
                document.getElementById("discountValue").value = "";
                document.getElementById("minOrderValue").value = "";
                document.getElementById("maxDiscount").value = "";
                document.getElementById("startdate").value = "";
                document.getElementById("enddate").value = "";
                courseDropdown.value = "";
                document.getElementById("statusCoupon").checked = true;

                return;
            }

            Swal.fire({
                icon: "error",
                title: "Failed",
                text: data?.message || "Failed to save coupon ❌"
            });

        } catch (err) {
            console.error("❌ Add coupon error:", err);
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Something went wrong ❌"
            });
        } finally {
            publishBtn.disabled = false;
            publishBtn.innerText = "Publish Coupon";
        }
    });
});

// **************************************ADD API END ***********************************************




// **************************************DELETE API START *******************************************

// const deleteapi = "http://edtech.colaborazia.com/api/coupon/delete-coupon";


async function deleteCoupon(id) {
    if (!id) return;

    const confirmResult = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });

    if (!confirmResult.isConfirmed) return;

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire('Unauthorized', 'Please login again', 'error');
            return;
        }

        const res = await fetch(`https://edtech.colaborazia.com/api/coupon/delete-coupon/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            const errorData = await res.json();
            Swal.fire('Failed', errorData.message || 'Failed to delete coupon', 'error');
            return;
        }

        Swal.fire('Deleted!', '✅ Coupon deleted successfully!', 'success');

        // Reload courses table after deletion
        loadCoupons();

    } catch (err) {
        console.error("Delete coupon error:", err);
        Swal.fire('Error', 'An error occurred while deleting the coupon.', 'error');
    }
}
// *********************************** DELETE API END **************************************************



// ******************************EDIT API START ***********************************************
// ************************************** EDIT API START ***********************************************
// ************************************** EDIT API START ***********************************************

// Add this function for handling edit click (this goes in your list page script)
function editCoupon(couponId) {
    // Redirect to edit page with coupon ID
    window.location.href = `edit-coupon.php?id=${couponId}`;
}

// This script goes in your edit-coupon.php page (in a <script> tag at the bottom or external JS file)
// Ensure SweetAlert2 is included.
document.addEventListener("DOMContentLoaded", async function () {
    const editBtn = document.getElementById("editCouponBtn"); // Updated to match your button ID
    const courseDropdown = document.getElementById("courseId");

    if (!courseDropdown || !editBtn) return;

    // ===============================
    // LOAD COURSES (same as add)
    // ===============================
    async function loadCoursesDropdown() {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("❌ No token found. Please log in.");
            return;
        }

        courseDropdown.innerHTML = '<option value="">Select Course</option>';

        try {
            const res = await fetch(
                "https://edtech.colaborazia.com/api/admin/get-all-course",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!res.ok) {
                throw new Error(`Failed to load courses. Status: ${res.status}`);
            }

            const data = await res.json();
            (data.data || []).forEach(course => {
                const opt = document.createElement("option");
                opt.value = course.id;
                opt.textContent = course.course_name;
                courseDropdown.appendChild(opt);
            });

        } catch (err) {
            console.error("❌ Course load error:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load courses. Please try again."
            });
        }
    }

    // Always load courses first
    await loadCoursesDropdown();

    const urlParams = new URLSearchParams(window.location.search);
    const couponId = urlParams.get('id');

    if (couponId) {
        // Fetch coupon data to populate form (after courses are loaded)
        await fetchCouponData(couponId);

        // Change button text to indicate edit mode
        editBtn.textContent = 'Update Coupon';
        editBtn.id = 'editCouponBtn'; // Ensure ID remains for event listener
    } else {
        // If no ID (add mode), but since edit-coupon.php, assume edit; adjust if dual-purpose
        editBtn.textContent = 'Publish Coupon';
    }

    // Handle button click for update
    editBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        if (couponId) {
            await updateCoupon(couponId);
        } else {
            // If dual-purpose for add, call add logic here; for now, assuming edit-only
            console.warn("No coupon ID found for update.");
        }
    });
});

async function fetchCouponData(couponId) {
    // const editApi = `http://edtech.colaborazia.com/api/coupon/get-coupon/${couponId}`;
    const editApi = `https://edtech.colaborazia.com/api/coupon/get-coupon/${couponId}`;

    try {
        const res = await fetch(editApi, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!res.ok) throw new Error(`Failed to fetch coupon. Status: ${res.status}`);

        const response = await res.json();
        console.log("EDIT COUPON API:", response);
        const coupon = response.data || response; // Adjust based on API response structure

        // Populate form fields
        document.getElementById('couponCode').value = coupon.code || coupon.couponName || '';
        document.getElementById('discountType').value = coupon.discount_type || '';
        document.getElementById('discountValue').value = coupon.discount_value || '';
        document.getElementById('minOrderValue').value = coupon.min_order_value || '';
        document.getElementById('maxDiscount').value = coupon.max_discount || '';
        document.getElementById('startdate').value = coupon.start_date ? coupon.start_date.split('T')[0] : '';
        document.getElementById('enddate').value = coupon.end_date ? coupon.end_date.split('T')[0] : '';

        // Set course dropdown value (now populated)
        if (coupon.course_id) {
            document.getElementById('courseId').value = coupon.course_id;
        }

        // For status checkbox
        document.getElementById('statusCoupon').checked = coupon.is_active || false;
        updateStatusLabel(); // Call helper to update label if needed

    } catch (err) {
        console.error("Fetch Coupon Error:", err);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to load coupon data. Please try again.",
        });
    }
}

async function updateCoupon(couponId) {
    const token = localStorage.getItem("token");
    if (!token) {
        Swal.fire({
            icon: "warning",
            title: "Unauthorized",
            text: "Please log in."
        });
        return;
    }

    const courseDropdown = document.getElementById('courseId');
    if (!courseDropdown.value) {
        Swal.fire({
            icon: "warning",
            title: "Validation",
            text: "Please select a course."
        });
        return;
    }

    // Collect form values (with validation similar to add)
    const code = document.getElementById('couponCode').value.trim();
    if (!code) {
        Swal.fire({
            icon: "warning",
            title: "Validation",
            text: "Coupon code is required."
        });
        return;
    }

    const discountType = document.getElementById('discountType').value;
    const discountValue = Number(document.getElementById('discountValue').value);
    const minOrderValue = Number(document.getElementById('minOrderValue').value || 0);
    const maxDiscount = Number(document.getElementById('maxDiscount').value || 0);
    const startDate = document.getElementById('startdate').value;
    const endDate = document.getElementById('enddate').value;
    // const isActive = document.getElementById('statusCoupon').checked ? 1 : 0; // 1/0 as boolean
    const isActive = document.getElementById('statusCoupon').checked; // boolean

    if (discountValue <= 0) {
        Swal.fire({
            icon: "warning",
            title: "Validation",
            text: "Discount value must be greater than 0."
        });
        return;
    }

    if (!startDate || !endDate) {
        Swal.fire({
            icon: "warning",
            title: "Validation",
            text: "Start date and end date are required."
        });
        return;
    }

    const formData = new FormData();
    formData.append("id", couponId); // Include ID for update
    formData.append("couponName", code);
    formData.append("discount_type", discountType);
    formData.append("discount_value", discountValue);
    formData.append("min_order_value", minOrderValue);
    formData.append("max_discount", maxDiscount);
    formData.append("course_id", courseDropdown.value);
    formData.append("usage_limit_per_user", 1);
    formData.append("total_usage_limit", 1);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("is_active", isActive);

    const editBtn = document.getElementById("editCouponBtn");
    if (editBtn) {
        editBtn.disabled = true;
        editBtn.innerText = "Updating...";
    }

    try {
        const res = await fetch(`https://edtech.colaborazia.com/api/coupon/update-coupon/${couponId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        let data = null;
        const ct = res.headers.get("content-type");
        if (ct && ct.includes("application/json")) {
            data = await res.json();
        }

        if (res.ok) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Coupon updated successfully ✅",
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                window.location.href = 'all-coupon.php'; // Redirect to list page
            });

            return;
        }

        Swal.fire({
            icon: "error",
            title: "Failed",
            text: data?.message || "Failed to update coupon ❌"
        });

    } catch (err) {
        console.error("Update Coupon Error:", err);
        Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "Something went wrong ❌"
        });
    } finally {
        if (editBtn) {
            editBtn.disabled = false;
            editBtn.innerText = "Update Coupon";
        }
    }
}

// Helper to update status label dynamically
function updateStatusLabel() {
    const checkbox = document.getElementById('statusCoupon');
    const label = document.getElementById('statuscheckcoupon');
    if (checkbox && label) {
        label.textContent = checkbox.checked ? 'Active' : 'Inactive';
    }
}

if (document.getElementById('statusCoupon')) {
    document.getElementById('statusCoupon').addEventListener('change', updateStatusLabel);
}

// ************************************** EDIT API END ***********************************************