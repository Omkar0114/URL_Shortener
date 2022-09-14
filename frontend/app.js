const button = document.getElementById('button')
const urlInput = document.getElementById('url-input')
const urlContainer = document.getElementById('url-container')
const originalUrlContainer = document.getElementById('original-url')
const shortenedUrlContainer = document.getElementById('shortened-url')
let urls = []

fetch('http://localhost:8000/').then(res => res.json()).then(data => {
    console.log(data)
    urls = data.shortUrls;
    
    data.shortUrls.forEach(urlObj => {
        const newEl1 = document.createElement('div');
        const newEl2 = document.createElement('div');
        newEl1.innerText = urlObj.originalUrl;
        newEl2.innerText = urlObj.shortenedUrl;
        originalUrlContainer.appendChild(newEl1)
        shortenedUrlContainer.appendChild(newEl2)
    })
    urlContainer.appendChild(divEl)
})

button.addEventListener('click', () => {
    console.log(urls)
    fetch('http://localhost:8000/shortUrls', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/json"
        },
        body: JSON.stringify({fullUrl: urlInput.value.toString()})
    }).then(res => res.json()).then((data) => {
        console.log(data)
        const idx = urls.find(url => url.id === data.url.id)
        if(idx){
            window.location.href = `http://localhost:8000/${data.url.shortenedUrl}`
            alert(`URL already exists. The shortened version is ${data.url.shortenedUrl}`)  
            return;
        }
    })
})