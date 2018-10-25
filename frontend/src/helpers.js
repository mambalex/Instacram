/* returns an empty array of size max */
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
    if (a.setHours(0,0,0,0) == today.setHours(0,0,0,0))
        return 'today, ' + hour + ':' + min;
    else if (a.setHours(0,0,0,0) == yesterday.setHours(0,0,0,0))
        return 'yesterday, ' + hour + ':' + min;
    else if (year == today.getFullYear())
        return date + ' ' + month + ', ' + hour + ':' + min;
    else
        return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
}

export function displayPosts(posts) {
    console.log(posts);
    posts['posts'].forEach(function (post) {
        const id = post['id'];
        const author = post['meta']['author'];
        const description = post['meta']['description_text'];
        const likes = post['meta']['likes'].length;
        const path = post['src'];
        const timeStamp = post['meta']['published'];
        const time = timeConverter(timeStamp);
        const container = document.querySelector('#large-feed');
        container.innerHTML += `
            <section class="post">
                <div class="id">${id}</div>
                <h2 class="post-title">${author}</h2>
                <img src="data:image/png;base64,${path}" alt="My lounge" class="post-image">
                <div class="content">
                    <div class="icon">
                        <i class="far fa-heart fa-lg heart"></i>
                        <i class="fas fa-heart fa-lg heart-solid" style="display: none"></i>
                        <i class="far fa-comment fa-lg comment"></i>
                    </div>
                    <p class="likes">${likes} likes</p>
                    <p class="caption">
                        <span>${author}</span>${description}️</p>
                </div>
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