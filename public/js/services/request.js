const constructComponent = function(url, film, constructorName) {

    const pageSelector = document.querySelector('.body').classList[2];

    if(document.querySelector('.body').classList.contains(`${pageSelector}`)) {

        async function getData(url, film) {            
            const res = await fetch(url, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({ filmName: `${film}` })
            })
            if(!res.ok) {
                alert('не удалось загрузить контент');
            }
            return await res.json()
        } 

        if (url == '/api/getActorsList') {
            getData(url, film).then(data => {
                let newData = [];
                data.forEach(actor => {
                    let allrolesOfThisActor = actor.roleInFilm.split(';').filter(el => el != '').map(i => i.split(',').map(i => i.trim()));
                    actor.roleInFilm = allrolesOfThisActor.filter(el => el[1] == film);
                    newData.push(actor);
                })
                newData.forEach(item => new constructorName(item).render())
            });
        } else if (url == '/api/getFilmAchievements') {
            getData(url, film).then(data => {
                let finalData = data;
                while (finalData.length < 4) {
                    const emptyObj = {
                        imgPath: 'icons/avards/none-award.png',
                        awardName: 'Информация отсутствует',
                        nomination: '--',
                        year: '--'
                    };
                    finalData.push(emptyObj)
                }

                console.log(finalData);

                finalData.forEach(item => {
                    new constructorName(item).render()
                })
            });
        }

    }
}

export default constructComponent;