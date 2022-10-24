/* Desenvolva seu código aqui */
import {register} from "../../scripts/api.js"
async function valueInpusts(){

    const user = document.querySelector(".user")
    const email = document.querySelector(".email")
    const img = document.querySelector(".new-img")
    const password = document.querySelector(".password")
    const button = document.querySelector(".register-ok")
    const backButton = document.querySelector(".back-login")
    const back = document.querySelector(".button-back-login")
    const p = document.querySelector(".paragph")

    await button.addEventListener("click",(event) => {
        event.preventDefault()
        if(user.value !== "" && password.value !== "" && email.value !== ""){
            console.log("oi")
            const object = {
            username: user.value,
            email: email.value,
            password: password.value,
            avatar: img.value,
        } 
            register(object)       
        }else{
            p.innerHTML = ""
            p.innerText = "Há campos vazios"
        }
            
    })     
    back.addEventListener("click",(event) =>{
        event.preventDefault()
        document.location.href = "/pages/login/login.html"
    })
    backButton.addEventListener("click",(event) => {
        document.location.href = "/pages/login/login.html"
    })   
    
}
valueInpusts()