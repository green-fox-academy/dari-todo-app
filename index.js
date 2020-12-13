import minimist from 'minimist';
import fs, { write, writeFile, writeFileSync } from 'fs';

const args = minimist(process.argv.slice(2));
const content = fs.readFileSync('todo.json');
let todo = JSON.parse(content);



const todoHelp = ['    -l', '   Kilistázza a feladatokat', '    -a', '   Új feladatot ad hozzá', '    -r', '   Eltávolít egy feladatot', '    -c', '   Teljesít egy feladatot']



if (args._.length == 0 && Object.keys(args).length === 1) {
    console.log('Parancssori Todo applikáció\n=============================\n\nParancssori argumentumok:\n' + todoHelp[0] + todoHelp[1] + '\n' + todoHelp[2] + todoHelp[3] + '\n' + todoHelp[4] + todoHelp[5] + '\n' + todoHelp[6] + todoHelp[7]);
}

if (args._.length > 0 && !Object.keys(args).includes('l') && !Object.keys(args).includes('a') && !Object.keys(args).includes('c') && !Object.keys(args).includes('r')) {
    console.log('Nem támogatott argumentum!');
    console.log('Parancssori Todo applikáció\n=============================\n\nParancssori argumentumok:\n' + todoHelp[0] + todoHelp[1] + '\n' + todoHelp[2] + todoHelp[3] + '\n' + todoHelp[4] + todoHelp[5] + '\n' + todoHelp[6] + todoHelp[7]);
}


function callingWithL(args, todo) {
    let line = '';
    if (todo.length === 0) {
        console.log('Nincs mára tennivalód! :)');
    } else {
        for (let i = 0; i < todo.length; i++) {
            line = todo[i].id + ': ' + todo[i].task;
            if (todo[i].done === true) {
                line = line + ' [x]';
                console.log(line);
            } else {
                line = line + ' [ ]';
                console.log(line);
            }
            line = '';
        }
    }
}


function callingWithA(args, todo) {
    const idNumber = todo.length + 1;
    todo.push({ id: idNumber, task: args.a, done: false });
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

function callingWithC(args, todo) {
    todo[args.c - 1].done = true;
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

if (!!args.c === true) {
    if (args.c === true) {
        console.log('Nem lehetséges a feladat végrehajtása: nem adtál meg indexet!');
    } else {
        if (!Number.isInteger(args.c)) {
            console.log('Nem lehetséges a feladat végrehajtása: a megadott index nem szám');
        } else {
        if (args.c > todo.length) {
            console.log('Nem lehetséges a feladat végrehajtása: túlindexelési probléma adódott!');
        } else {
            callingWithC(args, todo);
        }
    }
}}

console.log(args);