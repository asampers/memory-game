import { useState, useEffect } from "react";
import ShowCard from "./ShowCard";
import "../styles/deck.css"

export default function Deck() {
  const [deck, setDeck] = useState(null)
  const [tableCards, setTableCards] = useState(null);
  
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
  }, []);

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
  console.log(tableCards)

  if (tableCards)
  return (
    <div className="table">
      {tableCards.map((card) => (
        <ShowCard key={card.code} image={card.image} />
      ))}
    </div>
  )
}