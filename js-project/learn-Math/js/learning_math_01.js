
let num1 = Math.floor(Math.random()*10 +1);
let num2 = Math.floor(Math.random()*10 +1);
let operatorArr = ["+","-","*","/"];
let index = Math.floor(Math.random()*operatorArr.length);
let exercise =  "= " + " " +  num1 + " " + operatorArr[index] + " " + num2;
document.getElementById("exercise").innerHTML =  exercise;

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
    
}