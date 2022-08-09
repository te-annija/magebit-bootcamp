let skeleton = document.querySelector('.post_skeleton');
let post = document.querySelector('.post');

for (let i = 0; i < 3; i++) {
    document.querySelector('.container__right_side').appendChild(skeleton.cloneNode(true));  
}
for (let i = 0; i < 3; i++) {
    document.querySelector('.container__right_side').appendChild(post.cloneNode(true));  
}
