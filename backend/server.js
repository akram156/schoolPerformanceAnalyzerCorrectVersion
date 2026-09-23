const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
connectDB();
const app = express();
const port = process.env.PORT||9825;
app.use(express.json());
app.use(cors());
app.use("/api/user", require("./routes/user.route"));
app.use("/api/authorization", require("./routes/auth.route"));
app.use("/api/verification", require("./routes/verify.route"));
app.use("/api/setting", require("./routes/profileEdit.route"));
app.use("/api/setting", require("./routes/changePassword.route"));
app.use("/api/setting", require("./routes/profilePicture.route"));
app.use("/api/analysis", require("./routes/analysis.route"));
app.use("/api/getAnalyses", require("./routes/allAnalyses.route"));
app.use("/api/edit", require("./routes/edit.route"));
app.use("/api/reset",require("./routes/reset.route"))
app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log(`the server is running on:http://localhost:${port}`);
});
