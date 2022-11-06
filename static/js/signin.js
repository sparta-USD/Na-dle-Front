handleSignin

async function handleSignin() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    
    const response = await fetch("http://127.0.0.1:8000/users/api/token/",{
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })

    const response_json = await response.json()

    console.log(response_json)

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split(".")[1];
    const base64 = base64Url.replace(/-/g,"+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(atob(base64).split("").map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));

    localStorage.setItem("payload", jsonPayload);
    alert("로그인 되었습니다.")
    location.href = "http://127.0.0.1:5500/first_like.html";

}