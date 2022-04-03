const cardColors = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow", "gray", "gray", "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"];

/* PART 1 */
//pobranie wszystkich div-ów
let cards = document.querySelectorAll("div"); //NodeList; metoda getElementsByTagName tworzy HTMLCollection
cards = [...cards]; //Tworzymy tablicę z listy (tu nie musimy, ale gdybyśmy użyli getElementsByClassName, to byśmy musieli bo tam nie ma metody forEach)

//Można to samo co wyżej w jednym zapisie
//let cards = [...document.querySelectorAll("div")]

const startTime = new Date().getTime(); //Pobieramy aktualną datę w milisekundach

let activeCard = ""; //która karta została aktualnie kliknięta
const activeCards = []; //tablica dla dwóch kart

//Potrzebne do zakończenia - ile par w sumie
const gameLength = cards.length / 2; //9
//Informacja o wyniku - ile par udało się odgadnąć
let gameResult = 0;
/* Koniec PART 1 */

/*PART 3 - PO KLIKNIĘCIU W KARTĘ - MINI GRA */
const clickCard = function () {

    activeCard = this; //w co zostało kliknięte
    //console.log(event.target) //o ile przekazane event to to samo co this

    //czy to kliknięcie w ten sam element (tylko drugi może dać true) Musi być przed ukryciem dodane
    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove("hidden"); //ukrycie karty, która została kliknięta

    //czy to 1 kliknięcie, czy tablica ma długość 0
    if (activeCards.length === 0) {
        console.log("1 element");
        activeCards[0] = activeCard; //przypisanie do pozycji numer 1 wybranej karty
        return;

    }
    //czy to 2 kliknięcie - else bo jeśli nie pierwsze, to drugie
    else {
        console.log("2 element");
        //na chwilę zdejmujemy możliwość kliknięcie
        cards.forEach(card => card.removeEventListener("click", clickCard))
        //ustawienie drugiego kliknięcia w tablicy w indeksie 1
        activeCards[1] = activeCard;

        //Pół sekundy od odsłoniecia - decyzja czy dobrze czy źle
        setTimeout(function () {
            //sprawdzenie czy to te same karty - wygrana
            if (activeCards[0].className === activeCards[1].className) {
                console.log("wygrane")
                activeCards.forEach(card => card.classList.add("off"))
                gameResult++;
                cards = cards.filter(card => !card.classList.contains("off"));
                //Sprawdzenie czy nastąpił koniec gry
                if (gameResult == gameLength) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000
                    alert(`Udało się! Twój wynik to: ${gameTime} sekund`)
                    location.reload();
                }
            }
            //przegrana. ponowne ukrycie
            else {
                console.log("przegrana")
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            //Reset do nowej gry
            activeCard = ""; //aktywna karta pusta
            activeCards.length = 0; //długość tablicy na zero
            cards.forEach(card => card.addEventListener("click", clickCard))//przywrócenie nasłuchiwania

        }, 500)
    }
};

//PART 2 - LOSOWANIE, POKAZANIE I UKRYCIE, NASŁUCHIWANIE NA KLIKA
//Funkcja po starcie zainicjowana
const init = function () {
    //losowanie klasy do każdego diva
    cards.forEach(card => {
        //pozycja z tablicy przechowującej kolory
        const position = Math.floor(Math.random() * cardColors.length); //1
        //dodanie klasy do danego div-a
        card.classList.add(cardColors[position]);
        //usunięcie wylosowanego elementu, krótsza tablica przy kolejnym losowaniu
        cardColors.splice(position, 1);
    })
    //Po 2 sekundach dodanie klasy hidden - ukrycie i dodanie nasłuchiwania na klik
    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener("click", clickCard)
        })
    }, 2000)
};

init()