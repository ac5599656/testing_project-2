//Upon the document finishing to load...
$(document).ready(function () {
  //================================ Global =======================================
  let num = 1;
  getInfo();
  // Variable to hold our posts
  let posts;
  // postContainer holds all of our posts
  const postContainer = $(".postContainer");
  //================================ Functions =======================================

  // This function grabs posts from the database and updates the view
  function getPosts(user) {
    userId = user || "";
    if (userId) {
      userId = "/?person_id=" + userId;
    };
    $.get("/api/posts" + userId, function (data) {
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(user);
      }
      else {
        initializeRows();
    }
    });
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
    deleteBtn.text("Delete");
    deleteBtn.addClass("delete btn btn-danger");
    var commentBtn = $("<button>");
    commentBtn.text("Comment");
    commentBtn.addClass("addComment btn btn-info");
    // var newPostLink = $("<a>");
    // newPostLink.href = "google.com";
    // newPostLink.innerHTML = "Link";

    a = document.createElement('a');
    a.href =  'google.com'; // Insted of calling setAttribute 
    a.innerHTML = "Link" // <a>INNER_TEXT</a>


    var newPostDate = $("<small>");
    var newPostAuthor = $("<h5>");
    newPostAuthor.text("Written by: " + post.User.firstname + " " + post.User.lastname);
    newPostAuthor.css({
      float: "right",
      color: "blue",
      "margin-top":
        "-10px"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    //newPostTitle.text("");
    newPostBody.text(post.body);
    newPostDate.text(formattedDate);
    a.append(newPostDate);
    if (post.UserId === post.currentUser){
    newPostCardHeading.append(deleteBtn);
    }
    newPostCardHeading.append(a);
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
      //.parent()
      .data();

    // create new post body with form content
    const newComment = {
      body: $("#comment-body").val().trim(),
      PostId: currentPost.post.id
    };
      // let replacefavBar = newPost.favBar.split(' ').join('+');
      // let favBar = {};
      // favBar.push(replacefavBar);
    // post the content to posts and take the user to the main page
    $.post("/api/comments", newComment,
      function () {
        location.reload();
      }
    );
  });

  


  /* global moment */


  //var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.addComment", handleComment);


  // The code below handles the case where we want to get blog posts for a specific author
  // Looks for a query param in the url for author_id
  var url = window.location.search;
  var personId;
  if (url.indexOf("?person_id=") !== -1) {
    personId = url.split("=")[1];
    getPosts(personId);
  }
  // If there's no authorId we just get all posts as usual
  else {
    getPosts();
  }
});