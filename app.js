var curiosity_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
var spirit_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos";
var opportunity_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos";

var beginClicked = false;

date = new Date();
date.setDate(date.getDate() - 7);
$('#sol-number').val(date.toISOString().substring(0, 10));

$('.close').click(function(e) {
	e.preventDefault();
	$('.modal').hide();
});
//
$(document).ready(function() {
	$('.modal').hide();
	$('.mGlassPic').hide();
});
//
$('.startLink').click(function(e) {
	e.preventDefault();
	$('.modal').show();
	$('.mGlassPic').show();
	beginClicked = true;
	
});
//
$('.mGlassPic').click(function(e) {
	e.preventDefault();
	$('.modal').show();
});


//$('.submit').click(function(e) {
//	e.preventDefault();
//	$('.modal').hide();
//});

function getDataFromApi (where, solValue, camera, callback) {
	var url = curiosity_URL;
	if(where == 'Curiosity'){
		url = curiosity_URL;
	}
	if (where == 'Spirit'){
		url = spirit_URL;
	}
	if (where = 'opportunity'){
		url = opportunity_URL;
	}

	var query = {
		earth_date: solValue,
		camera: camera,
		page: 1,
		api_key: '4zeVFAMYIfMZnLUhKGUFmjRv4WpDD7N84PBfVcPs',
	}
	$.getJSON(url, query, callback)
.fail(function() {
    var result = '<p>No images are available for this date</p>';
    $('.search-results').html(result);
  });
}

function showSearchResults(data) {
	var result = '';
	if(data.photos.length >=1) {
		data.photos.forEach(function(item) {
  				result = '<img src="' + item.img_src + '"/>' 
  		$('.infoText').show();
		});
	}
	else {
		result = '<p>No images are available for this date</p>';
		$('.infoText').hide();
	}
	$('.search-results').html(result);
	$('.modal').hide();
	if(beginClicked) {
		$('.start').hide();
	};
}

$('#rover-choice').change(function(e) {
	//e.preventDefault();
	var rover = $(e.currentTarget).val().trim();
	//var rover = $('#rover-choice').find(':selected').text();
	console.log("user selected rover", rover);
	$('#rover-choice').val( rover );
	switch(rover){
		case 'Curiosity':
			$('#camera-choice option').show();
			$('#camera-choice option[value="PANCAM"]').hide();
			$('#camera-choice option[value="MINITES"]').hide();
			break;
		case 'Opportunity':
		    $('#camera-choice option').show();
			$('#camera-choice option[value="MAST"]').hide();
			$('#camera-choice option[value="CHEMCAM"]').hide();
			$('#camera-choice option[value="MAHLI"]').hide();
			$('#camera-choice option[value="MARDI"]').hide();
			break;
		case 'Spirit':
			$('#camera-choice option').show();
			$('#camera-choice option[value="MAST"]').hide();
			$('#camera-choice option[value="CHEMCAM"]').hide();
			$('#camera-choice option[value="MAHLI"]').hide();
			$('#camera-choice option[value="MARDI"]').hide();
			break;
	}
});



function submitForm() {
	$('#photo-search').submit(function(e) {
		event.preventDefault();
		var where = $('#rover-choice').val();
		var solValue = $('#sol-number').val();
		var camera = $('#camera-choice').val();
		getDataFromApi(where, solValue, camera, showSearchResults);
		$('.infoText').text(solValue + " " + where + " " + camera);
		//TweenMax.to('.infoText', 7, {left:630, repeat:-1, yoyo:true});
		//TweenLite.to('.infoText', .5, {left: 80, ease:Power2.easInOut});
		TweenMax.set('.infoText', {left:0});
		TweenMax.to('.infoText', .7, {left: 100, ease:Back.easeOut});
	});
}
$(document).ready(function(){
	submitForm();
	getDataFromApi("Opportunity", "2016-12-21", "FHAZ", showSearchResults);
})

