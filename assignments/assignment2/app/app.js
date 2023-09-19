const baseURL = `https://api.weatherapi.com/v1/forecast.json?key=`;
const apiKey = `cfe035ef31c74d5a9d6204728232808`;

function getData() {
  $("#submit").on("click", (e) => {
    e.preventDefault();
    let city = $("#city").val();
    let zip = $("#zip").val();

    if (city != "") {
      let cityURL =
        baseURL + apiKey + "&q=" + city + "&days=10&aqi=no&alerts=no";
      console.log(cityURL);
      $.getJSON(cityURL, (data) => {
        console.log(data);

        $("#outputMain").html(` 
                    <div class="heading">
                        <span class="location">${data.location.name}</span>
                        <img src=${data.current.condition.icon}></img>
                        <div class="temp">${data.current.temp_f}</div>
                        
                    </div>
                    <div class="subHeading">
                        <span class="">${data.current.condition.text}</span>
                        <span>Feels like ${data.current.feelslike_f}</span>
                    </div>
                    
                `);
      }).fail((error) => {
        console.log("an error occured", error);
      });
    }
    if (zip != "") {
      let zipURL = baseURL + apiKey + "&q=" + zip + "&days=10&aqi=no&alerts=no";
      console.log(zipURL);
      $.getJSON(zipURL, (data) => {
        console.log(data);

        $("#outputMain").html(`
                    <div class="location">${data.location.name}</div>
                    <p>${data.current.condition.text}</p>
                    <img src=${data.current.condition.icon}></img>
                `);
      }).fail((error) => {
        console.log("an error occured", error);
      });
    }
  });
}

$(document).ready(function () {
  getData();
});
