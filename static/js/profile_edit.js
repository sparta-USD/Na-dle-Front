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
    const response_json = await response.json();
    console.log(response_json);
    let user = response_json;

    document.getElementById("fullname").value = user['fullname'];
    document.getElementById("username").value =user['username'];
    document.getElementById("email").value = user['email'];
    document.getElementById("profile_img").setAttribute("src","http://127.0.0.1:8000"+user['profile_image'])
}
document.getElementById("savebutton").addEventListener("click",function(){
    handleUpdate();

});
async function handleUpdate() {
    let fullname = document.getElementById("fullname").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let fileField = document.querySelector('input[type="file"]').value;

    // FormData에 저장
    const profile_formData = new FormData();
    profile_formData.append("username",username);
    profile_formData.append("fullname",fullname);
    profile_formData.append("email",email);
    profile_formData.append("profile_image",fileField);

   const response = await fetch('http://127.0.0.1:8000/users/profile/2/', {
        headers: {
            'content-type':'multipart/form-data;boundary=----WebKitFormBoundaryyEmKNDsBKjB7QEqu',
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3NjU0OTQ4LCJpYXQiOjE2Njc2MTE3NDgsImp0aSI6ImIxN2I1MTI5MDAwODRmMzM5NTg0MDcwZWNmMjMwYTgxIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJtb3JyaXNlbGl6YWJldGgifQ.MTr-2f6F2DrxHiNhAe-VEMpYMg4iYOHJaz-ClXfdsTc"
        },
        method: 'PUT',
        body: profile_formData,
    })
    .then((response) => response.json())
    .then((result) => {
        console.log('성공:', result);
    })
    .catch((error) => {
        console.error('실패:', error);
    });
}