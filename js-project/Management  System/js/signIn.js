
let emailJason,passJason;
let valid = document.getElementById("validation");


function checkIfUserExist(){
    let userEmail = document.getElementById("mail").value;
    let userPassword = document.getElementById("pass").value;
    let usersArr = JSON.parse(localStorage.getItem("user")) || [];

    if(usersArr.length == 0){
        notFoundUserDetals();
    }
    else{
        // בדיקה אם המשתמש הזין בטופס התחברות את אותם פרטים מייל וסיסמא כמו בטופס הרשמה אם כן עדכון סטטוס ההתחברות,עדכון הפרטים בגייסון ומעבר לדף האדמין
        usersArr.find((user)=>{
            if(user.mail == userEmail && user.pass == userPassword){
                user.status = true;
                localStorage.setItem("user",JSON.stringify(usersArr));
                location.href = "adminPanel.html";
            }
        })
        notFoundUserDetals();
    }
}   

function notFoundUserDetals(){
    valid.innerHTML = "*One of the details you entered doesn't exist";
    valid.style.color = "darkblue";
    valid.style.fontSize = "17px";
    valid.style.fontWeight = "bold";
}

