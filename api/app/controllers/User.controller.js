const bcrypt = require("bcrypt")
const User = require("../../database/models/User.model")
const generatePassword = require("../helpers/generateReferralCode.helper")
const sendNotification = require("../helpers/sendEmailNotification.helper")

exports.editUserProfile = (req, res) => {
  try {
    const userId = req.params.id
    const editUserProfileData = req.body
    console.log(userId, editUserProfileData)
    if (!userId) {
      let response = {
        success: false,
        message: "Se debe de enviar el _id del usuario a editar.",
      }
      if (Object.keys(editUserProfileData).length === 0) {
        response.message = "Debes enviar el dato para editar de este usuario."
        res.status(400).json(response)
      }
    }

    if (editUserProfileData && userId) {
      if (editUserProfileData.password) {
        editUserProfileData.password = bcrypt.hashSync(
          editUserProfileData.password,
          10
        )
      }
      User.findOneAndUpdate(
        { _id: userId },
        editUserProfileData,
        { omitUndefined: true },
        (err, doc) => {
          if (err) {
            console.log(err)
          }
          return res.json({
            success: true,
            user: doc,
          })
        }
      )
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error: error.message,
    })
  }
}

exports.restorePassword = (req, res) => {
  try {
    const emailRestore = req.params.email
    if (!emailRestore) {
      res.status(400).json({
        success: false,
        error: 'Debes enviar el ID de usuario para restablecer la contraseña.'
      })
    }

    let newPassword = generatePassword(8);

    User.findOneAndUpdate(
      { email: emailRestore },
      { password: bcrypt.hashSync(newPassword, 10) },
      { omitUndefined: true },
      async (err, doc) => {
        if (err) console.log(err)

        if (!doc) {
          return res.status(404).json({
            success: false,
            error: 'No existe una cuenta asociada a este correo electrónico.',
            user: doc
          })
        }

        let textBody = `
        Has solicitado restaurar tu cuenta asociada al correo electrónico ${doc.email}.
        Tu nueva contraseña para poder recuperar tu cuenta es ${newPassword}.
        `

        let htmlBody = `
        <div>
          <p>Has solicitado restaurar tu cuenta asociada al correo electrónico <strong>${doc.email}</strong>.</p>
          <p>Tu nueva contraseña para recuperar tu cuenta es:</p>
          <h3><strong>${newPassword}</strong></h3>
          <p>Ingresa a tu cuenta y cambia tu contraseña cuándo quieras.</p>
        </div>
        `

        await sendNotification(doc.email, 'Restauración de Cuenta', textBody, htmlBody);

        return res.json({
          success: true,
          newPassword: newPassword,
          user: doc
        })
      }
    )

  } catch (error) {
    console.log(error)
    res.status(500).send({
      error: error.message,
    })
  }
}