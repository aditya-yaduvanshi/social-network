const AccountsSchema = require("./models")
const Validate = require("../utils/validate")

class Accounts {
  static async get (data) {
    try {
      await Validate.isValid(data)
      let user = await AccountsSchema.findOne({
        email: data.username
      })
      if(user){
        return {
          ok: 1,
          status: 200
        }
      }
    } catch (err) {
      console.log("Accounts Get Error : ", err)
      return {
        ok: 0,
        status: 500,
        msg: "Something went wrong!"
      }
    }
  }

  static async post (data) {
    try {
      if(await Validate.isValid(data)){
        letuser = AccountsSchema({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password
        })
        user = await user.save()
        if(user){
          return {
            ok: 1,
            status: 201
          }
        }
      } else {
        return {
          ok: 0,
          status: 401,
          msg: "Invalid data!"
        }
      }
    } catch (err) {
      console.log("Accounts Create Error : ", err)
      return {
        ok: 0,
        status: 500,
        msg: "Something went wrong!"
      }
    }
  }
}

module.exports = Accounts