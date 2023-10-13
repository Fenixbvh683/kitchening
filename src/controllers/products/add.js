const { readJSON } = require("../../data")

module.exports = (req,res) => {

    const categories = readJSON('categories.json');
    const sections = readJSON('sections.json')
    return res.render('productAdd', {
        categories,
        sections : sections.sort()
    })
}