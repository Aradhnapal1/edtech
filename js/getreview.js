addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("token");
    const container = document.getElementById("reviewContainer");
    const courseTitle = document.getElementById("courseTitle");

    // Get Course ID from URL
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");

    if (!courseId) {
        container.innerHTML = "<p style='color:red;'>Course ID not found in URL</p>";
        return;
    }

    if (!token) {
        container.innerHTML = "<p style='color:red;'>Token not found. Please login.</p>";
        return;
    }

    container.innerHTML = "Loading reviews...";

    // STEP 1: Fetch Course Details
    fetch(`https://edtech.colaborazia.com/api/admin/get-course/${courseId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    })
    .then(res => res.json())
    .then(courseData => {

        console.log("Course Data:", courseData);

        if (courseTitle && courseData.success) {
            courseTitle.innerText = courseData.data.course_name;
        }

        const id = courseData.data.id;

        // STEP 2: Fetch Reviews
        return fetch(`https://edtech.colaborazia.com/api/admin/get-all-review/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        });

    })
    .then(res => res.json())
    .then(data => {

        console.log("Review Data:", data);

        container.innerHTML = "";

        if (!data.success || !data.reviews || data.reviews.length === 0) {
            container.innerHTML = "<p>No reviews available.</p>";
            return;
        }

        data.reviews.forEach(review => {

            let stars = "";
            for (let i = 1; i <= 5; i++) {
                stars += i <= review.rating ? "★" : "☆";
            }

            const reviewHTML = `
            <div style="background:#f7fafc;border-left:4px solid rgb(20,20,20);padding:15px;margin-bottom:15px;border-radius:8px;">
                
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    
                    <strong style="color:#031f42;">
                        ${review.first_name} ${review.last_name}
                    </strong>

                    <div style="color:rgb(247,148,29);font-size:16px;">
                        ${stars}
                    </div>

                </div>

                <p style="color:#4a5568;margin:0;font-size:14px;line-height:1.6;">
                    ${review.review_text}
                </p>

            </div>
            `;

            container.insertAdjacentHTML("beforeend", reviewHTML);

        });

    })
    .catch(error => {

        console.error("Error:", error);

        container.innerHTML = "<p style='color:red;'>Failed to load reviews.</p>";

    });

});