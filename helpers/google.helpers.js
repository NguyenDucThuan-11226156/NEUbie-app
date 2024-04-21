const User = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");
module.exports.upsertUserSocialMedia = async (typeAcc, dataRaw) => {
  try {
    let user = null;
    if (typeAcc === "GOOGLE") {
      user = await User.findOne({
        email: dataRaw.email,
        type: typeAcc,
      });
      if (!user) {
        //Create new account
        const tokenUser = uuidv4();
        user = new User({
          email: dataRaw.email,
          fullName: dataRaw.fullName,
          type: typeAcc,
          tokenUser: tokenUser,
        });
        user.tokenUser = tokenUser;
        await user.save();
      } else {
        const tokenUser = uuidv4();
        await User.updateOne(
          { email: dataRaw.email, type: typeAcc },
          { tokenUser: tokenUser }
        );
        user.tokenUser = tokenUser;
      }
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};
