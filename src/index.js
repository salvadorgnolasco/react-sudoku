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
import ReactDOM from 'react-dom';
import Game from './Game';

import './index.css';




ReactDOM.render(<Game key='game' /> , document.getElementById('root'));

