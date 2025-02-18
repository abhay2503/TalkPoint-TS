
export default function HashtagItem({ company, index, onSelectCompany }: { company: string, index: number, onSelectCompany: (company: string) => void }) {
    return (
        <li
            key={index}
        ><button onClick={() => onSelectCompany(company)}>#{company}</button></li>
    )
}
