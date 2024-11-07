"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const input = (0, prompt_sync_1.default)({});
const tareas = [];
function crearTarea() {
    return {
        titulo: "Sin titulo",
        descripcion: "Sin descripcion",
        estado: "Pendiente",
        creacion: "N/A",
        ultimaedicion: "N/A",
        vencimiento: "N/A",
        dificultad: 1
    };
}
function limpiarPantalla() {
    console.clear();
}
function esperarEnter() {
    input("Presiona cualquier tecla para continuar...");
}
function determinarFecha() {
    let b = new Date();
    let fecha = b.toISOString();
    fecha = fecha.slice(0, fecha.indexOf("T"));
    return fecha;
}
function menuPedirDatos() {
    let opcion;
    let conf;
    let creada = false;
    let nombre = undefined;
    let descripcion = undefined;
    let vencimiento = undefined;
    let dificultad = 1;
    do {
        console.log("Elija el dato a introducir de la tarea...\n1)Titulo\n2)Descripcion\n3)Vencimiento\n4)Dificultad\n5)Finalizar\n0)Cancelar");
        opcion = parseInt(input("Elija una opcion: "));
        switch (opcion) {
            case 0:
                conf = parseInt(input("Esta seguro que desea cancelar la creacion de la tarea?\n1)Si\n2)No\n"));
                switch (conf) {
                    case 1: break;
                    case 2:
                        opcion = 1;
                        break;
                }
                break;
            case 1:
                nombre = introducirTitulo();
                break;
            case 2:
                descripcion = introducirDescripcion();
                break;
            case 3:
                vencimiento = introducirVencimiento();
                break;
            case 4:
                dificultad = introducirDificultad();
                break;
            case 5:
                if (nombre == undefined) {
                    console.log("Debe introducir un titulo para la tarea.");
                    esperarEnter();
                    opcion = 1;
                    break;
                }
                do {
                    console.log("Esta seguro que desea finalizar la creacion de la tarea?\n1) Si\n2) No\n");
                    conf = parseInt(input(''));
                    switch (conf) {
                        case 1:
                            addTarea(asignarDatos(nombre, descripcion, vencimiento, dificultad, crearTarea()));
                            console.log("Tarea creada correctamente.");
                            creada = true;
                            break;
                        case 2:
                            opcion = 1;
                            break;
                        default:
                            console.log("ERROR, opcion no valida");
                            esperarEnter();
                            break;
                    }
                } while ((conf != 1) && (conf != 2));
                break;
            default:
                console.log("ERROR, opcion no valida");
                esperarEnter();
                break;
        }
    } while ((opcion !== 0) && (creada !== true));
}
function ordenarAlfabeticamente() {
    tareas.sort((a, b) => {
        let tituloA = a.titulo.toLowerCase();
        let tituloB = b.titulo.toLowerCase();
        if (tituloA < tituloB)
            return -1;
        if (tituloA > tituloB)
            return 1;
        return 0;
    });
}
function asignarDatos(nombre, descripcion, vencimiento, dificultad, tarea) {
    tarea.titulo = nombre;
    if (descripcion !== undefined) {
        tarea.descripcion = descripcion;
    }
    if (vencimiento !== undefined) {
        tarea.vencimiento = vencimiento;
    }
    if (dificultad !== undefined) {
        tarea.dificultad = dificultad;
    }
    tarea.creacion = determinarFecha();
    tarea.ultimaedicion = determinarFecha();
    return tarea;
}
function addTarea(tarea) {
    tareas.push(tarea);
}
function introducirTitulo() {
    let titulo;
    while (true) {
        try {
            console.log("Introduce el titulo de la tarea");
            titulo = input('');
            if (typeof titulo === "string" && titulo.trim() !== "") {
                return titulo;
            }
            else {
                throw new Error("Titulo no valido");
            }
        }
        catch (error) {
            const e = error;
            console.log(e.message);
        }
    }
}
function introducirDescripcion() {
    let descripcion;
    console.log("Introduce la descripcion de la tarea");
    descripcion = input('');
    if (descripcion === "") {
        return undefined;
    }
    return descripcion;
}
function introducirVencimiento() {
    let diavencimiento;
    let mesvencimiento;
    let aniovencimiento;
    do {
        try {
            console.log("Introduce el dia de vencimiento (en numero): ");
            diavencimiento = parseInt(input(''));
            console.log("Introduce el mes de vencimiento (en numero): ");
            mesvencimiento = parseInt(input(''));
            console.log("Introduce el año de vencimiento (en numero): ");
            aniovencimiento = parseInt(input(''));
            if (isNaN(diavencimiento) || isNaN(mesvencimiento) || isNaN(aniovencimiento)) {
                throw new Error("Error: Valor invalido introducido");
            }
            if (!revisionVencimiento(diavencimiento, mesvencimiento, aniovencimiento)) {
                console.log("Error: Introduce una fecha de vencimiento válida");
            }
            else {
                break;
            }
            limpiarPantalla();
        }
        catch (error) {
            const e = error;
            console.log(e.message);
        }
    } while (true);
    return [aniovencimiento, mesvencimiento, diavencimiento];
}
function revisionVencimiento(diavencimiento, mesvencimiento, aniovencimiento) {
    let vencimiento = new Date(aniovencimiento, mesvencimiento - 1, diavencimiento);
    let dia = (vencimiento.getDate() == diavencimiento);
    let mes = (vencimiento.getMonth() + 1 == mesvencimiento);
    let anio = (vencimiento.getFullYear() == aniovencimiento);
    const fechaActual = new Date();
    let esFuturo = (vencimiento >= fechaActual);
    return (dia && mes && anio && esFuturo);
}
function introducirDificultad() {
    let dificultad;
    let opcion;
    do {
        console.log("Introduce la dificultad de la tarea ([1] Baja, [2] Media, [3] Alta) o [0] para volver al menu anterior");
        opcion = parseInt(input(''));
        if (opcion === 0) {
            return 1;
        }
        if (opcion >= 1 && opcion <= 3) {
            dificultad = opcion;
            return dificultad;
        }
        console.log("Dificultad introducida no valida, reintroduzcala correctamente.");
    } while (true);
}
function listaPorEstado() {
    let opcion = elegirEstadoListado();
    if (opcion === 0) {
        return;
    }
    let resultados = buscarEstadoListado(opcion);
    if (resultados.length === 0) {
        console.log("No hay tareas con ese estado");
        esperarEnter();
        return;
    }
    mostrarListadoTareas(resultados);
    opcion = menuSeleccionarTarea(resultados);
    if (opcion === 0) {
        return;
    }
    mostrarTarea(opcion - 1);
    return;
}
function elegirEstadoListado() {
    let opcion;
    do {
        console.log("Seleccione el estado de las tareas a listar");
        console.log("1) Todas\n2) Pendientes\n3) En proceso\n4) Terminadas\n0) Cancelar");
        opcion = parseInt(input(''));
        limpiarPantalla();
        if (isNaN(opcion) || opcion < 0 || opcion > 4) {
            console.log("Error: Opcion no valida");
        }
        else {
            return opcion;
        }
    } while (true);
}
function buscarEstadoListado(opcion) {
    let resultados = [];
    if (opcion === 1) {
        return tareas;
    }
    for (let i = 0; i < tareas.length; i++) {
        switch (opcion) {
            case 2:
                if (tareas[i].estado === "Pendiente") {
                    resultados.push(i);
                }
                break;
            case 3:
                if (tareas[i].estado === "En curso") {
                    resultados.push(i);
                }
                break;
            case 4:
                if (tareas[i].estado === "Completada") {
                    resultados.push(i);
                }
                break;
        }
    }
    return resultados;
}
function mostrarListadoTareas(array) {
    if (typeof array[0] === "number") {
        listarTareasPorIndice(array);
    }
    else {
        listarTareasPorArray(array);
    }
}
function listarTareasPorIndice(array) {
    limpiarPantalla();
    console.log("Tareas:\n");
    for (let i = 0; i < array.length; i++) {
        console.log(`${i + 1}) Título: ${tareas[array[i]].titulo}`);
    }
    console.log("\n");
}
function listarTareasPorArray(array) {
    limpiarPantalla();
    console.log("Tareas:\n");
    for (let i = 0; i < array.length; i++) {
        console.log(`${i + 1}) Título: ${array[i].titulo}`);
    }
    console.log("\n");
}
function menuSeleccionarTarea(array) {
    let id;
    do {
        console.log("Selecciona la tarea a visualizar o introduce [0] para volver al menu principal...");
        id = parseInt(input(''));
        if (id === 0) {
            return id;
        }
        if (isNaN(id) || id < 0 || id >= (array.length + 1)) {
            console.log("ERROR, tarea elegida no existe");
        }
    } while (isNaN(id) || id < 0 || id >= (array.length + 1));
    if (typeof array[0] === 'number') {
        id = array[id - 1] + 1;
    }
    return id;
}
function mostrarDificultad(tarea) {
    switch (tareas[tarea].dificultad) {
        case 1:
            return "★☆☆";
            break;
        case 2:
            return "★★☆";
            break;
        case 3:
            return "★★★";
            break;
    }
}
function mostrarTarea(tarea) {
    limpiarPantalla();
    console.log(`Título: ${tareas[tarea].titulo}\n`);
    console.log(`${tareas[tarea].descripcion}\n`);
    console.log(`Dificultad: ${mostrarDificultad(tarea)}`);
    console.log(`Estado: ${tareas[tarea].estado}`);
    console.log(`Creación: ${tareas[tarea].creacion}`);
    console.log(`Ultima edición: ${tareas[tarea].ultimaedicion}`);
    if (typeof tareas[tarea].vencimiento !== "string") {
        console.log(`Vencimiento: ${tareas[tarea].vencimiento[0]}-${tareas[tarea].vencimiento[1]}-${tareas[tarea].vencimiento[2]}`);
    }
    preguntarEdicion(tarea);
}
function preguntarEdicion(tarea) {
    let tecla;
    console.log("Ingrese cualquier tecla para volver al menu principal, ingrese E para editar la tarea");
    tecla = input('');
    if (tecla === "e" || tecla === "E") {
        editarTarea(tarea);
    }
}
function cambiarEstadoTarea(tarea) {
    let estado;
    do {
        console.log("¿Qué deseas hacer con la tarea?");
        console.log("1. Marcar como completada");
        console.log("2. Marcar como en curso");
        console.log("3. Marcar como terminada");
        console.log("4. Marcar como cancelada");
        console.log("5. Marcar como pendiente");
        console.log("0. Cancelar edicion");
        estado = parseInt(input(''), 10);
        limpiarPantalla();
        switch (estado) {
            case 1:
                tareas[tarea].estado = "Completada";
                break;
            case 2:
                tareas[tarea].estado = "En curso";
                break;
            case 3:
                tareas[tarea].estado = "Completada";
                break;
            case 4:
                tareas[tarea].estado = "Cancelada";
                break;
            case 5:
                tareas[tarea].estado = "Pendiente";
                break;
            case 0:
                console.log("Edicion cancelada");
                return;
                break;
            default:
                console.log("ERROR, eleccion no valida");
                esperarEnter();
                break;
        }
    } while (estado === 0);
}
function menuEditarTarea() {
    console.log("¿Qué deseas editar?");
    console.log("1. Título");
    console.log("2. Descripción");
    console.log("3. Vencimiento");
    console.log("4. Dificultad");
    console.log("5. Estado");
    console.log("0. Finalizar edicion");
}
function editarTarea(tarea) {
    let opcion;
    do {
        menuEditarTarea();
        opcion = parseInt(input(''), 10);
        limpiarPantalla();
        switch (opcion) {
            case 1:
                tareas[tarea].titulo = introducirTitulo();
                tareas[tarea].ultimaedicion = determinarFecha();
                break;
            case 2:
                tareas[tarea].descripcion = introducirDescripcion();
                tareas[tarea].ultimaedicion = determinarFecha();
                break;
            case 3:
                tareas[tarea].vencimiento = introducirVencimiento();
                tareas[tarea].ultimaedicion = determinarFecha();
                break;
            case 4:
                tareas[tarea].dificultad = introducirDificultad();
                tareas[tarea].ultimaedicion = determinarFecha();
                break;
            case 5:
                cambiarEstadoTarea(tarea);
                tareas[tarea].ultimaedicion = determinarFecha();
                break;
            case 0:
                console.log("Edicion finalizada");
                return;
                break;
            default:
                console.log("ERROR, elección no valida");
                esperarEnter();
                break;
        }
    } while (opcion !== 0);
}
function pedirParametroBusqueda() {
    console.log("Introduce el título de la tarea a buscar:");
    let titulo = input('');
    return titulo;
}
function buscarTarea(titulo) {
    let resultados = [];
    for (let i = 0; i < tareas.length; i++) {
        if ((tareas[i].titulo).toLowerCase().includes(titulo.toLowerCase())) {
            resultados.push(i);
        }
    }
    return resultados;
}
function menuBuscarTarea() {
    let titulo = pedirParametroBusqueda();
    let resultados = [];
    resultados = buscarTarea(titulo);
    if (resultados.length === 0) {
        console.log("Ninguna similitud encontrada...");
        esperarEnter();
        return;
    }
    busquedaListarTareas(resultados);
}
function busquedaListarTareas(array) {
    let id;
    console.log("Listado de coincidencias:\n");
    for (let i = 0; i < array.length; i++) {
        console.log("[" + (i + 1) + `] ${tareas[array[i]].titulo}`);
    }
    console.log("\n");
    id = menuSeleccionarTarea(array);
    if (id === 0) {
        return;
    }
    else {
        mostrarTarea(id - 1);
    }
}
function menu() {
    let options;
    do {
        console.log("Bienvenido");
        console.log("Seleccione una opción:");
        console.log("1. Añadir tarea");
        console.log("2. Listar tareas");
        console.log("3. Buscar tarea");
        console.log("4. Salir");
        options = parseInt(input(''), 10);
        limpiarPantalla();
        switch (options) {
            case 1:
                menuPedirDatos();
                ordenarAlfabeticamente();
                break;
            case 2:
                listaPorEstado();
                ordenarAlfabeticamente();
                break;
            case 3:
                menuBuscarTarea();
                ordenarAlfabeticamente();
                break;
            case 4:
                console.log("Adiós");
                break;
            default:
                console.log("Opción inválida. Intente nuevamente.");
                esperarEnter();
        }
        limpiarPantalla();
    } while (options != 4);
}
menu();
