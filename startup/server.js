const cors = require('cors');
const http = require('http');
module.exports = function (app) {
    app.use(cors());
    const port = process.env.PORT || 3000;
    const server = http.createServer(app);
    server.listen(port, () => {
        console.log(`Listening to ${port}...`)
    });
}