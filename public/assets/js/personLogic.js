$(document).ready(function () {

    $("#signUp").on("submit", function (event) {
        event.preventDefault();

        const newPerson = {
            name: $("#name").val().trim(),
            email: $("#emailAdd").val().trim(),
            age: $("#age").val().trim(),
            gender: $("#gender").val().trim(),
        };


        $.post("/api/people", newPerson,
            function () {
                console.log("New User" + newPerson);
                window.location.href = "/api/people";
            }
        );
    });

});