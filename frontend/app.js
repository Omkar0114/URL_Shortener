const button = document.getElementById('button')
const urlInput = document.getElementById('url-input')
const tableBody = document.getElementById('table-body')

let urls = []

fetch('http://localhost:8000/').then(res => res.json()).then(data => {
    urls = data.shortUrls;
    
    data.shortUrls.forEach(urlObj => {
        const tableRow = document.createElement('tr');
        const tableCell1 = document.createElement('td');
        const tableCell2 = document.createElement('td');
        tableCell2.classList.add('shortened-url')
        
        if(urlObj.originalUrl.length > 50){
            urlObj.originalUrl = urlObj.originalUrl.slice(0,41) + '...'
        }
        tableCell1.innerText = urlObj.originalUrl;
        tableCell2.innerText = urlObj.shortenedUrl;
        tableRow.appendChild(tableCell1)
        tableRow.appendChild(tableCell2)
        tableBody.appendChild(tableRow)
    })
    
})

window.addEventListener('click', (e) =>{
    if(e.target.classList.contains('shortened-url')){
        window.location.href = `http://localhost:8000/${e.target.innerText}`
    }
})

button.addEventListener('click', () => {
    
    fetch('http://localhost:8000/shortUrls', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({fullUrl: urlInput.value.toString()})
    }).then(res => res.json()).then((data) => {
        if(!data || !data.url){
            alert("URL created successfully");
            window.location.reload()
            urlInput.value = ''
            return;
        };
        const idx = urls.find(url => url.id === data.url.id)
        if(idx){
            // window.location.href = `http://localhost:8000/${data.url.shortenedUrl}`
            alert(`URL already exists. The shortened version is ${data.url.shortenedUrl}`)  
        }
        urlInput.value = ''
    })
})