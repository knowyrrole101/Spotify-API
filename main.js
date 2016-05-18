var response_data,
    artist_id = '4dpARuHxo51G3z768sgnrY',
    box = document.getElementById('box'),
    artist_submit = document.getElementById('artist-submit'),
    artist_heading = document.getElementById('artist-span-heading'),
    artist_link = document.getElementById('artist-link'),
    artist_image = document.getElementById('artist-image'),
    artist_followers = document.getElementById('artist-followers'),
    artist_heading_related = document.getElementById('artist-heading-related'),
    artist_top_10_tracks = document.getElementById('top-10-tracks'),
    related_artists_text = document.getElementById('related-artists-text'),
    related_artists_thumbnails = document.getElementById('related-artists-thumbnails'),
    artist_clear_main = document.getElementById('artist-button-clear');
    artist_clear = document.getElementById('artist-clear');
var data;


function get_artist() {
  var request = new XMLHttpRequest();
  request.open("GET", "https://api.spotify.com/v1/artists/" + artist_id, true);
  request.send();
  request.onreadystatechange = function () {
    if(request.readyState !=4 || request.status != 200) return;
    response_data = JSON.parse(request.response);
    artist_image.innerHTML = "<img src="+response_data.images[1].url+" alt="+response_data.name+"-image>"
    artist_followers.innerHTML = "<h2>Artist Information: </h2><h3>Adele</h3><br>Total Followers: " + response_data.followers.total +
    "<br><br><a class='btn btn-success' href='" +response_data.external_urls.spotify + "'role='button'>Open in Spotify</a>"
    artist_link.innerHTML = "<h3>Related Artists:</h3>"
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
    if(response_data.artists.length>0){
      related_artists_text.innerHTML = "<ul>"
      for(var i=0;i<response_data.artists.length;i++){
          related_artists_text.innerHTML += "<li><a href='"+response_data.artists[i].external_urls.spotify+"'>"+response_data.artists[i].name+"</a>" + "</li> "
      }
      //with commas instead of unordered List.
      //related_artists_text.innerHTML += "<a href='"+response_data.artists[response_data.artists.length-1].external_urls.spotify+"'>"+response_data.artists[response_data.artists.length-1].name+"</a></ul>"
    } else {
      related_artists_text.innerHTML = "<div class='alert alert-danger' role='alert'>Similar Artists Not Found!</div>"
    }
    for(var i=0;i<response_data.artists.length;i++){
      if(response_data.artists.length>0){
        related_artists_thumbnails.innerHTML += "<div class='col-md-2 image-thumbnail'> <img class='img-thumbnail thumbnail' src='"+response_data.artists[i].images[0].url+"'><div id='related-name'>"+
        response_data.artists[i].name+"</div></a><a id='related-artist-button' class='btn btn-success btn-xs' href='"+response_data.artists[i].external_urls.spotify+"' role='button'>View Artist</a></div>"
      } else {
        related_artists_thumbnails.innerHTML = "<div class='alert alert-danger' role='alert'>Similar Artists Not Found!</div>"
      }
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
    var id=0;
    for(var i=0;i<response_data.tracks.length;i++){
      artist_top_10_tracks.innerHTML += "<li>"+ response_data.tracks[i].name + "  <a class='play-icon' id='" + id + "' href='"+ response_data.tracks[i].preview_url +
       "'><img id='play-icon1' src='play.png' alt='play-icon'></a></li>"
      id++
    }
    artist_top_10_tracks.innerHTML += "</ul>"
    var icons = document.getElementsByClassName('play-icon')

    // function get_index(j) {
    //   return j + 1;
    // }
    for(var j=0;j<icons.length;j++){
      //Closure/Scope Issue here
      data = icons[j];
      (function(_td){
        data.addEventListener("click", function (e){
          e.preventDefault();
          console.log(_td.href);
          create_media_player(_td)
          // create_media_player(index)
        });
      })(data);
    }

   }
  }

//Figure out how to get appropriate track number to the response iframe
function create_media_player(data) {
  old_ifrm = document.getElementsByClassName('iframe-media')[0]
  ifrm = document.createElement("IFRAME");
  //hard coded this part because every time I would run through loop it would only save the 10 as the dynamic array index value :(
  ifrm.setAttribute("src",data.href);
  ifrm.setAttribute("class", 'iframe-media');
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
  artist_image.innerHTML = ''
  artist_followers.innerHTML = ''
  artist_link.innerHTML = ''
  related_artists_text.innerHTML = ''
}``
function related_artist_reset(){
  related_artists_thumbnails.innerHTML = ""
}

artist_clear_main.addEventListener("click", function(e){
  artist_reset();
  e.preventDefault();
})

artist_clear.addEventListener("click", function(e){
  related_artist_reset();
  e.preventDefault();
});

artist_submit.addEventListener("click", function(e) {
	//artist_id = document.getElementById('artist').value;
  get_artist();
  e.preventDefault();
});
