const bcrypt = require("bcrypt");
const User = require("../../database/models/User.model");

exports.editUserProfile = (req, res) => {
  try {
    const userId = req.params.id;
    const editUserProfileData = req.body;
    console.log(userId, editUserProfileData);
    if (!userId) {
      let response = {
        success: false,
        message: "Se debe de enviar el _id del usuario a editar.",
      };
      if (Object.keys(editUserProfileData).length === 0) {
        response.message = "Debes enviar el dato para editar de este usuario.";
        res.status(400).json(response);
      }
    }

    if (editUserProfileData && userId) {
      if (editUserProfileData.password) {
        editUserProfileData.password = bcrypt.hashSync(
          editUserProfileData.password,
          10
        );
      }
      User.findOneAndUpdate(
        { _id: userId },
        editUserProfileData,
        { omitUndefined: true },
        (err, doc) => {
          if (err) {
            console.log(err);
          }
          return res.json({
            success: true,
            user: doc,
          });
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
    });
  }
};
