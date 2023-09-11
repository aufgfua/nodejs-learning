const yargs = require("yargs");

const notes = require("./notes.js");

yargs.version("1.0.0");

const routes = [
    {
        command: "add",
        describe: "Add a new note",
        builder: {
            title: {
                describe: "Note title",
                demandOption: true,
                type: "string",
            },
            content: {
                describe: "Note content",
                demandOption: true,
                type: "string",
            },
        },
        handler(argv) {
            const note = { title: argv.title, content: argv.content };
            notes.add(note);
        },
    },
    {
        command: "remove",
        describe: "Remove a note",
        builder: {
            title: {
                describe: "Note title",
                demandOption: true,
                type: "string",
            },
        },
        handler(argv) {
            const note = { title: argv.title };
            notes.remove(note);
        },
    },
    {
        command: "list",
        describe: "List all notes",
        handler(argv) {
            notes.list();
        },
    },
];

routes.forEach((route) => {
    yargs.commands(route);
});

yargs.argv;
