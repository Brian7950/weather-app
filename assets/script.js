var apiKey = "4e92bc7b36552d5fe8e403251b632fd8";
var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
date = `${month}/${day}`;

previousCity = {};

//search for city
$("#search-weather").on("click", function () {
    var city = $("#city-name").val();
    console.log(city);
    getApi(city);
    createHistoryEl(city);
});

function getApi(city) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    $.ajax({
        url: url,
        success: function (apiData) {
            console.log(apiData);
            var lat = apiData.coord.lat;
            var lon = apiData.coord.lon;
            getFiveDay(lat, lon, city);
        },
    });
}

function getFiveDay(lat, lon, city) {
    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    $.ajax({
        url: url,
        success: function (apiData) {
            console.log(apiData);

            //todays forcast in individual section
            var currentForcast = `<div>
            <h1> City: ${city.toUpperCase()}</h1>
            <h6>Temp:${apiData.current.temp
                }<span><img src="https://openweathermap.org/img/wn/${apiData.current.weather[0].icon
                }@2x.png
            " /></span></h6>`
            //create if statement to render color depending on uv. js takes logic and assigns a class depending on result
            if (apiData.current.uvi < 2) {
                currentForcast += `<h6><span class="uv-low">UV: ${apiData.current.uvi}<span></h6>`
            }
            else if (apiData.current.uvi >= 2 && apiData.current.uvi < 6) {
                currentForcast += `<h6><span class="uv-moderate"> UV: ${apiData.current.uvi}<span></h6>`
            }
            else if (data.current.uvi >= 6 && apiData.current.uvi < 8) {
                currentForcast += `<h6><span class="uv-high">UV: ${apiData.current.uvi}<span></h6>`
            }
            else if (data.current.uvi >= 8 && apiData.current.uvi < 11) {
                currentForcast += `<h6><span class="uv-veryhigh">UV: ${apiData.current.uvi}<span></h6>`
            }
            else
                currentForcast += `<h6><span class="uv-extreme">UV: ${apiData.current.uvi}<span></h6>`

            // currentForcast += `<h6>UV:<span id="uv">  ${apiData.current.uvi}${uvColor(
            //     apiData
            // )}<span></h6>
           

            currentForcast += `<h6> Humidity: ${apiData.current.humidity}%</h6>

            <h6> Wind: ${apiData.current.wind_speed} MPH</h6>
            
            </div>`;
            $("#display-today").html(currentForcast);

            //new section created for 5 day breakdown
            var fiveDay = "";
            for (let i = 0; i < 5; i++) {
                var day = moment()
                    .add(i + 1, "days")
                    .format("MMMM Do");
                fiveDay += `<div class="card">
                ${day}
                <h6>Temp:${apiData.daily[i].temp.day}<span><img src="https://openweathermap.org/img/wn/${apiData.daily[i].weather[0].icon}@2x.png" />
                </div>`;
            }
            $("#five-day").html(fiveDay);
        },
    });
}

function savedHistory() {
    localStorage.setItem("previousCity", JSON.stringify(previousCity));
}

function loadHistory() {
    previousCity = JSON.parse(localStorage.getItem("previousCity"));
    //if empty, create an object
    if (!previousCity) {
        previousCity = {
            city: [],
        };
    }
}

//creates previous names already searched
function createHistoryEl(cityName) {
    //create list of previous city searches
    var cityLi = $("<li>").text(cityName);
    $("#previous-search").append(cityLi);
}
