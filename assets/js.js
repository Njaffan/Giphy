$(document).ready(function() {

  var animals = [
    "dog", "cat", "bird", "snake", "tiger"
  ];

  //add button
  function addButton(array, addingClass, AddingTo) {
    $(AddingTo).empty();

    for (var i = 0; i < array.length; i++) {
      var a = $("<button>");
      a.addClass(addingClass);
      a.attr("data-type", array[i]);
      a.text(array[i]);
      $(AddingTo).append(a);
    }

  }

  $(document).on("click", ".NewButton", function() {
    $("#animals").empty();
    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div class=\"animal\">");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        

        animalDiv.append(p);
        animalDiv.append(animalImage);

        $("#animals").append(animalDiv);
      }
    });
  });

  $(document).on("click", ".animal-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("input").eq(0).val();

    if (newAnimal.length > 2) {
      animals.push(newAnimal);
    }

    addButton(animals, "NewButton", "#NewButtons");

  });

  addButton(animals, "NewButton", "#NewButtons");
});
