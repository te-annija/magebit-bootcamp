
// document.querySelector('body').onload = function(){ 
//     showPage();
// }

// function showPage() {
//   document.querySelector('.loader').style.display = "none";
//   document.querySelector('.content').style.display = "block";
// }



document.querySelector('body').onload = function(){ 
    showPage();
}

function showPage() {
  var skeletons = document.querySelectorAll('.post_skeleton'); 
  skeletons.forEach(skeleton => {
     skeleton.style.display = "none";
  });
 
  var posts = document.querySelectorAll('.post'); 
  posts.forEach(post => {
     post.style.display = "block";
  });
}


