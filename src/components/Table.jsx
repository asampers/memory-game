/* eslint-disable react/prop-types */
import ShowCard from "./ShowCard";

export default function Table({cards, onClick}) {
  return (
    <div className="table">
      {cards.map((card) => (
        <ShowCard key={card.code} id={card.code} image={card.image} onClick={onClick}/>
      ))}
    </div>
  )
}