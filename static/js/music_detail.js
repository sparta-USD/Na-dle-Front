document.addEventListener("DOMContentLoaded", function(){
    handleMock()

});


// url을 불러오는 함수
function getParams(params){
    const url = window.location.href
    const urlParams = new URL(url).searchParams;
    const get_urlParams = urlParams.get(params);
    return get_urlParams;
}


// 음원 상세 정보 불러오기
async function handleMock(){

    // url이 ?music="music_id" 형태로 입력되지 않았을 때 에러메세지 출력
    url_detail_music = getParams("music");
    if (url_detail_music == undefined){
        url_detail_music = localStorage.getItem("music");
    }

    const response = await fetch('http://127.0.0.1:8000/musics/'+url_detail_music,{
        headers: {
            "Authorization":"Bearer " + localStorage.getItem("access"),
        },
        method:'GET',
    }).then(response => {
        if(!response.ok){
            if(response.status==404){
                alert("경로가 잘못되었습니다! 다시 입력해주세요 :)")
                location.href="/index.html";
            }
            throw new Error(`${response.status} 에러가 발생했습니다.`);    
        }
        return response.json()
    }).then(result => { 
        
        const response_json = result;

        let music = response_json;
        let review = response_json['reviews'];
        
        let music_detail = document.getElementById("music_detail");
        music_detail.innerHTML='';
        
        let new_music = document.createElement('div');
        new_music.className = 'sec section_recommend_music';
        new_music.innerHTML = `

        <div class="section_header" >
            <h2 class="section_title highlight">TRACK # ${music['id']} </h2>
        </div>
        <div class="container-2 text-center">
            <div class="music_content row">
                <div class="col-md-4">
                    <img src="${music['image']}" class="img-fluid rounded-start" alt="...">

                    <br/>
                    <h1 class="text">${music['artist']} - ${music['title']}</h1>
                </div>
            </div>
        </div>
        `;
        music_detail.append(new_music);
    

    //  리뷰 목록 불러오기
        let review_list = document.getElementById("review_list");
        review_list.innerHTML='';
        review.forEach(element => {
            let new_review = document.createElement('li');
            new_review.className = 'review_card mb-5';
            new_review.id = 'review_'+element['id'];
            new_review.innerHTML = `
                <div class="row">
                    <div class="col-10">
                        <div class="fw-bold flex mb-1">
                            <span class="user">${element['user']}</span> 
                            <div class="music_card_grade" style="margin-left: 16px;">
                                <span class="grade">${element['grade']}</span>
                                <div class="starpoint_wrap">
                                    <div class="starpoint_box star_${element['grade']*20}">
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
                        <div class="review_card_content">
                            <p class="content">${element['content']}</p>
                        </div>
                    </div>
                    <div class="col-2" style="text-align: right;">
                        <button type="button" class="btn-update btn btn-secondary btn-sm" class="btn_follower" data-bs-toggle="modal"data-bs-target="#ReviewModal">수정</button>
                        <button id="delete_button" type="button" onclick="handleDeleteReview(this)"class="btn-delete btn btn-secondary btn-sm">삭제</button>
                    </div>
                </div>
            `;
        review_list.append(new_review);
        });
    }).catch(error => {
        console.warn(error.message)
    });
}


// 리뷰 작성하기
async function handleCreateReview() {

    url_detail_music = getParams("music");

    const content = document.getElementById("content").value;
    const grade = document.getElementById("grade").value;
    
    const response = await fetch('http://127.0.0.1:8000/musics/'+url_detail_music+'/reviews/',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access"),
        },
        body: JSON.stringify({
            content:content,
            grade:grade
        }),
    }).then(response => {
        if(!response.ok){
            throw new Error(`${response.status} 에러가 발생했습니다.`);    
        }
        return response.json()
    }).then(result => {
        if(result['message']){
            alert(result['message']);
        }else{
            element = result;
            alert("리뷰 작성이 완료되었습니다! ");
            let review_list = document.getElementById("review_list");
            let new_review = document.createElement('li');
            new_review.className = 'review_card mb-5';
            new_review.id = 'review_'+element['id'];
            new_review.innerHTML = `
                <div class="row">
                    <div class="col-10">
                        <div class="fw-bold flex mb-1">
                            <span class="user">${element['user']}</span> 
                            <div class="music_card_grade" style="margin-left: 16px;">
                                <span class="grade">${element['grade']}</span>
                                <div class="starpoint_wrap">
                                    <div class="starpoint_box star_${element['grade']*20}">
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
                        <div class="review_card_content">
                            <p class="content">${element['content']}</p>
                        </div>
                    </div>
                    <div class="col-2" style="text-align: right;">
                        <button type="button" class="btn-update btn btn-secondary btn-sm" class="btn_follower" data-bs-toggle="modal"data-bs-target="#ReviewModal">수정</button>
                        <button id="delete_button" type="button" onclick="handleDeleteReview(this);"class="btn-delete btn btn-secondary btn-sm">삭제</button>
                    </div>
                </div>
            `;
            review_list.append(new_review);
        }
        
    }).catch(error => {
        alert("리뷰는 ID당 한번만 작성할 수 있습니다!");
        console.warn(error.message);
    });
}


// 리뷰 삭제하기
async function handleDeleteReview(el) {
    review_id = el.closest(".review_card").getAttribute("id").split('_')[1];

    const response = await fetch('http://127.0.0.1:8000/musics/reviews/'+review_id+'/',{
        method:'DELETE',
        headers: {
            "Authorization":"Bearer " + localStorage.getItem("access"),
        },
    }).then(response => {
        if(!response.ok){
            throw new Error(`${response.status} 에러가 발생했습니다.`);    
        }
        return response;
    }).then(async result => {
        alert("리뷰가 삭제되었습니다!");
        // 삭제 완료시 html의 리뷰 목록에서도 삭제되도록 
        remove_review = document.getElementById("review_"+review_id);
        remove_review.remove();
    }).catch(async error => {
        alert("리뷰 삭제에 실패했습니다! \n자세한 내용은 관리자에게 문의해주세요!");
        console.warn(error.message);
    });
}
    

// 리뷰 수정 - > 모달로 내용 불러오기
$('#ReviewModal').on('show.bs.modal', function(event) {     
    review_id = $(event.relatedTarget).closest(".review_card").attr("id").split('_')[1];
    document.getElementById("ReviewModal").setAttribute("data-review",review_id);
    review_content_text =document.getElementById("review_"+review_id).querySelector(".content").innerText;
    document.getElementById("input_review_content").value = review_content_text;
    review_content_grade =document.getElementById("review_"+review_id).querySelector(".grade").innerText;
    document.getElementById("input_review_grade").value = review_content_grade;
});


// 리뷰 수정하기
async function handleUpdateReview() {
    review_id = document.getElementById("ReviewModal").getAttribute("data-review");
    content =document.getElementById("ReviewModal").querySelector("#input_review_content").value;
    grade =document.getElementById("ReviewModal").querySelector("#input_review_grade").value;
    const response = await fetch('http://127.0.0.1:8000/musics/reviews/'+review_id+"/",{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access"),      
        },
        body: JSON.stringify({
            content:content,
            grade:grade
        }),
    }).then(response => {
        if(!response.ok){
            throw new Error(`${response.status} 에러가 발생했습니다.`);    
        }
        return response.json()
    }).then(result => {
        $("#ReviewModal").modal("hide");
        alert("리뷰가 수정되었습니다!");
        
        // 수정된 내용 html에 다시 뿌려주기
        document.getElementById("review_"+review_id).querySelector(".content").innerText = result['content'];
        document.getElementById("review_"+review_id).querySelector(".grade").innerText = result['grade'];
        document.getElementById("review_"+review_id).querySelector(".starpoint_wrap").innerHTML = `
            <div class="starpoint_box star_${result['grade']*20}">
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
        `        
    }).catch(error => {
        alert("리뷰 수정에 실패하였습니다! \n자세한 내용은 관리자에게 문의해주세요.");
        console.warn(error.message);
    });
}