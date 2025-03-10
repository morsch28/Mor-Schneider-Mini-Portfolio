

function add(){
    let box = document.createElement("DIV");
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
    box.style.border = "1px solid black";
    box.style.backgroundColor = userColor;
    box.style.width = userWidth;
    box.style.height = userHeight;
    box.textContent = userText;
    box.style.color = textColor;
    box.style.fontSize = fontSize;
    box.style.border = `${borderThick} ${borderColor} ${borderStyle}`;
    box.style.padding = padding;
    box.style.margin = margin;

    document.getElementById("inbox").appendChild(box);
    
}