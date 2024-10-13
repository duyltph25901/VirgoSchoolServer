import pool from '../../configs/database'

const getTestPage = async (req, res) => {
    const sql = "select * from students order by student_created_at desc"
    const [rows, fields] = await pool.execute(sql)

    console.log(`Row: ${rows}`)

    return res.render('test/test.ejs')
}

const getHomePageTest = (req, res) => {
    return res.render('home/home.ejs')
}

const StudentController = {
    getTestPage, getHomePageTest,
}

export default StudentController