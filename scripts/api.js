/* Desenvolva seu código aqui */
export async function register(body){
    const linkRequest = "http://localhost:3333/"
    const p = document.querySelector(".paragph")
    const button = document.querySelector(".register-ok")
    try{
        p.innerText = ""
        button.innerText = ""
        button.insertAdjacentHTML("afterbegin",`
            <img class="spiner" src="../../assets/img/spinner.png" alt="">
        `)
        const request = await fetch(linkRequest+"users/create",{
            method: "POST",
            headers:{
                "content-type":"application/json",
            },
            body:JSON.stringify(body),
        })
        if(request.status == 200){
            cardSucess("Sua conta foi criada com sucesso!","Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login:")
            setTimeout(() =>{
            document.location.href = "/pages/login/login.html"},2500)   
        }else{
          p.innerText = "essa conta já existe" 
          button.innerHTML = ""
          button.innerText = "Cadastrar"
        }
        
    }catch(err){
        p.innerText = "Há campos vazios"
    }
    
}
export async function loadingLogin(body){
    const p = document.querySelector(".paragph")
    const button = document.querySelector(".login")
    const input  = document.querySelector(".password")
    const linkRequest = "http://localhost:3333/"
    try{
        p.innerText = ""
        button.innerText = ""
        
        button.insertAdjacentHTML("afterbegin",`
            <img class="spiner" src="../../assets/img/spinner.png" alt="">
        `)
        const request = await fetch(linkRequest+"login",{
            method: "POST",
            headers:{
                "content-type":"application/json",
            },
            body:JSON.stringify(body),
        })
        if(request.status == 200){
            const newRequest = await request.json()
            localStorage.setItem("token",newRequest.token)
            setTimeout( ()=>{document.location.href = "/pages/home/home.html"},2000)
        }else{
            button.innerHTML = ""
            button.innerText ="Entrar"
            p.innerText = "Insira seu email"
            input.classList.add("input-erro")
        }
       
    }catch(err){
        button.innerHTML = ""
        button.innerText ="Entrar"
        p.innerText = "A senha não confere"
        input.classList.add("input-erro")
    }

}
export async function createPosters(body){
    const token = localStorage.getItem("token")
    const linkRequest = "http://localhost:3333/"
    try{
        const request = await fetch(linkRequest+"posts/create",{
            method: "POST",
            headers:{
                "content-type":"application/json",
                "Authorization": "Bearer "+token,
            },
            body:body,
        })
    }catch(err){
        console.log(err)
    }
}
export async function getDelete(id){
    const token = localStorage.getItem("token")
    const linkRequest = "http://localhost:3333/"
    try{
        const request = await fetch(linkRequest+"posts/"+id,{
            method: "DELETE",
            headers:{
                "content-type":"application/json",
                "Authorization": "Bearer "+token,
            }
        })
            cardSucessDelet("Post deletado com sucesso!", "O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed ")
    }catch(err){
        console.log(err)
    }
}
export async function editPost(body,id){
    const token = localStorage.getItem("token")
    const linkRequest = "http://localhost:3333/"
    try{
        const request = await fetch(`${linkRequest}posts/${id}`,{
            method: "PATCH",
            headers:{
                "Content-type":"application/json",
                "Authorization": `Bearer ${token}`,
            },
            body:JSON.stringify(body),
        })
    }catch(err){
        console.log(err)
    } 
}
function cardSucess(strig,text){
    const main = document.querySelector(".card-sucess2")
    main.innerHTML = ""
    main.classList = "card-sucess"
    main.insertAdjacentHTML("afterbegin",`
    <div class="flex align-item">
    <div class="check">
        <img src="../../assets/img/checked.png" alt="">
    </div>
    <p>${strig}</p>
    </div>
    <p>${text}</p>
    <a href="http://127.0.0.1:5500/pages/login/login.html">Acessar pagina de login</a>
    `
)
    
}
function cardSucessDelet(strig,text){
    const main = document.querySelector(".card-sucess2")
    main.innerHTML = ""
    main.classList = "card-sucess"
    main.insertAdjacentHTML("afterbegin",`
    <div class="flex align-item">
    <div class="check">
        <img src="../../assets/img/checked.png" alt="">
    </div>
    <p>${strig}</p>
    </div>
    <p>${text}</p>
    
    `
)
    
}

