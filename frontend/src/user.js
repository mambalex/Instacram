import API from './api.js';
import {displayPosts} from './helpers.js';
// import {createElement} from './helpers.js';

const api  = new API();



export default class USER {

    /**
     * Defaults to teh API URL
     * @param {string} url
     */
    constructor(username) {
        this.username = username;
    }


    /**
     * @returns user info
     */
    getUserInfo() {
        var token = JSON.parse(localStorage.getItem(`${this.username}Token`));
        var userInfo;
        var url = '/user';
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }
        userInfo = api.makeAPIRequest(url,options);
        return userInfo;
    }
    /**
     * @returns user info
     */
    getSelfFeed(posts, otherPosts) {
        var array=[];
        var token = JSON.parse(localStorage.getItem(`${this.username}Token`));
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }
        var i = 0;
        function loadNext(posts) {
            if(i< posts.length){
                var url = `/post/?id=${posts[i]}`;
                var feeds = api.makeAPIRequest(url,options);
                    feeds
                        .then(post => {
                            array.push(post);
                            i++;
                            loadNext(posts);
                        })

            }
            if(i == posts.length){
                var totalPosts = array.concat(otherPosts);
                displayPosts(totalPosts)
            }
        }

        loadNext(posts)
    }

    /**
     * @returns get feeds from following users
     */
     getFollowFeed(p, n) {
            let token = JSON.parse(localStorage.getItem(`${this.username}Token`));
            // var url = `/dummy/user/feed?p=${p}&n=${n}`
            var url = `/user/feed?p=${p}&n=${n}`;
            var options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                    'async': 'false'
                }
            }
            var feeds = api.makeAPIRequest(url,options);
            return feeds;
     }
     /**
     * @returns upload photo
     */
     upload() {
            var user = this.username;
            let token = JSON.parse(localStorage.getItem(`${this.username}Token`));
            var descr = document.querySelector('.description').value;
            var file = document.querySelector('#inputFile').files[0];
            console.log(file);
            var base64;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                base64 = this.result;
                base64 = base64.split(',')[1];
                var options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`
                        },
                        body: JSON.stringify({'description_text':descr,'src':base64})
                }
                var url = '/post/';
                console.log(base64);
                var post = api.makeAPIRequest(url,options);
                post
                    .then(rsp => {
                        console.log(rsp)
                        if(rsp['post_id']){
                            alert('Successfully loaded');
                            document.querySelector('.upload-files').style.display = 'none';
                            var container = document.querySelector('#large-feed');
                            var newPost = document.createElement('section');
                            newPost.classList.add('post');
                            newPost.innerHTML +=  `
                <div class="id">${rsp['post_id']}</div>
                <h2 class="post-title">${user}</h2>
                <img src="data:image/png;base64,${base64}"  class="post-image">
                <div class="content">
                    <div class="icon">
                        <i class="far fa-heart fa-lg heart"></i>
                        <i class="fas fa-heart fa-lg heart-solid" style="display: none"></i>
                        <i class="far fa-comment fa-lg comment"></i>
                    </div>
                    <p class="likes">0 likes</p>
                    <p class="caption">
                        <span>${user}</span>${descr}️</p>
                </div>
                <div class="comment-list" ></div>
                <div class="input-group mb-3 comment-input" style="display: none">
                      <div class="input-group-prepend">
                        <span class="input-group-text" ></span>
                      </div>
                      <input type="text" class="form-control add-comment"
                             placeholder="Add a comment..."
                             aria-label="Default" aria-describedby="inputGroup-sizing-default">
                </div>
                <div class="time">now</div>
        `


                            container.insertBefore(newPost, container.firstChild);

                        }else{
                            alert(rsp['message'])
                        }
                        document.querySelector('.description').value = '';
                        document.querySelector('.reset').click();
                        }
                    )
               };
     }
      /**
     * @returns follow
     */
    follow(userToFollow) {
        var token = JSON.parse(localStorage.getItem(`${this.username}Token`));
        var url = `/user/follow?username=${userToFollow}`;
        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }
        var rsp = api.makeAPIRequest(url, options);
        rsp
            .then(rsp => {
                    if (rsp['message'] == 'success') {
                        alert('Congrats! Successfully followed!')
                    }
                }
            )
    }
    /**
     * @ like
     */
    like(postId) {
        var token = JSON.parse(localStorage.getItem(`${this.username}Token`));
        var url = `/post/like?id=${postId}`;
        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }
        var rsp = api.makeAPIRequest(url, options);
        rsp
            .then(rsp => {
                    console.log(rsp)
                    if (rsp['message'] == 'success') {
                        // var url = `/post/?id=${postId}`;
                        // var options = {
                        //             method: 'GET',
                        //             headers: {
                        //                 'Content-Type': 'application/json',
                        //                 'Authorization': `Token ${token}`
                        //             }
                        // }
                        // var feed = api.makeAPIRequest(url,options);
                        // feed
                        //     .then(rsp => console.log(rsp))
                    }
                }
            )
    }
    /**
     * @ unlike
     */
    unlike(postId) {
        var token = JSON.parse(localStorage.getItem(`${this.username}Token`));
        var url = `/post/unlike?id=${postId}`;
        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }
        var rsp = api.makeAPIRequest(url, options);
        rsp
            .then(rsp => {
                    console.log(rsp)
                    if (rsp['message'] == 'success') {
                    }
                }
            )
    }
    /**
     * @ comment
     */
    comment(postId,author,time,comment) {
        var token = JSON.parse(localStorage.getItem(`${this.username}Token`));
        var url = `/post/comment?id=${postId}`;
        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({'author':author,'published':time, 'comment':comment})
        }
        var rsp = api.makeAPIRequest(url, options);
        rsp
            .then(rsp => {
                    console.log(rsp)
                    // if (rsp['message'] == 'success'){
                    //
                    // }
                }
            )
    }
    /**
     * @ update profile
     */
    updateProfile(name, email, password) {
        var token = JSON.parse(localStorage.getItem(`${this.username}Token`));
        var url = '/user/';
        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({'name':name, 'email':email, 'password':password})
        }
        var rsp = api.makeAPIRequest(url, options);
        rsp
            .then(rsp => {
                    console.log(rsp)
                    document.querySelector('.profile .alert-success').style.display = 'block';
                    document.querySelector('.welcome-user').textContent = `Welcome back,  ${name}`
                    setTimeout(function () {
                        document.querySelector('.profile .alert-success').style.display = 'none';
                    },1000)
                }
            )
    }





}


