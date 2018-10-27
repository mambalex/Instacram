import USER from './user.js';
import {displayUserPage,getPosts,displayPopupPost} from './helpers.js';




//nav get start
document.querySelector('.get-started').addEventListener('click', function() {
    document.querySelector('.landing').style.display = 'none';
    document.querySelector('.banner').style.display = 'flex';
    document.querySelector('.container').style.display = 'inline-flex';
    document.querySelector('.layer').style.display = 'block';
    document.querySelector('.layer2').style.display = 'block';
    // document.querySelector('#remove-layer').style.display = 'block';
})


//dropdown
document.querySelector('.user').addEventListener('click', function(e) {
    e.preventDefault();
    if( document.querySelector('.dropdown-content').style.display == 'block' ){
       document.querySelector('.dropdown-content').style.display = 'none';
    }else{
        document.querySelector('.dropdown-content').style.display = 'block';
    }
})





// switch
var loginMsg = document.querySelector('.loginMsg'),
    login = document.querySelector('.login'),
    signupMsg = document.querySelector('.signupMsg'),
    signup = document.querySelector('.signup'),
    frontbox = document.querySelector('.frontbox');

document.querySelector('#switch1').addEventListener('click', function() {
    loginMsg.classList.toggle('visibility');
    frontbox.classList.add('moving');
    signupMsg.classList.toggle('visibility');
    signup.classList.toggle('hide');
    login.classList.toggle('hide');
    // document.querySelector('#successAlert').style.display = 'none';
    // document.querySelector('#errorAlert').style.display = 'none';
    // document.querySelector('#successAlert2').style.display = 'none';
    // document.querySelector('#errorAlert2').style.display = 'none';
})

document.querySelector('#switch2').addEventListener('click', function() {
    loginMsg.classList.toggle('visibility');
    frontbox.classList.remove('moving');
    signupMsg.classList.toggle('visibility');
    signup.classList.toggle('hide');
    login.classList.toggle('hide');
    // document.querySelector('#successAlert').style.display = 'none';
    // document.querySelector('#errorAlert').style.display = 'none';
    // document.querySelector('#successAlert2').style.display = 'none';
    // document.querySelector('#errorAlert2').style.display = 'none';

})


//remove layer
document.querySelector('#remove-layer').addEventListener('click', function() {
    // document.querySelector('.container').style.display = 'none';
    document.querySelector('.layer').style.display = 'none';
    document.querySelector('.layer2').style.display = 'none';
    document.querySelector('.layer3').style.display = 'none';
    document.querySelector('#remove-layer').style.display = 'none';
    document.querySelector('.thumbnail-popup').style.display = 'none';
})





//show new post window
document.querySelector('.nav-upload').addEventListener('click', function() {
    document.querySelector('.upload-files').style.display = 'block';
})


//close new post window
document.addEventListener('mouseup', function (e) {
    var container = document.querySelector('.upload-files');
    var isClickInside = container.contains(e.target);
    // if the target of the click isn't the container nor a descendant of the container
    if (!isClickInside)
    {
        container.style.display = 'none';
    }
});

//click nav profile
document.querySelector('#profile').addEventListener('click', function (e) {
    e.preventDefault();
    // document.querySelector('.layer').style.display = 'block';
    // document.querySelector('.layer2').style.display = 'block';
    document.querySelector('.container2').style.display = 'block';
})



//close profile popup
document.addEventListener('mouseup', function (e) {
    var container = document.querySelector('.container2');
    var isClickInside = container.contains(e.target);
    // if the target of the click isn't the container nor a descendant of the container
    if (!isClickInside)
    {
        container.style.display = 'none';
    }
});



//click posts
document.querySelector('.nav-posts').addEventListener('click', function (e) {
    e.preventDefault();
    // document.querySelector('.followers').style.display = 'none';
    document.querySelector('.following').style.display = 'none';
    document.querySelector('.post-container').style.display = 'flex';
     document.querySelector('.nav-posts').classList.add('select')
    document.querySelector('.nav-following').classList.remove('select')
    // document.querySelector('.nav-followers').classList.remove('select')
})


//click following
document.querySelector('.nav-following').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.post-container').style.display = 'none';
    // document.querySelector('.followers').style.display = 'none';
    document.querySelector('.following').style.display = 'flex';
    document.querySelector('.nav-following').classList.add('select')
    document.querySelector('.nav-posts').classList.remove('select')
    // document.querySelector('.nav-followers').classList.remove('select')
})



//click followers
// document.querySelector('.nav-followers').addEventListener('click', function (e) {
//     e.preventDefault();
//     document.querySelector('.post-container').style.display = 'none';
//     document.querySelector('.following').style.display = 'none';
//     document.querySelector('.followers').style.display = 'flex';
//     document.querySelector('.nav-posts').classList.remove('select')
//     document.querySelector('.nav-following').classList.remove('select')
//     document.querySelector('.nav-followers').classList.add('select')
// })




//click nav post
document.querySelector('#my-posts').addEventListener('click', function (e) {
    e.preventDefault();
    var currentUserId = document.querySelector('.current_user_id').textContent;
    displayUserPage(currentUserId);
    document.querySelector('.user-page-wrapper').style.display = 'block';
})


//close user page popup
document.addEventListener('mouseup', function (e) {
    var container = document.querySelector('.user-page-wrapper');
    var isClickInside = container.contains(e.target);
    var isThumnailPopUp;
    if(document.querySelector('.thumbnail-popup').style.display =='block'){
        isThumnailPopUp = true;
    }else {
        isThumnailPopUp = false;
    }
    // if the target of the click isn't the container
    if (!isClickInside && !isThumnailPopUp)
    {
        container.style.display = 'none';
    }
});


//click post author popup
document.querySelector('#large-feed').addEventListener('click', function (event) {
    event.preventDefault();
    var currentUser = document.querySelector('.current_user').textContent;
    var user = new USER(currentUser);
    if (event.target.classList.contains('post-title') || event.target.classList.contains('author')) {
        let username = event.target.textContent;
        let userInfo = user.getUserInfo(false,username)
        userInfo
            .then(rsp => {
                var userId = rsp['id'];
                displayUserPage(userId);
                document.querySelector('.user-page-wrapper').style.display = 'block';
            })
    }
})

var parentUserId;
//click following uers popup
document.querySelector('.user-page').addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('following-user')) {
        let userId = event.target.querySelector('.id').textContent;
        parentUserId = event.target.parentNode.parentNode.querySelector('.popup-userId').textContent;
        displayUserPage(userId);
        document.querySelector('.user-page-wrapper .back').style.display = 'block';
        document.querySelector('.user-page-wrapper').style.display = 'block';
    }
})

//click back
document.querySelector('.back').addEventListener('click', function (event) {
    event.preventDefault();
    displayUserPage(parentUserId);
    document.querySelector('.user-page-wrapper .back').style.display = 'none';
})


//click thumbnail
document.querySelector('.post-container').addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('post-item')) {
        document.querySelector('.layer3').style.display = 'block';
        document.querySelector('#remove-layer').style.display = 'block';
        document.querySelector('.thumbnail-popup').style.display = 'block';
        var postId = event.target.alt;
        var currentUser = document.querySelector('.current_user').textContent;
        var currentUserId = document.querySelector('.current_user_id').textContent;
        var popUpUserId = event.target.parentNode.parentNode.querySelector('.popup-userId').textContent;
        console.log(currentUserId,popUpUserId)
        var user = new USER(currentUser);
        var post = user.getFeed(postId);
        post.then(rsp => {
                displayPopupPost(rsp);
                if(currentUserId != popUpUserId){
                    document.querySelector('.edit').style.display = 'none';
                    document.querySelector('.delete').style.display = 'none';
                }
            })
    }
})


//click edit  edit & update
document.querySelector('.thumbnail-popup').addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('fa-edit')) {
        var text = event.target.parentNode.parentNode.parentNode.querySelector('.thumbnail-text');
        var postId = event.target.parentNode.parentNode.parentNode.querySelector('.id').textContent;
        console.log(text.contentEditable)
        if(text.contentEditable =='false' || text.contentEditable == 'inherit'){
            text.contentEditable = 'true';
            document.querySelector('#upload-pic').style.display = 'inline-block';
            document.querySelector('#file-name').style.display = 'inline-block';
            text.focus();
        }else{
            //===================update post==================//
            //description
            var updatedText = text.textContent;

            //picture
            var file = document.querySelector('#inputFile').files[0];
            var base64;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                base64 = this.result;
                base64 = base64.split(',')[1];
                var currentUser = document.querySelector('.current_user').textContent;
                var currentUserId = document.querySelector('.current_user_id').textContent;
                var user = new USER(currentUser );
                user.updatePost(postId,updatedText,base64);
                text.contentEditable = 'false';
                document.querySelector('#upload-pic').style.display = 'none';
                document.querySelector('#file-name').style.display = 'none';
                document.querySelector('#inputFile').value = '';
                displayUserPage(currentUserId);
            }

        }
    }
})



//click delete
document.querySelector('.thumbnail-popup').addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('fa-trash-alt')) {
        var postId = event.target.parentNode.parentNode.parentNode.querySelector('.id').textContent;
        var currentUser = document.querySelector('.current_user').textContent;
        var currentUserId = document.querySelector('.current_user_id').textContent;
        var user = new USER(currentUser );
        user.deletePost(postId);
        displayUserPage(currentUserId);
    }
})


//change pics
document.querySelector('.thumbnail-popup').addEventListener('click', function (event) {
     event.preventDefault();
    if (event.target.classList.contains('update-src')) {
        document.querySelector('input[type=file]').click();
    }
})

//show new pic's name
document.querySelector('input[type=file]').addEventListener('change', function (event) {
     event.preventDefault();
     var file = document.querySelector('#inputFile').files[0];
     document.querySelector('#file-name').textContent = file.name;
})






//click follow
document.querySelector('.user-page').addEventListener('click', function (event) {
    event.preventDefault();
    var currentUser = document.querySelector('.current_user').textContent;
    var user = new USER(currentUser );
    if (event.target.classList.contains('follow-btn')) {
        let username = event.target.parentNode.querySelector('.popup-username').textContent;
        if(username == currentUser){
            alert('Sorry, you can\'t follow yourself');
            return
        }
        let userInfo = user.follow(username);
        userInfo
            .then(rsp => {
              console.log(rsp);
              event.target.style.display = 'none';
              event.target.parentNode.querySelector('.following-btn').style.display = 'inline-block';
              getPosts(currentUser,0,10);
            }
            )
    }
})

//click following
document.querySelector('.user-page').addEventListener('click', function (event) {
    event.preventDefault();
    var currentUser = document.querySelector('.current_user').textContent;
    var user = new USER(currentUser);
    if (event.target.classList.contains('following-btn')) {
        let username = event.target.parentNode.querySelector('.popup-user').textContent;
        let userInfo = user.unfollow(username);
        userInfo
            .then(rsp => {
              console.log(rsp);
              event.target.style.display = 'none';
              event.target.parentNode.querySelector('.follow-btn').style.display = 'inline-block';
               getPosts(currentUser,0,10);
              }
            )
    }
})



var listenContainer = ['#large-feed', '.thumbnail-popup'];

//click heart - like
listenContainer.forEach(function (selector) {
    document.querySelector(selector).addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('heart')) {
          event.target.style.display = 'none';
          var id = event.target.parentNode.parentNode.parentNode.childNodes[1].textContent;
          var likes = event.target.parentNode.parentNode.childNodes[3].textContent.split(' ')[0];
          likes = parseInt(likes)+1;
          var solid = event.target.parentNode.childNodes[3];
          solid.style.display = 'inline-block';
          var username = document.querySelector('.current_user').textContent;
          var user = new USER(username);
          user.like(id);
          event.target.parentNode.parentNode.childNodes[3].textContent = `${likes} likes`
        }
    })
})



//click solid heart - unlike
listenContainer.forEach(function (selector) {
        document.querySelector(selector).addEventListener('click', function (event) {
           event.preventDefault();
          if (event.target.classList.contains('heart-solid')) {
              event.target.style.display = 'none';
              var id = event.target.parentNode.parentNode.parentNode.childNodes[1].textContent;
              var likes = event.target.parentNode.parentNode.childNodes[3].textContent.split(' ')[0];
              likes = parseInt(likes)-1;
              var heart = event.target.parentNode.childNodes[1];
              heart.style.display = 'inline-block';
              var username = document.querySelector('.current_user').textContent;
              var user = new USER(username)
              user.unlike(id);
              event.target.parentNode.parentNode.childNodes[3].textContent = `${likes} likes`
          }
        })
})


//click comment icon

listenContainer.forEach(function (selector) {
    document.querySelector(selector).addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('comment')) {
     var commentIcon  =   event.target.parentNode.childNodes[5];
     var input = commentIcon.parentNode.parentNode.parentNode.querySelector('.comment-input');
        if(input.style.display == 'table'){
            input.style.display = 'none';
            input.childNodes[2].value = '';
        }else{
             input.style.display = 'table';
        }
    }
    })
})


//click view more
listenContainer.forEach(function (selector) {
document.querySelector(selector).addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('view-more')) {
        var viewMore = event.target;
        var commentList = event.target.parentNode.querySelector('.comment-list');
        if(viewMore.textContent != 'Collapse'){
            viewMore.textContent = 'Collapse';
            commentList.style.height = 'auto';
        }else{
            commentList.style.height = '60px';
            viewMore.textContent = `View all ${commentList.childElementCount} comments`;
        }
        }
    })
})

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}




//submit comment
listenContainer.forEach(function (selector) {
    document.querySelector(selector).addEventListener('keypress', function (event) {
    if(event.which == 13){
        event.preventDefault();
        var parentPost = event.target.parentNode.parentNode;
        var comment = event.target.value;
        if(!comment){alert('Please enter comment');return}
        var time = Math.round(new Date().getTime()/1000);
        var postId = parentPost.querySelector('.id').textContent;
        var author = parentPost.querySelector('.post-title').textContent;
        var username = document.querySelector('.current_user').textContent;
        var user = new USER(username);
        user.comment(postId,author,time,comment)
        var commentList = parentPost.querySelector('.comment-list');
        commentList.innerHTML += `
                    <p class='comment-item'>
                        <span>${username}</span> ${comment}
                    </p>`
        console.log(event.target.parentNode.parentNode.classList)
        if(!parentPost.querySelector('.view-more') && commentList.childElementCount>2){
            commentList.style.height = '60px';
            var newEl = document.createElement('div');
            newEl.classList.add('view-more');
            newEl.innerHTML = `View all ${commentList.childElementCount} comments`;
            insertAfter( newEl,commentList)
        }
        if(parentPost.querySelector('.view-more')){
            commentList.style.height = '60px';
            parentPost.querySelector('.view-more').innerHTML = `View all ${commentList.childElementCount} comments`;
        }
        event.target.value = '';
    }
 })
})


const API_URL = 'http://127.0.0.1:5000'
// const api  = new API();

const getJSON = (path, options) =>
    fetch(path, options)
        .then(res => res.json())
        .catch(err => console.warn(`API_ERROR: ${err.message}`));

function makeAPIRequest(path,options){
        return getJSON(`${API_URL}${path}`,options);
    }

//sign up request
document.querySelector('#signup-btn').addEventListener('click',function (e){
    e.preventDefault();
    var btn = this;
    var username = document.querySelector('#signup-username').value;
    var password =  document.querySelector('#signup-password').value;
    var email = document.querySelector('#signup-email').value;
    var name = document.querySelector('#signup-name').value;
    if(!password){
        alert('Please enter a password')
        return
    }else{
        btn.classList.add('running');
    }

    var data = {
        'username' : username,
        'password' : password,
        'email': email,
        'name': name
    }
    console.log(data);
    var url = '/auth/signup';
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const signup = makeAPIRequest(url,options);
    signup
        .then(rsp => {
            btn.classList.remove('running');
            console.log(rsp);
            document.querySelector('#successAlert2').style.display = 'block';
            setTimeout(function () {
                document.querySelector('#successAlert2').style.display = 'none';
            },3000)

        })
    
});





//profile click update
document.querySelectorAll('.update').forEach(function (val) {
    val.addEventListener('click',function (e){
    e.preventDefault();
    var data_to_update = e.target.previousSibling;
    if(e.target.textContent == 'confirm' && !data_to_update.textContent){
        alert('Can not be empty')
        return
    }
    if(e.target.textContent == 'update'){
        e.target.textContent = 'confirm';
        data_to_update.setAttribute('contenteditable', 'true');
        data_to_update.focus();
        }else{
            data_to_update.setAttribute('contenteditable', 'false');
            e.target.textContent = 'update';
        }
    });
})

//update profile
document.querySelector('#save').addEventListener('click',function (e) {
    e.preventDefault();
    var flag = true;
    document.querySelectorAll('.update').forEach(function (val) {
        if(val.textContent == 'confirm'){
            alert('Please confirm your changes!')
            flag = false;
            return
        }
    })
    if(flag){
        var name = document.querySelector('#name').textContent;
        var email = document.querySelector('#email').textContent;
        var password = document.querySelector('#password').textContent;
        var username = document.querySelector('.current_user').textContent;
        var user = new USER(username)
        user.updateProfile(name,email,password)
    }
})


//search
document.querySelector('.search-input').addEventListener('keypress', function (event) {
    if(event.which == 13){
        event.preventDefault();
        var val = document.querySelector('.search-input').value;
        var username = document.querySelector('.current_user').textContent;
        var user = new USER(username)
        var userInfo = user.getUserInfo(false,val);
        userInfo
            .then(rsp =>{
                    if(rsp['message'] == 'User Not Found' ){
                        alert('Sorry, no such user')
                        document.querySelector('.search-input').value = '';
                        return
                    }else{
                        document.querySelector('.search-input').value = '';
                        displayUserPage(rsp['id']);
                        document.querySelector('.user-page-wrapper').style.display = 'block';
                    }
                }
            )
    }
})

















