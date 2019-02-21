$("#loginsubmit").on("click", function (event) {
    event.preventDefault();


    const newLogIn = {
        email: $("#email").val().trim(),
        password: $("pwd").val().trim()
    };

    $.ajax("/Logins", {
        type: "POST",
        data: newLogIn
    }).then(
        function () {
            console.log("New Log In");

        }
    );
});