import { useState } from "react"
import PersonIcon from '@mui/icons-material/Person'
import { Link } from 'react-router-dom'
import LinkItem from '../../types/link.type'

export function Dropdown({ options, userName }: { options: LinkItem[]; userName: string} ) {
    const [isExpandend, setIsExpanded] = useState(false)

    return (
        <div className="relative inline-block text-white">
            <div className="hover:opacity-80 hover:scale-105">
                <button
                    className="text-4xl mr-4 h-full items-center flex"
                    onClick={() => setIsExpanded(!isExpandend)}
                >
                    <span className="text-sm">{userName}</span>
                    <PersonIcon className=" text-white text-2xl" fontSize="inherit" />
                </button>
            </div>
            {isExpandend && (
                <div className="h-fit absolute mt-2 right-4 w-32 bg-gray-200 rounded-lg ">
                    {options.map(op => (
                        <div>
                            <Link
                                key={op.text}
                                to={op.to}
                                className="w-full"
                                role="menuitem"
                            >
                                <div className="hover:bg-purple-500 hover:scale-110 hover:text-white border-b-[1px] border-gray-400 rounded-md h-full block px-4 py-2 text-sm text-gray-700 w-full box-border">
                                    {op.text}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
