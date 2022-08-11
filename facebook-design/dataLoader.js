import {fetchAPI} from './apiCall.js'; 

export function dataLoader(){
   const skeleton = document.querySelector('.post_skeleton');
   const post = document.querySelector('.post');

   document.querySelector('body').onload = function(){ 
      displayPosts();
   }

   window.onscroll = function() {
      if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
         displayPosts();
      }
   }

   function displayPosts(){ 
      for (let i = 0; i < 3; i++) {
         let new_post = document.querySelector('.container__right_side').appendChild(post.cloneNode(true));
         let new_skeleton = document.querySelector('.container__right_side').appendChild(skeleton.cloneNode(true));

         new_post.style.display = "none";
         new_skeleton.style.display = "block";
         
         fillInformation(new_post);
      }
   }

   function fillInformation(new_post){ 
      fetchAPI('https://dog.ceo/api/breeds/image/random', function(response){ 
         let image = new_post.querySelector('.post__image');
         image.src = response.message;
         image.onload = function(){ 
            new_post.style.display = "block";
            new_post.nextElementSibling.style.display = "none"; 
         }
      }); 

      fetchAPI('https://uselessfacts.jsph.pl/random.json', function(response){ 
         new_post.querySelector('.post__description p').textContent = response.text;
      }); 

      fetchAPI(' https://randomuser.me/api', function(response){ 
         const data = response.results[0];

         if(new_post.querySelector('.post__default_img img')){ 
            new_post.querySelector('.post__default_img img').src = data.picture.thumbnail;
         } 
         else{ 
            const img = document.createElement('img'); 
            img.src = data.picture.thumbnail;
            new_post.querySelector('.post__default_img').append(img);
         } 
         const profile_name = data.name.first + " " + data.name.last; 
         new_post.querySelector('.post__profile_info h3').textContent = profile_name;
      }); 
   }
}