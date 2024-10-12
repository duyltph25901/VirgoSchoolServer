import express from "express"
import StudentController from "../../controllers/web/controller.student"

let routes = express.Router()

const initWebRoute = (app) => {
    app.get('/', StudentController.getTestPage)
    app.get('/home', StudentController.getHomePageTest)

    return app.use('/', routes)
}

export default initWebRoute