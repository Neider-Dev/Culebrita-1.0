"use strict";
var game = function () {
    var time = 500;
    var controlGame;
    var movimiento = 10;
    var direccionAnteriorPausado = 1;
    var pausado = 1;
    var cuadrados = [];
    for (let i = 0; i < 8; i++) {
        let cuadrado = {
            name: `c${i + 1}`,
            positionX: 0,
            positionY: 0,
            direction: 5,
            directionFutura: [1],
            positionCambioX: [0],
            positionCambioY: [0],
            html: document.getElementById(`c${i + 1}`)
        };
        cuadrados.push(cuadrado);
    }
    let cabeza = {
        name: `cabeza`,
        positionX: 0,
        positionY: 0,
        direction: 5,
        html: document.getElementById(`cabeza`)
    };
    function start() {
        init();
        controlGame = setInterval(play, time);
    }
    ;
    function init() {
        cabeza.html.style.left = `${(10 * (cuadrados.length + 1))}px`;
        cabeza.html.style.top = `${10}px`;
        for (let i = 0; i < cuadrados.length; i++) {
            cuadrados[i].positionX = (10 * cuadrados.length) - (10 * i);
            cuadrados[i].positionY = 10;
            cuadrados[i].html.style.left = `${cuadrados[i].positionX}px`;
            cuadrados[i].html.style.top = `${cuadrados[i].positionY}px`;
        }
    }
    ;
    function play() {
        moverCabeza();
        moverCuerpo();
    }
    document.onkeydown = function (e) {
        e = e || window.event;
        if (pausado != 1) {
            if (e.key == "ArrowUp") {
                if (cabeza.direction != 2 && cabeza.direction != 4) {
                    cabeza.direction = 4;
                    guardarPosicion();
                }
            }
            if (e.key == "ArrowDown") {
                if (cabeza.direction != 4 && cabeza.direction != 2) {
                    cabeza.direction = 2;
                    guardarPosicion();
                }
            }
            if (e.key == "ArrowRight") {
                if (cabeza.direction != 3 && cabeza.direction != 1) {
                    cabeza.direction = 1;
                    guardarPosicion();
                }
            }
            if (e.key == "ArrowLeft") {
                if (cabeza.direction != 1 && cabeza.direction != 3) {
                    cabeza.direction = 3;
                    guardarPosicion();
                }
            }
        }
        if (e.key == " ") {
            if (pausado == 0) {
                pausado = 1;
                direccionAnteriorPausado = cabeza.direction;
                cabeza.direction = 5;
                cuadrados.map(valor => valor.direction = 5);
            }
            else if (pausado == 1) {
                pausado = 0;
                cabeza.direction = direccionAnteriorPausado;
                cuadrados.map(element => element.direction = element.directionFutura[0]);
            }
        }
    };
    function moverCabeza() {
        switch (cabeza.direction) {
            case 1:
                cabeza.html.style.left = `${cabeza.html.getBoundingClientRect().left + movimiento}px`;
                break;
            case 2:
                cabeza.html.style.top = `${cabeza.html.getBoundingClientRect().top + movimiento}px`;
                break;
            case 3:
                cabeza.html.style.left = `${cabeza.html.getBoundingClientRect().left - movimiento}px`;
                break;
            case 4:
                cabeza.html.style.top = `${cabeza.html.getBoundingClientRect().top - movimiento}px`;
                break;
            case 5:
                break;
        }
    }
    function moverCuerpo() {
        if (cabeza.direction != 5)
            comprovarPosicion();
        for (let i = 0; i < cuadrados.length; i++) {
            switch (cuadrados[i].direction) {
                case 1:
                    cuadrados[i].html.style.left = `${cuadrados[i].html.getBoundingClientRect().left + movimiento}px`;
                    break;
                case 2:
                    cuadrados[i].html.style.top = `${cuadrados[i].html.getBoundingClientRect().top + movimiento}px`;
                    break;
                case 3:
                    cuadrados[i].html.style.left = `${cuadrados[i].html.getBoundingClientRect().left - movimiento}px`;
                    break;
                case 4:
                    cuadrados[i].html.style.top = `${cuadrados[i].html.getBoundingClientRect().top - movimiento}px`;
                    break;
                case 5:
                    break;
            }
        }
    }
    function guardarPosicion() {
        cuadrados.map(element => {
            element.positionCambioX.push(Math.round(cabeza.html.getBoundingClientRect().left));
            element.positionCambioY.push(Math.round(cabeza.html.getBoundingClientRect().top));
            element.directionFutura.push(cabeza.direction);
        });
    }
    function comprovarPosicion() {
        cuadrados.map(elemento => {
            if ((Math.round(elemento.html.getBoundingClientRect().top) == elemento.positionCambioY[1]) && (Math.round(elemento.html.getBoundingClientRect().left) == elemento.positionCambioX[1])) {
                elemento.positionCambioX.splice(0, 1);
                elemento.positionCambioY.splice(0, 1);
                elemento.direction = elemento.directionFutura[1];
                elemento.directionFutura.splice(0, 1);
            }
            ;
        });
    }
    ;
    start();
}();
