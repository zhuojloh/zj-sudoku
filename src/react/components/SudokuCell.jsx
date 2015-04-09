var React = require('react');

var SudokuCell = React.createClass({
    //notify sudokuBoard cellTextChange
    handleTextChange: function()
    {
        if(typeof(this.props.cellTextChange)=="function")
        {
            this.props.cellTextChange.call(this, this.props.idx, React.findDOMNode(this.refs.cellText));
        }
    },

    handleKeyPress: function(e)
    {
        //1-9 key is 49 to 57. Stop any other key from showing
        if(e.which <49 || e.which >57) {
            e.preventDefault();
        }
        else
        {
            //limit the input to 1 digit only, has to call handleTextChange manually since we want to sto
            React.findDOMNode(this.refs.cellText).value = e.which-48;
            this.handleTextChange();
            e.preventDefault();
        }
    },

    render: function()
    {
        var cellClassName="sudokuCell" + ((this.props.given)?" given" : "");

        return (
            <td className={cellClassName}>
                <input ref="cellText" type="number" size="1" min="1" max="9" onChange={this.handleTextChange} onKeyPress={this.handleKeyPress} value={this.props.value}/>
            </td>
        );
    }
});

module.exports = SudokuCell;