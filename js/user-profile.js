document.addEventListener("DOMContentLoaded", () => {

    const changePasswordUrl = "https://edtech.colaborazia.com/api/user/change-password";
    const token = localStorage.getItem("authToken");

    const passwordForm = document.getElementById("passwordResetForm");

    if (passwordForm) {
        passwordForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const currentPassword = document.getElementById("currentPassword").value.trim();
            const newPassword = document.getElementById("newPassword").value.trim();
            const confirmPassword = document.getElementById("confirmNewPassword").value.trim();

            if (newPassword !== confirmPassword) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Mismatch',
                    text: 'New password and confirm password do not match.'
                });
                return;
            }

            if (!currentPassword || !newPassword) {
                Swal.fire({ icon: 'warning', text: 'All fields are required!' });
                return;
            }

            try {
                const response = await fetch(changePasswordUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        OldPassword: currentPassword,
                        NewPassword: newPassword,
                        ConfirmNewPassword: confirmPassword
                    })
                });

                // Safe JSON parsing
                let data = {};
                const contentType = response.headers.get("content-type");

                if (contentType && contentType.includes("application/json")) {
                    try {
                        data = await response.json();
                    } catch (jsonError) {
                        console.warn("Response is not valid JSON", jsonError);
                        data = { message: "Password changed successfully" }; // fallback
                    }
                } else {
                    // Agar JSON nahi hai to text le lo
                    const text = await response.text();
                    console.warn("Non-JSON response:", text);
                    data = { message: text || "Password changed successfully" };
                }

                console.log("API Response:", response.status, data); // debugging

                if (response.ok && (data.success === true || data.message?.toLowerCase().includes("success"))) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: data.message || 'Password changed successfully!',
                        confirmButtonColor: '#10b981'
                    }).then(() => {
                        passwordForm.reset();   // Form reset
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: data.message || data.error || 'Something went wrong!'
                    });
                }

            } catch (error) {
                console.error("Full Fetch Error:", error);  // ← Yeh console mein dekhna
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to connect to server. Please try again.'
                });
            }
        });
    }
});

// ====================================================================== GET PROFILE ============================================

document.addEventListener("DOMContentLoaded", async function () {

    const token = localStorage.getItem("authToken");

    // ---------- Helpers ----------
    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value || "-";
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        const d = new Date(dateStr);
        return isNaN(d) ? "-" : d.toLocaleDateString();
    };

    try {
        const res = await fetch("https://edtech.colaborazia.com/api/user/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) throw new Error("Profile fetch failed");

        const result = await res.json();
        console.log("PROFILE API:", result);

        const user = result.user || {};

        // ---------- Text Fields ----------
        setText("firstName", user.firstName);
        setText("lastName", user.lastName);
        setText("displayName", user.displayName);
        setText("dashboardUserName", user.displayName);
        setText("email", user.email);
        setText("phone", user.phoneNumber);
        setText("gender", user.gender);
        setText("address", user.address);
        setText("dob", formatDate(user.dateOfBirth));

        // ---------- Avatar Image ----------
        const avatar = document.getElementById("dashboardUserAvatar");
        let imgPath = "assets/images/avatar/avatar-02.jpg"; // default

        if (user.profileImageUrl && user.profileImageUrl.trim() !== "") {
            imgPath = user.profileImageUrl;

        } else if (user.profileImage && user.profileImage.trim() !== "") {

            if (user.profileImage.startsWith("http")) {
                imgPath = user.profileImage;

            } else if (user.profileImage.includes("uploads")) {
                imgPath = "https://edtech.colaborazia.com/" + user.profileImage;

            } else {
                imgPath = "https://edtech.colaborazia.com/uploads/profile/" + user.profileImage;
            }
        }

        if (avatar) avatar.src = imgPath;

    } catch (error) {
        console.error("Error loading profile:", error);
    }

});



// ====================================================================== end get profile ============================================




document.addEventListener("DOMContentLoaded", async function () {

    const token = localStorage.getItem("authToken");

    const photoDiv = document.getElementById("profile-photo");
    const photoInput = document.getElementById("photoInput");
    const editBtn = document.getElementById("editprofile") || document.querySelector(".dashboard-settings__btn button");

    let selectedFile = null;

    // ================= LOAD PROFILE (GET) =================
    try {
        const res = await fetch("https://edtech.colaborazia.com/api/user/profile", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await res.json();
        const user = result.user;

        // ---------- Fill form fields ----------
        if (document.getElementById("firstName")) document.getElementById("firstName").value = user.firstName || "";
        if (document.getElementById("lastName")) document.getElementById("lastName").value = user.lastName || "";
        if (document.getElementById("phone")) document.getElementById("phone").value = user.phoneNumber || "";
        if (document.getElementById("address")) document.getElementById("address").value = user.address || "";

        // ✅ Gender case fix
        let genderSelect = document.getElementById("gender");
        if (!genderSelect) {
            const selects = document.querySelectorAll("select.form-control");
            for (let s of selects) {
                if (s.innerHTML.toLowerCase().includes("male")) {
                    genderSelect = s;
                    break;
                }
            }
        }
        if (user.gender && genderSelect) {
            const val = user.gender.trim().toLowerCase();
            for (let i = 0; i < genderSelect.options.length; i++) {
                if (genderSelect.options[i].value === val) {
                    genderSelect.value = val;
                    break;
                }
            }
        }


        // ✅ DOB format fix
        if (user.dateOfBirth) {
            const d = new Date(user.dateOfBirth);
            const dobEl = document.getElementById("dob");
            if (dobEl) dobEl.value = d.toISOString().split("T")[0];
        }

        // ---------- Show profile image ----------
        let imgPath = "assets/images/avatar/avatar-02.jpg"; // default
        if (user.profileImageUrl && user.profileImageUrl.trim() !== "") {
            imgPath = user.profileImageUrl;
        } else if (user.profileImage && user.profileImage.trim() !== "") {
            if (user.profileImage.startsWith("http")) {
                imgPath = user.profileImage;
            } else if (user.profileImage.includes("uploads")) {
                imgPath = "https://edtech.colaborazia.com/" + user.profileImage;
            } else {
                imgPath = "https://edtech.colaborazia.com/uploads/profile/" + user.profileImage;
            }
        }
        if (photoDiv) {
            photoDiv.style.backgroundImage = `url('${imgPath}')`;
        }

    } catch (err) {
        console.error("Profile load error:", err);
    }

    // ================= PHOTO CLICK TO UPLOAD =================
    if (photoDiv && photoInput) {
        photoDiv.addEventListener("click", (e) => {
            // Prevent double opening by checking if the click target is already the input
            if (e.target !== photoInput) {
                photoInput.click();
            }
        });
    }

    // ================= PREVIEW SELECTED IMAGE =================
    if (photoInput) {
        photoInput.addEventListener("change", function () {
            selectedFile = this.files[0];

            if (selectedFile) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    photoDiv.style.backgroundImage = `url(${e.target.result})`;
                };
                reader.readAsDataURL(selectedFile);
            }
        });
    }

    // ================= UPDATE PROFILE (PUT) =================

if (editBtn) {
    editBtn.addEventListener("click", async function (e) {
        e.preventDefault();

        // Create FormData payload
        const formData = new FormData();
        formData.append("firstName", document.getElementById("firstName")?.value || "");
        formData.append("lastName", document.getElementById("lastName")?.value || "");
        formData.append("phoneNumber", document.getElementById("phone")?.value || "");
        formData.append("Address", document.getElementById("address")?.value || "");
        
        // Append raw file directly for profile_image
        if (selectedFile) {
            formData.append("profile_image", selectedFile);
        }

        // Gender
        let genderEl = document.getElementById("gender");
        if (!genderEl) {
            const selects = document.querySelectorAll("select.form-control");
            for (let s of selects) {
                if (s.innerHTML.toLowerCase().includes("male")) {
                    genderEl = s;
                    break;
                }
            }
        }
        if (genderEl) formData.append("Gender", genderEl.value);

        // Date of Birth
        const dobEl = document.getElementById("dob");
        if (dobEl?.value) formData.append("dateOfBirth", dobEl.value);

        try {
            const res = await fetch("https://edtech.colaborazia.com/api/user/profile", {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    // Do NOT set Content-Type; the browser will automatically set it for FormData (multipart/form-data)
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            const data = await res.json();

            if (res.ok) {
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Profile updated successfully ✅",
                        timer: 1500,
                        showConfirmButton: false
                    }).then(() => {
  window.location.href = "dashboard-profile.php";
});
                } else {
                    alert("Profile updated successfully ✅");
                    window.location.reload();
                }
            } else {
                throw new Error(data.message || data.error || "Update failed");
            }

        } catch (err) {
            console.error("Update error:", err);
            if (typeof Swal !== "undefined") {
                Swal.fire("Error", err.message || "Update failed ❌", "error");
            } else {
                alert("Update failed ❌");
            }
        }
    });
}
});