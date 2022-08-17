const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = "") {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(description = "") {
        const tarea = new Tarea(description);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, index) => {
            const id = `${index + 1}`.green;
            const { description, completadoEn } = tarea;
            const estado = completadoEn ? "Completada".green : "Incompleta".red;
            console.log(`${id} ${description} => ${estado}`);
        });
    }

    listaPendientesCompletadas(completadas = true) {
        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            const { description, completadoEn } = tarea;
            const estado = completadoEn ? "Completada".green : "Incompleta".red;
            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(
                        `${(contador + ".").green} ${description} => ${
                            completadoEn.green
                        }`
                    );
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(
                        `${(contador + ".").green} ${description} => ${estado}`
                    );
                }
            }
        });
    }

    toggleCompletadas(ids = []) {
        ids.forEach((id) => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toLocaleDateString();
            }
        });
        this.listadoArr.forEach((tarea) => {
            if (!ids.includes(tarea.id)) this._listado[tarea.id].completadoEn = null;
        });
    }
}

module.exports = Tareas;
