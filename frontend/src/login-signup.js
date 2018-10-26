import USER from './user.js';



//nav get start
document.querySelector('.get-started').addEventListener('click', function() {
    document.querySelector('.landing').style.display = 'none';
    document.querySelector('.banner').style.display = 'flex';
    document.querySelector('.container').style.display = 'inline-flex';
    document.querySelector('.layer').style.display = 'block';
    document.querySelector('.layer2').style.display = 'block';
    document.querySelector('#remove-layer').style.display = 'block';
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
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.layer').style.display = 'none';
    document.querySelector('.layer2').style.display = 'none';
    document.querySelector('#remove-layer').style.display = 'none';
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





//click heart - like
document.querySelector('#large-feed').addEventListener('click', function (event) {
   event.preventDefault();
  if (event.target.classList.contains('heart')) {
      event.target.style.display = 'none';
      var id = event.target.parentNode.parentNode.parentNode.childNodes[1].textContent;
      var likes = event.target.parentNode.parentNode.childNodes[3].textContent.split(' ')[0];
      likes = parseInt(likes)+1;
      var solid = event.target.parentNode.childNodes[3];
      solid.style.display = 'inline-block';
      var username = document.querySelector('.welcome-user').textContent.slice(15);
      var user = new USER(username)
      user.like(id);
      event.target.parentNode.parentNode.childNodes[3].textContent = `${likes} likes`
  }
})


//click solid heart - unlike
document.querySelector('#large-feed').addEventListener('click', function (event) {
   event.preventDefault();
  if (event.target.classList.contains('heart-solid')) {
      event.target.style.display = 'none';
      var id = event.target.parentNode.parentNode.parentNode.childNodes[1].textContent;
      var likes = event.target.parentNode.parentNode.childNodes[3].textContent.split(' ')[0];
      likes = parseInt(likes)-1;
      var heart = event.target.parentNode.childNodes[1];
      heart.style.display = 'inline-block';
      var username = document.querySelector('.welcome-user').textContent.slice(15);
      var user = new USER(username)
      user.unlike(id);
      event.target.parentNode.parentNode.childNodes[3].textContent = `${likes} likes`
  }
})


//click comment icon
document.querySelector('#large-feed').addEventListener('click', function (event) {
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

//click view more
document.querySelector('#large-feed').addEventListener('click', function (event) {
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

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


//submit comment
document.querySelector('#large-feed').addEventListener('keypress', function (event) {
    if(event.which == 13){
        event.preventDefault();
        var parentPost = event.target.parentNode.parentNode;
        var comment = event.target.value;
        if(!comment){alert('Please enter comment');return}
        var time = Math.round(new Date().getTime()/1000);
        var postId = parentPost.querySelector('.id').textContent;
        var author = parentPost.querySelector('.post-title').textContent;
        var username = document.querySelector('.welcome-user').textContent.slice(15);
        var user = new USER(username);
        user.comment(postId,author,time,comment)
        var commentList = parentPost.querySelector('.comment-list');
        commentList.innerHTML += `
                    <p class='comment-item'>
                        <span>${author}</span> ${comment}
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
    if(!data_to_update.textContent){
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
        var username = document.querySelector('.welcome-user').textContent.slice(15);
        var user = new USER(username)
        user.updateProfile(name,email,password)
    }
})





















