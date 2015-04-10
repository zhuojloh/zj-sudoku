var React = require('react');
var jQuery =require('jquery');

var SudokuCell = React.createClass({
    //notify sudokuBoard cellTextChange
    handleTextChange: function () {
        if (typeof(this.props.cellTextChange) == "function") {
            this.props.cellTextChange.call(this, this.props.idx, React.findDOMNode(this.refs.cellText));
        }
    },

    handleKeyDown: function (e) {
        //cursor keys(delete, tabs, arrows) let it through
        if (e.which >= 8 && e.which < 48) {
            return;
        }
        //1-9 key is 49 to 57. Stop any other key from showing
        else if (e.which < 49 || e.which > 57) {
            e.preventDefault();
        }
        else {
            //limit the input to 1 digit only, has to call handleTextChange manually since we want to sto
            React.findDOMNode(this.refs.cellText).value = e.which - 48;
            this.handleTextChange();
            e.preventDefault();
        }
    },

    componentDidMount: function(){
        jQuery(React.findDOMNode(this.refs.cellText)).on('keydown', this.handleKeyDown)
    },

    render: function () {
        //generate cell className
        var cellClassName = "sudoku-cell" + ((this.props.given) ? " given" : "");
        if (!this.props.given && this.props.value) {
            cellClassName += this.props.answer == this.props.value ? " correct" : " incorrect";
        }
        var cellId = "cell" + this.props.idx;
        return (
            <td className={cellClassName} id={cellId}>
                <input ref="cellText" type="number" size="1" min="1" max="9" onChange={this.handleTextChange}
                       value={this.props.value}/>
            </td>
        );
    }
});

module.exports = SudokuCell;