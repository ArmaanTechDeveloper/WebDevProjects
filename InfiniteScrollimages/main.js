const wrapper = document.querySelector('.wrapper');
let noOfImagesAtOnce = 5;

// function to GET the images from the unsplash API
const getUnsplashImages = ()=>{
    let clientID = 'O8-e6-xCZPPVIQ15mUnq_OPZui1cPuzsrIieUSl81ik';
    let query = 'cars';
    // let url = `https://api.unsplash.com/search/photos/?client_id=${clientID}&query=${query}`; 
    let url = `https://api.unsplash.com/photos/random/?client_id=${clientID}&count=${noOfImagesAtOnce}`;
    fetch(url)
        .then(response => {return response.json()})
        .then(data => {
            console.log(data);
            updateUI(data) 
        })
        .catch(err => console.log(err));
    
    
}

// Function to update the ui
const updateUI = (data)=>{
    let i = 0;
    while (i < noOfImagesAtOnce){
        let html = `<img src="${data[i].urls.full}" alt="">`;
        wrapper.innerHTML += html;
        i += 1;
    }
    
}
// Firing the function for the first time when user enters the site
getUnsplashImages();

// adding infinite scroll
window.addEventListener('scroll',() => {
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
        getUnsplashImages();
    }
})