const http = require('./app')
const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'

http.listen(port, host, () => console.log(`Server has been started on ${host}:${port}`))