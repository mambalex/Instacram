import API from './api.js';
import {getPosts,sortPosts} from './helpers.js';

const api  = new API();



export default class USER {

    /**
     * Defaults username
     * @param {string} url
     */
    constructor(username) {
        this.username = username;
    }

    /**
     * @returns user info promise
     */
    getUserInfo(id,userName) {
        var token = JSON.parse(localStorage.getItem(`${this.username}Token`));
        var userInfo;
        var url = '/user/';
        if(id){
            url = `/user/?id=${id}`;
        }else if(userName){
            url = `/user/?username=${userName}`;
        }
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
     * @returns feed promise
     */
    getFeed(postId) {
        var token = JSON.parse(localStorage.getItem(`${this.username}Token`));
        var url = `/post/?id=${postId}`;
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }
        var feed = api.makeAPIRequest(url,options);
        return feed;
    }
    /**
     * sort and display posts in user page
     */
    userPagePosts(posts) {
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
                var sortedPosts = sortPosts(array);
                var container = document.querySelector('.post-container');
                sortedPosts.forEach(function (post) {
                      container.innerHTML += `
        <img src="data:image/png;base64,${post['thumbnail']}" class="post-item" alt=${post['id']}>`
                })
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
                            document.querySelector('.description').value = '';
                            document.querySelector('.reset').click();
                            getPosts(0,10)
                        }
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
        return rsp;
    }
     /**
     * @returns unfollow
     */
    unfollow(userName) {
        var token = JSON.parse(localStorage.getItem(`${this.username}Token`));
        var url = `/user/unfollow?username=${userName}`;
        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }
        var rsp = api.makeAPIRequest(url, options);
        return rsp;
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
    /**
     * @ update post
     */
    updatePost(id,newText,src) {
        var token = JSON.parse(localStorage.getItem(`${this.username}Token`));
        var url = `/post/?id=${id}`;
        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({'description_text':newText, 'src':src})
        }
        var rsp = api.makeAPIRequest(url, options);
        rsp
            .then(rsp => {
                    console.log(rsp);
                     if(rsp['message'] == 'success'){
                        alert('Successfully updated!')
                    }
                }
            )
    }
    /**
     * @ delete post
     */
    deletePost(id) {
        var token = JSON.parse(localStorage.getItem(`${this.username}Token`));
        var url = `/post/?id=${id}`;
        var options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }
        var rsp = api.makeAPIRequest(url, options);
        rsp
            .then(rsp => {
                     console.log(rsp);
                     if(rsp['message'] == 'success'){
                        alert('Successfully deleted!')
                        document.querySelector('#remove-layer').click();
                    }
                }
            )
    }

}


