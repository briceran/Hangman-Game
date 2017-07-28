/*
 Hangman Game
 Brice Randolph
*/

var wins = 0;
var PublicWord = [];  //word displayed on screen
var logArray = [];  //used to hold guessed letters


//function returns boolean: updates word on screen
//
 function check(input,word){
 var results = false;
  for (var i = 0; i < word.length; i++) {
    if(input === word[i]){
      PublicWord[i] = input;
      document.getElementById("pubWord").innerHTML = PublicWord.join(" ");

      results = true;
    }
  }
  return results;
}


//function: updates image on screen
// void function
function updateImage(num){
  var zero='assets/images/skatestart.jpg';
  var one='assets/images/skate1.jpg';
  var two='assets/images/skate2.jpg';
  var three='assets/images/skate3.png';
  var four='assets/images/skate4.png';
  var five='assets/images/skate5.jpg';
  var six='assets/images/skate6.jpg';
  if(num === 6){var pic =zero;}
  if(num === 5){var pic =one;}
  if(num === 4){var pic =two;}
  if(num === 3){var pic =three;}
  if(num === 2){var pic =four;}
  if(num === 1){var pic =five;}
  if(num === 0){var pic = six;}
  document.querySelector('.skatePic').src = pic;

}

// function: detecting letters
// returns boolean
function allLetters(input) {
   var letters = /^[A-Za-z]+$/;
   if(input.match(letters)) {
      return true;
     }
   else {
     alert("Needs to be a letter.");
     return false;
     }
  }


//generates a word from list words
function generateWord(){
  var words = ["skateboard", "trucks", "wheels","deck","halfpipe","kickflip","heelflip","impossible","manual"];
  var num = Math.floor(Math.random()*words.length);
  var word = words[num];
  return word;
}



window.onload = function() {
    // runs after the DOM is built

    var guessesRemaining = 6;
    var word = generateWord();
    for (var i = 0; i < word.length; i++) { //generate hidden word on page
      PublicWord.push("-");
    }
    document.getElementById("pubWord").innerHTML = PublicWord.join(" ");

    document.onkeyup = function(event) {

      if(guessesRemaining === 0 ){ //start new word
        word = generateWord(); //maybe
        PublicWord = [];
        guessesRemaining = 6;
        updateImage(guessesRemaining);
        logArray = [];
        for (var i = 0; i < word.length; i++) {
          PublicWord.push("-");
        }
        document.getElementById("pubWord").innerHTML = PublicWord.join(" ");

      }


      userInput = event.key;
      // check to make sure the user gave a valid letter
      if (allLetters(userInput) && userInput.length===1 ){
        logArray.push(userInput);
        var currentList = "Letters Already Guessed: ";
        for(var i = 0; i< logArray.length; i++){
          currentList+=logArray[i];
          currentList+=" ";

        }

        var status = check(userInput,word);
        //if the user guessed incorrectly, decrement guessesRemaining
        if (!status && guessesRemaining>=0){
          guessesRemaining--;
          document.getElementById("guessesRemaining").innerHTML = "Guesses Remaining : "+guessesRemaining;

          updateImage(guessesRemaining);

          }

        document.getElementById("guessed").innerHTML = currentList;
        document.getElementById("userInput").innerHTML = "You chose : "+userInput;

      }

      //
      // check win
      //
      var counter = 0;
      for (var i = 0; i < PublicWord.length; i++) {
        if(PublicWord[i] !== "-"){counter++;}
      }
      if(counter===PublicWord.length){
        wins++;
        document.getElementById("wins").innerHTML = "Wins : "+wins;

        word = generateWord(); //maybe
        PublicWord = [];
        guessesRemaining = 6;
        updateImage(guessesRemaining);
        logArray = [];
        document.getElementById("guessesRemaining").innerHTML = "Guesses Remaining : "+guessesRemaining;

        for (var i = 0; i < word.length; i++) {
          PublicWord.push("-");
        }
        document.getElementById("pubWord").innerHTML = PublicWord.join(" ");

      }
  }//end on key up

}//end onload


//  * **document.querySelector(imgSelector).src** = 'image-relative-path.png'
