const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar } = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
// const Tarea = require("./models/tarea");
require("colors");
console.clear();

const main = async () => {
    let opt = "";
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case "1":
                const description = await leerInput("Description: ");
                tareas.crearTarea(description);
                break;
            case "2":
                tareas.listadoCompleto();
                break;
            case "3":
                tareas.listaPendientesCompletadas(true);
                break;
            case "4":
                tareas.listaPendientesCompletadas(false);
                break;
            case "6":
                const id = await listadoTareasBorrar(tareas.listadoArr)
                console.log({id})
                break;
        }
        guardarDB(tareas.listadoArr);
        if (opt !== "0") await pausa();
    } while (opt !== "0");
};

main();
