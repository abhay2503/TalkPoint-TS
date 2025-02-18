"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cors from "cors";
const db_1 = __importDefault(require("./utils/db"));
const app = (0, express_1.default)();
const PORT = 3000;
// app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/api/getFeedback", async (req, res) => {
    try {
        const feedbacks = await db_1.default.feedBack.findMany();
        console.log(feedbacks);
        const serializedFeedbacks = feedbacks.map(fb => (Object.assign(Object.assign({}, fb), { id: fb.id.toString() // bcoz stringify function will create problem with bigint
         })));
        res.status(201).json({ feedbacks: serializedFeedbacks });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});
app.post("/api/postFeedback", async (req, res) => {
    try {
        const body = await req.body;
        console.log(body);
        const feedBack = await db_1.default.feedBack.create({
            data: body
        });
        console.log(feedBack);
        res.status(201).json({ msg: feedBack });
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ msg: "Server Error" });
    }
});
// app.use(express.static(path.join(__dirname, '../../client/dist')));
// app.get('*', (req, res) =>
//     res.sendFile(
//         path.resolve(__dirname, '../../', 'client', 'dist', 'index.html')
//     )
// );
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
