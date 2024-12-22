const tareas = [
  { id: 16, descripcion: "Realizar Desafio 5", completado: true },
  { id: 60, descripcion: "Realizar Desafio 6", completado: false },
  { id: 24, descripcion: "Sacar a pasear a Matilda", completado: false },
];


const totalTareasEl = document.getElementById("total-tareas");
const tareasCompletadasEl = document.getElementById("tareas-completadas");
const nuevaTareaInput = document.getElementById("nueva-tarea");
const agregarTareaBtn = document.getElementById("agregar-tarea-btn");
const listaTareasEl = document.getElementById("lista-tareas");


function renderTareas() {
  listaTareasEl.innerHTML = "";
  tareas.forEach((tarea) => {
    const fila = document.createElement("tr");

   
    const celdaId = document.createElement("td");
    celdaId.textContent = tarea.id;
    if (tarea.completado) celdaId.classList.add("completado");
    fila.appendChild(celdaId);

    
    const celdaDescripcion = document.createElement("td");
    celdaDescripcion.textContent = tarea.descripcion;
    if (tarea.completado) celdaDescripcion.classList.add("completado");
    fila.appendChild(celdaDescripcion);

    
    const celdaCheckbox = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.completado;
    checkbox.classList.add("checkbox");
    checkbox.addEventListener("change", () => toggleCompletado(tarea.id));
    celdaCheckbox.appendChild(checkbox);
    fila.appendChild(celdaCheckbox);

    
    const celdaEliminar = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.innerHTML = "&#10005;"; // Icono de X
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.addEventListener("click", () => eliminarTarea(tarea.id));
    celdaEliminar.appendChild(btnEliminar);
    fila.appendChild(celdaEliminar);

    listaTareasEl.appendChild(fila);
  });

  actualizarResumen();
}


function agregarTarea() {
  const descripcion = nuevaTareaInput.value.trim();
  if (descripcion === "") return;

  const nuevaTarea = {
    id: Date.now(),
    descripcion,
    completado: false,
  };

  tareas.push(nuevaTarea);
  nuevaTareaInput.value = "";
  renderTareas();
}


function eliminarTarea(id) {
  const index = tareas.findIndex((tarea) => tarea.id === id);
  if (index !== -1) {
    tareas.splice(index, 1);
    renderTareas();
  }
}


function toggleCompletado(id) {
  const tarea = tareas.find((tarea) => tarea.id === id);
  if (tarea) {
    tarea.completado = !tarea.completado;
    renderTareas();
  }
}


function actualizarResumen() {
  const total = tareas.length;
  const completadas = tareas.filter((tarea) => tarea.completado).length;

  totalTareasEl.textContent = total;
  tareasCompletadasEl.textContent = completadas;
}


agregarTareaBtn.addEventListener("click", agregarTarea);


renderTareas();
