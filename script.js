//Key to access API
var key = '?ts=1&apikey=f584d5df205ec1d450f443087814077d&hash=860b056faebcf3f7b371c6b40515e37c';
var container = document.querySelector('#container');

//Fetch and store favorite characters IDs from local storage in variable arr, if present, else create an empty array
if(JSON.parse(localStorage.getItem('ids'))){
    var arr = JSON.parse(localStorage.getItem('ids'));
}
else{
    var arr = [];
    localStorage.setItem('ids', JSON.stringify(arr));
}

var searchInput;


function getAllCharacters(){

    var myRequest = new XMLHttpRequest();
    var favClicked;

    //Onload of API
    myRequest.onload = function(){
        
        var requestResponse = myRequest.response;
        //Store response in JSON format
        var JSONresponse = JSON.parse(requestResponse);        
        
        var length = JSONresponse.data.results.length;
        
        //For all characters present in API , running loop
        for(let i=0; i<length ; i++){
        //Store required data from API into variables
        let imageURL = JSONresponse.data.results[i].thumbnail.path + '.' +JSONresponse.data.results[i].thumbnail.extension  ;
        let charName = JSONresponse.data.results[i].name;
        let id = JSONresponse.data.results[i].id;


        //create new elements
        var newDiv = container.appendChild(document.createElement('div'));
        newDiv.setAttribute('class', 'characters');
        var favDiv= newDiv.appendChild(document.createElement('div'));
        favDiv.setAttribute('class', 'fav');
        favDiv.innerHTML = '<i class="fa-solid fa-heart"></i>' ;

        //If this character id is present in arr, then add 'fav' class to favDiv
        for(let a of arr){
            if( a == id){
                favDiv.classList.add('fav-clicked');
            }
        }

        var anchorTag = newDiv.appendChild(document.createElement('a'));
        anchorTag.setAttribute('href', '/superhero-hunter/character.html?id='+id);
        var imgTag = anchorTag.appendChild(document.createElement('img'));
        imgTag.setAttribute("src", imageURL);
        anchorTag.appendChild(document.createElement('p')).innerHTML = '&nbsp &nbsp' + charName;  

        //Search functionality
        let search = document.getElementById('search-bar');
        let searchButton = document.getElementById('search-btn');
        search.addEventListener('input', function(event){
            searchInput = event.target.value.toLowerCase();
            console.log(searchInput);
            if(searchInput == charName.toLowerCase()){
                console.log('found');
                searchButton.addEventListener('click', function(){
                    window.location.href = '/superhero-hunter/character.html?id='+id;
                })
                
            }
        })

        //Favorite functionality
        
        favClicked = document.querySelectorAll('.fav');
        // // console.log(favClicked[10]);
        
        favClicked[i].addEventListener('click', function(){
            favClicked[i].classList.toggle('fav-clicked');
            
            let flag=true;
            let index;

            //Check if, id is present in array arr or not
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
            
            //If character is not present in the array arr, then add
            if(flag){
            arr.push(id);
            }

            //else, remove that character from the array
            else{
                arr.splice(index,1);
            }
            
            
            localStorage.setItem('ids', JSON.stringify(arr));
        //     // localStorage.setItem('ids', arr);
            });
        
        }
        
    }

    //If Error in conecting to API
    myRequest.onerror = function(xhr, textStatus, errorThrown){
        console.log('Error Occured');
                    
    };
    
    //Open API request
    myRequest.open('get', 'https://gateway.marvel.com/v1/public/characters'+ key, true);
    myRequest.send();
}





window.onload = getAllCharacters;