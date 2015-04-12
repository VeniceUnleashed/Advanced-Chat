/** @jsx React.DOM */

var React = require('react');

var ChatMessage = React.createClass({
    getDefaultProps: function()
    {
        return {
            author: 'Player',
            content: 'Chat Message',
            target: 'all'
        };
    },

    render: function()
    {
        var s_ClassName = 'chat-message ' + this.props.target;

        return (
            <div className={s_ClassName}>
                <label className="author">{this.props.author}:</label>
                <span className="content">{this.props.content}</span>
            </div>
        );
    }
});

module.exports = ChatMessage;