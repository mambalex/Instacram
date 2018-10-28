/* returns an empty array of size max */
import USER from './user.js';

export const range = (max) => Array(max).fill(null);

/* returns a randomInteger */
export const randomInteger = (max = 1) => Math.floor(Math.random()*max);

/* returns a randomHexString */
const randomHex = () => randomInteger(256).toString(16);

/* returns a randomColor */
export const randomColor = () => '#'+range(3).map(randomHex).join('');

/**
 * You don't have to use this but it may or may not simplify element creation
 * 
 * @param {string}  tag     The HTML element desired
 * @param {any}     data    Any textContent, data associated with the element
 * @param {object}  options Any further HTML attributes specified
 */
export function createElement(tag, data, options = {}) {
    const el = document.createElement(tag);
    el.textContent = data;
   
    // Sets the attributes in the options object to the element
    return Object.entries(options).reduce(
        (element, [field, value]) => {
            element.setAttribute(field, value);
            return element;
        }, el);
}

/**
 * Given a post, return a tile with the relevant data
 * @param   {object}        post 
 * @returns {HTMLElement}
 */
export function createPostTile(post) {
    const section = createElement('section', null, { class: 'post' });

    section.appendChild(createElement('h2', post.meta.author, { class: 'post-title' }));

    section.appendChild(createElement('img', null, 
        { src: '/images/'+post.src, alt: post.meta.description_text, class: 'post-image' }));

    return section;
}

// Given an input element of type=file, grab the data uploaded for use
export function uploadImage(event) {
    const [ file ] = event.target.files;

    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === file.type);

    // bad data, let's walk away
    if (!valid)
        return false;
    
    // if we get here we have a valid image
    const reader = new FileReader();

    reader.onload = (e) => {
        // do something with the data result
        const dataURL = e.target.result;
        const image = createElement('img', null, { src: dataURL });
        document.body.appendChild(image);
    };

    // this returns a base64 image
    reader.readAsDataURL(file);
}

/* 
    Reminder about localStorage
    window.localStorage.setItem('AUTH_KEY', someKey);
    window.localStorage.getItem('AUTH_KEY');
    localStorage.clear()
*/
export function checkStore(key) {
    if (window.localStorage)
        return window.localStorage.getItem(key)
    else
        return null

}

function sort_unique(arr) {
    return arr.sort().reverse().filter(function(el,i,a) {
        return (i==a.indexOf(el));
    });
}

//sort posts accoding to its published time
export function sortPosts(posts) {
    var time = [];
    var dic = {};
    var newPosts = [];
    posts.forEach(function (post) {
        time.push(post['meta']['published']);
        if(!dic[post['meta']['published']]){
            dic[post['meta']['published']] = [post];
        }else{
            dic[post['meta']['published']].push(post);
        }
    })
    time = sort_unique(time);
    time.forEach(function (t) {
        dic[t].forEach(function (p) {
            newPosts.push(p)
        })
    })
    return newPosts;
}

//convert timeStamp to date
function timeConverter(t) {
    var a = new Date(t * 1000);
    var today = new Date();
    var yesterday = new Date(Date.now() - 86400000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    if(min<10){
        min = `0${min}`
    }
    var now = new Date();
    var nowHour = now.getHours();
    var nowMin = now.getMinutes();
    if (a.setHours(0,0,0,0) == today.setHours(0,0,0,0)) {
        var secondGap = now.getTime()/1000 - t;
        var hourGap = nowHour - hour;
        var minGap = nowMin - min;
        if (secondGap > 3600) {
            return `${hourGap} hours ago`
        } else {
            if(minGap==0){return '1 minute ago'}else{return `${minGap} minutes ago`}
        }
    }else if (a.setHours(0,0,0,0) == yesterday.setHours(0,0,0,0))
        return 'yesterday, ' + hour + ':' + min;
    else if (year == today.getFullYear())
        return date + ' ' + month + ', ' + hour + ':' + min;
    else
        return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
}

//display pop up post
export  function displayPopupPost(post) {
        console.log(post);
        var currentUserId = document.querySelector('.current_user_id').textContent;
        const container = document.querySelector('.thumbnail-popup');
            // remove all children
        while (container.firstChild) {
             container.removeChild(container.firstChild);
        }
        const id = post['id'];
        const author = post['meta']['author'];
        const comments  = post['comments'];
        const description = post['meta']['description_text'];
        var likes = post['meta']['likes'].length;
        const path = post['src'];
        const timeStamp = post['meta']['published'];
        const time = timeConverter(timeStamp);
        var likeDisplay = 'inline-block';
        var solidLikeDisplay = 'none';
        post['meta']['likes'].forEach(function (val) {
            if( val == currentUserId){
                likeDisplay = 'none';
                solidLikeDisplay = 'inline-block'
            }
        })
        var commentsDiv = '';
        if(comments.length > 2){
            commentsDiv  += `<div class='comment-list' style='height:60px'>`
            comments.forEach(function (cmt) {
             commentsDiv  += `
                    <p class="comment-item">
                        <span>${cmt['author']}</span> ${cmt['comment']}
                    </p>`
             })
            commentsDiv  += `</div><div class='view-more'>View all ${comments.length} comments</div>`
        }else {
            commentsDiv  += `<div class='comment-list'>`;
            comments.forEach(function (cmt) {
             commentsDiv  += `
                    <p class="comment-item">
                        <span>${cmt['author']}</span> ${cmt['comment']}
                    </p>`
             })
            commentsDiv  += '</div>'
        }
        container.innerHTML += `
                <div class="id">${id}</div>
                <h2 class="post-title">${author}
                <div class="edit"><i class="far fa-edit"></i></div>
                <div class="delete"><i class="far fa-trash-alt"></i></div>
                </h2>
                <img src="data:image/png;base64,${path}" alt="img" class="post-image">
                <div class="content">
                    <div class="icon">
                  <i class="far fa-heart fa-lg heart" style="display: ${likeDisplay}"></i>
                 <i class="fas fa-heart fa-lg heart-solid" style="display: ${solidLikeDisplay}"></i>
                        <i class="far fa-comment fa-lg comment"></i>
                    </div>
                    <p class="likes">${likes} likes</p>
                    <p class="caption">
                        <span class="author">${author}</span> 
                        <span class="thumbnail-text">${description}</span>️
                    </p>
                </div>
                ${commentsDiv}
                <div class="input-group mb-3 comment-input" style="display: none">
                      <div class="input-group-prepend">
                        <span class="input-group-text" ></span>
                      </div>
                      <input type="text" class="form-control add-comment"
                             placeholder="Add a comment..."
                             aria-label="Default" aria-describedby="inputGroup-sizing-default">
                </div>
               <button type="button" class="btn btn-primary update-src" id="upload-pic">Change picture</button>
               <div id="file-name"></div><br>
                <div class="time">${time}</div>
        `
}


//display posts in the main page
export function displayPosts(posts,remove) {
    console.log(posts);
    posts = sortPosts(posts)
    var currentUserId = document.querySelector('.current_user_id').textContent;
    const container = document.querySelector('#large-feed');
    if(remove == 'remove'){
            // remove all children
        while (container.firstChild) {
         container.removeChild(container.firstChild);
        }
    }

    posts.forEach(function (post) {
        const id = post['id'];
        const author = post['meta']['author'];
        const comments  = post['comments'];
        const description = post['meta']['description_text'];
        var likes = post['meta']['likes'].length;
        const path = post['src'];
        const timeStamp = post['meta']['published'];
        const time = timeConverter(timeStamp);
        var likeDisplay = 'inline-block';
        var solidLikeDisplay = 'none';
        post['meta']['likes'].forEach(function (val) {
            if( val == currentUserId){
                likeDisplay = 'none';
                solidLikeDisplay = 'inline-block'
            }
        })
        var commentsDiv = '';
        if(comments.length > 2){
            commentsDiv  += `<div class='comment-list' style='height:60px'>`
            comments.forEach(function (cmt) {
             commentsDiv  += `
                    <p class="comment-item">
                        <span>${cmt['author']}</span> ${cmt['comment']}
                    </p>`
             })
            commentsDiv  += `</div><div class='view-more'>View all ${comments.length} comments</div>`
        }else {
            commentsDiv  += `<div class='comment-list'>`;
            comments.forEach(function (cmt) {
             commentsDiv  += `
                    <p class="comment-item">
                        <span>${cmt['author']}</span> ${cmt['comment']}
                    </p>`
             })
            commentsDiv  += '</div>'
        }
        container.innerHTML += `
            <section class="post">
                <div class="id">${id}</div>
                <h2 class="post-title">${author}</h2>
                <img src="data:image/png;base64,${path}" alt="img" class="post-image">
                <div class="content">
                    <div class="icon">
                  <i class="far fa-heart fa-lg heart" style="display: ${likeDisplay}"></i>
                 <i class="fas fa-heart fa-lg heart-solid" style="display: ${solidLikeDisplay}"></i>
                        <i class="far fa-comment fa-lg comment"></i>
                    </div>
                    <p class="likes">${likes} likes</p>
                    <p class="caption">
                        <span class="author">${author}</span>${description}️</p>
                </div>
                ${commentsDiv}
                <div class="input-group mb-3 comment-input" style="display: none">
                      <div class="input-group-prepend">
                        <span class="input-group-text" ></span>
                      </div>
                      <input type="text" class="form-control add-comment"
                             placeholder="Add a comment..."
                             aria-label="Default" aria-describedby="inputGroup-sizing-default">
                </div>
                <div class="time">${time}</div>
            </section>
        `
    })
}


//display user page
export  function displayUserPage(userId,userName) {
        var username = document.querySelector('.current_user').textContent;
        var user = new USER(username);
        var followOrNot = false;
        var selfInfo = user.getUserInfo()
        selfInfo
            .then(info =>{
                info['following'].forEach(function (id) {
                    if(id==userId){
                        followOrNot = true;
                    }
                })
                var userInfo;
                if(userId){
                    userInfo = user.getUserInfo(userId);
                }else{
                    userInfo = user.getUserInfo(false,userName)
                }

        userInfo
            .then(info => {
                console.log(info)
                let username = info['username'];
                var posts = info['posts'];
                var name = info['name'];
                var email = info.email;
                var followedNum = info['followed_num'];
                var following = info['following'];
                document.querySelector('.nav-posts').click();
                document.querySelector('.popup-user').textContent = name;
                document.querySelector('.popup-email').textContent = email;
                document.querySelector('.popup-username').textContent = username;
                document.querySelector('.popup-userId').textContent = info.id;
                document.querySelector('.popup-post-num').textContent = posts.length;
                document.querySelector('.popup-follower').textContent = followedNum
                document.querySelector('.popup-following').textContent = following.length;
                //display button
                if(followOrNot){
                    document.querySelector('#follow-btn').style.display = 'none';
                    document.querySelector('#following-btn').style.display = 'inline-block';
                }else{
                    document.querySelector('#follow-btn').style.display = 'inline-block';
                    document.querySelector('#following-btn').style.display = 'none';
                }
                //display all post
                var container = document.querySelector('.post-container');
                // remove all children
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
                //append all posts
                user.userPagePosts(posts)
                //display all following
                var flwingContainer = document.querySelector('.following');
                // remove all children
                while (flwingContainer.firstChild) {
                    flwingContainer.removeChild(flwingContainer.firstChild);
                }
                //append all following users
                following.forEach(function (userId) {
                    var userInfo = user.getUserInfo(userId);
                    userInfo
                        .then(rsp => {
                            flwingContainer.innerHTML += `
         <div class="following-user">${rsp['name']}<span class="id">${rsp['id']}</span></div>`
                        })
                })
            })
            })

}


//get posts and display
export function getPosts(username, p, n, remove) {
            const user  = new USER(username);
            var feeds = user.getFollowFeed(p,n);
            feeds
                .then(rsp => {
                    var posts = rsp['posts'];
                    displayPosts(posts,remove);
                });
}



//get all feeds ids
function getAllFeedIds(user,followingIds,counter,newPostIds) {
                 var promise = new Promise(function(resolve){
                      if (counter < followingIds.length) {
                            user.getUserInfo(followingIds[counter]).then(info => {
                            newPostIds = newPostIds.concat(info.posts)
                            counter ++;
                            resolve(getAllFeedIds(user,followingIds,counter,newPostIds));})
                      }else {
                        resolve(newPostIds);
                      }
                   });
                 return promise;
            }

export function getCurrentAllFeedIds() {
    var newPostIds=[];
    var counter = 0;
    var username = document.querySelector('.current_user').textContent;
    var user = new USER(username);
    return  user.getUserInfo().then(rsp => rsp.following)
                      .then(data => getAllFeedIds(user,data,counter,newPostIds))

}


//get all feeds authors
function getAuthors(user,postIds,counter,authors) {
    var promise = new Promise(function(resolve){
                      if (counter < postIds.length) {
                            user.getFeed(postIds[counter]).then(info => {
                            authors.push(info.meta.author)
                            counter ++;
                            resolve(getAuthors(user,postIds,counter,authors));})
                      }else {
                        resolve(authors);
                      }
                   });
                 return promise;
}

export function getNewPostAuthors(postIds) {
    var authors = [];
    var counter = 0;
    var username = document.querySelector('.current_user').textContent;
    var user = new USER(username);
    return getAuthors(user,postIds,counter,authors);
}


//get all feeds information
function getAllFeeds(user,postIds,counter,allPostsInfo) {
    var promise = new Promise(function(resolve){
                      if (counter < postIds.length) {
                            user.getFeed(postIds[counter]).then(info => {
                            allPostsInfo.push(info)
                            counter ++;
                            resolve(getAllFeeds(user,postIds,counter,allPostsInfo));})
                      }else {
                        resolve(allPostsInfo);
                      }
                   });
                 return promise;
}

export function getFeedsInfo(postIds) {
    var counter = 0;
    var allPostsInfo = [];
    var username = document.querySelector('.current_user').textContent;
    var user = new USER(username);
    return getAllFeeds(user,postIds,counter,allPostsInfo);
}
