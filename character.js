var div1 = document.getElementById('div1');

//to fetch id parameter from URL
const urlParams = new URLSearchParams(location.search);

var url;

for (const [key, value] of urlParams) {
    console.log(`${key}:${value}`);
    url = 'https://gateway.marvel.com/v1/public/characters/'+value+'?ts=1&apikey=f584d5df205ec1d450f443087814077d&hash=860b056faebcf3f7b371c6b40515e37c';
    
}

function getSingleCharacter(){
    // console.log('hello');
    var myRequest = new XMLHttpRequest();

    myRequest.onload = function(){
        var requestResponse = myRequest.response;
        
        var JSONresponse = JSON.parse(requestResponse);

        var imageURL = JSONresponse.data.results[0].thumbnail.path + '.' + JSONresponse.data.results[0].thumbnail.extension ;
        var charName = JSONresponse.data.results[0].name;
        // console.log(JSONresponse);
        var newDiv = div1.appendChild(document.createElement('div'));
        newDiv.innerHTML = '<p>'+ charName +'</p>';
        var imgTag = newDiv.appendChild(document.createElement('img'));
        imgTag.setAttribute('src', imageURL );
        
    }
       



    myRequest.onerror = function(xhr, textStatus, errorThrown){
        console.log('Error Occured');
                
    };

    myRequest.open('get', url, true);
    myRequest.send();
}



// console.log(url);

window.onload = getSingleCharacter;
