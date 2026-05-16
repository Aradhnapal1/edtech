document.addEventListener("DOMContentLoaded", async () => {
    // const DOMAIN = "https://edtech.colaborazia.com";
    const getAllBlogsApi = "https://edtech.colaborazia.com/api/admin/get-all-blogs";
    
    // Get slug from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get("slug");
    
    if (!slug) {
        console.error("No slug found in URL");
        document.getElementById("blogDetailTitle").textContent = "Blog Not Found";
        document.getElementById("blogDetailDescription").innerHTML = "<p>Please provide a valid blog slug in the URL.</p>";
        return;
    }

    try {
        // Fetch all blogs and find the one with matching slug
        const response = await fetch(getAllBlogsApi);
        const data = await response.json();
        
        const blogs = data.data || data.blogs || data;
        if (!Array.isArray(blogs)) {
            console.error("Unexpected blog data format:", data);
            return;
        }

        // Find blog by slug
        const blog = blogs.find(b => b.slug === slug);
        
        if (!blog) {
            console.error("Blog not found with slug:", slug);
            document.getElementById("blogDetailTitle").textContent = "Blog Not Found";
            document.getElementById("blogDetailDescription").innerHTML = "<p>The requested blog could not be found.</p>";
            return;
        }

        // Format date
        const formatDate = (dateString) => {
            if (!dateString) return "";
            const date = new Date(dateString);
            return date.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
        };

        // Update page title in breadcrumb
        const breadcrumbTitle = document.getElementById("blogBreadcrumbTitle");
        if (breadcrumbTitle) {
            breadcrumbTitle.textContent = blog.name;
        }

        // Update blog image
        const blogImage = document.getElementById("blogDetailImage");
        if (blogImage) {
            blogImage.src = `${blog.image}`;
            blogImage.alt = blog.name;
            blogImage.style.display = "block";
        }

        // Update blog date
        const blogDate = document.getElementById("blogDetailDate");
        if (blogDate) {
            blogDate.textContent = formatDate(blog.updatedAt);
        }

        // Update blog title
        const blogTitle = document.getElementById("blogDetailTitle");
        if (blogTitle) {
            blogTitle.textContent = blog.name;
        }

        // Update blog description/content
        const blogDescription = document.getElementById("blogDetailDescription");
        if (blogDescription && blog.description) {
            // Convert description to paragraphs (split by double newlines first, then single newlines)
            let formattedDescription = blog.description;
            
            // Replace \r\n with \n for consistency
            formattedDescription = formattedDescription.replace(/\r\n/g, '\n');
            
            // Split by double newlines (paragraph breaks)
            const paragraphs = formattedDescription.split(/\n\n+/).filter(p => p.trim());
            
            if (paragraphs.length > 0) {
                blogDescription.innerHTML = paragraphs.map(p => {
                    const trimmed = p.trim();
                    // Replace single newlines within paragraphs with <br>
                    const withBreaks = trimmed.replace(/\n/g, '<br>');
                    return `<p>${withBreaks}</p>`;
                }).join("");
            } else {
                // If no double newlines, split by single newlines
                const lines = formattedDescription.split(/\n/).filter(l => l.trim());
                if (lines.length > 0) {
                    blogDescription.innerHTML = lines.map(line => `<p>${line.trim()}</p>`).join("");
                } else {
                    blogDescription.innerHTML = `<p>${blog.description}</p>`;
                }
            }
        }

        // Update page title in browser tab
        document.title = `${blog.name} - Blog Details`;

        // ========== POPULATE LATEST POSTS (Sidebar - First 3, excluding current) ==========
        const latestPostsContainer = document.getElementById("latestPostsContainer");
        if (latestPostsContainer) {
            // Filter out current blog and sort by date (newest first)
            const otherBlogs = blogs
                .filter(b => b.slug !== slug)
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .slice(0, 3); // Get first 3

            if (otherBlogs.length > 0) {
                latestPostsContainer.innerHTML = otherBlogs.map(blogItem => {
                    const imageUrl = `${blogItem.image}`;
                    const blogDate = formatDate(blogItem.updatedAt);
                    
                    return `
                        <li>
                            <div class="sidebar-widget-02__psot-item">
                                <div class="sidebar-widget-02__psot-thumbnail">
                                    <a href="blog-details.php?slug=${blogItem.slug}">
                                        <img src="${imageUrl}" alt="${blogItem.name}" width="100" height="80" style="object-fit: cover;">
                                        <div class="sidebar-widget-02__categories">
                                            <span>Blog</span>
                                        </div>
                                    </a>
                                </div>
                                <div class="sidebar-widget-02__psot-info">
                                    <h5 class="sidebar-widget-02__psot-title">
                                        <a href="blog-details.php?slug=${blogItem.slug}">${blogItem.name}</a>
                                    </h5>
                                    <span class="sidebar-widget-02__psot-date">${blogDate}</span>
                                </div>
                            </div>
                        </li>
                    `;
                }).join("");
            } else {
                latestPostsContainer.innerHTML = "<li><p>No other blogs available.</p></li>";
            }
        }

        // ========== POPULATE RELATED POSTS (Slider - All blogs excluding current) ==========
        const relatedPostsContainer = document.getElementById("relatedPostsContainer");
        if (relatedPostsContainer) {
            // Filter out current blog and sort by date (newest first)
            const relatedBlogs = blogs
                .filter(b => b.slug !== slug)
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

            if (relatedBlogs.length > 0) {
                relatedPostsContainer.innerHTML = relatedBlogs.map(blogItem => {
                    const imageUrl = `${blogItem.image}`;
                    const blogDate = formatDate(blogItem.updatedAt);
                    
                    return `
                        <div class="swiper-slide">
                            <!-- Related Post Item Start -->
                            <div class="related-post-item">
                                <div class="related-post-item__image">
                                    <a href="blog-details.php?slug=${blogItem.slug}">
                                        <img src="${imageUrl}" alt="${blogItem.name}" width="237" height="129" style="object-fit: cover;">
                                    </a>
                                </div>
                                <div class="related-post-item__content">
                                    <h3 class="related-post-item__title">
                                        <a href="blog-details.php?slug=${blogItem.slug}">${blogItem.name}</a>
                                    </h3>
                                    <div class="related-post-item__meta">
                                        <span class="meta-action"><i class="fas fa-calendar"></i> ${blogDate}</span>
                                        <span class="meta-action"><i class="fas fa-eye"></i> 0 views</span>
                                    </div>
                                </div>
                            </div>
                            <!-- Related Post Item End -->
                        </div>
                    `;
                }).join("");

                // Reinitialize Swiper after adding slides dynamically
                if (window.Swiper && document.querySelector('.related-posts .swiper')) {
                    setTimeout(() => {
                        const swiper = new Swiper('.related-posts .swiper', {
                            slidesPerView: 3,
                            spaceBetween: 30,
                            navigation: {
                                nextEl: '.related-posts .swiper-button-next',
                                prevEl: '.related-posts .swiper-button-prev',
                            },
                            breakpoints: {
                                0: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                992: {
                                    slidesPerView: 3,
                                }
                            }
                        });
                    }, 100);
                }
            } else {
                relatedPostsContainer.innerHTML = "<div class='swiper-slide'><p>No related posts available.</p></div>";
            }
        }

    } catch (err) {
        console.error("Error fetching blog details:", err);
        document.getElementById("blogDetailTitle").textContent = "Error Loading Blog";
        document.getElementById("blogDetailDescription").innerHTML = "<p>An error occurred while loading the blog. Please try again later.</p>";
    }
});
