

class Users{
    constructor(first,last,email,password,status){
        this.firstName = first;
        this.lastName = last;
        this.mail = email;
        this.pass = password;
        this.status = status;
        this.get = function(prop){
            return this[prop];
        }
        this.set = function(prop,newProp){
            this[prop] = this[newProp];
        }
    }
}
let usersArr =JSON.parse(localStorage.getItem("user")) || [];


function addUser(){
    let firstName = document.getElementById("firstName").value;
    let lastName  = document.getElementById("lastName").value;
    let mail = document.getElementById("mail").value;
    let pass = document.getElementById("pass").value;
    let valid = document.getElementById("validation");
    let chekBox = document.getElementById("checkBoxTerms");
    let status = false;

    // בדיקה האם המשתמש כבר נרשם בעבר למערכת 
    let userExist = usersArr.some(user => user.mail === mail)
    if(userExist){
        alert("The user already exist please log in");
        return;
    }

   // אם אחד מהשדות טופס ריקים הקפצת הודעה למילוי כל הטופס
    if(firstName == "" || lastName == "" || pass == ""){
        valid.innerHTML = "*One or more details are missing";
        valid.style.color = "red";
        return;
    }else{
        //בדיקה אם המשתמש אישר את תנאי האאתר
        if(!chekBox.checked){
            alert("Please agree to the site's terms")
        }else{
            usersArr.push(new Users(firstName,lastName,mail,pass,status));
            localStorage.setItem("user",JSON.stringify(usersArr));
            alert("User added successfully");
            location.href = "adminPanel.html";
        }
    }
}
