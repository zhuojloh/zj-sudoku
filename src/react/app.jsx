var React = require('react');
var $ = require('jquery');
var SudokuBoard = require('./components/SudokuBoard.jsx');

$(document).ready(function() {
    //initialize SudokuBoard
    React.render(<SudokuBoard />, document.getElementById("container"));
});

