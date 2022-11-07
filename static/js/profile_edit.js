document.addEventListener("DOMContentLoaded", function () {
    console.log("로딩되었음")
    handleMock()
});
async function handleMock() {
    const response = await fetch('http://127.0.0.1:8000/users/profile/', {
        headers: {
            "Authorization":"Bearer " + localStorage.getItem("access")
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
    profile_formData.append("profile_image", fileField);

   const response = await fetch('http://127.0.0.1:8000/users/profile/', {
        headers: {
            "Authorization":"Bearer " + localStorage.getItem("access")
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
function readImage(input) {
    if(input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
            const previewImage = document.getElementById("profile_img")
            previewImage.src = e.target.result
        }
        reader.readAsDataURL(input.files[0])
    }
}
const inputImage = document.getElementById("profile")
inputImage.addEventListener("change", e => {
    readImage(e.target)
})