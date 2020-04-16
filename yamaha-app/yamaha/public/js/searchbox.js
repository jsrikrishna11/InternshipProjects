$(function(){
console.log("Document Ready!");
box = document.querySelector(".search") ;
console.log(box);
box.addEventListener('keyup', function(event){
    query = event.target.value;
    len =   query.length;
    var letters = /^[A-Za-z]+$/;
    if( query.match(letters) ) {
        query = event.target.value;
        $.get("/search?eName="+query, function(data){
            console.log(data);
        })
    }
    else{
        alert("Enter alphabet only!");
        box.value = '';
    }
});

});
