document.addEventListener("DOMContentLoaded", function () {
    handleMock()

});
// url을 불러오는 함수
function getParams(params){
    const url = window.location.href
    const urlParams = new URL(url).searchParams;
    const get_urlParams = urlParams.get(params);
    return get_urlParams;
}

async function handleMock() {
    
    url_username = getParams("username");
    if (url_username == undefined){
        url_username = localStorage.getItem("username");
    }

    const response = await fetch('http://127.0.0.1:8000/users/'+url_username, {
        headers: {
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    }).then(response => {
        if(!response.ok){
            if(response.status==401){
                alert("로그인 유저만 접근 가능합니다.")
                location.href="/signin.html";
            }
            throw new Error(`${response.status} 에러가 발생했습니다.`);    
        }
        return response.json()
    }).then(result => {    
        const response_json = result;
        let user = response_json
        let user_music_review = response_json.my_reviews


        let profile_user = document.getElementById("profile_user")
        profile_user.innerHTML = '';
        // console.log(profile_user)
        let new_user_profile = document.createElement('div');
        new_user_profile.className = 'sec section_profile mt-5';
        new_user_profile.innerHTML = `
        <div class="profile_detail_card">
            <div class="profile_image_cover">
                <div class="profile_image">
                    <img aria-hidden="false" draggable="false" loading="lazy" src="http://127.0.0.1:8000${user['profile_image']}">
                </div>

            </div>
            <div class="profile_content">
                <div class="profile_username flex">
                    <span class="username">${user['username']}</span>
                    <a href="/profile_edit.html" class="btn btn_edit_profile">Edit profile</a>
                </div>
                <div class="profile_follow">
                    <button type="button" class="btn_follower" data-bs-toggle="modal" data-bs-target="#followerModal">
                        <span class="followers">3</span> followers
                    </button>
                    <button type="button" class="btn_following" data-bs-toggle="modal" data-bs-target="#followingModal">
                        <span class="following">6</span> following
                    </button>
                </div>
                <div class="profile_fullname">
                    <span class="fullname">${user['fullname']}</span>
                </div>
            </div>
        </div>
        `;
        profile_user.append(new_user_profile);
        let user_music_reivew_list = document.getElementById("user_music_reivew_list")
        user_music_reivew_list.innerHTML='';
        user_music_review.forEach(element => {
            let new_user_music_review = document.createElement('div');
            new_user_music_review.className = 'col-lg-3 col-md-4 col-6';
            new_user_music_review.innerHTML = `
                    <a href="/music_detail.html?music=${element.music['id']}">
                        <div class='music_card position-relative'>
                            <div class="card_header list_profile">
                                <div class="music_album_images">
                                    <img aria-hidden="false" draggable="false" loading="lazy"
                                        src="${element.music['image']}"
                                        data-testid="card-image" alt=""
                                        class="mMx2LUixlnN_Fu45JpFB SKJSok3LfyedjZjujmFt yOKoknIYYzAE90pe7_SE Yn2Ei5QZn19gria6LjZj">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="music_card_hover">
                <div class="music_review_content">
                    <p>${element['content']}</p>
                </div>
            </div>
        </div>
    </a>
    `;

    // Follower 목록
    let follower_user = response_json.follower
    let modal_follower_div = document.getElementById("follower_user_list")
    modal_follower_div.innerHTML = '';
    // console.log(profile_user)
    follower_user.forEach(element => {
        let new_user_follower = document.createElement('div');
        new_user_follower.className = 'user_item profile_list_card';
        new_user_follower.id = "follower_"+element['pk'];
        new_user_follower.innerHTML = `
                                        <div class="card_body">
                                            <div class="profile_image">
                                                <img src="http://127.0.0.1:8000/${element['profile_image']}">
                                            </div>
                                            <div class="profile_meta card_meta">
                                                <div class="profile_username">
                                                    <span class="username">${element['username']}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card_footer">
                                            <div class="card_btn">
                                                <a href="#" class="btn_follow_2" onclick="handleFollow(${element['pk']})">Follow</a>
                                            </div>
                                        </div>
                                    `
        modal_follower_div.append(new_user_follower)
    });
            user_music_reivew_list.append(new_user_music_review)
        });
    }).catch(error => {
        console.warn(error.message)
    });


    
}
