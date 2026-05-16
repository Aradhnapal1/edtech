document.addEventListener("DOMContentLoaded", async () => {
    const getBlog = "https://edtech.colaborazia.com/api/admin/get-all-blogs";
    const DOMAIN = "https://edtech.colaborazia.com";

    try {
        const response = await fetch(getBlog);
        const data = await response.json();

        const blogs = data.data || data.blogs || data;
        console.log("Total blogs fetched:", data);

        const blogContainer = document.getElementById("blogContainer");
        const loadMoreBtn = document.getElementById("loadMoreBtn");

        let visibleCount = 3; // Show only first 3 initially

        function formatDate(dateString) {
            if (!dateString) return "";
            const date = new Date(dateString);
            return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
        }

        function renderBlogs(count) {
            blogContainer.innerHTML = "";
            blogs.slice(0, count).forEach(blog => {
                const div = document.createElement("div");
                div.className = "col-xl-4 col-md-6 mb-4";

                const imageUrl = `${blog.image}`;
                const updatedDate = formatDate(blog.updatedAt);

                div.innerHTML = `
                    <div class="blog-item-02 border rounded overflow-hidden h-100">
                        <div class="blog-item-02__image">
                            <a href="blog-details.php?slug=${blog.slug}">
                                <img src="${imageUrl}" alt="${blog.name}" class="img-fluid w-100" style="height:201px; object-fit:cover;">
                            </a>
                        </div>
                        <div class="p-3">
                          <p class="text-muted small mb-2">Updated: ${updatedDate}</p>
                            <h5 class="mb-2">${blog.name}</h5>
                          
                            <p>${blog.description.substring(0, 150)}...</p>
                            <a href="blog-details.php?slug=${blog.slug}" class="text-primary">Read More</a>
                        </div>
                    </div>
                `;
                blogContainer.appendChild(div);
            });

            // Hide button if all blogs are shown
            if (visibleCount >= blogs.length) {
                loadMoreBtn.style.display = "none";
            } else {
                loadMoreBtn.style.display = "inline-block";
            }
        }

        // Initial render
        renderBlogs(visibleCount);

        // Load More button click
        loadMoreBtn.addEventListener("click", () => {
            visibleCount += 3; // show 3 more blogs on each click
            renderBlogs(visibleCount);
        });

    } catch (err) {
        console.error("Error fetching blogs:", err);
    }
});



// ****************************************get All blog in bog page******************************



document.addEventListener("DOMContentLoaded", async () => {
    const getBlog = "https://edtech.colaborazia.com/api/admin/get-all-blogs";
    const DOMAIN = "https://edtech.colaborazia.com";

    try {
        const response = await fetch(getBlog);
        const data = await response.json();

        const blogs = data.data || data.blogs || data;
        console.log("Total blogs fetched:", blogs);

        const blogContainer = document.getElementById("allblogContainer");

        function formatDate(dateString) {
            if (!dateString) return "";
            const date = new Date(dateString);
            return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
        }

        function renderBlogs() {
            blogContainer.innerHTML = ""; // clear container
            blogs.forEach(blog => {
                const div = document.createElement("div");
                div.className = "col-xl-4 col-md-6 mb-4";

                
                const imageUrl = `${blog.image}`;
                const updatedDate = formatDate(blog.updatedAt);

                div.innerHTML = `
                    <div class="blog-item-02 border rounded overflow-hidden ">
                        <div class="blog-item-02__image">
                            <a href="blog-details.php?slug=${blog.slug}">
                                <img src="${imageUrl}" alt="${blog.name}" class="img-fluid w-100" style="height:201px; object-fit:cover;">
                            </a>
                        </div>
                        <div class="p-3">
                          <p class="text-muted small mb-2">Updated: ${updatedDate}</p>
                            <h5 class="mb-2">${blog.name}</h5>
                            <p>${blog.description.substring(0, 150)}...</p>
                           
                            <a class="blog-item__more btn btn-light btn-hover-white" href="blog-details.php?slug=${blog.slug}">Read More <i class="fas  fa-long-arrow-right"></i></a>
                        </div>
                    </div>
                `;
                blogContainer.appendChild(div);
            });
        }

        // Render all blogs at once
        renderBlogs();

    } catch (err) {
        console.error("Error fetching blogs:", err);
    }
});
