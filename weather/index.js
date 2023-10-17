const your_weather=document.querySelector("[your-weather]");
const search_weather =document.querySelector("[search-weather]");
const grant_access=document.querySelector("[grant-access]");
const search_tab=document.querySelector("[search-tab]");
const searchbtn=document.querySelector("[data-searchbtn]");
const searchbar=document.querySelector("[data-searchbar]");
const loading_tab=document.querySelector("[loading-tab]");
const weather_info=document.querySelector("[weather-Info]");
const grantbtn=document.querySelector("[data-grant_Access]");

let current_tab=your_weather;
current_tab.classList.add("current-tab");
const key="460dd95a45ad7d679bf11f9572bda0c5";
getdata();
switch_tab(current_tab);


function switch_tab(clicked_tab)
{
    if(current_tab !=clicked_tab)
    {
    
        current_tab.classList.remove("active-class");
        current_tab=clicked_tab;
        current_tab.classList.add("active-class");
    }
    

    if(current_tab==your_weather)
    {
        weather_info.classList.remove("active-class");
        search_tab.classList.remove("active-class");

        getdata();
    }
    else
    {
        grant_access.classList.remove("active-class");
        weather_info.classList.remove("active-class");
        search_tab.classList.add("active-class");
        
    }


}

your_weather.addEventListener("click",()=>{
    switch_tab(your_weather);
});

search_weather.addEventListener("click",()=>{
        switch_tab(search_weather);
});

function getdata()
{
      const localcoord=sessionStorage.getItem("coordinates");

      if(!localcoord)
      {
        grant_access.classList.add("active-class");
        console.log("hello");
      }
      else
      {
        const coordinates=JSON.parse(localcoord);

        fetchweather(coordinates);
      }
}

async function fetchweather(coordinates)
{
    const {lat,lon}=coordinates;

    loading_tab.classList.add("active-class");

    try{
            let currweather=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
    const data= await currweather.json();
    loading_tab.classList.remove("active-class");
    weather_info.classList.add("active-class");

    putweatherinfo(data);
    }
    catch(err)
    {

    }


}



function putweatherinfo(data)
{
    const city_name=document.querySelector("[data-city_name]");
    const weather_desc=document.querySelector("[data-weatherType]");
    const temp=document.querySelector("[data-Temp]");
    const wind_speed=document.querySelector("[data-windSpeed]");
    const clouds=document.querySelector("[data-humidity]");
    const humidity=document.querySelector("[data-clouds]");
    const countryflag=document.querySelector("[data-flag]");
    const weathertype=document.querySelector("[data-weatherTypeIcon]");

    city_name.innerText=data?.name;
    weather_desc.innerText=data?.weather?.[0]?.description;
    temp.innerText=data?.main?.temp;
    wind_speed.innerText=data?.wind?.speed;
    clouds.innerText=data?.clouds?.all;
    humidity.innerText=data?.main?.humidity;

    countryflag.src=`https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    weathertype.src=`http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;


}

grantbtn.addEventListener("click",getgeolocation);


 function getgeolocation()
 {
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showposition);
    }
 }

 function showposition(pos)
 {
    const user_coodinates={
         lat:pos.coords.latitude,
         lon:pos.coords.longitude

    }

    // console.log(user_coodinates.lat);
    // console.log(user_coodinates.lon);
    sessionStorage.setItem("coordinates",JSON.stringify(user_coodinates));
    grant_access.classList.remove("active-class");
    fetchweather(user_coodinates);
 }

 searchbtn.addEventListener("click",()=>
 {

    searchcity();
 });

async  function searchcity()
{
    
    let city=searchbar.value;
    try{

        if(city!=null)
        {
            loading_tab.classList.add("active-class");
            weather_info.classList.remove("active-class");
            const yourweather=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
            const data=await yourweather.json();

            if(data?.cod=="404")
            {
                alert("city not found");
            }
            else
            {
            
             loading_tab.classList.remove("active-class");   
            weather_info.classList.add("active-class");
            putweatherinfo(data);
            }
        }
    }
    catch(err)
    {
        
    }
}
