module.exports = (req,res) => {
    req.session.destroy();
    res.cookie('kitcheringUser031', null,{
        maxAge : -1
    })
    return res.redirect('/')
}