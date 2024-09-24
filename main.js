const cityname = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");
const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");
const data_hide = document.querySelector(".middle_layer"); // Correct selector

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityname.value;

    // Clear any previous error or output
    city_name.innerText = ""; 
    
    if(cityVal === ""){
        city_name.innerText = `Plz write the name before search`;
        data_hide.classList.add("data_hide");
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&APPID=a0b06669a793506ae54060f7df8a5fb6`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            // Convert temperature from Kelvin to Celsius and round to 2 decimal places
            const tempInCelsius = (arrData[0].main.temp - 273.15).toFixed(2);

            // Update the temperature and weather status
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = `${tempInCelsius}`; // Display in Celsius
            const tempMood = arrData[0].weather[0].main;
            
            if(tempMood == "Clear"){
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            } else if(tempMood == "Clouds"){
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            } else if(tempMood == "Rain"){
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-smog' style='color: #a4b0be;'></i>"; // Fallback icon
            }

            // Show the weather information
            data_hide.classList.remove("data_hide");

        } catch (error) {
            city_name.innerText = `Plz enter the city name properly`;
            data_hide.classList.add("data_hide");
        }
    }
};

// Event listener for the submit button
submitBtn.addEventListener("click", getInfo);

// Optional: Clear the error when the user starts typing a new city
cityname.addEventListener("input", () => {
    city_name.innerText = "";
});
