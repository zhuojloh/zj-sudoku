var React = require('react');
var Sudoku = require("../../lib/sudoku.js");
var SudokuCell = require("./SudokuCell.jsx");

var SudokuBoard = React.createClass({
    _sudoku: new Sudoku(),

    getInitialState: function() {
        return {
            cells: []
        };
    },

    handleCellTextChange: function(idx, item)
    {
        console.log(item);
    },
    handleNewGameButton: function() {
        this._sudoku.newGame();
        this.setState({cells:cells});
    },

    componentDidMount : function()
    {
        var cells = localStorage.getItem('sudokuCells');
        console.log(cells);
        if(!cells) {
            this._sudoku.newGame();
            cells = this._sudoku.matrix;
            localStorage.setItem("sudokuCells", cells);
        }
        this.setState({cells:cells});
    },

   render: function(){
       var rows = [];
       if(this.state.cells.length > 0) {
           for (var i = 0; i < 9; i++) {
               var sudokuCells = [];
               for (var j = 0; j < 9; j++) {
                   var cellIdx = i * 9 + j;
                   var given = this.state.cells[cellIdx] > 0;
                   var props = {
                       key: "cell" + cellIdx,
                       idx: cellIdx,
                       value: given ? this.state.cells[cellIdx] : null,
                       given: given,
                       cellTextChange: this.handleCellTextChange
                   }
                   sudokuCells.push(<SudokuCell {...props} />);
               }

               var rowKey = "row" + i;
               rows.push(
                   <tr key={rowKey}>
                       {sudokuCells}
                   </tr>
               );
           }
       }

       return(
           <table className='sudokuBoard'>
               {rows}
           </table>
       );
   }
});

module.exports = SudokuBoard;