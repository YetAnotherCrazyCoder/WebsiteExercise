//document.getElementById("demo").innerHTML = "Hello World!";
//document.getElementsByTagName(name)
//document.getElementsByClassName(name)
//https://www.w3schools.com/js/js_htmldom_elements.asp

// Changing HTML Elements
// Method	Description
// element.innerHTML =  new html content	Change the inner HTML of an element
// element.attribute = new value	Change the attribute value of an HTML element
// element.setAttribute(attribute, value)	Change the attribute value of an HTML element
// element.style.property = new style	Change the style of an HTML element

//document.getElementById("myImage").src = "landscape.jpg";
//document.getElementById("p2").style.color = "blue";


// Adding and Deleting Elements
// Method	Description
// document.createElement(element)	Create an HTML element
// document.removeChild(element)	Remove an HTML element
// document.appendChild(element)	Add an HTML element
// document.replaceChild(element)	Replace an HTML element
// document.write(text)	Write into the HTML output stream

// Adding Events Handlers
// Method	Description
// document.getElementById(id).onclick = function(){code}
// document.getElementById("myBtn").onclick = displayDate;
// <button onclick="displayDate()">Try it</button>

// Property	Description	DOM
// document.anchors	Returns all <a> elements that have a name attribute	1
// document.applets	Returns all <applet> elements (Deprecated in HTML5)	1
// document.baseURI	Returns the absolute base URI of the document	3
// document.body	Returns the <body> element	1
// document.cookie	Returns the document's cookie	1
// document.doctype	Returns the document's doctype	3
// document.documentElement	Returns the <html> element	3
// document.documentMode	Returns the mode used by the browser	3
// document.documentURI	Returns the URI of the document	3
// document.domain	Returns the domain name of the document server	1
// document.domConfig	Obsolete. Returns the DOM configuration	3
// document.embeds	Returns all <embed> elements	3
// document.forms	Returns all <form> elements	1
// document.head	Returns the <head> element	3
// document.images	Returns all <img> elements	1
// document.implementation	Returns the DOM implementation	3
// document.inputEncoding	Returns the document's encoding (character set)	3
// document.lastModified	Returns the date and time the document was updated	3
// document.links	Returns all <area> and <a> elements that have a href attribute	1
// document.readyState	Returns the (loading) status of the document	3
// document.referrer	Returns the URI of the referrer (the linking document)	1
// document.scripts	Returns all <script> elements	3
// document.strictErrorChecking	Returns if error checking is enforced	3
// document.title	Returns the <title> element	1
// document.URL	Returns the complete URL of the document	1


var errorTitle;
var errorText;

//Part 1.2 Use JS for handling events
window.onload = RunScripts();

function RunScripts() {
    errorTitle = document.getElementById("errorTitle");
    errorText = document.getElementById("errorText");
    updateFooter();
    startWorker();
    getHtmlText();
}

//Part 1.2 Use JS for DOM manipulation
//Function updates the footer text so the copyright year is a current year
function updateFooter() {
    var currentDate = new Date();
    document.getElementById("footerText").innerHTML = `Design & Coding by Arek, Copyright &#169; ${currentDate.getFullYear()}`
}

//Part 1.2 Use JS for DOM manipulation
//Function is changing classes applied to nav bar and hamburger button on a nav bar
function switchNavbar() {
    var navbar = document.getElementById("navBar");
    var navbtn = document.getElementById("navbtn");

    if (navbar.className === "topnav") {
        navbar.className += " responsive";
    } else {
        navbar.className = "topnav";
    }

    if (navbtn.className === "fa fa-bars") {
        navbtn.className = "fas fa-times";
    } else {
        navbtn.className = "fa fa-bars";
    }
}

//Part 1.4 Use XMLHttpRequest objects to comunicate data
//Function is using XMLHttpRequest to retrive file content and to display it
function getHtmlText() {
    var textPlaceholder = document.getElementById("htmlText");
    if (textPlaceholder) {
        try {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    textPlaceholder.innerHTML = this.responseText;
                    textPlaceholder.className = "";
                }
                else {
                    textPlaceholder.className = "error";
                    textPlaceholder.innerHTML = "XMLHttpRequest error. Please try using Firefox browser";
                }
            };
            xhttp.open("GET", "txt/html.txt", true);
            xhttp.send();
        } catch (error) {
            textPlaceholder.innerHTML = error;
        }
    }
}

//Part 1.6.2 Collect user location data
var userLocationText;

function getLocation() {
    userLocationText = document.getElementById('location');
    if (userLocationText) {
        userLocationText.scrollIntoView();
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        errorTitle.innerHTML = "Error occured";
        errorText.className = "error";
        errorText.innerHTML += "<li>Geolocation is not supported by this browser.</li>";
    }
}

function showPosition(position) {
    userLocationText.innerHTML = "Your position is:<br>Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;

    try {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                obj = JSON.parse(this.responseText);
                console.log(obj);
                city = obj.name;
                temperature = obj.main.temp;
                pressure = obj.main.pressure;
                humidity = obj.main.humidity;
                windSpd = obj.wind.speed;
                windDir = obj.wind.deg;
                description = obj.weather[0].main;
                userLocationText.innerHTML += 
                `</br>${city} ${temperature}&#8451; ${description}
                </br> Pressure: ${pressure} hpa
                </br> Humidity: ${humidity} &#37;
                </br> Wind: ${windSpd} m/s ${windDir}&deg;`;
            }
        };
        xhttp.open("GET", `.netlify/functions/weather?lon=${position.coords.longitude}&lat=${position.coords.latitude}`, true);
        xhttp.send();
    } catch (error) {
        errorTitle.innerHTML = "Error occured";
        errorText.className = "error";
        errorText.innerHTML += "<li>" + error + "</li>";
    }
}

function showError(error) {
    errorTitle.innerHTML = "Error occured";
    errorText.className = "error";

    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorText.innerHTML += "<li>You denied the request for Geolocation." + "<br>";
            break;
        case error.POSITION_UNAVAILABLE:
            errorText.innerHTML += "<li>Location information is unavailable." + "<br>";
            break;
        case error.TIMEOUT:
            errorText.innerHTML += "<li>The request to get your location timed out." + "<br>";
            break;
        case error.UNKNOWN_ERROR:
            errorText.innerHTML += "<li>An unknown error occurred." + "<br>";
            break;
    }
}

var webWorker;

function startWorker() {
    var resultDisplay = document.getElementById("result");

    try {
        if (typeof (Worker) !== "undefined") {
            if (typeof (webWorker) == "undefined") {
                webWorker = new Worker("js/time.js");
            }
            webWorker.onmessage = function (event) {
                resultDisplay.innerHTML = event.data;
            };
        } else {
            errorTitle.innerHTML = "Error occured";
            errorText.className = "error";
            errorText.innerHTML += "<li>Sorry, your browser does not support Web Workers...</li>";
        }
    } catch (error) {
        errorTitle.innerHTML = "Error occured";
        errorText.className = "error";
        errorText.innerHTML += "<li>" + error + "<br>Please try using Firefox browser</li>";
    }
}

function stopWorker() {
    webWorker.terminate();
    webWorker = undefined;
}

