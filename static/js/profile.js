document.addEventListener("DOMContentLoaded", function () {
    handleMock()

});
async function handleMock() {
    const url = window.location.href
    const urlParams = new URL(url).searchParams;
    const url_username = urlParams.get('username');
    const response = await fetch('http://127.0.0.1:8000/users/'+url_username, {
        headers: {
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    const response_json = await response.json()
    console.log(response_json)
    // console.log(response_json.my_reviews)
    // console.log(response_json.my_reviews.music)
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
                    <span class="followers">${user['follower'].length}</span> followers
                </button>
                <button type="button" class="btn_following" data-bs-toggle="modal" data-bs-target="#followingModal">
                    <span class="following">${user['follow'].length}</span> following
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
                        src="${element.music['image']}"
                        data-testid="card-image" alt=""
                        class="mMx2LUixlnN_Fu45JpFB SKJSok3LfyedjZjujmFt yOKoknIYYzAE90pe7_SE Yn2Ei5QZn19gria6LjZj">
                </div>
            </div>
            <div class="card_body">
                <div class="card_content">
                    <p class="music_card_title"><span class="title">${element.music['title']}</span></p>
                    <p class="music_card_artist"><span class="artist">${element.music['artist']}</span></p>
                    <div class="music_card_grade">
                        <span class="grade">${element['grade']}</span>
                        <div class="starpoint_wrap">
                            <div class="starpoint_box star_${element['grade'] * 20}">
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

    // Following 목록
    let follow_user = response_json.follow
    console.log(follow_user)
    let modal_follow_div = document.getElementById("follow_user_list")
    modal_follow_div.innerHTML = '';
    // console.log(profile_user)
    follow_user.forEach(element => {
        let new_user_follow = document.createElement('div');
        new_user_follow.className = 'user_item profile_list_card';
        new_user_follow.id = "following_"+element['pk'];
        new_user_follow.innerHTML = `
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
                                                <a onclick="handleFollow(${element['pk']})" href="#" class="btn_follow_2 btn_following">Following</a>
                                            </div>
                                        </div>

                                    `
        modal_follow_div.append(new_user_follow)

    });

    
});
}
async function handleFollow(user_id,el){
    const response = await fetch(`http://127.0.0.1:8000/users/follow/${user_id}/`,{
        headers: {
            "Authorization":"Bearer " + localStorage.getItem("access"),
            "content-type":"application/json"
        },
        method:'POST',
    }).then(response => {
        if(!response.ok){
            throw new Error(`${response.status} 에러가 발생했습니다.`);    
        }
        return response.json()
    })
    .then(result => {
        console.log(result['result']);
        if(result['result'] == "follow"){
            // 팔로우가 되면 팔로잉 목록에 추가되야함. 
            target = document.getElementById("follower_"+user_id)
            let modal_follow_div = document.getElementById("follow_user_list");
            modal_follow_div.append(target);

            document.getElementById("follower_"+user_id).querySelector(".btn_follow_2").innerText="Following";
            document.getElementById("follower_"+user_id).querySelector(".btn_follow_2").className += ' btn_following';
            document.getElementById("following_"+user_id).querySelector(".btn_follow_2").innerText="Following";
            document.getElementById("following_"+user_id).querySelector(".btn_follow_2").className += ' btn_following';
        }else{
            document.getElementById("follower_"+user_id).querySelector(".btn_follow_2").innerText="Follow";
            document.getElementById("follower_"+user_id).querySelector(".btn_follow_2").classList.remove('btn_following');
            document.getElementById("following_"+user_id).querySelector(".btn_follow_2").innerText="Following";
            document.getElementById("following_"+user_id).querySelector(".btn_follow_2").classList.remove('btn_following');
        }
    })
    .catch(response => {
        console.warn(response.error)
    })
};

