import React, { Component } from 'react';
import './App.css';
import Tiles from './components/Tiles';
import Piece from './components/Piece';

class App extends Component {
  state = {
    locations: [
      ['B Rook', 'B Knight', 'B Bishop', 'B Queen', 'B King', 'B Bishop', 'B Knight', 'B Rook'],
      ['B Pawn', 'B Pawn', 'B Pawn', 'B Pawn', 'B Pawn', 'B Pawn', 'B Pawn', 'B Pawn'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['W Pawn', 'W Pawn', 'W Pawn', 'W Pawn', 'W Pawn', 'W Pawn', 'W Pawn', 'W Pawn'],
      ['W Rook', 'W Knight', 'W Bishop', 'W Queen', 'W King', 'W Bishop', 'W Knight', 'W Rook']],
    selectedPiece: '',
    currentLocation: ''
  }
  render() {
    return (
      <div className="App">
        <h1>Chess Board</h1>
        <Tiles locations={this.state.locations} selectPiece={this.selectPiece} movePiece={this.movePiece} />
      </div>
    );
  }

  selectPiece = (event) => {
    this.setState({
      selectedPiece: event.target.value,
      currentLocation: event.target.className.split(',')
    })
  }

  movePiece = (event) => {
    if (event.target.id) {
      let [x, y] = event.target.id.split(',')
      let [x1, y1] = this.state.currentLocation;

      const rules = {
        pawn: {
          W1: x1 - x === 1 && y1 - y === 0 || x1 - x === 1 && Math.abs(y1 - y) === 1,
          B1: x - x1 === 1 && y - y1 === 0 || x - x1 === 1 && Math.abs(y - y1) === 1,
        },
        rook: {
          W1: y1 - y === 0 || x1 - x === 0,
          B1: y1 - y === 0 || x1 - x === 0
        },
        bishop: {
          W1: Math.abs(y1 - y) === Math.abs(x1 - x),
          B1: Math.abs(y1 - y) === Math.abs(x1 - x)
        },
        knight: {
          W1: Math.abs(y1 - y) === 2 && Math.abs(x1 - x) === 1 || Math.abs(y1 - y) === 1 && Math.abs(x1 - x) === 2,
          B1: Math.abs(y1 - y) === 2 && Math.abs(x1 - x) === 1 || Math.abs(y1 - y) === 1 && Math.abs(x1 - x) === 2
        },
        queen: {
          W1: y1 - y === 0 || x1 - x === 0 || Math.abs(y1 - y) === Math.abs(x1 - x),
          B1: y1 - y === 0 || x1 - x === 0 || Math.abs(y1 - y) === Math.abs(x1 - x)
        },
        king: {
          W1: Math.abs(y1 - y) === 1 || Math.abs(x1 - x) === 1,
          B1: Math.abs(y1 - y) === 1 || Math.abs(x1 - x) === 1
        }
      }
      if (rules[this.state.selectedPiece.slice(2).toLowerCase()][`${this.state.selectedPiece[0]}1`]) {

        let newLocation = [...this.state.locations]
        newLocation[x].splice(y, 1, this.state.selectedPiece)
        newLocation[x1].splice(y1, 1, '')
        this.setState({
          locations: newLocation,
          selectedPiece: ''
        })
      }
    }
  }


}

export default App;