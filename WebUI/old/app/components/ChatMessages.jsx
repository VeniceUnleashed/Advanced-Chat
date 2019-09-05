/** @jsx React.DOM */

var React = require('react/addons');

var AdvancedChat = require('../AdvancedChat.jsx');

var ChatMessage = require('./ChatMessage.jsx');

var ChatMessages = React.createClass({
    getInitialState: function()
    {
        return {
            messages: []
        };
    },

    render: function()
    {
        return (
            <div id="chat-messages" ref="messages">
                {this.state.messages}
            </div>
        );
    },

    componentDidUpdate: function()
    {
        // Scroll to the bottom of the chat.
        var s_Container = this.refs.messages.getDOMNode();

        s_Container.scrollTop = s_Container.scrollHeight;
    },

    componentWillMount: function()
    {
        AdvancedChat.on('message:all', this.OnChatMessageAll);
        AdvancedChat.on('message:enemy', this.OnChatMessageEnemy);
        AdvancedChat.on('message:team', this.OnChatMessageTeam);
        AdvancedChat.on('message:squad', this.OnChatMessageSquad);
        AdvancedChat.on('message:spectator', this.OnChatMessageSpectator);
        AdvancedChat.on('scroll_up', this.OnScrollUp);
        AdvancedChat.on('scroll_down', this.OnScrollDown);
    },

    componentWillUnmount: function()
    {
        AdvancedChat.off('message:all', this.OnChatMessageAll);
        AdvancedChat.off('message:enemy', this.OnChatMessageEnemy);
        AdvancedChat.off('message:team', this.OnChatMessageTeam);
        AdvancedChat.off('message:squad', this.OnChatMessageSquad);
        AdvancedChat.off('message:spectator', this.OnChatMessageSpectator);
        AdvancedChat.off('scroll_up', this.OnScrollUp);
        AdvancedChat.off('scroll_down', this.OnScrollDown);
    },

    OnChatMessageAll: function(p_Author, p_Message)
    {
        var s_NewState = React.addons.update(this.state, {
            messages: {
                $push: [ <ChatMessage author={p_Author} content={p_Message} target="all" /> ]
            }
        });

        this.setState(s_NewState);
    },

    OnChatMessageEnemy: function(p_Author, p_Message)
    {
        var s_NewState = React.addons.update(this.state, {
            messages: {
                $push: [ <ChatMessage author={p_Author} content={p_Message} target="enemy" /> ]
            }
        });

        this.setState(s_NewState);
    },

    OnChatMessageTeam: function(p_Author, p_Message)
    {
        var s_NewState = React.addons.update(this.state, {
            messages: {
                $push: [ <ChatMessage author={p_Author} content={p_Message} target="team" /> ]
            }
        });

        this.setState(s_NewState);
    },

    OnChatMessageSquad: function(p_Author, p_Message)
    {
        var s_NewState = React.addons.update(this.state, {
            messages: {
                $push: [ <ChatMessage author={p_Author} content={p_Message} target="squad" /> ]
            }
        });

        this.setState(s_NewState);
    },

    OnChatMessageSpectator: function(p_Author, p_Message)
    {
        var s_NewState = React.addons.update(this.state, {
            messages: {
                $push: [ <ChatMessage author={p_Author} content={p_Message} target="spectator" /> ]
            }
        });

        this.setState(s_NewState);
    },

    OnScrollUp: function()
    {
        var s_Container = this.refs.messages.getDOMNode();

        var s_NewScroll = s_Container.scrollTop - 20;
        s_Container.scrollTop = s_NewScroll < 0 ? 0 : s_NewScroll;
    },

    OnScrollDown: function()
    {
        var s_Container = this.refs.messages.getDOMNode();

        var s_NewScroll = s_Container.scrollTop + 20;
        s_Container.scrollTop = s_NewScroll > s_Container.scrollHeight ? s_Container.scrollHeight : s_NewScroll;
    }
});

module.exports = ChatMessages;