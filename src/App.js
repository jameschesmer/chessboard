import React, { Component } from 'react';
import './App.css';
import Tiles from './components/Tiles';
//import Piece from './components/Piece';

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
    currentLocation: '',
    colour: 'White'
  }
  render() {
    return (
      <div className="App">
        <h1>Chess Board</h1>
        <p>{this.state.colour} to play</p>
        <Tiles locations={this.state.locations} selectPiece={this.selectPiece} movePiece={this.movePiece} />
      </div>
    );
  }

  selectPiece = (event) => {
    console.log(event.target)
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
          W1: (x1 - x === 1 && y1 - y === 0 && this.checkPieceNotInWay(x, y, x1, y1)) || (x1 - x === 1 && Math.abs(y1 - y) === 1),
          B1: (x - x1 === 1 && y - y1 === 0 && this.checkPieceNotInWay(x, y, x1, y1)) || (x - x1 === 1 && Math.abs(y - y1) === 1),
        },
        rook: {
          W1: (y1 - y === 0 || x1 - x === 0) && this.checkPieceNotInWay(x, y, x1, y1) && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'W'),
          B1: (y1 - y === 0 || x1 - x === 0) && this.checkPieceNotInWay(x, y, x1, y1) && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'B')
        },
        bishop: {
          W1: Math.abs(y1 - y) === Math.abs(x1 - x) && this.checkPieceNotInWayDiagonal(x, y, x1, y1) && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'W'),
          B1: Math.abs(y1 - y) === Math.abs(x1 - x) && this.checkPieceNotInWayDiagonal(x, y, x1, y1) && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'B')
        },
        knight: {
          W1: ((Math.abs(y1 - y) === 2 && Math.abs(x1 - x) === 1) && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'W')) || ((Math.abs(y1 - y) === 1 && Math.abs(x1 - x) === 2) && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'W')),
          B1: ((Math.abs(y1 - y) === 2 && Math.abs(x1 - x) === 1) && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'B')) || ((Math.abs(y1 - y) === 1 && Math.abs(x1 - x) === 2) && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'B'))
        },
        queen: {
          W1: ((y1 - y === 0 || x1 - x === 0) && this.checkPieceNotInWay(x, y, x1, y1) && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'W')) || (Math.abs(y1 - y) === Math.abs(x1 - x) && this.checkPieceNotInWayDiagonal(x, y, x1, y1) && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'W')),
          B1: ((y1 - y === 0 || x1 - x === 0) && this.checkPieceNotInWay(x, y, x1, y1) && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'B')) || (Math.abs(y1 - y) === Math.abs(x1 - x) && this.checkPieceNotInWayDiagonal(x, y, x1, y1) && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'B'))
        },
        king: {
          W1: (Math.abs(y1 - y) === 1 && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'W')) || (Math.abs(x1 - x) === 1 && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'W')),
          B1: (Math.abs(y1 - y) === 1 && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'B')) || (Math.abs(x1 - x) === 1 && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'B'))
        }
      }
      if (rules[this.state.selectedPiece.slice(2).toLowerCase()][`${this.state.selectedPiece[0]}1`]) {
        let newLocation = [...this.state.locations]
        newLocation[x].splice(y, 1, this.state.selectedPiece)
        newLocation[x1].splice(y1, 1, '')
        let newColour = this.state.colour === 'White' ? 'Black' : 'White'
        this.setState({
          locations: newLocation,
          selectedPiece: '',
          currentLocation: '',
          colour: newColour
        })
      }
    }
  }

  ////straight checks
  checkPieceNotInWay = (x, y, x1, y1) => {
    x = parseInt(x);
    y = parseInt(y);
    x1 = parseInt(x1);
    y1 = parseInt(y1);

    console.log(x, y, 'target')
    if (x - x1 === 0) {
      let passable = true;
      for (let i = y < y1 ? y + 1 : y1 + 1; y < y1 ? i < y1 : i < y; i++) {
        console.log(x, i, 'checked1')
        if (this.state.locations[x][i] !== '') {
          passable = false;
          break;
        }
        else passable = true;
      }
      return passable;
    } else if (y - y1 === 0) {
      let passable = true;
      for (let i = x < x1 ? x + 1 : x1 + 1; x < x1 ? i < x1 : i < x; i++) {
        console.log(i, y, 'checked2')
        if (this.state.locations[i][y] !== '') {
          passable = false;
          break;
        }
        else passable = true;
      }
      return passable;
    }
  }

  ////diagonal checks
  checkPieceNotInWayDiagonal = (x, y, x1, y1) => {
    x = parseInt(x);
    y = parseInt(y)
    x1 = parseInt(x1)
    y1 = parseInt(y1)
    console.log(x, y, 'target')

    ///left to right diagonal (decending)
    if (y - y1 === x - x1) {
      /// decending
      if (y > y1) {
        let passable = true;
        let j = y - 1;
        for (let i = x - 1; i >= x1 + 1; i--) {
          console.log(i, j, 'tested')
          if (this.state.locations[i][j] !== '') {
            passable = false;
            break;
          }
          else {
            passable = true;
            j--
          }
        }
        return passable;
      }
      /// accending
      else if (y1 > y) {
        let passable = true;
        let j = y + 1;
        for (let i = x + 1; i < x1; i++) {
          console.log(i, j, 'tested')
          if (this.state.locations[i][j] !== '') {
            passable = false;
            break;
          }
          else {
            passable = true;
            j++
          }
        }
        return passable;
      }
    }
    ///right to left diagonal (decending)
    else if (Math.abs(y - y1) === Math.abs(x - x1)) {
      /// accending
      if (y > y1) {
        let passable = true;
        let j = x1 - 2;
        for (let i = y1 + 2; i <= y; i++) {
          console.log(i, j, 'tested')
          if (this.state.locations[j][i] !== '') {
            passable = false;
            break;
          }
          else {
            passable = true;
            j--
          }
        }
        return passable;
      }
      /// decending
      else if (y1 > y) {
        let passable = true;
        let j = y1 - 1;
        for (let i = x1 + 1; i <= x - 1; i++) {
          console.log(i, j, 'tested')
          if (this.state.locations[i][j] !== '') {
            passable = false;
            break;
          }
          else {
            passable = true;
            j--
          }
        }
        return passable;
      }
    }
  }

  ///taking pieces
  checkDestinationIsOppositeColour = (x, y, x1, y1, colour) => {
    x = parseInt(x);
    y = parseInt(y)
    x1 = parseInt(x1)
    y1 = parseInt(y1)

    if (colour === 'W') {
      console.log(this.state.locations[x][y][0])
      return (this.state.locations[x][y][0] === 'B' || this.state.locations[x][y][0] === undefined)
    }
    if (colour === 'B') {
      return (this.state.locations[x][y][0] === 'W' || this.state.locations[x][y][0] === undefined)
    }
  }
}

export default App;
