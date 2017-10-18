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

  discon_text = $("#connect_btn").html()
  if (discon_text.indexOf("Connected") >= 0){
    $("#connect_btn").html(data["connected"])
  }else if (discon_text.indexOf("Disconnected") >= 0){
     $("#connect_btn").html(data["disconnected"])
  }

  $("#translations").html(data["translations"])
  $("#door").html(data["door"])

  $("#job_name").attr("placeholder", data["load_import_job"])
  $("#job_submit").html(data["send_to_lasersaur"])
  $("#recent_jobs").html(data["recent_jobs"])
  $("#library_jobs").html(data["library_jobs"])
  $("#clear_queue").html(data["clear"])
  $("#job_save_to_queue").attr("data-original-title", data["add_to_queue_2"])
  $("#pause_btn").attr("data-original-title", data["pause_continue"])
  $("#go_to_origin").attr("data-original-title", data["move_origin"])
  $("#homing_cycle").attr("data-original-title", data["running_home_cycle_find_table_origin"])
  $("#cancel_btn").attr("data-original-title", data["stop_and_purge_job"])
  $("#file_import_btn").html(data["import"])
  $("#supported_file").html(data["supported_file_formats_are"])
  
  $("#import_to_queue").html(data["add_to_queue"])
  
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