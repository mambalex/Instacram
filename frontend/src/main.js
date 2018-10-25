// importing named exports we use brackets
import { getPosts} from './helpers.js';

// when importing 'default' exports, use below syntax
import API from './api.js';
import USER from './user.js';
const api  = new API();



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
            document.querySelector('.current_user').textContent = username;
            getPosts(username,0,10);

            // const user  = new USER(username);
            // //get user info
            // var selfPosts;
            // var userInfo = user.getUserInfo();
            //     userInfo
            //         .then(rsp => {
            //             console.log(rsp);
            //             selfPosts = rsp['posts'];
            //             document.querySelector('.welcome-user').textContent = `Welcome back,  ${rsp['name']}`;
            //             document.querySelector('.welcome-user').style.display = 'block';
            //             // var selfFeeds = user.getSelfFeed(selfPosts);
            //             var otherFeedPromise = user.getFollowFeed(0,10);
            //             otherFeedPromise
            //                 .then(rsp => {
            //                     var otherPosts = rsp['posts'];
            //                     user.getSelfFeed(selfPosts, otherPosts)
            //                 });
            //         })





                // var feed = user.getFollowFeed(0,2)
                //     feed
                //         .then(posts => {
                //             displayPosts(posts);
                //         })
            // //follow
            //    user.follow('Anon');
        })
});




//submit new post
document.querySelector('.upload-btn').addEventListener('click', function() {
    var descr = document.querySelector('.description').value;
    var file = document.querySelector('#inputFile').files[0];
    if(!descr || !file){
        alert('Please select a file and enter description')
        return
    }
    var userId = this.parentNode.childNodes[1].textContent;
    const user  = new USER(userId);
    user.upload();
});





// .then(posts => {
//     posts.reduce((parent, post) => {
//         parent.appendChild(createPostTile(post));
//         return parent;
//     }, document.getElementById('large-feed'))
// });


// // we can use this single api request multiple times
// const feed = api.getFeed();
//
// feed
// .then(posts => {
//     posts.reduce((parent, post) => {
//
//         parent.appendChild(createPostTile(post));
//
//         return parent;
//
//     }, document.getElementById('large-feed'))
// });

// Potential example to upload an image
// const input = document.querySelector('input[type="file"]');
//
// input.addEventListener('change', uploadImage);





