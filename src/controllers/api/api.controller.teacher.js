import pool from '../../configs/database'
import { v4 as uuidv4 } from "uuid"
import EmailValidate from '../utils/email.validation'
import UserNameValidate from '../utils/name.validation'
import PasswordValidate from '../utils/password.validation.js'

const teacherSignUp = async (req, res) => {
    const { teacherName, teacherEmail, teacherPassword } = req.body
    const teacherId = uuidv4()
    const teacherPhoneNumber = ''
    const teacherAvatar = '/images/database/def_avt.jpg'
    const teacherRating = 0
    const teacherRatinTotal = 0
    const teacherCreatedAt = Date.now()
    const teacherUpdatedAt = teacherCreatedAt

    const isEmailInvalid = await validateTeacherEmail(teacherEmail)
    const isTeacherName = UserNameValidate.validateUserName(teacherName)
    const isPassword = PasswordValidate.validatePassword(teacherPassword)

    const insertQuery =
        `insert into teachers 
        (
            teacher_id, teacher_name, teacher_email, teacher_phone_number, teacher_password, teacher_avatar,
            teacher_created_at, teacher_updated_at, teacher_rating, teacher_rating_total
        )
        values (
            '${teacherId}', '${teacherName}', '${teacherEmail}', '${teacherPhoneNumber}', '${teacherPassword}', '${teacherAvatar}',
            ${teacherCreatedAt}, ${teacherUpdatedAt}, ${teacherRating}, ${teacherRatinTotal}
        )`

    if (isEmailInvalid != 200) {
        switch (isEmailInvalid) {
            case 400: {
                return res.status(400).json({
                    message: 'Sai định dạng email.',
                    code: 400
                })
            }

            case 409: {
                return res.status(409).json({
                    message: 'Email đã được đăng ký.',
                    code: 409
                })
            }

            case 500: {
                return res.status(500).json({
                    message: message500,
                    code: 500
                })
            }
        }
    }

    if (!isTeacherName) {
        return res.status(400).json({
            message: 'Tên không hợp lệ!',
            code: 400
        });
    }

    if (!isPassword) {
        return res.status(400).json({
            message: 'Mật khẩu phải có ít nhất 8 ký tự.',
            code: 400
        });
    }

    try {
        await pool.execute(insertQuery)

        return res.status(200).json({
            message: 'Success',
            code: 200
        })
    } catch (e) {
        logError('TEACHER SIGN UP', e)

        return res.status(500).json({
            message: message500,
            code: 500
        })
    }
}

const teacherLogin = async (req, res) => {
    const { teacherEmail, teacherPassword } = req.body
    const querySearchTeacherByEmail =
        `
        select 
            teacher_id as teacherId,
            teacher_name as teacherName,
            teacher_email as teacherEmail,
            teacher_phone_number as teacherPhoneNumber,
            teacher_password as teacherPassword,
            teacher_avatar as teacherAvatar,
            teacher_rating as teacherRating,
            teacher_rating_total as teacherRatingTotal,
            teacher_created_at as teacherCreatedAt,
            teacher_updated_at as teacherUpdatedAt
        from teachers
        where teacher_email like '${teacherEmail}' and teacher_password like '${teacherPassword}'
        order by teacher_created_at desc
        `

    try {
        const [rows, fields] = await pool.execute(querySearchTeacherByEmail)
        const hasData = rows.length > 0

        if (hasData) {
            return res.status(200).json({
                message: 'Success',
                code: 200,
                obj: rows[0] // Day la doi tuong hop le duoc tra ve
            })
        } else {
            return res.status(404).json({
                message: 'Tài khoản không hợp lệ!',
                code: 404
            })
        }
    } catch (e) {
        logError('TEACHER LOGIN', e)
        return res.status(500).json({
            message: message500,
            code: 500
        })
    }
}

const teacherGetAllSubject = async (req, res) => {
    const queryGetAllSubject =
        `select
            subject_id as subjectId,
            subject_name as subjectName
        from subjects
        order by subject_id asc`

    try {
        const [rows, fields] = await pool.execute(queryGetAllSubject)

        return res.status(200).json({
            code: 200,
            subjects: rows
        })
    } catch (e) {
        logError('GET ALL SUBJECT', e)
        return res.status(500).json({
            code: 500,
            message: message500,
        })
    }
}

const validateTeacherEmail = async (teacherEmail) => {
    let isEmail = EmailValidate.validateEmail(teacherEmail)

    if (isEmail) {
        try {
            let searchEmailQuery = `select teacher_email from teachers where teacher_email like '${teacherEmail}'`
            const [rows, fields] = await pool.execute(searchEmailQuery)

            return rows.length <= 0 ? 200 : 409
        } catch (e) {
            return 500
        }
    } else {
        return 400
    }
}

const logError = (tag, error) => {
    console.error(
        `\n===== ${tag} =====\nError: ${error}\n`
    )
}

const ApiTeacher = {
    teacherSignUp, teacherLogin, teacherGetAllSubject
}

const message500 = 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu. Vui lòng thử lại sau.'

export default ApiTeacher