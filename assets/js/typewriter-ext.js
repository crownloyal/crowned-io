/*
 * typewriter.js
 * A Promise-based ES6 port of the original typewriter.js
 *
 * Original Copyright 2014, Connor Atherton - http://connoratherton.com/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 * 
 * Github:  http://github.com/ConnorAtherton/typewriter
 *
 */
'use strict';

class Typewriter {

  constructor(element, optin) {
    if (!element) throw new Error('A selector or element must be specified');
    if (!optin.text) throw new Error('Typewriter needs text to type');

    this.options = {
      element: document.querySelector(element) || element,
      text: optin.text,
      words: optin.words || false,
      interval: optin.interval || 'human',
      lowerBound: optin.lowerBound || 30,
      upperBound: optin.upperBound || 250,
      cursor:{ 
        state: optin.cursor.state || false,
        element: document.querySelector(element + ' #typewriter-cursor'),
        style: optin.cursor.style || '|',
        interval: optin.cursor.interval || 500
      }
    }

     this._setUpCursor();
  }

  _randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  _isNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
  }

  _getIntervalSpeed() {
    if (this._isNumber(this.options.interval)) { 
        return this.options.interval; 
    } else {
        return _randomIntFromInterval(this.options.lowerBound, this.options.upperBound);
    }
  }

  _setUpCursor() {
    if(this.options.cursor.state) {
        this.options.cursor.element.textContent = this.options.cursor.style;

        let show = (element) => {
            element.style.visibility = "visible";
        }
        let hide = (element) => {
            element.style.visibility = "hidden";
        }

        // TODO: Make it blink!
      
      }
    } 

  typeByLettersConstantInterval(callback) {
    let numberOfLetters = this.options.text.length,
        currentPosition = 0;

    let interval = window.setInterval(() => {
      if (currentPosition === numberOfLetters) {
        window.clearInterval(interval);

        callback && callback.call(window);
      } else {
        this.options.element.textContent += this.options.text[currentPosition];
        currentPosition++;
      }
    }, this._getIntervalSpeed());
  }

  typeByLettersRandomisedInterval(callback) {
    let numberOfLetters = this.options.text.length,
        currentPosition = 0;

    this.repeat(numberOfLetters, currentPosition, callback);
  }

  repeat(numberOfLetters, currentPosition, callback) {
    if (numberOfLetters === 0) return callback && callback.call(window);

    let interval = this._getIntervalSpeed.call(),
        timer;

    this.options.element.textContent += this.options.text[currentPosition];

    timer = setTimeout(() => {
      numberOfLetters--; currentPosition++;
      this.repeat(numberOfLetters, currentPosition, callback);
    }, interval);
  }

  typeByWords(callback) {
    let words = this.options.text.split(' '),
        numberOfWords = words.length,
        currentPosition = 0;

    let interval = window.setInterval(() => {
      if (currentPosition === numberOfWords) {
        window.clearInterval(interval);

        callback && callback.call(window);
      } else {
        this.options.element.textContent += (words[currentPosition] + ' ');
        currentPosition++;
      }
    }, this._getIntervalSpeed());
  }

  type(callback) {
    this.options.words ? typeByWords(callback) :
    this._isNumber(this.options.interval) ? this.typeByLettersConstantInterval(callback) : this.typeByLettersRandomisedInterval(callback);
  }

  removeWord(callback) {
    let currentWord = this.options.element.textContent,
        pointer = 0;

    console.log(currentWord);

    window.setInterval(() => {
      currentWord.slice(0, -1);
    }, currentWord.length);
    
  }
}

let typer = new Typewriter('#be-friendly', {
    interval: 100,
    text: 'Hello there!',
    cursor: {
      state: true
    }
})

typer.removeWord();
typer.type();