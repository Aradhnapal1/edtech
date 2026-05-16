document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('testimonial-container');
    if (!container) {
        console.error("testimonial-container not found");
        return;
    }

    // Change these as per your setup
    const API_URL    = "https://edtech.colaborazia.com/api/admin/get-all-testimonial";
    const BASE_URL   = "https://edtech.colaborazia.com";
    const FALLBACK   = "assets/images/avatar/avatar-01.jpg";

    // ← Your token should come from here (like in checkout)
    // Example sourcesdd:
    // const authtoken = localStorage.getItem('auth_token');
    // const authtoken = sessionStorage.getItem(ssdsd'user_token');
    // or from login response: authtoken = loginResponse.token;
    
    const authtoken = localStorage.getItem('token');  // ← CHANGE THIS to match your storage

    if (!authtoken) {
        console.error("No auth token found. Please login first.");
        container.innerHTML = '<div class="swiper-slide"><p class="text-center p-5 text-danger">Please login to view testimonials</p></div>';
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "GET",                      // ← usually GET for listing
            headers: {
                "Authorization": `Bearer ${authtoken}`,   // ← exactly like your checkout example
                "Accept": "application/json",
                "Content-Type": "application/json"        // optional but safe
            }
            // body: not needed for GET
        });

        console.log("API Response Status:", response.status);

        if (!response.ok) {
            let errorDetail = "";
            try {
                const errorJson = await response.json();
                errorDetail = errorJson.message || JSON.stringify(errorJson);
            } catch {
                errorDetail = await response.text();
            }
            throw new Error(`API failed: ${response.status} - ${errorDetail}`);
        }

        const result = await response.json();
        console.log("Testimonials data:", result);

        // Adjust based on your actual response structure
        let testimonials = Array.isArray(result) ? result :
                          result.data ? result.data :
                          result.testimonials ? result.testimonials : [];

        if (!Array.isArray(testimonials) || testimonials.length === 0) {
            container.innerHTML = '<div class="swiper-slide"><p class="text-center p-5">No testimonials found</p></div>';
            return;
        }

        testimonials = testimonials.filter(item => item.is_active !== false);
        container.innerHTML = '';  // clear previous content

        testimonials.forEach(item => {
            const name     = item.test_name   || "Anonymous";
            const position = item.discription || "";
            const message  = item.test_content || "No review text";
            const avatar   = item.image ? `${item.image}` : FALLBACK;

            container.insertAdjacentHTML('beforeend', `
                <div class="swiper-slide">
                    <div class="testimonial-item bg-white">
                        <div class="testimonial-quote-icon"></div>
                        <div class="testimonial-main-content">
                            <div class="testimonial-caption">
                                <p>${message}</p>
                            </div>
                            <div class="testimonial-info">
                                <div class="testimonial-info__image">
                                    <img src="${avatar}" alt="${name}" width="60" height="60" onerror="this.src='${FALLBACK}'">
                                </div>
                                <div class="testimonial-info__caption">
                                    <h5 class="testimonial-info__name">${name}</h5>
                                    ${position ? `<p class="testimonial-info__designation">/ ${position}</p>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });

        // Re-initialize Swiper after adding slides
        if (typeof Swiper !== 'undefined') {
            new Swiper('.testimonial-active-02 .swiper', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                breakpoints: {
                    640:  { slidesPerView: 1 },
                    768:  { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }
            });
        } else {
            console.warn("Swiper not loaded");
        }

    } catch (err) {
        console.error("Fetch error:", err.message);
        container.innerHTML = `
            <div class="swiper-slide">
                <p class="text-center p-5 text-danger fw-bold">
                    ${err.message.includes('401') ? 'Invalid or expired token – please login again' : 'Failed to load testimonials'}
                </p>
            </div>
        `;
    }
});