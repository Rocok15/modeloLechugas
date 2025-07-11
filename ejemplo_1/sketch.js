// Add some header info
// For TM template code


/*
Este código utiliza la biblioteca de ml5.js para implementar un modelo de clasificación de
imágenes en tiempo real usando Teachable Machine de Google.
 */



/*
Declaración de variables globales 
*/
let video; // Variable que almacenará el flujo de video de la cámara.
let classifier; //Variable que almacenará el clasificador de imágenes basado en el modelo de Teachable Machine.
let modelLoaded = 'https://teachablemachine.withgoogle.com/models/KkZgXMEfu/'; // URL de modelo preentrenado alojado en Teachable Machine.
let label = 'esperando...'; //Texto inicial que se mostrará mientras el modelo procesa la imágen.
let flippedVideo;

/* 
Paso 1: Cargar el modelo antes de ejecutar el programa
*/
function preload(){ //Función especial en p5.js que se ejecuta antes de setup(), permitiendo cargar archivos o modelos antes de que inicie la ejecución principal.
  classifier = ml5.imageClassifier(modelLoaded+"model.json"); //Carga el modelo de clasificación alojado en la URL almacenada en modelLoaded.
}


/*
Paso 2: Configurar el entorno y capturar video 
*/
function setup() {
  canvas = createCanvas(1080, 720); //Crea un lienzo (canvas) de 640x520 píxeles donde se dibujará el video y las etiquetas de clasificación.
  canvas.center(); //Esta línea centra el lienzo automáticamente en la página.
  video = createCapture(VIDEO); //Captura video en vivo desde la cámara.
  video.size(1080,720);
  video.hide(); //Oculta el elemento HTML del video para dibujarlo manualmente en el lienzo.
  classifyVideo(); //Llama a la función clasifyVideo() para iniciar el proceso de clasificación de video.
}

/*
Paso 5: Dibujar en pantalla.
Debe estar siempre presente draw y setup.
 */
function draw() {
  background(0); //Pinta el fondo de negro en cada fotograma para evitar rastros.
  imageMode(CENTER);
  // Voltea el video horizontalmente (espejo)
  flippedVideo = ml5.flipImage(video);
  // Muestra el video volteado
  image(flippedVideo, width/2, height/2);
  // Libera memoria del objeto temporal flipImage
  flippedVideo.remove();
  //image(video, width/2, height/2, 1080, 720); //Dibuja el video en el lienzo en la posición (width/2,heigth/2). Se redimensiona el video a 640 y 520
  textSize(30); //Establece el tamaño del texto.
  textAlign(CENTER, CENTER); //Centra el texto horizontalmente y verticalmente.
  fill(255); //Cambia el color del texto a blanco
  text(label, width / 2, height-30); //Muestra la etiqueta del objeto clasificado en la parte inferior de la pantalla.
}

/*
Paso 3 (Continuación): Clasificar el video
*/
function classifyVideo() {
  classifier.classify(video, gotResults); //Usa el modelo cargado en classifier para clasificar el video en tiempo real y llamar a gotResults() cuando tenga una respuesta.
  //Se utiliza gotResult para que javascript no dee error por la demora en la captura del video.
}


/*
Paso 4: Obtener los resultados de la clasificación
La respuesta se va a demorar un par de segundos por ende es necesario la función gotresults
*/
function gotResults(error, results) { //Esta función se ejecuta cada vez que el modelo clasifica un cuadro de video.
  if (error) { //Si ocurre un error, se imprime en la consola y la función termina con return.
    console.error(error);
    return; //Finaliza la ejecución de la función y devuelve un valor de la función que se llamó
  }
  console.log(results);
  //console.log(results[0].label);
  label = results[0].label;
  classifyVideo();
  /*
  Se muestra el resultado en la consola y se guarda la etiqueta más probable
  (results[0].label en la variable label)
  */
}




/*
Resumen del flujo de ejecución
1.-preload(): Carga el modelo de clasificación antes de ejecutar el programa.

2.-setup():

  Crea el lienzo.

  Captura el video desde la cámara.

  Inicia la clasificación con classifyVideo().

3.-classifyVideo(): Envía los cuadros del video al modelo y espera la respuesta en gotResults().

4.-gotResults():

  Si hay un error, lo imprime en la consola.

  Si hay una clasificación, actualiza la variable label con la categoría detectada.

5.-draw():

  Dibuja el video en el lienzo.

  Muestra la clasificación en pantalla.

Este código permite clasificar objetos en tiempo real utilizando la cámara del dispositivo.
 */

