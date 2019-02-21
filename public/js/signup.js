$(".create-signup-form").on("submit", function(event) {
    event.preventDefault();
  
    const newSignUp = {
      name: $("#name").val().trim(),
      email: $("#email").val().trim(),
      password: $("#pwd").val().trim(),
      age: $("#age").val().trim(),
      location: $("#location").val().trim()
    };
  
    $.ajax("/Logins", {
      type: "POST",
      data: newSignUp
    }).then(
      function() {
        console.log("New User");
      }
    );
  });