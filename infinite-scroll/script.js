const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    // console.log(imagesLoaded);
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true
    }
    
}

//Helper Function to Set Attributes on DOM Elements
function setAttributes(element, Attributes) {
    for (const key in Attributes) {
        element.setAttribute(key, Attributes[key]);
    }
}
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            'href':photo.links.html,
            'target':'_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            'src':photo.urls.regular,
            'alt':photo.alt_description,
            'title':photo.alt_description,
        })
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageConatiner Element

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Unsplash API
const count = 10;
const apiKey = '';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
        // Catch Error here
    }
}
// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        imagesLoaded = 0;
        getPhotos();   
    }
})
getPhotos();