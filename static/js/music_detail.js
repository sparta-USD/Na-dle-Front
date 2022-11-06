document.addEventListener("DOMContentLoaded", function(){
    console.log("로딩되었음")
    handleMock()

});

async function handleMock(){
    const response = await fetch('http://127.0.0.1:8000/musics/3/',{
        headers: {
          
            "Authorization":"Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3NjYzNzEyLCJpYXQiOjE2Njc2MjA1MTIsImp0aSI6ImZlYTRjOTQ4MmE5YjQ0ZmY4ZDBjODAyNDk5NjdjY2IxIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJsYXJhYW5uYSJ9.CSRNHtW5sNcMd_iALKdBfG6kGWSGhLAiYhfezUvvtjs"
        },
        method:'GET',
    })

    const response_json = await response.json() 
    // response 값 변수에 담기
    console.log(response_json)
    let music = response_json
    let review = response_json['reviews']
    
    let music_detail = document.getElementById("music_detail")
    music_detail.innerHTML='';
    
    let new_music = document.createElement('div');
    new_music.className = 'sec section_recommend_music';
    new_music.innerHTML = `
    <div class="section_header" style="width:80%">
        <h2 class="section_title highlight">${music['id']} : ${music['title']} </h2>
    </div>
    <div class="container-2 text-center">
        <div class="music_content row">
            <div class="col-md-4">
                <img src="${music['image']}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-4">
                <div class="card-body">
                <p class="text-muted">${music['title']}</p>
                <p class="text-muted">${music['artist']}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="review">
        <div class="section_header">
            <h2 class="section_title highlight">리뷰를 작성해주세요 :)</h2>
        </div>
        <div class="form-floating">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
            <label for="floatingTextarea">댓글을 남겨주세요!</label>
        </div>
        <div class="button_write">
            <button type="button" class="btn_review_submit btn btn-success btn-lg">등록하기</button>
        </div>
    </div>
    `;
    music_detail.append(new_music);
   
   
    let review_list = document.getElementById("review_list")
    review_list.innerHTML='';
    review.forEach(element => {
    let new_review = document.createElement('div');
    new_review.className = 'sec section_review_music';
    new_review.innerHTML = `
    <ol class="list-group" id="review_list">
        <li class="d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">${element['user']} : ${element['content']}</div>
          </div>
          <span class="badge bg-primary rounded-pill">${element['grade']}</span>
        </li>
    </ol>
    `;
    review_list.append(new_review);
    });
}