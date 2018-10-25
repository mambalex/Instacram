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


//nav login
document.querySelector('.get-started').addEventListener('click', function() {
    document.querySelector('.landing').style.display = 'none';
    document.querySelector('.banner').style.display = 'flex';
    document.querySelector('.container').style.display = 'inline-flex';
    document.querySelector('.layer').style.display = 'block';
    document.querySelector('.layer2').style.display = 'block';
    document.querySelector('#remove-layer').style.display = 'block';
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





//click heart - like
document.querySelector('#large-feed').addEventListener('click', function (event) {
   event.preventDefault();
  if (event.target.classList.contains('heart')) {
      event.target.style.display = 'none';
      var solid = event.target.parentNode.childNodes[3];
      solid.style.display = 'inline-block';
  }
})


//click solid heart - unlike
document.querySelector('#large-feed').addEventListener('click', function (event) {
   event.preventDefault();
  if (event.target.classList.contains('heart-solid')) {
      event.target.style.display = 'none';
      var heart = event.target.parentNode.childNodes[1];
      heart.style.display = 'inline-block';
  }
})


//click comment icon
document.querySelector('#large-feed').addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('comment')) {
      var commentIcon = event.target.parentNode.childNodes[5];
      console.log(commentIcon);
      var input = commentIcon.parentNode.parentNode.parentNode.childNodes[9];
        if(input.style.display == 'table'){
            input.style.display = 'none';
            input.childNodes[2].value = '';
        }else{
             input.style.display = 'table';
        }
    }
})



//click comment icon
document.querySelector('.comment').addEventListener('click', function (e) {
    e.preventDefault();
    var input = this.parentNode.parentNode.parentNode.childNodes[4];
    if(input.style.display == 'table'){
        input.style.display = 'none';
        input.childNodes[2].value = '';
        // document.querySelector('.add-comment').value = '';
    }else{
         input.style.display = 'table';
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



















