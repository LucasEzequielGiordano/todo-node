const inquirer = require("inquirer");
require("colors");

const menuOpts = [
    {
        type: "list",
        name: "opt",
        message: "¿Qué desea hacer?",
        choices: [
            {
                value: "1",
                name: `${"1.".green} Crear tarea.`,
            },
            {
                value: "2",
                name: `${"2.".green} Listar tareas.`,
            },
            {
                value: "3",
                name: `${"3.".green} Listar tareas completadas.`,
            },
            {
                value: "4",
                name: `${"4.".green} Listar tareas pendientes.`,
            },
            {
                value: "5",
                name: `${"5.".green} Completar tarea(s).`,
            },
            {
                value: "6",
                name: `${"6.".green} Borrar tarea.`,
            },
            {
                value: "0",
                name: `${"0.".green} Salir.`,
            },
        ],
    },
];

const inquirerMenu = async () => {
    console.clear();
    console.log("Choose an option:".green);
    const { opt } = await inquirer.prompt(menuOpts);
    return opt;
};

const pausa = async () => {
    const question = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${"ENTER".green} para continuar...`,
        },
    ];
    await inquirer.prompt(question);
};

const leerInput = async (message) => {
    const question = [
        {
            type: "input",
            name: "description",
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Por favor ingrese un valor.";
                }
                return true;
            },
        },
    ];

    const { description } = await inquirer.prompt(question);
    return description;
};

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        const idx = `${index + 1}`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.description}`,
        };
    });

    choices.unshift({
        value: "0",
        name: "0 ".yellow + "cancelar".yellow,
    });

    const preguntas = [
        {
            type: "list",
            name: "id",
            message: "borrar",
            choices,
        },
    ];
    const { id } = await inquirer.prompt(preguntas);
    return id;
};

const confirmDelete = async (message) => {
    const question = [
        {
            type: "confirm",
            name: "ok",
            message,
        },
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
};

const mostrarListadoCheckList = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        const idx = `${index + 1}`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.description}`,
            checked: tarea.completadoEn ? true : false,
        };
    });

    const preguntas = [
        {
            type: "checkbox",
            name: "ids",
            message: "Selecciones",
            choices,
        },
    ];
    const { ids } = await inquirer.prompt(preguntas);
    return ids;
};

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmDelete,
    mostrarListadoCheckList,
};
