import PropTypes from 'prop-types';
import "../styles/board.css"

export default function Scoreboard({current, best}) {
  return (
    <div className="board">
      <span><b>Score:</b> {current}</span>
      <span><b>Best:</b> {best}</span>
    </div>
  )
}

Scoreboard.propTypes = {
  current: PropTypes.number,
  best: PropTypes.number,
}