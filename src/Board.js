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
import Bucket from './Bucket'
import './index.css';


/**
 * Board class 
 * 
 * This class is responsible for rendering the Sudoku Board
 */
class Board extends React.Component {

  /**
   * Renders the complete 9x9 Sudoku Board
   */
  renderBoard() {
    let bucket = 0;
    let boardBuckets = [];

    for (let row = 0; row < 9; row++) {
      let rows = [];

      for (let column = 0; column < 9; column++) {
        const bucketNumber = bucket;
        const hint = this.props.hints[bucketNumber];
        const value = hint ? hint : this.props.currentValues[bucketNumber];
        const correctValue = this.props.solutionValues[bucketNumber];
        let isCorrectMove = true;

        if (!hint && value !== null) {
          isCorrectMove = correctValue === value;
        }

        rows.push(
          <Bucket
            isCorrectMove={isCorrectMove}
            key={'boardBucket' + bucketNumber}
            hint={hint}
            value={value}
            bucketType={'boardBucket'}
            bucketIndex={bucketNumber}
            onClick={() => this.props.onClickForBucketSelected(bucketNumber)}
          />);
        bucket++;
      }

      boardBuckets.push(<tr key={'row' + row}>{rows}</tr>);
    }

    return <table className='board'><tbody>{boardBuckets}</tbody></table>
  }

  /**
   * Render the nine possible numbers for player choosing
   */
  renderMenuOption() {
    let options = [];
    const optionSelected = this.props.optionSelected;

    for (let value = 1; value <= 9; value++) {
      const isSelected = (value === optionSelected);

      options.push(
        <tr key={'option' + value}>
          <Bucket
            key={'menuBucket' + value}
            value={'' + (value)}
            bucketType={'menuBucket'}
            bucketIndex={value}
            selected={isSelected}
            onClick={() => this.props.onClickForOptionSelected(value)}
          />
        </tr>);
    }

    return (
      <table><tbody>{options}</tbody></table>
    );
  }

  level(levelId) {
    switch (levelId) {
      case 2:
        return "Normal";
      case 3:
        return "Difícil";
      default:
        return "Fácil";
    }
  }


  /**
   * Sudoku Board rendering
   */
  render() {

    return (
      <section>
        <h1 className='title'>Sudoku.</h1>
        <table className='board_no_border'>
          <tbody>
            <tr>
              <td className='optionspace'>{this.renderMenuOption()}</td>
              <td>{this.renderBoard()}</td>
            </tr>
            <tr>
              <td></td>
              <td>
                <div className="controls">
                  <button
                    onClick={() => { this.props.onClickForErase() }}>
                    {'[x] borrar'}
                  </button>
                  <button
                    onClick={() => { this.props.onClickNextBoard() }}>
                    {'>> siguiente'}
                  </button>
                  <div class="level">
                    Nivel: {this.level(this.props.level)} Tablero: {this.props.board}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

      </section>
    );
  }
}

export default Board;
