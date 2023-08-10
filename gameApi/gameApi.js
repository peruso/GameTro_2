// api url
const api_url = "https://video-game-news.p.rapidapi.com/all";


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '473501b51amshfd7e4242c922831p13b34fjsn6187bfc9374a',
        'X-RapidAPI-Host': 'video-game-news.p.rapidapi.com'
    }
};


// Defining async function where we are calling the API
async function getapi(url, options) {

    // Storing response
    const response = await fetch(url, options);

    // Storing data in form of JSON
    var data = await response.json();
    console.log([...data]);
    if (response){
        hideLoader();
    }
    // filter the result with no image in text, url or source
    dataClean =  ([...data]).filter(function(gameNew){
        if (!gameNew.text.includes("img") && !gameNew.url.includes("img") && !gameNew.source.includes("img") ) return gameNew;

    });

    console.log(dataClean);

    // filter out duplicate news

    dataClean2 = dataClean.filter((thing, index, self) =>
    index === self.findIndex((t) => (
      t.text === thing.text 
    ))
  );

    // filter the result to the first 20
    

    dataFiltered = dataClean2.slice(0,20);


    console.log(dataFiltered);
    
    show(dataFiltered);
}
// Calling that async function
getapi(api_url, options);

// Function to hide the loader
function hideLoader() {
    document.getElementById('loading').style.display = 'none';
}

// Function to define innerHTML for HTML table // No HEADERS
function show(data) {

    let tab ='';

    
data.map(function(news) {
    tab += ` <a href="${news.url}" class="news-article">
  ${news.text}</a>
<p class="news-source">${news.source}</p>`;

    });

    // Setting innerHTML of the table in the actual HTML with the 'tab' created

    document.getElementById("news").innerHTML = tab;
}