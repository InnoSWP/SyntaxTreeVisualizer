import express from "express";

const server = express();
const port = 3001;

server.listen(process.env.PORT || port, () => {
    console.log(`Server started on port ${process.env.PORT || port}`)
});



