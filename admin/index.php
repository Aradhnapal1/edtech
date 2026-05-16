<?php include './include/header.php'; ?>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');

    .db-wrap * {
        box-sizing: border-box;
    }

    .db-wrap {
        font-family: 'DM Sans', sans-serif;
        background: #e6e6e6;
        padding: 2rem 1.5rem 3rem;
        min-height: 100vh;
        color: #1a1a1a;
    }

    /* ── Welcome Banner ── */
    .db-welcome {
        background: #fff;
        border: 0.5px solid rgba(0, 0, 0, 0.09);
        border-radius: 14px;
        padding: 1.75rem 2rem;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        position: relative;
        overflow: hidden;
    }

    .db-welcome::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #2b3990 0%, #C4A882 50%, #EDE0D0 100%);
        border-radius: 14px 14px 0 0;
    }

    .db-welcome-text h2 {
        font-family: 'Playfair Display', serif;
        font-size: 22px;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 4px;
        letter-spacing: 0.01em;
    }

    .db-welcome-text p {
        font-size: 13px;
        color: #aaa;
    }

    .db-date-chip {
        display: flex;
        align-items: center;
        gap: 7px;
        font-size: 12px;
        color: #888;
        background: #faf9f7;
        border: 0.5px solid rgba(0, 0, 0, 0.09);
        border-radius: 20px;
        padding: 6px 14px;
        white-space: nowrap;
        flex-shrink: 0;
    }

    /* ── Stat Cards ── */
    .db-stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    @media (max-width: 1100px) {
        .db-stats {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 560px) {
        .db-stats {
            grid-template-columns: 1fr;
        }
    }

    .stat-card {
        background: #fff;
        border: 0.5px solid rgba(0, 0, 0, 0.09);
        border-radius: 14px;
        padding: 1.4rem 1.5rem;
        transition: transform 0.18s, box-shadow 0.18s;
    }

    .stat-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(139, 111, 71, 0.09);
    }

    .stat-card-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 14px;
    }

    .stat-icon {
        width: 42px;
        height: 42px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .stat-card.c1 .stat-icon {
        background: #F5EFE6;
        color: #2b3990;
    }

    .stat-card.c2 .stat-icon {
        background: #EAF3DE;
        color: #3B6D11;
    }

    .stat-card.c3 .stat-icon {
        background: #E6F1FB;
        color: #185FA5;
    }

    .stat-card.c4 .stat-icon {
        background: #FAEEDA;
        color: #854F0B;
    }

    .stat-card.c5 .stat-icon {
        background: #F3E8FF;
        /* soft purple */
        color: #6B21A8;
    }

    .stat-card.c6 .stat-icon {
        background: #E0F7F4;
        /* soft teal */
        color: #0F766E;
    }

    .stat-card.c7 .stat-icon {
        background: #FFE4E6;
        /* soft rose */
        color: #BE123C;
    }

    .stat-card.c8 .stat-icon {
        background: #EDE9FE;
        /* soft indigo */
        color: #4338CA;
    }

    .stat-accent {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-top: 6px;
    }

    .stat-card.c1 .stat-accent {
        background: #2b3990;
    }

    .stat-card.c2 .stat-accent {
        background: #3B6D11;
    }

    .stat-card.c3 .stat-accent {
        background: #185FA5;
    }

    .stat-card.c4 .stat-accent {
        background: #854F0B;
    }

    .stat-value {
        font-family: 'Playfair Display', serif;
        font-size: 30px;
        font-weight: 600;
        color: #1a1a1a;
        line-height: 1;
        margin-bottom: 5px;
        letter-spacing: -0.5px;
    }

    .stat-label {
        font-size: 11px;
        color: #aaa;
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    /* ── Charts ── */
    .db-charts {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    @media (max-width: 900px) {
        .db-charts {
            grid-template-columns: 1fr;
        }
    }

    .chart-card {
        background: #fff;
        border: 0.5px solid rgba(0, 0, 0, 0.09);
        border-radius: 14px;
        overflow: hidden;
    }

    .chart-card-header {
        padding: 1.1rem 1.4rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4px;
    }

    .chart-card-header h5 {
        font-family: 'Playfair Display', serif;
        font-size: 15px;
        font-weight: 500;
        color: #1a1a1a;
    }

    .chart-badge {
        font-size: 10px;
        font-weight: 500;
        padding: 3px 10px;
        border-radius: 20px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    .chart-badge.amber {
        background: #F5EFE6;
        color: #2b3990;
    }

    .chart-badge.green {
        background: #EAF3DE;
        color: #3B6D11;
    }

    .chart-card-body {
        padding: 4px 6px 10px;
    }

    /* ── Tables ── */
    .db-tables {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    @media (max-width: 900px) {
        .db-tables {
            grid-template-columns: 1fr;
        }
    }

    .table-card {
        background: #fff;
        border: 0.5px solid rgba(0, 0, 0, 0.09);
        border-radius: 14px;
        overflow: hidden;
    }

    .table-card-header {
        padding: 1rem 1.25rem;
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.07);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .table-card-header h5 {
        font-family: 'Playfair Display', serif;
        font-size: 15px;
        font-weight: 500;
        color: #1a1a1a;
    }

    .table-card-header a {
        font-size: 12px;
        color: #2b3990;
        text-decoration: none;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .table-card-header a:hover {
        text-decoration: underline;
    }

    .db-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
    }

    .db-table thead tr th {
        padding: 9px 18px;
        background: #faf9f7;
        color: #bbb;
        font-weight: 500;
        font-size: 10px;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        text-align: left;
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.07);
        white-space: nowrap;
    }

    .db-table tbody tr td {
        padding: 11px 18px;
        color: #444;
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.04);
        vertical-align: middle;
    }

    .db-table tbody tr:last-child td {
        border-bottom: none;
    }

    .db-table tbody tr:hover td {
        background: #faf9f7;
    }

    .amt-badge {
        display: inline-block;
        background: #EAF3DE;
        color: #3B6D11;
        font-size: 12px;
        font-weight: 500;
        padding: 3px 9px;
        border-radius: 6px;
    }

    .id-cell {
        color: #bbb;
        font-size: 12px;
        font-family: 'DM Mono', 'Courier New', monospace;
    }

    .avatar-cell {
        display: flex;
        align-items: center;
        gap: 9px;
    }

    .mini-avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #F5EFE6;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 500;
        color: #2b3990;
        flex-shrink: 0;
        text-transform: uppercase;
    }

    .date-cell {
        color: #bbb;
        font-size: 12px;
    }

    .email-cell {
        color: #999;
        font-size: 12px;
        max-width: 160px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media (max-width: 600px) {
        .db-wrap {
            padding: 1rem;
        }

        .db-welcome {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 1.25rem;
        }

        .db-welcome-text h2 {
            font-size: 18px;
        }

        .db-date-chip {
            display: none;
        }
    }
</style>



<div class="db-wrap">


    <div class="db-welcome">
        <div class="db-welcome-text">
            <h2>Welcome back, Admin</h2>
            <p>Here's what's happening with your platform today.</p>
        </div>
        <div class="db-date-chip" id="currentdata">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3" width="12" height="11" rx="2" stroke="#C4A882" stroke-width="1.2"></rect>
                <path d="M5 1v3M11 1v3M2 7h12" stroke="#C4A882" stroke-width="1.2" stroke-linecap="round"></path>
            </svg>
            <span id="dateTime"></span>
        </div>

        <script>
            function updateDateTime() {
                const now = new Date();

                const options = {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                };

                const date = now.toLocaleDateString('en-IN', options);

                let hours = now.getHours();
                let minutes = now.getMinutes();
                let ampm = hours >= 12 ? 'PM' : 'AM';

                hours = hours % 12;
                hours = hours ? hours : 12; // 0 => 12
                minutes = minutes < 10 ? '0' + minutes : minutes;

                const time = `${hours}:${minutes} ${ampm}`;

                document.getElementById("dateTime").innerText = `${date} ${time}`;
            }

            // Initial call
            updateDateTime();

            // Update every minute
            setInterval(updateDateTime, 60000);
        </script>
    </div>



    <div class="db-stats">

        <!-- Total Courses -->
        <div class="stat-card c1">
            <div class="stat-card-top">
                <div class="stat-icon"><i class="fa-solid fa-layer-group"></i></div>

            </div>
            <div class="stat-value" id="totalCourses">0</div>
            <div class="stat-label">Total Courses</div>
        </div>

        <!-- Total Orders -->
        <div class="stat-card c2">
            <div class="stat-card-top">
                <div class="stat-icon"><i class="fa-solid fa-cart-shopping"></i></div>

            </div>
            <div class="stat-value" id="totalOrders">0</div>
            <div class="stat-label">Total Orders</div>
        </div>

        <!-- Total Batches -->
        <div class="stat-card c3">
            <div class="stat-card-top">
                <div class="stat-icon"><i class="fa-solid fa-calendar-days"></i></div>

            </div>
            <div class="stat-value" id="totalBatches">0</div>
            <div class="stat-label">Total Batches</div>
        </div>

        <!-- Total Users -->
        <div class="stat-card c4">
            <div class="stat-card-top">
                <div class="stat-icon"><i class="fa-solid fa-users"></i></div>

            </div>
            <div class="stat-value" id="totalUsers">0</div>
            <div class="stat-label">Total Users</div>
        </div>

        <!-- Total Categories -->
        <div class="stat-card c5">
            <div class="stat-card-top">
                <div class="stat-icon"><i class="fa-solid fa-list"></i></div>

            </div>
            <div class="stat-value" id="totalCategories">0</div>
            <div class="stat-label">Total Categories</div>
        </div>

        <!-- Total Languages -->
        <div class="stat-card c6">
            <div class="stat-card-top">
                <div class="stat-icon"><i class="fa-solid fa-language"></i></div>

            </div>
            <div class="stat-value" id="totalLanguages">0</div>
            <div class="stat-label">Total Languages</div>
        </div>

        <!-- Live Classes -->
        <div class="stat-card c7">
            <div class="stat-card-top">
                <div class="stat-icon"><i class="fa-solid fa-video"></i></div>

            </div>
            <div class="stat-value" id="totalLiveClasses">0</div>
            <div class="stat-label">Live Classes</div>
        </div>

        <!-- Total Faculties -->
        <div class="stat-card c8">
            <div class="stat-card-top">
                <div class="stat-icon"><i class="fa-solid fa-chalkboard-user"></i></div>

            </div>
            <div class="stat-value" id="totalFaculties">0</div>
            <div class="stat-label">Total Faculties</div>
        </div>

    </div>
    <style>
        .stat-card-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .stat-icon {
            font-size: 20px;
            opacity: 0.9;
        }

        .stat-accent {
            width: 40px;
            height: 4px;
            border-radius: 10px;
            background: currentColor;
            opacity: .3;
        }
    </style>



    <div class="db-charts">
        <div class="chart-card">
            <div class="chart-card-header">
                <h5>User Growth</h5>
                <span class="chart-badge amber">Monthly</span>
            </div>
            <div class="chart-card-body">
                <div id="userChart">
                    <div id="apexcharts0owlwt2l" class="apexcharts-canvas apexcharts0owlwt2l"></div>
                </div>
            </div>
        </div>
        <div class="chart-card">
            <div class="chart-card-header">
                <h5>Order Trends</h5>
                <span class="chart-badge green">Monthly</span>
            </div>
            <div class="chart-card-body">
                <div id="orderChart">
                    <div id="apexcharts2p0st3fxk" class="apexcharts-canvas apexcharts2p0st3fxk"></div>
                </div>
            </div>
        </div>
    </div>


    <div class="db-tables">


        <div class="table-card">
            <div class="table-card-header">
                <h5>Recent Orders</h5>
                <a href="order.php">View all
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                    </svg>
                </a>
            </div>
            <table class="db-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody id="recentorder">

                </tbody>
            </table>
        </div>


        <div class="table-card">
            <div class="table-card-header">
                <h5>Recent Users</h5>
                <a href="all-students.php">View all
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                    </svg>
                </a>
            </div>
            <table class="db-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Joined</th>
                    </tr>
                </thead>
                <tbody id="recentstudent">

                </tbody>
            </table>
        </div>

    </div>

</div>


<?php include './include/footer.php'; ?>