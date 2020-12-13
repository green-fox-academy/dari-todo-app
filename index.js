import minimist from 'minimist';
import fs, { write, writeFile, writeFileSync } from 'fs';

const args = minimist(process.argv.slice(2));
const content = fs.readFileSync('todo.json');
let todo = JSON.parse(content);


const todoHelp = ['    -l', '   Kilistázza a feladatokat', '    -a', '   Új feladatot ad hozzá', '    -r', '   Eltávolít egy feladatot', '    -c', '   Teljesít egy feladatot']



if (Object.keys(args).length == 1) {
    console.log('Parancssori Todo applikáció\n=============================\n\nParancssori argumentumok:\n' + todoHelp[0] + todoHelp[1] + '\n' + todoHelp[2] + todoHelp[3] + '\n' + todoHelp[4] + todoHelp[5] + '\n' + todoHelp[6] + todoHelp[7]);
}

if (Object.keys(args).length > 1 && !Object.keys(args).includes('l','a','r','c')) {
    console.log('Nem támogatott argumentum!');
    console.log('Parancssori Todo applikáció\n=============================\n\nParancssori argumentumok:\n' + todoHelp[0] + todoHelp[1] + '\n' + todoHelp[2] + todoHelp[3] + '\n' + todoHelp[4] + todoHelp[5] + '\n' + todoHelp[6] + todoHelp[7]);
}


function callingWithL(args, todo) {
    if (todo.length === 0) {
        console.log('Nincs mára tennivalód! :)');
    } else {
        for (let i = 0; i < todo.length; i++) {
            console.log(todo[i].id + ': ' + todo[i].task);
        }
    }
}


function callingWithA(args, todo) {
    const idNumber = todo.length + 1;
    todo.push({ id: idNumber, task: args.a });
    fs.writeFileSync("todo.json", JSON.stringify(todo));
    return todo;
}

function callingWithR(args, todo) {
    todo.splice(args.r - 1, 1);
    for (let i = args.r - 1; i < todo.length; i++) {
        todo[i].id--;
    }
    fs.writeFileSync("todo.json", JSON.stringify(todo));

}


if (args.l === true) {
    callingWithL(args, todo);
}

if (!!args.a === true) {
    if (args.a === true) {
        console.log('Nem lehetséges új feladat hozzáadása: nincs megadva a feladat!');
    } else {
        todo = callingWithA(args, todo);
    }
}

if (!!args.r === true) {
    if (args.r === true) {
        console.log('Nem lehetséges az eltávolítás: nem adott meg indexet!');
    } else {
        if (!Number.isInteger(args.r)) {
            console.log('Nem lehetséges az eltávolítás: a megadott index nem szám!');
        } else {
            if (args.r > todo.length) {
                console.log('Nem lehetséges az eltávolítás: túlindexelési probléma adódott!');
            } else {
                callingWithR(args, todo);
            }
        }
    }
}

