import { ExplorerItem } from "../types/index"
import { Tag } from 'lucide-react';

interface ExploreCartProps{
  item:ExplorerItem;
}
export function ExploreCart({item}:ExploreCartProps) {
  return (
    <div className="m-auto my-3 px-6 pt-6 pb-8 flex flex-col justify-center items-center bg-blue-100 rounded-md shadow-md">
      <div className="mb-2 bg-black w-full h-60 rounded-md">
        <img src={item.image} 
        alt={item.title}
        className="w-full h-full rounded-md shadow-sm" />
      </div>
      <div className="flex flex-row gap-1 justify-start items-center w-full pl-6 mt-4">
        <Tag size={12} className="text-purple-800"/>
        <span className="text-purple-800 text-sm">{item.category}</span>
      </div>
      <h1 className="font-bold text-xl text-left w-full my-3 pl-6">{item.title}</h1>
      <p className="text-gray-700 text-sm pl-6 text-wrap">{item.description}</p>
    </div>
  )
}

export default ExploreCart