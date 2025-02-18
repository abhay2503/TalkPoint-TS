import express, { Request, Response } from "express";
// import cors from "cors";

import prisma from './utils/db'
import path from 'path';

const app = express();
const PORT = 3000;

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.get("/api/getFeedback", async (req: Request, res: Response) => {
    try {
        const feedbacks = await prisma.feedBack.findMany()
        console.log(feedbacks);
        const serializedFeedbacks = feedbacks.map(fb => ({
            ...fb,
            id: fb.id.toString() // bcoz stringify function will create problem with bigint
        }));

        res.status(201).json({ feedbacks: serializedFeedbacks })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
})


app.post("/api/postFeedback", async (req: Request, res: Response) => {
    try {

        const body = await req.body;
        console.log(body);

        const feedBack = await prisma.feedBack.create({
            data: body
        })

        console.log(feedBack);

        res.status(201).json({ msg: feedBack });
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ msg: "Server Error" });
    }
})

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('*', (req, res) =>
    res.sendFile(
        path.resolve(__dirname, '../../', 'client', 'dist', 'index.html')
    )
);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});