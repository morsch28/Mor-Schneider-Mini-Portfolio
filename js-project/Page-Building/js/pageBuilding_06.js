

function add(){
    let box = document.createElement("DIV");
    const userColor = document.getElementById("userColor").value;
    const userWidth = document.getElementById("userWidth").value + "px";
    const userHeight = document.getElementById("userHeight").value + "px";
    const userText = document.getElementById("userText").value;
    const textColor = document.getElementById('textColor').value;
    const fontSize = document.getElementById("fontSize").value + "px";
    const borderThick = document.getElementById("boderThick").value + "px";
    const bodderStyle = document.getElementById("bodrrStyle").value;
    const borderColor = document.getElementById('boderColor').value;
    box.style.border = "1px solid black";
    box.style.backgroundColor = userColor;
    box.style.width = userWidth;
    box.style.height = userHeight;
    box.textContent = userText;
    box.style.color = textColor;
    box.style.fontSize = fontSize;
    box.style.border = `${borderThick} ${borderColor} ${bodderStyle}`;

    document.getElementById("inbox").appendChild(box);
    
}