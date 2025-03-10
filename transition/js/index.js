let imgArr = ["images_2/flat-html.png", "images_2/flat-css.png"];
let knowledge = document.getElementById("knowledge");

imgArr.forEach((imageSrc) => {
  let image = document.createElement("img");
  image.src = imageSrc;
  image.className = "images";
  knowledge.appendChild(image);
});
