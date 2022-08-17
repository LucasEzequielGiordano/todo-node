require("colors");

const showMenu = () => {
    return new Promise((res) => {
        console.clear();
        console.log("Choose an option:".green);

        console.log(`${"1.".green} Crear tarea`);
        console.log(`${"2.".green} Listar tareas`);
        console.log(`${"3.".green} Listar tareas completadas`);
        console.log(`${"4.".green} Listar tareas pendientes`);
        console.log(`${"5.".green} Completar tarea(s)`);
        console.log(`${"6.".green} Borrar tarea`);
        console.log(`${"0.".green} Salir \n`);

        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question("Seleccione una opción: ", (opt) => {
            console.log(opt);
            readline.close();
            res(opt);
        });
    });
};

const pausa = () => {
    return new Promise((res) => {
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question(`Presione ${"ENTER".green} para continuar`, (opt) => {
            console.log(opt);
            readline.close();
            res();
        });
    });
};

module.exports = { showMenu, pausa };
