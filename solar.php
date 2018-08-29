<?php
$WeatherSource = "https://api.forecast.io/forecast/fc2698436e6d1419f04b76276cd12cf6/" . $_GET["lat"] . "," . $_GET["lng"];
header("Content-Type: application/json");
header("Cache-Control: no-cache");
readfile($WeatherSource);
?>