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
    
    var car = $(this).text;

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        car + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
          url: queryURL,
          method: "GET"
    }).done(function(response) {

        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) 
        {
            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r") 
            {
                  // Creating a div with the class "item"
                  var gifDiv = $("<div class='item'>");

                  // Storing the result item's rating
                  var rating = results[i].rating;

                  // Creating a paragraph tag with the result item's rating
                  var p = $("<p>").text("Rating: " + rating);

                  // Creating an image tag
                  var carImage = $("<img>");

                  // Giving the image tag an src attribute of a proprty pulled off the
                  // result item
                  carImage.attr("src", results[i].images.fixed_height.url);

                  // Appending the paragraph and personImage we created to the "gifDiv" div we created
                   console.log(p);

                    console.log(carImage);


                  gifDiv.append(p);
                  gifDiv.append(carImage);

                  // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                  $("#carImages").prepend(gifDiv);
            }
        }
    });
}