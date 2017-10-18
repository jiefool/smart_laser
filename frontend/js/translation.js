$(document).ready(function(){
  loadTranslateFile()
})

function initTranslation(translation){
  document.cookie = "language="+translation;
  loadTranslateFile()
}

function loadTranslateFile(){
  var language = getCookie("language");
  switch(language){
    case "english":
      getFileContent("english")
      break
    case "bisaya":
      getFileContent("bisaya")
      break
  }
}

function getFileContent(filename){
  var file_data; 
  jQuery.get('/translations/'+filename+'.json', function(data) {
    translateText(data)
  });
}

function translateText(data){
  $("#tab_jobs_button_text").text(data["laser_jobs"])
  $("#tab_import_button_text").text(data["file_import"])
  $("#tab_mover_button_text").text(data["move_jog"])
  $("#tab_logs_button_text").text(data["logs"])
  $("#connect_btn").html(data["disconnected"])
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}