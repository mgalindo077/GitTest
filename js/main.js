(function() {
    var low = require('lowdb');
    var db = low('db.json');
    var dbTareas = db.get('tareas');
  
    var tareaInput    = document.getElementById('tareaInput'),
        btnNuevaTarea = document.getElementById('btn-agregar'),
        lista         = document.getElementById('lista'),
        btnNotificacion = document.getElementById("btn-notificacion");
  
    //load Tasks
    window.addEventListener('load',cargarTareas,false);
  
    //new Task
    btnNuevaTarea.addEventListener('click',agregarTarea);
    tareaInput.addEventListener('keyup',function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        btnNuevaTarea.click();
      }
    });
    btnNotificacion.addEventListener("click", doNotify);
  
  
  function agregarTarea(e) {
    e.preventDefault();
    var tarea       = tareaInput.value;
    renderizarTareas(tarea);
  
    dbTareas.push(tarea).value();
    doNotify(tarea);
    tareaInput.value="";
  
    for (var i = 0; i < lista.children.length; i++) {
      lista.children[i].addEventListener('click',eliminarTarea);
    }
  }
  var eliminarTarea = function() {
    var result=confirm('Quieres ELIMINAR esta tarea?');
    if (result) {
      this.parentNode.removeChild(this);
      console.log(this);
    }else{
      return false;
    }
  };
    var comprobarInput=function() {
      tareaInput.className="";
      tareaInput.setAttribute('placeholder',"Agrega Tu Tarea");
    };
  
    //Inicializaciones
    tareaInput.value="";
    //eventos
  
    //comprobar input
    tareaInput.addEventListener('click',comprobarInput);
  
    for (var i = 0; i < lista.children.length; i++) {
      lista.children[i].addEventListener('click',eliminarTarea);
    }
  
    function cargarTareas() {
      var arrayTask = db.get('tareas').value();
      for (task of arrayTask) {
        renderizarTareas(task);
      }
    }
  
  }());
  
  function renderizarTareas(tarea) {
    var nuevaTarea  = document.createElement('li'),
    enlace      = document.createElement('a'),
    contenido   = document.createTextNode(tarea);
    if (tarea==="") {
      tareaInput.setAttribute('placeholder',"Agrega una tarea válida");
      tareaInput.className="error";
      return false;
    }
  
    enlace.appendChild(contenido);
    enlace.setAttribute('href',"#");
    nuevaTarea.appendChild(enlace);
    lista.appendChild(nuevaTarea);
  }
  
  
  function doNotify(tarea) {
    var options = [
      {
        title: "Nueva Tarea Agregada",
        body: tarea,
      }
    ];
    new Notification('nueva Tarea',options[0]);
  }
  