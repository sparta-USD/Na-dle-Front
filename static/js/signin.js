window.onload = () => {
    console.log("로딩")
}

async function handleSignin() {

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value


    if (username === "" || password === "") {
        alert("빈칸을 채워주세요.")
    }
    else {
        const response = await fetch("http://127.0.0.1:8000/users/signin/", {
            headers: {
                "content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        console.log(response);
        const response_json = await response.json();
        
        if (response.ok) {
            localStorage.setItem("access", response_json.access);
            localStorage.setItem("refresh", response_json.refresh);

            const base64Url = response_json.access.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(atob(base64).split("").map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(""))
            localStorage.setItem("payload", jsonPayload);
            alert("로그인 되었습니다.")
            location.href = "http://127.0.0.1:5500/first_like.html";
        } else {
            alert("아이디와 비밀번호를 확인해주세요.");
            console.warn(`${response.status} 에러가 발생했습니다.`);
        }
    }

}