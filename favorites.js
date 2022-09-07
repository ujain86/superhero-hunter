var div1 = document.getElementById('div1');
var hash = '860b056faebcf3f7b371c6b40515e37c';

if(JSON.parse(localStorage.getItem('ids'))){
    var arr = JSON.parse(localStorage.getItem('ids'));
}
else{
    var arr = [];
}
console.log(arr);



function showFavoriteCHaracters(){

    var myRequest = new XMLHttpRequest();


    myRequest.onload = function(){
        var requestResponse = myRequest.response;
        var JSONresponse = JSON.parse(requestResponse);
                
        var length = JSONresponse.data.results.length;
        

        for(let i=0; i<length ; i++){

            var imageURL = JSONresponse.data.results[i].thumbnail.path + '.' +JSONresponse.data.results[i].thumbnail.extension ;
            var charName = JSONresponse.data.results[i].name;            
            let id = JSONresponse.data.results[i].id;

            for( let a of arr){
                if(a == id){
                    var newDiv = div1.appendChild(document.createElement('div'));
                    newDiv.setAttribute('class', 'characters');
                    var anchorTag = newDiv.appendChild(document.createElement('a'));
                    anchorTag.setAttribute('href', '/marvel/try.html?id='+id);
                    var imgTag = anchorTag.appendChild(document.createElement('img'));
                    imgTag.setAttribute("src", imageURL);
                    anchorTag.appendChild(document.createElement('p')).innerText = charName;
                }
            }
            
        }
    };


    myRequest.onerror = function(xhr, textStatus, errorThrown){
        console.log('Error Occured');
    };
    
    myRequest.open('get','https://gateway.marvel.com/v1/public/characters?ts=1&apikey=f584d5df205ec1d450f443087814077d&hash='+hash, true);
    myRequest.send();
}


window.onload = showFavoriteCHaracters;