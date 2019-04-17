var difficulty = 'hard';
var midGame = false; 
var arr=[],user=[];

var templeteHard = `
<div class="grid-hard">
    <div class="box" id="s-1">1</div>
    <div class="box" id="s-2">2</div>
    <div class="box" id="s-3">3</div> 
    <div class="box" id="s-4">4</div>
    <div class="box" id="s-5">5</div>
    <div class="box" id="s-6">6</div>
</div>`;
 
var templeteEasy = `
<div class="grid-easy">
    <div class="box" id="s-1">1</div>
    <div class="box" id="s-2">2</div>
    <div class="box" id="s-3">3</div> 
    <div class="box" id="s-4">4</div>
</div>`;


$(document).ready(startGame())


function startGame() {
    $(".chooceDifficulty").on("click", function() {
        difficulty = $(this).text(); 
              
    })

    $("#getNum").click(function(){ 

        if(midGame === false) {
            $(".grid-easy").remove();
            $(".grid-hard").remove();
            $("#curNum").text('');
            $("#showNum").text('');
            var container =  $(".container");

            if(difficulty === 'hard') {
                container.append(templeteHard);
            }else {
                container.append(templeteEasy);
            }

            midGame = true;
            $(".chooceDifficulty").off();
            
        };       

    moreNumber();           
    });
}


function moreNumber () {
    $(".container").off();
    $("[id^='s-']").css({display: ""});
    
    $("#getNum").text("");
    user.length = 0; 
    var  i = 0;
    var newNum = 1 + Math.floor(Math.random() * $("[id^='s-']").length);

    arr.push(newNum);
    var loop = setInterval(function(){
        if(i < arr.length){
            $("#s-" + arr[i]).addClass("selected");
            var element = $("#s-" + arr[i])
            setTimeout(function() {
                element.removeClass("selected");
            },500);


        }else{
            clearInterval(loop);
            $("#getNum").text("תורך");
            $("#getNum").off();
            userTurn();
        }
            i++;
        },1000);
}


function userTurn () {
    $(".container").on('click', function(event) { 
        if($(event.target).hasClass("box")) {

            if(arr.length > user.length){
                var element = $(event.target);
                element.addClass("user-selected");
                setTimeout(function() {
                    element.removeClass("user-selected");
                },500);
                user.push(element.text());
                
            }

            if(arr.length == user.length){
                $("#getNum").text("הכל נכון ! - לחץ להמשך");
                $("#getNum").on("click", moreNumber);
                
            }

            for(k=0; k< user.length; k++){
                if ( arr[k] != user[k]){

                    $("#getNum").text("טעות ! - משחק חדש");
                    $("[id^='s-']").css({display: "none"});
                    $("#curNum").text("שחקן : " + user);
                    $("#showNum").text("סיימון : " + arr);		
                    arr.length = 0;
                    midGame = false;
                    startGame();
                }
            }
        }


    })
}

        

            

            

