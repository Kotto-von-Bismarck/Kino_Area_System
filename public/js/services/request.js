const constructComponent = function(url, film, constructorName) {

    async function getData(url, film) {            
        const res = await fetch(url, {
            method: 'GET',
            headers: {'Content-type': 'application/json', 'filmname': `${film}`}
        })
        if(!res.ok) {
            alert('не удалось загрузить контент');
        }
        return await res.json()
    } 

    if (url == '/api/getActorsList') {
        getData(url, film).then(data => {
            data.forEach(item => new constructorName(item).render());
        });
    } 
    else if (url == '/api/getAwards') {
        getData(url, film).then(data => {
            if (data.length > 0) {
                data.forEach(item => new constructorName(item).render());
            } else {
                new constructorName({awardName : 'наград нет'}).render()
            }            
        });
    } 
    else if (url == '/api/getTrailer') {
        getData(url, film).then(data => {
            Object.assign(data, { parent: '.movieTrailer .openTrailerBase' });
            new constructorName(data).render();
        });
    }     
    else if (url == '/api/getMovie') {
        getData(url, film).then(data => {
            new constructorName(data).render()
        });
    } 
    else if (url == '/api/getStudios') {
        getData(url, film).then(data => {
            new constructorName(data).render()            
        });
    }
    else if (url == '/api/getFrames') {
        getData(url, film).then(data => {            
            new constructorName(data).render()   
        });
    }
    else if (url == '/api/getQuotes') {
        getData(url, film).then(data => {            
            data.forEach(item => new constructorName(item).render());
        });
    }
    else if (url == '/api/getReviews') {
        getData(url, film).then(data => {
            const reviews = data.map(review =>
                Object.assign(review, 
                    { 
                        parentSelector: '.ReviewContent'
                    }
                )
            );
            reviews.forEach(item => new constructorName(item).ReviewCards());
        })
    }
}

export default constructComponent;