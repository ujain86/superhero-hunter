var hash = '860b056faebcf3f7b371c6b40515e37c';
var key = '?ts=1&apikey=f584d5df205ec1d450f443087814077d&hash=860b056faebcf3f7b371c6b40515e37c';
var container = document.querySelector('#container');
if(JSON.parse(localStorage.getItem('ids'))){
    var arr = JSON.parse(localStorage.getItem('ids'));
}
else{
    var arr = [];
}



function getAllCharacters(){

    var myRequest = new XMLHttpRequest();
    var favClicked;

    myRequest.onload = function(){
        
        var requestResponse = myRequest.response;
        var JSONresponse = JSON.parse(requestResponse);        
        
        var length = JSONresponse.data.results.length;
        
        for(let i=0; i<length ; i++){
        var imageURL = JSONresponse.data.results[i].thumbnail.path + '.' +JSONresponse.data.results[i].thumbnail.extension  ;
        var charName = JSONresponse.data.results[i].name;
        let id = JSONresponse.data.results[i].id;

        // console.log(imageURL);

        //create new elements
        var newDiv = container.appendChild(document.createElement('div'));
        newDiv.setAttribute('class', 'characters');
        var favDiv= newDiv.appendChild(document.createElement('div'));
        favDiv.setAttribute('class', 'fav');
        favDiv.innerHTML = '<i class="fa-solid fa-heart"></i>' ;

        for(let a of arr){
            if( a == id){
                favDiv.classList.add('fav-clicked');
            }
        }

        var anchorTag = newDiv.appendChild(document.createElement('a'));
        anchorTag.setAttribute('href', '/marvel/try.html?id='+id);
        var imgTag = anchorTag.appendChild(document.createElement('img'));
        imgTag.setAttribute("src", imageURL);
        anchorTag.appendChild(document.createElement('p')).innerText = charName;
        
        favClicked = document.querySelectorAll('.fav');
        // // console.log(favClicked[10]);
        
        favClicked[i].addEventListener('click', function(){
            favClicked[i].classList.toggle('fav-clicked');
            
            let flag=true;
            let index;
            for(let i=0; i<arr.length; i++){
            // for(let a of arr){
                if( id == arr[i]){
                    flag = false;
                    index = i;
                    break;
                }
                else{
                    flag = true;
                }
            }
            
        //     console.log(flag);
            if(flag){
            arr.push(id);
            }
            else{
                // console.log(index);
                arr.splice(index,1);
            }
            
            
            console.log(arr);
            localStorage.setItem('ids', JSON.stringify(arr));
        //     // localStorage.setItem('ids', arr);
            });
        
        }
        
    }

    myRequest.onerror = function(xhr, textStatus, errorThrown){
        console.log('Error Occured');
                    
    };
    
    myRequest.open('get', 'https://gateway.marvel.com/v1/public/characters'+ key, true);
    myRequest.send();
}





window.onload = getAllCharacters;