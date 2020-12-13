import minimist from 'minimist';
import fs, { write, writeFile, writeFileSync } from 'fs';

const args = minimist(process.argv.slice(2));
const content = fs.readFileSync('todo.json');
let todo = JSON.parse(content);


const todoHelp = ['    -l', '   Kilistázza a feladatokat', '    -a', '   Új feladatot ad hozzá', '    -r', '   Eltávolít egy feladatot', '    -c', '   Teljesít egy feladatot']



if (Object.keys(args).length == 1) {
    console.log('Parancssori Todo applikáció\n=============================\n\nParancssori argumentumok:\n' + todoHelp[0] + todoHelp[1] + '\n' + todoHelp[2] + todoHelp[3] + '\n' + todoHelp[4] + todoHelp[5] + '\n' + todoHelp[6] + todoHelp[7]);
}


function callingWithLOption(args, todo) {
    if (todo.length === 0) {
        console.log('Nincs mára tennivalód! :)');
    } else {
        for (let i = 0; i < todo.length; i++) {
            console.log(todo[i].id + ': ' + todo[i].task);
        }
    }
};


function callingWithAOption(args, todo) {
    const idNumber = todo.length + 1;
    const newTodo = todo;
    newTodo.push({ id: idNumber, task: args.a });
    fs.writeFileSync("todo.json", JSON.stringify(newTodo));
    return newTodo;
};



if (args.l === true) {
    callingWithLOption(args, todo);
}

if (!!args.a === true) {
    if (args.a === true) {
        console.log('Nem lehetséges új feladat hozzáadása: nincs megadva a feladat!');
    } else {
        todo = callingWithAOption(args, todo);
    }
}

console.log(args.a);

