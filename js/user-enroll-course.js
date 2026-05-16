// ********************************** APIs **********************************
const myCourseAPI = "https://edtech.colaborazia.com/api/user/my-course";
const batchAPI = "https://edtech.colaborazia.com/api/user/my-batch";
const liveClassAPI = "https://edtech.colaborazia.com/api/user/get-all-live-class";

// ********************************** Utility: Get course_id from URL **********************************
function getCourseIdFromURL() {
  return new URLSearchParams(window.location.search).get("course_id");
}

// ********************************** 1. Fetch & Render My Courses **********************************
async function getMyCourses() {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    console.warn("No auth token found, cannot fetch courses.");
    return;
  }

  const container = document.getElementById("all-courses");
  if (!container) {
    console.warn("Element #all-courses not found on this page.");
    return;
  }

  try {
    const response = await fetch(myCourseAPI, {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const result = await response.json();
    console.log("My Courses API Response:", result);
    
    const courses = result.data || result.courses || (Array.isArray(result) ? result : []);

    container.innerHTML = "";

    if (!courses.length) {
      container.innerHTML = "<p>No courses found</p>";
      return;
    }

    courses.forEach(course => {
      const rawImage = course.course_image || course.image;
      const imageUrl = rawImage
        ? (rawImage.startsWith("http") ? rawImage : `https://edtech.colaborazia.com${rawImage}`)
        : "assets/images/courses/default.jpg";

      const progress = course.progress_percent || 0;
      const totalLectures = course.total_lectures || 0;
      const courseId = course.course_id || course.id || course._id;
      const courseName = course.course_name || course.title || "Unnamed Course";

      container.innerHTML += `
        <div class="dashboard-course-item">
          <a class="dashboard-course-item__link" href="dashboard-batch.php?course_id=${courseId}">
            <div class="dashboard-course-item__thumbnail">
              <img src="${imageUrl}" alt="${courseName}" width="260" height="160" style="object-fit: cover;">
            </div>
            <div class="dashboard-course-item__content">
              <h3 class="dashboard-course-item__title">${courseName}</h3>
              <div class="dashboard-course-item__meta">
                <ul class="dashboard-course-item__meta-list">
                  <li><span class="meta-label">Total Lectures:</span> <span class="meta-value">${totalLectures}</span></li>
                  <li><span class="meta-label">Progress:</span> <span class="meta-value">${progress}%</span></li>
                </ul>
              </div>
              <div class="progress mt-2" style="height:6px;">
                <div class="progress-bar" style="width:${progress}%"></div>
              </div>
            </div>
          </a>
        </div>`;
    });
  } catch (error) {
    console.error("Fetch my courses error:", error);
  }
}

// ********************************** 2. Fetch & Render Batches **********************************
async function getMyBatches() {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    console.error("No auth token found");
    return;
  }

  const courseId = getCourseIdFromURL();
  if (!courseId) {
    console.error("No course_id in URL");
    return;
  }

  try {
    const response = await fetch(`${batchAPI}/${courseId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const result = await response.json();
    console.log("My Batches API Response:", result);

    const batches = result.data || result.batches || (Array.isArray(result) ? result : []);

    renderBatches(batches);
  } catch (error) {
    console.error("Error fetching batches:", error);
  }
}

function renderBatches(batches) {
  const container = document.getElementById("all-batches");
  if (!container) {
    console.warn("Element #all-batches not found on this page.");
    return;
  }

  container.innerHTML = "";

  if (!batches || batches.length === 0) {
    container.innerHTML = "<p>No batches found</p>";
    return;
  }

  batches.forEach(batch => {
    const rawImage = batch.batch_image || batch.image;
    const imageUrl = rawImage
      ? (rawImage.startsWith("http") ? rawImage : `https://edtech.colaborazia.com${rawImage}`)
      : "assets/images/courses/default.jpg";

    const card = document.createElement("div");
    card.classList.add("dashboard-course-item");
    card.style.cursor = "pointer";

    card.innerHTML = `
      <div class="dashboard-course-item__link">
        <div class="dashboard-course-item__thumbnail">
          <img src="${imageUrl}" alt="${batch.batch_name}" width="260" height="160" style="object-fit: cover;">
        </div>
        <div class="dashboard-course-item__content">
          <h3 class="dashboard-course-item__title">${batch.batch_name || "Unnamed Batch"}</h3>
          <p><strong>Start:</strong> ${batch.start_date?.split("T")[0] || "-"}</p>
          <p><strong>End:</strong> ${batch.end_date?.split("T")[0] || "-"}</p>
        </div>
      </div>`;

    card.addEventListener("click", () => {
      const batchId = batch.id || batch.batch_id || batch._id;
      const batchImage = batch.batch_image;

      if (!batchId) {
        alert("Batch ID not found!");
        console.error("Batch ID missing:", batch);
        return;
      }

      openLiveClassTab(batchId, batchImage);
    });

    container.appendChild(card);
  });
}

// ********************************** 3. Open Live Class Tab & Fetch Live Classes **********************************
async function openLiveClassTab(batchId, batchImageUrl = null) {
  // Activate Live Class tab
  document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.course-tab-content').forEach(t => t.classList.remove('active'));

  const liveTabBtn = document.querySelector('[data-tab="live-class"]');
  const liveTabContent = document.getElementById('live-class');

  if (liveTabBtn) {
    liveTabBtn.classList.add('active');
    liveTabBtn.style.display = 'block'; // ← Show the tab button
  }
  if (liveTabContent) liveTabContent.classList.add('active');

  const container = document.getElementById("live-class");
  if (!container) {
    alert("Page error: Live class section not found.");
    return;
  }

  container.innerHTML = `<p>Loading live classes...</p>`;

  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    container.innerHTML = "<p>Session expired. Please login again.</p>";
    return;
  }

  try {
    const res = await fetch(`${liveClassAPI}/${batchId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    if (!res.ok) {
      container.innerHTML = `<p>Error ${res.status}: Unable to load classes</p>`;
      return;
    }

    const result = await res.json();
    console.log("Live Classes API Response:", result);
    const classes = result.data || result.live_classes || (Array.isArray(result) ? result : []);

    renderLiveClasses(classes, batchImageUrl);
  } catch (err) {
    console.error("Network error:", err);
    container.innerHTML = "<p>Network error. Check your connection.</p>";
  }
}

// ********************************** 4. Render Live Classes with Batch Image Thumbnail *********************************
function renderLiveClasses(classes, batchImageUrl) {
  const container = document.getElementById("live-class");
  if (!container) return;

  container.innerHTML = "";

  if (!classes || classes.length === 0) {
    container.innerHTML = "<p>No live classes for this batch</p>";
    return;
  }

  const imageUrl = batchImageUrl
    ? (batchImageUrl.startsWith("http") ? batchImageUrl : `https://edtech.colaborazia.com${batchImageUrl}`)
    : "assets/images/courses/default.jpg";

  classes.forEach(cls => {
    const recordingBtn = cls.recordingLink
      ? `<a href="${cls.recordingLink}" target="_blank" class="btn btn-secondary mt-2">View Recording</a>`
      : "";

    container.innerHTML += `
      <div class="dashboard-course-item">
        <div class="dashboard-course-item__link">
          <div class="dashboard-course-item__thumbnail">
            <img src="${imageUrl}" alt="Batch Image" width="260" height="160" style="object-fit: cover;">
          </div>
          <div class="dashboard-course-item__content">
            <h3 class="dashboard-course-item__title">${cls.topic || "Live Class"}</h3>
            <div class="dashboard-course-item__meta">
              <ul class="dashboard-course-item__meta-list">
                <li><span class="meta-label">Date:</span> <span class="meta-value">${cls.classDate?.split("T")[0] || "-"}</span></li>
                <li><span class="meta-label">Time:</span> <span class="meta-value">${cls.startTime || "-"} - ${cls.endTime || "-"}</span></li>
              </ul>
            </div>
            <div class="btn-group mt-3">
              <a href="${cls.meetingLink}" target="_blank" class="btn btn-primary">Join Now</a>
              ${recordingBtn}
            </div>
          </div>
        </div>
      </div>`;
  });
}

// ********************************** 5. Manual Tab Switching (with hide logic for Live Class tab) **********************************
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    const tabId = this.dataset.tab;

    // Remove active from all
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.course-tab-content').forEach(tab => tab.classList.remove('active'));

    // Activate clicked tab
    this.classList.add('active');
    document.getElementById(tabId)?.classList.add('active');

    // Hide Live Class tab button if we're not on live-class tab
    const liveTabBtn = document.querySelector('[data-tab="live-class"]');
    if (tabId !== 'live-class' && liveTabBtn) {
      liveTabBtn.style.display = 'none';
    }
  });
});

// ********************************** 6. On Page Load **********************************
document.addEventListener("DOMContentLoaded", () => {
  // Hide Live Class tab button by default
  const liveTabBtn = document.querySelector('[data-tab="live-class"]');
  if (liveTabBtn) {
    liveTabBtn.style.display = 'none';
    
  }

  getMyCourses();     // Load courses if on dashboard
  getMyBatches();     // Load batches if course_id is present
});