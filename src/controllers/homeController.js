import db from '../models/index'
import CRUDService from '../services/CRUDService';




let getHomePage = (req, res) => {
    return res.render('homepage.ejs');
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

//  object:{
//   key: ''
//   value: ''
// }

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);

    console.log(message);
    return res.send('post crud from server');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('-------------');
    console.log(data);
    console.log('-------------');
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}


let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    console.log(userId);
    if (userId) {
        let userData = await CRUDService.getUserInforById(userId);


        return res.render('editCRUD.ejs', {
            user: userData
        })

    } else {
        return res.send("User not found!");
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })


}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;

    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Delete user succeed!')
    } else {
        return res.send('User not found!')
    }

}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}