const apiKey = '82e2832b8f0eac296c9e75cb93d03317';
let url = 'https://api.openweathermap.org/data/2.5/weather?q='
//mumbai&appid=82e2832b8f0eac296c9e75cb93d03317'

let city = document.querySelector('#city');
let searchbtn = document.querySelector('.search-btn');
let city_name = document.querySelector('.city-name');
let temp = document.querySelector('.temp');
let feels_like = document.querySelector('.feels-like');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let locationIcon = document.querySelector('.weather-icon');
let weather_sec = document.querySelector('.weather-info');
let degree_section = weather_sec.querySelector(".degree-section");
let degree_section_span = degree_section.getElementsByTagName('span')[0];
let temp_cel = 0;
let feelsLike_cel = 0;




//let wind = document.querySelector('.wind');



async function getUrl(city){

    try{
        let theUrl = url + city + '&appid=' + apiKey;
        let response = await fetch(theUrl , {mode: 'cors'})
        let data = await response.json();
        //Get data from api and change html content based on the recieved data
        console.log(data)
        let temp_data = data.main.temp;
        temp_cel = parseInt(temp_data) - 273.15;
        temp.textContent = Math.round(temp_cel);
        let feels_like_data = data.main.feels_like;
        feelsLike_cel = parseInt(feels_like_data) - 273.15;
        feels_like.textContent = Math.round(feelsLike_cel) + "C";
        let humidity_data = data.main.humidity;
        humidity.textContent = humidity_data + "%";
        let wind_data = data.wind.speed;
        wind.textContent = wind_data + "m/s";
        let {icon} = data.weather[0];
        locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

         //change K to C
         

    }catch(err){
        let error_span = document.createElement('span')
        error_span.className = "error-span";
        error_span.textContent = "Location does not exist"
        let error = document.querySelector('.error')
        error.appendChild(error_span)
        city_name.textContent = "Sorry"
    }  
}

degree_section.addEventListener('click', ()=>{
    if(degree_section_span.textContent === "C"){
        let temp_far = parseInt(temp.textContent)*1.8+32;
        let feels_like_far = parseInt(feels_like.textContent)*1.8+32;
        degree_section_span.textContent = "F"
        feels_like.textContent = Math.round(feels_like_far) + "F"
        temp.textContent = Math.round(temp_far);
    
    }else{
        degree_section_span.textContent = "C";
        temp.textContent = Math.round(temp_cel);
        feels_like.textContent = Math.round(feelsLike_cel) + "C";
    }
    
})

searchbtn.addEventListener('click', (e)=>{
    let cityName = city.value;
    city_name.textContent = cityName
    console.log(cityName)
    getUrl(cityName)
})




