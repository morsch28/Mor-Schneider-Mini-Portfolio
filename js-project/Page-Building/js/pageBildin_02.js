

function add(){
    let box = document.createElement("DIV");
    const userColor = document.getElementById("userColor").value;
    box.style.width = "100px";
    box.style.height = "100px";
    box.style.border = "1px solid black";
    box.style.backgroundColor = userColor;

    document.getElementById("inbox").appendChild(box);
    
}