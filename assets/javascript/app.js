var superheroesInitial = ["Doctor Who", "Superman", "Batman", "The Green Lantern", "The Flash", "Iron Man", "The Hulk", "Thor", "Doctor Strange", "Starlord", "Spiderman"];

var superheroes = [];

function copyInitial() {
    for (let i = 0; i < superheroesInitial.length; i++) {
        superheroes.push(superheroesInitial[i]);
    }
}

function renderButtons() {

    $("#superhero-buttons").empty();

    for (let i = 0; i < superheroes.length; i++) {

        var btn = $("<button>");
        btn.addClass("superhero-btn");
        btn.attr("data-name", superheroes[i]);
        btn.text(superheroes[i]);
        $("#superhero-buttons").append(btn);
    }
}


$("#add-superhero").on("click", function(event) {
    
    event.preventDefault();
    var superhero = $("#superhero-input").val().trim();
    superheroes.push(superhero);
    renderButtons();

});

$("#reset-superheroes").on("click", function(event) {
    event.preventDefault();
    superheroes = [];

    copyInitial();

    renderButtons();
})

$(document).on("click", ".superhero-btn", function() {

    var superheroName = $(this).attr("data-name");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + superheroName + "&limit=10&api_key=4xXFGIHs5QcgSjxj91eqr4aPYLWcG5LX"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)

    var results = response.data;

    for (let i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;
        var staticImg = results[i].images.fixed_height_still.url;
        var animatedImg = results[i].images.fixed_height.url;

        var p = $("<p>").text("Rating: " + rating);

        var superheroImage = $("<img>");

        superheroImage.addClass("superhero-img");
        superheroImage.attr("src", staticImg);
        superheroImage.attr("data-still", staticImg);
        superheroImage.attr("data-animate", animatedImg);
        superheroImage.attr("data-state", "still");

        gifDiv.append(superheroImage);
        gifDiv.append(p);

        $("#superhero-view").prepend(gifDiv);
    }

});

})

$(document).on("click", ".superhero-img", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("state", "still");
    }
})



$(function() {

    copyInitial();

    renderButtons();


});