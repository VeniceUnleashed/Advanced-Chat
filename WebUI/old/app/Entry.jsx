/** @jsx React.DOM */

// Register the AdvancedChat object.
require('./AdvancedChat.jsx');

var InitApplication = function()
{
    var React = require('react');

    var App = require('./App.jsx');

    React.render(<App />, document.getElementById('content'));
};

InitApplication();