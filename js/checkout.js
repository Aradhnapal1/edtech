// ---------------------------- CHECKOUT API ----------------------------------------- 
const checkout = "https://edtech.colaborazia.com/api/order/checkout";

// =============================== 
// JWT TOKEN DECODE (ONLY FOR NAME + EMAIL) 
// =============================== 
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch (err) {
    console.error("Invalid token");
    return null;
  }
}

// =============================== 
// ASYNC FUNCTION TO CREATE RAZORPAY ORDER 
// =============================== 
async function createRazorpayOrder(order_id, amount, authtoken) {
  const formData = new FormData();
  formData.append("order_id", order_id);
  formData.append("amount", amount);

  try {
    const response = await fetch("https://edtech.colaborazia.com/api/order/razorpay/create", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authtoken}`
      },
      body: formData
    });

    const data = await response.json();
    console.log("Create Order Response:", data);

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Order creation failed");
    }

    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

// =============================== 
// ASYNC FUNCTION TO VERIFY RAZORPAY PAYMENT 
// =============================== 
async function verifyRazorpayPayment(payload, authtoken) {
  const formData = new FormData();
  formData.append("razorpay_order_id", payload.razorpay_order_id);
  formData.append("razorpay_payment_id", payload.razorpay_payment_id);
  formData.append("razorpay_signature", payload.razorpay_signature);
  formData.append("order_id", payload.order_id);

  try {
    const response = await fetch("https://edtech.colaborazia.com/api/order/razorpay/verify", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authtoken}`
      },
      body: formData
    });

    const data = await response.json();
    console.log("Verify Payment Response:", data);

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Payment verification failed");
    }

    return data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
}

// =============================== 
// MAIN DOMCONTENTLOADED EVENT LISTENER 
// =============================== 
document.addEventListener("DOMContentLoaded", function () {
  // =============================== 
  // SHOW FULL NAME & EMAIL 
  // =============================== 
  const authtoken = localStorage.getItem("authToken");
  if (authtoken) {
    const user = parseJwt(authtoken);
    if (user) {
      const fullName = `${user.FirstName || ""} ${user.LastName || ""}`.trim();
      const nameEl = document.getElementById("userName");
      const emailEl = document.getElementById("userEmail");
      if (nameEl) nameEl.innerText = fullName || "User";
      if (emailEl) emailEl.innerText = user.Email || user.email || "";
    }
  }

  // =============================== 
  // LOAD AND DISPLAY CHECKOUT DATA FROM LOCALSTORAGE (ON CHECKOUT.PHP) 
  // =============================== 
  const checkoutData = localStorage.getItem("checkoutData");
  if (checkoutData) {
    try {
      const data = JSON.parse(checkoutData);
      console.log("Loaded Checkout Data:", data);

      // Update subtotal, discount, total
      const subTotalEl = document.getElementById("checkoutSubTotal");
      const couponEl = document.getElementById("coupunDiscount");
      const totalEl = document.getElementById("checkTotal");

      if (subTotalEl) subTotalEl.innerText = `₹${Number(data.subtotal).toLocaleString("en-IN")}`;
      if (couponEl) couponEl.innerText = `- ₹${Number(data.coupon_discount).toLocaleString("en-IN")}`;
      if (totalEl) totalEl.innerText = `₹${Number(data.total_amount).toLocaleString("en-IN")}`;

      // Display Order ID
      const orderIdEl = document.getElementById("orderId");
      if (orderIdEl && data.order_id) {
        orderIdEl.innerText = `Order ID: #${data.order_id}`;
      }

      // =============================== 
      // DISPLAY DYNAMIC COURSES LIST WITH IMAGE & NAME FROM API 
      // =============================== 
      const coursesListEl = document.getElementById("coursesList");
      if (coursesListEl && data.courses && data.courses.length > 0) {
        let coursesHtml = '<div class="courses-container">';
        data.courses.forEach(course => {
          const imageUrl = course.courseImage.startsWith("https") ? course.courseImage : `https://edtech.colaborazia.com${course.courseImage}`;
          coursesHtml += `
            <div class="d-flex mb-4">
              <div class="course-image me-3">
                <img src="${imageUrl}" alt="${course.courseName}" class="img-fluid rounded">
              </div>
              <div>
                <h6 class="mb-1">${course.courseName}</h6>
                <div class="text-success small">Valid for 12 months</div>
              </div>
            </div>
          `;
        });
        coursesHtml += '</div>';
        coursesListEl.innerHTML = coursesHtml;
      }

      // Optional: Clear after use (remove if you want to keep it)
      // localStorage.removeItem("checkoutData");
    } catch (err) {
      console.error("Error parsing checkout data:", err);
      localStorage.removeItem("checkoutData");
    }
  }

  // =============================== 
  // CHECKOUT BUTTON LOGIC (ON CART PAGE) 
  // =============================== 

  
  const checkoutBtn = document.getElementById("checkoutbtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", async function (e) {
      e.preventDefault();
      const authtoken = localStorage.getItem("authToken");
      if (!authtoken) {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login to continue checkout",
          confirmButtonText: "Login Now",
        }).then(() => {
          const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
          loginModal.show();
        });
        return;
      }

      const couponCode = localStorage.getItem("couponCode") || "";
      try {
        const formData = new FormData();
        formData.append("couponCode", couponCode);

        const response = await fetch(checkout, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${authtoken}`
          },
          body: formData,
        });

        const data = await response.json();
        console.log("Checkout API Response:", data);

        if (response.ok && data.success) {
          // Update amounts on current page (cart page)
          const subTotalEl = document.getElementById("checkoutSubTotal");
          const couponEl = document.getElementById("coupunDiscount");
          const totalEl = document.getElementById("checkTotal");

          if (subTotalEl) subTotalEl.innerText = `₹${Number(data.subtotal).toLocaleString("en-IN")}`;
          if (couponEl) couponEl.innerText = `- ₹${Number(data.coupon_discount).toLocaleString("en-IN")}`;
          if (totalEl) totalEl.innerText = `₹${Number(data.total_amount).toLocaleString("en-IN")}`;

          // Save full response to localStorage for checkout.php
          localStorage.setItem("checkoutData", JSON.stringify(data));

          Swal.fire({
            icon: "success",
            title: "Proceeding to Checkout",
            text: "Redirecting...",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = "checkout.php";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Checkout Failed",
            text: data.message || "Something went wrong",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Unable to process checkout",
        });
      }
    });
  }




   const checkoutBtnn = document.getElementById("headerCheckout");
  if (checkoutBtnn) {
    checkoutBtnn.addEventListener("click", async function (e) {
      e.preventDefault();
      const authtoken = localStorage.getItem("authToken");
      if (!authtoken) {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login to continue checkout",
          confirmButtonText: "Login Now",
        }).then(() => {
          const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
          loginModal.show();
        });
        return;
      }

      const couponCode = localStorage.getItem("couponCode") || "";
      try {
        const formData = new FormData();
        formData.append("couponCode", couponCode);

        const response = await fetch(checkout, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${authtoken}`
          },
          body: formData,
        });

        const data = await response.json();
        console.log("Checkout API Response:", data);

        if (response.ok && data.success) {
          // Update amounts on current page (cart page)
          const subTotalEl = document.getElementById("checkoutSubTotal");
          const couponEl = document.getElementById("coupunDiscount");
          const totalEl = document.getElementById("checkTotal");

          if (subTotalEl) subTotalEl.innerText = `₹${Number(data.subtotal).toLocaleString("en-IN")}`;
          if (couponEl) couponEl.innerText = `- ₹${Number(data.coupon_discount).toLocaleString("en-IN")}`;
          if (totalEl) totalEl.innerText = `₹${Number(data.total_amount).toLocaleString("en-IN")}`;

          // Save full response to localStorage for checkout.php
          localStorage.setItem("checkoutData", JSON.stringify(data));

          Swal.fire({
            icon: "success",
            title: "Proceeding to Checkout",
            text: "Redirecting...",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = "checkout.php";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Checkout Failed",
            text: data.message || "Something went wrong",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Unable to process checkout",
        });
      }
    });
  }

  // =============================== 
  // PAYMENT BUTTON LOGIC (ON CHECKOUT.PHP) - FIXED WITH ASYNC/AWAIT FUNCTIONS 
  // =============================== 
  const paymentBtn = document.getElementById("paymentBtn");
  console.log("Payment Button Element:", paymentBtn);

  // Fixed: Removed invalid alert() call. Use console.log or proper alert if needed.
  // alert("Payment button found:", paymentBtn); // This would still be invalid; use below instead
  if (paymentBtn) {
    console.log("Payment button attached - ready for clicks.");
  } else {
    console.error("Payment button not found in DOM");
    return;
  }

  paymentBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    console.log("Payment button clicked - API call starting..."); // Use console instead of alert for better UX
    // alert("Payment button clicked - API call starting..."); // Uncomment if you want alert

    const authtoken = localStorage.getItem("authToken");
    if (!authtoken) {
      alert("Authentication required. Please login again.");
      return;
    }

    try {
      // Load checkout data from localStorage
      const checkoutData = localStorage.getItem("checkoutData");
      if (!checkoutData) {
        alert("Checkout data not found. Please proceed from cart again.");
        return;
      }

      const data = JSON.parse(checkoutData);
      if (!data.success || !data.order_id || !data.total_amount) {
        alert("Invalid checkout data. Please try again.");
        return;
      }

      // Use order_id and total_amount from checkout response
      const order_id = data.order_id.toString();
      const amount = Math.round(data.total_amount); // Razorpay expects amount in paise (multiply by 100)

      // ----------------------------- 
      // STEP 1: CREATE ORDER (USING ASYNC FUNCTION) 
      // ----------------------------- 
      console.log("Calling create order API..."); // Or alert if needed
      const orderData = await createRazorpayOrder(order_id, amount, authtoken);
      const razorpayOrderId = orderData.razorpay_order_id;

      // ----------------------------- 
      // STEP 2: OPEN RAZORPAY CHECKOUT 
      // ----------------------------- 
      const options = {
        key: orderData.key, // Razorpay Key ID (safe for frontend)
        amount: orderData.amount,
        currency: "INR",
        description: "Course Payment",
        order_id: razorpayOrderId,
        handler: async function (response) {
          // ----------------------------- 
          // STEP 3: VERIFY PAYMENT (USING ASYNC FUNCTION) 
          // ----------------------------- 
          const verifyPayload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            order_id: order_id
          };

          console.log("Payment successful - Calling verify API..."); // Or alert
          try {
            const verifyData = await verifyRazorpayPayment(verifyPayload, authtoken);
            alert("Payment Successful ✅");
            // Optionally clear localStorage or redirect to success page
            localStorage.removeItem("checkoutData");
            window.location.href = `dashboard-index.php`;
          } catch (verifyError) {
            console.error("Verification failed:", verifyError);
            alert(`Payment Verification Failed ❌: ${verifyError.message}`);
          }
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert(`Something went wrong: ${error.message}`);
    }
  });
});