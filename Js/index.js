let imgArr = [
  "images/flat-css.png",
  "images/flat-html.png",
  "images/flat-sass.png",
  "images/bootstap icon.png",
  "images/flat-js.png",
];
let knowledge = document.getElementById("knowledge");
let spines = document.querySelectorAll(".book-spine");
let numberOfSpine = 14;

imgArr.forEach((imageSrc, index) => {
  let image = document.createElement("img");
  image.src = imageSrc;
  image.className = "images";
  if (index == 4) {
    image.id = "last";
  }
  knowledge.appendChild(image);
});

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
