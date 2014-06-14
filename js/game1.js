/*$('#big-btn').on("vmousedown",function() {

			 $(this).css('box-shadow', '1px 5px 0px #434144');
					$(this).css('top', '3px');
					

			}).on("vmouseup",function() {
			$(".btn-menu").css('box-shadow', '1px 10px 0px #434144');
						$(".btn-menu").css('top', '0px');

			});*/


var clicks=0;
var balloones=0;
var BallTable=document.getElementById('ballones');
var ClicksTable=document.getElementById('ClicksButton');



	ClicksTable.innerHTML=clicks;
	mostrar();
	$('#big-btn').on("vmousedown", clickButton).on("vmouseup",function() {
			
			$(".btn-menu").css('box-shadow', '1px 10px 0px #434144');
						$(".btn-menu").css('top', '0px');

			});;


function clickButton () {
/* 
	Efecto css
*/
 $(this).css('box-shadow', '1px 5px 0px #434144');
					$(this).css('top', '3px');

	clicks+=1;
	if(clicks==10){
		GuardarGlobos()
		//balloones+=1;
		mostrar();
	    clicks=0;
	}
	ClicksTable.innerHTML=clicks;
	
}


function mostrar () {
	
db.transaction(function (tx) {

  tx.executeSql('SELECT balloon FROM tblballoones where id=1 ', [], function (tx, results) {
   var len = results.rows.length, i;

   for (i = 0; i < len; i++){
     BallTable.innerHTML= results.rows.item(i).balloon;
   }
 }, null);
  
});
}


function GuardarGlobos () {
	db.transaction(function (tx) {
	tx.executeSql('UPDATE tblballoones set balloon= balloon + 1 where id=1');
});
}

