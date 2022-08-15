import { fetchAPI } from "./apiCall.js";


const dateToday = new Date(); 

fetchAPI('https://api.open-meteo.com/v1/forecast?latitude=57.00&longitude=24.12&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,winddirection_10m&current_weather=true', function(response){ 
    const hourly_data = response.hourly;
    const current_data = response.current_weather;
    console.log(response);

    displayCurrentData(current_data, hourly_data);
    
    displayDataByDay(hourly_data, dateToday.getDate()); 

    for (let i = 0; i < 6; i++) {
        let new_button = document.createElement('button'); 
        new_button.textContent = dateToday.getDate() + i;
        document.querySelector('.dates').append(new_button);
    
        new_button.onclick = function(){ 
            let selected_date = new_button.textContent;
            displayDataByDay(hourly_data, selected_date);
        }
    
    }

}); 
function displayCurrentData(current_data, hourly_data){ 
    const current = document.querySelector('.current'); 

    current.querySelector('.current__temperature').textContent = current_data.temperature;
    current.querySelector('.current__wind_dir').textContent = degToCompass(current_data.winddirection);
    current.querySelector('.current__wind_speed').textContent = current_data.windspeed;

    for (let i = 0; i < hourly_data.time.length; i++) {
        let item_date = new Date(hourly_data.time[i]);

        if(item_date.getDate() == dateToday.getDate() && item_date.getHours() == dateToday.getHours()){     
            current.querySelector('.current__humid').textContent = hourly_data.relativehumidity_2m[i];
        }
    } 
}

function displayDataByDay(hourly_data, date){ 
    const temp__list = document.querySelector('.hourly');
    const card = document.querySelector('.hourly__card');
    document.querySelector('h2').textContent = date + '.' + dateToday.getMonth() + '.' + dateToday.getFullYear();
    //temp__list.textContent = '';

    for (let i = 0; i < hourly_data.time.length; i++) {
        let new_card = card.cloneNode(true);
        let item_date = new Date(hourly_data.time[i]); 
        
        
        if(item_date.getDate() == date){ 
            new_card.querySelector('.hourly__time').textContent = item_date.getHours() + ':00';
            new_card.querySelector('.hourly__temperature').textContent = hourly_data.temperature_2m[i]+'°';
            temp__list.append(new_card);
        }
    }
}

function degToCompass(angle){ 
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return directions[Math.round(angle / 45) % 8];
}







