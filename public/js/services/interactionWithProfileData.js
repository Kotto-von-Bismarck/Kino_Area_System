const interactionWithProfileData = function(url, token, constructorName) {

    async function getProfileData(url, token) {            
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({ token: `${token}` })
        })
        if(!res.ok) {
            alert('не удалось загрузить контент');
        }
        return await res.json()
    } 

    if (url == '/api/getProfileData') {
        getProfileData(url, token).then(data => {
            new constructorName(data).render()
        });
    } 
    // else if (url == '/api/getFilmAchievements') {
    //     getData(url, film).then(data => {
    //         let finalData = data;
    //         while (finalData.length < 4) {
    //             const emptyObj = {
    //                 imgPath: 'icons/avards/none-award.png',
    //                 awardName: 'Информация отсутствует',
    //                 nomination: '--',
    //                 year: '--'
    //             };
    //             finalData.push(emptyObj)
    //         }

    //         console.log(finalData);

    //         finalData.forEach(item => {
    //             new constructorName(item).render()
    //         })
    //     });
    // }
}

export default interactionWithProfileData;