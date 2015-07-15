function onSubmit (event) {
  event.preventDefault();
  function onSaveSuccess (response) {
    console.debug('BOOM', response);
    response.artists.items.forEach(function(list){
	    var name = list.name;
	    var images = list.images;
	    var id = list.id;
	    
	    if (name !== null && images[0] !== undefined) {
		    $('#list').append("<li>");
		    $('#list').append("<span style='font-size:40px;font-weight:bold;'>" + name + "</span><br>");
		    $('#list').append("<img src='" + images[0].url + "'alt='Artist Images' style='width:250px;height:315px;'><br>");
		    $('#list').append("<button style='width:250px;' type='submit' id='"+id+"' class='btn btn-warning'>Show Albums</button><br>");
		    $('#list').append("</li>");

	    	var alb_list = $.get("https://api.spotify.com/v1/artists/"+ id +"/albums");
	    	console.log("list" + alb_list);

		    $('#'+id).on('click', function(alb_click){
		    	$('#albums').empty();
		   		function albumSuccess(li){
		   			li.items.forEach(function(alb){
				   		var alb_url = alb.images[0].url
				    	$('#albums').append("<img src='" + alb_url + "'alt='Albums Images' style='width:250px;height:315px;'>");
				    });
		   		};	
		   		alb_list.done(albumSuccess);
		  	});
		   
		}

	});
  }

  function onSaveFailure (err) {
    console.error(err.responseJSON);
  }

  console.debug('SUBMITTED');
  var artist = $('#artist-search').val();

  var load_artists = $.get('https://api.spotify.com/v1/search?type=artist&query=' + artist);
  load_artists.done(onSaveSuccess);
  load_artists.fail(onSaveFailure);
}

$('#submit').on('click', onSubmit);
	