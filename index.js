const express = require('express');
// const authRoutes = require('./routes/authRoutes');
// const passportConfig = require('./services/passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require ('./models/User');
require('./models/Survey');
require('./services/passport');
// authRoutes(app);

const app = express();

app.use (bodyParser.json());

app.use (
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes') (app);
require('./routes/billingRoutes') (app);
require('./routes/surveyRoutes') (app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up assets like main.js or mai.css files
    app.use(express.static('client/build'));
    
    // Express will serve up index.html if route is not found
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
            
    });
}


// we don’t want to connect this to github
mongoose.connect(keys.mongoURI);
/*app.get ('/', (req, res) => {
    res.send ( {hi: 'there'});
})*/

// client ID 607586003217-rpiddcavhbsto4237u6vlv589o75gimk.apps.googleusercontent.com

//client secret mKP12cKy-06MThd5p6TBUo9m

const PORT = process.env.PORT || 5000;
app.listen(PORT);