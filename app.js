var curiosity_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
var spirit_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos";
var opportunity_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos";

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
		sol: solValue,
		camera: camera,
		page: 1,
		api_key: '4zeVFAMYIfMZnLUhKGUFmjRv4WpDD7N84PBfVcPs',
	}
	$.getJSON(url, query, callback);
}

function showSearchResults(data) {
	var result = '';
	if(data.photos) {
		data.photos.forEach(function(item) {
  				result += '<img src="' + item.img_src + '"/>' 
		});
	}
	else {
		result += '<p>No results found</p>';
	}
	$('.search-results').html(result);
}

$('#photo-search .dropdown-content button[type="button"]').click(function(e) {
	e.preventDefault();
	var rover = $(e.currentTarget).text().trim();
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

//$('#photo-search .camera-dropdown button[type="button"]').click(function(e) {
//	e.preventDefault();
//	$('#camera-choice').val( $(e.currentTarget).text().trim() );
//});

function submitForm() {
	$('#photo-search').submit(function(e) {
		event.preventDefault();
		var where = $('#rover-choice').val();
		var solValue = $('#sol-number').val();
		var camera = $('#camera-choice').val();
		getDataFromApi(where, solValue, camera, showSearchResults);
	});
}
$(document).ready(function(){submitForm()});