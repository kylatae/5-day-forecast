var city = "Wahkon";
var forecast = [];
var requestUrl = `https://api.zippopotam.us/us/mn/wahkon`
var todayC = (`#todayW`)
var forecastW = (`#forecastW`)
var cityHistory = []
var latitude
var longitude
var dataChain2

function updateWeather(searchQ){
console.log (searchQ)
var tempCity = searchQ
    // var thiscity = searchQ.toLowerCase()
    if (tempCity === NaN){
    var tempCity = searchQ.toLowerCase()
    var commaCheck = tempCity.search(`,`)
    console.log(commaCheck)  
    requestUrl = `https://api.zippopotam.us/us/${state}/${city}`
    }
    else
    {
      console.log('it is a number');
      if (searchQ.length === 5) 
        {requestUrl = `https://api.zippopotam.us/us/${searchQ}`
        console.log ('working zipcode')
        }
      else return;
    }

    function updateHistory{

      cityHistory = JSON.parse(localStorage.getItem('cityHistory'));
      if (cityHistory === null) ""
      else{

       }


    }

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Grab location data
      if (data.country === 'United States'){
        console.log ('Succeeded input')
      city = data.places[0][`place name`]   
      var stateab = data.places[0]['state abbreviation']
      longitude =data.places[0].longitude
      latitude = data.places[0].latitude

        var saveCity = [`${city}, ${stateab}`]
      cityHistory = JSON.parse(localStorage.getItem('cityHistory'));
      if (cityHistory === null) localStorage.setItem('cityHistory', JSON.stringify(saveCity));
      else{
        cityHistory = [...cityHistory, ...saveCity]
        localStorage.setItem('cityHistory', JSON.stringify(cityHistory));
       }

      var dataChain = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=90c25e8ed0269e4611e2fc4c244375bc&units=imperial`;
      console.log (dataChain)
      return dataChain;
    }
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
        dataChain2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=90c25e8ed0269e4611e2fc4c244375bc&units=imperial`;
        console.log (dataChain2)
        return dataChain2
      })
    });
setTimeout(function(){
    // While setting a timeout is not chaining them together, no matter which direction I chained these two together the second one was always CORS error locally and 404 error on github. I suspect its from being limited to pulling from the same api to fast since putting a full second inbetween pulls seems to have fixed it. That is also why the daily forecast is second and the 5 day is first in ths JS code.
      fetch(dataChain2)
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
        return
      })
    
  },1000);
  }

  $('.citySearch').on("click","#sbtn",function(event){
    
    sText = $(this).siblings('.sbox').val()
    console.log (sText)

     updateWeather(sText);

  })