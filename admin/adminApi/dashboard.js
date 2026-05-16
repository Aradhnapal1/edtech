// const dashboardApi = "https://edtech.colaborazia.com/api/admin/dashboard-report";

// async function loadDashboardStats() {
//     const token = localStorage.getItem("token");

//     console.log("Token 👉", token);

//     try {
//         const response = await fetch(dashboardApi, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             }
//         });

//         console.log("Response status 👉", response.status);

//         const result = await response.json();
//         console.log("Dashboard Data 👉", result);

//         const report = result.report;

//         document.getElementById("totalCourses").innerText =
//             report.purchasedCourses.total;

//         document.getElementById("totalOrders").innerText =
//             report.orders.total;

//         document.getElementById("totalBatches").innerText =
//             report.batches.total;

//         document.getElementById("totalUsers").innerText =
//             report.students.total;

//         document.getElementById("totalCategories").innerText =
//             report.categories.total;

//         document.getElementById("totalLanguages").innerText =
//             report.languages.total;

//         document.getElementById("totalLiveClasses").innerText =
//             report.liveClasses.total;
//        document.getElementById("totalFaculties").innerText =
//     report.faculties.total;

//     } catch (error) {
//         console.error("API Error 👉", error);
//     }
// }

// document.addEventListener("DOMContentLoaded", loadDashboardStats);



const dashboardApi = "https://edtech.colaborazia.com/api/admin/dashboard-report";

document.addEventListener("DOMContentLoaded", loadDashboardStats);

async function loadDashboardStats() {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(dashboardApi, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();
        console.log("Dashboard Data 👉", result);

        const report = result.report;

        // ===================== STATS =====================
        document.getElementById("totalCourses").innerText = report.purchasedCourses.total;
        document.getElementById("totalOrders").innerText = report.orders.total;
        document.getElementById("totalBatches").innerText = report.batches.total;
        document.getElementById("totalUsers").innerText = report.students.total;
        document.getElementById("totalCategories").innerText = report.categories.total;
        document.getElementById("totalLanguages").innerText = report.languages.total;
        document.getElementById("totalLiveClasses").innerText = report.liveClasses.total;
        document.getElementById("totalFaculties").innerText = report.faculties.total;

        // ===================== TABLES =====================
        bindRecentOrders(result.recent_orders);
        bindRecentStudents(result.recent_students);

    } catch (error) {
        console.error("API Error 👉", error);
    }
}


// ================= RECENT ORDERS =================
function bindRecentOrders(orders) {
    const tbody = document.getElementById("recentorder");
    tbody.innerHTML = "";

    orders.forEach(order => {
        const date = new Date(order.created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        const firstLetter = order.user.charAt(0).toUpperCase();

        tbody.innerHTML += `
            <tr>
                <td><span class="id-cell">#${order.id}</span></td>
                <td>
                    <div class="avatar-cell">
                        <div class="mini-avatar">${firstLetter}</div>
                        ${order.user}
                    </div>
                </td>
                <td><span class="amt-badge">₹${order.amount}</span></td>
                <td><span class="date-cell">${date}</span></td>
            </tr>
        `;
    });
}


// ================= RECENT STUDENTS =================
function bindRecentStudents(students) {
    const tbody = document.getElementById("recentstudent");
    tbody.innerHTML = "";

    students.forEach(student => {
         const date = new Date(student.created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        
        const firstLetter = student.name.charAt(0).toUpperCase();

        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="avatar-cell">
                        <div class="mini-avatar">${firstLetter}</div>
                        ${student.name}
                    </div>
                </td>
                <td><span class="email-cell">${student.email}</span></td>
                <td><span class="date-cell">${date}</span></td>
            </tr>
        `;
    });
}
