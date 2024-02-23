const { noteSchema } = require('./validateSchema');
const ExpressError = require('./utilities/expressError');

module.exports.validateNote = (req, res, next) => {
    const { error } = noteSchema.validate(req.body);
    if (error) {
        throw new ExpressError('Something Went Wrong', 500);
    }
    else {
        next();
    }
}

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.redirect('/auth/login');
    }
    next();
}