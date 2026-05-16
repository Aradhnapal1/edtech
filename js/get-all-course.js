// ********************************** get All course start **********************************

const getAllCourse = "https://edtech.colaborazia.com/api/admin/all-courses";
const filterCourseApi = "https://edtech.colaborazia.com/api/courses/filter";
const DOMAIN = "https://edtech.colaborazia.com";
const COURSES_PER_PAGE = 8;
let currentCoursePage = 1;

function normalizeAssetUrl(rawUrl, fallbackUrl) {
  const fallback = fallbackUrl || "assets/images/courses/courses-1.jpg";
  if (!rawUrl || typeof rawUrl !== "string") {
    return fallback;
  }

  let value = rawUrl.trim();
  if (!value) {
    return fallback;
  }

  // Fix malformed URLs like: https://domain.comhttp://storage-host/path.png
  value = value.replace(/^(https?:\/\/[^/]+)(https?:\/\/)/i, "$2");

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith("//")) {
    return `${window.location.protocol}${value}`;
  }

  if (value.startsWith("/")) {
    return `${DOMAIN}${value}`;
  }

  return `${DOMAIN}/${value.replace(/^\/+/, "")}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const headerSearchInput = document.querySelector(".header-serach__input");
  const searchFromUrl = new URLSearchParams(window.location.search).get("search");
  if (headerSearchInput && searchFromUrl) {
    headerSearchInput.value = searchFromUrl;
  }
  loadCourses();
});

function getSelectedFilterIds() {
  const selectedCategoryIds = [
    ...document.querySelectorAll(
      'input[data-category-id]:checked'
    ),
  ].map((input) => Number(input.dataset.categoryId)).filter(Boolean);

  const selectedLanguageIds = [
    ...document.querySelectorAll(
      'input[data-language-id]:checked'
    ),
  ].map((input) => Number(input.dataset.languageId)).filter(Boolean);

  return {
    categoryIds: [...new Set(selectedCategoryIds)],
    languageIds: [...new Set(selectedLanguageIds)],
  };
}

function buildCourseApiUrl(filters = {}) {
  const { categoryIds = [], languageIds = [] } = filters;

  if (!categoryIds.length && !languageIds.length) {
    return getAllCourse;
  }

  const query = new URLSearchParams();
  if (languageIds.length) {
    query.append("languageIds", languageIds.join(","));
  }
  if (categoryIds.length) {
    query.append("categoryIds", categoryIds.join(","));
  }

  return `${filterCourseApi}?${query.toString()}`;
}

document.addEventListener("change", (event) => {
  const target = event.target;
  if (
    target.matches('input[data-category-id]') ||
    target.matches('input[data-language-id]')
  ) {
    loadCourses(getSelectedFilterIds());
  }
});

function getCourseSearchTerm() {
  const searchInput = document.querySelector(".header-serach__input");
  const searchFromInput = searchInput ? searchInput.value.trim().toLowerCase() : "";
  if (searchFromInput) return searchFromInput;

  const searchFromUrl = new URLSearchParams(window.location.search).get("search");
  return searchFromUrl ? searchFromUrl.trim().toLowerCase() : "";
}

document.addEventListener("input", (event) => {
  if (
    event.target &&
    event.target.classList &&
    event.target.classList.contains("header-serach__input")
  ) {
    loadCourses(getSelectedFilterIds());
  }
});

function getPaginatedCourses(courses) {
  const safeCourses = Array.isArray(courses) ? courses : [];
  const totalPages = Math.max(1, Math.ceil(safeCourses.length / COURSES_PER_PAGE));
  if (currentCoursePage > totalPages) {
    currentCoursePage = totalPages;
  }
  if (currentCoursePage < 1) {
    currentCoursePage = 1;
  }
  const start = (currentCoursePage - 1) * COURSES_PER_PAGE;
  const end = start + COURSES_PER_PAGE;
  return {
    pageCourses: safeCourses.slice(start, end),
    totalPages,
  };
}

function createPaginationItem(label, onClick, isActive = false, isDisabled = false) {
  const li = document.createElement("li");
  const anchor = document.createElement("a");
  anchor.href = "#";
  anchor.innerHTML = label;
  if (isActive) {
    anchor.classList.add("active");
  }
  if (isDisabled) {
    anchor.classList.add("disabled");
    anchor.setAttribute("aria-disabled", "true");
  } else {
    anchor.addEventListener("click", onClick);
  }
  li.appendChild(anchor);
  return li;
}

function renderCoursePagination(totalItems, onPageChange) {
  const pagination = document.getElementById("coursePagination");
  const countEl = document.getElementById("courseCount");
  if (countEl) {
    countEl.textContent = String(totalItems);
  }
  if (!pagination) {
    return;
  }

  pagination.innerHTML = "";
  // Added inline styles to force a horizontal scrollbar if there are many pages
  pagination.style.display = "flex";
  pagination.style.flexWrap = "nowrap";
  pagination.style.overflowX = "auto";
  pagination.style.paddingBottom = "5px";
  const totalPages = Math.max(1, Math.ceil(totalItems / COURSES_PER_PAGE));
  if (totalItems <= COURSES_PER_PAGE) {
    return;
  }

  pagination.appendChild(
    createPaginationItem('<i class="fas fa-angle-double-left"></i>', (e) => {
      e.preventDefault();
      if (currentCoursePage > 1) {
        currentCoursePage -= 1;
        onPageChange();
      }
    }, false, currentCoursePage === 1)
  );

  for (let page = 1; page <= totalPages; page += 1) {
    pagination.appendChild(
      createPaginationItem(String(page), (e) => {
        e.preventDefault();
        currentCoursePage = page;
        onPageChange();
      }, currentCoursePage === page, false)
    );
  }

  pagination.appendChild(
    createPaginationItem('<i class="fas fa-angle-double-right"></i>', (e) => {
      e.preventDefault();
      if (currentCoursePage < totalPages) {
        currentCoursePage += 1;
        onPageChange();
      }
    }, false, currentCoursePage === totalPages)
  );
}

async function loadCourses(filters = {}) {
  try {
    currentCoursePage = 1;
    const coursesApiUrl = buildCourseApiUrl(filters);

    const response = await fetch(coursesApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });


    // Raw response text dekhne ke liye
    const rawText = await response.text();
    console.log("Raw API Response:", rawText);

    // Agar response empty hai to return
    if (!rawText) {
      alert("API returned empty response");
      return;
    }

    // JSON parse safely
    let result;
    try {
      result = JSON.parse(rawText);
    } catch (jsonError) {
         alert("JSON Parse Error. API JSON return nahi kar rahi.");
      return;
    }

    console.log("✅ Parsed API Response:", result);

    const courses = Array.isArray(result.data)
      ? result.data
      : Array.isArray(result)
      ? result
      : [];
    const searchTerm = getCourseSearchTerm();
    const filteredCourses = searchTerm
      ? courses.filter((course) => {
          const courseName = (course.course_name || "").toLowerCase();
          const categoryName = (
            course.category?.category_name ||
            course.categoryName ||
            ""
          ).toLowerCase();
          const languageName = (
            course.courseLanguage?.language_name ||
            course.language_name ||
            ""
          ).toLowerCase();

          return (
            courseName.includes(searchTerm) ||
            categoryName.includes(searchTerm) ||
            languageName.includes(searchTerm)
          );
        })
      : courses;

    const renderPagedCourses = () => {
      const { pageCourses } = getPaginatedCourses(filteredCourses);

      /* ================= GRID VIEW ================= */
    const grid = document.getElementById("grid");
    if (grid) {
      const row = grid.querySelector(".row");
      if (row) {
        row.innerHTML = "";

        if (!pageCourses.length) {
          row.innerHTML =
            '<div class="col-12"><p class="text-center m-0">No courses found for selected filters/search.</p></div>';
        }

        pageCourses.forEach((course) => {
          const courseName = course.course_name ?? "No Name";
          const courseLevel = course.course_level ?? "All Levels";
          const salePrice = course.saling_price ?? 0;
          const courseCategory =
            course.category?.category_name ?? "Unknown Category";
          const rating = course.rating ?? 5;
          const ratingCount = course.rating_count ?? 2;

          const image = normalizeAssetUrl(
            course.course_image,
            "assets/images/courses/courses-1.jpg"
          );

          const courseSlug = course.course_slug || "";

          row.innerHTML += `
            <div class="col-lg-4 col-sm-6">
              <div class="course-item">
                <div class="course-header">
                  <div class="course-header__thumbnail">
                    <a href="course-detail.php?id=${course.id}&slug=${courseSlug}">
                      <img src="${image}" alt="${courseName}">
                    </a>
                  </div>
                </div>

                <div class="course-info">
                  <span class="course-info__badge-text badge-all">
                    ${courseLevel}
                  </span>

                  <h3 class="course-info__title">
                    <a href="course-detail.php?id=${course.id}&slug=${courseSlug}">
                      ${courseName}
                    </a>
                  </h3>

                  <a href="#" class="course-info__instructor">
                    ${courseCategory}
                  </a>

                  <div class="course-info__price">
                    <span class="sale-price">₹${salePrice}.<small class="separator">00</small></span>
                  </div>

                  <div class="course-info__rating">
                    <div class="rating-star">
                      <div class="rating-label" style="width: ${rating * 20}%;"></div>
                    </div>
                    <span>(${ratingCount})</span>
                  </div>
                </div>
              </div>
            </div>
          `;
        });
      }
    }

      /* ================= LIST VIEW ================= */
    const list = document.getElementById("list");
    if (list) {
      list.innerHTML = "";

      if (!pageCourses.length) {
        list.innerHTML =
          '<div class="course-list-item"><p class="m-0">No courses found for selected filters/search.</p></div>';
      }

      pageCourses.forEach((course) => {
        const courseName = course.course_name ?? "No Name";
        const courseLevel = course.course_level ?? "All Levels";
        const salePrice = course.saling_price ?? 0;
        const totalLectures = course.total_lectures ?? 0;
        const duration = course.duration ?? "0 hours";

        let courseDescription = course.course_discription 
          ? String(course.course_discription) 
          : "No description available.";
        const words = courseDescription.split(" ");
        if (words.length > 20) {
          courseDescription = words.slice(0, 20).join(" ") + "...";
        }

        const image = normalizeAssetUrl(
          course.course_image,
          "assets/images/courses/courses-1.jpg"
        );

        const courseSlug = course.course_slug || "";

        list.innerHTML += `
          <div class="course-list-item">
            <div class="course-list-header">
              <div class="course-list-header__thumbnail">
                <a href="course-detail.php?id=${course.id}&slug=${courseSlug}">
                  <img src="${image}" alt="${courseName}" width="270" height="181">
                </a>
              </div>
            </div>

            <div class="course-list-info">
              <h3 class="course-list-info__title">
                <a href="course-detail.php?id=${course.id}&slug=${courseSlug}">
                  ${courseName}
                </a>
              </h3>

              <div class="course-list-info__meta">
                <span><i class="fas fa-play-circle"></i> ${totalLectures} Lessons</span>
                <span><i class="fas fa-clock"></i> ${duration}</span>
                <span><i class="fas fa-sliders-h"></i> ${courseLevel}</span>
              </div>

              <div class="course-list-info__description">
                <p>${courseDescription}</p>
              </div>

              <div class="course-list-info__action">
                <button
                  class="btn btn-primary btn-hover-secondary addToCartButton"
                  data-course-id="${course.id}">
                  Add to cart
                </button>
                <button class="btn-icon btn-light btn-hover-primary">
                  <i class="far fa-heart"></i>
                </button>
              </div>

              <div class="course-list-info__footer">
                <div class="course-list-info__price">
                  <span class="sale-price">₹${salePrice}.00</span>
                </div>
                <div class="course-list-info__rating">
                  <div class="rating-star">
                    <div class="rating-label" style="width: 100%;"></div>
                  </div>
                  <p>(2 ratings)</p>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    }
    };

    renderPagedCourses();
    renderCoursePagination(filteredCourses.length, renderPagedCourses);
  } catch (error) {
    console.error("❌ Error loading courses:", error);
    alert("Error loading courses: " + error.message);
  }
}
// ********************************** get All course end **********************************

// **********************************get All course details id  according**********************************

// ================================== Fetch single course by ID ==================================
const getCourseById = "https://edtech.colaborazia.com/api/admin/get-course";
const getCategoriesApi =
  "https://edtech.colaborazia.com/api/admin/get-categories";
const authToken = localStorage.getItem("authToken");

// Get course ID from URL
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get("id");
// ===== FETCH COURSE DETAILS =====
fetch(`${getCourseById}/${courseId}`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (!data || !data.data) return;
    const course = data.data;

    // ===== MAIN INFO =====
    document.getElementById("tutor-course-top-info__title").textContent =
      course.course_name || "No Title";
    document.getElementById("badges-category").textContent =
      course.category?.category_name || "No Category";

    // ===== META INFO =====
    document.getElementById("course-level").textContent =
      course.course_level || "Beginner";
    document.getElementById("course-duration").textContent = course.duration
      ? `${course.duration} hours`
      : "0 hours";
    document.getElementById("course-lectures").textContent =
      course.total_lectures
        ? `${course.total_lectures} lectures`
        : "0 lectures";
    document.getElementById("course-language").textContent =
      course.courseLanguage?.language_name || "No Language";

    // Dates and LPA
    document.getElementById("course-start-date").textContent =
      course.start_class_date
        ? new Date(course.start_class_date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
        : "N/A";

    document.getElementById("course-demo-end-date").textContent =
      course.demo_end_date
        ? new Date(course.demo_end_date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
        : "N/A";

    document.getElementById("maxlpa").textContent = course.maximum_lpa
      ? `${course.maximum_lpa} LPA`
      : "N/A";
    document.getElementById("minlpa").textContent = course.minimum_lpa
      ? `${course.minimum_lpa} LPA`
      : "N/A";

    // ===== BREADCRUMB =====
    const breadcrumbCourse = document.getElementById("breadcrumb-course-name");
    if (breadcrumbCourse) breadcrumbCourse.textContent = course.course_name;

    // ===== COURSE IMAGE =====
    const courseImgEl = document.querySelector(
      ".tutor-course-price-preview__thumbnail img"
    );
    if (courseImgEl) {
      courseImgEl.src = normalizeAssetUrl(course.course_image, "assets/images/py.png");
      courseImgEl.alt = course.course_name || "Course Image";
    }

    // ===== COURSE PRICE =====
    const priceEl = document.querySelector(".sale-price");
    if (priceEl) {
      priceEl.innerHTML = course.saling_price
        ? `Rs:${course.saling_price}<span class="separator">.00</span>`
        : `Rs:0<span class="separator">.00</span>`;
    }

    // ===== UPDATED DATE =====
    const updatedAt = course.updated_at;
    document.getElementById("date-course").textContent = updatedAt
      ? new Date(updatedAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
      : "No Date";

    // ===== OVERVIEW =====
    const overviewWrapper = document.querySelector(
      "#overview + .tutor-course-segment__content-wrap"
    );
    if (overviewWrapper) {
      overviewWrapper.innerHTML = course.overview
        ? course.overview
          .split("\n")
          .map((p) => `<p>${p}</p>`)
          .join("")
        : "<p>No overview available.</p>";
    }

    // ===== HIGHLIGHTS =====
    const highlightsWrapper = document.querySelector(
      "#highlight + .margin-left"
    );
    if (highlightsWrapper) {
      highlightsWrapper.innerHTML = course.course_highlights
        ? course.course_highlights
          .split("\n\n")
          .map((block) => {
            const lines = block.split("\n");
            const title = lines.shift();
            const content = lines.join(" ");
            return `<h4 class="tutor-course-segment__title">${title}</h4><p>${content}</p>`;
          })
          .join("")
        : "<p>No highlights available.</p>";
    }

    // ===== COURSE DETAILS =====
    const courseDetailsEl = document.getElementById("course-details-text");
    if (courseDetailsEl) {
      courseDetailsEl.innerHTML = course.course_details
        ? course.course_details
          .split("\n")
          .map((line) => `<p>${line}</p>`)
          .join("")
        : "No course details available.";
    }

    // ===== WHY CHOOSE US =====
    const whyChooseTitle = document.getElementById("choose");
    if (whyChooseTitle && whyChooseTitle.nextElementSibling) {
      whyChooseTitle.nextElementSibling.innerHTML = course.why_choose_us
        ? course.why_choose_us
          .split("\n")
          .map((p) => `<p>${p}</p>`)
          .join("")
        : "<p>No information available.</p>";
    }

    // Update URL slug dynamically
    window.history.replaceState(
      {},
      "",
      `course-detail.php?slug=${course.course_slug}&id=${course.id}`
    );
  })
  .catch((err) => console.error("Failed to fetch course:", err));

// ===== FETCH ALL CATEGORIES =====
// const getAllCategory = "http://edtech.colaborazia.com/api/admin/get-categories";

// ********************************** detail page category list  **********************************

async function loadCategories() {
  // const authToken = localStorage.getItem("authToken");

  // if (!authToken) {
  //   console.error("Token missing");
  //   return;
  // }

  try {
    const response = await fetch(getAllCategory, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${authToken}`,
      },
    });

    const result = await response.json();
    console.log("Category API Response 👉", result);

    // Adjust this if API structure is different
    const categories = result.data || result;

    const categoryList = document.getElementById("allcategoryList");
    categoryList.innerHTML = "";

    categories.forEach((cat, index) => {
      categoryList.innerHTML += `
               
                        <li>
          <a href="category.php?category_id=${cat.id}" data-category-id="${cat.id}">
            ${cat.categoryName}
          </a>

        </li>

            `;
    });
  } catch (error) {
    console.error("Error loading categories:", error);
  }
}

// Call on page load
loadCategories();

// ********************************** detail page category list end  **********************************

// *************************************RELATED COURSE  START**************************************

const relatedCourseApi =
  "https://edtech.colaborazia.com/api/admin/all-courses";
// const DOMAIN = "https://edtech.colaborazia.com";

document.addEventListener("DOMContentLoaded", loadRelatedCourses);

async function loadRelatedCourses() {
  // const authToken = localStorage.getItem("authToken");

  // if (!authToken) {
  //   console.error("❌ Token missing");
  //   return;
  // }

  try {
    const response = await fetch(relatedCourseApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const result = await response.json();
    console.log("✅ Related Courses API Response:", result);

    const courses = Array.isArray(result.data)
      ? result.data
      : Array.isArray(result)
        ? result
        : [];

    if (!courses.length) {
      console.warn("⚠️ No courses found");
      return;
    }

    const relatedCoursesContainer = document.getElementById(
      "related-courses-container"
    );

    if (!relatedCoursesContainer) {
      console.error("❌ related-courses-container not found");
      return;
    }

    relatedCoursesContainer.innerHTML = "";

    courses.forEach((course) => {
      const courseName = course.course_name ?? "No Name";
      const courseCategory =
        course.category?.category_name ?? "Unknown Category";
      const rating = course.rating ?? 5; // out of 5
      const ratingCount = course.rating_count ?? 2;

      const courseLevel = course.course_level ?? "All Levels";
      const salePrice = course.saling_price ?? 0;
      const image = normalizeAssetUrl(
        course.course_image,
        "assets/images/courses/courses-1.jpg"
      );
      const courseSlug = course.course_slug || "";

      relatedCoursesContainer.innerHTML += `
        <div class="swiper-slide">
            <div class="course-item">
                <div class="course-header">
                    <div class="course-header__thumbnail">
                        <a href="course-detail.php?id=${course.id
        }&slug=${courseSlug}">
                            <img src="${image}" alt="${courseName}">
                        </a>
                    </div>
                    
                </div>
                

                <div class="course-info">
                <span class="course-info__badge-text badge-all">
                        ${courseLevel}
                    </span>
                    <h3 class="course-info__title">
                        <a href="course-detail.php?id=${course.id
        }&slug=${courseSlug}">
                            ${courseName}
                        </a>
                    </h3>
                      <a href="#" class="course-info__instructor">${courseCategory}</a>

                    <div class="course-info__price">
                        <span class="sale-price">
                            ₹${salePrice}<span class="separator">.00</span>
                        </span>
                    </div>
                    <div class="course-info__rating">
                        <div class="rating-star">
                            <div class="rating-label" style="width: ${rating * 20
        }%;"></div>
                        </div>
                        <span>(${ratingCount})</span>
                    </div>
                </div>
            </div>
        </div>
      `;
    });

    // ✅ INIT SWIPER AFTER HTML LOAD
    new Swiper(".course-tab-active .swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        576: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
    });
  } catch (error) {
    console.error("❌ Error loading related courses:", error);
  }
}
// *************************************RELATED COURSE  END**************************************

// *****************************************RELATED COURSE 3 BOX ONLY START **************************


const threeRelatedCourse =
  "https://edtech.colaborazia.com/api/admin/all-courses";
// const DOMAIN = "
// s://edtech.colaborazia.com";

document.addEventListener("DOMContentLoaded", loadSidebarRelatedCourses);

async function loadSidebarRelatedCourses() {
  // const authToken = localStorage.getItem("authToken");

  // if (!authToken) {
  //   console.error("❌ Token missing");
  //   return;
  // }

  try {
    const response = await fetch(threeRelatedCourse, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log("✅ Related Courses Sidebar API:", result);

    const courses = Array.isArray(result.data) ? result.data.slice(0, 3) : [];

    const container = document.getElementById("relatedcourseid");
    if (!container) {
      console.error("❌ relatedcourseid not found");
      return;
    }

    // Remove static HTML
    container.innerHTML = "";

    courses.forEach((course) => {
      const courseName = course.course_name ?? "Course Name";
      const salePrice = course.saling_price ?? 0;
      const regularPrice = course.actual_price ?? null;
      const courseSlug = course.course_slug || "";

      const image = normalizeAssetUrl(
        course.course_image,
        "assets/images/courses/courses-21.jpg"
      );

      container.innerHTML += `
        <div class="sidebar-widget__course-item">
          <div class="sidebar-widget__course-thumbnail">
            <a href="course-detail.php?id=${course.id}&slug=${courseSlug}">
              <img src="${image}" alt="${courseName}" width="120" height="72">
            </a>
          </div>

          <div class="sidebar-widget__course-content">
            <h4 class="sidebar-widget__course-title">
              <a href="course-detail.php?id=${course.id}&slug=${courseSlug}">
                ${courseName}
              </a>
            </h4>

            <div class="sidebar-widget__course-price">
              <span class="sale-price">
                ₹${salePrice}<span class="separator">.00</span>
              </span>
              ${regularPrice
          ? `<span class="regular-price">
                       ₹${regularPrice}<span class="separator">.00</span>
                     </span>`
          : ""
        }
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error("❌ Sidebar Related Courses Error:", error);
  }
}

// *****************************************RELATED COURSE 3 BOX ONLY END **************************

/* ===================== API URLS ===================== */
const getCartApi = "https://edtech.colaborazia.com/api/cart/get-cart";
const addToCartBaseUrl = "https://edtech.colaborazia.com/api/cart/add-cart";
const deleteCartBaseUrl = "https://edtech.colaborazia.com/api/cart/del-cart";

let cartSubtotal = 0; // Global subtotal (before discount)

/* ===================== RENDER MINI CART + UPDATE COUNT ===================== */
function renderMiniCart() {
  const authToken = localStorage.getItem("authToken");

  // 🔹 Default values (guest user)
  updateCartCount(0);
  cartSubtotal = 0;

  const totalEl = document.querySelector(".header-mini-cart__value");
  if (totalEl) {
    totalEl.innerHTML = `₹0<span class="separator">.00</span>`;
  }

  // 🔹 Agar token hai → API se cart load karo
  if (authToken) {
    fetchMiniCart(authToken); // server cart
  } else {
    loadGuestCart(); // localStorage cart (optional)
  }
}


function renderMiniCart() {
  const authToken = localStorage.getItem("authToken");

  fetch(getCartApi, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }) 
      // 👉 token ho tab hi header add hoga
    },
  })
    .then(res => res.json())
    .then(data => {
      const cartItems = data?.data || [];
      const cartList = document.getElementById("miniCartList");

      let total = 0;
      let html = "";

      if (cartItems.length === 0) {
        cartList.innerHTML = "<li>Cart is empty</li>";
      } else {
        cartItems.forEach(item => {
          const price = Number(item.salePrice) || 0;
          total += price;

          const imageUrl = item.imageUrl
            ? `${item.imageUrl}`
            : "assets/images/product/product-1.png";

          html += `
            <li class="header-mini-cart__item">
              <a href="#" class="header-mini-cart__close"
                 onclick="deleteCartItem(${item.cartId})">×</a>
              <div class="header-mini-cart__thumbnail">
                <img src="${imageUrl}" class="w-70 h-80">
              </div>
              <div class="header-mini-cart__caption">
                <p>${item.courseName}</p>
                <span>₹${price}</span>
              </div>
            </li>
          `;
        });

        cartList.innerHTML = html;
      }

      // subtotal
      cartSubtotal = total;

      // coupon logic
      const appliedCoupon = JSON.parse(localStorage.getItem("appliedCoupon") || "{}");
      const finalTotal = appliedCoupon.total || total;

      // mini cart total update
      const totalEl = document.querySelector(".header-mini-cart__value");
      if (totalEl) {
        totalEl.innerHTML = `₹${finalTotal}<span class="separator">.00</span>`;
      }

      updateCartCount(cartItems.length);
    })
    .catch(err => {
      console.error("Mini cart error:", err);
      cartSubtotal = 0;
      updateCartCount(0);
    });
}


/* Helper to update cart count badge everywhere */
function updateCartCount(count) {
  const countEl = document.getElementById("count");
  if (countEl) countEl.textContent = count;
}

/* ===================== FULL CART PAGE: LOAD CART TABLE ===================== */
async function loadCartItems() {
  const authToken = localStorage.getItem("authToken");
  try {
    const response = await fetch(getCartApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(authToken && { Authorization: `Bearer ${authToken}` })
      }
    });

    if (!response.ok) throw new Error("Failed to fetch cart");

    const data = await response.json();
    const cartItems = data.data || [];
    const cartTableBody = document.getElementById("cartTableBody");

    if (!cartTableBody) return cartItems;

    cartTableBody.innerHTML = "";
    let total = 0;

    if (cartItems.length === 0) {
      cartTableBody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center">Your cart is empty</td>
        </tr>
      `;
      updateCartCount(0);
      cartSubtotal = 0;
      localStorage.removeItem("appliedCoupon");
      return cartItems;
    }

    cartItems.forEach(item => {
      const price = Number(item.salePrice) || 0;
      total += price;

      const imageUrl = item.imageUrl
        ? item.imageUrl
        : "assets/images/thumbs/blogTable-img1.png";

      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="product">
          <div class="cart-product">
            <div class="cart-product__thumbnail">
              <img src="${imageUrl}" class="w-70 h-80">
            </div>
            <div class="cart-product__content">
              <p>${item.courseName}</p>
            </div>
          </div>
        </td>
        <td class="price">₹${price.toFixed(2)}</td>
        <td class="subtotal">₹${price.toFixed(2)}</td>
        <td class="action">
          <button onclick="deleteCartItem(${item.cartId})">Remove</button>
        </td>
      `;
      cartTableBody.appendChild(row);
    });

    const subtotalPriceEl = document.getElementById("subtotalPrice");
    if (subtotalPriceEl) {
      subtotalPriceEl.innerHTML = `₹${total}<span class="separator">.00</span>`;
    }

    const appliedCoupon = JSON.parse(localStorage.getItem("appliedCoupon") || "{}");
    const finalTotal = appliedCoupon.total || total;

    const totalPriceEl = document.getElementById("totalPrice");
    if (totalPriceEl) {
      totalPriceEl.innerHTML = `₹${finalTotal}<span class="separator">.00</span>`;
    }

    cartSubtotal = total;
    updateCartCount(cartItems.length);

    return cartItems;
  } catch (error) {
    console.error(error);
    return [];
  }
}


/* ===================== UNIVERSAL DELETE FUNCTION (USED BY BOTH MINI & FULL CART) ===================== */
async function deleteCartItem(cartId) {
  if (!cartId) {
    Swal.fire("Error", "Invalid item.", "error");
    return;
  }

  const authToken = localStorage.getItem("authToken");

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You want to remove this course from cart?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, remove it!",
  });

  if (!result.isConfirmed) return;

  try {
    // 🔹 headers dynamically build
    const headers = {
      "Content-Type": "application/json",
    };

    // 🔹 token hai to add karo, nahi hai to skip
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const response = await fetch(`${deleteCartBaseUrl}/${cartId}`, {
      method: "DELETE",
      headers: headers,
    });

    const data = await response.json();

    if (data.success || data.status === "success") {
      Swal.fire({
        icon: "success",
        title: "Removed!",
        text: "Item removed from cart.",
        timer: 1500,
        showConfirmButton: false,
      });

      // 🔹 coupon reset
      localStorage.removeItem("appliedCoupon");

      // 🔹 refresh carts
      renderMiniCart();
      loadCartItems();
    } else {
      Swal.fire("Failed", data.message || "Could not remove item.", "error");
    }
  } catch (error) {
    console.error("Delete Error:", error);
    Swal.fire("Error", "Server error. Please try again.", "error");
  }
}

/* ===================== ADD TO CART (Single Course Page & List Page) ===================== */

document.addEventListener("DOMContentLoaded", () => {
  renderMiniCart(); // Initial load of mini cart
  loadCartItems();  // Load full cart table if on cart page

  // Single course page button
  const addToCartBtn = document.getElementById("addToCart");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const courseId = urlParams.get("id");
      if (!courseId) {
        return Swal.fire("Error", "Course ID missing", "error");
      }
      await addToCart(courseId);
    });
  }
});

/* Event delegation for list page add buttons */
document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".addToCartButton");
  if (!btn) return;

  const courseId = btn.getAttribute("data-course-id");
  if (!courseId) return;

  await addToCart(courseId);
});

/* ===================== REMOVE APPLIED COUPON ===================== */

function removeAppliedCoupon() {
  // Remove coupon from storage
  localStorage.removeItem("appliedCoupon");
  localStorage.removeItem("couponCode");

  // Remove discount row
  const discountTr = document.getElementById("discountTr");
  if (discountTr) {
    discountTr.remove();
  }

  // Reset total price to subtotal
  const totalPriceEl = document.getElementById("totalPrice");
  if (totalPriceEl && typeof cartSubtotal !== "undefined") {
    totalPriceEl.innerHTML = `₹${cartSubtotal}<span class="separator">.00</span>`;
  }

  // Optional info message
  Swal.fire({
    icon: "info",
    title: "Coupon Removed",
    text: "Coupon was removed because your cart was updated.",
    timer: 2000,
    showConfirmButton: false,
  });
}

/* ===================== REUSABLE ADD TO CART FUNCTION ===================== */

async function addToCart(courseId) {
  const authToken = localStorage.getItem("authToken");

  // ✅ REMOVE COUPON IF ALREADY APPLIED
  if (localStorage.getItem("appliedCoupon")) {
    removeAppliedCoupon();
  }

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // ✅ Token ho to header me bhejo
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const response = await fetch(`${addToCartBaseUrl}/${courseId}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ course_id: courseId }),
    });

    const data = await response.json();

    if (data.success || data.status === "success") {
      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        timer: 1500,
        showConfirmButton: false,
      });

      // ✅ Cart refresh (guest + logged-in dono ke liye)
      renderMiniCart();
      loadCartItems();
    } else {
      Swal.fire("Failed", data.message || "Could not add to cart", "error");
    }
  } catch (err) {
    console.error("Add to cart error:", err);
    Swal.fire("Error", "Server error. Try again.", "error");
  }
}


/* ===================== CLEAR ENTIRE CART ===================== &&&&&&&&&&&&&&&&&^ */
async function clearEntireCart() {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    Swal.fire("Error", "Please log in to clear cart.", "error");
    return;
  }

  const result = await Swal.fire({
    title: "Clear Cart?",
    text: "All items will be removed from your cart. This cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, Clear Cart",
    cancelButtonText: "Cancel"
  });

  if (!result.isConfirmed) return;

  // Show loading
  Swal.fire({
    title: "Clearing cart...",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  try {
    const response = await fetch("https://edtech.colaborazia.com/api/cart/clear-cart", {
      method: "DELETE", // or "DELETE" — check your backend
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();

    if (data.success || data.status === "success") {
      Swal.fire({
        icon: "success",
        title: "Cart Cleared!",
        text: "All items have been removed from your cart.",
        timer: 2000,
        showConfirmButton: false
      });

      // Clear applied coupon
      localStorage.removeItem('appliedCoupon');

      // Update UI instantly
      renderMiniCart();     // Updates header mini cart + badge count to 0
      loadCartItems();      // Reloads full cart page (shows "empty" message)

    } else {
      throw new Error(data.message || "Failed to clear cart");
    }
  } catch (error) {
    console.error("Clear Cart Error:", error);
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: error.message || "Could not clear cart. Please try again.",
    });
  }
}

/* ===================== EVENT LISTENER FOR CLEAR CART BUTTON ===================== */
document.addEventListener("DOMContentLoaded", () => {
  // ... your existing code (renderMiniCart, loadCartItems, addToCart, etc.)

  // NEW: Clear Cart Button Click
  const clearCartBtn = document.getElementById("clearCart");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      clearEntireCart();
    });
  }
});

/* ===================== CLEAR ENTIRE CART end  ===================== &&&&&&&&&&&&&&&&&^ */


/* ===================== APPLY COUPON ===================== */

document.addEventListener("DOMContentLoaded", function () {
  const applyCouponApi = "https://edtech.colaborazia.com/api/coupon/apply-coupon";
  const applyBtn = document.getElementById("applyCoupon");

  if (!applyBtn) return;

  applyBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const couponCode = document.getElementById("couponCode").value.trim();
    const authToken = localStorage.getItem("authToken");

    if (!couponCode) {
      return Swal.fire("Error", "Please enter coupon code", "error");
    }

    if (!authToken) {
      return Swal.fire("Error", "Please log in to apply coupon.", "error");
    }

    // CART SUBTOTAL
    if (cartSubtotal <= 0) {
      return Swal.fire("Error", "No items in cart.", "error");
    }

    const formData = new FormData();
    formData.append("couponName", couponCode);
    formData.append("subtotal", cartSubtotal);

    try {
      const response = await fetch(applyCouponApi, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Add discount row if not exists
        let discountTr = document.getElementById("discountTr");
        const orderTotalTr = document.querySelector(".order-total");

        if (orderTotalTr && !discountTr) {
          discountTr = document.createElement("tr");
          discountTr.id = "discountTr";
          discountTr.className = "cart-discount";
          discountTr.innerHTML = `
            <th>Discount</th>
            <td>
              <span id="discountPrice">-₹0<span class="separator">.00</span></span>
            </td>
          `;
          orderTotalTr.parentNode.insertBefore(discountTr, orderTotalTr);
        }

        // Update discount
        document.getElementById("discountPrice").innerHTML =
          `-₹${result.discount}<span class="separator">.00</span>`;

        // Update total
        document.getElementById("totalPrice").innerHTML =
          `₹${result.total}<span class="separator">.00</span>`;

        // Store coupon
        localStorage.setItem("appliedCoupon", JSON.stringify({
          code: couponCode,
          discount: result.discount,
          total: result.total,
        }));
        localStorage.setItem("couponCode", couponCode);

        Swal.fire({
          icon: "success",
          title: "Coupon Applied!",
          text: result.message || "Discount applied successfully.",
          timer: 2000,
          showConfirmButton: false,
        });

        document.getElementById("couponCode").value = "";
        renderMiniCart();

      } else {
        Swal.fire("Failed", result.message || "Invalid coupon code.", "error");
      }
    } catch (error) {
      console.error("Apply Coupon Error:", error);
      Swal.fire("Error", "Server error. Please try again.", "error");
    }
  });
});


// *************************** apply coupend end ***************************





// ********************************** BUY NOW START **********************************
// ********************************** BUY NOW START **********************************

const buyNowApi = "https://edtech.colaborazia.com/api/order/buy-now"; // PRODUCTION URL

async function buyNow(courseId) {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    Swal.fire({
      icon: "error",
      title: "Login Required",
      text: "Please log in to purchase the course.",
      timer: 2000,
      showConfirmButton: false
    });
    return;
  }

  // Confirmation dialog
  const confirmResult = await Swal.fire({
    title: "Confirm Purchase?",
    text: "This course will be purchased immediately.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Buy Now!",
    cancelButtonText: "Cancel"
  });

  if (!confirmResult.isConfirmed) return;

  try {
    // 1️⃣ Call backend buy-now API
    const response = await fetch(`${buyNowApi}/${courseId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success && data.status !== "success") {
      throw new Error(data.message || "Unable to create order");
    }

    const order_id = data.order_id;
    const total_amount = data.total_amount; // total_amount comes from backend

    // 2️⃣ Create Razorpay Order
    const razorpayOrder = await createRazorpayOrder(order_id, total_amount, authToken);

    // 3️⃣ Open Razorpay Checkout
    const options = {
      key: razorpayOrder.key,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "Colaborazia EdTech",
      description: "Course Purchase",
      order_id: razorpayOrder.razorpay_order_id,
      handler: async function (response) {
        try {
          // 4️⃣ Verify Razorpay Payment
          const verifyData = await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            order_id: order_id
          }, authToken);

          Swal.fire({
            icon: "success",
            title: "Payment Successful! 🎉",
            text: verifyData.message || "You now have full access to the course.",
            timer: 3000,
            showConfirmButton: false
          }).then(() => {
            // Redirect after success
            window.location.href = "dashboard-index.php";
          });
        } catch (verifyErr) {
          Swal.fire("Error", verifyErr.message || "Payment verification failed", "error");
        }
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#28a745",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error("Buy Now / Razorpay Error:", err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message || "Something went wrong. Please try again later.",
    });
  }
}

// ************************** BUY NOW BUTTON LISTENERS **************************

// Single Course Detail Page
document.addEventListener("DOMContentLoaded", () => {
  const buyNowDetailBtn = document.getElementById("buyNowButton");
  if (buyNowDetailBtn) {
    buyNowDetailBtn.addEventListener("click", () => {
      const urlParams = new URLSearchParams(window.location.search);
      const courseId = urlParams.get("id");

      if (!courseId) {
        Swal.fire("Error", "Course not found.", "error");
        return;
      }

      buyNow(courseId); // Call updated buyNow function
    });
  }
});

// Course List / Grid Buttons
document.addEventListener("click", (e) => {
  const buyBtn = e.target.closest(".buyNowButton"); // Class used on list buttons
  if (!buyBtn) return;

  const courseId = buyBtn.getAttribute("data-course-id");

  if (!courseId) {
    Swal.fire("Error", "Course ID missing.", "error");
    return;
  }

  e.preventDefault();
  buyNow(courseId); // Call updated buyNow function
});

// ********************************** BUY NOW END **********************************
