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
        var description = JSONresponse.data.results[0].description;

        var totalComics = JSONresponse.data.results[0].comics.available;
        var comicItems = JSONresponse.data.results[0].comics.items;

        var totalSeries = JSONresponse.data.results[0].series.available;
        var seriesItems = JSONresponse.data.results[0].series.items;

        var totalStories = JSONresponse.data.results[0].stories.available;
        var storyItems = JSONresponse.data.results[0].stories.items;

        var totalEvents = JSONresponse.data.results[0].events.available;
        var eventItems = JSONresponse.data.results[0].events.items;
        
        // console.log(comicItems);
        

        var newDiv1 = div1.appendChild(document.createElement('div'));
        newDiv1.setAttribute('class', 'image');
        var imgTag = newDiv1.appendChild(document.createElement('img')).setAttribute('src', imageURL );

        var newDiv2 = div1.appendChild(document.createElement('div'));
        newDiv2.setAttribute('class', 'bio');
        newDiv2.innerHTML = '<h3>'+ charName +'</h3> <p>' + description + '</p>';

        var newDiv3 = div1.appendChild(document.createElement('div'));
        newDiv3.setAttribute('class', 'comics');
        newDiv3.innerHTML = '<h2> Total number of Comics available : '+ totalComics +'</h2>';
        var ul = newDiv3.appendChild(document.createElement('ul'));

        for(let i=0; i<comicItems.length; i++){
        const node = document.createElement("li");
        const textnode = document.createTextNode(comicItems[i].name);
        node.appendChild(textnode);
        ul.appendChild(node);
        };
        

        var newDiv4 = div1.appendChild(document.createElement('div'));
        newDiv4.setAttribute('class', 'stories');
        newDiv4.innerHTML = '<h2> Total number of Stories available : '+ totalStories +'</h2>';
        var ul = newDiv4.appendChild(document.createElement('ul'));

        for(let i=0; i<storyItems.length; i++){
        const node = document.createElement("li");
        const textnode = document.createTextNode(storyItems[i].name);
        node.appendChild(textnode);
        ul.appendChild(node);
        };

        var newDiv5 = div1.appendChild(document.createElement('div'));
        newDiv5.setAttribute('class', 'series');
        newDiv5.innerHTML = '<h2> Total number of Series available : '+ totalSeries +'</h2>';
        var ul = newDiv5.appendChild(document.createElement('ul'));

        for(let i=0; i<seriesItems.length; i++){
        const node = document.createElement("li");
        const textnode = document.createTextNode(seriesItems[i].name);
        node.appendChild(textnode);
        ul.appendChild(node);
        };

        var newDiv6 = div1.appendChild(document.createElement('div'));
        newDiv6.setAttribute('class', 'events');
        newDiv6.innerHTML = '<h2> Total number of Events available : '+ totalEvents +'</h2>';
        var ul = newDiv6.appendChild(document.createElement('ul'));

        for(let i=0; i<eventItems.length; i++){
        const node = document.createElement("li");
        const textnode = document.createTextNode(eventItems[i].name);
        node.appendChild(textnode);
        ul.appendChild(node);
        };



        
        
    }
       



    myRequest.onerror = function(xhr, textStatus, errorThrown){
        console.log('Error Occured');
                
    };

    myRequest.open('get', url, true);
    myRequest.send();
}



// console.log(url);

window.onload = getSingleCharacter;
