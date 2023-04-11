var game: void = function(): void{

    var time: number = 500;
    var controlGame: number;
    var movimiento: number = 10;
    var direccionAnteriorPausado: number = 1;
    var pausado: number = 1; 

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
        controlGame = setInterval(play,time)
    };

    function init(): void{
        cabeza.html.style.left = `${(10 * (cuadrados.length+1))}px`
        cabeza.html.style.top = `${10}px`

        for(let i=0;i<cuadrados.length; i++){
            cuadrados[i].positionX = (10 * cuadrados.length)-(10*i);
            cuadrados[i].positionY = 10;
            cuadrados[i].html.style.left = `${cuadrados[i].positionX}px`;
            cuadrados[i].html.style.top = `${cuadrados[i].positionY}px`;
        }
    };

    function play(): void{
        moverCabeza();
        moverCuerpo();
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
            
    }

    function moverCabeza(): void{
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
        if(cabeza.direction != 5) comprovarPosicion();
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
        //    console.log(cuadrados[0].directionFutura)
        //    console.log(cuadrados[0].positionCambioX)
        //    console.log(cuadrados[0].positionCambioY)
        //cuadrados.map(element => console.log(element.positionCambioX))
        //cuadrados.map(element => console.log(element.positionCambioY))
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


    start();
}();

