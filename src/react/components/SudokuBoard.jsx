var React = require('react/addons');
var Sudoku = require("../../lib/sudoku.js");
var SudokuCell = require("./SudokuCell.jsx");
var Modal = require("./Modal.jsx");
var jQuery = require("jquery");
var _ = require("underscore");

var SudokuBoard = React.createClass({
    _sudoku: new Sudoku(),

    getInitialState: function() {
        return {
            cells: [],
            solved: [],
            original: []
        };
    },

    solveGame: function(){
        this.setState({cells:this.state.original.slice()}, function() {
            for (var i = 0; i < this.state.solved.length; i++) {
                var cell = jQuery("#cell" + i);
                if (!cell.hasClass("given")) {
                    React.addons.TestUtils.Simulate.keyDown(cell.find("input")[0], {which: this.state.solved[i] + 48});
                }
            }
        });
    },

    resetGame: function(){
        var board = jQuery(React.findDOMNode(this.refs.board));
        board.removeClass("solved");
        this.setState({cells:this.state.original.slice()}, function(){
            this.saveStateToStorage();
        });
    },

    handleCellTextChange: function(idx, item)
    {
        var cells = this.state.cells;
        cells[idx] = parseInt(item.value);
        if(item.value==this.state.solved[idx])
        {
            jQuery("#cell"+idx).removeClass("incorrect").addClass("correct");
        }
        else
        {
            jQuery("#cell"+idx).removeClass("correct").addClass("incorrect");
        }

        this.setState({cells: cells}, function(){
            this.saveCellToStorage();
        });

        if(_.isEqual(this.state.cells,this.state.solved))
        {
            var board = jQuery(React.findDOMNode(this.refs.board));
            board.addClass("solved");
            React.render(
                <Modal title="Hooray" closeClick={this.closeModal}>
                    <div>
                        You did it!!
                    </div>
                    <div>
                        <div className="btn" onClick={this.handleNewGame}>New Game</div>
                    </div>
                </Modal>
            , document.getElementById("modalArea"));
        }
    },

    closeModal: function()
    {
        React.unmountComponentAtNode(document.getElementById("modalArea"));
    },

    handleNewGame: function() {
        this._sudoku.newGame();

        var savedState = {};
        var savedCells = this._sudoku.matrix.slice();
        savedState.solved = this._sudoku.save.slice();
        savedState.original = this._sudoku.matrix.slice();
        this.setState({cells:savedCells, solved:savedState.solved, original:savedState.original}, function(){
            this.saveStateToStorage();
        });
        var board = jQuery(React.findDOMNode(this.refs.board));
        board.removeClass("solved");
        this.closeModal();
    },

    componentDidMount : function()
    {
        //check local storage for state
        var savedState = localStorage.getItem('sudokuState');
        var savedCells = localStorage.getItem('sudokuCells');
        if(!savedState || !savedCells) {
            this.handleNewGame();
        }
        else{
            savedState = JSON.parse(savedState);
            savedCells = JSON.parse(savedCells);
            this.setState({cells:savedCells, solved:savedState.solved, original:savedState.original}, function(){
                this.saveStateToStorage();
            });

        }
    },

    saveCellToStorage: function()
    {
        localStorage.setItem("sudokuCells", JSON.stringify(this.state.cells));
    },

    saveStateToStorage: function()
    {
        var savedState = {};
        savedState.solved = this.state.solved;
        savedState.original = this.state.original;
        localStorage.setItem('sudokuState', JSON.stringify(savedState));
        this.saveCellToStorage();
    },

   render: function(){
       var rows = [];
       if(this.state.cells.length > 0) {
           for (var i = 0; i < 9; i++) {
               var sudokuCells = [];
               for (var j = 0; j < 9; j++) {
                   var cellIdx = i * 9 + j;
                   var given = this.state.original[cellIdx] > 0;
                   var props = {
                       key: "cell" + cellIdx,
                       idx: cellIdx,
                       value: this.state.cells[cellIdx] > 0 ? this.state.cells[cellIdx]: null,
                       given: given,
                       cellTextChange: this.handleCellTextChange,
                       answer: this.state.solved[cellIdx]
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
           <div className="sudoku-container">
           <table className='sudoku-board' ref="board">
               {rows}
           </table>
            <div className="btn-group">
                <div className="btn" onClick={this.resetGame}>Reset Game</div>
                <div className="btn" onClick={this.solveGame}>Solve Game</div>
                <div className="btn" onClick={this.handleNewGame}>New Game</div>
            </div>
           </div>
       );
   }
});

module.exports = SudokuBoard;