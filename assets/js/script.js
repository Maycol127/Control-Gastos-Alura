let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = [];
let posicionEditar = -1; // Variable para gestionar la posición del gasto que se está editando

/* Función para llamar el botón */
function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;

    if (posicionEditar === -1) {
        // Si no estamos editando, añadimos un nuevo gasto
        listaNombresGastos.push(nombreGasto);
        listaValoresGastos.push(valorGasto);
        listaDescripcionesGastos.push(descripcionGasto);
        if (Number(valorGasto) > 150) {
            alert("Ha generado un registro superior a su presupuesto habitual");
        }
    } else {
        // Si estamos en modo de edición, actualizamos el gasto
        listaNombresGastos[posicionEditar] = nombreGasto;
        listaValoresGastos[posicionEditar] = valorGasto;
        listaDescripcionesGastos[posicionEditar] = descripcionGasto;
        posicionEditar = -1; // Reseteamos la posición una vez guardado
        document.getElementById('botonFormulario').textContent = 'Agregar Gasto'; // Volver al texto original
    }
    actualizarListaGastos();
}

function actualizarListaGastos(){
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;
    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionesGastos[posicion];
        htmlLista += `<li>${elemento} - S/ ${valorGasto.toFixed(2)} 
                <br>Descripción: ${descripcionGasto} 
                <button onclick="editarGasto(${posicion});">Editar</button>
                <button onclick="eliminarGasto(${posicion});">Eliminar</button>
                </li>`;
        totalGastos += Number(valorGasto);
    });
    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

function editarGasto(posicion) {
    const cajitaNombreGasto = document.getElementById('nombreGasto');
    const cajitaValorGasto = document.getElementById('valorGasto');
    const cajitaDescripcionGasto = document.getElementById('descripcionGasto');
    // Cargar los valores a editar en los campos de input
    cajitaNombreGasto.value = listaNombresGastos[posicion];
    cajitaValorGasto.value = listaValoresGastos[posicion];
    cajitaDescripcionGasto.value = listaDescripcionesGastos[posicion];
    // Cambiar el texto del botón a "Guardar Cambios"
    document.getElementById('botonFormulario').textContent = 'Guardar Cambios';
    // Guardar la posición del gasto que estamos editando
    posicionEditar = posicion;
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1); // Eliminar la descripción también
    actualizarListaGastos();
}
