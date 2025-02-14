const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const path = require('path')
const app = express()
const port = 3333

const route = require('./routes')
const db = require('./config/db')

// connect to database
db.connect()

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
    extended: true,
}))

app.use(express.json())
// app.use(morgan('combined')) 

// HTTP method override
app.use(methodOverride('_method'))

// template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        formatDate: (date) => {
            if (!date) return 'N/A';
            return new Date(date).toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
        }
    }
}))
app.set('view engine','hbs')
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app)

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})