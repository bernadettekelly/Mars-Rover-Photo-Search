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
		//camera: ,
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
	$('#rover-choice').val( $(e.currentTarget).text().trim() );
});

$('#photo-search .dropdown-content2 button[type="button"]').click(function(e) {
	e.preventDefault();
	$('#camera-choice').val( $(e.currentTarget).text().trim() );
});

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