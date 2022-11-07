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

        // 개인프로필
        let profile_user = document.getElementById("profile_user")
        profile_user.innerHTML = '';
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
                        <span class="follower" id="follower_count">0</span> followers
                    </button>
                    <button type="button" class="btn_following" data-bs-toggle="modal" data-bs-target="#followModal">
                        <span class="following" id="follow_count"></span> following
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
                            <div class="card_body">
                                <div class="card_content">
                                    <p class="music_card_title"><span class="title">${element.music['title']}</span></p>
                                    <p class="music_card_artist"><span class="artist">${element.music['artist']}</span></p>
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

        // 팔로워, 팔로잉
        const follower_modal = document.getElementById("followerModal").querySelector(".user_list");
        const follow_modal = document.getElementById("followModal").querySelector(".user_list");
        append_user_list(follower_modal,response_json,"follower", user['id']);
        append_user_list(follow_modal,response_json,"follow", user['id']);
        
    }).catch(error => {
        console.warn(error.message)
    });
}

function append_user_list(element,response_json,type,user_id,){
    dataset = response_json[type]
    document.getElementById(type+"_count").innerText = dataset.length;
    element.innerHTML='';
    dataset.forEach(data => {
        is_follow = response_json['follow'].filter(function(e){ return e.pk==data['pk'];}).length
        let new_item = document.createElement('div');
        new_item.className = `user_${data['username']} user_item profile_list_card`;
        // new_item.id = type+"_user_"+data['username']
        new_item.innerHTML = `
            <div class="card_body">
                <div class="profile_image">
                    <img src="${data['profile_image']}">
                </div>
                <div class="profile_meta card_meta">
                    <div class="profile_username">
                        <span class="username">${data['username']}</span>
                    </div>
                </div>
            </div>
            <div class="card_footer">
                <div class="card_btn">
                    ${(type=="follow" || is_follow) ? `<a href="#" class="btn_follow_remove btnFollow" onclick=handleFollow(${data['pk']},this)>UnFollow</a>` : `<a href="#" class="btn_follow_2 btnFollow" onclick=handleFollow(${data['pk']},this)>Follow</a>`}
                </div>
            </div>
        `;
        element.append(new_item);
    });
}


async function handleFollow(follow_user_id,el){
    const response = await fetch(`http://127.0.0.1:8000/users/follow/${follow_user_id}/`,{
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
        let type = result['result'];
        user_item_class = el.closest(".user_item").classList[0];
        changeFollowBtn(type,el);

        if(type=="follow"){
            follow_user_item = document.getElementById("followModal").querySelector("."+user_item_class);
            if(!follow_user_item){
                user_item = el.closest(".user_item").cloneNode(true);
                const follow_modal = document.getElementById("followModal").querySelector(".user_list");
                follow_modal.append(user_item);
            }else{
                follow_user_item_btn = follow_user_item.querySelector(".btnFollow");
                changeFollowBtn(type,follow_user_item_btn);
            }
            document.getElementById("follow_count").innerText = Number(document.getElementById("follow_count").innerText)+1;
        }else{
            follower_user_item = document.getElementById("followerModal").querySelector("."+user_item_class);
            follower_user_item_btn = follower_user_item.querySelector(".btnFollow");
            changeFollowBtn(type,follower_user_item_btn);
            document.getElementById("follow_count").innerText = Number(document.getElementById("follow_count").innerText)-1;
        }
    })
    .catch(response => {
        console.warn(response.error)
    })
};

function changeFollowBtn(type, el){
    if(type=="follow"){
        el.classList.add("btn_follow_remove");
        el.classList.remove("btn_follow_2");
        el.innerText = (type=="follow"? "UnFollow" : "Follow");
    }else{
        el.classList.remove("btn_follow_remove");
        el.classList.add("btn_follow_2");
        el.innerText = (type=="follow"? "UnFollow" : "Follow");
    }
}