
const emohis = ["images/chocolate.jpeg","images/cool.jpeg","images/happy.jpeg","images/heart.jpeg",
    "images/hut.jpeg","images/monkey.png","images/sick.jpeg","images/smile.jpg","images/think.jpeg"
];
const newEmojis = emohis.sort( () => Math.random() -0.5 ).concat(emohis);

for(let i=0; i<newEmojis.length; i++){
    let card = document.createElement("DIV");
    card.classList.add("card");
    let img = document.createElement("IMG");
    img.className = "images";
    img.src = newEmojis[i];
    card.appendChild(img);
    document.getElementById("inbox").appendChild(card);
    
    card.onclick = function(){
        this.classList.add("openCard");
        var openCards = document.querySelectorAll(".openCard");
        setTimeout(()=> {
            if(openCards.length == 2){
                console.log(openCards[1].querySelector(".images").src);
                if(openCards[1].querySelector(".images").src === openCards[0].querySelector(".images").src){  
                    openCards[0].classList.add("match");
                    openCards[1].classList.add("match");
                    openCards[0].classList.remove("openCard");
                    openCards[1].classList.remove("openCard");
                }
                else{
                  
                    openCards[0].classList.remove("openCard");
                    openCards[1].classList.remove("openCard");
                   
                }
            }
            if(document.querySelectorAll(".match").length == newEmojis.length){
                alert("You Win, Well Done!");
            }
        },500);
        
   }
}