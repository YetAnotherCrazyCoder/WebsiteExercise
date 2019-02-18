var errorTitle;
var errorText;

//Part 1.2 Use JS for handling events
window.onload = RunScripts();

function RunScripts() {
    errorTitle = document.getElementById("errorTitle");
    errorText = document.getElementById("errorText");
    SetTheme();
    updateFooter();
    startWorker();
    getHtmlText();
}
//END OF Event handling code for onload event

//Part 1.8 Implement an adaptive user interface
function SetTheme() {
    var themeSelected = localStorage.getItem("themeSelected");
    var body = document.getElementById("body");

    if (themeSelected === "light") {
        body.className = "light";
    }
    if (themeSelected === "dark") {
        body.className = "dark";
    }
}

function SwitchTheme() {
    var body = document.getElementById("body");
    var currentClass = body.className;

    if (currentClass === "dark") {
        localStorage.setItem("themeSelected", "light");
    }
    if (currentClass === "light") {
        localStorage.setItem("themeSelected", "dark");
    }

    SetTheme();
}
//END OF Adaptive user interface code

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
//END OF DOM manipulation coode

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
                } else {
                    textPlaceholder.className = "error";
                }
            };
            xhttp.open("GET", "txt/html.txt", true);
            xhttp.send();
        } catch (error) {
            errorTitle.innerHTML = "Error occured";
            errorText.className = "error";
            errorText.innerHTML += "<li>XMLHttpRequest error. Please try using Firefox browser</li>";
            errorText.innerHTML += "<li>" + error + "</li>";
        }
    }
}
//END OF XMLHttpRequest Code

//Part 1.6.2 Collect user location data
var userLocationText;
var googleMap;
var googleMapHeader;

function getLocation() {
    userLocationText = document.getElementById('location');
    googleMap = document.getElementById("goolemap");
    googleMapHeader = document.getElementById("googleMapHeader");

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

function toDegreesMinutesAndSeconds(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);
    return degrees + "&deg;" + minutes + "&prime;" + seconds + "&Prime; ";
}

function convertDMS(position) {
    var latitude = toDegreesMinutesAndSeconds(position.coords.latitude);
    var latitudeCardinal = Math.sign(position.coords.latitude) >= 0 ? "N" : "S";

    var longitude = toDegreesMinutesAndSeconds(position.coords.longitude);
    var longitudeCardinal = Math.sign(position.coords.longitude) >= 0 ? "E" : "W";

    return latitude + latitudeCardinal + " &ensp;" + longitude + longitudeCardinal;
}

function showPosition(position) {
    userLocationText.innerHTML = "Your position is: " + convertDMS(position);
    try {
        googleMapHeader.removeAttribute("hidden");
        googleMap.removeAttribute("hidden");
        var googleMapURL = "https://www.google.com/maps/embed/v1/place?q=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyA-5px9IvD9XjxTBh5EpJwYRp4XC7zaMTg";
        googleMap.src = googleMapURL;
        googleMap.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
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
            errorText.innerHTML += "<li>You denied the request for Geolocation." + "</li>";
            break;
        case error.POSITION_UNAVAILABLE:
            errorText.innerHTML += "<li>Location information is unavailable." + "</li>";
            break;
        case error.TIMEOUT:
            errorText.innerHTML += "<li>The request to get your location timed out." + "</li>";
            break;
        case error.UNKNOWN_ERROR:
            errorText.innerHTML += "<li>An unknown error occurred." + "</li>";
            break;
    }
}
//END OF Geolocation code

//Part 1.12 Create, run and monitor a Web Worker process
var webWorker;
var resultDisplay = document.getElementById("result");

function startWorker() {
    try {
        if (typeof (Worker) !== "undefined") {
            if (typeof (webWorker) == "undefined") {
                webWorker = new Worker("js/time.js");
                webWorker.onmessage = function (event) {
                    resultDisplay.innerHTML = event.data;
                };
            } else {
                resultDisplay.innerHTML = "Worker running";
            }
        }
    } catch (error) {
        errorTitle.innerHTML = "Error occured";
        errorText.className = "error";
        errorText.innerHTML += "<li>" + error + "<br>Please try using Firefox browser</li>";
    }
}

function messageWorker() {
    if(webWorker){
        var wwmessge = document.getElementById('wwmessge').value;
        webWorker.postMessage(wwmessge);
    } else {
        resultDisplay.innerHTML = "Start worker first";
    }
}

function stopWorker() {
    webWorker.terminate();
    webWorker = undefined;
    resultDisplay.innerHTML = "Worker stopped"
}
//END OF Web Worker Code

//Part 1.3 Create an operational web form using HTML5
function Register() {
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var email = document.getElementById('email').value;

    var password = document.getElementById('password').value;
    var rpassword = document.getElementById('rpassword').value;

    console.log(password + " " + rpassword);

    if (password === rpassword) {
        window.alert("This would process registration on backend");
    } else {
        window.alert("Password and Repeat Password does not match");
    }
}
//END OF Web Form Code

//Part 1.11 Use Web Sockets API with JS to send and receive real time communications data
function messageWebSocket() {
    if ("WebSocket" in window) {
        var webSocket = new WebSocket("wss://echo.websocket.org/");
        var fname = document.getElementById('fname').value;
        var webSocketResponseHolder = document.getElementById("webSocketResponse");

        webSocket.onopen = function () {
            webSocketResponseHolder.innerHTML += "<br>Sending <strong>" + fname + "</strong> to WebSocket.";
            webSocket.send(fname);
        };

        webSocket.onmessage = function (evt) {
            var webSocketResponse = evt.data;
            webSocketResponseHolder.innerHTML += "<br>WebSocket responded: Hello " + webSocketResponse + " how are you?";
        };

        webSocket.onclose = function () {
            webSocketResponseHolder.innerHTML += "<br>WebSocket closet the connection.";
        };
    } else {
        webSocketResponseHolder.innerHTML += "WebSocket is not supported by your Browser!";
    }
}
//END OF Web Socket code