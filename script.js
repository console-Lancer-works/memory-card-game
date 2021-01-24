// default data
let srcs=['blackWidow','blackWidow','blackPanther','blackPanther','captainAmerica','captainAmerica','hulk','hulk','ironMan','ironMan','thor','thor'];
let turn = 3; //number for n=rotation turns
let first,second,e1,e2,score=0,lives=5;
let scorecard=document.getElementById("score"); //score span
let life=document.getElementById("lives");  //  lives span

// shuffle the data
function shuffle(){
    
    for(let i=srcs.length-1;i>0;i--)
    {
        let j=Math.floor(Math.random()*i);
        let temp = srcs[i];
        srcs[i]=srcs[j];
        srcs[j]=temp;
    }
}

//load content on page load
function loadContent(){
    shuffle();
    for(let k=0;k<12;k++){
        document.getElementById('game').innerHTML+=
        `<div class="flip-container">
            <div class="flipper" id="${srcs[k]}" onclick="show(${k})" >
                <div class="front">
                    <img src="images/avengers.png" width="100%" height="100%">
                </div>
                <div class="back">
                    <img src="images/${srcs[k]}.jpg" width="100%" height="100%">

                </div>
            </div>
        </div>`
    }
}

//onclick firing function
function show(e){
    --turn;

// first card value
    if(turn == 2){
        e1=e;
        first=document.getElementById('game').children[e].children[0];
        first.style.transform="rotateY(180deg)";
    }

// second card value
    else if(turn == 1){
        turn = 3;
        e2=e;

        if(e1!=e2){                                 /* if card1 and car2 are not same*/ 
            second =document.getElementById('game').children[e].children[0];
            second.style.transform="rotateY(180deg)";
            checkResult(first,second);

        }
        else if(e1==e2){                              /* if card 1 and card 2 are same*/
            first.style.transform="rotateY(0deg)";
            lives=lives-1;
            if(lives==0){
                gameOver()
            }
            life.innerHTML=lives;

        }
        
    }
}


/* if card1 and card2 are not same fireoff function  */
function checkResult(first,second){
    let firstcard = first.getAttribute("id");       // id of first card
    let secondcard = second.getAttribute("id");     // id of second card
    if(firstcard!=secondcard){
        setTimeout(function(){   
                /* rotaing back the card if doesn't match */ 
                first.style.transform="rotateY(0deg)";
                second.style.transform="rotateY(0deg)";
        }, 1000);
        firstcard="";
        secondcard="";
        lives=lives-1;
        if(lives==0){
            gameOver()
        }

        life.innerHTML=lives;
    }
    else if(firstcard == secondcard &&(firstcard!="") && (secondcard!=0)){
       
        /*  disabling on click if cards have same id */
        first.onclick="false"; 
        first.style.cursor="default";
        second.onclick="false";
        second.style.cursor="default";
        score=score+5;
        if(score==30){
            gameOver();
        }
        scorecard.innerHTML=score;
    }

}

function gameOver(){
    document.getElementById("totalScore").innerHTML=score;
    document.getElementById("modal").style.visibility='visible';
    
}