$("#tbl-points").html('<img src="http://istudiogame.com/images/ajax-document-loader.gif"/>');

$.ajax( "http://localhost/Proyectos/clickerServer/gam.html")
  .done(function() {
    $('#tbl-points').load("http://localhost/Proyectos/clickerServer/gam.html");
    inicio();
  })
  .fail(function() {
    $("#tbl-points").html('<div class="error">Lo sentimos no cuenta con internet..</div>');
  });
 

$("#return-game").click(function() {
	salida();
});