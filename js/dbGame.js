var db = openDatabase('dbgame', '1.0', 'Test DB', 2 * 1024 * 1024);

var msg;
db.transaction(function (tx) {

  tx.executeSql('CREATE TABLE IF NOT EXISTS tblballoones (id INTEGER PRIMARY KEY, balloon  INTEGER affinity )');
  agregarUser(); 
  msg = '<p>Log message created and row inserted.</p>';
  
});



function agregarUser () {

 db.transaction(function (tx) {
   
   tx.executeSql('SELECT balloon FROM tblballoones', [], function (tx, results) {
    var len = results.rows.length;

    // Comparar si ingreso
    if(len == 0){
   	  tx.executeSql('INSERT INTO tblballoones (balloon) VALUES (0)');
   }else{
   	
  }
 }, null);
});
		
}