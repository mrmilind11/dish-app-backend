const cors = require('cors');
module.exports = function (app) {
    app.use(cors());
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Listening to ${port}...`)
    })
}