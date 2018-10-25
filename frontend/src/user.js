import API from './api.js';
// import {createElement} from './helpers.js';

const api  = new API();

// function getBase64(event) {
//     const [ file ] = event.target.files;
//
//     const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
//     const valid = validFileTypes.find(type => type === file.type);
//
//     // bad data, let's walk away
//     if (!valid)
//         return false;
//
//     // if we get here we have a valid image
//     const reader = new FileReader();
//
//     reader.onload = (e) => {
//         // do something with the data result
//         const dataURL = e.target.result;
//         return dataURL;
//     };
// }


// function getBase64(file) {
//    var reader = new FileReader();
//    reader.readAsDataURL(file);
//    reader.onload = function () {
//      console.log(reader.result);
//      return reader.result;
//    };
//    reader.onerror = function (error) {
//      console.log('Error: ', error);
//    };
// }

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
     * @returns feed
     */
     getFollowFeed(p, n) {
            let token = JSON.parse(localStorage.getItem(`${this.username}Token`));
            // var url = `/dummy/user/feed?p=${p}&n=${n}`
            var url = `/user/feed?p=${p}&n=${n}`;
            var options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
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
                        }else{
                            alert(rsp['message'])
                        }
                        document.querySelector('.description').value = '';
                        document.querySelector('.reset').click();
                        }
                    )
               };



     }



}


