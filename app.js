/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
                                     /*gamePlaying is a state variable

                                       A state variable simply tell us the condition of a system. we need a state variable when we need to remember something or the state of something
                                         and in this case, this will be is our game playing or is our game not playing
                                          
									*/


init();

var lastDice;





/* CallBack function
   --------------------
function btn(){
	//Do something here
}

btn(); //calling the function btn(), using the parenthesis

document.querySelector('.btn-roll').addEventListener('click', btn)//addEventListener() has two arguments, first is the type of event like click, hover, etc and second part is the function that will be called as soon as the event happens
                                                            //remember to write the function name without any parenthesis , because we don't want to call it , we want the event listener to call the function btn() for us, and the button function is then called the callback function, because such function is not called by us, but by another function

*/






/*Anonymous function, which is a function which does not have a name and will be used only once(this function won't be resued in another point of code), and that's exactly what we need here
  --------------------*/
document.querySelector('.btn-roll').addEventListener('click' , function(){

	if(gamePlaying)//as gamePlaying is already true or false, we only need the gamePlaying variable and nothing else
	{

       //1. Random Number
       var dice1 = Math.floor(Math.random() * 6) + 1;
       var dice2 = Math.floor(Math.random() * 6) + 1;


       //2. Display the result
       document.getElementById('dice-1').style.display = 'block';
       document.getElementById('dice-2').style.display = 'block'; //use block to display something and none to hide 
       document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
       document.getElementById('dice-1').src = 'dice-' + dice2 + '.png';


       //3. Update the round score IF the rolled number is not a 1
       if(dice1 !== 1 && dice2 !== 1){
    	//Add score
    	roundScore += dice1 + dice2;//same as roundScore = roundScore + dice;
    	document.querySelector('#current-' + activePlayer).textContent = roundScore;
       }
       else{
    	//Next player
    	nextPlayer(); 
       }

       /*
       if (dice === 6 && lastDice === 6) {
       	// Player looses score
       	scores[activePlayer] = 0;
       	document.querySelector('#score-' + activePlayer).textContent = '0';
       	nextPlayer();
       }
       else if(dice !== 1){
    	//Add score
    	roundScore += dice;//same as roundScore = roundScore + dice;
    	document.querySelector('#current-' +activePlayer).textContent = roundScore;
       }
       else{
    	//Next player
    	nextPlayer(); 
       }

       lastDice = dice;
	   */
	}
    



});


document.querySelector('.btn-hold').addEventListener('click' , function(){

	if(gamePlaying){
		// Add CURRENT score to GLOBAL score
      scores[activePlayer] += roundScore;

      // Update the UI(user interface)
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      var input = document.querySelector('.final-score').value;
      var winningScore;

      // Undefined, 0, null or "" are COERCED to false
      // Anything else is coerced to true
      if(input) {
      	winningScore = input;
      } else {
      	winningScore = 100;
      }

      // Check if player won the game
      if(scores[activePlayer] >= winningScore){
      	document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      	document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
      	document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      	gamePlaying = false;

      }
      else{
      	//Next Player
      	nextPlayer();
      }

	}

      


      
});

//Function to toggle between the players , or should we say, next player's turn
function nextPlayer(){
	//Making use of ternary operator
    	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;


    	/*Above statement using ternary operator can be replaced with the below if...else loop, the logic is same
    	if(activePlayer === 0){
    		activePlayer = 1;
    	} 
    	else{
    		activePlayer = 0;
    	}*/

    	roundScore = 0;

    	document.getElementById('current-0').textContent = '0';
    	document.getElementById('current-1').textContent = '0';



    	/*
    	Removing and Adding classes
    	---------------------------------
    	*/

    	//Using toggle
    	document.querySelector('.player-0-panel').classList.toggle('active');
    	document.querySelector('.player-1-panel').classList.toggle('active');


    	/* You can also use remove and add instead of toggle, here if...else statement would be required to revert back to player 1 in case of player 2 rolling a 1, so that would only make code larger, hence, it is better to opt for toggle instead, as it will just toggle between the active players based on the condition
    	document.querySelector('.player-0-panel').classList.remove('active');
    	document.querySelector('.player-1-panel').classList.add('active');
    	*/

    	document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none'; //Hiding the dice again when either one of the player rolls 1 and it's another player's turn

}


document.querySelector('.btn-new').addEventListener('click' , init);//Callback function, clicking on new button will call the init() function , and, again, callback function does not require parenthesis, so write only init not init() without any parenthesis inside addEventListener






//Function to initialize, or start, our game
function init(){
	scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none'; //Changing css style, in this case hiding the dice before the game begins
                  //style method, CSS property, and the CSS value that we attribute to this property


//getElementById is only for IDs and is faster than querySelector, this is particularly useful when we just have IDs and we can avoid using querySelector
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.final-score').value = '';

}








//the object that will give us access to the DOM is the document object
//It's a setter because we set a value
//document.querySelector('#current-' + activePlayer).textContent = dice; //textContent is just for plain text not for html

//for HTML use innerHTML
//document.querySelector('#current-' + activePlayer).innerHTML = '<b>' +dice+ '</b>'; //write html in a '' because not doing so will make javascript parser think that you are writing javascript

//It's a getter because we get  value 
//var x = document.querySelector('#score-0').textContent;
//console.log(x);