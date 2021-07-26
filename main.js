// url

const urlPoc = "https://api.openweathermap.org/data/2.5/weather?q="
const urlOW = "https://api.openweathermap.org/data/2.5/"
const urlPocIk = "https://openweathermap.org/img/wn/"
const urlVlaj = "https://www.countryflags.io/"
const ulrLoc1 = "http://www.geoplugin.net/json.gp"
const ulrLoc2 =  "https://geolocation-db.com/json/"

// globalni promene a data

var mesto // vyhledavane misto
var historieData = []; // historie vyhledavani
var statD
var mestoD
var teplotaD
var oblohaD
var oblohaID
var vitrD
var vitrSmer
var tlakD
var vlhkostD
var vitrSmerName
var vitrRychKmH
var vitrName
var oblacnostD
var zlinID = '3339578'
var otrokoviceID = '3068690'
var kromerizID = '3072649'
var id1 = 'widget01'
var id2 = 'widget02'
var id3 = 'widget03'

// pocasi nastaveni

const klic = '35d5a8234bcaabdd844fa91135a33ade'
const klicGeo = '5478e9a0-e6ed-11eb-b435-8d4a35577878'
let jednotky = 'metric'
let jazyk = 'cz'

// poloha
function aktualniData() {
    fetch(ulrLoc2 + klicGeo)
    .then(dataLoc => {
        if(!dataLoc.ok) {
            window.alert("CHYBA NAČTENÍ POLOHY");
        } else {
            console.log('POLOHA NACTENA')
            return dataLoc.json()
        }
    })
    .then((dataCN) => ziskejData.volejPocasi(dataCN.city))
    .catch(chyba => console.log(chyba)) 
}

// funkce volani pocasi - aktualni

let ziskejData = {
    volejPocasi: function(mesto) {
        fetch(urlPoc + mesto + '&units=' + jednotky + '&lang=' + jazyk + '&appid=' + klic)
        .then(dataPoc => {
            if(!dataPoc.ok) {
                window.alert("CHYBA NAČTENÍ DAT - zkontroluj správný název města");
            } else {
                console.log('DATA NACTENA')
                // vlozeni nazvu mesta do historie pokud uz tam mesto neni
                if (!historieData.includes(mesto)) {
                    historieData.push(mesto);
                    window.localStorage.setItem('polozka', JSON.stringify(historieData));
                    historiePosun();
                }
                // fce vraci data o pocasi pro dalsi zpracovani
                return dataPoc.json()
            }
        })
        .then(function(data) {
        return data
        })
        .then((data) => this.zobrazPocasi(data))
        .catch(chyba => console.log(chyba)) 
    },

    zobrazPocasi: function(data) {
        statD = data.sys.country
        mestoD = data.name
        teplotaD = data.main.temp
        oblohaD = data.weather[0].description
        oblohaID = data.weather[0].icon
        vitrD = data.wind.speed
        vitrSmer = data.wind.deg
        tlakD = data.main.pressure
        vlhkostD = data.main.humidity
        oblacnostD = data.clouds.all

        console.log(mestoD, statD, teplotaD, oblohaD, oblohaID, vitrD, vitrSmer, tlakD, vlhkostD, oblacnostD)

        if(vitrSmer>348 || vitrSmer<=11) {vitrSmerName = 'severní'}
        else if(vitrSmer>11 && vitrSmer<=33) {vitrSmerName = 'SSV'}
        else if(vitrSmer>33 && vitrSmer<=56) {vitrSmerName = 'severovvýchodní'}
        else if(vitrSmer>56 && vitrSmer<=78) {vitrSmerName = 'VSV'}
        else if(vitrSmer>78 && vitrSmer<=101) {vitrSmerName = 'východní'}
        else if(vitrSmer>101 && vitrSmer<=123) {vitrSmerName = 'VJV'}
        else if(vitrSmer>123 && vitrSmer<=146) {vitrSmerName = 'jihovýchodní'}
        else if(vitrSmer>146 && vitrSmer<=168) {vitrSmerName = 'VJV'}
        else if(vitrSmer>168 && vitrSmer<=191) {vitrSmerName = 'jižní'}
        else if(vitrSmer>191 && vitrSmer<=213) {vitrSmerName = 'JJZ'}
        else if(vitrSmer>213 && vitrSmer<=236) {vitrSmerName = 'jihozápdní'}
        else if(vitrSmer>236 && vitrSmer<=258) {vitrSmerName = 'ZJZ'}
        else if(vitrSmer>258 && vitrSmer<=281) {vitrSmerName = 'západní'}
        else if(vitrSmer>281 && vitrSmer<=303) {vitrSmerName = 'ZSZ'}
        else if(vitrSmer>303 && vitrSmer<=326) {vitrSmerName = 'severozápadní'}
        else if(vitrSmer>326 && vitrSmer<=348) {vitrSmerName = 'SSZ'}
        else {vitrSmerName = 'Chyba'}

        vitrRychKmH = Math.round((vitrD * 3.6) * 10) / 10

        if(vitrRychKmH < 1) {vitrName = 'bezvětří'}
        else if (vitrRychKmH >= 1 && vitrRychKmH < 6) {vitrName = 'vánek'}
        else if (vitrRychKmH >= 6 && vitrRychKmH < 12) {vitrName = 'slabý vítr'}
        else if (vitrRychKmH >= 12 && vitrRychKmH < 20) {vitrName = 'mírný vítr'}
        else if (vitrRychKmH >= 20 && vitrRychKmH < 29) {vitrName = 'dosti čerstvý vítr'}
        else if (vitrRychKmH >= 29 && vitrRychKmH < 39) {vitrName = 'čerstvý vítr'}
        else if (vitrRychKmH >= 39 && vitrRychKmH < 50) {vitrName = 'silný vítr'}
        else if (vitrRychKmH >= 50 && vitrRychKmH < 62) {vitrName = 'prudký vítr'}
        else if (vitrRychKmH >= 62 && vitrRychKmH < 75) {vitrName = 'bouřlivý vítr'}
        else if (vitrRychKmH >= 75 && vitrRychKmH < 89) {vitrName = 'vichřice'}
        else if (vitrRychKmH >= 89 && vitrRychKmH < 103) {vitrName = 'silná vichřice'}
        else if (vitrRychKmH >= 103 && vitrRychKmH < 118) {vitrName = 'mohutná vichřice'}
        else if (vitrRychKmH >= 118) {vitrName = 'orkán'}

        document.getElementById("poloha").innerHTML = mestoD + ", " + statD
        document.getElementById("vlajka").src = urlVlaj + statD + "/shiny/48.png"
        document.getElementById("teplota").innerHTML = teplotaD + "°C"
        document.getElementById("pocasi").innerHTML = oblohaD
        document.getElementById("pocasiIkona").src = urlPocIk + oblohaID + ".png"
        document.getElementById("vitr").innerHTML = vitrName + "&nbsp; " + vitrRychKmH + " km/h &nbsp; " + vitrSmerName + " směr"
        document.getElementById("tlak").innerHTML = "Tlak: " + tlakD + " hPa"
        document.getElementById("vlhkost").innerHTML = "Vlhkost: " + vlhkostD + " %"
        document.getElementById("oblacnost").innerHTML = "Oblačnost: " + oblacnostD + " %"    
    },

}

// prvky podle ID
let tlaHledej = document.querySelector('#tlaHledej')
let tlaSmaz = document.querySelector('#tlaSmaz')
let lokace = document.querySelector('#lokace')

// HISTORIE

function historieParse() {
    if (localStorage.getItem('polozka')) {
        historieData = JSON.parse(window.localStorage.getItem('polozka'))
    }
}

function historiePosun() {
    document.getElementById("historiePole").innerHTML = null;
    for (i = historieData.length - 1; i >= 0; i--) {
        document.getElementById("historiePole").innerHTML += historieData[i] + '\n';
    }
}

function historie() {
    historieParse()
    historiePosun()
    // nahrani dat na aktualni poloze
    aktualniData()
}

// ZADANI LOKACE - MESTA

tlaHledej.onclick = function () {
    if (lokace.value == 0) {
        window.alert("Je třeba zadát město, kde nás zajímá počasí!");        
        tlaHledej.removeAttribute('disabled');
    } 
    else {
        // blokovani tlacitka
        tlaHledej.setAttribute('disabled','disabled');

        // ulozeni zadane hodnoty
        mesto = lokace.value;

        // voláni API

        ziskejData.volejPocasi(mesto)

        // odblokovani tlacitka
        tlaHledej.removeAttribute('disabled');
    }
}

// Mazani historie
tlaSmaz.onclick = function (){
    historieData = [];
    window.localStorage.clear();
    document.getElementById("historiePole").innerHTML = null;
    window.alert("Lokální historie byla smazána"); 
}

// Datum

function casomira() {
    let datumCas = new Date()
    let hod = datumCas.getHours()
    let min = datumCas.getMinutes()
    let sec = datumCas.getSeconds()
    let rok = datumCas.getFullYear()
    let mes = datumCas.getMonth()
    console.log(mes)
    let den = datumCas.getDay()
    let datum = datumCas.getDate()

    let mesJm = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"] 
    let denJm = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"]

    let mesic = mesJm[mes]
    let denTyd = denJm[den]

    hod = ("0" + hod).slice(-2)
    min = ("0" + min).slice(-2)
    sec = ("0" + sec).slice(-2)

    document.getElementById("datum").innerHTML = mesic + "&nbsp;&nbsp;" + datum + "/" + (mes + 1.0) + "/" + rok
    document.getElementById("hodiny").innerHTML = denTyd + "&nbsp;&nbsp;" + hod + ":" + min + ":" + sec
}


// enter zmackne hledej
document
.addEventListener("keyup", function (event) {
    if (event.key == "Enter")
    {
        document.getElementById("tlaHledej").click();
    }
});

// widget

var script = document.createElement('script');
var s = document.getElementsByTagName('script')[0];

function widget (mestoWid, id) {
    src='https://openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js'    
    window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
    window.myWidgetParam.push({id: 11,cityid: mestoWid,appid: klic,units: 'metric',containerid: id,});
    script.async = true;
    script.charset = "utf-8";
    script.src = "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";    
    s.parentNode.insertBefore(script, s);
}

// aktualizace casu
setInterval(casomira,500)

// nahrani historie
window.onload = historie;

// widgets
widget(otrokoviceID, id1)
widget(zlinID, id2)
widget(kromerizID, id3)