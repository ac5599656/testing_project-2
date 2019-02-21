$(".create-comment-textarea").on("button", function(event) {
    event.preventDefault();
  
    const newComment = {
      comment: $("#comment").val().trim()
    };
  
   
    $.ajax("/Comments", {
      type: "POST",
      data: newComment
    }).then(
      function() {
        console.log("New Comment");
      }
    );
  });
  
  // $(".create-fav-beer").on("button", function(even) {
  //   event.preventDefault();
  
  //   const newBeer = {
  //     beer: $("#favbeerinput").val().trim()
  //   };
  
  //   $.ajax("/", {
  //     type: "POST",
  //     data: newBeer
  //   }).then(
  //     function() {
  //       console.log("New Beer");
  //     }
  //   );
  // });
  