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
    //addButtons();
})

//====================================================================
//  addButtons()
//====================================================================
function addButtons() {

    $("#buttons").empty();
    for (var i = 0; i < cars.length; i++) 
    {
        var button = $("<buttons>");
        button.addClass("carButton");
        button.attr("name", cars[i]);
        button.attr("index", i);
        button.attr("onclick", "getCarImages()");
        button.text(cars[i]);
        $("buttons").append(button);
    }

      for (var i=0; i < letters.length; i++)
         {
            var letterBtn = $('<buttons>');
            letterBtn.attr('class', 'letter-button letter letter-button-color');
            letterBtn.attr('data-letter', letters[i]);
            letterBtn.text(letters[i]);
            letterBtn.on("click", processLetter);
            $("#buttons").append(letterBtn);
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

function getCarImages() {
 //$("button").on("click", function() {
//{
    //event.preventDefault();
    
    var car = $(this).attr("index");

    console.log(car);

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
                  $("#carImages").append(p);

                  // Creating an image tag
                  var carImage = $("<img>");

                  // Giving the image tag an src attribute of a proprty pulled off the
                  // result item
                  carImage.attr("src", results[i].images.fixed_height.url);
                  $("#carImages").append(carImage);

                  // Appending the paragraph and personImage we created to the "gifDiv" div we created
                   console.log(p);

                    console.log(carImage);


                  //gifDiv.append(p);
                  //gifDiv.append(carImage);

                  // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                  //$("#carImages").prepend(gifDiv);
            }
        }
    });
}