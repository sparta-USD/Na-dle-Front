window.onload = () => {
    console.log("로딩")
}

async function handleSignup() {

    const fullname = document.getElementById("fullname").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    
    
    if (fullname === "" || username === "" || password === "" || password2 === "") {
        alert("빈칸을 채워주세요.")
    }
    else if (password !== password2) {
            alert("비밀번호를 확인해주세요!")        
    }
    else {
        const response = await fetch("http://127.0.0.1:8000/users/signup/", {
            headers: {
                "content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                "fullname": fullname,
                "username": username,
                "password": password,
                "password2": password2
            })
        })
        if(response.ok){
            alert("회원가입 되었습니다.")
            location.href = "http://127.0.0.1:5500/signin.html";
        }else{
            const response_json = await response.json()
            alert(response_json.message);
            console.warn(`${response.status} 에러가 발생했습니다.`)
        }
    }
}