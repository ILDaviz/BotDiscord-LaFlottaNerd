require('isomorphic-fetch');
require('es6-promise').polyfill();

let sankakuData = {
    "name:": "SankakuComplex",
    "api_url": "https://api.unsplash.com",
    "query_path": "/search/photos?client_id=cdeafc3e89190cec974a16c0448d45eee299f1561b63ed8c7a45a75750a5ca52&"
};

let requestImagesFromSankaku = async (requestURL) => {
    let imageList = await fetch(requestURL, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Origin: 'https://api.unsplash.com',
            Referer: 'https://api.unsplash.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'
        }
    });
    let json = await imageList.json();
    let extractedImages = [];
    json.results.forEach(element => {
        extractedImages.push(element.urls.regular);
    });
    return extractedImages;
};

exports.getImg = async (tags) => {
    let requestURL = sankakuData.api_url + sankakuData.query_path + 'query=' + tags + '&per_page=500'  ;
    let res = await requestImagesFromSankaku(requestURL);
    let val = res[Math.floor(Math.random() * res.length)];
    return val;
};
