// importing named exports we use brackets
import { getPosts,getCurrentAllFeeds,getNewPostAuthors} from './helpers.js';

// when importing 'default' exports, use below syntax
import API from './api.js';
import USER from './user.js';
const api  = new API();

var currentPost;
var currentUser;
var totalNumPost;
var currentPostList;


//login request
document.querySelector('#login-btn').addEventListener('click',function (e){
    e.preventDefault();
    var username = document.querySelector('#login-username').value;
    var password =  document.querySelector('#login-password').value;
    if(!username || !password){
        alert('Please enter username and password');
        return
    }
    var data = {
        'username' : username,
        'password' : password
    }
    var url = '/auth/login';
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const login = api.makeAPIRequest(url,options);
    login
        .then(rsp => {
            if(rsp['message']=='Invalid Username/Password'){
                document.querySelector('#errorAlert').style.display = 'block';
                setTimeout(function () {
                document.querySelector('#errorAlert').style.display = 'none';
                 },3000)
                return
            }
            document.querySelector('#successAlert').style.display = 'block';
            localStorage.setItem(`${username}Token`, JSON.stringify(rsp['token']));
            document.querySelector('#successAlert').style.display = 'none';
            document.querySelector('.container').style.display = 'none';
            document.querySelector('.layer').style.display = 'none';
            document.querySelector('.layer2').style.display = 'none';
            document.querySelector('#remove-layer').style.display = 'none';
            document.querySelector('#main').style.display = 'block';
            document.querySelector('#footer').style.display = 'block';
            document.querySelector('.user').style.display = 'block';
            document.querySelector('.welcome-user').style.display = 'block';
            document.querySelector('.current_user').textContent = username;
            var user = new USER(username);
            // getPostNum(username).then(rsp => {
            //     totalNumPost = rsp;
            //     console.log(totalNumPost)
            // })
            user.getUserInfo().then(info => {
                console.log(info)
                document.querySelector('.welcome-user').textContent = `Welcome back,  ${info['name']}`;
                document.querySelector('.current_user_id').textContent = info['id'];
                document.querySelector('#name').textContent = info['name'];
                document.querySelector('#email').textContent = info['email'];
            })
            currentUser = username;
            getPosts(username,0,3);
            currentPost = 3;
            getCurrentAllFeeds().then(newFeedList => {
                currentPostList = newFeedList;
                totalNumPost = newFeedList.length;
            });
            notification();
        })
});


//window scroll
document.onscroll = function() {
    if(document.documentElement.scrollTop + window.innerHeight == document.documentElement.scrollHeight)
    {
        if(currentPost < totalNumPost){
             getPosts(currentUser,currentPost,3)
            currentPost += 3;
        }else{
            alert('Sorry, no more feeds')
        }
    }
}


function notification() {
    return setInterval(function () {
    getCurrentAllFeeds().then(rsp => {
        var newNum = rsp.length;
        var newPostList = rsp;
        if(newNum == totalNumPost){
            const container = document.querySelector('.dropdown-content2');
                 // remove all children
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
            document.querySelector('.notifications-count').style.display = 'none';
        }else{
            document.querySelector('.notifications-count').textContent = Math.abs(newNum-totalNumPost);
            document.querySelector('.notifications-count').style.display = 'block';
            var newPostIds = []
            newPostList.forEach(function (postId) {
                if(!currentPostList.includes(postId)){
                    newPostIds.push(postId)
                }
            })
            getNewPostAuthors(newPostIds).then( authors => {
                const container = document.querySelector('.dropdown-content2');
                 // remove all children
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
                authors.forEach(function (author) {
                         container.innerHTML += `<a class="msg ${author}">${author} posted a new photo</a>`
                })
            })
        }
    })},2000)
}

//reload
document.querySelector('.home').addEventListener('click', function (event) {
        event.preventDefault();
        var currentUser = document.querySelector('.current_user').textContent;
        getPosts(currentUser,0,3,'remove');
        getCurrentAllFeeds().then(newFeedList => {
                currentPostList = newFeedList;
                totalNumPost = newFeedList.length;
        });
})



