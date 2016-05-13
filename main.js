var response_data,
    artist_id = '4dpARuHxo51G3z768sgnrY',
    box = document.getElementById('box'),
    artist_submit = document.getElementById('artist-submit'),
    artist_heading = document.getElementById('artist-heading'),
    artist_link = document.getElementById('artist-link'),
    artist_image = document.getElementById('artist-image'),
    artist_followers = document.getElementById('artist-followers'),
    artist_heading_related = document.getElementById('artist-heading-related'),
    artist_top_10_tracks = document.getElementById('top-10-tracks'),
    related_artists_text = document.getElementById('related-artists-text'),
    related_artists_thumbnails = document.getElementById('related-artists-thumbnails')

function get_artist() {
  var request = new XMLHttpRequest();
  request.open("GET", "https://api.spotify.com/v1/artists/" + artist_id, true);
  request.send();
  request.onreadystatechange = function () {
    //if request is not started or completed
    if(request.readyState !=4 || request.status != 200) return;
    response_data = JSON.parse(request.response);
    //DOM CHANGES HERE
    console.log(response_data);
    artist_heading.innerHTML = response_data.name + "<button type='submit' class='btn btn-danger' id='artist-clear'>Clear</button>"
    artist_image.innerHTML = "<img src="+response_data.images[1].url+" alt="+response_data.name+"-image>"
    artist_followers.innerHTML = "Total Followers: " + response_data.followers.total
    artist_link.innerHTML = "<a class='btn btn-success' href='" +response_data.external_urls.spotify + "'role='button'>Open in Spotify</a>"
    get_related_artists();
    get_artist_top_ten();
  };
};

function get_related_artists() {
  var request = new XMLHttpRequest();
  var count = 0;
  request.open("GET", "https://api.spotify.com/v1/artists/"+ artist_id + "/related-artists", true);
  request.send();
  request.onreadystatechange = function() {
    if(request.readyState !=4 || request.status != 200) return;
    response_data = JSON.parse(request.response);
    console.log(response_data);
    if(response_data.artists.length>0){
      for(var i=0;i<response_data.artists.length-1;i++){
          related_artists_text.innerHTML += "<a href='"+response_data.artists[i].external_urls.spotify+"'>"+response_data.artists[i].name+"</a>" + ", "
      }
      related_artists_text.innerHTML += "<a href='"+response_data.artists[response_data.artists.length-1].external_urls.spotify+"'>"+response_data.artists[response_data.artists.length-1].name+"</a>"
    } else {
      related_artists_text.innerHTML = "<div class='alert alert-danger' role='alert'>Similar Artists Not Found!</div>"
    }
    for(var i=0;i<response_data.artists.length;i++){
      artist_heading_related.innerHTML = "Related Artists <button type='submit' class='btn btn-danger' id='artist-clear'>Clear</button>"
      related_artists_thumbnails.innerHTML += "<div class='col-md-2 image-thumbnail'> <img class='img-thumbnail thumbnail' src='"+response_data.artists[i].images[0].url+"'><div id='related-name'>"+
      response_data.artists[i].name+"</div></a><a id='related-artist-button' class='btn btn-success btn-xs' href='"+response_data.artists[i].external_urls.spotify+"' role='button'>View Artist</a></div>"
    }

  }
}

function get_artist_top_ten() {
  var request = new XMLHttpRequest();
  request.open("GET","https://api.spotify.com/v1/artists/"+ artist_id + "/top-tracks?country=US", true)
  request.send();
  request.onreadystatechange = function() {
    if(request.readyState !=4 || request.status != 200) return;
    response_data = JSON.parse(request.response);
    console.log(response_data);
    artist_top_10_tracks.innerHTML = "<ul class='track-list'>"
    for(var i=0;i<response_data.tracks.length;i++){
      artist_top_10_tracks.innerHTML += "<li>"+ response_data.tracks[i].name + "  <a class='play-icon' href='"+ response_data.tracks[i].preview_url +
       "'><img id='play-icon1' src='play.png' alt='play-icon'></a></li>"
    }
    artist_top_10_tracks.innerHTML += "</ul>"
    create_playlist();
  }
}

function create_playlist() {
  var play_icons = document.getElementsByClassName('play-icon')
  //add click listener to all icons
  for(var i=0;i<play_icons.length;i++){
    play_icons[i].addEventListener("click", function(e){
      create_media_player();
      e.preventDefault();
    });
  }
}
//Figure out how to get appropriate track number to the response iframe
function create_media_player() {
  old_ifrm = document.getElementsByClassName('iframe-media')[0]
  ifrm = document.createElement("IFRAME");
  ifrm.setAttribute("src", response_data.tracks[1].preview_url);
  ifrm.setAttribute('class', 'iframe-media');
  ifrm.style.width = 200+"px";
  ifrm.style.height = 100+"px";
  if(old_ifrm!=undefined){
    document.getElementById('panel-body-media-player').innerHTML = '';
    document.getElementById('panel-body-media-player').appendChild(ifrm);
  } else {
    document.getElementById('panel-body-media-player').appendChild(ifrm);
  }
}

function artist_reset() {

}

function related_artist_reset(){

}

artist_submit.addEventListener("click", function(e) {
	//artist_id = document.getElementById('artist').value;
  get_artist();
  e.preventDefault();
});
