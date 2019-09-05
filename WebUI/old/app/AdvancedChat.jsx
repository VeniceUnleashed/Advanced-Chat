/** @jsx React.DOM */

var AdvancedChat = function()
{
    this.m_Listeners = {};
};

AdvancedChat.prototype.on = function(p_Event, p_Callback, p_Context)
{
    if (!p_Callback || typeof(p_Callback) != 'function')
        return this;

    var s_Callbacks = this.m_Listeners[p_Event] || (this.m_Listeners[p_Event] = []);
    s_Callbacks.push({ callback: p_Callback, context: p_Context, ctx: p_Context || this });
    return this;
};

AdvancedChat.prototype.off = function(p_Event, p_Callback, p_Context)
{
    if (!p_Event && !p_Callback && !p_Context)
    {
        this.m_Listeners = [];
        return this;
    }

    var s_Callbacks = this.m_Listeners[p_Event];

    if (!s_Callbacks)
        return this;

    if (!p_Callback && !p_Context)
    {
        delete this.m_Listeners[p_Event];
        return this;
    }

    var s_Remaining = [];

    for (var j = 0, k = s_Callbacks.length; j < k; ++j)
    {
        var s_Event = s_Callbacks[j];

        if (p_Callback && p_Callback !== s_Event.callback &&
            p_Callback !== s_Event.callback._callback ||
            p_Context && p_Context !== s_Event.context)
            s_Remaining.push(s_Event);
    }

    if (s_Remaining.length)
        this.m_Listeners[p_Event] = s_Remaining;
    else
        delete this.m_Listeners[p_Event];

    return this;
};

AdvancedChat.prototype.trigger = function(p_Event)
{
    var TriggerEvents = function(p_Events, p_Arguments)
    {
        var s_Event;
        var i = -1;
        var s_EventCount = p_Events.length;

        var a1 = p_Arguments[0];
        var a2 = p_Arguments[1];
        var a3 = p_Arguments[2];

        switch (p_Arguments.length)
        {
            case 0:
                while (++i < s_EventCount)
                    (s_Event = p_Events[i]).callback.call(s_Event.ctx);

                return;

            case 1:
                while (++i < s_EventCount)
                    (s_Event = p_Events[i]).callback.call(s_Event.ctx, a1);

                return;

            case 2:
                while (++i < s_EventCount)
                    (s_Event = p_Events[i]).callback.call(s_Event.ctx, a1, a2);

                return;

            case 3:
                while (++i < s_EventCount)
                    (s_Event = p_Events[i]).callback.call(s_Event.ctx, a1, a2, a3);

                return;

            default:
                while (++i < s_EventCount)
                    (s_Event = p_Events[i]).callback.apply(s_Event.ctx, p_Arguments);

                return;
        }
    };

    var s_Arguments = Array.prototype.slice.call(arguments, 1);

    var s_Events = this.m_Listeners[p_Event];
    var s_AllEvents = this.m_Listeners.all;

    if (s_Events)
        TriggerEvents(s_Events, s_Arguments);

    if (s_AllEvents)
        TriggerEvents(s_AllEvents, arguments);

    return this;
};

window.AdvancedChat = new AdvancedChat();
window.VU = window.VU || { Call: function() {} };

module.exports = window.AdvancedChat;