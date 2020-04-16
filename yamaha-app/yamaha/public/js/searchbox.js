$(function(){
console.log("Document Ready!");
box = document.querySelector(".search") ;
console.log(box);
const suggestions = document.querySelector('.suggestions');
box.addEventListener('keyup', function(event){
    query = event.target.value;
    len =   query.length;
    var letters = /^[A-Za-z]+$/;
    if( query.match(letters) ) {
        query = event.target.value;
        $.get("/search?eName="+query, function(data){
            
            info = JSON.parse(data)['suggestions'];
            const html = info.map(place => {
                var eName = `<a href="/salary?eName=${place}"class="hl">${place}</a>`
                return `
                  <li>
                    <span class="name">${eName}</span>
                  </li>
                `;
              }).join('');
              suggestions.innerHTML = html;            
        })
    
    }
    else{
        alert("Enter alphabet only!");
        box.value = '';
    }
});

});
