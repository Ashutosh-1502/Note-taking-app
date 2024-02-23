const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const Note = require('./models/note');
const session = require('express-session');
const methodOverride = require('method-override');
const noteRoute = require('./routes/noteRoute');
const loginRoute = require('./routes/loginRoute');
const User = require('./models/user');
const ExpressError = require('./utilities/expressError');
const passport = require('passport');
const localStrategy = require('passport-local');
const flash = require('connect-flash');

dotenv.config({path : './config.env'});
const DB = process.env.DATABASE;
const PORT = process.env.PORT;


mongoose.connect(DB)
    .then(() => {
        console.log("Connected to Database");
    })
    .catch(err => {
        console.log("Connection Failed");
        console.log(err);
    })

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'stickyNote',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', noteRoute);
app.use('/auth', loginRoute);


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 404, message = 'Something Went Wrong' } = err;
    res.status(statusCode).render('error/errorPage', { err });
    console.log(err);
})

app.listen(PORT, () => {
    console.log('Listening on port 8080');
})

