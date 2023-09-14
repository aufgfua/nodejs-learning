const fs = require("fs");

let NOTES_FILE_PATH = "./notes.json";

function logNote(note) {
    console.log(note.title + ":");
    console.log(" -", note.content, "\n");
}

function logNotes(notes) {
    notes.forEach((note) => {
        logNote(note);
    });
}

function loadNotes() {
    try {
        const notesJSON = fs.readFileSync(NOTES_FILE_PATH);
        return JSON.parse(notesJSON);
    } catch (e) {
        console.log("Notes file not found. Creating one.");
        const newNotesList = [];
        saveNotes(newNotesList);
        return newNotesList;
    }
}

function saveNotes(notes) {
    let notesJSON = JSON.stringify(notes);
    fs.writeFileSync(NOTES_FILE_PATH, notesJSON);
}

function add(note) {
    const notes = loadNotes();
    const matchingNote = notes.find((curr) => curr.title === note.title);
    if (matchingNote) {
        console.log("Note already exists:");
        logNote(matchingNote);
    } else {
        notes.push(note);
        saveNotes(notes);
        console.log("Note added:");
        logNote(note);
    }
}

function remove(note) {
    const notes = loadNotes();
    const noteIndex = notes.findIndex((curr) => curr.title === note.title);
    if (noteIndex === -1) {
        console.log(`Note ${note.title} doesn't exist`);
    } else {
        const removedNote = notes.splice(noteIndex, 1)[0];
        saveNotes(notes);
        console.log("Note removed:");
        logNote(removedNote);
    }
}

function get(noteTitle) {
    const notes = loadNotes();
    const note = notes.find((curr) => curr.title === noteTitle);
    return note;
}

function getAll() {
    const notes = loadNotes();
    return notes;
}

function list() {
    let notes = getAll();
    console.log("Note titles:");
    notes.forEach((note) => {
        console.log("   -", note.title);
    });
}

function listDetailed() {
    let notes = getAll();
    logNotes(notes);
}

function read(noteTitle) {
    const note = get(noteTitle);
    if (note) {
        logNote(note);
    } else {
        console.log("Note not found!");
    }
}

module.exports = { add, remove, get, getAll, list, listDetailed, read };
