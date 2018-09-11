import React from 'react';
import './Tiles.css'

function Tiles(props) {
  let numbers = props.locations;
  return <div className="tiles-grid-container">
    {numbers.map((array, index) => {
      return array.map((element, i) => {
        if (index % 2 === 0) {
          return <div onClick={props.movePiece} className={i % 2 === 0 ? 'white' : 'black'} id={`${index},${i}`} >
            {element !== '' && <button className={`${index},${i}`} onClick={props.selectPiece} value={element}>{element}</button>}
          </div >
        } else {
          return <div onClick={props.movePiece} className={i % 2 === 0 ? 'black' : 'white'} id={`${index},${i}`}>
            {element !== '' && <button className={`${index},${i}`} onClick={props.selectPiece} value={element}>{element}</button>}
          </div >
        }
      })
    })}
  </div>
}

export default Tiles;