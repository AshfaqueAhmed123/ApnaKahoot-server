import { PORT, MONGODB_URI, DB_NAME } from "./src/config/config.js"
import connectDB from "./src/db/db.connection.js"
import { httpServer, io } from "./src/app.js"


connectDB(MONGODB_URI, DB_NAME)
    .then(() => {
        httpServer.listen(PORT || 8000, () => {
            console.log(`⚙️  Server is running at port : ${PORT}`);
        })

        // R/T stuff
        io.on("connection", (socket) => {
            console.log(socket.id.slice(0, 3))
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })