import { loadingLogin } from "../../scripts/api.js"
async function login(){
    
    const email    = document.querySelector(".email")
    const password = document.querySelector(".password")
    const button   = document.querySelector(".login")
    const buttonCadastrar = document.querySelector(".register-back")
    await button.addEventListener("click",(event) => {
        event.preventDefault()
        const objectLogin = {
            email: email.value,
            password: password.value,
        }
        console.log(loadingLogin(objectLogin))
       
    })
    buttonCadastrar.addEventListener("click",(event) => {
        event.preventDefault()
        document.location.href = "/index.html"
        // https://fuzzy-guide-a30d048a.pages.github.io/
    })
}
login()