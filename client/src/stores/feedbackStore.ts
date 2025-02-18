import { create } from "zustand";
import { TFeedBackItem } from "../lib/types";

type Store = {
    feedbackItems: TFeedBackItem[];
    isLoading: boolean;
    errorMessage: string;
    selectedCompany: string;
    getCompanyList: () => string[]
    filteredFeedbackItems: () => TFeedBackItem[];
    handleAddToList: (text: string) => void;
    fetchFeedbackItems: () => void;
    handleSelectCompany: (company: string) => void;
}
// exporting this object of store
export const useFeedbackItemssStore = create<Store>((set, get) => ({
    // intially it will be empty
    feedbackItems: [],
    isLoading: false,
    errorMessage: "",
    selectedCompany: "",
    companyList: [],
    // actions now
    handleAddToList: async (text: string) => {
        try {
            const companyName = text.split(' ').find(word => word.includes('#'))!.substring(1)
            const newItem: TFeedBackItem = {
                id: new Date().getTime(),
                text: text,
                upvoteCount: 0,
                company: companyName,
                badgeLetter: companyName.substring(0, 1).toUpperCase()
            }
            // setFeedbackItems(prev => [...prev, newItem]);

            // return object of state which is changed
            set(state => ({
                feedbackItems: [...state.feedbackItems, newItem] // Ensure correct property name
            }));

            console.log(newItem);

            // fetch return promise
            const response = await fetch(
                "https://talk-point-ts-4ptq.vercel.app/api/postFeedback",
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



    },
    handleSelectCompany: (company: string) => {
        // setSelectedCompany(company);
        set(() => ({
            selectedCompany: company
        }))
    },
    fetchFeedbackItems: async () => {
        // setIsLoading(true)
        set(() => ({
            isLoading: true
        }))

        try {
            const response = await fetch("https://talk-point-ts-4ptq.vercel.app/api/getFeedback")

            if (!response.ok) {
                console.log(response);

                throw new Error()
            }

            const data = await response.json()
            console.log(data.feedbacks);


            set(() => ({
                feedbackItems: data.feedbacks
            }))
        }
        catch (error) {
            console.log(error);

            set(() => ({
                errorMessage: "Something Went Wrong"
            }))
        }
        set(() => ({
            isLoading: false
        }))
    },
    // derived states from states
    getCompanyList: () => {
        return get().feedbackItems.map((item) => item.company).filter((company, index, array) => {
            return array.indexOf(company) === index
        })

    },
    filteredFeedbackItems: () => {
        const state = get();


        return state.selectedCompany ? state.feedbackItems.filter(feedbackItem => {
            return feedbackItem.company === state.selectedCompany
        }) : state.feedbackItems
    }
}))