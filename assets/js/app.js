var buttons = ["dog", "cat", "rabbit","hamster","skunk"];
var userpick = "";
var app = {

  defaultButtons: function() {
    for (var i = 0; i < buttons.length; i++) {

      var bt = $("<button>"); 
      bt.attr("class", "button"); 
      bt.attr("animal", buttons[i]); 
      bt.append("" + buttons[i]); 

      $("#buttons").append(bt); 

    };
  },

  //Function to create buttons typed by user.
  newButton: function() {

    //Get the value typed in the text box.
    var newbutton = $("#animal-input").val().trim();

    //Create the new button, and add an ID and a custon attribute.
    var bt = $("<button>");
    bt.attr("class", "button");
    bt.attr("animal", newbutton);
    bt.append("" + newbutton);

    //Append the new button to the div "buttons".
    $("#buttons").append(bt);

    //Cleaning text box.
    $("#animal-input").text("");
  },

  //Creates a new button//Creates a new button
  showGif: function() {

    //Cleaning div
    $("#images").empty();

    //Generatin the QueryURL.
    var api = "&api_key=osci6gUKNLoHPAxZkxn8zpUNbfrXEghy";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userpick + api;

    //Getting Giphy API with Ajax.
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) { 

      for (var j = 0; j < 10; j++) {
        var gifSpan = $("<div>"); 
        var ratingDiv = $("<div>"); 
        var gifImg = $("<img>");
        var gifWidth = 0;
        var spanWidth = 0;

        gifSpan.attr("id", "gif"); 
        ratingDiv.append("Rating: ", response.data[j].rating); 

        gifImg.attr("src", response.data[j].images.original.url); 
        gifImg.attr("height", "230px"); 
        gifImg.attr("alt", userpick); 

        gifWidth = Math.round(((230 * response.data[j].images.original.width) / response.data[j].images.original.height) * 100) / 100;

        spanWidth = gifWidth + 10;

        gifSpan.width(spanWidth);
        console.log(queryURL, gifWidth);

        gifSpan.append(ratingDiv); 
        gifSpan.append(gifImg); 



        $("#images").append(gifSpan);

        //Clean userpick
        userpick = "";
      };
    });
  },
};


//Calls function on load to create all the default buttons.
app.defaultButtons();


//Adding a new custom button by user.
$("#addAnimal").on('click', function(event) {
  event.preventDefault();

  app.newButton();
});

//Clicking one of the buttons.
$(document.body).on('click', ".button", function(event) {
  event.preventDefault();

  //Updates the userpick variable with the value
  userpick = $(this).attr("animal");
  app.showGif();
});