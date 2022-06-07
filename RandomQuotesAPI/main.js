// getting a reference to the user interface
const quote = document.querySelector('.quote');
const NextButton = document.querySelector('.next');
const tweetButton = document.querySelector('.tweet');
const authorUI = document.querySelector('.author');

// adding event listener for next button
NextButton.addEventListener('click' , ()=>{getQuote()})

//fetching the quote
const getQuote = () =>{
    NextButton.innerHTML = 'Loading ...';
    const url = 'https://type.fit/api/quotes';
    fetch(url)
        .then(response => response.json())
        .then(response => {updateUI(response)})
        .catch(err => {console.log(err); quote.innerHTML = 'An error Occured'});
}

// updating the UI
const updateUI = (response)=>{
    const randomNum = Math.floor(Math.random() * response.length);
    const newQuote = response[randomNum].text;
    const author = response[randomNum].author;

    quote.innerHTML = newQuote;
    authorUI.innerHTML = `- ${author}`;
    NextButton.innerHTML = 'Next';
    tweetButton.href = `https://twitter.com/intent/tweet?text=${newQuote} - ${author}`;
}
// firing the function for the first time when a user enters the site
getQuote();