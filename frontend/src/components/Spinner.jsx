import "../icons/spinner.css"

export function Spinner() {
    return (
        <div className="lds-ring flex items-center justify-center">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}