function get_artist(id) {
  var request = new XMLHttpRequest();
  request.open("GET", "https://api.spotify.com/v1/artists/4dpARuHxo51G3z768sgnrY", true);
  request.send();
  request.onreadystatechange = function () {
    //if request is not started completed
    if(request.readyState !=4 || request.status != 200) return;
    console.log(request.response);
  };

}
