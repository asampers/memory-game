import { useState, useEffect } from "react";
import ShowCard from "./ShowCard";
import Scoreboard from "./Scoreboard";
import "../styles/deck.css"

export default function Deck() {
  const [deck, setDeck] = useState(null)
  const [tableCards, setTableCards] = useState(null);
  const [guessed, setGuessed] = useState(null)
  const [best, setBest] = useState(0)
  const [reset, setReset] = useState(false)

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

  function endGame() {
    setReset(!reset)
    setGuessed(null)
    setTableCards(null)
    if (guessed.length > best) setBest(guessed.length)
    alert("Oops! You already clicked that one. You lose!")
  }

  function handleClick(e) {
    let guess = e.target.id
    let shuffledCards = shuffle(tableCards)
    guessed && guessed.includes(guess) ? endGame() : addGuess(guess)
    setTableCards(shuffledCards)
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
  }, [deck]);
  
  console.log(deck)
  //console.log(tableCards)
  console.log(guessed)

  if (tableCards)
  return (
    <>
      <div className="header">
        <Scoreboard current={guessed ? guessed.length : 0} best={best}/>
        <h1>Counting Cards</h1>
      </div>
      <div className="table">
        {tableCards.map((card) => (
          <ShowCard key={card.code} id={card.code} image={card.image} onClick={handleClick}/>
        ))}
      </div>
    </>
  )
}