/**
* Copyright (C) 2020 
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* Nombre de archivo: index.js
* Autor: ElChava
* Fecha de creación: 25/06/2020
*/

import React from 'react';
import Board from './Board';

/**
 * Game class
 * 
 * This Class is responsible for behaviour management
 */
class Game extends React.Component {

  /**
   * Given a first request
   * When the Game component is rendered
   * Then the hints values will be requested
   */
  requestBoard(board) {
    const uri = 'http://localhost:8080/sudoku/game/board/' + board
    fetch(uri)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          history: [{
            moves: data.hints
          }],
          hints: data.hints,
          solutionValues: data.solution,
          currentValues: data.hints,
        })
      })
      .catch(console.log)
  }

  /**
   * It initializes the state of the board
   *  
   * @param {*} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      optionSelected: null,
      bucketSelected: null,
      solutionValues: null,
      currentValues: null,
    }

    this.requestBoard('1');
  }

  /**
   * Given a set of numbers within the range [1-9]
   * When a player select an option
   * Then the selected value must be the one to be set on te Board
   * So the selected value will be saved in the current state
   * 
   * @param {*} optionSelected 
   */
  handleClickForOptionSelected(optionSelected) {
    this.setState({
      optionSelected: optionSelected,
    });
  }

  /**
   * Given a selected value
   * When the player select a spot on the board
   * Then the value should be shown at the selected position
   * 
   * @param {*} bucketSelected 
   */
  handleClickForBucketSelected(bucketSelected) {

    if (!this.state.optionSelected) {
      return;
    }

    const currentValues = this.state.currentValues.slice();
    const optionSelected = this.state.optionSelected;
    currentValues[bucketSelected] = optionSelected;
    const history = this.state.history.slice();
    const newHistory = history.concat([{ moves: currentValues, }]);

    this.setState({
      history: newHistory,
      optionSelected: null,
      bucketSelected: bucketSelected,
      currentValues: currentValues,
    });
  }

  /**
   * Given a move
   * When the player click for going back and eliminate the move
   * Then a previous state should be shown
   */
  handleOnClickForErase() {

    const history = this.state.history.slice();

    if (history.length <= 1) {
      return;
    }

    const currentValues = history[history.length - 2].moves.slice();
    const newHistory = history.slice(0, history.length - 1);

    this.setState({
      history: newHistory,
      currentValues: currentValues,
      bucketSelected: null,
    });
  }

  /**
   * Check whether the board has been solved or not
   */
  isSolved() {

    if (!this.state.history) {
      return;
    }

    const currentValues = this.state.currentValues;
    const solutionValues = this.state.solutionValues;

    let isSolved = solutionValues.every((value, index) => value === currentValues[index]);
    console.log("isSolved: " + isSolved);

    return isSolved;
  }

  /**
   * This renders a Sudoku Boards and 
   * uses properties to push values and 
   * event delegates
   */
  render() {

    if (!this.state.history) {
      return <div></div>;
    }

    const status = this.isSolved() ? 'Good job !' : 'Juego en progreso...';
    const { currentValues, hints, optionSelected, solutionValues } = this.state;

    return (
      <section>
        <Board key='board'
          currentValues={currentValues}
          hints={hints}
          optionSelected={optionSelected}
          solutionValues={solutionValues}
          onClickForOptionSelected={(optionSelected) => this.handleClickForOptionSelected(optionSelected)}
          onClickForBucketSelected={(bucketSelected) => this.handleClickForBucketSelected(bucketSelected)}
          onClickForErase={() => this.handleOnClickForErase()}
        />
        <h3 className='title'>{status}</h3>
      </section>
    );
  }
}

export default Game; 
