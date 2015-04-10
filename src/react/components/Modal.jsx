var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Modal = React.createClass({
    propTypes: {
        title: React.PropTypes.string
    },
    getInitialState: function () {
        return {mounted: false}
    },

    handleClick: function (e) {
        e.stopPropagation();
        this.props.closeClick();
    },
    componentDidMount: function () {
        this.setState({mounted: true});
    },
    render: function () {
        var modal;

        if(this.state.mounted) {
            modal = (
                <div className="modal-dialog" key="mounted">
                    <div className="modal-header">
                        <h2>{this.props.title}</h2>
                        <a href="#" onClick={this.handleClick} className="btn-close"
                           aria-hidden="true"></a>
                    </div>
                    <div className="modal-body">
                        {this.props.children[0]}
                    </div>
                    <div className="modal-footer">
                        {this.props.children[1]}
                    </div>
                </div>);
        }

        return (
            <div className="modal show" ref="modal" aria-hidden="true">
                <ReactCSSTransitionGroup transitionName="modal-transition">
                    {modal}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});

module.exports = Modal;