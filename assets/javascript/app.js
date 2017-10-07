//====================================================================
//  Global Variables
//====================================================================

// Default array of cars
var cars = ["BMW", "Mercedes-Benz", "Rolls Royce", "Ferrari", "Audi", "Bugatti", 
            "Lamborghini", "Pagani", "Range Rover", "Jaguar", "Bentley"];


//====================================================================
//  (document).ready()
//====================================================================
$(document).ready(function(){
    addButtons();
})

//====================================================================
//  addButtons()
//====================================================================
function addButtons() {

    $("#buttonsList").empty();
    for (var i = 0; i < cars.length; i++) 
    {
        var button = $("<button>");
        button.addClass("carButton");
        button.attr("name", cars[i]);
        button.attr("onclick", "getCarImages()");
        button.text(cars[i]);
        $("#buttonsList").append(button);
    }
}

//====================================================================
//  Event handler for processing button clicks
//====================================================================
function addCar()
{
    event.preventDefault();
    console.log("new car: ");
    var car = $("#carName").val().trim();
    console.log("new car: "+car);
    cars.push(car);
    console.log(cars);
    addButtons();
}

//====================================================================
//  getCarImages()
//====================================================================
function getCarImages()
{
    event.preventDefault();
}