const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd54b0880f9msh6f4c5725dfcc6afp1c7806jsnb9785b071048',
		'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
	}
};

document.getElementById("playIDb").addEventListener("click",getpID);
function getpID(){
    const playID = document.getElementById("playID").value;
fetch(`https://youtube-search-and-download.p.rapidapi.com/playlist?id=${playID}`, options)
	.then(response => response.json())                                
	.then(data => {
        const vcnt = data.videosCount;
        const ptit = data.title;
            const op1 = `<p>Total Videos: ${vcnt}<br>Playlist Title: ${ptit}</p>`
            document.querySelector('.playlist').innerHTML += op1;
        const list = data.contents;
        list.map((item) => {
            console.log(item)
            const vId = item.video.videoId;
            const vtit = item.video.title;
            const vdur = item.video.lengthText;
            const vthmb = item.video.thumbnails[0].url;
            const op2 = `<ul><li><p>${vId}<br>${vtit}<br>${vdur}<br><img src="${vthmb}"></p></li><ul>`
            document.querySelector('.playlist').innerHTML += op2;
        })
    })
	.catch(err => console.error(err));
}