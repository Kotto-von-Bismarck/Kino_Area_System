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

    async function postTICKET(url, data) {            
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        })
        if(!res.ok) {
            alert('Error!!!');
        }
        return await res.json()
    }

    if (url == '/api/getSessions') {
        let city = localStorage.getItem('city');        
        postJSON(url, city).then(data => {
            data.forEach(item => {
                new constructorOrArgument(item).render();
            });
        });
    } else if (url == '/api/getTrends') {
        getJSON(url).then(data => {
            data.forEach(item => {
                new constructorOrArgument(item).render();
            });
        });
    } else if (url == '/api/getNewTrailers') {
        const PlayerConstructor = constructorOrArgument[0],
              TabsConstructor = constructorOrArgument[1];
        getJSON(url).then(data => {
            const trailersArray = data;
            trailersArray.forEach((item, i) => {
                if (i < 4) {
                    Object.assign(item, { 
                        parent: '.trailer .openTrailerBase',
                        tabParent: '.trailer .trailer__slider .firstTS-box'
                    });
                } else {
                    Object.assign(item, { 
                        parent: '.trailer .openTrailerBase',
                        tabParent: '.trailer .trailer__slider .secondTS-box'
                    });
                }
                new PlayerConstructor(item).render();
                new TabsConstructor(item).render();
            });
        })
    } else if (url == '/api/getUserReviews') {
        postJSON(url, constructorOrArgument[0]).then(data => {
            const myConstructor = constructorOrArgument[1];
            data.forEach(item => {
                new myConstructor(item).ReviewCards();
            });
        });
    } else if (url == '/api/newEmailSubscriber') {
        postJSON(url, constructorOrArgument).then(data => {
            alert(data.res);
        });
    } else if (url == '/api/bookingTickets') {
        postTICKET(url, constructorOrArgument).then(data => {
            alert(data.res);
            location.reload();
        });
    }
}

export default MainPageRequest;