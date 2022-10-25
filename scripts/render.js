import { preview } from "../pages/home/home.js";
import { editPost } from "./api.js"
import { createPosters, getDelete, } from "./api.js"

export async function createPost(arr){  
    const post = document.querySelector("main")
    const users = localStorage.getItem("user")
    const newUser = JSON.parse(users)
    const newArr = []
    arr.filter((element,i) => {
        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
    let data = new Date(element.createdAt);
    let dataFormatada = (( meses[(data.getMonth())] + " de " + data.getFullYear()));   
    if(  element.user.id == newUser.id){
        newArr.push(element)
        localStorage.setItem("myPosts", JSON.stringify(newArr))
            post.insertAdjacentHTML("afterbegin",`
                <section id="s${element.id}" class="section-home width-100 flex collum justify-content align-item">
                <div class="div-post-main width-8">
                    <div class="div-post flex align-item space-between">
                        <div class="flex align-item header-post">
                            <img src="${element.user.avatar}" alt="">
                            <span class="span">${element.user.username}</span>
                            <span class="span-date">${dataFormatada}</span>
                        </div>
                        <div class="div-buttons-post flex">
                            <button class="edit">Editar</button>
                            <button id="${element.id}" class="clear">Excluir</button>
                        </div>
                   </div>
                   <h2 class="subTitle-h2">
                        ${element.title}
                   </h2>
                    <p class="text-p">
                        ${element.content}
                    </p>
                   <button id="edit${element.id}">Acessar publicação</button>
                </div>
            </section>
                `)                
            }else{
                post.insertAdjacentHTML("afterbegin",`
                <section id="${element.id}" class="section-home width-100 flex collum justify-content align-item">
                <div class="div-post-main width-8">
                    <div class="div-post flex align-item space-between">
                        <div class="flex align-item header-post">
                            <img src="${element.user.avatar}" alt="">
                            <span class="span">${element.user.username}</span>
                            <span class="span-date">${dataFormatada}</span>
                        </div>
                        
                        <div class="div-buttons-post">
                        </div>
                   </div>
                   <h2 class="subTitle-h2">
                        ${element.title}
                   </h2>
                    <p class="text-p">
                        ${element.content}
                    </p>
                   <button id="edit${element.id}">Acessar publicação</button>
                </div>
            </section>
            `)
        }
    })
    await preview()
    deletePost()
    editPost2()
    seePoster(arr)
}
export async function creatHeader(arr){
    const img = document.querySelector(".img-user")
    img.src = arr.avatar
    img.addEventListener("click",() => {
        logout(arr)
    })
}
export async function renderModal(){
    const button = document.querySelector(".creat-post")
    const modal = document.querySelector(".modal")
    
    await button.addEventListener("click",()=>{
        modal.innerHTML = ""
        modal.classList = "modal modal-back width-100 flex justify-content"
        modal.insertAdjacentHTML("afterbegin",`

        <div class="modal-background width-100 flex justify-content" id="modal-background">
            <div class="div-modal-form2 width-8 flex collum align-item">
                <div class="div-modal width-9 flex space-between">
                    <h2>Edição</h2>
                    <button class="back">X</button>
                </div>
                <form class="flex collum width-9 height-6">
                    <label for="">Título do post</label>
                    <textarea placeholder="Digite seu titulo" class="input-title" type="text" name="title" id=""></textarea>
                    <label for="">Conteúdo do post</label>
                    <textarea placeholder="Digite seu texto" class="input-text-post-creat" rows="4" cols="50"></textarea>
                    <div class="div-creat-modal width-100 flex">
                    <button class="button-publish blue2" type="submit">Publicar</button>
                    <button class="button-cancel">Cancelar</button>
                </div>
                </form>
            </div>    
        </div> 
    `)
    const button = document.querySelector(".button-publish")
    const title = document.querySelector(".input-title")
    const text  = document.querySelector(".input-text-post-creat")
 button.addEventListener("click", (event) => {
    event.preventDefault()
        if(text.value == ""){
            text.classList.add("input-text2")
        } else if(title.value == ""){
            title.classList.add("input-text2")
        }else if(title.value == "" && text.value == ""){
            text.classList.add("input-text2")
            title.classList.add("input-text2")
        }else{
                modal.innerHTML = ""
                modal.classList = "modal"
                title.classList = "input-text"
                text.classList = "input-text"
                const objNewPoster = {
                    title: `${title.value}`,
                    content: `${text.value}`
            }
            createPosters(JSON.stringify(objNewPoster))
            document.location.href = "/pages/home/home.html"
        }
 })
    
    modal.addEventListener("click",(event)=>{
        event.preventDefault()
        if(event.target.classList == "back" || event.target.classList == "button-cancel"){
            modal.classList = "modal"
            modal.innerHTML = ""
        }
    })
    })    
}
async function deletePost(){
    
    const deleteItem = document.querySelectorAll(".clear")
    
    deleteItem.forEach((element,i) => {
        element.addEventListener("click",()=>{
            creatModalDelet(element.id)
        })
    });
}
async function editPost2(){
    const newArr = localStorage.getItem("myPosts")
    let arr = JSON.parse(newArr)
    const edit = document.querySelectorAll(".edit")
    edit.forEach((element,i) => {
        element.addEventListener("click",(event)=>{
            criarModalEdit(arr[i])
            console.log(arr[i])    
        })
    })
}
async function criarModalEdit(arr){
    const modal   = document.querySelector(".modal")
    modal.classList = "modal modal-back width-100 flex justify-content"
    modal.insertAdjacentHTML("afterbegin",`
        <div class="modal-background width-100 height-70 flex justify-content" id="modal-background">
            <div class="div-modal-form width-8 flex collum align-item">
                <div class="div-modal width-9 flex space-between">
                    <h2>Edição</h2>
                    <button class="back">X</button>
                </div>
                <form action="submit" class="flex collum width-9 height-80">
                    <label for="">Título do post</label>
                    <textarea class="input-title" placeholder="Digite seu title" type="text" name="title" id="">${arr.title}</textarea>
                    <label for="">Conteúdo do post</label>
                    <textarea placeholder="Digite seu texto" class="input-text" rows="4" cols="50">${arr.content}</textarea>
                    <div class="div-creat-modal width-100 flex">
                        <button type="submit" class="button-publish blue2">Salvar</button>
                        <button class="button-cancel">Cancelar</button>
                    </div>
                </form>
            </div>    
        </div> 
    `)
    const div = document.querySelector(".modal-background")
    div.addEventListener("click",(event)=>{
        event.preventDefault()
        if(event.target.classList =="back" || event.target.classList == "button-cancel" || event.target.classList == "modal-background width-100 flex justify-content" || event.target.classList == "modal"){
            div.remove()
            modal.className = "modal"
            div.innerHTML =""
        }
        
    })
    const title = document.querySelector(".input-title")
    const text  = document.querySelector(".input-text")
    const buttton = document.querySelector(".button-publish")
    await buttton.addEventListener("click",(e)=>{ 
        editPost({
            "title": title.value,
            "content": text.value,
        },arr.id)
        setTimeout(()=>{
            document.location.href = "/pages/home/home.html"
        },1000)
    })
}
export function creatModalDelet(id){
    const modal = document.querySelector(".modal")
    modal.classList = "modal modal-back width-100 height-100"
    const section   = document.querySelector(`#s${id}`)
    modal.insertAdjacentHTML("afterbegin",`
        <div class="modal-background padding-space width-100 flex justify-content" id="modal-background">
        <div class="div-modal-form width-8 flex collum align-item">
            <div class="div-modal width-9 flex space-between align-item">
                <h2 class="subTitle-h2-delet">Confirmação de exclusão</h2>
                <button class="back-x">X</button>
            </div>
            <div class="div-delet-modal flex collum width-9 height-6">
               <h3>Tem certeza que deseja excluir este post?</h3>
               <p>
               Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir
               </p>
               <div class="box-button-delet">
               <button class="button-cancel-c">Cancelar</button>
               <button class="button-d">Sim, excluir este post</button>    
               </div>
            </div>
        </div> 
    `)
    modal.addEventListener("click",(event) => {
        if(event.target.classList == "button-cancel-c" || event.target.classList == "back-x"){
            modal.classList = "modal"
            modal.innerHTML = ""
        }else if(event.target.classList == "button-d"){
            modal.classList = "modal"
            modal.innerHTML = ""
            getDelete(id)
            section.remove()
        }
    })
}
export  function seePoster(arr){
    const modal = document.querySelector(".modal")
    arr.forEach((element,i) => {
        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
        let data = new Date(element.createdAt);
        let dataFormatada = (( meses[(data.getMonth())] + " de " + data.getFullYear()));
        const access = document.getElementById(`edit${element.id}`)
        access.addEventListener("click",(event) => {
            modal.classList = "modal width-100 height-100 width-100 height-100 modal-back flex justify-content"
            modal.insertAdjacentHTML("afterbegin",`
                <div class="modal-background padding-space width-100 height-100 height-auto flex justify-content" id="modal-background">
                <div class="div-access width-88 flex collum align-item">
                    <div class="flex align-item header-post space-between">
                        <div class="flex align-item">
                            <img class="img-access" src="${element.user.avatar}" alt="">
                            <span class="span">${element.user.username}</span>
                            <span class="span-date">${dataFormatada}</span>
                        </div>
                        <button class="button-access-x">x</button>
                    </div>
                    <div class="div-modal width-9 flex  collum">
                    <h2 class="subTitle-h2-access">${element.title}</h2>
                    </div>
                    <p class="text-access">
                    ${element.content}
                </p>
                </div> 
            `)
            const back = document.querySelector(".button-access-x")
            console.log(back)
            back.addEventListener("click",()=>{
                modal.classList = "modal"
                modal.innerHTML = ""
            })
        })
        
    })
    

}
function logout(arr){
    const div = document.querySelector(".div-end-token") 
    div.classList = ("div-end-token width-100 height-100 absolute")
    div.innerHTML = ""
        div.insertAdjacentHTML("afterbegin",`
        <div class="div-logout classNew">
            <h3 class="h3-end">${arr.username}</h3>
            <div class=" div-end flex align-item">
                <img class="end" src="../../assets/img/sign-out-alt.png" alt="">
                <p>Sair da conta</p>
            </div>
        </div>
    `)
    backLogout()
    const end = document.querySelector(".end")
    end.addEventListener("click",()=>{
        localStorage.clear("token")
        localStorage.clear("myPosts")
        localStorage.clear("user")
        document.location.href = "/pages/login/login.html"
    })
}
function backLogout(){
    const div2 = document.querySelector(".div-logout")
    const div = document.querySelector(".div-end-token") 
    div.addEventListener("click", (event) =>{
        console.log(event.target.classList)
        if(event.target.classList == "div-logout" || event.target.classList == "h3-end" ||event.target.classList == "div-end-token width-100 height-100 absolute" ){
            div.innerHTML = ""
            div2.remove()
            div.classList = "div-end-token"
        }
    })
}
