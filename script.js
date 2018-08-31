/*  Exercise 01_11_01

    Whole Spectrum Energy Solutions
    Author: Zedekiah Cole
    Date: 8/29/18  

    Filename: script.js
*/

"use strict";

// global variables
var selectedCity = "Tucson, AZ";
var weatherReport = null; //holds response data
var httpRequest = false; //have an XHR object to use

//function to instatansite XHR object
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        document.querySelector("p.error").innerHTML = "Forecast not supported by your browser.";
        document.querySelector("p.error").style.display = "block";
        return false;
    }
    return httpRequest;
}


//function to process reponse data
function fillWeather() {
    //check reponse state for 4 (done) and status 200
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        weatherReport = JSON.parse(httpRequest.responseText);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var dateValue = new Date(weatherReport.daily.data[0].time);
        var dayOfWeek = dateValue.getDay();
        var rows = document.querySelectorAll("section.week table tbody tr");
        document.querySelector("section.week table caption").innerHTML = selectedCity;
        //populate rows with data
        for (var i = 0; i < rows.length; i++) {
            var firstCell = rows[i].getElementsByTagName("td")[0];
            var secondCell = rows[i].getElementsByTagName("td")[1];
            var thirdCell = rows[i].getElementsByTagName("td")[2];
            firstCell.innerHTML = days[dayOfWeek];
            //change day of the week in loop
            if (dayOfWeek + 1 === 7) {
                dayOfWeek = 0;
            } else {
                dayOfWeek++;
            }
                //find out the sun cover percentage
                var sun = Math.round((1 - weatherReport.daily.data[i].cloudCover) * 100, 0);
                //change symbol color based on sun percentage
                if (sun > 90) {
                    secondCell.style.color = "rgb(255,171,0)";
                } else if (sun > 80 && sun <= 90) {
                    secondCell.style.color = "rgb(255,179,25)";
                } else if (sun > 70 && sun <= 80) {
                    secondCell.style.color = "rgb(255,1188,51)";
                } else if (sun > 60 && sun <= 70) {
                    secondCell.style.color = "rgb(255,196,77)";
                } else if (sun > 50 && sun <= 60) {
                    secondCell.style.color = "rgb(255,205,102)";
                } else if (sun > 40 && sun <= 50) {
                    secondCell.style.color = "rgb(255,213,128)";
                } else if (sun > 30 && sun <= 40) {
                    secondCell.style.color = "rgb(255,221,153)";
                } else if (sun > 20 && sun <= 30) {
                    secondCell.style.color = "rgb(255,230,179)";
                } else if (sun > 10 && sun <= 20) {
                    secondCell.style.color = "rgb(255,238,204)";
                } else if (sun <= 10) {
                    secondCell.style.color = "rgb(255,247,230)";
                }
                secondCell.style.fontSize = "2.5em";
                thirdCell.innerHTML = sun + "%";
            }
                document.querySelector("section.week table caption").style.display = "block";
                document.querySelector("section.week table").style.display = "inline-block";
                document.querySelector("section.week p.credit").style.display = "block";
            }
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
            httpRequest.open("get", "solar.php?" + "lat=" + latitude + "&lng=" + longitude, true);
            //send request to server
            httpRequest.send(null);
            httpRequest.onreadystatechange = fillWeather;
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