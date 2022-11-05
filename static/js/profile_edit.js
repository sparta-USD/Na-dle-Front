document.addEventListener("DOMContentLoaded", function () {
    console.log("로딩되었음")
    handleMock()
});
async function handleMock() {
    const response = await fetch('http://127.0.0.1:8000/users/profile/2/', {
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3Njk4NjgxLCJpYXQiOjE2Njc2NTU0ODEsImp0aSI6IjAwODU3ZTA5ZTk0MDQzN2RiZmJjZWUwMDljNGE3ZDcyIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJtb3JyaXNlbGl6YWJldGgifQ.ib8WZMikLVy46K6GhhF0t0NhFgzKpaMtrOiDWUhtd_Q"
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

   const response = await fetch('http://127.0.0.1:8000/users/profile/2/', {
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3Njk4NjgxLCJpYXQiOjE2Njc2NTU0ODEsImp0aSI6IjAwODU3ZTA5ZTk0MDQzN2RiZmJjZWUwMDljNGE3ZDcyIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJtb3JyaXNlbGl6YWJldGgifQ.ib8WZMikLVy46K6GhhF0t0NhFgzKpaMtrOiDWUhtd_Q"
        },
        method: 'PUT',
        body: profile_formData,
    })
    const response_json = await response.json();
    console.log(response_json);
}