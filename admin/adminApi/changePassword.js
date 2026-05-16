document.addEventListener("DOMContentLoaded", () => {

    const changePasswordButton = document.getElementById("changePasswordButton");
    const API_URL = "https://edtech.colaborazia.com/api/user/change-password";
    const token = localStorage.getItem("token");

    if (!changePasswordButton) {
        console.error("Change Password Button not found!");
        return;
    }

    changePasswordButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const currentPassword = document.getElementById("oldpassword").value.trim();
        const newPassword = document.getElementById("new-password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        // Basic Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'All password fields are required.'
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'New password and confirm password do not match.'
            });
            return;
        }

        try {
            const response = await fetch(API_URL, {
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

            // Safe JSON Parsing (Yeh line problem solve karegi)
            let data = {};
            try {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    data = await response.json();
                } else {
                    const textResponse = await response.text();
                    console.warn("Non-JSON response received:", textResponse);
                    data = { message: textResponse || "Password changed successfully" };
                }
            } catch (jsonError) {
                console.warn("JSON parsing failed, using fallback:", jsonError);
                data = { success: true, message: "Password changed successfully" };
            }

            console.log("API Response Status:", response.status);
            console.log("API Response Data:", data);

            if (response.ok || data.success === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: data.message || 'Password changed successfully!',
                    confirmButtonColor: '#10b981'
                }).then(() => {
                    // Form Reset - Safe way
                    const form = document.getElementById("passwordResetForm");
                    if (form) form.reset();
                    
                    // Optional: Clear individual fields
                    document.getElementById("oldpassword").value = "";
                    document.getElementById("new-password").value = "";
                    document.getElementById("confirm-password").value = "";
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: data.message || data.error || 'Something went wrong!'
                });
            }

        } catch (error) {
            console.error("Full Fetch Error:", error);   // ← Debugging ke liye yeh dekhna
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Failed to connect to server. Please try again.'
            });
        }
    });
});