var city = "Wahkon";
var forecast = [];
var requestUrl = "https://api.zippopotam.us/us/mn/wahkon"
var todayC = (`#todayW`)
var forecastW = (`#forecastW`)
var cityHistory = []
var latitude
var longitude

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Grab location data
    city = data['place name']
    var stateab = data['state abbreviation']
    var zipcode = data.places[0]['post code']
    longitude =data.places[0].longitude
    latitude = data.places[0].latitude

    var dataChain = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=90c25e8ed0269e4611e2fc4c244375bc&units=imperial`;
    var dataChain2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=90c25e8ed0269e4611e2fc4c244375bc&units=imperial`;
    console.log (dataChain)
    return dataChain, dataChain2;

  })
  .then(function(dataChain){
    fetch(dataChain)
    .then(function(response){
      return response.json();
    })
    .then(function(tData){
      var tDate = tData.dt
      var date = dayjs(tDate*1000).format('M/D/YY')
      var weatherT = tData.weather[0].icon
      var temp = tData.main.temp
      var windS = tData.wind.speed
      var humid = tData.main.humidity
      var row = `<div class="card card-block" style="width: 100%">
      <label><h1> ${city} - ${date} <img src="https://openweathermap.org/img/wn/${weatherT}.png" width="70 height="70"/></h1></label>
      <label>Temperature: ${temp}F</label>
      <label>Wind Speed: ${windS}mph</label>
      <label>Humidity: ${humid}%</label>
      </div>
      `;
      $(todayC).append(row);

      var dataChain2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=90c25e8ed0269e4611e2fc4c244375bc&units=imperial`;
      console.log (dataChain)
      return dataChain
    })
  })
  .then(function(dataChain){
    fetch(dataChain)
    .then(function(response){
      return response.json();
    })
    .then(function(wData){
      console.log(wData)
      for (i = 1; i < 6; i++){
        var arrID = (i*8)-4
        var tDate = wData.list[arrID].dt
        var date = dayjs(tDate*1000).format('M/D/YY')
        var weatherT = wData.list[arrID].weather[0].icon
        var temp = wData.list[arrID].main.temp
        var windS = wData.list[arrID].wind.speed
        var humid = wData.list[arrID].main.humidity

        console.log (date)
        console.log (weatherT)
        if (i === 0){
          var row = `<div class="card card-block" style="width: 100%>
          <label id="city${i}">${city} - ${date}<img src="https://openweathermap.org/img/wn/${weatherT}.png" width="50" height="50" /></label>
          <label id="temp${i}">Temperature: ${temp}F</label>
          <label id="windS${i}">Wind Speed: ${windS}mph</label>
          <label id="humid${i}">Humidity: ${humid}%</label>
          </div>
          `;
          $(todayC).append(row);
      
        }
        else
        {
          var row = `<div class="card card-block" style="width: 19%">
          <label>${date}</label>
          <label><img src="https://openweathermap.org/img/wn/${weatherT}.png" width="50" height="50" /></label>
          <label>Temperature: ${temp}F</label>
          <label>Wind Speed: ${windS}mph</label>
          <label>Humidity: ${humid}%</label>
          </div>
          `;
          $(forecastW).append(row);
        }
      }

    })
   })




  $('.citySearch').on("click","#sbtn",function(event){
    
    sText = [$(this).siblings('.sbox').val()]
    console.log (sText)

    cityHistory = JSON.parse(localStorage.getItem('cityHistory'));
    if (cityHistory === null) localStorage.setItem('cityHistory', JSON.stringify(sText));
    else{
      cityHistory = [...cityHistory, ...sText]
      localStorage.setItem('cityHistory', JSON.stringify(cityHistory));
     }

  })