var t = 60;

$(document).ready(function(){
    var sTime = setInterval(function(){
        if(t != 0){
            $("#timer").text(t + "");
            t = t-1;
        }else if(points >= 100){
            clearInterval(sTime);
            $("#timer").hide();
            Crafty.scene('Victory');
        }else{
            clearInterval(sTime);
            $("#timer").hide();
            Crafty.scene('Lose');
        }
    }, 1000);
});