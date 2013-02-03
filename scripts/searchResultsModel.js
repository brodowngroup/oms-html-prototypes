// Class to represent a row in the seat reservations grid
function Result(name) {
    var self = this;
    self.name = name;
}

function SearchResultsModel() {
    // Data
    var self = this;
    self.results = ko.observableArray([
        new Result("Tonight"),
        new Result("Im"),
        new Result("gonna"),
        new Result("rock"),
        new Result("you"),
        new Result("tonight"),
    ]);
};

ko.applyBindings(new SearchResultsModel());