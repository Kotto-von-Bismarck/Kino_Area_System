const MainPageRequest = function(url, constructorOrArgument) {

    async function getJSON(url) {            
        const res = await fetch(url)
        if(!res.ok) {
            alert('не удалось загрузить контент');
        }
        return await res.json()
    } 

    async function postJSON(url, data) {            
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({ frontData: `${data}` })
        })
        if(!res.ok) {
            alert('Error!!!');
        }
        return await res.json()
    }

    if (url == '/api/getTrends') {
        getJSON(url).then(data => {
            data.forEach(item => {
                new constructorOrArgument(item).render();
            });
        });
    }
}

export default MainPageRequest;