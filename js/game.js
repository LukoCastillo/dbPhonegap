var Score=0;
var Limit=10;
var level=1;
var timmer=0;
var Aumento=1;

var nuuu=0;

var myvarTime=null;
/*
*  Funcion aumentar Score
*/ 
 var numwidth=20;
function clickMe(){
  
	  Score+=Aumento;
	   
	 //numwidth+=1;
	  ScoreClick.innerHTML= Score.toFixed(2);	
	//  globo.style.width=numwidth+"px";
	 // globo.style.height=numwidth+"px";
	if(Score >= Limit){
		return true;
	}
	
}



/*
***  Bloquear click
*/
function stopclick (boton) {
	$( "#button1" ).unbind( 'tap', onTap );
	//boton.removeEventListener('click',arguments.callee,false);
}

/*
***  Cambio de nivel
*/

function changelevel(){
	level+=1;
    stopclick(button1);
	//alert('Time '+timmer+' ms');
	nivel.innerHTML=level;
	newlevel();
}
function retry(){
	Score=0;
	numwidth=20;
	Limit=Limit;
	timmer=0;
	ScoreLimit.innerHTML=Limit;
    ScoreClick.innerHTML=Score;
    timerStar();
    msj.style.display="none";
    $("#msjWin").css("display","none");
}
/*
***  Nuevo nivel
*/
function newlevel () {
	Score=0;
	Limit+=5;
	timmer=0;
	numwidth=20;
	ScoreLimit.innerHTML=Limit;
    ScoreClick.innerHTML=Score;
    timerStar();
    msj.style.display="none";
        $("#msjWin").css("display","none");
}

/* 
***  Funcion de tiempo
*/
var mycon= null;
function timerStar() {

var numeroC=0;

 mycon=setInterval(function(){

	 Contador(mycon,numeroC);

	 numeroC+=1;
	 
	 if (numeroC == 451) {
	 	//alert('hola');
	 	numeroC=0;
		 clicker(button1);
         myvarTime=setInterval(function(){
         	console.log(timmer);
		 timmer+=1;
       },1);
	}else{
		//stopclick(button1);
	}
},1);
	
	
/*
 funcion para detener reloj
*/
}
function timerStop() {

	clearInterval(myvarTime);
}


function mensaje(nivel,time){
msj.style.display="block";
msj.innerHTML="<div id=\"contentMsj\" ><h3>Level: "+nivel+"</h3><p>Time: "+time+"</p><div id=\"botonera\"> <input type=\"button\" value=\"Retry\" onclick=\"retry()\"></input><input type=\"button\" onclick=\"changelevel()\" value=\"Next level\"></input></div></div>";
var UserR=[nivel,time];
return UserR;
}



/* 
*** Control de clicks 
*/
function onTap(event) {
	  if(clickMe()){
	  	 stopclick();
		  var UserResul=mensaje(level,timmer);
		  timerStop();

		  $.get("http://localhost/Proyectos/clickerServer/php/insertScore.php",{
		  	op:"buscar",
		   	UserTime:UserResul[1],
		   	UserLevel:UserResul[0]
		   },
		   function(result){
		   	$("#msjWin").css("display","block");
		   	$("#msjWin").html('<div id="ganaste"><h4>Feliciades eres el numero "'+result+'" del nivel "'+UserResul[0]+'"</h4><label for="UserName">Su nombre:</label>   <input type="text" id="UserName"/><input type="button" value="Enviar" id="btn-registro"></div>');
   			
   			//Funcion click para registrat
	   			EnviarForm (UserResul[1],UserResul[0],result);

  		});

		 
	  }
    }

function clicker (boton) {
	$('#button1').bind('tap', onTap);
}



/*
***  Funcion contador
*/
function Contador(mycon,numeroC) {

	var connt=document.getElementById('contador');
	var numcontad=document.getElementById('numerosContador');
   connt.style.display="block";
    
		if(numeroC==300){
	  		numcontad.innerHTML=1;
		 }else if(numeroC==200){
    		numcontad.innerHTML=2;
 		}else if(numeroC==100){
 			numcontad.innerHTML=3;
		 }else if(numeroC==400){
		 	numcontad.innerHTML="go";
		 	
		 }else if(numeroC==450){
		 	numcontad.innerHTML="";
		 	connt.style.display="none";
		 	clearInterval(mycon);
		 	return true;
		 }

}




function start () {
var globo=document.getElementById('globo');

var msj=document.getElementById('msj');

var ScoreClick=document.getElementById('ScoreClick');
var ScoreLimit=document.getElementById('ScoreLimit');
var nivel=document.getElementById('nivel');
var button1=document.getElementById('button1');


timerStar();
ScoreLimit.innerHTML=Limit;
ScoreClick.innerHTML=Score;
nivel.innerHTML=level;
}
var myinicio;

function inicio() {
	 myinicio=setTimeout(function(){
	 	start();
	    initDB();

	 }
	 	, 1000);
	
}
function salida() {
Score=0;
Limit=10;
level=1;
timmer=0;
timerStop();
clearInterval(mycon);
clearInterval(myvarTime);
clearTimeout(myinicio);
}


	/*
	*
	* Funcion para Guardar en el server
	*/
	

function EnviarForm (Time,Level,posicionU) {
	$('#btn-registro').click(function () {

	        // Enviar informacion al server
	         $.get("http://localhost/Proyectos/clickerServer/php/insertScore.php",{
			   	  op:"agregar",
			   	  UserTime:Time,
		   		  UserLevel:Level,
		   		  posicion:posicionU,
		   		  nombre:$('#UserName').val()
			    }, function(resultado) {
			    	// Resultado del server
			          if(resultado == "fail"){
			          	//Si el nombre existe pasa esto

                       $("#ganaste").html('<h4>Error el nombre de usuario ya existe</h4><label for="UserName">Su nombre:</label>   <input type="text" id="UserName"/><input type="button" value="Enviar" id="btn-registro">');
                       EnviarForm(Time,Level,posicionU);

			    	}else{
			    		//No tiene ningun error pasa esto
			    		$("#ganaste").html(resultado);
			    	}
			    	
			    });

	        	
	        	
	        });
}



	/*
		* Funcion para ver los puntos que tienes en Modo de juego Create
		*
	*/



/** Initialize Database  **/
function initDB(){ 
   Aumento=1;
   selectRow("SELECT balloon FROM tblballoones;", function(pleaseWork) {
     
      Aumento=pleaseWork;
     
        
   });
}  

/** Select Row from Table **/ 
function selectRow(query, callBack){ // <-- extra param
   var result =null;
   db.transaction(function (tx) {
      tx.executeSql(query, [], function(tx, rs){
         for(var i=0; i<rs.rows.length; i++) {
            result = rs.rows.item(i).balloon;
         }
         var Ballones=result;
         var operSegun=Ballones/10;
         var aut=1;
      for(var i=1; i<=operSegun; i++){

      	aut=aut+.125;
      	
      } 
      callBack(aut);

      }, null);
   });

} 