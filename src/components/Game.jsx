import { useState, useEffect } from "react";
import Table from "./Table";
import Scoreboard from "./Scoreboard";
import Title from "./Title";
import "../styles/game.css"

export default function Game() {
  const [deck, setDeck] = useState(null)
  const [tableCards, setTableCards] = useState(null);
  const [guessed, setGuessed] = useState(null)
  const [best, setBest] = useState(0)
  const [reset, setReset] = useState(false)
  const [level, setLevel] = useState(1)

  const shuffle = (original) => { 
    let array = [...original]
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 

  const addGuess = (guess) => {
    let copy = !guessed ? [] : [...guessed]
    copy.push(guess)
    setGuessed(copy)
  }

  const levelUp = () => {
    return guessed && (guessed.length + 1) % 8 === 0
  }

  const gameOver = (guess) => {
    if (guessed && guessed.includes(guess)) return "lost";
    if (guessed && guessed.length === 5 && !guessed.includes(guess)) return "won";
    return null;
  }

  function resetGame() {
    setReset(!reset);
    setGuessed(null);
    setTableCards(null);
    setLevel(1);
    if (guessed.length > best) setBest(guessed.length);
  }

  function endGame(status, guess) {
    if (status == "won") addGuess(guess);
    resetGame()
    alert(status == "won" ? "Congrats! You won!" : "Oops! You already clicked that one. You lose!")
  }

  function handleClick(e) {
    e.preventDefault()
    let guess = e.target.id
    let shuffledCards = shuffle(tableCards)
    let gameStatus = gameOver(guess)
    gameStatus ? endGame(gameStatus, guess) : addGuess(guess)
    levelUp() ? setLevel(level + 1) : setTableCards(shuffledCards)
  }

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let ignore = false;

    async function getNewDeck() {
      const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      const deck = await response.json()
      setDeck(deck.deck_id)
    }

    getNewDeck();

    return () => {
      ignore = true;
      console.log("disconnected")
    };
  }, [reset]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let ignore = false;

    async function drawCards() {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=8`);
      const table = await response.json()
      setTableCards(table.cards)
    }

    if(deck) drawCards();

    return () => {
      ignore = true;
    }
  }, [deck, level]);

  if (tableCards)
  return (
    <>
      <div className="header">
        <Scoreboard current={guessed ? guessed.length : 0} best={best}/>
        <p className="level"><b>Level:</b> {level}</p>
        <Title />
      </div>
      <Table cards={tableCards} onClick={handleClick}/>
    </>
  )
}