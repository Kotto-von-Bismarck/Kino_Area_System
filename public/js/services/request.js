const constructComponent = function(url, constructorName) {

    const pageSelector = document.querySelector('.body').classList[2];

    if(document.querySelector('.body').classList.contains(`${pageSelector}`)) {

        const getData = async (url) => {
            const res = await fetch(url);
            if(!res.ok) {
                alert('не удалось загрузить контент');
            }
            return await res.json();
        };

        getData(url).then(data => {
            for (let film in data) {
                if (film === `${pageSelector}`) {
                    data[film].forEach((dataObj) => {
                        new constructorName (dataObj).render();
                    });
                }
            }
        });
    }
}

export default constructComponent;