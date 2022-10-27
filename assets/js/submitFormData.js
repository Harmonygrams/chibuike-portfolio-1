const formElement = document.querySelector("#contact-form")
const sendMail = (mail) => {
    fetch('https://backend.chibuike.net/send', {
        method : "POST", 
        body : mail, 
    }).then(response => response.json()). 
    then(data => console.log(data)) 
}
const formEvent = formElement.addEventListener('submit', (event) => {
    event.preventDefault() 
    let mail = new FormData(formElement)
    sendMail(mail)
})
