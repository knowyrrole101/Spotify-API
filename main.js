var artist_id = '4dpARuHxo51G3z768sgnrY',
    artist_submit = document.getElementById('artist-submit'),
    artist_heading = document.getElementById('artist-heading'),
    artist_link = document.getElementById('artist-link'),
    artist_image = document.getElementById('artist-image'),
    artist_followers = document.getElementById('artist-followers'),
    related_artists_text = document.getElementById('related-artists-text');

function get_artist() {
  var request = new XMLHttpRequest();
  request.open("GET", "https://api.spotify.com/v1/artists/" + artist_id, true);
  request.send();
  request.onreadystatechange = function () {
    //if request is not started or completed
    if(request.readyState !=4 || request.status != 200) return;
    var response_data = JSON.parse(request.response);
    //DOM CHANGES HERE
    console.log(response_data);
  };
};

function get_related_artists() {
  var request = new XMLHttpRequest();
  request.open("GET", "https://api.spotify.com/v1/artists/"+ artist_id + "/related-artists", true);
  request.send();
  request.onreadystatechange = function() {
    if(request.readyState !=4 || request.status != 200) return;
    var related_artists_data = JSON.parse(request.response);
    console.log(related_artists_data);
  }
}

function get_artist_top_ten() {
  var request = new XMLHttpRequest();
  request.open("GET","https://api.spotify.com/v1/artists/"+ artist_id + "/top-tracks?country=US", true)
  request.send();
  request.onreadystatechange = function() {
    if(request.readyState !=4 || request.status != 200) return;
    var artist_top_tracks = JSON.parse(request.response);
    console.log(artist_top_tracks);
  }
}

function get_preview_of_track(preview_url, artist_id) {
  var track = get_artist_top_tracks(id);
}

function clear_data() {
  //event listener on clear click set new variable values
  response_data,
  artist_heading,
  artist_submit,
  artist_link,
  artist_image,
  artist_followers,
  related_artists_text;
}

artist_submit.addEventListener("click", function(e) {
	//artist_id = document.getElementById('artist').value;
  get_artist();
  e.preventDefault();
});
