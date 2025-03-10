

function add(){
   
    const userColor = document.getElementById("userColor").value;
    const userWidth = document.getElementById("userWidth").value + "px";
    const userHeight = document.getElementById("userHeight").value + "px";
    const userText = document.getElementById("userText").value;
    const textColor = document.getElementById('textColor').value;
    const fontSize = document.getElementById("fontSize").value + "px";
    const borderThick = document.getElementById("borderThick").value + "px";
    const borderStyle = document.getElementById("borderStyle").value;
    const borderColor = document.getElementById('borderColor').value;
    const padding = document.getElementById("padding").value + "px";
    const margin = document.getElementById("margin").value + "px";
    const borderRadius = document.getElementById("borderRadius").value + "px";
    const typeOfElement = document.getElementById("type").value; 
    const shadowX = document.getElementById("shadowX").value + "px";
    const shadowY = document.getElementById("shadowY").value + "px";
    const shadowColor = document.getElementById("colorOfShadow").value;
    const elementDate = new Date();
    const day = (elementDate.getDate()) < 10 ? "0" + elementDate.getDate() : elementDate.getDate();
    const mounth = (elementDate.getMonth()+1) < 10 ? "0" + (elementDate.getMonth()+1) : (elementDate.getMonth()+1);
    const year = elementDate.getUTCFullYear();
    const hour = elementDate.getHours().toString().padStart(2,"0");
    const minute = elementDate.getMinutes().toString().padStart(2,"0");
    const second = elementDate.getSeconds().toString().padStart(2,"0");
    const uniqeId = "elementId"
    let box = document.createElement(typeOfElement);
    box.style.width = userWidth;
    box.style.height = userHeight;
    box.style.color = textColor;
    box.style.fontSize = fontSize;
    box.style.border = `${borderThick} ${borderColor} ${borderStyle}`;
    box.style.padding = padding;
    box.style.margin = margin;
    box.style.borderRadius = borderRadius;
    box.style.boxShadow = `${shadowX} ${shadowY} 5px  ${shadowColor}`;
    box.textContent = userText + " " + " נוצר בתאריך: " + day + "/" + mounth + "/" + year + "\n" + "בשעה: " + hour + ":" + minute + ":" + second;
    box.style.display = "flex";
    box.style.alignItems = "center";
    box.style.justifyContent = "center";
    box.style.textAlign = "center";
    box.style.fontSize = "15px";
    box.id = uniqeId;
    document.getElementById("inbox").appendChild(box);
    if(typeOfElement.startsWith("h")){
        box.style.backgroundColor = "transparent";
        box.style.border = "none"
    }
    else{
        box.style.border = "1px solid black";
        box.style.backgroundColor = userColor;
    }
    save();
}
function deletBoard(){
    document.getElementById("inbox").innerHTML = "";
}
function save(){
    const saveBoard = document.getElementById("inbox").innerHTML;
    localStorage.setItem("save",saveBoard);    
}