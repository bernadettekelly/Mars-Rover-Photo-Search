var curiosity_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?";
var spirit_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?";
var opportunity_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?";

function getDataFromApi (searchTerm, callback) {
	var query = {
		r: 'json',
		key: '4zeVFAMYIfMZnLUhKGUFmjRv4WpDD7N84PBfVcPs',
		q: 'searchTerm'
		//Do I need a key/value pair to get the sols enetered?
		//I'm receiving an error message that my api key is not entered
	}
	$.getJSON(curiosity_URL, spirit_URL, opportunity_URL, query, callback);
}

function showSearchResults(data) {
	var result = '';
	if (data.search) {
		data.search.forEach(function(item) {
            result += '<p>' + item + '</p>'
		});
	}
	else {
		result += '<p>No results found</p>';
	}
	$('.search-results').html(result);
}

$('#photo-search button [type="button"]').click(function(e) {
	e.preventDefault();
});

function submitForm() {
	$('#photo-search').submit(function(e) {
		event.preventDefault();
		var query = $(this).find('#sol-number').val();
		getDataFromApi(query, showSearchResults);
	});
}
$(document).ready(function(){submitForm()});