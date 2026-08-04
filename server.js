const express = require("express");

const app = express();

app.get("/add", (req, res) => {

    const a = 10;
    const b = 20;

    const sum = a + b;

    res.send("Sum = " + sum);

});

app.listen(3000, () => {
    console.log("Server Started on Port 3000");
});