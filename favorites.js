var div1 = document.getElementById('container');
var hash = '860b056faebcf3f7b371c6b40515e37c';
var favClicked;

var arr = JSON.parse(localStorage.getItem('ids'));

if(arr.length == 0){
    div1.innerHTML = '<h1>No Favorites</h1>';
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

                    var favDiv= newDiv.appendChild(document.createElement('div'));
                    favDiv.setAttribute('class', 'fav fav-clicked');
                    favDiv.setAttribute('id', id);
                    favDiv.innerHTML = '<i class="fa-solid fa-heart"></i>' ;

                    var anchorTag = newDiv.appendChild(document.createElement('a'));
                    anchorTag.setAttribute('href', '/marvel/try.html?id='+id);

                    var imgTag = anchorTag.appendChild(document.createElement('img'));
                    imgTag.setAttribute("src", imageURL);
                    anchorTag.appendChild(document.createElement('p')).innerText = charName;
                    
                }
            }
                   
        }
        fav();
    };


    myRequest.onerror = function(xhr, textStatus, errorThrown){
        console.log('Error Occured');
    };
    
    myRequest.open('get','https://gateway.marvel.com/v1/public/characters?ts=1&apikey=f584d5df205ec1d450f443087814077d&hash='+hash, true);
    myRequest.send();
}

function fav(){
    favClicked = document.querySelectorAll('.fav');
    // console.log(favClicked[1]);
    for( let i=0; i<favClicked.length; i++){
        
        let id = favClicked[i].getAttribute('id');
        console.log(id);
        favClicked[i].addEventListener('click', function(){
            if(window.confirm("Are you sure, you want to remove this character form favorites?")){
                // favClicked[i].classList.remove('fav-clicked');

                // to find index of array 'arr' in which characetr id is stored
                let index;
                
                for(let j=0; j<arr.length; j++){
                    
                    if( id == arr[j]){
                        index = j;
                        break;
                    }   
                
                }   

                arr.splice(index,1);
            
                localStorage.setItem('ids', JSON.stringify(arr));
            
                location.reload();

            }
        });
    };


};


window.onload = showFavoriteCHaracters;