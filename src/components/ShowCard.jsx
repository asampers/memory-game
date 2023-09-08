/* eslint-disable react/prop-types */
import "../styles/card.css"

export default function ShowCard({image, onClick}) {
  const style = {backgroundImage: `url(${image})`};

  return (
    <button onClick={onClick} style={style} className="card"></button>
  )
}
