const fs = require("fs");

let NOTES_FILE_PATH = "./notes.txt";

function logNote(note) {
    console.log(note.title, " - ", note.content);
}

function logNotes(notes) {
    console.log(notes);
}

function readNotes() {
    try {
        let notesJSON = fs.readFileSync(NOTES_FILE_PATH);
        return JSON.parse(notesJSON);
    } catch (e) {
        console.log("Notes file not found. Creating one.");
        let newNotesList = [];
        writeNotes(newNotesList);
        return newNotesList;
    }
}

function writeNotes(notes) {
    let notesJSON = JSON.stringify(notes);
    fs.writeFileSync(NOTES_FILE_PATH, notesJSON);
}

function add(note) {
    let notes = readNotes();
    let matchingNotes = notes.filter((curr) => curr.title === note.title);
    if (matchingNotes.length > 0) {
        console.log("Note already exists:");
        logNote(matchingNotes[0]);
    } else {
        notes.push(note);
        writeNotes(notes);
        console.log("Note added:");
        logNote(note);
    }
}

function remove(note) {
    let notes = readNotes();
    let noteIndex = notes.findIndex((curr) => curr.title === note.title);
    if (noteIndex === -1) {
        console.log(`Note ${note.title} doesn't exist`);
    } else {
        notes.splice(noteIndex, 1);
        writeNotes(notes);
        console.log("Note removed:");
        logNote(note);
    }
}

add({ title: "Tit1", content: "Cont1" });
add({ title: "Tit2", content: "Cont2" });
add({ title: "Tit3", content: "Cont3" });
add({ title: "Tit4", content: "Cont4" });

console.log(readNotes());

remove({ title: "Tit33" });
console.log(readNotes());

remove({ title: "Tit3" });
console.log(readNotes());

remove({ title: "3" });
console.log(readNotes());

module.exports = { add, remove };
