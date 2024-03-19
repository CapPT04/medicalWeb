import bcrypt from 'bcryptjs'
import db from '../models/index'
import user from '../models/user';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassworkFromBcrypt = await hashUserPasswork(data.passwork);
            await db.User.create({
                email: data.email,
                passwork: hashPassworkFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName, // Sửa thành lastName
                address: data.address, // Sửa thành address
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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInforById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)

            } else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();

                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (e) {
            console.log(e);

        }
    })
}

let deleteUserById = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userID }
            })
            if (user) {
                await user.destroy();
            }

            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInforById: getUserInforById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}