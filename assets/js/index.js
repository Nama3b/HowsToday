// =================fader scroll=================

const faders = document.querySelectorAll('.fade-in');
const sliders = document.querySelectorAll('.slide-in');
const appearOptions = {
  threshold: 0,
};
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
  entries.forEach(entry => {
    if(!entry.isIntersecting){
      return;
    } else{
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader)
});

sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});


// ====================weather====================

var search = document.querySelector('.search')
var city = document.querySelector('.city')
var country = document.querySelector('.country')
var cityH = document.querySelector('.cityH')
var value = document.querySelector('.value')
var shortDesc = document.querySelector('.short-desc')
var visibility = document.querySelector('.visibility span')
var wind = document.querySelector('.wind span')
var sun = document.querySelector('.sun span')
var value = document.querySelector('.value span')
var time = document.querySelector('.time span')
var content = document.querySelector('.content')
var body = document.querySelector('body')


async function changeWeatherUI(capitalSearch){
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=cb8d857e9528680474d1a7a90b239fba
    `
    
    let data = await fetch(apiURL).then(res=> res.json())
    if(data.cod == 200){
        content.classList.remove('hide')
        city.innerText = data.name
        country.innerText = data.sys.country
        cityH.innerText = data.name
        visibility.innerText = data.visibility + 'm'
        wind.innerText = data.wind.speed + 'm/s'
        sun.innerText = data.main.humidity + '%'
        let temp = Math.round((data.main.temp - 273.15 ))
        value.innerText = temp
        shortDesc.innerText = data.weather[0] ? data.weather[0].main : ''
        time.innerText = new Date().toLocaleString('vi')
        
        
        body.setAttribute('class', 'supa-hot')
        if(temp <= 35){
            body.setAttribute('class', 'hot')
        }
        if(temp <= 30){
            body.setAttribute('class', 'supa-warm')
        }
        if(temp <= 25){
            body.setAttribute('class', 'warm')
        }
        if(temp <= 20){
            body.setAttribute('class', 'cool')
        }
        if(temp <= 15){
            body.setAttribute('class', 'supa-cool')
        }
        if(temp <= 10){
            body.setAttribute('class', 'cold')
        }
        if(temp <= 5){
            body.setAttribute('class', 'supa-cold')
        }
            
        
    }else{
        content.classList.add('hide')
    }
}

search.addEventListener('keypress', function(e){
    if(e.code === 'Enter'){
        let capitalSearch = search.value.trim()
        changeWeatherUI(capitalSearch)
    }
})

changeWeatherUI('Ha Noi')
