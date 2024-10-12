const getTestPage = (req, res) => {
    return res.render('test/test.ejs')
}

const getHomePageTest = (req, res) => {
    return res.render('home/home.ejs')
}

const StudentController = {
    getTestPage, getHomePageTest,
}

export default StudentController