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
            getFiveDay(lat, lon);
        }})
}

function getFiveDay(lat,lon){
    var url =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    $.ajax({
        url:url,
        success:function(apiData){
            console.log(apiData);
        }})

}