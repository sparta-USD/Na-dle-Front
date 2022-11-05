document.addEventListener("DOMContentLoaded", function(){
    handleMock()
});
async function handleMock(){
    const response = await fetch('http://127.0.0.1:8000/musics/',{
        headers: {
            // "Authorization":"Bearer " + localStorage.getItem("access")
            "Authorization":"Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3NzEzMTI1LCJpYXQiOjE2Njc2Njk5MjUsImp0aSI6IjkwZTljOGQ0Nzg3NDQ2OTFiZGVmZDhjMmI4MjhiYWM0IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJtYXR0aGV3Y29sZW1hbiJ9.ySWx5MmfRuIYpGrzrtdSJcpA_qAPSvK-aAD9ZBOHz9I"
        },
        method:'GET',
    })
    
    const response_json = await response.json()
    let musics = response_json

    let all_musics_list = document.getElementById("all_musics_list").querySelector(".row")
    append_music_list(musics,all_musics_list)
}
function append_music_list(dataset,element){
    element.innerHTML='';
    dataset.forEach(data => {
        let new_item = document.createElement('div');
        new_item.className = 'col-lg-3 col-md-4 col-6';
        new_item.innerHTML = `
                        <a href="#">
                            <div class='music_card' id="music_${data['id']}">
                                <div class="card_header list_profile">
                                    <div class="music_album_images">
                                        <img aria-hidden="false" draggable="false" loading="lazy" src="${data['image']}">
                                    </div>
                                </div>
                                <div class="card_body">
                                    <div class="card_content">
                                        <p class="music_card_title"><span class="title">${data['title']}</span></p>
                                        <p class="music_card_artist"><span class="artist">${data['artist']}</span></p>
                                        <div class="music_card_grade">
                                            <span class="grade">5.0</span>
                                            <div class="starpoint_wrap">
                                                <div class="starpoint_box star_100">
                                                  <label for="starpoint_1" class="label_star" title="0.5"><span class="blind">0.5점</span></label>
                                                  <label for="starpoint_2" class="label_star" title="1"><span class="blind">1점</span></label>
                                                  <label for="starpoint_3" class="label_star" title="1.5"><span class="blind">1.5점</span></label>
                                                  <label for="starpoint_4" class="label_star" title="2"><span class="blind">2점</span></label>
                                                  <label for="starpoint_5" class="label_star" title="2.5"><span class="blind">2.5점</span></label>
                                                  <label for="starpoint_6" class="label_star" title="3"><span class="blind">3점</span></label>
                                                  <label for="starpoint_7" class="label_star" title="3.5"><span class="blind">3.5점</span></label>
                                                  <label for="starpoint_8" class="label_star" title="4"><span class="blind">4점</span></label>
                                                  <label for="starpoint_9" class="label_star" title="4.5"><span class="blind">4.5점</span></label>
                                                  <label for="starpoint_10" class="label_star" title="5"><span class="blind">5점</span></label>
                                                  <span class="starpoint_bg"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
        `;
        element.append(new_item);
    });
}
