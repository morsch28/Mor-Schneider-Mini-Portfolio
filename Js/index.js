spines.forEach((spine, index) => {
  for (let i = 0; i < numberOfSpine; i++) {
    let div = document.createElement("div");
    div.style.position = "absolute";
    if (index == 0) {
      div.style.width = "30px";
    } else {
      div.style.width = "20px";
    }
    div.style.height = "7px";
    div.style.backgroundColor = "black";
    div.style.borderRadius = "50% 50% 0 0";
    div.style.marginTop = `${i * 30}px`;
    div.style.right = "0px";
    div.style.top = "4%";
    div.style.transform = "translateX(9px)";
    spine.appendChild(div);
  }
});
