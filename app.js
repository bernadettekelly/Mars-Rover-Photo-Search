var curiosity_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
var spirit_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos";
var opportunity_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos";

function getDataFromApi (where, solValue, callback) {
	var url = curiosity_URL;
	if(where == 'Curiosity'){
		url = curiosity_URL;
	}

	var query = {
		sol: solValue,
		//camera: ,
		page: 1,
		api_key: '4zeVFAMYIfMZnLUhKGUFmjRv4WpDD7N84PBfVcPs',
		//q: 'searchTerm'
		//Do I need a key/value pair to get the sols enetered?
		//I'm receiving an error message that my api key is not entered
	}
	$.getJSON(url, query, callback);
}

function showSearchResults(data) {
	var result = '';
	console.log(data.photos);
	//if (data.search) {
	//	data.search.forEach(function(item) {
  //          result += '<p>' + item + '</p>'
  //					result += '<img src="' + item.img_src + '"/>' 
	//	});
	//}
	//else {
	//	result += '<p>No results found</p>';
	//}
	//$('.search-results').html(result);
}

$('#photo-search .dropdown-content button[type="button"]').click(function(e) {
	e.preventDefault();
	$('#rover-choice').val( $(e.currentTarget).text().trim() );
});

function submitForm() {
	$('#photo-search').submit(function(e) {
		event.preventDefault();
		var where = $('#rover-choice').val();
		var solValue = $('#sol-number').val();
		getDataFromApi(where, solValue, showSearchResults);
	});
}
$(document).ready(function(){submitForm()});