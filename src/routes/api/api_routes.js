import express from "express"
import ApiTeacher from "../../controllers/api/api.controller.teacher"

let routes = express.Router()

const initApiRoutes = (app) => {

    routes.post('/teachers/account/signup', ApiTeacher.teacherSignUp)
    routes.post('/teachers/account/login', ApiTeacher.teacherLogin)
    routes.post('/teachers/subjects/get/all', ApiTeacher.teacherGetAllSubject)

    return app.use('/duylt/api/v1', routes)
}

export default initApiRoutes