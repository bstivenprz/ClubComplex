const path = require('path')
const moment = require('moment')
const User = require('../../database/models/User.model')
const Project =  require('../../database/models/Projects.model')
const sendNotification = require('../helpers/sendEmailNotification.helper')

require('dotenv').config({ path: path.join(__dirname, '../../config/.env') })
const emailNotification = process.env.EMAIL_SHOP_NOTIFICATIONS

exports.shopItem = async (req, res) => {
    try {
        const { userId, projectId, total } = req.body
        const ProjectInfo = await Project.findOne({ _id: projectId }).exec();
        User.findOneAndUpdate({ _id: userId }, {
            $push: {
                transactions: [
                    {
                        projectId: projectId,
                        trasactionName: 'Compra de título',
                        transactionValue: total,
                        transactionDate: new Date()
                    }
                ]
            }
        }, async (err, doc) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            }

            let textBody = `
            Alguien ha realizado la compra de un título por el sitio web de Club Complex,
            a continuación se adjunta la información del usuario para ponerse en contácto
            lo más pronto posible:

            Nombre: ${doc.firstName} ${doc.lastName}
            Correo electrónico: ${doc.email}
            Teléfono: ${doc.phone}
            Proyecto: ${ProjectInfo.title} (ID: ${projectId})
            Valor: $ ${total}
            Fecha: ${moment().format('HH:mm:ss DD/MM/YYYY')}
            `
    
            let htmlBody = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=680px, initial-scale=1.0">
                <title>Notificación de compra</title>
            </head>
            <body>
                <p>
                    Alguien ha realizado la compra de un título por el sitio web de Club Complex,
                    a continuación se adjunta la información del usuario para ponerse en contácto
                    lo más pronto posible:
                </p>
                <p><strong>Nombre:</strong> ${doc.firstName} ${doc.lastName}</p>
                <p><strong>Correo electrónico:</strong> ${doc.email}</p>
                <p><strong>Teléfono:</strong> ${doc.phone}</p>
                <p><strong>Proyecto:</strong> ${ProjectInfo.title} (ID: ${projectId})</p>
                <p><strong>Valor:</strong> $ ${total}</p>
                <p><strong>Fecha:</strong> ${moment().format('HH:mm:ss DD/MM/YYYY')}</p>
            </body>
            </html>
            `

            await sendNotification(emailNotification, 'Compra de títulos por Club Complex', textBody, htmlBody)

            return res.status(200).json({
                success: true,
                user: doc
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}