import { loadingLogin } from "../../scripts/api.js"

async function login(){
    
    const email    = document.querySelector(".email")
    const password = document.querySelector(".password")
    const button   = document.querySelector(".login")
    const buttonCadastrar = document.querySelector(".register-back")
    await button.addEventListener("click",(event) => {
        event.preventDefault()
        console.log("oi")
        const objectLogin = {
            email: email.value,
            password: password.value,
        }
        console.log(loadingLogin(objectLogin))
       
    })
    buttonCadastrar.addEventListener("click",(event) => {
        event.preventDefault()
        document.location.href = "/pages/register/index.html"
    })
}
login()