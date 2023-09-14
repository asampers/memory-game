import "../styles/card.css"

export default function ShowCard({image, onClick, id}) {
  const style = {backgroundImage: `url(${image})`};

  return (
    <button id={id} onClick={onClick} style={style} className="card"></button>
  )
}
