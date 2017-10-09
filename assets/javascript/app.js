//====================================================================
//  Global Variables
//====================================================================

// Default array of cars
var cars = ["BMW", "ROLLS ROYCE", "FERRARI", "AUDI", "BUGATTI", 
            "LAMBORGHINI", "PAGANI", "RANGE ROVER", "MASERATI", "PORSCHE"];


//====================================================================
//  (document).ready()
//====================================================================
$(document).ready(function(){

    // Display the default buttons when the document is ready
    displayButtons();
});

//====================================================================
//  addButtons()
//====================================================================
function displayButtons() {

    // Remove the displayed buttons
    $("#buttonsView").empty();

    // Traverse the array of cars and display the corresponding buttons
    for (var i = 0; i < cars.length; i++) 
    {
        var button = $('<button>');
        button.addClass("carButton");
        button.attr('name', cars[i]);
        button.text(cars[i]);
        $("#buttonsView").append(button);
    }
}

//====================================================================
//  addCar()
//====================================================================
function addCar()
{
    event.preventDefault();

    // If a new value is submitted by the user, push it to the array
    var car = $("#carName").val().trim();

    // Clear the user input
    $("#carName").val("");

    if (car !=="")
    {
      car = car.toUpperCase();

      // If the car already exists in the array, don't add it again
      for (var i = 0; i < cars.length; i++) 
      {
        if (cars[i] === car)
          return;
      }
      cars.push(car);
      displayButtons();
    }
}

//====================================================================
//  (document).onClick()
//====================================================================

// Call getCarImages() when a car button is clicked.
$(document).on("click", ".carButton", getCarImages);

// Call toggleImageAnimation() when an image is clicked.
$(document).on("click", ".gif", toggleImageAnimation);

//====================================================================
//  getCarImages()
//====================================================================
function getCarImages() {
      
    $("#carImages").empty();

    var car = $(this).attr("name");
 
    // Constructing a URL to search Giphy for the name of the given topic, i.e. car
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        car + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing AJAX GET request
    $.ajax({
          url: queryURL,
          method: "GET"
    }).done(function(response) {

        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) 
        {
            // Filter out R rated images
            if (results[i].rating !== "r") 
            {
                  // Creating a div with the class "img-thumbnail"
                  var gifDiv = $("<div class='img-thumbnail'>");

                 // Creating a paragraph tag for the rating
                  var rating = results[i].rating;
                  var p = $("<p>").text("Rating: " + rating);
                  
                  // Create an image element and assign it the required attributes
                  var carImage = $("<img>");
                  carImage.attr("src", results[i].images.fixed_height_still.url);
                  carImage.attr("data-still", results[i].images.fixed_height_still.url);
                  carImage.attr("data-animate", results[i].images.fixed_height.url);
                  carImage.attr("class", "gif");
                  carImage.attr("data-state", "still");


                  // Appending the paragraph and image to "gifDiv"
                  gifDiv.append(p);
                  gifDiv.append(carImage);

                  // Pre-pending the gifDiv in the #carImages div
                  $("#carImages").prepend(gifDiv);
            }
        }
    });
}

//====================================================================
//  toggleImageAnimation()
//====================================================================
function toggleImageAnimation()
{
      // Toggle the state of the image between "data-still" and "data-animate" 
      // Update the src of the image accordingly

      var state = $(this).attr("data-state");

      if (state === "still") 
      {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } 
      else 
      {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
}