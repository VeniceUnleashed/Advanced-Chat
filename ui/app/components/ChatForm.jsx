/** @jsx React.DOM */

var React = require('react');

var AdvancedChat = require('../AdvancedChat.jsx');

var ChatForm = React.createClass({
    getInitialState: function()
    {
        return {
            active: false,
            target: 'all'
        };
    },

    render: function()
    {
        var s_ClassName = this.state.active ? 'active' : 'inactive';

        return (
            <form id="chat-form" className={s_ClassName} onSubmit={this.OnSubmit}>
                <input type="text" ref="message" className="message-input" maxlength="254" disabled={!this.state.active} onKeyDown={this.OnKeyDown} onBlur={this.OnBlur} />
                <label ref="target" className="chat-target">{this.state.target}</label>
            </form>
        );
    },

    componentWillMount: function()
    {
        AdvancedChat.on('enable_typing', this.OnEnableTyping);
        AdvancedChat.on('disable_typing', this.OnDisableTyping);
    },

    componentWillUnmount: function()
    {
        AdvancedChat.off('enable_typing', this.OnEnableTyping);
        AdvancedChat.off('disable_typing', this.OnDisableTyping);
    },

    OnEnableTyping: function(p_Target)
    {
        this.setState({
            active: true,
            target: p_Target
        });

        this.refs.message.getDOMNode().focus();
    },

    OnDisableTyping: function()
    {
        this.setState({
            active: false,
            target: 'all'
        });

        this.refs.message.getDOMNode().value = '';
    },

    OnSubmit: function(p_Event)
    {
        p_Event.preventDefault();

        VU.Call('DispatchEventLocal', 'AC:SendChatMessage', this.state.target + ':' + this.refs.message.getDOMNode().value);
        AdvancedChat.trigger('disable_typing');
    },

    OnKeyDown: function(p_Event)
    {
        if (p_Event.keyCode == 27)
        {
            // User pressed escape. Disable typing.
            p_Event.preventDefault();
            AdvancedChat.trigger('disable_typing');
            return;
        }

        if (p_Event.keyCode == 38)
        {
            // User pressed up. Scroll chat up.
            p_Event.preventDefault();
            AdvancedChat.trigger('scroll_up');
            return;
        }

        if (p_Event.keyCode == 40)
        {
            // User pressed up. Scroll chat down.
            p_Event.preventDefault();
            AdvancedChat.trigger('scroll_down');
            return;
        }
    },

    OnBlur: function(p_Event)
    {
        AdvancedChat.trigger('disable_typing');
    }
});

module.exports = ChatForm;