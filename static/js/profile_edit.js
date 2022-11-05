document.addEventListener("DOMContentLoaded", function () {
    console.log("로딩되었음")
    handleMock()

});
async function handleMock() {
    const response = await fetch('http://127.0.0.1:8000/users/profile/1/', {
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3NjU0OTQ4LCJpYXQiOjE2Njc2MTE3NDgsImp0aSI6ImIxN2I1MTI5MDAwODRmMzM5NTg0MDcwZWNmMjMwYTgxIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJtb3JyaXNlbGl6YWJldGgifQ.MTr-2f6F2DrxHiNhAe-VEMpYMg4iYOHJaz-ClXfdsTc"
        },
        method: 'GET',
    })
     const response_json = await response.json()
     console.log(response_json)
     let user = response_json

     let profile_edit_box = document.getElementById("profile_edit_box")
     profile_edit_box.innerHTML = '';
    let new_profile_edit_box = document.createElement('div');
    new_profile_edit_box.className = 'profile_section';
    new_profile_edit_box.innerHTML = `
    <div id="profile_edit_box">
                <div >
                    <div class="profile_section" style="display: inline-block;">
                        <div class="section_profile_box" style="margin-top: 50px; ">
                            <img class="section_profile_img" src="src="http://127.0.0.1:8000${user['profile_image']}">
                        </div> 
                        <div style="margin-top: 15px; margin-bottom: 50px;">
                            <input id="profile" type="file" multiple style="width: 200px;">      
                        </div>
                        <div class="textbox">
                            <input type="text" class="form-control" placeholder="${user['fullname']}">
                        </div>
                        <div class="textbox" >
                            <input type="text" class="form-control" placeholder="${user['username']}">
                        </div>
                        <div class="textbox" >
                            <input type="text" class="form-control" placeholder="${user['email']}">
                        </div>
                        <button type="button" class="btn_profile_cancel btn btn-secondary" style="background-color:#121212; color: #ffff;" >Cancel</button>
                        <button type="button" class="btn_profile_save btn btn-secondary" style=" margin-left:15px;"  >Save</button>
                    </div>
                </div>
            </div>
    `;
    profile_edit_box.append(new_profile_edit_box);

}