// date function 
document.getElementById("send").addEventListener("click", function(){
    document.getElementById("search").value='Thanks for your feedback';
  });

function clock() {
    time = new Date();
    let hr = time.getHours();
    let sec = time.getSeconds();
    let min = time.getMinutes();
    let print = (" Time - "+hr + ":" + min + ":" + sec)
    document.getElementById('date').innerHTML = print;
}
setInterval(clock, 1000);


