const loginForm = document.getElementById("loginForm");

const message = document.getElementById("message");


loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;


    try {

        const response = await fetch(
            "http://localhost:8080/api/login",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })

            }
        );


        const data = await response.json();


        console.log(data);


        if (data.success) {

            message.innerText = "Login successful!";

            // Go to main page
            window.location.href = "dashboard.html";

        } else {

            message.innerText = data.message;

        }


    } catch (error) {

        console.log(error);

        message.innerText =
            "Unable to connect to server";

    }

});