import { useContext, useEffect, useState } from "react";
import { FeedbackContext } from "../context/FeedbackItemContextProvider";
import { TFeedBackItem } from "./types";

export function useFeedBackItemContext() {
    const context = useContext(FeedbackContext);
    if (!context) {
        throw new Error("FeedbackContext is not defined FeedbackItemContextProvider component");
    }

    return context;
}

export function useFeedbackItems() {
    const [feedbackItems, setFeedbackItems] = useState<TFeedBackItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {

        const fetchFeedbackItems = async () => {
            setIsLoading(true)

            try {
                const response = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks")

                if (!response.ok) {
                    // this will throw error and we catch that in catch block
                    throw new Error()
                }

                const data = await response.json()
                setFeedbackItems(data.feedbacks)
            }
            catch (error) {
                setErrorMessage("Something Went Wrong")
            }
            setIsLoading(false)
        }

        fetchFeedbackItems()



        // setIsLoading(true)
        // // Promise return ".then" 
        // fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks').then((response) => {
        //     if (!response.ok) {
        //         throw new Error()
        //     }
        //     return response.json()
        // }).then((data) => {
        //     setFeedbackItems(data.feedbacks);
        //     setIsLoading(false)
        // })
        //     .catch(() => {

        //         setErrorMessage("Something Went Wrong")
        //         setIsLoading(false)
        //     })
    }, [])

    return { feedbackItems, isLoading, errorMessage, setFeedbackItems } as const;
}