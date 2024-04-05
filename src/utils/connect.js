import mongoose from "mongoose";
import { DB_URI } from "./env";

const connect = () => {
    mongoose.connect(DB_URI)
        .then(() => console.log("Connected to database"))
        .catch((err) => console.log(err));
}

export default connect;