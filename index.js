import express from "express"
import {createServer} from "http"
import {Server} from "socket.io"
import cors from "cors"

import {fileURLToPath} from "url";
import path from "path";
import {LlamaModel, LlamaContext, LlamaChatSession} from "node-llama-cpp";

const app = express()
const server = createServer(app)

const io = new Server(server)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
    modelPath: path.join(__dirname, "models", "notus-7b-v1.Q4_K_M.gguf")
});
const context = new LlamaContext({model});
const session = new LlamaChatSession({context});



app.use(express.static(__dirname + "/assets"))

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log(msg)
    })
})
 
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

const PORT = process.env.PORT || 8001
server.listen(PORT, () => console.log(`server started on PORT ${PORT}`))


const q1 = "Hi there";
console.log("User: " + q1);

const a1 = await session.prompt(q1);
console.log("AI: " + a1);

