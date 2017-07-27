/*


 Hangman Game



*/

var wins = 0;
var PublicWord = [];
var logArray = [];

//functions

//function returns boolean: updates word on screen
//
 function check(input){
 var results = false;
  for (var i = 0; i < word.length; i++) {
    if(input === word[i]){
      PublicWord[i] = input;
      results = true;
    }
  }
  return results;
}


//function: updates image on screen
// void function
function updateImage(num){
  var zero='#';
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

function generateWord(){
  words = ["skateboard", "trucks", "wheels","deck","halfpipe","kickflip","heelflip","impossible","manual"];
  num = Math.floor(Math.random()*words.length);
  word = words[num];
  return word;
}



window.onload = function() {
    // all of your code goes in here
    // it runs after the DOM is built

    var guessesRemaining = 6;
    var word = generateWord();
    for (var i = 0; i < word.length; i++) {
      PublicWord.push("-");
    }

    document.onkeyup = function(event) {

      userInput = event.key;

      if (allLetters(userInput) && userInput.length===1 ){
        logArray.push(userInput);
        var currentList = "Letters Already Guessed: ";
        for(var i = 0; i< logArray.length; i++){
          currentList+=logArray[i];
          currentList+=" ";

        }
        console.log(word);
        console.log(PublicWord);
        var status = check(userInput);

        //if the user guessed incorrectly, decrement guessesRemaining
        if (!status && guessesRemaining>=0){
          guessesRemaining--;
          updateImage(guessesRemaining);

        }
        console.log(guessesRemaining);
        console.log(currentList);

        document.getElementById("guessed").innerHTML = currentList;
        document.getElementById("userInput").innerHTML = "You choose:"+userInput;

      }




  }//end on key up
}//end onload


//  * **document.querySelector(imgSelector).src** = 'image-relative-path.png'
