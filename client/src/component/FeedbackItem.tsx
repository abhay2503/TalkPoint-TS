import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedBackItem } from "../lib/types";
import { useState } from "react";


type FeedBackItemProps = {
    feedbackItem: TFeedBackItem
}

export default function FeedbackItem({ feedbackItem }: FeedBackItemProps) {

    const [open, setOpen] = useState(false)
    const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount)
    console.log(feedbackItem);
    const currentDate = new Date();
    const feedbackDate = new Date(feedbackItem.createdAt!);
    const daysAgo = !feedbackItem.createdAt ? 0 : Math.floor((currentDate.getTime() - feedbackDate!.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <li onClick={() => setOpen(prev => !prev)} className={`feedback ${open ? 'feedback--expand' : ''}`}>
            <button onClick={(e) => {
                // here settarget to disable after voting   
                e.currentTarget.disabled = true;
                e.stopPropagation();
                setUpvoteCount(prev => prev + 1)
            }}>
                <TriangleUpIcon />
                <span>{upvoteCount}</span>
            </button>
            <div>
                <p>{feedbackItem.badgeLetter}</p>
            </div>

            <div>
                <p>{feedbackItem.company}</p>
                <p>{feedbackItem.text}</p>
            </div>

            <p>{daysAgo === 0 ? 'NEW' : `${daysAgo} d`}</p>
        </li>
    )
}
