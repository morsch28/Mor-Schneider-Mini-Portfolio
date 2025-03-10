
let userArr = JSON.parse(localStorage.getItem("user"));
let valid = document.getElementById("valid");
let firstName,lastName,mail,pass,userStatus;
let rows = document.getElementById("tableBody").getElementsByTagName("tr");


// הצגת המשתמשים שנרשמו או התחברו מהמערך בטבלה 
for(let i=0; i<userArr.length; i++){
    document.getElementById("tableBody").innerHTML += `
        <tr>
            <td id="currFirst">${userArr[i].firstName}</td>
            <td id="currLast">${userArr[i].lastName}</td>
            <td id="currEmail">${userArr[i].mail}</td>
            <td id="currPass">${userArr[i].pass}</td>
            <td id="status" class="text-primary fw-bold">${userArr[i].status}</td>
            <td><button onclick="editUserStatus(${i})" class="statusBtn bg-warning text-black "><i class="fa-regular fa-thumbs-down"></i></button></td>
            <td><button onclick="deleteUser(${i})" id="delBtn" class="bg-danger text-light"><i class="fa-solid fa-trash-can"></i></button></td>
            <td><button onclick="editUserDetails(${i})" id="editBtn" class="bg-info"><i class="fa-regular fa-pen-to-square"></i></button></td>
        </tr>`
    changeBtnAndCellUserStatus(i);
    welcomeMessage(i)
}

function welcomeMessage(index){
    valid.innerHTML = `Welcome ${userArr[index].firstName} ${userArr[index].lastName}`;
    valid.style.marginLeft = "100px";
    valid.style.fontSize = "1.5rem";
}
// valid.innerHTML = `Welcome ${firstName} ${lastName}`;
// valid.style.marginLeft = "100px";
// valid.style.fontSize = "1.5rem";


function deleteUser(index){ // האם אפשר לעשות את הפונקציה יותר פשוטה בלי שהפונקציה תקבל בתוכה פרמטר
    rows[index].remove();
    userArr.splice(index,1);
    localStorage.setItem("user",JSON.stringify(userArr));
}
            


function editUserStatus(index){
    userArr[index].status = !userArr[index].status;
    localStorage.setItem("user",JSON.stringify(userArr));
    changeBtnAndCellUserStatus(index);
 
}


function changeBtnAndCellUserStatus(index){
    let statusBtn = document.querySelectorAll(".statusBtn")[index];
    let statusCell = document.querySelectorAll("#status")[index];
    if(userArr[index].status == true){
        statusBtn.innerHTML = `<i class="fa-regular fa-thumbs-down">`;
        statusBtn.classList.replace("bg-success","bg-warning");
        statusBtn.classList.replace("text-white","text-black");
        statusCell.innerHTML = "true";
    }else{
        statusBtn.innerHTML = `<i class="fa-regular fa-thumbs-up"></i>`;
        statusBtn.classList.replace("bg-warning","bg-success");
        statusBtn.classList.replace("text-black","text-white");
        statusCell.innerHTML = "false";
    }
}


function editUserDetails(index){
    let editCurrUser = document.getElementById("form");
    editCurrUser.style.display = editCurrUser.style.display ==  "flex" ? editCurrUser.style.display = "none" : editCurrUser.style.display = "flex";
    let details = ["first","last","email","password"];
    let currrValue = [userArr[index].firstName,userArr[index].lastName,userArr[index].mail,userArr[index].pass];
    details.forEach((id,i)=> document.getElementById(id).value = currrValue[i]);// הצגת פרטי המשתמש בטופס של עריכת המשתשמ
    let column = rows[index].children;

    let editBtn = document.getElementById("editDetailsBtn");
    editBtn.onclick = () =>{
            // בקשת אישור האם המשתמש בטוח שרוצה לערוך את הפרטים שלו
            let confirmChange = confirm("Are you sure that you want to change your deatails?");
            if(confirmChange){
                details.forEach((id,i)=> {
                    let newVal = document.getElementById(id).value;
                    column[i].innerHTML = newVal
                })
                // עידכון הפרטים החדשים במערך
                userArr[index].firstName = document.getElementById("first").value;
                userArr[index].lastName = document.getElementById("last").value;
                userArr[index].mail = document.getElementById("email").value;
                userArr[index].pass = document.getElementById("password").value;
                console.log(userArr);
                localStorage.setItem("user", JSON.stringify(userArr));
                editCurrUser.style.display = "none";
            }else{
                alert("the details were not change");
            }
    }
}
    



