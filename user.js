
document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;

  let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

  const newUser = {
    id: allUsers.length + 1,
    name: name,
    email: email,
    mobile: mobile
  };

  allUsers.push(newUser);
  localStorage.setItem("allUsers", JSON.stringify(allUsers));

  alert("Registration Successful! Account created.");
  document.getElementById("signupForm").reset();
});

// Review Form Handler
document.getElementById("reviewForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const reviewerName = document.getElementById("reviewer-name").value;
  const rating = document.getElementById("rating").value;
  const reviewText = document.getElementById("public-review").value;

  let allReviews = JSON.parse(localStorage.getItem("allReviews")) || [];

  const newReview = {
    id: "REV-" + Date.now(),
    name: reviewerName,
    rating: rating,
    comment: reviewText,
    date: new Date().toLocaleDateString('bn-BD')
  };

  allReviews.unshift(newReview);
  localStorage.setItem("allReviews", JSON.stringify(allReviews));

  alert("Thank you! Your review has been submitted successfully.");
  document.getElementById("reviewForm").reset();
});