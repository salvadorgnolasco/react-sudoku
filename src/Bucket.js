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
import './index.css';

class Bucket extends React.Component {

  /**
   * It identify the bucket that will be render
   * and return its className
   * @param {*} props 
   */
  getClassNameForBucket() {

    let className = this.decorateOptionSelected();

    return className ? className : 
      this.decorateHint(
        this.decorateErrorValue(
          this.decorateBoard()
        )
      );
  }

  /**
   * Given a wrong value
   * When the board is rendered
   * Then a alert should be shown 
   * @param {*} className 
   */
  decorateErrorValue(className) {

    if(this.props.bucketType === 'boardBucket' && !this.props.isCorrectMove){
      return className + ' error';
    }

    return className;
  }

  /**
   * Given a hint
   * When the bucket is rendered
   * Then a different background should be shown
   * @param {*} className 
   */
  decorateHint(className) { 

    if(this.props.hint) {
      return className + ' hint';
    }

    return className;
  }

  /**
   * Given a square on the Sudoku Board
   * When the bucket is rendered
   * Then a Sudoku Grid should be shown 
   * @param {*} className 
   */
  decorateBoard() {
    const bucketType = this.props.bucketType;
    const bucketIndex = this.props.bucketIndex;
    const row = Math.floor(bucketIndex / 9);
    const column = (bucketIndex - (row * 9));
    let className = null;

    if (bucketType === 'boardBucket') {
      className = (row === 2 || row === 5) ?  'rowsplit' : 'square';
      className = (column === 2 || column === 5) ?
        ((className === 'rowsplit') ? 'cornersplit' : 'columnsplit') : className;
    }

    return className;
  }

  /**
   * Given a selected value
   * When the player select an option
   * Then a different background should be shown in order to 
   * identify the value that will be set on the Sudoku Board 
   */
  decorateOptionSelected() {    

    const bucketType = this.props.bucketType;
    const isSelected = this.props.selected;
    let className = null;

    if (bucketType === 'menuBucket') {
        className = isSelected ? 'optionselected' : 'optionbucket';
    }

    return className;
  }

  /**
   * It renders a square with a value within the 
   * range [1-9] and applies a class style
   */
  render() {
    const value = this.props.value;
    const className = this.getClassNameForBucket();    

    return (
        <td>
            <button
                className={className} 
                onClick={() => this.props.onClick()}
                >
                {value}
            </button>
        </td>
    );
  }
}

export default Bucket;
