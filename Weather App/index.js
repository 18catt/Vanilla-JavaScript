const API_KEY="d1d80f951bb02f734d7db61f0644f7bd";
let cityName = document.querySelector("[data-searchBar]");
let searchButton = document.querySelector("[data-searchSymbol]");
let searchWind = document.querySelector("[data-windInfo2]");
let searchHumidity = document.querySelector("[data-humidityInfo2]");
let searchCloud = document.querySelector("[data-cloudsInfo2]");
let searchWeatherName = document.querySelector("[data-weatherName2]");
let searchLocation = document.querySelector("[data-location2]");
let searchTemp = document.querySelector("[data-temp2]");
let curCity = document.querySelector("[data-location1]");
let curWeather = document.querySelector("[data-weatherName1]");
let curIcon = document.querySelector("data-weatherIcon1");
let curTemp = document.querySelector("[data-temp1]");
let curWind = document.querySelector("[data-windInfo1]")
let curHumidity = document.querySelector("[data-humidityInfo1]")
let curClouds = document.querySelector("[data-cloudsInfo1]");
let searchScreen = document.querySelector(".searchBtn");
let searchDisplay = document.querySelector("[data-searchPart]"); 
let curDisplay = document.querySelector("[data-curPart]"); 
let loadingScreen = document.querySelector(".loader");

//function to go to search screen when clicked on search
function showSearchPart(){
    searchDisplay.style.display='block';
    console.log("Im working");
    curDisplay.style.opacity='0';
    document.querySelector('body').style.background = "linear-gradient(to right, rgb(2, 0, 36), rgb(0,212,255) )";
    console.log("i am also working");
}

//searched location weather
searchButton.addEventListener('click', fetchWeather);

//work on pressing enter after giving the cityname
cityName.addEventListener('keyup', function(event){
    if(event.keyCode === 13){
        fetchWeather();
    }
})

//to fetch the weather of the city entered by the user
async function fetchWeather(){
    loadingScreen.style.display="block";
    searchDisplay.style.display="none";
    let city= cityName.value;
    console.log(city);
    try{
    let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`);
        let response= await data.json();
        loadingScreen.style.display="none";
        searchDisplay.style.display="block";
        console.log(response);
        searchLocation.innerText = city;
        searchWeatherName.innerText = `${response?.weather[0]?.main}`;
        searchCloud.innerText=`${response?.clouds?.all}%`;
        searchHumidity.innerText=`${response?.main?.humidity}%`;
        searchWind.innerText=`${response?.wind?.speed.toFixed(2)} m/s`;
        searchTemp.innerText=`${response?.main?.temp.toFixed(2)}°C`;
        let icon = response.weather[0].icon;
        console.log(icon);
        document.getElementById("image2").src =`https://openweathermap.org/img/wn/${icon}@2x.png`;
        changebg(icon);
        document.querySelector("[data-searchBox]").style.opacity = '1';
    }
    catch(e){
        console.log("This is a error", e);
    }
}

//to show the home screen which shows the user's current location weather
function showCurrentPart(){
    if(searchDisplay.style.display='block'){
        searchDisplay.style.display='none';
        curDisplay.style.opacity='1';
        window.location.reload();
    }
}

//getting current location weather
function getlocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        alert("Geolocation not supported by this browser.");
    }
}


async function showPosition(position){
    let lat= position.coords.latitude;
    let lon= position.coords.longitude;
    console.log(lat, lon);
    loadingScreen.style.display="block";
    try{
        let currentData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`); 
        let curResponse = await currentData.json();
        loadingScreen.style.display="none";
        curDisplay.style.display="block";
        document.querySelector(".boxes1").style.opacity="1";
        console.log(curResponse);
        curCity.innerText = `${curResponse?.name}`
        curWeather.innerHTML = `${curResponse?.weather[0]?.main}`;
        curTemp.innerText=`${curResponse?.main?.temp.toFixed(2)}°C`;
        curWind.innerText=`${curResponse?.wind?.speed.toFixed(2)} m/s`;
        curHumidity.innerText=`${curResponse?.main?.humidity}%`;
        curClouds.innerText=`${curResponse?.clouds?.all}%`;
        let icon = curResponse.weather[0].icon;
        console.log(icon);
        document.getElementById("image1").src =`https://openweathermap.org/img/wn/${curResponse?.weather[0]?.icon}@2x.png`;
        //changing the bg according to weather
        changebg(icon);
    }
    catch(err){
        loadingScreen.style.display="none";
        console.error('Error', err);
    }
}


//changing the bg according to weather
function changebg (iconId){
    //mist,smoke,haze,fog,dust...
    if(iconId == "50d" || iconId == "50n"){
        document.querySelector('body').style.backgroundImage= "url('https://images.unsplash.com/photo-1487621167305-5d248087c724?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')";
    }

    //Snow
    if(iconId == "13d" || iconId == "13n"){
        document.querySelector('body').style.backgroundImage= "url('https://images.unsplash.com/photo-1642755495640-6ba7f7cfd9e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fHJhaW4lMjB3ZWF0aGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60')";
}

    //Rain
    if(iconId == "10d" || iconId == "10n" || iconId == "09d" || iconId == "09n"){
        document.querySelector('body').style.backgroundImage= "url('https://images.unsplash.com/photo-1514882714393-f681401906c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80')";
}

    //ThunderStorm
    if(iconId == "11d" || iconId == "11n"){
        document.querySelector('body').style.backgroundImage= "url('https://images.unsplash.com/photo-1538169204832-1b461add30a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')";
}

    //Clouds
    if(iconId == "02d" || iconId == "02n" || iconId == "03d"  || iconId == "03n" || iconId == "04d" || iconId == "04n"){
        document.querySelector('body').style.backgroundImage= "url('https://images.unsplash.com/photo-1532178910-7815d6919875?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80')";
}

    //Clear Sky
    if(iconId == "01d" || iconId == "01n"){
        document.querySelector('body').style.backgroundImage = "url('https://images.unsplash.com/photo-1540308990836-5a7b1df6dc00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80')";
    }
}
