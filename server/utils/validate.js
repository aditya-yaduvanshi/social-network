
class Validate {
  static async isEmail (email) {
    let mail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return mail.test(String(email).toLowerCase())
  }
  
  static async isPhone (phone) {
    let num = /^\d{10}$/
    return num.test(String(phone).toLowerCase())
  }

  static async isValid (data) {
    //
    return true
  }
}

module.exports = Validate