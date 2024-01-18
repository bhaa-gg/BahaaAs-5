const apiKey = "3dc8b7315cde4c08b3a162140240901";
let find = document.getElementById("basic-addon2");


let citys = document.getElementById("citys");

document.addEventListener("keyup", function () {
    let val = citys.value;
    if (val == "") {
        getData("cairo");

    }
    if (val.length > 2) {
        getData(val)
    }

}
)


function getdays(pram) {
    const d = new Date(pram);
    return d;
}

function dates(dates) {
    let day;
    switch (dates) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;

    }
    return day;

}
getData("cairo");

async function getData(city) {
    var data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3dc8b7315cde4c08b3a162140240901&q=${city}&days=3`)
    var result = await data.json();
    console.log(result);
    displayday(result);

}


function displayday(result) {
    let cartona1 = "";
    let arrDay = Array.from(result.forecast.forecastday);
    let Bday1 = arrDay[0];
    let day1 = Bday1.date;

    let bigDay = getdays(day1);
    let dayWeek = dates(bigDay.getDay());
    let dayMonth = bigDay.getDate();
    const month = bigDay.toLocaleString('default', { month: 'long' });
    console.log(arrDay);


    let Today = new Date();
    var formattedDate = `${Today.getFullYear()}-${(Today.getMonth() + 1).toString().padStart(2, '0')}-${Today.getDate().toString().padStart(2, '0')} ${Today.getHours().toString().padStart(2, '0')}:00`;

    for (let i = 0; i < Bday1.hour.length; i++) {
        if (Bday1.hour[i].time == formattedDate) {
            console.log(formattedDate);
            console.log(Bday1.hour[i].time);
            cartona1 = `
    <div class="col-md-4  d-flex  gy-5 ">
                        <div class="tables w-100 ">
                            <div class="tH tH1   bg-secondary d-flex justify-content-between">
                                <p class="p-2 m-0">${dayWeek}</p>
                                <p class="p-2 m-0">${dayMonth}${month}</p>
                            </div>
                            <div class="tB tB1 h-100 bg-body-secondary p-4 ">
                                <h5>${result.location.name}</h5>
                                <h6 class="">${parseInt(Bday1.hour[i].temp_c)}<sup>o</sup>c</h6>
                                <img src="${Bday1.hour[i].condition.icon}" alt="" width="48">
                                <p class="text-info">${Bday1.hour[i].condition.text}</p>
                                <ul class="list-unstyled  d-flex column-gap-4">
                                    <li>
                                        <span><img src="img/icon-umberella.png" class="pe-2" alt="">20%</span>
                                    </li>
                                    <li>
                                        <span><img src="img/icon-wind.png" class="pe-2" alt="">18km/h</span>
                                    </li>
                                    <li>
                                        <span><img src="img/icon-compass.png" class="pe-2" alt="">East</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
    `;
        }


    }


    let cartona2 = "";
    for (let i = 1; i <= 2; i++) {
        let Bdays = arrDay[i];
        let days = Bdays.date;
        let bigDay = getdays(days);
        let dayWeeks = dates(bigDay.getDay());

        cartona2 +=
            `
    <div class="col-md-4 d-flex   gy-5">
                        <div class="tables w-100  ">
                            <div class="tH  text-center  ${i == 2 ? " bg-secondary" : " bg-body-secondary"}">
                                <p class="p-2 m-0">${dayWeeks}</p>
                            </div>
                            <div class="tB  h-100 p-4 text-center${i == 2 ? " bg-body-secondary" : " bg-secondary"} ">
                                <img src="${Bdays.day.condition.icon}" alt="" class="py-4" width="48">
                                <h3>${(Bdays.day.maxtemp_c)}<sup>o</sup>C </h3>
                                <h4 class="pb-2">${(Bdays.day.mintemp_c)}<sup>o</sup></h4>
                                <p class="text-info ">${Bdays.day.condition.text}</p>
                            </div>
                        </div>
                    </div>
                    
    `

    }

    document.getElementById("weT").innerHTML = cartona1 + cartona2;
}

