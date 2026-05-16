// const getAllCategory = "https://edtech.colaborazia.com/api/admin/get-categories";

// async function loadCategories() {
//     // const token = localStorage.getItem("authToken");

//     // if (!token) {
//     //     console.error("Token missing");
//     //     return;
//     // }

//     try {
//         const response = await fetch(getAllCategory, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 // "Authorization": `Bearer ${token}`
//             }
//         });

//         const result = await response.json();
//         console.log("Category API Response 👉", result);

//         // Adjust this if API structure is different
//         const categories = result.data || result;

//         const categoryList = document.getElementById("categoryList");
//         categoryList.innerHTML = "";

//         categories.forEach((cat, index) => {
//             categoryList.innerHTML += `
//                 <li>
//                     <div class="widget-filter__item">
//                         <input type="checkbox" 
//                                id="category_${cat.id || index}" 
//                                value="${cat.categoryName}">
//                         <label for="category_${cat.id || index}">
//                             ${cat.categoryName}
//                         </label>
//                     </div>
//                 </li>
//             `;
//         });

//     } catch (error) {
//         console.error("Error loading categories:", error);
//     }
// }

// // Call on page load
// loadCategories();


const getAllCategory = "https://edtech.colaborazia.com/api/admin/get-categories";

async function loadCategories() {
    try {
        const response = await fetch(getAllCategory, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = await response.json();
        const categories = result.data || result;

        const categoryList = document.getElementById("categoryList");
        const categoryList2 = document.getElementById("categoryList2");

        categoryList.innerHTML = "";
        categoryList2.innerHTML = "";

        categories.forEach((cat, index) => {
            const baseId = cat.id || index;

            // UL 1 id
            const id1 = `category1_${baseId}`;

            // UL 2 id
            const id2 = `category2_${baseId}`;

            const html1 = `
                <li>
                    <div class="widget-filter__item">
                        <input type="checkbox" 
                               id="${id1}" 
                               value="${cat.categoryName}"
                               data-category-id="${baseId}">
                        <label for="${id1}">
                            ${cat.categoryName}
                        </label>
                    </div>
                </li>
            `;

            const html2 = `
                <li>
                    <div class="widget-filter__item">
                        <input type="checkbox" 
                               id="${id2}" 
                               value="${cat.categoryName}"
                               data-category-id="${baseId}">
                        <label for="${id2}">
                            ${cat.categoryName}
                        </label>
                    </div>
                </li>
            `;

            categoryList.innerHTML += html1;
            categoryList2.innerHTML += html2;
        });

    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

loadCategories();



// *****************************************GET ALL LANGUAGE*****************************************
const getAllLanguage = "https://edtech.colaborazia.com/api/admin/get-all-lang";

async function loadLanguages() {
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch(getAllLanguage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            }
        });

        const result = await response.json();
        const languages = result.data || result;

        const languageList = document.getElementById("languageList");
        const languageList2 = document.getElementById("languageList2");

        languageList.innerHTML = "";
        languageList2.innerHTML = "";

        languages.forEach((lang, index) => {
            const baseId = lang.id || index;

            // UL 1 id
            const id1 = `language1_${baseId}`;

            // UL 2 id
            const id2 = `language2_${baseId}`;

            const html1 = `
                <li>
                    <div class="widget-filter__item">
                        <input type="checkbox"
                               id="${id1}"
                               value="${lang.language_name}"
                               data-language-id="${baseId}">
                        <label for="${id1}">
                            ${lang.language_name}
                        </label>
                    </div>
                </li>
            `;

            const html2 = `
                <li>
                    <div class="widget-filter__item">
                        <input type="checkbox"
                               id="${id2}"
                               value="${lang.language_name}"
                               data-language-id="${baseId}">
                        <label for="${id2}">
                            ${lang.language_name}
                        </label>
                    </div>
                </li>
            `;

            languageList.innerHTML += html1;
            languageList2.innerHTML += html2;
        });

    } catch (error) {
        console.error("Error loading languages:", error);
    }
}

loadLanguages();


// ************************************************************** header cateory dropdown  ******************************************

document.addEventListener("DOMContentLoaded", async function () {

    try {
        const res = await fetch("https://edtech.colaborazia.com/api/admin/get-categories");
        const result = await res.json();

        console.log("Categories:", result);

        const categories = result.data;
        const ul = document.getElementById("categoryHeaderList");
        ul.innerHTML = "";

        categories.forEach(cat => {

            // Only active categories
            if (!cat.isActive) return;

            ul.innerHTML += `
                <li>
                    <a href="course.php?category=${cat.categorySlug}">
                        ${cat.categoryName}
                    </a>
                </li>
            `;
        });



    } catch (error) {
        console.error("Category API Error:", error);
    }

});

