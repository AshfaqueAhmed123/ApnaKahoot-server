import {PORT,MONGODB_URI,DB_NAME} from "./src/config/config.js"
import connectDB from "./src/db/db.connection.js"
import {app} from "./src/app.js"


connectDB(MONGODB_URI,DB_NAME)
.then(() => {
    app.listen(PORT || 8000, () => {
        console.log(`⚙️  Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})