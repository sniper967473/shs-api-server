const express = require('express');
const auth = require('./routes/auth.route');


module.exports = function () {
    const app = express();
    app.use('/api', express.json());
    app.use('/api/auth', auth);
    return app;
}