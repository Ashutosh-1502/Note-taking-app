const Note = require('../models/note');
const flash = require('connect-flash');

module.exports.index = (req, res) => {
    res.render('note/home');
}

module.exports.dashBoard = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user._id });
        res.render('note/dashboard', { notes });
    } catch (e) {
        res.redirect('/newNote');
    }
}

module.exports.new = (req, res) => {
    res.render('note/newNote');
}

module.exports.newNote = async (req, res) => {
    try {
        const newNote = new Note(req.body);
        newNote.userId = req.user._id;
        await newNote.save();
        req.flash('success', 'You Successfully Created a new Note');
        res.redirect('/dashboard');
    } catch (err) {
        req.flash('error', 'Please Login Again');
        res.redirect('/auth/login');
    }
}

module.exports.viewItem = async (req, res) => {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
        req.flash('error', 'Note Not Available');
        return res.redirect('/dashboard');
    }
    res.render('note/update', { note });
}

module.exports.updateNote = async (req, res) => {
    const { id } = req.params;
    await Note.findByIdAndUpdate(id, req.body);
    req.flash('success', 'You have Successfully Updated your Note');
    res.redirect('/dashboard');
}

module.exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    req.flash('success', 'Your notes is Deleted Suucessfully');
    res.redirect('/dashboard');
}
