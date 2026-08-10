const loginForm = document.getElementById("loginForm");

const message = document.getElementById("message");


loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const email = document.getElementById("email").value;


    try {

        const response = await fetch(
            `http://localhost:8080/api/user?email=${encodeURIComponent(email)}`
        );


        const data = await response.json();


        if (data.exists) {

            message.innerText = "User exists";

        } else {

            message.innerText = "User does not exist";

        }


    } catch (error) {

        console.log(error);

        message.innerText = "Server error";

    }

});