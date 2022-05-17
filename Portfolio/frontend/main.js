let usersVisited = 10000;
let usersRegistered = 1000;
let i = 0;
let j = 0;
let skip = 25;
const fori = setInterval(() => {
    const uservisit = document.querySelector('#users > div:nth-child(1) > p');
    uservisit.innerHTML = i;
    i = i+skip;
    if(i>usersVisited){
        clearInterval(fori);
    }
}, 0.001);
const forj = setInterval(() => {
    const uservisit = document.querySelector('#users > div:nth-child(2) > p');
    uservisit.innerHTML = j;
    j = j+10;
    if(j>usersRegistered){
        clearInterval(forj);
    }
}, 0.001);
