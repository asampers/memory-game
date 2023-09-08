/* eslint-disable react/prop-types */
import "../styles/card.css"

export default function ShowCard({image}) {
  const style = {backgroundImage: `url(${image})`};

  return (
    <div style={style} className="card"></div>
  )
}
