function dynamicTB(){
    var selection = document.getElementById("selection");
    console.log(selection.value)
    var tb = document.getElementById("dynamictext");
    tb.setAttribute("placeholder", "Enter "+selection.value)
};    

function enableRole(){
    var text = document.getElementById("role");
    text.disabled = false
}
var STATE2 = true
function enableSal(){
    var text = document.getElementById("sal");
    text.disabled = false
}

function activateSubmit(){
    var submit = document.getElementById('submit');
    submit.disabled = false;
}



