const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLodingSpinner (){
    loader.hindden = false;
    quoteContainer.hidden = true;
    
}

function removeLoadingSpinner() {
    
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// Show New Quote
function newQuote() {
    
    showLodingSpinner();
    
    // Pick a random quote from apiQuotes array
    const quote =apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 80) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    //Set quote, Hide Loader
    
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
    // console.log(quote);
}

//  Get Quotes From API
async function getQuotes() {
    // loading();
    
    const apiUrl = 'https://type.fit/api/Quotes';
    try {
        showLodingSpinner();
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        // console.log(apiQuotes[20]);
    } catch (error) {
        getQuotes()
        //Catch Error Here
    }
}
//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

//Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
// loading();