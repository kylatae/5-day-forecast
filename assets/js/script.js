

var requestUrl = "https://api.zippopotam.us/us/mn/wahkon"

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Grab location data
    var city = data['place name']
    var stateab = data['state abbreviation']
    var zipcode = data.places[0]['post code']
    var longitude =data.places[0].longitude
    var latitude = data.places[0].latitude

    var dataChain = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=90c25e8ed0269e4611e2fc4c244375bc`;

  })
  .then( function(dataChain){
    fetch(dataChain)
    .then( function(response){
      return response.json();
    })
    .then( function(wData){
      console.log(wData);
    })
  });









