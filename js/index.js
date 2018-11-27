// Arreglo para ir guardando los movimientos que se vayan realizando
var movimientos = [];

// Representación de la  cuadrilla. Cada número representa a una pieza.
// El 9 es la posición vacía
var  cuadrilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];


/* Estas dos variables son para guardar la posición de la pieza vacía.*/
var filaVacia = 2;
var columnaVacia = 2;


/* Esta función va a chequear si el Rompecabezas esta en la posicion ganadora. 
Existen diferentes formas de hacer este chequeo a partir de la  cuadrilla. */

function chequearSiGano() {

 if ( cuadrilla[0].indexOf(1) === 0 &&  cuadrilla[0].indexOf(2) === 1 &&  cuadrilla[0].indexOf(3) === 2 &&
   cuadrilla[1].indexOf(4) === 0 &&  cuadrilla[1].indexOf(5) === 1 &&  cuadrilla[1].indexOf(6) === 2 &&
   cuadrilla[2].indexOf(7) === 0 &&  cuadrilla[2].indexOf(8) === 1 &&  cuadrilla[2].indexOf(9) === 2 ){
    return true;
  }
    return false;
}
  
// Implementar alguna forma de mostrar un cartel que avise que ganaste el juego

function mostrarCartelGanador() {
if(chequearSiGano() === true) {
  swal('CONGRATULATION');
}
}

//  Función que intercambia dos posiciones en la  cuadrilla.

function intercambiarPosicionescuadrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
  
  let  cuadrillaTemp =  cuadrilla[filaPos1][columnaPos1];
   cuadrilla[filaPos1][columnaPos1] =  cuadrilla[filaPos2][columnaPos2];
   cuadrilla[filaPos2][columnaPos2] =  cuadrillaTemp;

}

// Actualiza la posición de la pieza vacía

function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
filaVacia = nuevaFila;
columnaVacia = nuevaColumna;

}


// Para chequear si la posición está dentro de la  cuadrilla.

function posicionValida(fila, columna) {
  if( fila < 0 || columna < 0 || fila > 2 || columna > 2 ){
    return false;
  }
  return true;

}

//  Movimiento de fichas, en este caso la que se mueve es la amarilla intercambiando su posición con otro elemento.


function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;


  // Mueve pieza hacia la abajo, reemplazandola con la amarilla

  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  // Mueve pieza hacia arriba, reemplazandola con la amarilla
  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  // Mueve pieza hacia la derecha, reemplazandola con la amarilla
  else if (direccion === codigosDireccion.DERECHA) {
    nuevaFilaPiezaVacia = filaVacia ;
    nuevaColumnaPiezaVacia = columnaVacia + 1;
  } 
    
  // Mueve pieza hacia la izquierda, reemplazandola con la amarilla
  else if (direccion === codigosDireccion.IZQUIERDA) {
    nuevaFilaPiezaVacia = filaVacia ;
    nuevaColumnaPiezaVacia = columnaVacia - 1;
   
  }

//   chequea pieza si la nueva posicion es valida, si lo es , se intercambiar

    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
  
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarUltimoMovimiento(direccion);

}
  
}

var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}

// Funcion que realiza el intercambio logico (en la  cuadrilla) y ademas actualiza
// el intercambio en la pantalla 

function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  // Intercambio posiciones en la  cuadrilla
  var pieza1 =  cuadrilla[fila1][columna1];
  var pieza2 =  cuadrilla[fila2][columna2];

  intercambiarPosicionescuadrilla(fila1, columna1, fila2, columna2);
  
  intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}

/* Intercambio de posiciones de los elementos del DOM que representan
las fichas en la pantalla */

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
  // Intercambio posiciones en el DOM
  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}

/* Actualiza la representación visual del último movimiento 
en la pantalla, representado con una flecha. */

function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById('flecha');
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      ultimoMov.textContent = '↑';
      break;
    case codigosDireccion.ABAJO:
      ultimoMov.textContent = '↓';
      break;
    case codigosDireccion.DERECHA:
      ultimoMov.textContent = '→';
      break;
    case codigosDireccion.IZQUIERDA:
      ultimoMov.textContent = '←';
      break;
  }
}

/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }
  
  var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
      codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
    ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function() {
      mezclarPiezas(veces - 1);
    }, 100);
  }


function capturarTeclas() {
  document.body.onkeydown = (function(evento) {
    if (evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA) {

      moverEnDireccion(evento.which);

        var gano = chequearSiGano();
        if (gano) {
          setTimeout(function() {
              mostrarCartelGanador();
              }, 500);
            }
            evento.preventDefault();
        }
    })
}


/* Esta función deberá recorrer el arreglo de instrucciones pasado por parámetro. 
Cada elemento de este arreglo deberá ser mostrado en la lista con id 'lista-instrucciones'. 
Para eso deberás usar la función ya implementada mostrarInstruccionEnLista(). */

function mostrarInstrucciones(instrucciones) {
    for (let i = 0; i < instrucciones.length ; i++) {
      mostrarInstruccionEnLista(instrucciones[i],'lista-instrucciones')
  
    }
  }
  
/* Se inicia el rompecabezas mezclando las piezas 
y ejecutando la función para que se capturen las teclas que 
presiona el usuario */

function iniciar() {
    mostrarInstrucciones(instrucciones);
    mezclarPiezas(30);
    capturarTeclas();
}

// Ejecutamos la función iniciar

iniciar();