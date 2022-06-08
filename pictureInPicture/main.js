const video = document.querySelector('#video');
const button = document.querySelector('#button');

async function getPlayRequiredDisplayMedia(){
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        video.srcObject = mediaStream;
        video.onloadedmetadata = () =>{
            video.play();
        } 
    }
    catch(err){
        console.log(err);
    }
}

button.addEventListener('click' ,async () => {
    button.disabled = true;
    await video.requestPictureInPicture();
    button.disabled = false;
})

getPlayRequiredDisplayMedia();