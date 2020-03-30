function dynamicTB(){
    var selection = document.getElementById("selection");
    console.log(selection.value)
    var tb = document.getElementById("dynamictext");
    tb.setAttribute("placeholder", "Enter "+selection.value)
};    