/**
 * Created by Jason Wilson on 4/20/2016.
 */


/*Card flipping animation.  Each individual div is included to show if they are clicked, then toggleClass becomes activated\
and the 'flipcard' CSS takes effect and rotates the card on its Y axis.  The trick was learning that you dont flip the images, you\
flip the div itself.  I didnt know you could flip the actual container and still leave the contents as is.  It's possible\
to flip the images and leave the container alone but it's harder to do that*/

$(document).ready(function(){
    $(".card").click(function(){
        console.log('this is what this = ',this);
        card_clicked(this)
    });
});

/* Stuff related to Scope*/

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
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
         //since they match, next step is resetting the first and second card clicked back to null
         first_card_clicked = null;
         second_card_clicked = null;

         //this compares the source image for the first card clicked to the source image of the second card clicked and if\
         //equal then it increments the match counter by one//
         console.log("This is the match counter", match_counter)
         //match counter should be maxed at 9...18 cards means 9 total matches possible. if the counter reaches 9, then it will equal\
         //total possible matches that's also set to 9.  it would then declare you the winner//
         if (match_counter === total_possible_matches) {
             (console.log("user has won the game"))

         }
     } else{
             //if the images above dont match then it resets the value of both cards back to null//
         console.log("cards dont match");
         setTimeout(reset_cards, 2000);
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
}


