import express from 'express'
import configViewEngine from './configs/view_engine'
import initWebRoute from './routes/web/web_routes'
import initApiRoutes from './routes/api/api_routes'

const app = express()
const HOST_NAME = "localhost"
const PORT = 7903

app.use(express.urlencoded({ extends: true }))
app.use(express.json())

configViewEngine(app)
initWebRoute(app)
initApiRoutes(app)

app.listen(PORT, () => {
    console.log(`Your app is running at http://${HOST_NAME}:${PORT}/`)
})