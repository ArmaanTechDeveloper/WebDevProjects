
function addDataToAll(objects){
    let temp='';
    objects.forEach(object => {
        let html = `
            <tr>
                <th id="reviseTopicName">${object.topic}</th>
                <td>${object.dateAdded}</td>
                <td>${object.lastRevised}</td>
                <td>${object.timesRevised}</td>
            </tr>
    
    `
    const all = document.querySelector('#addAllHere');
    temp = temp + html;
    all.innerHTML = temp;
    });
    
}
function addDatatoReviseTable(data){
    let temp='';
    data.forEach(object => {
        if(object.revisionNeeded){

            let html = `
            <tr>
                <th>${object.topic}</th>
                <td>${object.lastRevised}</td>
                <td>${object.timesRevised}</td>
                <td><button class="btn btn-primary">Completed</button></td>
            </tr>
        
        `;
        const revise = document.querySelector('#addrevisehere');
        temp = temp + html;
        revise.innerHTML = temp;
        }
    });
}
function createRealTimeDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();   
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}
function sortDateInDateFormat(date){
    let splitDate = date.split('/');
    let newDate = splitDate[1]+'/'+splitDate[0]+'/'+splitDate[2];
    return newDate;
}
function findIndexInArray(data){
    let findIndexInArray = []
    data.forEach(object =>{
        findIndexInArray.push(object.index);
    })
    return (Math.max(...findIndexInArray));
}

module.exports = {
    addDataToAll,
    createRealTimeDate,
    findIndexInArray,
    sortDateInDateFormat,
    addDatatoReviseTable
}
