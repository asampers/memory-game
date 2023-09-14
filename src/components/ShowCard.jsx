import PropTypes from 'prop-types';
import "../styles/card.css"

export default function ShowCard({image, onClick, id}) {
  const style = {backgroundImage: `url(${image})`};

  return (
    <button id={id} onClick={onClick} style={style} className="card"></button>
  )
}

ShowCard.propTypes = {
  image: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.number,
}