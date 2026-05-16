const orderHistoryUrl = "https://edtech.colaborazia.com/api/user/purchase-history";

document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.getElementById("purchaseHistoryTableBody");
    if (!tableBody) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Please login to view purchase history.</td></tr>`;
        return;
    }

    try {
        const response = await fetch(orderHistoryUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok && data.success && data.purchases && data.purchases.length > 0) {
            tableBody.innerHTML = ""; // Clear loading state

            data.purchases.forEach(purchase => {
                const order = purchase.order;
                const items = purchase.items || [];

                // Date ko format karna ("April 11, 2026")
                const dateObj = new Date(order.createdAt);
                const formattedDate = dateObj.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                });

                // Courses ki list generate karna
                let coursesHtml = "";
                items.forEach(item => {
                    coursesHtml += `<p>${item.courseName}</p>`;
                });
                if (!coursesHtml) {
                    coursesHtml = "<p>No courses found</p>";
                }

                // Amount ko format karna (eg: ₹12000.00) aur aapke template styles lagana
                const totalAmountStr = parseFloat(order.totalAmount || 0).toFixed(2);
                const amountSplit = totalAmountStr.split(".");
                const amountHtml = `₹${amountSplit[0]}.<small class="separator">${amountSplit[1]}</small>`;

                // Status ke base par CSS Class determine karna (design template match ke liye)
                let statusClass = "";
                let statusText = order.orderStatus || "Processing";
                const statusUpper = statusText.toUpperCase();
                
                if (statusUpper === "CONFIRMED" || statusUpper === "COMPLETED" || statusUpper === "PAID") {
                    statusClass = "completed"; // Green badge class
                } else if (statusUpper === "CANCELLED") {
                    statusClass = "cancelled"; // Red badge class
                } else if (statusUpper === "ON HOLD" || statusUpper === "PENDING") {
                    statusClass = "hold"; // Yellow badge class
                }

                // Dynamically HTML generate karna
                const rowHtml = `
                    <tr>
                        <td>
                            <div class="dashboard-table__mobile-heading">ID</div>
                            <div class="dashboard-table__text">#${order.orderId}</div>
                        </td>
                        <td class="course-info">
                            <div class="dashboard-table__mobile-heading">Courses</div>
                            <div class="dashboard-table__text">${coursesHtml}</div>
                        </td>
                        <td class="correct">
                            <div class="dashboard-table__mobile-heading">Amount</div>
                            <div class="dashboard-table__text"><span class="sale-price">${amountHtml}</span></div>
                        </td>
                        <td class="incorrect">
                            <div class="dashboard-table__mobile-heading">Status</div>
                            <div class="dashboard-table__text ${statusClass}">${statusText}</div>
                        </td>
                        <td class="earned">
                            <div class="dashboard-table__mobile-heading">Date</div>
                            <div class="dashboard-table__text">${formattedDate}</div>
                        </td>
                    </tr>
                `;
                tableBody.insertAdjacentHTML("beforeend", rowHtml);
            });
        } else {
            tableBody.innerHTML = `<tr><td colspan="5" class="text-center">No purchase history found.</td></tr>`;
        }
    } catch (error) {
        console.error("Error fetching purchase history:", error);
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Failed to load purchase history.</td></tr>`;
    }
});
