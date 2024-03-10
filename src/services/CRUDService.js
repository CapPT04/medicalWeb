import bcrypt from 'bcryptjs'
import db from '../models/index'

const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassworkFromBcrypt = await hashUserPasswork(data.passwork);
            await db.User.create({
                email: data.email,
                passwork: hashPassworkFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })

            resolve("Ok create a new user succeed!")
        } catch (e) {
            reject(e);
        }
    })

}

let hashUserPasswork = (passwork) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPasswork = await bcrypt.hashSync(passwork, salt);
            resolve(hashPasswork);
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
}