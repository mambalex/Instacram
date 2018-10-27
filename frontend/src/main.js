// importing named exports we use brackets
import { getPosts} from './helpers.js';

// when importing 'default' exports, use below syntax
import API from './api.js';
import USER from './user.js';
const api  = new API();

var currentPost;
var currentUser;
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
            console.log(rsp)
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
            user.getUserInfo().then(info => {
                document.querySelector('.welcome-user').textContent = `Welcome back,  ${info['name']}`;
                document.querySelector('.current_user_id').textContent = info['id'];
                document.querySelector('#name').textContent = info['name'];
                document.querySelector('#email').textContent = info['email'];
            })
            currentUser = username;
            getPosts(username,0,3);
            currentPost = 3;
        })
});

document.onscroll = function() {
    if(document.documentElement.scrollTop + window.innerHeight == document.documentElement.scrollHeight)
    {
        getPosts(currentUser,currentPost,3)
        currentPost += 3;
    }
}


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

