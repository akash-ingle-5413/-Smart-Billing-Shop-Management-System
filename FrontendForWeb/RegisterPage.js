const registerForm = document.getElementById("registerForm");
const regMessage = document.getElementById("regMessage");

registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        shopName: document.getElementById("shopName").value.trim(),
        fullName: document.getElementById("fullName").value.trim(),
        email: document.getElementById("regEmail").value.trim(),
        password: document.getElementById("regPassword").value
    };

    regMessage.textContent = "Creating account...";

    fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        regMessage.textContent = result.message;

      if (result.success) {
       localStorage.setItem("user", JSON.stringify(result.user));
      window.location.href = "index.html";
       }
    })
    .catch(() => {
        regMessage.textContent = "Server not reachable";
    });
});