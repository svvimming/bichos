function get_json_path_name() {
  $.get('/bichos', function(data){
    var json_path_name = data.path;
    load_temp_data(json_path_name);
  });
}

function load_temp_data(path) {
  $.get(path, function(data) {
    temp_data = data;
    var tareX = temp_data.path[0].x;
    var tareY = temp_data.path[0].y;
    for(let i=0; i<temp_data.path.length; i++) {
      temp_data.path[i].x -= tareX;
      temp_data.path[i].y -= tareY;
    }
    createBicho();
  });
}
