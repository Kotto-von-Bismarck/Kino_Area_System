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
            if (Object.keys(data).length > 1) {
                new constructorName(data).render()
            } else {
                setTimeout(() => {
                    window.location.replace("http://localhost:3000/index.html")
                },1000);
                return alert(`${data.res}`);
            }
        });
    } 
}

export default interactionWithProfileData;