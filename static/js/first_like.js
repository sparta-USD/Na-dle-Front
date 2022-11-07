document.addEventListener("DOMContentLoaded", function(){
    handleMock()
    handleStars()
});

async function handleMock(){
    const response = await fetch('http://127.0.0.1:8000/musics/random/',{
        headers: {
            "Authorization":"Bearer " + localStorage.getItem("access"),
        },
        
        method:'GET',
    })
    const response_json = await response.json() 
    let like_musics = response_json

    // 받은 json 데이터를 html에 뿌려주기
    let like_musics_list = document.getElementById("like_musics_list")
    like_musics_list.innerHTML='';
    
    like_musics.forEach(element => {
        let new_like_musics = document.createElement('div');
        new_like_musics.className = 'col-lg-3 col-md-4 col-6';
        new_like_musics.innerHTML = `
                        <div>
                            <div class='music_card' id="music_${element['id']}">
                                <div class="card_header list_profile">
                                    <div class="music_album_images">
                                        <img aria-hidden="false" draggable="false" loading="lazy" src="${element['image']}">
                                    </div>
                                </div>
                                <div class="card_body">
                                    <div class="card_content">
                                        <p class="music_card_title"><span class="title">${element['title']}</span></p>
                                        <p class="music_card_artist"><span class="artist">${element['artist']}</span></p>
                                        <div class="btn-group dropend">
                                            <select id="${element['id']}" class="form-select bg-secondary text-white border-0" aria-label="">
                                                <option value="0" selected>평점⭐️</option>
                                                <option value="1">⭐️</option>
                                                <option value="2">⭐️⭐️</option>
                                                <option value="3">⭐️⭐️⭐️</option>
                                                <option value="4">⭐️⭐️⭐️⭐️</option>
                                                <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        `;
        like_musics_list.append(new_like_musics);
    });
    
}
async function handleStars(){
    let selected_list = document.getElementsByTagName("select");
    for(let selected of selected_list){
        if(selected.value !== "0"){
            let music = selected.id;
            let grade = selected.value

            const response = await fetch('http://127.0.0.1:8000/musics/'+selected.id+'/reviews/', {
                headers: {
                    "Authorization":"Bearer " + localStorage.getItem("access"),
                    "content-type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({
                    "music":music,
                    "grade":grade,
                    "content":"."
                    })
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error(`${response.status} 에러가 발생했습니다.`);
                    }
                    return response.json()
                }).then(result => {
                    alert("감사합니다!")
                    location.href="http://127.0.0.1:5500/index.html"
                }).catch(error => {
                    console.warn(error.message)
                });
        };

    };

};
