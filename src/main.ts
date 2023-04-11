var game: void = function(): void{

    var time: number = 100;
    var controlGame: number;
    var movimiento: number = 10;
    var direccionAnteriorPausado: number;
    var pausado: number;
    var width: number = Math.round(document.documentElement.clientWidth); //Ancho
    var height: number = Math.round(document.documentElement.clientHeight); //Alto

    type cuadrado = {
        name: string,
        positionY: number,
        positionX: number,
        direction: number,
        directionFutura: number[],
        positionCambioX: number[],
        positionCambioY: number[],
        html: HTMLDivElement
    }

    type cabeza = {
        name: string,
        positionY: number,
        positionX: number,
        direction: number,
        html: HTMLDivElement
    }

    var cuadrados: cuadrado[] = [];

    for(let i=0; i<8;i++){
        let cuadrado: cuadrado = {
            name: `c${i+1}`,
            positionX: 0,
            positionY: 0,
            direction: 5,
            directionFutura: [1],
            positionCambioX: [0],
            positionCambioY: [0],
            html: document.getElementById(`c${i+1}`) as HTMLDivElement
        };
        cuadrados.push(cuadrado)
    }

    let cabeza: cabeza = {
            name: `cabeza`,
            positionX: 0,
            positionY: 0,
            direction: 5,
            html: document.getElementById(`cabeza`) as HTMLDivElement
    }

    function start(): void{
        init(); 
        controlGame = setInterval(play,time);
    };

    function init(): void{
        direccionAnteriorPausado = 1;
        pausado = 1;
        cabeza.html.style.left = `${(10 * (cuadrados.length+1))}px`
        cabeza.html.style.top = `${10}px`
        cabeza.direction = 5;

        for(let i=0;i<cuadrados.length; i++){
            cuadrados[i].positionX = (10 * cuadrados.length)-(10*i);
            cuadrados[i].positionY = 10;
            cuadrados[i].html.style.left = `${cuadrados[i].positionX}px`;
            cuadrados[i].html.style.top = `${cuadrados[i].positionY}px`;
            cuadrados[i].direction = 5;
            cuadrados[i].positionCambioX = [0];
            cuadrados[i].positionCambioY = [0];
            cuadrados[i].directionFutura = [1];
        }
    };

    function play(): void{
        width = Math.round(document.documentElement.clientWidth); //Ancho
        height= Math.round(document.documentElement.clientHeight); //Alto
        moverCuerpo();
        moverCabeza();
    }

    document.onkeydown = function(e){
        e = e || window.event;
        if(pausado!=1){
            if(e.key == "ArrowUp"){
                if( cabeza.direction != 2 && cabeza.direction != 4) {
                    cabeza.direction = 4;
                    guardarPosicion();
                }
            }
            if(e.key == "ArrowDown"){
                if( cabeza.direction != 4 && cabeza.direction != 2) {
                    cabeza.direction = 2;
                    guardarPosicion();
                }
            }
            if(e.key == "ArrowRight"){
                if(cabeza.direction != 3 && cabeza.direction != 1) {
                    cabeza.direction=1;
                    guardarPosicion();
                }
            }
            if(e.key == "ArrowLeft"){
                if(cabeza.direction != 1 && cabeza.direction != 3) {
                    cabeza.direction = 3;
                    guardarPosicion();
                }
                
            }
        }
        if(e.key == " "){
            if(pausado == 0){
                pausado = 1;
                direccionAnteriorPausado = cabeza.direction;
                cabeza.direction = 5;
                cuadrados.map(valor => valor.direction = 5);  
            }else if(pausado == 1){
                pausado = 0
                cabeza.direction = direccionAnteriorPausado;
                cuadrados.map(element => element.direction = element.directionFutura[0])
                //Se usa para mover el cuerpo despues de pausar 
            }
        }
        if(e.key == "r"){
            reiniciar();
        } 
    }

    function moverCabeza(): void{
        comprovarBordesCabeza();
        switch(cabeza.direction){
            case 1://derecha
                cabeza.html.style.left = `${cabeza.html.getBoundingClientRect().left+movimiento}px`
                break;
            case 2://abajo
                cabeza.html.style.top = `${cabeza.html.getBoundingClientRect().top+movimiento}px`
                break;
            case 3://izquierda
                cabeza.html.style.left = `${cabeza.html.getBoundingClientRect().left-movimiento}px`
                break;
            case 4://arriba
                cabeza.html.style.top = `${cabeza.html.getBoundingClientRect().top-movimiento}px`
                break;
            case 5:
                break;
        }
    }

    function moverCuerpo(): void{
        if(cabeza.direction != 5) comprovarPosicion(); //El if evita que se comprueve mientras la cabeza esta quieta
        comprovarBordesCuerpo();
        for(let i=0; i<cuadrados.length;i++){
            switch(cuadrados[i].direction){
                case 1://derecha
                    cuadrados[i].html.style.left = `${cuadrados[i].html.getBoundingClientRect().left+movimiento}px`
                    break;
                case 2://abajo
                    cuadrados[i].html.style.top = `${cuadrados[i].html.getBoundingClientRect().top+movimiento}px`
                    break;
                case 3://izquierda
                    cuadrados[i].html.style.left = `${cuadrados[i].html.getBoundingClientRect().left-movimiento}px`
                    break;
                case 4://arriba
                    cuadrados[i].html.style.top = `${cuadrados[i].html.getBoundingClientRect().top-movimiento}px`
                    break;
                case 5:
                    break;
            }
        }
    }

    function guardarPosicion(): void{
        cuadrados.map(element => {
            element.positionCambioX.push(Math.round(cabeza.html.getBoundingClientRect().left));
            element.positionCambioY.push(Math.round(cabeza.html.getBoundingClientRect().top));
            element.directionFutura.push(cabeza.direction);
            })
    }

    function comprovarPosicion(): void{
        cuadrados.map(elemento =>{
            if((Math.round(elemento.html.getBoundingClientRect().top) == elemento.positionCambioY[1]) && (Math.round(elemento.html.getBoundingClientRect().left) == elemento.positionCambioX[1])){
                elemento.positionCambioX.splice(0,1);
                elemento.positionCambioY.splice(0,1);
                elemento.direction = elemento.directionFutura[1];
                elemento.directionFutura.splice(0,1);
            };
        });
    };

    function comprovarBordesCabeza(): void{
        if(cabeza.html.getBoundingClientRect().top >= (height)){
            cabeza.html.style.top = `0px`;
        }else if(cabeza.html.getBoundingClientRect().top < 0){
            cabeza.html.style.top = `${height-10}px`;
        }else if(cabeza.html.getBoundingClientRect().left < 0){
            cabeza.html.style.left = `${width-10}px`;
        }else if(cabeza.html.getBoundingClientRect().left > width){
            cabeza.html.style.left = `${0}px`;
            //console.log(`Coordenadas actuales ${Math.round(cabeza.html.getBoundingClientRect().left)}, ${cabeza.html.getBoundingClientRect().top}, y direccion: ${cabeza.direction}`)
        }
    }

    function comprovarBordesCuerpo(): void{
        for(let i=0; i<cuadrados.length; i++){
            if(cuadrados[i].html.getBoundingClientRect().top >= (height)){
                cuadrados[i].html.style.top = `0px`;
            }else if(cuadrados[i].html.getBoundingClientRect().top < 0){
                cuadrados[i].html.style.top = `${height-10}px`;
            }else if(cuadrados[i].html.getBoundingClientRect().left < 0){
                cuadrados[i].html.style.left = `${width-10}px`;
            }else if(cuadrados[i].html.getBoundingClientRect().left > width){
                cuadrados[i].html.style.left = `${0}px`;
            }
        }
    }

    function stop(): void{
        clearInterval(controlGame);
    };

    function reiniciar(): void{
        stop();
        start();
    };

    start();
}();

