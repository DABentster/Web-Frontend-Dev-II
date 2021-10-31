import Hikes from './week07-hikes.js';
// import Comments from './week07-comment.js';

const myHikes = new Hikes('hikes');
// const myComments = new Comments('comments');

//on load grab the array and insert it into the page on load
window.addEventListener("load", () => {
    myHikes.showHikeList();
});

//Add new comment when 'Add' button pressed
// const addCommentButton = document.getElementById('addCommentButton');
// addCommentButton.addEventListener('click', () => {
//     myComments.addComment();
// });
// addCommentButton.addEventListener('touchend', () => {
//     myComments.addComment();
// });

//Enable adding new comment item with 'Enter' key in input field
// const inputField = document.getElementById('newCommentField');
// inputField.addEventListener('keyup', function (event) {
//     if (event.key === 'Enter') {
//         addCommentButton.click();
//     }
// });