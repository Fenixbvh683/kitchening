const { validationResult } = require('express-validator')
const db = require('../../database/models')

module.exports = (req,res) => {

    const errors = validationResult(req);

    if(errors.isEmpty()){

        const {name, surname, birthday} = req.body
        
        db.User.update(
            {
                name : name.trim(),
                surname : surname.trim(),
                birthday
            },
            {
                where : {
                    id : req.session.userLogin.id
                }
            }
        )
        .then(response => {
            console.log(response);
            req.session.userLogin.name = name;
            res.locals.userLogin.name = name;

            if(req.cookies.kitcheringUser031) {
                res.cookie('kitcheringUser031', req.session.userLogin)
            }

            return res.redirect('/')
        })
    } else {

        db.User.findByPk(req.session.userLogin.id)
        .then(user => {
            return res.render('profile',{
        ...user.dataValues,
        errors : errors.mapped()
        })

    })
    .catch(error => console.log(error))

    }

}