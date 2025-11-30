function drowBoard(container_class, height, width) {
    let amount = height * width;
    for (let i = 1; i <= amount; i++) {
        let block = generateBoardBlock();
        if (container_class === '.boards__container--small') {
            block.classList.add('miniBlock');
        }

        document.querySelector(container_class).appendChild(block);
    }
}
function generateBoardBlock() {
    let block = document.createElement('div');
    block.classList.add(`block`);
    let smallBlock = document.createElement('div');
    smallBlock.classList.add(`smallBlock`);
    block.appendChild(smallBlock);
    return block;
}

const BOARD_WIDTH = 10;
const BOARD_WIDTH__mini = 4;




function createArrTetrominoe(width) {
    //crear palito  0
    const I = [[0, 1, 2, 3], [0, 0 + width, 0 + 2 * width, 0 + 3 * width]];
    // crear L  1
    const L = [[0, 1, 2, 0 + width], [1, 2, 2 + width, 2 + 2 * width], [0 + width, 1 + width, 2 + width, 2], [1, 1 + width, 1 + 2 * width, 2 + 2 * width]];
    // crear S  2
    const S = [[0 + width, 1 + width, 1, 2], [0, 0 + width, 1 + width, 1 + 2 * width]];
    // crear Z  3
    const Z = [[0, 1, 1 + width, 2 + width], [1, 1 + width, 0 + width, 0 + 2 * width]];
    // crear J 4
    const J = [[0, 1, 2, 2 + width], [1, 1 + width, 1 + 2 * width, 2 * width], [0, width, 1 + width, 2 + width], [0, 1, width, 2 * width]];
    // crear Q  5
    const Q = [[0, 1, 0 + width, 1 + width]];
    // const Q = [[0, 1, 0+BOARD_WIDTH, 1+BOARD_WIDTH], [0, 1, 0+BOARD_WIDTH, 1+BOARD_WIDTH]]; para pruebas por el índice
    // crear T  6
    const T = [[0, 1, 2, 1 + width], [1, 0 + width, 1 + width, 1 + 2 * width], [1, 0 + width, 1 + width, 2 + width], [0, 0 + width, 1 + width, 0 + 2 * width],];
    const tetrominos = [I, L, S, Z, J, Q, T];
    return tetrominos;
}

const tetrominos = createArrTetrominoe(BOARD_WIDTH);        //array de tetrominos para board-big
const tetrominos__small = createArrTetrominoe(BOARD_WIDTH__mini); //array de tetrominos para board-mini

function init() {
    document.querySelector('.boards__container--big').textContent = '';
    document.querySelector('.boards__container--small').textContent = '';
    drowBoard('.boards__container--big', 20, BOARD_WIDTH);
    drowBoard('.boards__container--small', 4, BOARD_WIDTH__mini);
    currentPosition = 3;
    aleatTetrominoe = generateRandomTetrominoe(tetrominos); // genero el objeto tetromino
    currentRotation = 0;  //rotacion actual del tetromino
    currentTetromino = tetrominos[aleatTetrominoe.positionAtTetrominoeList][currentRotation];
    //tetromino en la posicion actual
    currentTetrominoNext = tetrominos[aleatTetrominoe.positionAtTetrominoeList][currentRotation]
    aleatTetrominoeMini = tetrominos__small[aleatTetrominoe.positionAtTetrominoeList][0]; //se crea el tetromino aleatorio para el mini board
    aleatTetrominoe2 = aleatTetrominoe;
    drawTetrominoeInMainBoard(currentTetromino);
    drawTetrominoeInMiniBoard(aleatTetrominoeMini);
    results = 0;
    drawScore();
    gameLoop();
}



let currentPosition;
let aleatTetrominoe; // genero el objeto tetromino
let currentRotation;  //rotacion actual del tetromino
let currentTetromino;
//tetromino en la posicion actual

let aleatTetrominoe2;
let currentTetrominoNext;


let aleatTetrominoeMini; //se crea el tetromino aleatorio para el mini board




function generateRandomTetrominoe(tetrominoe_arr) {     //le paso un array de tetrominoe
    const position = Math.floor((Math.random() * (7 - 0) + 0));
    const aleat = tetrominoe_arr[position];
    const obj = {
        positionAtTetrominoeList: position,     // la posición que ocupa en la lista original de tetrominos
        piece: aleat[0],    // La lista de posiciones de la rotación actual (en este caso la inicial)
        position: aleat[0][0], // La posición actual de la pieza en el tablero (al inicio estaráen la fila 0, columna mitad del tablero)
        rotation: 0, //el índice de la rotación actual de la pieza
    };
    return obj;
}

// function drawTetrominoeInMainBoard(tetrominoeObj) {
//     for (let i=0; i<4;i++){
//         document.querySelectorAll('.block')[tetrominoeObj.piece[i]+currentPosition].classList.add('printBlock');
//     }
// }
// function undrawTetrominoeInMainBoard(tetrominoeObj) {
//     for (let i=0; i<4;i++){
//         document.querySelectorAll('.block')[tetrominoeObj.piece[i]+currentPosition].classList.remove('printBlock');
//     }
// }
const boardArray = document.querySelectorAll('block');       //los 200 bloques

function drawTetrominoeInMainBoard(tetrominoe) {
    for (let i = 0; i < 4; i++) {
        document.querySelectorAll('.boards__container--big  > .block ')[tetrominoe[i] + currentPosition].classList.add('printBlock');
    }
}

function undrawTetrominoeInMainBoard(tetrominoe) {
    for (let i = 0; i < 4; i++) {
        document.querySelectorAll('.boards__container--big > .block')[tetrominoe[i] + currentPosition].classList.remove('printBlock');
    }
}


function drawTetrominoeInMiniBoard(tetrominoeObj) {
    for (let i = 0; i < 4; i++) {
        document.querySelectorAll('.miniBlock')[tetrominoeObj[i]].classList.add('printBlock');
    }
}

function undrawTetrominoeInMiniBoard(tetrominoeObj) {
    for (let i = 0; i < 4; i++) {
        document.querySelectorAll('.miniBlock')[tetrominoeObj[i]].classList.remove('printBlock');
    }
}

function isRigthBoardOut() {
    return currentTetromino.some((block) => (block + 1 + currentPosition) % 10 === 0)
}
function isRigthBoardOutRotate() {
    return currentTetromino.some((block) => (block + currentPosition) % 10 === 0)
}
function isLeftBoardOut() {
    return currentTetromino.some((block) => (block + currentPosition) % 10 === 0)
}
function isLeftBoardOutRotate() {
    return currentTetromino.some((block) => (block + currentPosition - 1) % 10 === 0)
}
function isBottonBoardOut() {
    return currentTetromino.some((block) => (block + currentPosition + BOARD_WIDTH) >= 200)
}


// CARGAR TODOS LOS AUDIOS//

const sonidoError = new Audio('song/error-rotar.mp3');
const sonidoRotar = new Audio('song/rotar.mp3');
const sonidoGameOver = new Audio('song/game-over.mp3');
const sonidoLinea = new Audio('song/completar-linea.mp3');
const sonidoTetris = new Audio('song/tetris-cuatro.mp3');
const sonidoPrincipal = new Audio('song/principal.mp3');


function moveRigth() {
    if (isRigthBoardOut()) {
        sonidoError.play();
    } else {
        undrawTetrominoeInMainBoard(currentTetromino);
        currentPosition++;
        if (tetrominoeVerification()) {
            currentPosition--;
        }
        drawTetrominoeInMainBoard(currentTetromino);
    }
}
function moveLeft() {
    if (isLeftBoardOut()) {
        sonidoPrincipal.pause();
        sonidoError.play().then(() => sonidoPrincipal.play());

    } else {
        undrawTetrominoeInMainBoard(currentTetromino);
        currentPosition--;
        if (tetrominoeVerification()) {
            currentPosition++;
        }
        drawTetrominoeInMainBoard(currentTetromino);
    }
}
function moveDown() {
    let comprobacion = true;
    if (isBottonBoardOut()) {

    } else {
        undrawTetrominoeInMainBoard(currentTetromino);
        currentPosition += BOARD_WIDTH;
        if (tetrominoeVerification()) {
            currentPosition -= BOARD_WIDTH;
            comprobacion = false;
        }
        drawTetrominoeInMainBoard(currentTetromino);
        return comprobacion;
    }
}

function rotate() {
    let comprobation = true;
    let yaSono = false;
    const currentRotationnOLd = currentRotation;
    undrawTetrominoeInMainBoard(currentTetromino);
    if (currentRotation < tetrominos[aleatTetrominoe2.positionAtTetrominoeList].length - 1) {//si hay + posiciones para rotar
        currentRotation++;
    } else {
        currentRotation = 0;
    }
    currentTetromino = tetrominos[aleatTetrominoe2.positionAtTetrominoeList][currentRotation];

    if (currentPosition < 5) {
        comprobation = isLeftBoardOutRotate();
    } else {
        comprobation = isRigthBoardOutRotate();
    }
    if (tetrominoeVerification() || comprobation || isBottonBoardOut()) {
        sonidoError.play();
        currentRotation = currentRotationnOLd;
        currentTetromino = tetrominos[aleatTetrominoe2.positionAtTetrominoeList][currentRotation];
        yaSono = true;
    }
    drawTetrominoeInMainBoard(currentTetromino);
    if (!yaSono) {
        sonidoRotar.play();
    }

}


//TODO LO DE ABAJO DE MOMENTO ES PARA PRUEBAS

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    switch (event.key) {
        case ' ':
            rotate();
            break;
        case 'ArrowUp':
            rotate();
            break;
        case 'ArrowRight':
            moveRigth();
            break;

        case 'keydown':
            moveRigth();
            break;

        case 'ArrowLeft':
            moveLeft();
            break;

        case 'ArrowDown':
            moveDown();
            break;

        default:
        //Poner sonido fallo

    }
});


function tetrominoeVerification() {
    const boardArr = document.querySelectorAll('.block');
    return currentTetromino.some(e => boardArr[e + currentPosition].classList.contains('printBlock'));

}


function createAndDrawNewTetromino() {
    currentRotation = 0;                  //reinicia la rotacion
    currentTetromino = currentTetrominoNext; //cambia el tetromino por el siguiente a imprimir
    currentPosition = 3;        // posicion de origen del nuevo tetromino
    if (!gameOver()) {
        drawTetrominoeInMainBoard(currentTetromino); // pinta el tetromino nuevo
        aleatTetrominoe2 = aleatTetrominoe; //guardo el objeto del tetrominoe actual, para poder seguir rotandolo
        aleatTetrominoe = generateRandomTetrominoe(tetrominos); // crea el objeto del tetrominoe aleatorio
        currentTetrominoNext = tetrominos[aleatTetrominoe.positionAtTetrominoeList][currentRotation] //crea el proximo tetromino
        undrawTetrominoeInMiniBoard(aleatTetrominoeMini); //despinta el tetrominoe del cuadro pequeño
        aleatTetrominoeMini = tetrominos__small[aleatTetrominoe.positionAtTetrominoeList][0]; //se crea el tetromino aleatorio para el mini board
        drawTetrominoeInMiniBoard(aleatTetrominoeMini); // pinta el tetromino del mini board
    }
}

let stop;
let speed = 1000;
function gameLoop() {
    stop = setInterval(() => {     //para parar el setInterval es clearInterval(stop)
        if (currentTetromino.some((block) => (block + currentPosition + BOARD_WIDTH) > 200) || !moveDown()) {
            updateTetrisBoard()
            createAndDrawNewTetromino();
        }
    }, speed);
}


document.addEventListener('keydown', (event) => {
    if (event.key === 'p') {
        clearInterval(stop);
    }
    if (event.key === 'Enter') {
        gameLoop();
    }
})

function subirVelocidad(){
    if (results > 3500){
        speed = 200;
        clearInterval(stop);
        gameLoop();
    }else if (results > 3000){
        speed = 400;
        clearInterval(stop);
        gameLoop();
    } else if (results > 2000){
        speed = 600;
        clearInterval(stop);
        gameLoop();
    } else if (results > 1000){
        speed = 700;
        clearInterval(stop);
        gameLoop();
    }
}


function gameOver() {
    subirVelocidad();
    if (isGameOver()) { // se llama a la funcion isGameOver
        speed = 1000;
        let noRepeat = true;
        let principalGame = document.getElementById('boards__container--big') // traigo el board big y lo meto adentro de la variable principalGame
        principalGame.innerHTML = '';  // Borra el principalGame
        let imgGameOver = document.createElement('img');  // se crea un tag IMG y se mete adentro de la variable imgGameOver
        imgGameOver.src = "img/gameoverphrase.jpg"; // se coloca la foto png dentro de imgGameOver
        imgGameOver.classList.add('img_game-over'); // se le agrega la clase a la img
        principalGame.classList.add('fondoNegro');
        principalGame.appendChild(imgGameOver); // se agrega la imagen al board principal
        let puntuacion = document.createElement('p');
        puntuacion.textContent = 'Su puntuación fue de: ' + results;
        puntuacion.classList.add('puntuacion');
        let instructionClick = document.createElement('p');
        instructionClick.classList.add('instruction');
        instructionClick.textContent = 'Haga click para volver a jugar'
        principalGame.appendChild(puntuacion);
        principalGame.appendChild(instructionClick);

        if (results > localStorage.getItem('puntos')) {
            localStorage.setItem('puntos', results);
        }
        sonidoPrincipal.pause();
        sonidoGameOver.play();

        document.body.addEventListener('click', (e) => { // se agrega un listener al body para que se ejecute la funcion init
            if (noRepeat) {
                clearInterval(stop);
                principalGame.classList.remove('fondoNegro');
                sonidoPrincipal.play();
                init();
            }
            noRepeat = false;
        })
        return true;
    } return false;
}

let results = 0;
function drawScore() {
    let counterDiv = document.querySelector('.counter');
    let counterDivResults = document.createElement('p');
    counterDiv.innerHTML = '';
    counterDivResults.textContent = results;
    counterDiv.appendChild(counterDivResults);
}

function updateTetrisBoard() {
    let contador = 0;
    let container = document.querySelector('.boards__container--big');
    let boardArr = Array.from(document.querySelectorAll('.boards__container--big > .block'));
    for (let i = 0; i < 200; i += BOARD_WIDTH) {         //recorro cada fila
        const fila = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

        if (fila.every(indice => boardArr[indice].classList.contains('printBlock'))) { //compruebo si están todas pintadas

            fila.forEach(a => boardArr[a].classList.remove('printBlock')) //borro la clase q pinta cada fila

            let arrayRemove = boardArr.splice(i, BOARD_WIDTH);  //borro la fila
            boardArr = arrayRemove.concat(boardArr);           //agrego las filas pintadas al principio del array
            container.innerHTML = '';                     // vacío el contenedor
            boardArr.forEach(block => container.appendChild(block)); // agrego uno por uno los bloques

            results += 50;  // sumo puntos
            drawScore();       // muestro los puntos 
            contador++;
        }
    }
    if (contador < 4 && contador > 0) {
        sonidoPrincipal.pause();
        sonidoLinea.play().then(setTimeout(() => sonidoPrincipal.play(), 500))
    } else if (contador >= 4) {
        results += 1000;
        sonidoPrincipal.pause();
        sonidoTetris.play().then(setTimeout(() => sonidoPrincipal.play(), 500))
        drawScore();
    }
};

function isGameOver() {
    if (tetrominoeVerification()) {
        clearInterval(stop);
        return true;
    } else {
        return false;
    }
}


function buttonStart() {
    let btn = document.createElement('button');
    btn.classList.add('button');
    btn.textContent = 'Start';
    document.querySelector('.boards__container--big').appendChild(btn);
    btn.addEventListener('click', () => {
        init()
        sonidoPrincipal.loop = true;
        sonidoPrincipal.play();
    })
    let maxScoreContainer = document.createElement('div');
    let maxScore = document.createElement('h2')
    maxScoreContainer.classList.add('maxScoreContainer');
    maxScore.classList.add('maxScore');
    maxScore.textContent = 'La máxima puntuación es de: ' + localStorage.getItem('puntos') + ' puntos';
    maxScoreContainer.appendChild(maxScore);
    document.querySelector('.boards__container--big').appendChild(maxScoreContainer);

}

if (localStorage.getItem('puntos') === null) {
    localStorage.setItem('puntos', 0);
}

buttonStart();

const btnLeft = document.querySelector('.button--left');
btnLeft.addEventListener('click', () => moveLeft());
const btnRotate = document.querySelector('.button--rotate');
btnRotate.addEventListener('click', () => rotate());
const btnRight = document.querySelector('.button--rigth');
btnRight.addEventListener('click', () => moveRigth());
const btnDown = document.querySelector('.button--down');
btnDown.addEventListener('click', (e) => {
    e.preventDefault();
    moveDown()
} );


//init();  Cambiar esto por el botón que llama a esta función (importante que sea en esta línea)