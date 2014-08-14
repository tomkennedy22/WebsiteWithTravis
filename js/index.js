/*for (var i = 5; i < 50; i++) {
    var item = "<li>Box "+ i +"</li>";
    $('#tiles').append(item);
    console.log($('#tiles'), item);
}*/

var ourJSON = {
	"users":[
    {"firstName":"Tom", "lastName":"Kennedy", "city":"Dallas", "state":"TX"}, 
    {"firstName":"Travis", "lastName":"Wilson", "city":"Los_Angeles","state":"CA"}, 
    {"firstName":"Miles", "lastName":"Latham", "city":"Durham", "state":"NC"},
    {"firstName":"Paul", "lastName":"Detzer", "city":"Burlington", "state":"VT"}
]
}

function getWeather(location, id){
		console.log(location);
		var url = "http://api.wunderground.com/api/18241db4b94443a5/conditions/q/" + location + ".json";
		console.log(url);
		jQuery(document).ready(function($) {
			alert(location, id);
			$.ajax({
			    url : url,
			    dataType : "jsonp",
			    success : function(parsed_json) {
				    var temp_f = parsed_json['current_observation']['temp_f'];
				    var weather = parsed_json['current_observation']['weather'];
				    var weatherIconURL = parsed_json['current_observation']['icon_url'];
				    var weatherIcon = parsed_json['current_observation']['icon'];
				    var time = parsed_json['current_observation']['observation_time'];
				    $("li#"+id).append("<p>Current temperature in " + location + " is: " + temp_f + " with " + weather + "</p>");
				  	 $("li#"+id).prepend("<span class='weatherIconSpan'><img class='weatherIconSpan' src='"+weatherIconURL+"' alt='"+weatherIcon+"'></i></span>");
				  	 drawTiles();
				   // return "Current temperature in " + location + " is: " + temp_f + weather;
			  },
			  	error: function(XMLHttpRequest, textStatus, errorThrown) { 
				    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
				} 
			  });
			});
}

function populateBox(){
	$('#tiles li').each(function(){
		console.log(this)
		var id = parseInt(this.id,10) ;
		console.log(id);
		if(id != undefined){
			var name = ourJSON.users[id-1].firstName + "  " + ourJSON.users[id-1].lastName;
			$("li#"+id).append("<p>"+ name+ "</p>");

			var location = ourJSON.users[id-1].state + "/" + ourJSON.users[id-1].city;
			getWeather(location, id);
			//$("li#"+id).append(getWeather(location));
			drawTiles();
	}
	});
}

jQuery(document).ready(function($){
	console.log("in onload");
	populateBox();
	getSports();
	//drawTiles();
});


function drawTiles(){
	console.log("in drawTiles");
	    (function ($){

        // Prepare layout options.
        var options = {
          itemWidth: '40%', // Optional min width of a grid item
          autoResize: true, // This will auto-update the layout when the browser window is resized.
          container: $('#tiles'), // Optional, used for some extra CSS styling
          offset: 15, // Optional, the distance between grid items
          outerOffset: 20, // Optional the distance from grid to parent
          flexibleWidth: '50%' // Optional, the maximum width of a grid item
        };

        // Get a reference to your grid items.
        var handler = $('#tiles li');

        var $window = $(window);
        $window.resize(function() {
          var windowWidth = $window.width(),
              newOptions = { flexibleWidth: '50%' };

          // Breakpoint
          if (windowWidth < 1024) {
            newOptions.flexibleWidth = '100%';
          }

          handler.wookmark(newOptions);
        });

        // Call the layout function.
        handler.wookmark(options);
    })(jQuery);
}

function getSports(){

	$.ajax({
		url: "http://api.espn.com/v1/sports/news/headlines",
		data: {
			// enter your developer api key here
			apikey: "zt7zchxp7bk84ue4p4b6xzun",
			// the type of data you're expecting back from the api
			_accept: "application/json"
		},
		dataType: "jsonp",
		success: function(data) {
			// create an unordered list of headlines
			var ul = $('#sportsTicker');
			$.each(data.headlines, function() {
				console.log(this.headline);
				var span = "<span class='sportsItem'>" + this.headline +"  </span>";
				console.log(span);
				ul.append(span)
			});
		},
		error: function() {
			 // handle the error
	}
});
}

setTimeout(function() {
      // Do something after 5 seconds
      drawTiles();
}, 500);