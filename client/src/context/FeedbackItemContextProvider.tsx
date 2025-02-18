import React, { createContext, useMemo, useState } from 'react'
import { TFeedBackItem } from '../lib/types';
import { useFeedbackItems } from '../lib/hooks';

type feedbackContextType = {
    feedbackItems: TFeedBackItem[];
    isLoading: boolean;
    errorMessage: string;
    companyList: string[];
    handleAddToList: (text: string) => void;
    filteredFeedbackItems: TFeedBackItem[];

    handleSelectCompany: (company: string) => void;
}

export const FeedbackContext = createContext<feedbackContextType | null>(null);

export default function FeedbackItemContextProvider({ children }: { children: React.ReactNode }) {
    // const [feedbackItems, setFeedbackItems] = useState<TFeedBackItem[]>([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [errorMessage, setErrorMessage] = useState("")


    const { errorMessage, feedbackItems, isLoading, setFeedbackItems } = useFeedbackItems()

    // Now Remove Duplicates
    const companyList = useMemo(() => {
        return feedbackItems.map((item) => item.company).filter((company, index, array) => {
            return array.indexOf(company) === index

        })
    }, [feedbackItems])

    const handleAddToList = async (text: string) => {
        try {
            const companyName = text.split(' ').find(word => word.includes('#'))!.substring(1)
            const newItem: TFeedBackItem = {
                id: new Date().getTime(),
                text: text,
                upvoteCount: 0,
                company: companyName,
                badgeLetter: companyName.substring(0, 1).toUpperCase()
            }
            setFeedbackItems(prev => [...prev, newItem]);


            // fetch return promise
            const response = await fetch(
                "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
                {
                    method: "POST",
                    body: JSON.stringify(newItem),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json()
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData);
            }
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }



    }

    // const fetchFeedbackItems = async () => {
    //     setIsLoading(true)

    //     try {
    //         const response = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks")

    //         if (!response.ok) {
    //             // this will throw error and we catch that in catch block
    //             throw new Error()
    //         }

    //         const data = await response.json()
    //         setFeedbackItems(data.feedbacks)
    //     }
    //     catch (error) {
    //         setErrorMessage("Something Went Wrong")
    //     }
    //     setIsLoading(false)
    // }

    // useEffect(() => {

    //     fetchFeedbackItems()

    //     // setIsLoading(true)
    //     // // Promise return ".then" 
    //     // fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks').then((response) => {
    //     //     if (!response.ok) {
    //     //         throw new Error()
    //     //     }
    //     //     return response.json()
    //     // }).then((data) => {
    //     //     setFeedbackItems(data.feedbacks);
    //     //     setIsLoading(false)
    //     // })
    //     //     .catch(() => {

    //     //         setErrorMessage("Something Went Wrong")
    //     //         setIsLoading(false)
    //     //     })
    // }, [])

    // company

    const [selectedCompany, setSelectedCompany] = useState("")
    // const companyList = feedbackItems.map((item) => item.company)



    // here if use curly braces then return....2. useMemo is used for mapping sorting filtering
    const filteredFeedbackItems = useMemo(() => {
        return selectedCompany ? feedbackItems.filter(feedbackItem => feedbackItem.company === selectedCompany) : feedbackItems
    }, [feedbackItems, selectedCompany]);



    const handleSelectCompany = (company: string) => {
        setSelectedCompany(company);
    }


    return (
        <FeedbackContext.Provider value={{
            feedbackItems,
            isLoading,
            errorMessage,
            companyList,
            filteredFeedbackItems,
            handleAddToList,
            handleSelectCompany
        }}>
            {children}
        </FeedbackContext.Provider>
    )
}




