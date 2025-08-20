import { MisceláneoIcon } from "../../icons/CategoryIcons";

export function IndexCard ({name}) {

    return (
         <div className="flex flex-col rounded-md bg-white p-7 justify-center items-center">
                            <div className="flex gap-2 items-center">
                                <MisceláneoIcon size={40} />
                                <h1 className="text-2xl">{name}</h1>
                            </div>
                            <span className="text-xl">0000</span>
                        </div>
    )
}
