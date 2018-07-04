/**
 * Created by Harshmeet on 02/07/17.
 */
module.exports = function (app) {
    app.get("/api/checkConnection", checkConnection)

    function checkConnection(req, res) {
        console.log("backend is working");
        res.send("Server connection done");
    }
}
