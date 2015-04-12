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
    },

    componentWillUnmount: function()
    {
        AdvancedChat.off('message:all', this.OnChatMessageAll);
        AdvancedChat.off('message:enemy', this.OnChatMessageEnemy);
        AdvancedChat.off('message:team', this.OnChatMessageTeam);
        AdvancedChat.off('message:squad', this.OnChatMessageSquad);
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
    }

});

module.exports = ChatMessages;