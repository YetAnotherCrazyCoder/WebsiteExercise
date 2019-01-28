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


//Part 1.2 Use JS for handling events
window.onload = getText();

function getText() {
    console.log("runing getText script...");
    
    //Part 1.4 Use XMLHttpRequest objects to comunicate data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML =
                this.responseText;
        }
    };
    xhttp.open("GET", "txt/html.txt", true);
    xhttp.send();
}


//Part 1.2 Use JS for DOM manipulation
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