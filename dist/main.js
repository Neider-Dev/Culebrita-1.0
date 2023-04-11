"use strict";
var game = function () {
    var time = 100;
    var controlGame;
    var movimiento = 10;
    var direccionAnteriorPausado;
    var pausado;
    var width = Math.round(document.documentElement.clientWidth);
    var height = Math.round(document.documentElement.clientHeight);
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
        direccionAnteriorPausado = 1;
        pausado = 1;
        cabeza.html.style.left = `${(10 * (cuadrados.length + 1))}px`;
        cabeza.html.style.top = `${10}px`;
        cabeza.direction = 5;
        for (let i = 0; i < cuadrados.length; i++) {
            cuadrados[i].positionX = (10 * cuadrados.length) - (10 * i);
            cuadrados[i].positionY = 10;
            cuadrados[i].html.style.left = `${cuadrados[i].positionX}px`;
            cuadrados[i].html.style.top = `${cuadrados[i].positionY}px`;
            cuadrados[i].direction = 5;
            cuadrados[i].positionCambioX = [0];
            cuadrados[i].positionCambioY = [0];
            cuadrados[i].directionFutura = [1];
        }
    }
    ;
    function play() {
        width = Math.round(document.documentElement.clientWidth);
        height = Math.round(document.documentElement.clientHeight);
        moverCuerpo();
        moverCabeza();
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
        if (e.key == "r") {
            reiniciar();
        }
    };
    function moverCabeza() {
        comprovarBordesCabeza();
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
        comprovarBordesCuerpo();
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
    function comprovarBordesCabeza() {
        if (cabeza.html.getBoundingClientRect().top >= (height)) {
            cabeza.html.style.top = `0px`;
        }
        else if (cabeza.html.getBoundingClientRect().top < 0) {
            cabeza.html.style.top = `${height - 10}px`;
        }
        else if (cabeza.html.getBoundingClientRect().left < 0) {
            cabeza.html.style.left = `${width - 10}px`;
        }
        else if (cabeza.html.getBoundingClientRect().left > width) {
            cabeza.html.style.left = `${0}px`;
        }
    }
    function comprovarBordesCuerpo() {
        for (let i = 0; i < cuadrados.length; i++) {
            if (cuadrados[i].html.getBoundingClientRect().top >= (height)) {
                cuadrados[i].html.style.top = `0px`;
            }
            else if (cuadrados[i].html.getBoundingClientRect().top < 0) {
                cuadrados[i].html.style.top = `${height - 10}px`;
            }
            else if (cuadrados[i].html.getBoundingClientRect().left < 0) {
                cuadrados[i].html.style.left = `${width - 10}px`;
            }
            else if (cuadrados[i].html.getBoundingClientRect().left > width) {
                cuadrados[i].html.style.left = `${0}px`;
            }
        }
    }
    function stop() {
        clearInterval(controlGame);
    }
    ;
    function reiniciar() {
        stop();
        start();
    }
    ;
    start();
}();
