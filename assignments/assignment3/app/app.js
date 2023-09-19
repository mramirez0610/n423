function initListeners() {
    inputListener();
    getStudents();
};

function addUser(user) {
    let allUsers = JSON.parse(localStorage.getItem('Students'));
    allUsers.push(user);
    localStorage.setItem('Students', JSON.stringify(allUsers));
}

function getUser() {
    $("#app").html("");
    let allStudents = JSON.parse(localStorage.getItem('Students'));
    $.each(allStudents, (idx, user) => {
            $("#app").append(`
            <div class="student">
                <p>Name: ${user.fName} ${user.lName}</p>
                <p>Age: ${user.age}</p>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <p>Classes: ${user.classes}</p>
            </div>
        `)
    })
}

async function clearInputs() {
    $("#firstName").val("");
    $("#lastName").val("");
    $("#age").val("");
    $("#email").val("");
    $("#phone").val("");

    $("#class1").val("");
    $("#class2").val("");
    $("#class3").val("");
    $("#class4").val("");
    $("#class5").val("");
}

async function inputListener() {
    $("#submit").on("click", (e) => {
        e.preventDefault();
        let fn = $("#firstName").val();
        let ln = $("#lastName").val();
        let age = $("#age").val();
        let em = $("#email").val();
        let ph = $("#phone").val();

        let cl1 = $("#class1").val();
        let cl2 = $("#class2").val();
        let cl3 = $("#class3").val();
        let cl4 = $("#class4").val();
        let cl5 = $("#class5").val();

        let stuObj = {
            fName: fn,
            lName: ln,
            age: age,
            email: em,
            phone: ph,

            classes: [
                cl1,
                cl2,
                cl3,
                cl4,
                cl5
            ]
        }

        clearInputs();

        addUser(stuObj);
    });
}

async function getStudents() {
    $("#getName").on("click", (e) => {
        getUser();
    })
}

function connectToStorage() {
    let students = localStorage.getItem('Students');
    
    if (students) {
        console.log("students already exists");
    } else {
        localStorage.setItem('Students', "[]");
    }
}
 
$(document).ready(function () { 
    initListeners(); 
    connectToStorage();
});