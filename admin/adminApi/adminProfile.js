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

document.addEventListener('DOMContentLoaded', function () {
document.getElementById("addAdmin").addEventListener("click", async function (e) {
  e.preventDefault();

  // Get input values
  const firstname = document.getElementById("fnameadmin").value.trim();
  const lastname  = document.getElementById("lnameadmin").value.trim();
  const email     = document.getElementById("emailadmin").value.trim();
  const phone     = document.getElementById("phoneadmin").value.trim();
  const password  = document.getElementById("current-password").value.trim();
const roleSelect = document.getElementById("roleadmin");
const role = roleSelect.options[roleSelect.selectedIndex].text;

  // Validation
  if (!firstname || !lastname || !email || !phone || !password || !role) {
    Swal.fire("Error", "All fields are required", "error");
    return;
  }

  // Payload
  const payload = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    phone: phone,
    password: password,
    role: role   // 1 = ADMIN, 2 = SUPERADMIN
  };

  try {
    const response = await fetch("https://edtech.colaborazia.com/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Admin Added Successfully",
        text: result.message || "New admin has been added",
        confirmButtonColor: "#3085d6"
      });

      // Reset form
      document.querySelector("form")?.reset();
    } else {
      Swal.fire("Error", result.message || "Something went wrong", "error");
    }

  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Server not responding", "error");
  }
});
});