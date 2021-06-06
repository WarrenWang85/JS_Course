const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// VoiceRSS Javascript SDK

function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '439569c6fc1949e5abc09b5b8d9ded85',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}
// Get Jokes from Joke API
async function getJokes() {
    const url = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,explicit&type=single';
    let joke = '';
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.setup){
            joke = `${data.setup}...${data.delivery}`;
        }else{
            joke = data.joke;
        } 
        // Text-to-Speech

        tellMe(joke);
        toggleButton();
    } catch (error) {
        console.log('whoops',error);
    }
}
// function getJokes(url){
//     fetch(url).then(response => {return response.json()})
//     .then(joke => console.log(joke));
    
// }

// Event Listeners
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended', toggleButton);
