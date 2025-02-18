import { useState } from "react"
import { MAX_CHARACTER } from "../../lib/constant";
import { useFeedbackItemssStore } from "../../stores/feedbackStore";


export default function FeedbackForm() {

    // const { handleAddToList: onAddToList } = useFeedBackItemContext();
    const onAddToList = useFeedbackItemssStore(state => state.handleAddToList)

    const [text, setText] = useState("")
    // derived from text state so dont need to create usestate
    const charcount = MAX_CHARACTER - text.length;
    const [showValidIndicator, setShowValidIndicator] = useState(false)
    const [showInvalidIndicator, setShowInvalidIndicator] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        if (newText.length > MAX_CHARACTER) {
            return;
        }
        setText(newText)
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (text.includes('#') && text.length >= 5) {
            setShowValidIndicator(true)
            setTimeout(() => {
                setShowValidIndicator(false)
            }, 2000);
        }
        else {
            setShowInvalidIndicator(true)
            setTimeout(() => {
                setShowInvalidIndicator(false)
            }, 2000);
        }

        onAddToList(text);
        setText("")
    }



    return (
        <form onSubmit={(e) => handleSubmit(e)} className={`form ${showValidIndicator ? 'form--valid' : ''} ${showInvalidIndicator ? 'form--invalid' : ''}`}>
            <textarea
                id="feedback-textarea"
                value={text}
                onChange={handleChange}
                placeholder="adsns"
                spellCheck={false}
            />

            <label htmlFor="feedback-textarea">
                Enter your feedback here,remember to #hashtag the company
            </label>
            <div>
                <p className="u-italic">{charcount}</p>
                <button>
                    <span>Submit</span>
                </button>
            </div>
        </form>
    )
}
