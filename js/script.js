document.addEventListener("DOMContentLoaded", function () {
    let player = {
        name: "",
        chips: 0,
        bet: 0,
        cards: [],
        sum: 0,
        hasBlackJack: false,
        isAlive: false
    };

    let dealer = {
        cards: [],
        sum: 0,
        hasBlackJack: false,
        isAlive: true
    };

    let deck = [];
    let gameInProgress = false;
    let message = "";
    let messageEl = document.getElementById("message-el");
    let cardsEl = document.getElementById("cards-el");
    let dealerEl = document.getElementById("dealer-el");
    let playerEl = document.getElementById("player-el");
    let gameArea = document.getElementById("game-area");
    let inputContainer = document.getElementById("input-container");

    if (!messageEl || !cardsEl || !dealerEl || !playerEl || !gameArea || !inputContainer) {
        console.error("One or more elements could not be found in the DOM.");
        return;
    }

    function deckConstruction() {
        let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        let suits = ["C", "D", "H", "S"];
        deck = [];

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < values.length; j++) {
                deck.push(values[j] + "-" + suits[i]);
            }
        }
    }

    function cardsMix() {
        for (let i = 0; i < deck.length; i++) {
            let j = Math.floor(Math.random() * deck.length);
            let temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }
    }

    function drawCard() {
        return deck.length > 0 ? deck.pop() : null;
    }

    function startGame() {
        if (gameInProgress) {
            alert("Game is already in progress. Please complete the current game before starting a new one.");
            return;
        }

        let playerName = document.getElementById("player-name-input").value;
        let playerBet = document.getElementById("player-bet-input").value;

        if (player.name === "" && player.chips === 0) {
            let playerChips = document.getElementById("player-chips-input").value;
            if (playerName.trim() === "" || playerChips.trim() === "" || isNaN(playerChips) || playerChips <= 0) {
                alert("Please enter valid values for name and chips amount.");
                return;
            }
            player.chips = parseInt(playerChips);
        }

        if (playerName.trim() === "" || playerBet.trim() === "" || isNaN(playerBet) || playerBet <= 0) {
            alert("Please enter a valid bet amount.");
            return;
        }

        player.name = playerName;
        player.bet = parseInt(playerBet);

        if (player.bet > player.chips) {
            alert("Bet amount cannot exceed your total chips.");
            return;
        }

        playerEl.textContent = player.name + ": $" + player.chips;
        inputContainer.style.display = "none";
        gameArea.style.display = "block";
        cardsEl.style.display = "flex";
        dealerEl.style.display = "flex"; 

        player.isAlive = true;
        player.hasBlackJack = false;
        dealer.isAlive = true;
        dealer.hasBlackJack = false;
        gameInProgress = true;
        deckConstruction();
        cardsMix();

        player.cards = [drawCard(), drawCard()];
        dealer.cards = [drawCard(), drawCard()];

        player.sum = getCardValue(player.cards[0]) + getCardValue(player.cards[1]);
        dealer.sum = getCardValue(dealer.cards[0]) + getCardValue(dealer.cards[1]);

        renderGame();
    }

    function getCardValue(card) {
        if (!card) return 0; 
        let value = card.split("-")[0];
        if (value === "A") return 11;
        else if (["J", "Q", "K"].includes(value)) return 10;
        else return parseInt(value);
    }

    function renderGame() {
        renderPlayerHand();
        renderDealerHand();

        if (player.sum <= 20) {
            message = "Do you want to draw a new card?";
        } else if (player.sum === 21) {
            message = "You've got Blackjack!";
            player.hasBlackJack = true;
            updateChips(true);
            dealerPlay(); 
        } else {
            message = "You're out of the game!";
            player.isAlive = false;
            updateChips(false);
            dealerPlay(); 
        }
        messageEl.textContent = message;
        playerEl.textContent = player.name + ": $" + player.chips;
    }

    function renderPlayerHand() {
        cardsEl.innerHTML = "Player's Cards: ";
        for (let i = 0; i < player.cards.length; i++) {
            let card = player.cards[i];
            let cardImage = document.createElement("img");
            cardImage.src = "images/" + card + ".png";
            cardImage.alt = card;
            cardsEl.appendChild(cardImage);
        }
        let playerSumEl = document.createElement("p");
        playerSumEl.textContent = "Player Sum: " + player.sum;
        cardsEl.appendChild(playerSumEl);
    }

    function renderDealerHand() {
        dealerEl.innerHTML = "Dealer Cards: ";
        for (let i = 0; i < dealer.cards.length; i++) {
            let card = dealer.cards[i];
            let cardImage = document.createElement("img");
            cardImage.src = "images/" + card + ".png";
            cardImage.alt = card;
            dealerEl.appendChild(cardImage);
        }
        let dealerSumEl = document.createElement("p");
        dealerSumEl.textContent = "Dealer Sum: " + dealer.sum;
        dealerEl.appendChild(dealerSumEl);
    }

    function newCard() {
        if (player.isAlive && !player.hasBlackJack) {
            let card = drawCard();
            if (card) {
                player.cards.push(card);
                player.sum += getCardValue(card);
                renderGame();
            }
        }

        if (!player.isAlive || player.hasBlackJack) {
            dealerPlay(); 
        }
    }

    function updateChips(isWin) {
        if (isWin) {
            player.chips += player.bet;
        } else {
            player.chips -= player.bet;
        }

        if (player.chips < 0) player.chips = 0;
    }

    function dealerPlay() {
        while (dealer.sum <= 21 && dealer.isAlive) {
            let card = drawCard();
            if (!card) break;
            dealer.cards.push(card);
            dealer.sum += getCardValue(card);
            if (dealer.sum > 21) {
                dealer.isAlive = false;
            }
            renderDealerHand();
        }

        determineWinner();
        endGame();
    }

    function determineWinner() {
        if (player.sum > 21 && dealer.sum > 21) {
            message = "It's a tie! Both busted.";
        } else if (player.sum > 21) {
            message = "Dealer wins! Player busted.";
            updateChips(false);
        } else if (dealer.sum > 21) {
            message = "You win! Dealer busted.";
            updateChips(true);
        } else if (player.sum > dealer.sum && player.sum <= 21) {
            message = "You win!";
            updateChips(true);
        } else if (dealer.sum > player.sum && dealer.sum <= 21) {
            message = "Dealer wins!";
            updateChips(false);
        } 
    
        messageEl.textContent = message;
    }
    function endGame() {
        gameInProgress = false;
    }

    

    function resetGame() {
        player.isAlive = true;
        player.hasBlackJack = false;
        dealer.isAlive = true;
        dealer.hasBlackJack = false;
        gameInProgress = false; 
        player.cards = [];
        dealer.cards = [];
        player.sum = 0;
        dealer.sum = 0;
        message = "";
        deck = [];
        deckConstruction();
        cardsMix();
        renderGame();
    }

    window.startGame = startGame;
    window.newCard = newCard;
    window.resetGame = resetGame;
});
