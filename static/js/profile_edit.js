document.addEventListener("DOMContentLoaded", function () {
    console.log("로딩되었음")
    handleMock()
});
async function handleMock() {
    const response = await fetch('http://127.0.0.1:8000/users/profile/', {
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3NzA2MTgwLCJpYXQiOjE2Njc2NjI5ODAsImp0aSI6Ijk2NzUwOTIwMTVlZDRmZGFhNmY1ODM3YTgyYTJhOTQ4IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJtYXR0aGV3Y29sZW1hbiJ9.ysOWRJBhBW0ia5H8nBUTyxbvMhP3oAxUp6I6A37NOFY"
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
    const profile_formData = new FormData();

    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let fileField = document.querySelector('input[type="file"]').files[0];
    profile_formData.append("fullname",fullname);
    profile_formData.append("email",email);
    // 이미지 파일 예외처리
    // if (fileField!=undefined){
        profile_formData.append("profile_image", fileField);
    // }
    

   const response = await fetch('http://127.0.0.1:8000/users/profile/', {
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3NzA2MTgwLCJpYXQiOjE2Njc2NjI5ODAsImp0aSI6Ijk2NzUwOTIwMTVlZDRmZGFhNmY1ODM3YTgyYTJhOTQ4IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJtYXR0aGV3Y29sZW1hbiJ9.ysOWRJBhBW0ia5H8nBUTyxbvMhP3oAxUp6I6A37NOFY"
        },
        method: 'PUT',
        body: profile_formData,
    })
    .then(response => {
        if(!response.ok){
            throw new Error(`${response.status} 에러가 발생했습니다.`);    
        }
        return response.json()
    }).then(result => {
        alert("프로필이 수정되었습니다.")
        document.getElementById("profile_img").setAttribute("src","http://127.0.0.1:8000"+result['profile_image'])
    }).catch(error => {
        alert("프로필 수정에 실패하였습니다.\n자세한 내용은 관리자에게 문의해주세요.")
        console.warn(error.message)
    });
}