import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    doc,
    updateDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAxROUgBbHheC_JqNX0M07E3_N3AAYTEiw",
    authDomain: "revision-notifier-f3570.firebaseapp.com",
    projectId: "revision-notifier-f3570",
    storageBucket: "revision-notifier-f3570.appspot.com",
    messagingSenderId: "922225858944",
    appId: "1:922225858944:web:7203068b4977602f87c965"
};
const { 
    addDataToAll,
    createRealTimeDate,
    findIndexInArray,
    sortDateInDateFormat,
    addDatatoReviseTable
 } = require('./utility')
initializeApp(firebaseConfig);

// initializing a db
const db = getFirestore();

// getting into the collection
const colRef = collection(db,'revData');
let lastindex;
let data= []


onSnapshot(colRef,(snapshot)=>{
    data=[];
        snapshot.docs.forEach(doc=>{
            data.push({...doc.data(), id:doc.id})
        })
        addDataToAll(data)
        lastindex = findIndexInArray(data);
        comparingTheData(data);
        addDatatoReviseTable(data)
        
})

const addTopic = document.querySelector('#add')
addTopic.addEventListener('submit', (e) => {
    e.preventDefault()    
    const today = createRealTimeDate()
    console.log()
    addDoc(colRef,{
        topic: addTopic.topic.value,
        dateAdded: today,
        lastRevised: today,
        timesRevised: 0,
        index: lastindex+1,
        revisionNeeded: false

    })
    .then(()=>{
        addTopic.reset();
    })
});

const revise = document.querySelector('#addrevisehere');
revise.addEventListener('click',(e)=>{
    if(e.target.classList.contains('completedbtn')){
        const topicName = document.querySelector('.reviseTopicName');        
        revisionCompletedUpdate(data,topicName.innerText);
        e.target.parentElement.parentElement.remove();
    }
})

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




function comparingTheData(data){
    data.forEach(object => {
        let objectDate = sortDateInDateFormat(object.dateAdded);
        let todaysDate = sortDateInDateFormat(createRealTimeDate());
        let delta =Date.parse(todaysDate) - Date.parse(objectDate);
        let deltaInDays = delta / (1000*60*60*24);

        if(
            (deltaInDays >= 1 && object.timesRevised === 0) ||
            (deltaInDays >= 2 && object.timesRevised === 1) ||
            (deltaInDays >= 7 && object.timesRevised === 2) ||
            (deltaInDays >= 14 && object.timesRevised === 3) ||
            (deltaInDays >= 28 && object.timesRevised === 4) ||
            (deltaInDays >= 56 && object.timesRevised === 5) ||
            (deltaInDays >= 90 && object.timesRevised === 6) ||
            (deltaInDays >= 180 && object.timesRevised === 7) ||
            (deltaInDays >= 360 && object.timesRevised === 8) ||
            (deltaInDays >= 720 && object.timesRevised === 9) 
        ){
            if(!object.revisionNeeded){
                const docRef = doc(db,'revData',object.id);
                updateDoc(docRef,{
                    revisionNeeded: true,
                })
                
            }
        }

    });
}

function revisionCompletedUpdate(data,topicName){
    
    data.forEach(object => {
        if(object.topic.trim() == topicName.trim()){
            const today = createRealTimeDate()
            const docRef = doc(db,'revData',object.id);
            const timesRevised = object.timesRevised;
                updateDoc(docRef,{
                    timesRevised: timesRevised+1,
                    lastRevised: today,
                    revisionNeeded: false
                })
                
                
        }
    });
}

