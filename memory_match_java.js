/**
 * Created by Jason Wilson on 4/20/2016.
 */


/*Card flipping animation.  Each individual div is included to show if they are clicked, then toggleClass becomes activated\
 and the 'flipcard' CSS takes effect and rotates the card on its Y axis.  The trick was learning that you dont flip the images, you\
 flip the div itself.  I didnt know you could flip the actual container and still leave the contents as is.  It's possible\
 to flip the images and leave the container alone but it's harder to do that*/

$(document).ready(function(){
    shuffleCards();
    newShuffled();
    console.log('this is ' , newArray);


    $(".card").click(function(){
        card_clicked(this);

    });

    $(".reset").click(function() {
        games_played++;
        reset_stats();
        display_stats();
        reset_all_cards();
    });

});

/* Stuff related to Scope*/

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9; //this number can be changed if you add more cards to the game//
var match_counter = 0;
var matches=0;
var attempts=0;
var accuracy=0;
var games_played=0;
var match_attempts=0;
var match_accuracy=0;
var memory_game_images=['images/jake1.png',
    'images/finn1.jpg',
    'images/iceking1.jpg',
    'images/princessbubblegum.png',
    'images/beemo1.png',
    'images/marceline1.png',
    'images/lemongrab1.png',
    'images/lsp1.jpg',
    'images/cinnamonbun1.png',
    'images/jake1.png',
    'images/finn1.jpg',
    'images/iceking1.jpg',
    'images/princessbubblegum.png',
    'images/beemo1.png',
    'images/marceline1.png',
    'images/lemongrab1.png',
    'images/lsp1.jpg',
    'images/cinnamonbun1.png'];


var newArray = [];
function shuffleCards() {
    var image_array_length = memory_game_images.length;
    for (var i = 0; i < image_array_length; i++) {
        var randomNum = memory_game_images.splice(Math.floor(Math.random() * memory_game_images.length), 1);
        newArray.push(randomNum[0]);

    }
}
function newShuffled() {
    for (var i = 1; i <= newArray.length; i++) {
    var currentCard = ".card" + i;
        $(currentCard).hasClass('front').find('img').attr('src', newArray[i-1]);
        console.log(currentCard);

    }
}


function card_clicked(card) {
    console.log("this is what card is in the card_clicked function = ", card);
    $(card).toggleClass('flipcard');

    if (first_card_clicked == null) {
        first_card_clicked = $(card);
        return;
    }else {
        second_card_clicked=$(card);
        console.log("First card :", first_card_clicked.find('.front img').attr('src'));
    }
    if (second_card_clicked == null) {
        second_card_clicked = $(card);
        return;
    }else{
        second_card_clicked=$(card);
        console.log("Second card :", second_card_clicked.find('.front img').attr('src'));
    }
    if (first_card_clicked.find('.front img').attr('src') == second_card_clicked.find('.front img').attr('src') ){
        match_counter++;
        attempts++;
        display_stats();
        //since they match, next step is resetting the first and second card clicked back to null
        first_card_clicked = null;
        second_card_clicked = null;

        //this compares the source image for the first card clicked to the source image of the second card clicked and if\
        //equal then it increments the match counter by one//
        console.log("This is the match counter", match_counter);
        //match counter should be maxed at 9...18 cards means 9 total matches possible. if the counter reaches 9, then it will equal\
        //total possible matches that's also set to 9.  it would then declare you the winner//
        if (match_counter === total_possible_matches) {
            (console.log("user has won the game"));
            alert('YOU WIN!!!!');

        }
    } else{
        //if the images above dont match then it resets the value of both cards back to null//
        console.log("cards dont match");
        attempts++;
        display_stats();
        //set the counter to 1250 because 2 seconds feels too long.
        setTimeout(reset_cards, 1200);
    }
}

function reset_cards() {
//if they match, then next we want to remove the ability to click on them again so you cant flip them face down again.
    //then we reset the value of first and second card clicked back to null again so the card clicking function can run
    //again from the beginning.//
    first_card_clicked.removeClass('flipcard');
    second_card_clicked.removeClass('flipcard');
    first_card_clicked = null;
    second_card_clicked = null;
    shuffleCards();
}
function reset_all_cards() {
    //resets all cards to face down status//
    $('.flipcard').removeClass('flipcard');
    first_card_clicked = null;
    second_card_clicked = null;
    shuffleCards();
}
//displayed status of the game//
function display_stats() {

    if(attempts!=0) {
        accuracy=Math.floor(match_counter/attempts*100);
    }else {
        accuracy=0;
    }

    //takes .games-played value and puts it in text form into the var declared above called games_played//
    $('.games-played').text(games_played);
    //takes attempts value and displays it in attempts var//
    $('.attempts').text(attempts);
    //takes the accuracy, displays it in accuracy var and adds the string "%" to the number so it looks like a percentage//
    $('.accuracy').text(accuracy + "%");
    if(match_counter === total_possible_matches) {
        $('#victory').fadeIn();

    }


}
//function that kicks in when you hit the reset game button.  resets the counters on the stats to zero//
function reset_stats() {
    accuracy = 0;
    match_counter = 0;
    attempts = 0;
    //it then calls the display status function listed above because you want it to display all the stats as zeroed out for the reset//
    display_stats()
}
//first the reset button is clicked, then function is called that does all the items that follow-increment,reset stats and cards//


