# Blackjack Game

## Overview
This is a simple Blackjack game implemented using HTML, CSS, and JavaScript. It allows the player to play against a dealer with basic Blackjack rules. The game features a fully functional deck, betting system, and displays game results.

## Game Rules
- The player and dealer are dealt two cards each at the start of the game.
- The player can choose to draw additional cards or hold with their current hand.
- The goal is to get as close to 21 without going over. If a player's sum exceeds 21, they bust and lose the game.
- Number cards are worth their face value. Face cards (Jack, Queen, King) are worth 10, and an Ace can be worth 11 or 1 depending on the player's hand.
- If both the player and the dealer have the same score and it's less than 21, the game results in a tie.
- If the dealer busts, the player wins.

## Features
- **Player Management**: Enter your name and starting chips amount before beginning the game.
- **Betting System**: Place a bet before each game round.
- **Gameplay**: Draw new cards or hold to compare your hand against the dealer.
- **Win/Loss System**: The game determines if the player wins, loses, or ties based on the hand values.

## Getting Started

### How to Run
1. Open the `index.html` file in your preferred web browser.
2. Enter your name, the amount of chips, and the bet amount in the input fields provided.
3. Click `Submit` to start the game.

### Game Controls
- `START GAME`: Starts a new game round with the current bet amount.
- `NEW CARD`: Draws a new card for the player.
- `RESET`: Resets the game to its initial state, allowing for a new game session.

## Code Structure

### HTML
- `index.html`: Contains the structure and layout of the game, including player input fields and buttons.

### CSS
- `style.css`: Styles for the game elements such as buttons, card display, and message prompts.

### JavaScript
- `script.js`: Implements the game logic, including card drawing, scoring, and determining the game outcome.

## How the Game Works
1. The player starts by entering their name, chips amount, and placing a bet.
2. The player is then dealt two cards, and the dealer is also dealt two cards.
3. The player can choose to draw new cards or hold with their current hand.
4. The dealer will automatically play once the player ends their turn.
5. The winner is determined based on the total value of cards in each hand:
   - If the player hand exceeds 21, they lose.
   - If the dealer hand exceeds 21, the player wins.
   - If both the player and dealer have hands under 21, the higher hand wins.
