/** @jsx React.DOM */

var React = require('react');

var AdvancedChat = require('./AdvancedChat.jsx');

var ChatMessages = require('./components/ChatMessages.jsx');
var ChatForm = require('./components/ChatForm.jsx');

var App = React.createClass({
    render: function()
    {
        var s_DisplayMode = 'Popup';

        switch (this.state.display_mode)
        {
            case 1:
                s_DisplayMode = 'Always Show';
                break;

            case 2:
                s_DisplayMode = 'Hidden';
                break;
        }

        return (
            <div id="chatbox-container">
                <div id="chat-main-container" className={ this.state.visible ? 'visible' : 'hidden' }>
                    <ChatMessages />
                    <ChatForm />
                </div>
                <div id="toggle-message" className={ this.state.show_mode ? 'visible' : 'hidden' }>Display Mode: {s_DisplayMode}</div>
            </div>
        );
    },

    getInitialState: function()
    {
        return {
            visible: false,
            display_mode: 0,
            typing_enabled: false,
            show_mode: false
        };
    },

    componentWillMount: function()
    {
        this.m_HideTimeout = null;
        this.m_ModeTimeout = null;

        AdvancedChat.on('message:all', this.OnChatMessage);
        AdvancedChat.on('message:enemy', this.OnChatMessage);
        AdvancedChat.on('message:team', this.OnChatMessage);
        AdvancedChat.on('message:squad', this.OnChatMessage);
        AdvancedChat.on('message:spectator', this.OnChatMessage);
        AdvancedChat.on('toggle_mode', this.OnToggleMode);
        AdvancedChat.on('enable_typing', this.OnEnableTyping);
        AdvancedChat.on('disable_typing', this.OnDisableTyping);
    },

    componentWillUnmount: function()
    {
        AdvancedChat.off('message:all', this.OnChatMessage);
        AdvancedChat.off('message:enemy', this.OnChatMessage);
        AdvancedChat.off('message:team', this.OnChatMessage);
        AdvancedChat.off('message:squad', this.OnChatMessage);
        AdvancedChat.off('message:spectator', this.OnChatMessage);
        AdvancedChat.off('toggle_mode', this.OnToggleMode);
        AdvancedChat.off('enable_typing', this.OnEnableTyping);
        AdvancedChat.off('disable_typing', this.OnDisableTyping);

        if (this.m_HideTimeout !== null)
        {
            clearTimeout(this.m_HideTimeout);
            this.m_HideTimeout = null;
        }

        if (this.m_ModeTimeout !== null)
        {
            clearTimeout(this.m_ModeTimeout);
            this.m_ModeTimeout = null;
        }
    },

    OnChatMessage: function()
    {
        if (this.state.typing_enabled)
            return;

        switch (this.state.display_mode)
        {
            // Popout
            case 0:
                this.ShowChatbox(5000);
                break;

            // Always Show
            case 1:
                this.ShowChatbox(-1);
                break;

            // Hidden
            case 2:
                break;
        }
    },

    OnToggleMode: function()
    {
        var s_OldMode = this.state.display_mode;

        var s_NewMode = ++s_OldMode;

        if (s_NewMode >= 3)
            s_NewMode = 0;

        switch (s_NewMode)
        {
            case 0:
                break;

            case 1:
                this.ShowChatbox(-1);
                break;

            case 2:
                if (!this.state.typing_enabled)
                    this.HideChatbox();
                break;
        }

        this.setState({ display_mode: s_NewMode, show_mode: true });

        if (this.m_ModeTimeout !== null)
        {
            clearTimeout(this.m_ModeTimeout);
            this.m_ModeTimeout = null;
        }

        var self = this;
        this.m_ModeTimeout = setTimeout(function() { self.HideMode(); }, 2500);
    },

    OnEnableTyping: function()
    {
        this.setState({ typing_enabled: true });
        this.ShowChatbox(-1);

        // Show both brings our UI to the front and shows it.
        VU.Call('Show');

        // Enable mouse and keyboard input.
        VU.Call('EnableKeyboard');
        VU.Call('EnableMouse');
    },

    OnDisableTyping: function()
    {
        this.setState({ typing_enabled: false });

        switch (this.state.display_mode)
        {
            case 1:
                this.ShowChatbox(-1);
                break;

            case 0:
            case 2:
                this.HideChatbox();
                break;
        }

        // Disable mouse and keyboard input.
        VU.Call('DisableKeyboard');
        VU.Call('DispatchEventLocal', 'AC:DisableMouse');
    },

    ShowChatbox: function(p_Timeout)
    {
        this.setState({ visible: true });

        if (this.m_HideTimeout !== null)
        {
            clearTimeout(this.m_HideTimeout);
            this.m_HideTimeout = null;
        }

        if (p_Timeout >= 0)
        {
            var self = this;
            this.m_HideTimeout = setTimeout(function() { self.HideChatbox(); }, p_Timeout);
        }
    },

    HideChatbox: function()
    {
        this.setState({ visible: false });

        if (this.m_HideTimeout !== null)
        {
            clearTimeout(this.m_HideTimeout);
            this.m_HideTimeout = null;
        }
    },

    HideMode: function()
    {
        this.setState({ show_mode: false });

        if (this.m_ModeTimeout !== null)
        {
            clearTimeout(this.m_ModeTimeout);
            this.m_ModeTimeout = null;
        }
    }
});

module.exports = App;