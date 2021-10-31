import * as localStorage from './localStorage.js';

let commentList = null;

//commentModel
class CommentModel {
    constructor(type) {
        this.type = type;
        // get the initial list of comments out of local storage if it exists
        this.comments = localStorage.readFromLS(this.type) || [];
    }
    // I decided I could combine my getAllComments, and filterCommentsByName methods into one by passing in an optional query argument
    getComments(q = null) {
        if (q === null) {
            // no query, get all comments of the type
            return this.comments;
        } else {
            // comments for a specific post...filter by name
            return this.comments.filter(el => el.name === q);
        }
    }

    addComment(postName, comment) {
        if (comment == '') return;
        const newComment = {
            name: postName,
            comment: comment,
            date: new Date()
        };
        this.comments.push(newComment);
        localStorage.writeToLS(this.type, this.comments);
    }
}

const commentUI = `
    <div class="addCommentSection">
    <textarea id="newCommentField" placeholder="Add New Comment"></textarea>
    <button id="addCommentButton" class="commentButton">Add</button>
    </div>
    <h2>Comments</h2>
    <ul class="commentStyles"></ul>`;
// I only had one function for the view...so I chose not to use an object or class.
function renderCommentList(element, comments) {
    // clear out any comments that might be listed
    element.innerHTML = '';
    // add the new list of comments
    comments.forEach(el => {
        let item = document.createElement('li');
        item.innerHTML = `${el.name}: ${el.comment}`;
        element.appendChild(item);
    });
}

//Comments list Object class
class Comments {
    constructor(type, commentElementId) {
        this.type = type;
        this.commentElementId = commentElementId;
        this.model = new CommentModel(this.type);
    }

    addSubmitListener(postName) {
        document.getElementById('addCommentButton').onclick = () => {
            this.model.addComment(
                postName,
                document.getElementById('newCommentField').value
            );
            document.getElementById('newCommentField').value = '';
            this.showCommentList(postName);
        };
        document.getElementById('addCommentButton').ontouchend = () => {
            this.model.addComment(
                postName,
                document.getElementById('newCommentField').value
            );
            document.getElementById('newCommentField').value = '';
            this.showCommentList(postName);
        };
    }
    showCommentList(q = null) {
        try {
            const parent = document.getElementById(this.commentElementId);
            if (!parent) throw new Error('comment parent not found');
            // check to see if the commentUI code has been added yet
            if (parent.innerHTML === '') {
                parent.innerHTML = commentUI;
            }
            if (q !== null) {
                // looking at one post, show comments and new comment button
                document.querySelector('.addCommentSection').style.display = 'block';
                this.addSubmitListener(q);
            } else {
                // no post name provided, hide comment entry
                document.querySelector('.addCommentSection').style.display = 'none';
            }
            // get the comments from the model
            let comments = this.model.getComments(q);
            if (comments === null) {
                // avoid an error if there are no comments yet.
                comments = [];
            }
            renderCommentList(parent.lastChild, comments);
        } catch (error) {
            console.log(error);
        }
    }
}

export default Comments;