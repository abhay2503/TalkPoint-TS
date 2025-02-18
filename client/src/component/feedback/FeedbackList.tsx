
import FeedbackItem from "./../FeedbackItem";
import Spinner from "./../Spinner";
import ErrorMessage from "./../ErrorMessage";
import { useFeedbackItemssStore } from "../../stores/feedbackStore";


export default function FeedbackList() {

    // const { filteredFeedbackItems: feedbackItems, isLoading, errorMessage } = useFeedBackItemContext();

    const isLoading = useFeedbackItemssStore((state) => state.isLoading)
    const errorMessage = useFeedbackItemssStore((state) => state.errorMessage)

    const filteredFeedbackItems = useFeedbackItemssStore((state) => state.filteredFeedbackItems())


    return (
        <ol className="feedback-list">

            {
                isLoading && <Spinner />
            }
            {
                errorMessage && <ErrorMessage message={errorMessage} />
            }

            {
                // feedbackItems.map(feedbackItem => {
                //     return <FeedbackItem feedbackItem={feedbackItem} />
                // })
                filteredFeedbackItems.length == 0 ? "No Items In The List." : filteredFeedbackItems.map(feedbackItem => (
                    <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />))
            }

        </ol>
    )
}
