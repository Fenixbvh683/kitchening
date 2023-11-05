const { validationResult } = require("express-validator")
const db = require("../../database/models")

module.exports = (req,res) => {

    const errors = validationResult(req);

    if(errors.isEmpty()){

        db.User.findOne({
            where : {
                email : req.body.email
            }
        })
        .then(user => {

            req.session.userLogin = {
                id : user.id,
                name : user.name,
                role : user.roleId
            };
            
            req.body.remember !== undefined && res.cookie('kitcheringUser031', req.session.userLogin,{
                maxAge : 1000 * 60 * 20
            });

            return res.redirect('/')
        })
        .catch(error => console.log(error))
        
    }else {
        return res.render('login', {
            errors : errors.mapped()
        })
    }

};