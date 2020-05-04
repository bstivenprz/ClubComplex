"use strict"
const nodemailer = require("nodemailer")
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../config/.env') })

module.exports = async function (to, subject, textBody, htmlBody ) {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    
        transporter.verify((error, success) => {
            if (error) {
                console.log(error)
            } else {
                console.log('SMTP Server Connected!')
            }
        })
    
        await transporter.sendMail({
        from: `"Club Complex" <${process.env.EMAIL_USER}>`,
        to: to, // list of receivers
        subject: subject,
        text: textBody,
        html: htmlBody
        }, (error, info) => {
            console.log("Message sent: %s", info.messageId)
            if (error || !omfp) return false
            return info.messageId    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        })


    } catch (error) {
        console.error(error)
    }

}