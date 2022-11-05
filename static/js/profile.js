document.addEventListener("DOMContentLoaded", function () {
    console.log("로딩되었음")
    handleMock()

});
async function handleMock() {
    const response = await fetch('http://127.0.0.1:8000/users/profile/1/', {
        headers: {
            // Authorization : access 키를 직접 넣어서 처리
            // 'content-type':'application/json',
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3NjU0OTQ4LCJpYXQiOjE2Njc2MTE3NDgsImp0aSI6ImIxN2I1MTI5MDAwODRmMzM5NTg0MDcwZWNmMjMwYTgxIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJtb3JyaXNlbGl6YWJldGgifQ.MTr-2f6F2DrxHiNhAe-VEMpYMg4iYOHJaz-ClXfdsTc"
        },
        // body: JSON.stringify({
        //     "username":"matthewcoleman",
        //     "password":"1234"
        // }),
        method: 'GET',
    })
    // response의 json 받아도기
    const response_json = await response.json()
    // response 값 변수에 담기
    console.log(response_json)
    console.log(response_json.my_reviews)
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
                <a href="#" class="btn btn_edit_profile">Edit profile</a>
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
                    <a href="#">
                        <div class='music_card position-relative'>
                            <div class="card_header list_profile">
                                <div class="music_album_images">
                                    <img aria-hidden="false" draggable="false" loading="lazy"
                                        src="http://127.0.0.1:8000${user['profile_image']}"
                                        data-testid="card-image" alt=""
                                        class="mMx2LUixlnN_Fu45JpFB SKJSok3LfyedjZjujmFt yOKoknIYYzAE90pe7_SE Yn2Ei5QZn19gria6LjZj">
                                </div>
                            </div>
                            <div class="card_body">
                                <div class="card_content">
                                    <p class="music_card_title"><span class="title">Today's Top Hits</span></p>
                                    <p class="music_card_artist"><span class="artist">Rihanna</span></p>
                                    <div class="music_card_grade">
                                        <span class="grade">${element['grade']}</span>
                                        <div class="starpoint_wrap">
                                            <div class="starpoint_box star_${element['grade']*20}">
                                                <label for="starpoint_1" class="label_star" title="0.5"><span
                                                        class="blind">0.5점</span></label>
                                                <label for="starpoint_2" class="label_star" title="1"><span
                                                        class="blind">1점</span></label>
                                                <label for="starpoint_3" class="label_star" title="1.5"><span
                                                        class="blind">1.5점</span></label>
                                                <label for="starpoint_4" class="label_star" title="2"><span
                                                        class="blind">2점</span></label>
                                                <label for="starpoint_5" class="label_star" title="2.5"><span
                                                        class="blind">2.5점</span></label>
                                                <label for="starpoint_6" class="label_star" title="3"><span
                                                        class="blind">3점</span></label>
                                                <label for="starpoint_7" class="label_star" title="3.5"><span
                                                        class="blind">3.5점</span></label>
                                                <label for="starpoint_8" class="label_star" title="4"><span
                                                        class="blind">4점</span></label>
                                                <label for="starpoint_9" class="label_star" title="4.5"><span
                                                        class="blind">4.5점</span></label>
                                                <label for="starpoint_10" class="label_star" title="5"><span
                                                        class="blind">5점</span></label>
                                                <span class="starpoint_bg"></span>
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

        user_music_reivew_list.append(new_user_music_review)
});
}