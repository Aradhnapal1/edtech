document.addEventListener('DOMContentLoaded',function(){
    const logoutItem = document.getElementById("logout-item");
    if (logoutItem) {
        logoutItem.addEventListener("click", function() {
            localStorage.removeItem("token");
            Swal.fire({
                title: "Logged Out",
                text: "You have been logged out successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "logout.php";
            });
        });
    }

});

document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found");
        return;
    }

    // ===============================
    // JWT DECODE FUNCTION
    // ===============================
    function parseJwt(token) {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            return JSON.parse(atob(base64));
        } catch (err) {
            console.error("Invalid token", err);
            return null;
        }
    }

    const decoded = parseJwt(token);

    if (!decoded) return;

    // ===============================
    // DATA SET INTO UI
    // ===============================
    const fullName = `${decoded.FirstName || ""} ${decoded.LastName || ""}`.trim();
    const email = decoded.email || decoded.UserEmail || "";

    document.getElementById("userName").innerText = fullName || "User";
    document.getElementById("userEmail").innerText = email || "Email not available";
});

document.addEventListener("DOMContentLoaded", function () {

    const addAdminBtn = document.getElementById("addAdmin");

    if (!addAdminBtn) {
        console.error("Add Admin button not found");
        return;
    }

    addAdminBtn.addEventListener("click", async function (e) {

        e.preventDefault();

        // Get Values
        const firstname = document.getElementById("fnameadmin").value.trim();
        const lastname = document.getElementById("lnameadmin").value.trim();
        const email = document.getElementById("emailadmin").value.trim();
        const phone = document.getElementById("phoneadmin").value.trim();
        const password = document.getElementById("current-password").value.trim();
        const role = document.getElementById("roleadmin").selectedOptions[0]?.text || "";

        // Validation
        if (!firstname || !lastname || !email || !phone || !password || !role) {
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: "All fields are required"
            });
            return;
        }

        // Disable Button
        addAdminBtn.disabled = true;
        addAdminBtn.innerText = "Saving...";

        try {

            // FormData (same as Postman)
            const formData = new FormData();

            formData.append("firstname", firstname);
            formData.append("lastname", lastname);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("password", password);
            formData.append("role", role);

            const response = await fetch(
                "https://edtech.colaborazia.com/add-user",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            console.log("API Response:", result);

            if (response.ok && result.success) {

                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: result.message || "User created successfully",
                    confirmButtonColor: "#3085d6"
                });

                // Reset Form
                document.querySelector("form").reset();

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: result.message || "Failed to create user"
                });

            }

        } catch (error) {

            console.error("Add User Error:", error);

            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Unable to connect to server"
            });

        } finally {

            addAdminBtn.disabled = false;
            addAdminBtn.innerText = "Save Changes";

        }

    });

});