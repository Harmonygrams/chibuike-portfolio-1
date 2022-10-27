const multiparty = require('multiparty')
require('dotenv').config()
const nodemailer = require('nodemailer') 
const transport = nodemailer.createTransport({
    host : 'smtp.gmail.com', 
    port : 465, 
    auth : {
        user : process.env.MAIL_USERNAME, 
        pass : process.env.MAIL_PASSWORD, 

    }
})
const sendContactForm = async (request, response, next) => {
    const form = await new multiparty.Form() 
    let data = await {}
    //creating a promise that returns another promise 
    const formFields = await new Promise((resolve, reject) => {
        form.parse(request, (err, fields, files) => {
            if(err){
                reject(err)
                return
            }
            resolve (fields)
        })
    })
    Object.keys(formFields).forEach(formField => {
        data[formField] = formFields[formField].toString()
    })
    const mail = {
        from : data.name, 
        to : process.env.MAIL_USERNAME, 
        subject : data.subject, 
        text : `${data.name} <${data.email}> \n${data.message}`
    }
    transport.sendMail(mail, (err, data) => {
        if(err) return response.status(500).json({ success : false, data :  err})
        response.status(200).json({ success : true , data : "Your email was submitted succesfully"})
    })
}
const verifyMailConnection = () => {
    transport.verify((err, success) => {
        if(err) return console.log('error occurred', err) 
    })
}
module.exports = {sendContactForm, verifyMailConnection}