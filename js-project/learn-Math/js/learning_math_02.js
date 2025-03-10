
let num1;
let num2;
let operatorArr = ["+","-","*","/"];
let index;

function showExercise(){

    let range = Number(document.getElementById("range").value);
   
    num1 = Math.floor(Math.random()*range +1);
    num2 = Math.floor(Math.random()*range +1);

    index = Math.floor(Math.random()*operatorArr.length);
    let exercise =  "= " + " " +  num1 + " " + operatorArr[index] + " " + num2;
    document.getElementById("exercise").innerHTML =  exercise;

}
showExercise();

function math(){
    let userAnswer = document.getElementById("userAnswer").value;
    let trueAnswer = eval(num1 + " " + operatorArr[index] + " " + num2);
    let point = 0;
    if(trueAnswer == Number(userAnswer)){
        point ++; 
    }
    document.getElementById("table").innerHTML +=`
        <tr>
            <td>${num1 + " " + operatorArr[index] + " " + num2}</td>
            <td>${trueAnswer}</td>
            <td>${userAnswer}</td>
            <td>${point}</td>
        </tr>
    `;
    showExercise();
}