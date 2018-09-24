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
    // console.log(event.target)
    if (event.target.value[0] === this.state.colour[0]) {
      this.setState({
        selectedPiece: event.target.value,
        currentLocation: event.target.className.split(',')
      })
    } else {
      alert(`Please pick a ${this.state.colour} piece`)
    }
  }

  movePiece = (event) => {

    if (event.target.id) {
      let [x, y] = event.target.id.split(',')
      let [x1, y1] = this.state.currentLocation
      console.log(x1, 'x1', y1, 'y1')

      const rules = {
        pawn: {
          W1: (((x1 - x === 1 && y1 - y === 0 && this.checkPieceNotInWay(x, y, x1, y1)) || ((x1 - x === 1 && Math.abs(y1 - y) === 1))) || (x1 === '6' && (x1 - x) === 2 && (y1 - y) === 0 && this.checkPieceNotInWay(x, y, x1, y1))) && this.pawnMoves(x, y, x1, y1, 'W'),
          B1: (((x - x1 === 1 && y - y1 === 0 && this.checkPieceNotInWay(x, y, x1, y1)) || ((x - x1 === 1 && Math.abs(y - y1) === 1))) || (x1 === '1' && (x - x1) === 2 && (y1 - y) === 0 && this.checkPieceNotInWay(x, y, x1, y1))) && this.pawnMoves(x, y, x1, y1, 'B')
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
          W1: ((x1 === '7') && (y1 === '4') && this.castle(x, y, x1, y1, 'W')) || ((Math.abs(y1 - y) === 1 && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'W')) || (Math.abs(x1 - x) === 1 && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'W'))),
          B1: ((x1 === '0') && (y1 === '4') && this.castle(x, y, x1, y1, 'B')) || ((Math.abs(y1 - y) === 1 && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'B')) || (Math.abs(x1 - x) === 1 && this.checkDestinationIsOppositeColour(x, y, x1, y1, 'B')))
        }
      }
      if (this.state.selectedPiece !== '' && rules[this.state.selectedPiece.slice(2).toLowerCase()][`${this.state.selectedPiece[0]}1`]) {
        let newLocation = [...this.state.locations]
        newLocation[x].splice(y, 1, this.state.selectedPiece)
        newLocation[x1].splice(y1, 1, '')
        let newColour = this.state.colour === 'White' ? 'Black' : 'White'
        //only used when castling
        if (this.state.selectedPiece === `${this.state.colour[0]} King` & (y - y1) === 2) {
          newLocation[x].splice(parseInt(y) - 1, 1, this.state.locations[x][parseInt(y) + 1])
          newLocation[x1].splice(parseInt(y) + 1, 1, '')
        }
        if (this.state.selectedPiece === `${this.state.colour[0]} King` & (y - y1) === -2) {
          console.log('here')
          newLocation[x].splice(parseInt(y) + 1, 1, this.state.locations[x][parseInt(y) - 2])
          newLocation[x1].splice(parseInt(y) - 2, 1, '')
        }
        // if (!this.checkWin(rules)) {
        this.setState({
          locations: newLocation,
          selectedPiece: '',
          currentLocation: '',
          colour: newColour
        })
        // } else {
        //   alert('This puts you in check')
        // }
      }
    }
  }

  ////straight checks
  checkPieceNotInWay = (x, y, x1, y1) => {
    x = parseInt(x);
    y = parseInt(y);
    x1 = parseInt(x1);
    y1 = parseInt(y1);

    // console.log(x, y, 'target')
    // console.log(x1, y1, 'origin')
    if (x - x1 === 0) {
      let passable = true;
      for (let i = y < y1 ? y + 1 : y1 + 1; y < y1 ? i < y1 : i < y; i++) {
        // console.log(x, i, 'checked1')
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
        // console.log(i, y, 'checked2')
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
    // console.log(x, y, 'target')

    ///left to right diagonal (decending)
    if (y - y1 === x - x1) {
      /// decending
      if (y > y1) {
        let passable = true;
        let j = y - 1;
        for (let i = x - 1; i >= x1 + 1; i--) {
          // console.log(i, j, 'tested1')
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
          // console.log(i, j, 'tested2')
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
        let j = x1 - 1;
        for (let i = y1 + 1; i <= y - 1; i++) {
          // console.log(j, i, 'tested3')
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
          // console.log(i, j, 'tested4')
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
      // console.log(this.state.locations[x][y][0], 'object colour')
      return (this.state.locations[x][y][0] === 'B' || this.state.locations[x][y][0] === undefined)
    }
    if (colour === 'B') {
      return (this.state.locations[x][y][0] === 'W' || this.state.locations[x][y][0] === undefined)
    }
  }

  pawnMoves = (x, y, x1, y1, colour) => {
    x = parseInt(x);
    y = parseInt(y);
    x1 = parseInt(x1);
    y1 = parseInt(y1);

    if ((Math.abs(x1 - x) === 0 && Math.abs(y1 - y >= 1)) || (Math.abs(y1 - y) === 0 && Math.abs(x1 - x) >= 1)) {
      return (this.state.locations[x][y] === '')
    } else {
      return this.checkDestinationIsOppositeColour(x, y, x1, y1, colour)
    }
  }

  castle = (x, y, x1, y1, colour) => {
    x = parseInt(x);
    y = parseInt(y);
    x1 = parseInt(x1);
    y1 = parseInt(y1);

    let passable = true;
    if (y > y1) {
      for (let i = y1 + 1; i <= y; i++) {
        if (this.state.locations[x1][i] !== '') {
          passable = false;
        }
      }
      if (this.state.locations[x1][y + 1] !== `${colour} Rook`) passable = false
      return passable;
    } else {
      for (let i = y1 - 1; i >= y; i--) {
        console.log(this.state.locations[x1][i], x, i)
        if (this.state.locations[x1][i] !== '') {
          passable = false;
        }
      }
      if (this.state.locations[x1][y - 2] !== `${colour} Rook` && this.state.locations[x1][y - 1] !== '') passable = false
      return passable;
    }

  }

  // checkWin = (rules) => {
  //   const colour = this.state.colour
  //   const king = `${colour[0]} King`;
  //   for (let i = 0; i <= 7; i++) {
  //     if (this.state.locations[i].indexOf(king) > 0) {
  //       const locationOfKing = [i, this.state.locations[i].indexOf(king)]
  //       console.log(locationOfKing, 'location of king')

  //       for (let i = 0; i <= 7; i++) {
  //         for (let j = 0; j <= 7; j++) {
  //           let currentPiece = this.state.locations[i][j]
  //           if (currentPiece !== '' && currentPiece[0] !== `${colour[0]}`) {
  //             console.log(currentPiece)
  //             console.log(rules[currentPiece.slice(2).toLowerCase()][`${currentPiece[0]}1`])
  //           }
  //         }
  //       }
  //       console.log(Object.entries(rules))
  //       // console.log(rules[][])
  //       // return [i, this.state.locations[i].indexOf(king)];
  //     }
  //   }
  // }
}

export default App;
