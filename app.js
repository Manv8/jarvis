const btn = document.querySelector('.talk');
const cancel = document.querySelector('.cancel');
const content = document.querySelector('.content');



function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 0.5;
    
    // var msg = new SpeechSynthesisUtterance();
    // var voices = window.speechSynthesis.getVoices();
    // text_speak.voice = voices[0];
    // // text_speak.text = "hello world";
    // text_speak.lang = 'hi-IN';
    window.speechSynthesis.speak(text_speak);
}

// speak("नमस्ते! आपका स्वागत है")

function grreet() {
    var date = new Date
    var hour = date.getHours()

    if (hour >= 0 && hour <= 11) {
        speak("Good morning sir,How can i help you today")
    } else if (hour >= 12 && hour <= 15) {
        speak("Good afternoon sir,How can i help you today")

    } else if (hour >= 16) {
        speak("Good evening sir,How can i help you today")

    }


}
// grreet()
// window.addEventListener("load",()=>{
//     speak("jarvis loading....");
//     grreet()
// })


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


btn.addEventListener("click", () => {
    recognition.start()
    cancel.style.display = "block"
    btn.style.display = "none"

})
cancel.addEventListener("click", () => {
    recognition.stop()
    btn.style.display = "block"
    cancel.style.display = "none"
})
recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
    cancel.style.display = "none"
};

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    }else if (message.includes("namaste")) {
        speak("Nameste Sir, How May I Help You?");
    } else if (message.includes('who am i?') || message.includes('who is your master?') || message.includes("who created you?")) {
        speak("You are kunal agrawal,my master, who created me.");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else if (message.includes('wordpad')) {
        window.open('WordPad:///');
        const finalText = 'Opening Word Pad';
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}