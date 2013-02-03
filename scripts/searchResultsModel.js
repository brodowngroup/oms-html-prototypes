// Class that defines an individual
// event returned from the api
function Result(data) {  
  this.id = data.ID;
  this.name = data.Name;
  this.image = data.Image;
  this.date = data.Date;
  this.time = data.Time;
  this.venue = data.Venue;
  this.neighborhood = data.Neighborhood;
  this.city = data.City;
  this.state = data.State;
  this.latitude = data.Latitude;
  this.longitude = data.Longitude;
}

// Main Viewmodel for the results page
function SearchResultsModel() {
  // Data
  var self = this;
  self.results = ko.observableArray([]);

  // Get json from api call
  $.post("http://api.onmystage.net/api/search/", { term: 'mad bread' }, function(data) {
      var mappedResults = $.map(data, function(item) { return new Result(item) });
      self.results(mappedResults);
  }, 'json');
  
};

ko.applyBindings(new SearchResultsModel());