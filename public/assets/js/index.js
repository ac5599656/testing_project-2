//Upon the document finishing to load...
$(document).ready(function () {
  //================================ Global =======================================
  getInfo();
  // Variable to hold our posts
  let posts;
  // postContainer holds all of our posts
  const postContainer = $(".postContainer");
  //================================ Functions =======================================

  // This function grabs posts from the database and updates the view
  function getPosts(person) {
    personId = person || "";
    if (personId) {
      personId = "/?person_id=" + personId;
    };
    $.get("/api/posts" + personId, function (data) {
      posts = data;
      // if (!posts || !posts.length) {
      //   //displayEmpty(person);
      // }
      // else {
        initializeRows();
    //}
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
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    
    
    var deleteBtn = $("<button>");
    deleteBtn.text("Delete");
    deleteBtn.addClass("delete btn btn-danger");
    //var editBtn = $("<button>");
    //editBtn.text("Edit");
    //editBtn.addClass("edit btn btn-info");
    var newPostTitle = $("<h2>");
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
    newPostTitle.append(newPostDate);
    console.log(post.currentUser);
    console.log(post.UserId);
    if (post.UserId === post.currentUser){
    newPostCardHeading.append(deleteBtn);
    }
    //newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostAuthor);
    newPostCardBody.append(newPostBody);
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
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/dashboard?post_id=" + currentPost.id;
  };


  function getInfo() {
    console.log($(this));
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
        age.text(user.age);
        name.text(`${user.firstname} ${user.lastname}`);
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
    // post the content to posts and take the user to the main page
    $.post("/api/posts", newPost,
      function () {
        location.reload();
      }
    );
  });


  /* global moment */


  //var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);


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