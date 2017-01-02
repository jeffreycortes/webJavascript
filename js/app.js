  /*
  Desarrollado por: Jeffrey Cortés
  Correo: jeffry.cortes@gmail.com
  */
  //Objeto Calculadora
  var Calculadora = (function(window){
  //Propiedades
  var display = document.getElementById("display");
  var num1 = 0, num2 = 0;
  var numeros = /^[0-9]$/;
  var listOperaciones = /^\-|\*|\+|\/$/;
  var operacion = "";
  var operacionReady = false;
  var resultado = 0;
  //Metodos
  function showResultado(){
    return String(resultado).substr(0, 8);
  }
  function sumar(){
    resultado = num1 + num2;
    return showResultado();
  }

  function restar(){
    resultado = num1 - num2;
    return showResultado();
  }

  function multiplicar(){
    resultado = num1 * num2;
    return showResultado();
  }

  function dividir(){
    resultado = num1 / num2;
    return showResultado();
  }

  function addNumber(number){
    //Permite el ingreso de números en la calculadora
    if (display.innerText==0 && display.innerText.length==1){
      display.innerText = "";
    }
    if (display.innerText.length <= 7){
      display.innerText += number;
    }
  }

  function addSign(){
    var value = display.innerText;
    if(value.substr(0, 1) != "-" && value != "0"){
      display.innerText = "-" + value;
    }
    else{
      display.innerText = display.innerText.replace("-", "");
    }
  }

  function addSignFloat(){
    var charIn = display.innerText.indexOf(".", 0);
    if(charIn < 0 && display.innerText.length <= 6){
      display.innerText += ".";
    }
  }

  function clear(){
    //Borra todo el contenido de display
    display.innerText = "0";
    operacion = "";
    operacionReady = false;
  }

  function deleteNumber(){
    //Borra números de a 1 digito
    if(display.innerText.length -1 == 0){
      display.innerText = "0";
    }
    else{
      display.innerText = display.innerText.substr(0, (display.innerText.length -1));
    }
  }

  function Operacion_Ready(operacionR){
    num1 = parseFloat(display.innerText);
    operacion = operacionR;
    display.innerText = "";
    if(!operacionReady){
     operacionReady = true;
    }
    else if(operacionReady){
      num2 = (display.innerText.length == 0)?(0):(parseFloat(display.innerText));
      Calculadora_OperacionSubmit();
    }
  }

  function Operacion_Resultado(){
    //Muestra el resultado de la operación si existe
    if(listOperaciones.test(operacion) && display.innerText.length > 0){
      if(operacionReady){
        num2 = parseFloat(display.innerText);
        Calculadora_OperacionSubmit();
        operacionReady = false;
      }
      else if(display.innerText.length > 0){
        num1 = parseFloat(display.innerText);
        Calculadora_OperacionSubmit();
      }
    }
  }

  function Calculadora_OperacionSubmit(){
    //Realiza la operación
    switch(operacion){
      case "+":
        display.innerText = sumar(num1, num2);
      break;
      case "-":
        display.innerText = restar(num1, num2);
      break;
      case "*":
        display.innerText = multiplicar(num1, num2);
      break;
      case "/":
        display.innerText = dividir(num1, num2)
      break;
    }
  }

  return {
    LoadListenerKeyPress: function(e){
      /*Function que inicializa la captura de teclas para el funcionamiento de la
      calculadora */
      if(e.key=="."){
        addSignFloat();
      }
      else if(e.charCode >=48 && e.charCode <=57){
        //Permite el ingreso de números en la calculadora
        addNumber(e.key);
      }
      else if(e.keyCode == 8){
        deleteNumber();
      }
      else if(e.keyCode == 46){
        clear();
      }
      else if (listOperaciones.test(e.key)){
        Operacion_Ready(e.key);
      }
      else if((e.keyCode == 13 || e.key=="=")){
        Operacion_Resultado();
      }
    }
    ,Load_ListenerClick: function(e){
      //Eventos click para los botones
      var teclaId = this.id;
      var numerosExp = /^[0-9]$/;
      var nameToOperacion = {"dividido":"/", "por":"*", "menos":"-", "mas":"+"}
      if(teclaId == "on"){
        clear();
      }
      else if(teclaId=="punto"){
        addSignFloat();
      }
      else if(teclaId=="sign"){
        addSign();
      }
      else if(numerosExp.test(this.id)){
        addNumber(this.id);
      }
      else if(nameToOperacion[teclaId] != undefined){
        Operacion_Ready(nameToOperacion[teclaId]);
      }
      else if(teclaId =="igual"){
        Operacion_Resultado();
      }
    }
    , Init: function(){
        //Aignación del listener del evento Keypress
        document.addEventListener("keypress", this.LoadListenerKeyPress, false);
        //Objetos html con clase teclas
        var teclas = document.querySelectorAll(".tecla");
        //Se asigna listener para evento click en imagenes
        for(i=0; i < teclas.length; i++){
          teclas[i].addEventListener("click", this.Load_ListenerClick, false);
        }
    }
  }
})(window, 0, 0).Init();
