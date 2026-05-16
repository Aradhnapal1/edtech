const orderAll = "https://edtech.colaborazia.com/api/order/all-order";
const token = localStorage.getItem("token");

let currentOrderPage = 1;
const ORDER_PER_PAGE = 8;

document.addEventListener("DOMContentLoaded", () => {
  // --- Route to logic for all-order.php ---
  if (document.getElementById("orderTableBody")) {
    fetchOrders();
  }

  // --- Route to logic for order-detail.php ---
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("id");
  if (document.getElementById("orderItemsTable") && orderId) {
    fetchOrderDetails(orderId);
  }
});

async function fetchOrders() {
  try {
    const response = await fetch(orderAll, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    const orderTableBody = document.getElementById("orderTableBody");
    orderTableBody.innerHTML = "";

    if (result.success) {
      const orders = result.data; // ✅ yahi main array hai
      window.orderListArray = orders;
      renderOrderTable(orders);
    } else {
      console.error("API Error:", result.message);
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}

function renderOrderTable(orders = window.orderListArray, page = 1) {
    const orderTableBody = document.getElementById("orderTableBody");
    if (!orderTableBody) return;
    
    currentOrderPage = page;
    const totalItems = orders.length;
    const totalPages = Math.ceil(totalItems / ORDER_PER_PAGE);
    if (currentOrderPage < 1) currentOrderPage = 1;
    if (currentOrderPage > totalPages && totalPages > 0) currentOrderPage = totalPages;
    const startIndex = (currentOrderPage - 1) * ORDER_PER_PAGE;
    const endIndex = Math.min(startIndex + ORDER_PER_PAGE, totalItems);
    const pageOrders = orders.slice(startIndex, endIndex);
    
    orderTableBody.innerHTML = "";
    
    pageOrders.forEach((order, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td class="align-middle">
            <span class="h6 mb-0 fw-medium text-gray-300">${startIndex + index + 1}</span>
        </td>

        <td class="align-middle">
            <span class="h6 mb-0 fw-medium text-gray-300">${order.user?.firstName || "N/A"}</span>
        </td>

        <td class="align-middle">
            <span class="h6 mb-0 fw-medium text-gray-300">${order.subtotal}</span>
        </td>

        <td class="align-middle">
            <span class="h6 mb-0 fw-medium text-gray-300">${order.discount_amount}</span>
        </td>

        <td class="align-middle">
            <span class="h6 mb-0 fw-medium text-gray-300">${order.total_amount}</span>
        </td>

        <td class="align-middle">
            <span class="badge bg-success-50 text-success-600 px-16 py-6 rounded-pill fw-medium">${order.payment_status}</span>
        </td>

        <td class="align-middle">
            <span class="badge bg-info-50 text-info-600 px-16 py-6 rounded-pill fw-medium">${order.order_status}</span>
        </td>

  <td class="align-middle">
    <i class="bi bi-eye text-dark fs-5 cursor-pointer"
       onclick="viewOrder(${order.id})"></i>
</td>
   
    `;

        orderTableBody.appendChild(row);
      });
      
      renderOrderPagination(totalItems, startIndex, endIndex, totalPages);
}
window.renderOrderTable = renderOrderTable;

function renderOrderPagination(totalItems, startIndex, endIndex, totalPages) {
    const tableBody = document.getElementById('orderTableBody');
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
        const activeClass = i === currentOrderPage ? 'active' : '';
        paginationHTML += `
            <li class="page-item ${activeClass}">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium cursor-pointer" onclick="window.renderOrderTable(window.orderListArray, ${i})">${i}</a>
            </li>
        `;
    }
    paginationHTML += `</ul></div>`;
    footer.innerHTML = paginationHTML;
}

function viewOrder(orderId) {
  window.location.href = `order-detail.php?id=${orderId}`;
}

// =================================================
// =========== LOGIC FOR ORDER DETAIL PAGE ===========
// =================================================
const getOrderDetailApi =
  "https://edtech.colaborazia.com/api/order/get-order-detail";

async function fetchOrderDetails(orderId) {
  if (!token) {
    console.error("Token not found");
    return;
  }

  try {
    const response = await fetch(`${getOrderDetailApi}/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Order Details from API:", result);

    if (result.success || result.order) {
      populateOrderDetails(result);
    } else {
      console.error("API Error:", result.message);
    }
  } catch (error) {
    console.error("Error fetching order details:", error);
  }
}

function populateOrderDetails(data) {
  const order = data.order || {};
  const user = data.user || {};
  const items = data.items || [];

  // Order Summary
  document.getElementById("orderNumber").textContent = order.id || "";
  document.getElementById("subtotal").textContent =
    `₹${parseFloat(order.subtotal || 0).toLocaleString("en-IN")}`;
  document.getElementById("discount").textContent =
    `- ₹${parseFloat(order.discount_amount || 0).toLocaleString("en-IN")}`;
  document.getElementById("totalAmount").textContent =
    `₹${parseFloat(order.total_amount || 0).toLocaleString("en-IN")}`;

  // Statuses
  const paymentStatusEl = document.getElementById("paymentStatus");
  paymentStatusEl.textContent = order.payment_status || "UNKNOWN";
  paymentStatusEl.className =
    order.payment_status === "PAID"
      ? "badge bg-success-50 text-success-600 px-16 py-6 rounded-pill fw-medium"
      : "badge bg-warning-50 text-warning-600 px-16 py-6 rounded-pill fw-medium";

  const orderStatusEl = document.getElementById("orderStatus");
  orderStatusEl.textContent = order.order_status || "UNKNOWN";
  orderStatusEl.className =
    order.order_status === "CONFIRMED"
      ? "badge bg-success-50 text-success-600 px-16 py-6 rounded-pill fw-medium"
      : "badge bg-primary-50 text-primary-600 px-16 py-6 rounded-pill fw-medium";

  // Customer Details (Setting Full Name properly from User Object)
  document.getElementById("customerName").textContent =
    user.fullName ||
    user.firstName + " " + user.lastName ||
    user.username ||
    "N/A";
  document.getElementById("customerEmail").textContent = user.email || "N/A";
  document.getElementById("customerPhone").textContent = user.mobile || "N/A";

  // Order Items Table
  const itemsTableBody = document.getElementById("orderItemsTable");
  itemsTableBody.innerHTML = ""; // Clear existing content

  items.forEach((item) => {
    const imageUrl =
      item.course_image && item.course_image.startsWith("http")
        ? item.course_image
        : `https://edtech.colaborazia.com${item.course_image || ""}`;
    const row = `
            <tr>
                <td class="ps-20">
                    <div class="flex-align gap-12">
                        <img src="${imageUrl}" alt="${item.course_name || "Course"}" class="rounded-8" style="width: 70px; height: 50px; object-fit: cover;">
                        <div>
                            <h6 class="mb-4 text-15">${item.course_name || "N/A"}</h6>
                            <span class="text-13 text-gray-400">Course ID: ${item.course_id || "N/A"}</span>
                        </div>
                    </div>
                </td>
                <td class="text-end text-gray-500 fw-medium">₹${parseFloat(item.saling_price || item.price || 0).toLocaleString("en-IN")}</td>
                <td class="text-end text-gray-500 fw-medium">${item.quantity || 1}</td>
                <td class="text-end text-heading fw-bold pe-20">₹${parseFloat(item.total || 0).toLocaleString("en-IN")}</td>
            </tr>
        `;
    itemsTableBody.innerHTML += row;
  });
}
