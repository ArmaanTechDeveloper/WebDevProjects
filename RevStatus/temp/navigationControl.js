const navigationControl =  document.querySelector('.navigationControl');


navigationControl.addEventListener('click',(e)=>{
    e.preventDefault();
    if(!e.target.classList.contains('navigationControl')){
        const activeRemove  = document.getElementsByClassName('active');    
        for (let index = 0; index < activeRemove.length; index++) {
            const element= activeRemove[index];
            element.classList.remove('active')            
        }
        e.target.classList.add('active');        

        // short hand syntax contributed by : Harvey#6910
        const controller = document.getElementsByClassName('controller');
        const contentController = document.getElementsByClassName('content-controller')  

        for (let i = 0; i < controller.length; i++) {
            if (e.target === controller[i]) 
                contentController[i].classList.remove('display-none')
            else
                contentController[i].classList.add('display-none')
        }
            
    }

    
    
})


