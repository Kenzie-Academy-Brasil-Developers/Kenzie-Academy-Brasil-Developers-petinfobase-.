import { createPost, creatHeader ,renderModal, } from "../../scripts/render.js"
export async function preview(){
    const linkRequest = "http://localhost:3333/"
    const token = localStorage.getItem("token")
    try{
        const request = await fetch(linkRequest+"users/profile",{
            method: "GET",
            headers:{
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            
        })
        
        const result = await request.json()
        localStorage.setItem("user", JSON.stringify(result))
        creatHeader(result)
        renderModal()
    }catch(err){
        alert("erro")
    }
}
export async function schrechPost(){
    const linkRequest = "http://localhost:3333/"
    const token = localStorage.getItem("token")
    try{
        const request = await fetch(linkRequest+"posts",{
            method: "GET",
            headers:{
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            
        })
        if(request.status == 200){
            const result = await request.json()
            createPost(result)
            creatHeader(result) 
        }  
    
    }catch(err){
        alert("erro")
    }
}
function verification(){
    const token = localStorage.getItem("token")
    if(token && token !== ""){
        preview()
        schrechPost()
    }else{
        return   document.location.href = "/index.html"
    }
}
verification()


