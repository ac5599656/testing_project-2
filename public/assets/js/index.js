//Upon the document finishing to load...
$(document).ready(function () {
  //================================ Global =======================================
  let num = 1;
  // Variable to hold our posts
  let posts;
  let comments;
  // postContainer holds all of our posts
  const postContainer = $(".postContainer");
  //================================ Functions =======================================

  // This function grabs posts from the database and updates the view
  function getPosts() {
    $.get("/api/posts", function (data) {
      posts = data;
      initializeRows();
    });
  };

  function getComments() {
    $.get("/api/comments", function (data) {
      comments = data;
      var commentsToAdd = [];
    for (let i = comments.length - 1; i >= 0; i--) {
      commentsToAdd.push(createNewRow(comments[i]));
    }
    postContainer.append(commentsToAdd);
    console.log(posts);
  })
};

  //This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
      .then(function () {
        getPosts();
      });
  };

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    postContainer.empty();
    var postsToAdd = [];
    for (let i = posts.length - 1; i >= 0; i--) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    postContainer.prepend(postsToAdd);
    //getComments();
  };

  function createNewRow(post) {
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm A");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    newPostCard.attr("id", num++);
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("X");
    deleteBtn.addClass("delete btn btn-sm");
    var commentBtn = $("<button>");
    commentBtn.text("Comment");
    commentBtn.addClass("addComment btn btn-info");


    var newPostDate = $("<small>");
      var newPostAuthor = $("<h4>");
      newPostAuthor.text("Written by: " + post.User.firstname + " " + post.User.lastname);
      newPostAuthor.css({
        float: "left",
        color: "orange",
        "margin-top":
          "10px",
        "margin-left": "-10px",
        
  
      });
      newPostDate.css({
        float: "right",
        color: "orange",
        "margin-top":
          "15px",
          
      });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    //newPostTitle.text("");
    newPostBody.text(post.body);
    newPostDate.text(formattedDate);
    if (post.UserId === post.currentUser){
    newPostCardHeading.prepend(deleteBtn);
    }
    newPostCardHeading.append(newPostAuthor);
    newPostCardBody.append(newPostBody);
    newPostCardBody.append(commentBtn);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    
    return newPostCard;
  };


  

  //This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  };

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handleComment() {
    var currentPost = $(this).parent().parent()
      const newTextbox = $("<textarea>");
      newTextbox.attr('id', "comment-body");
      const newSubmitButton = $("<button>");
      newSubmitButton.addClass("comment-submit btn btn-danger");
      newSubmitButton.text("Submit");
      newSubmitButton.attr('id', "commentSubmitButton")

      currentPost.append(newTextbox);
      currentPost.append(newSubmitButton);
      


    //window.location.href = "/dashboard?post_id=" + currentPost.id;
  };


  function getInfo() {
    //let age = $("#ageDisplay");
    //age.text(`${age}`)
    $.ajax({
      method: "GET",
      url: "/api/location"
    })
      .then(function(data) {
        let location = $("#locationDisplay");
        let age = $("#ageDisplay");
        let name = $("#nameDisplay");
        location.text(`${data.city}, ${data.region_code}`);
        //age.text(user.age);
        //name.text(`${user.firstname} ${user.lastname}`);
      });
  };
  

  //================================ Main Process =======================================
  //display the user info on the page
  getInfo();
  //get the posts for the view
  getPosts();
  getComments();
  //when the post form is filled out and submitted execute a new post
  $("#commentbutton").on("click", function (event) {
    event.preventDefault();
    // create new post body with form content
    const newPost = {
      body: $("#post-comment").val().trim(),
    };
      // let replacefavBar = newPost.favBar.split(' ').join('+');
      // let favBar = {};
      // favBar.push(replacefavBar);
    // post the content to posts and take the user to the main page
    $.post("/api/posts", newPost,
      function () {
        location.reload();
      }
    );
  });

  $(document).on("click", "#commentSubmitButton", function (event) {
    event.preventDefault();

    var currentPost = $(this)
      .parent()
      .data();

    // create new post body with form content
    const newComment = {
      body: $("#comment-body").val().trim(),
      PostId: currentPost.post.id
    };
     
    $.post("/api/comments", newComment,
      function () {
        location.reload();
      }
    );
  });

 
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.addComment", handleComment);


  
});