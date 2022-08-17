const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmDelete,
    mostrarListadoCheckList,
} = require("./helpers/inquirer");
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
            case "5":
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                console.log(ids);
                tareas.toggleCompletadas(ids);
                break;
            case "6":
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== "0") {
                    const confirm = await confirmDelete("sure?");
                    if (confirm) {
                        tareas.borrarTarea(id);
                        console.log("La tarea ha sido eliminada.");
                    } else {
                        console.log("La tarea no ha sido eliminada.");
                    }
                }
                break;
        }
        guardarDB(tareas.listadoArr);
        if (opt !== "0") await pausa();
    } while (opt !== "0");
};

main();
