var game: void = function(): void{

    var time: number = 100;
    var controlGame: number;
    var direccion: number = 2;
    var movimiento: number = 10;

    type cuadrado = {
        name: string,
        positionY: number;
        positionX: number;
        direction: number;
        html: HTMLDivElement;
    }

    var cuadrados: cuadrado[] = [];

    for(let i=0; i<8;i++){
        let cuadrado: cuadrado = {
            name: `c${i+1}`,
            positionX: 0,
            positionY: 0,
            direction: 0,
            html: document.getElementById(`c${i+1}`) as HTMLDivElement
        }
        cuadrados.push(cuadrado)
    }

    function start(): void{
        init(); 
        controlGame = setInterval(play,time)
    };

    function init(): void{
        for(let i=0;i<cuadrados.length; i++){
            cuadrados[i].html.style.left = `${(10 * cuadrados.length)-(10*i)}px`
            cuadrados[i].html.style.top = `${10}px`
        }
        
    };

    function play(): void{
        switch(direccion){
            case 1://derecha
                for(let i=0; i<cuadrados.length;i++){
                cuadrados[i].html.style.left = `${cuadrados[i].html.getBoundingClientRect().left+movimiento}px`
                }
                break;
            case 2://abajo
                for(let i=0; i<cuadrados.length;i++){
                cuadrados[i].html.style.top = `${cuadrados[i].html.getBoundingClientRect().top+movimiento}px`
                }
                break;
            case 3://izquierda
                for(let i=0; i<cuadrados.length;i++){
                cuadrados[i].html.style.left = `${cuadrados[i].html.getBoundingClientRect().left-movimiento}px`
                }
                break;
            case 4://arriba
                for(let i=0; i<cuadrados.length;i++){
                cuadrados[i].html.style.top = `${cuadrados[i].html.getBoundingClientRect().top-movimiento}px`
                }
                break;
            case 5:
                break;
        }
    }

    document.onkeydown = function(e){
        e = e || window.event;
        if(e.key == "ArrowUp"){
            direccion=4;
        console.log(e.key)
        }
        if(e.key == "ArrowDown"){
            console.log(e.key)
            direccion=2;
        }
        if(e.key == "ArrowRight"){
            console.log(e.key)
            direccion=1;
        }
        if(e.key == "ArrowLeft"){
            console.log(e.key)
            direccion=3;
        }
        if(e.key == " "){
            direccion=5;
            console.log(e.key)
        }
            
    }



    start();
}();

