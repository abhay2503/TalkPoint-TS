import { useFeedbackItemssStore } from "../stores/feedbackStore";
import HashtagItem from "./HashtagItem";

export default function HashtagList() {

    // const { companyList, handleSelectCompany } = useFeedBackItemContext();

    // here to execute function as it is derived state we use ()
    const companyList = useFeedbackItemssStore((state) => state.getCompanyList())
    console.log(companyList);

    const handleSelectCompany = useFeedbackItemssStore((state) => state.handleSelectCompany)


    // here () is used when we are returning single element
    return (
        <ul className="hashtags">
            {companyList.map((company, index) => (<HashtagItem key={index} onSelectCompany={handleSelectCompany} company={company} index={index} />))}

        </ul>
    )
}
