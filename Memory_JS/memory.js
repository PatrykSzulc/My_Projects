const cardColors = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow", "gray", "gray", "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"];

/* PART 1 */
//Download all Divs
let cards = document.querySelectorAll("div"); //NodeList; Method getElementsByTagName creates HTMLCollection
cards = [...cards]; //We create an array from a list (here we don’t have to, but if we use getElementsByClassName, then we have to, because there is no forEach method)

//You can do the same as above in an entry
//let cards = [...document.querySelectorAll("div")]

const startTime = new Date().getTime(); //We load the current date in milliseconds

let activeCard = ""; //which card has just been clicked on
const activeCards = []; //Table for two cards

//Required to terminate – how many pairs total
const gameLength = cards.length / 2; //9
//Result information – how many pairs could be guessed
let gameResult = 0;
/* End PART 1 */

//PART 2 – COLLECTING, SHOWING AND SHOWING, LISTENING ON CLICKING
//Function initialized after startup
const init = function () {
    //Draw of the class for each diva
    cards.forEach(card => {
        //Position from the Color Storage Array
        const position = Math.floor(Math.random() * cardColors.length); //1
        //Adding a class to a specific Div
        card.classList.add(cardColors[position]);
        //Delete the dragged element, shorter table for the next draw
        cardColors.splice(position, 1);
    })
    //Add the Hidden Class after 2 seconds – Hide and add eavesdropping on click
    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener("click", clickCard)
        })
    }, 2000)
};

init()

/*PART 3 - AFTER THE CLICK ON THE MAP – MINI GAME*/
const clickCard = function () {

    activeCard = this; //on which was clicked
    //console.log(event.target) //o ile przekazane event to to samo co this

    //whether there is a click on the same item (only the second can give true) Must be added before hiding
    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove("hidden"); //Hide the map you clicked on

    //whether it is 1 click or whether the array is a length of 0
    if (activeCards.length === 0) {
        console.log("1 element");
        activeCards[0] = activeCard; //Assignment to position 1 of the selected map
        return;

    }
    //or it’s 2 click – else because if not the first, then the second
    else {
        console.log("2 element");
        //for a while we take the opportunity to click
        cards.forEach(card => card.removeEventListener("click", clickCard))
        //Setting a second click in the array in Index 1
        activeCards[1] = activeCard;

        //Half a second after disclosure – decide whether right or wrong
        setTimeout(function () {
            //Check if they are the same cards – win
            if (activeCards[0].className === activeCards[1].className) {
                console.log("wygrane")
                activeCards.forEach(card => card.classList.add("off"))
                gameResult++;
                cards = cards.filter(card => !card.classList.contains("off"));
                //Check if the game is finished
                if (gameResult == gameLength) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000
                    alert(`Udało się! Twój wynik to: ${gameTime} sekund`)
                    location.reload();
                }
            }
            //Loser. hide again
            else {
                console.log("przegrana")
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            //Reset
            activeCard = ""; //Active blank card
            activeCards.length = 0; //Length of the array to zero
            cards.forEach(card => card.addEventListener("click", clickCard))//Restoration of eavesdropping

        }, 500)
    }
};