particlesJS.load('background-particlesjs', 'assets/js/particlesjs-config.json', () => console.log('Particles initiated.') );

class TextEditor{
    
    constructor(typeSpeed) {
        this.init(typeSpeed);
        console.log("Let's type!");
    }

    init(typeSpeed){
        this.typeSpeed = typeSpeed;
        this.wordList = {
            "english" : "Hello",
            "french" : "Bonjour",
            "german" : "Guten Tag",
            "russian" : "привет"
        }
        // this.wordList = this._downloadWordList();
    }
}

new TextEditor(800);