const db = require("../../database/models")

module.exports = (req,res) => {

    const categories = db.Category.findAll({
        order : ['name']
    });
    const sections = db.Section.findAll({
        order : ['name']
    });

    Promise.all([categories, sections])
        .then(([categories, sections]) => {

            return res.render('productAdd', {
        categories,
        sections
        })
    
    })
    .catch(error => console.log(error))
}