let currentReviewPage = 1;
const REVIEW_PER_PAGE = 8;

document.addEventListener("DOMContentLoaded", function () {

  const token = localStorage.getItem("token");
  const courseSelect = document.getElementById("courseSelect");
  const form = document.getElementById("reviewForm");
  const publishBtn = document.getElementById("publishReview");
  const ratingInput = document.getElementById("ratingValue");
  const stars = document.querySelectorAll("#starRating .ph");

  // =========================================
  // LOAD COURSES
  // =========================================
  fetch("https://edtech.colaborazia.com/api/admin/get-all-course", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch courses");
      return res.json();
    })
    .then((response) => {
      if (!response || !Array.isArray(response.data)) {
        Swal.fire("Error", "Invalid course response", "error");
        return;
      }

      const activeCourses = response.data.filter(
        (course) => course.is_active === true || course.is_active === 1
      );

      courseSelect.innerHTML = `<option value="" disabled selected>Select Course</option>`;

      activeCourses.forEach((course) => {
        const option = document.createElement("option");
        option.value = course.id;
        option.textContent = course.course_name;
        courseSelect.appendChild(option);
      });
    })
    .catch((err) => {
      console.error(err);
      if (courseSelect) courseSelect.innerHTML = `<option value="" disabled>Error loading courses</option>`;
    });

  // =========================================
  // STAR RATING
  // =========================================
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      const rating = index + 1;
      ratingInput.value = rating;

      stars.forEach((s, i) => {
        s.classList.remove("text-warning");
        if (i < rating) {
          s.classList.add("text-warning");
        }
      });
    });
  });

  // =========================================
  // PUBLISH BUTTON (OUTSIDE FORM)
  // =========================================
  if (publishBtn) {
    publishBtn.addEventListener("click", function () {

      // HTML5 validation check
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Trigger form submit event
      form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    });
  }

  // =========================================
  // FORM SUBMIT
  // =========================================
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("reviewTitle").value;
    const course_id = document.getElementById("courseSelect").value;
    const email = document.getElementById("reviewEmail").value;
    const rating = document.getElementById("ratingValue").value;
    const review_text = document.getElementById("reviewText").value;

    if (!rating) {
      Swal.fire("Warning", "Please select rating", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("course_id", course_id);
    formData.append("email", email);
    formData.append("rating", rating);
    formData.append("review_text", review_text);

    fetch("https://edtech.colaborazia.com/api/admin/add-review-by-admin", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.success || data.status === true) {
          Swal.fire("Success", "Review submitted successfully!", "success")
            .then(() => {
              window.location.href = "all-review.php";
            });

          form.reset();
          ratingInput.value = "";

          stars.forEach((s) => s.classList.remove("text-warning"));

        } else {
          Swal.fire("Error", data.message || "Submission failed", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Error", "Something went wrong!", "error");
      });
  });

});
// ********************************************************get review api start*********************************************************
document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("reviewsTableBody");
  const token = localStorage.getItem("token");

  // Store reviews globally so modal can access them
  window.allReviews = [];

  fetch("https://edtech.colaborazia.com/api/admin/get-all-review-admin", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      if (!res.success || !res.reviews || res.reviews.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="9">No Data Found</td></tr>`;
        return;
      }

      // Save reviews for modal usage
      window.allReviews = res.reviews;
      renderReviewTable(res.reviews);
    })
    .catch((error) => {
      console.error("Error fetching reviews:", error);
      tableBody.innerHTML = `<tr><td colspan="9">Error loading data</td></tr>`;
    });

  // ✅ Modal Function
  window.reviewMessageModal = function (index) {
    let modal = document.getElementById("reviewModal");

    if (!modal) {
      modal = document.createElement("div");
      modal.className = "modal fade";
      modal.id = "reviewModal";
      modal.tabIndex = -1;

      modal.innerHTML = `
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Full Review</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p id="fullReviewText" style="white-space: pre-wrap;"></p>
                        </div>
                    </div>
                </div>
            `;

      document.body.appendChild(modal);
    }

    document.getElementById("fullReviewText").innerText =
      window.allReviews[index].review_text ?? "No review text available";

    new bootstrap.Modal(modal).show();
  };
});

function renderReviewTable(reviews = window.allReviews, page = 1) {
    const tableBody = document.getElementById("reviewsTableBody");
    if (!tableBody) return;
    
    currentReviewPage = page;
    const totalItems = reviews.length;
    const totalPages = Math.ceil(totalItems / REVIEW_PER_PAGE);
    if (currentReviewPage < 1) currentReviewPage = 1;
    if (currentReviewPage > totalPages && totalPages > 0) currentReviewPage = totalPages;
    const startIndex = (currentReviewPage - 1) * REVIEW_PER_PAGE;
    const endIndex = Math.min(startIndex + REVIEW_PER_PAGE, totalItems);
    const pageReviews = reviews.slice(startIndex, endIndex);

    const rows = pageReviews.map((review, index) => {
          const createdDate = review.created_at
            ? new Date(review.created_at).toLocaleDateString()
            : "-";

          const originalIndex = window.allReviews.findIndex(r => r.id === review.id);

          return `
                <tr>
                    <td>
                        <span class="h6 mb-0 fw-medium text-gray-300">${startIndex + index + 1}</span>
                    </td>

                    <td>
                        <span class="h6 mb-0 fw-medium text-gray-300">${review.title}</span>
                    </td>

                    <td>
                    <span class="h6 mb-0 fw-medium text-gray-300">${review.courseName}</span>
                    </td>
    
                    <td>
                        <span class="h6 mb-0 fw-medium text-gray-300">${review.user_email}</span>
                    </td>
                    
                    <td>
                        <span class="h6 mb-0 fw-medium text-gray-300">${review.rating}</span>
                    </td>
                    
                    <td>
                        <span class="h6 mb-0 fw-medium text-gray-300">${createdDate}</span>
                    </td>
                    
                    <td>
                        <span class="h6 mb-0 fw-medium text-gray-300">
                            ${
                              review.review_text &&
                              review.review_text.length > 15
                                ? review.review_text.substring(0, 15) + "..."
                                : (review.review_text ?? "—")
                            }
                        </span>

                        ${
                          review.review_text && review.review_text.length > 15
                            ? `
                            <button class=" ms-2" 
                                onclick="reviewMessageModal(${originalIndex})">
                                View
                            </button>
                        `
                            : ""
                        }
                    </td>

                    <td>
                        <i class="bi bi-pencil-square text-success fs-5"
                           style="cursor:pointer"
                           onclick="editReview(${review.id})"></i>
                    </td>

                    <td>
                        <i class="bi bi-trash text-danger fs-5"
                           style="cursor:pointer"
                           onclick="deleteReview(${review.id})"></i>
                    </td>
                </tr>
            `;
        })
        .join("");

      tableBody.innerHTML = rows;
      renderReviewPagination(totalItems, startIndex, endIndex, totalPages);
}
window.renderReviewTable = renderReviewTable;

function renderReviewPagination(totalItems, startIndex, endIndex, totalPages) {
    const tableBody = document.getElementById('reviewsTableBody');
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
        const activeClass = i === currentReviewPage ? 'active' : '';
        paginationHTML += `
            <li class="page-item ${activeClass}">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium cursor-pointer" onclick="window.renderReviewTable(window.allReviews, ${i})">${i}</a>
            </li>
        `;
    }
    paginationHTML += `</ul></div>`;
    footer.innerHTML = paginationHTML;
}

// ********************************************************get review api end*********************************************************
// ******************************************************edit review start*******************************************************
function editReview(id) {
  window.location.href = `edit-review.php?id=${id}`;
}

async function updateReview(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    Swal.fire("Unauthorized", "Please login again", "error");
    return;
  }

  const DOMAIN = "https://edtech.colaborazia.com";

  const title = document.getElementById("editTitle")?.value.trim();
  const email = document.getElementById("editEmail")?.value.trim();
  const reviewText = document.getElementById("editReviewText")?.value.trim();
  const courseId = document.getElementById("editcourseSelect")?.value;
  const rating = document.getElementById("editRatingValue")?.value;

  if (!title) {
    Swal.fire("Required", "Review title is required", "warning");
    return;
  }

  if (!email) {
    Swal.fire("Required", "Email is required", "warning");
    return;
  }

  if (!rating) {
    Swal.fire("Required", "Please select rating", "warning");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("email", email);
  formData.append("review_text", reviewText);
  formData.append("course_id", courseId);
  formData.append("rating", rating);
  formData.append("_method", "PUT");

  try {
    const response = await fetch(
      `${DOMAIN}/api/admin/update-review-by-admin/${id}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      },
    );

    const result = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Review Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "all-review.php";
      });
    } else {
      Swal.fire("Error", result.message || "Review update failed", "error");
    }
  } catch (error) {
    console.error("Update Review Error:", error);
    Swal.fire("Server Error", "Something went wrong", "error");
  }
}

//  INIT EDIT REVIEW (AUTO FILL LIKE BATCH)

function initEditReview() {
  const editBtn = document.getElementById("publishEditReview");
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const DOMAIN = "https://edtech.colaborazia.com";
  const token = localStorage.getItem("token");
  if (!token) return;

  const stars = document.querySelectorAll("#editRating .ph");
  const ratingInput = document.getElementById("editRatingValue");

  /* Star UI Function */
  function setStarRating(rating) {
    ratingInput.value = rating;

    stars.forEach((s, i) => {
      s.classList.remove("ph-fill");
      s.classList.add("ph");

      if (i < rating) {
        s.classList.add("ph-fill");
        s.classList.add("text-yellow-400");
        s.classList.remove("text-gray-400");
      } else {
        s.classList.remove("text-yellow-400");
        s.classList.add("text-gray-400");
      }
    });
  }

  /* review  Star Click */
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      setStarRating(index + 1);
    });
  });

  /* FETCH ALL REVIEWS (LIKE BATCH FETCH) */
  (async () => {
    try {
      const res = await fetch(`${DOMAIN}/api/admin/get-all-review-admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();

      console.log("API RESPONSE:", json); // DEBUG

      // If API does NOT return success key
      const reviews = json.data || json.reviews || json;

      if (!reviews) return;

      const review = reviews.find((r) => String(r.id) === String(id));
      if (!review) return;

      // ✅ AUTO FILL
      document.getElementById("editTitle").value = review.title || "";
      document.getElementById("editEmail").value =
        review.user_email || review.email || "";
      document.getElementById("editReviewText").value =
        review.review_text || "";
      // document.getElementById("editcourseSelect").value = review.course_id || "";
      const courseRes = await fetch(`${DOMAIN}/api/admin/get-all-course`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const courseJson = await courseRes.json();
      const courseSelect = document.getElementById("editcourseSelect");

      courseSelect.innerHTML = `<option value="">Select Course</option>`;

      // 🔥 Use courseId (NOT course_id)
      const selectedCourseId = String(review.courseId);

      courseJson.data
        .filter((c) => c.is_active == 1)
        .forEach((c) => {
          const option = document.createElement("option");
          option.value = String(c.id);
          option.textContent = c.course_name;

          courseSelect.appendChild(option);
        });

      // ✅ Set selected value AFTER building dropdown
      courseSelect.value = selectedCourseId;

      console.log("Selected Course ID:", selectedCourseId);
      console.log("Dropdown Value:", courseSelect.value);
      document.getElementById("editRatingValue").value = review.rating || "";

      setStarRating(parseInt(review.rating) || 0);

      if (editBtn) editBtn.innerText = "Update Review";
    } catch (err) {
      console.error("initEditReview error:", err);
    }
  })();

  if (editBtn) {
    editBtn.addEventListener("click", function (e) {
      e.preventDefault();
      updateReview(id);
    });
  }
}

//  PAGE LOAD

document.addEventListener("DOMContentLoaded", function () {
  initEditReview();
});
// ******************************************************edit review end*******************************************************
// ******************************************************delete review start***************************************************
function deleteReview(id) {
  const token = localStorage.getItem("token");
    if (!token) {
        Swal.fire("Unauthorized", "Please login again", "error");
        return;
    }

    Swal.fire({ 
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`https://edtech.colaborazia.com/api/admin/del-review/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success || data.status === true) {
                    Swal.fire("Deleted!", "Review has been deleted.", "success").then(() => {
                        window.location.href = "all-review.php";
                    });
                } else {
                    Swal.fire("Error", data.message || "Failed to delete review", "error");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                Swal.fire("Error", "Something went wrong!", "error");
            });
        }
    });
}
// ******************************************************delete review end*******************************************************
