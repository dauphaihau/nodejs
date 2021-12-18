class NewController {

    // [GET] /news
    index(req, res) {
        console.log(req.query)
        res.render('news')
    }

    // [GET] /news/:slug
    show(req, res){
        res.send('news detail !!!')
    }
}

module.exports = new NewController
