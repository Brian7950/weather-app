var apiKey = "4e92bc7b36552d5fe8e403251b632fd8";


$("#search-weather").on("click",function(){
    var city = $("#city-name").val()
    console.log(city);
    getApi(city);
});

function getApi(city){
    var url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    $.ajax({
        url:url,
        success:function(apiData){
            console.log(apiData);
            var lat = apiData.coord.lat;
            var lon = apiData.coord.lon;
            getFiveDay(lat, lon, city);
        }})
}

function getFiveDay(lat,lon, city){
    var url =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    $.ajax({
        url:url,
        success:function(apiData){
            console.log(apiData);
            var currentForcast = `<div>
            <h1> City: ${city}</h1>
            <h6>Temp:${apiData.current.temp}<span><img src="https://openweathermap.org/img/wn/${apiData.current.weather[0].icon}@2x.png

            " /></span></h6>
            
            </div>`
            $("#display-today").html(currentForcast)

            var fiveDay = ""
            for(let i = 0; i < 5; i++){
                var day = moment().add(i+1, 'days').format()
                fiveDay += `<div class="card">
                ${day}
                <h6>Temp:${apiData.daily[i].temp.day}<span><img src="https://openweathermap.org/img/wn/${apiData.daily[i].weather[0].icon}@2x.png
                </div>`
            }
            $("#five-day").html(fiveDay);
        
        }})

}