import minimist from 'minimist';
import fs from 'fs';

const args = minimist(process.argv.slice(2));
const content = fs.readFileSync('todo.json');
const todo = JSON.parse(content);


const todoHelp = ['    -l', '   Kilistázza a feladatokat', '    -a', '   Új feladatot ad hozzá', '    -r', '   Eltávolít egy feladatot', '    -c', '   Teljesít egy feladatot']



if (Object.keys(args).length == 1) {
    console.log('Parancssori Todo applikáció\n=============================\n\nParancssori argumentumok:\n' + todoHelp[0] + todoHelp[1] + '\n' + todoHelp[2] + todoHelp[3] + '\n' + todoHelp[4] + todoHelp[5] + '\n' + todoHelp[6] + todoHelp[7]);
}

if (args.l === true) {
    for (let i = 0; i < todo.length;i++) {
        console.log(todo[i].id + ': ' + todo[i].task);
    }
}
console.log(Object.keys(args));
