/*  Exercise 01_11_01

    Whole Spectrum Energy Solutions
    Author: Zedekiah Cole
    Date: 8/29/18  

    Filename: script.js
*/

"use strict";

// global variables
var selectedCity = "Tucson, AZ";
var weatherReport;
var httpRequest = false; //have an XHR object to use

//function to instatansite XHR object
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        document.querySelector("p.error").innerHTML = "Forecast not supported by your browser.";
        document.querySelector("p.error").style.display = "block";
        return;
    }
    return httpRequest;
}

//get weather on load event or click to get selected city

function getWeather(evt) {
    var latitude;
    var longitude;
    if (evt.type !== "load") {
        if (evt.target) {
            selectedCity = evt.target.innerHTML;
        } else if (evt.srcElement) {
            selectedCity = evt.srcElement.innerHTML;
        }
    }
    if (selectedCity === "Tucson, AZ") {
        latitude = 37.7577;
        longitude = -122.4376;
    } else if (selectedCity === "Chicago, IL") {
        latitude = 41.8337329;
        longitude = -87.7321555;
    } else if (selectedCity === "Montreal, QC") {
        latitude = 45.5601062;
        longitude = -73.7120832;
    }
    //check for XHR object or instantiate one
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    // clear any open request
    httpRequest.abort();
    // target request to a resource
    httpRequest.open("get" , "solar.php?" + "lat=" + latitude + "&lng=" + longitude);
}

//retrive location cities from the page 
var locations = document.querySelectorAll("section ul li");

//add click event listners for li elements
for (var i = 0; i < locations.length; i++) {
    if (locations[i].addEventListener) {
        locations[i].addEventListener("click", getWeather, false);
    } else if (locations[i].attachEvent) {
        locations[i].attachEvent("onclick", getWeather);
    }
}

//calls in finction when the page load
if (window.addEventListener) {
    window.addEventListener("load", getWeather, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", getWeather);
}