 // Initial array of nature
 var nature = ["moutain", "cave", "clouds", "coral","bean","sea","sunrise"];
 var API_Key = "WlF8WjA7Qw6v7MiRpE46AygGsEOUMhoj";
 // displaygifInfo function re-renders the HTML to display the appropriate content
 $("#gifList-view").on("click",".gif", function() {
     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
     var state = $(this).attr("data-state");
     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
     // Then, set the image's data-state to animate
     // Else set src to the data-still value
     if (state === "still") {                   
     $(this).attr("src", $(this).attr("data-animate"));
     $(this).attr("data-state", "animate");
 } else {
     $(this).attr("src", $(this).attr("data-still"));
     
     $(this).attr("data-state", "still");
 }
});
 
 function displayGifInfo() {

     var gifSearch = $(this).attr("data-name");
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&limit=10&apikey=" + API_Key;
     console.log(queryURL);

     // Creates AJAX call for the specific nature button being clicked
     $.ajax({
         url: queryURL,
         method: "GET"
     }).then(function (response) {
         $("#gifList-view").empty();

         for (var i = 0; i < response.data.length; i++) {
             
             var gifInfoDiv=$("<div>").addClass("gifContent");
             var rating = $("<p>").text("Rating : "+response.data[i].rating);
             console.log("ratingDiv" + rating);
              var imageDiv = $("<img>")
              imageDiv.attr("src", response.data[i].images["original_still"].url);
              imageDiv.attr("data-still",response.data[i].images["original_still"].url);
              imageDiv.attr("data-animate",response.data[i].images["original"].url);
              imageDiv.attr("data-state","still");
              imageDiv.addClass("gif");


              gifInfoDiv.append(rating);
              gifInfoDiv.append(imageDiv);
              $("#gifList-view").append(gifInfoDiv);

                 
             }
         });
 }

 // Function for displaying nature data
 function renderButtons() {

     // Deletes the  prior data to add new data
     // (this is necessary otherwise you will have repeat buttons)
     $("#buttons-view").empty();
     // Loops through the array of movies
     for (var i = 0; i < nature.length; i++) {

         // Then dynamicaly generates buttons for each nature thing in the array
         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
         var a = $("<button>");
         // Adds a class of movie to our button
         a.addClass("nature");
         // Added a data-attribute
         a.attr("data-name", nature[i]);
         // Provided the initial button text
         a.text(nature[i]);
         // Added the button to the buttons-view div
         $("#buttons-view").append(a);
     }
 }

 // This function handles events when add gif button is clicked
 $("#add-gif").on("click", function (event) {
     event.preventDefault();
     // This line of code will grab the input from the textbox
     var getGif = $("#gif-input").val().trim();
     if(getGif!=""){

     // The Users gif request from the textbox is then added to our array
     nature.push(getGif);
     }

     // Calling renderButtons 
     renderButtons();
 });

 // Adding click event listeners to all elements with a class of "nature"
 $(document).on("click", ".nature", displayGifInfo);


 // Calling the renderButtons function to display the intial buttons
 renderButtons();