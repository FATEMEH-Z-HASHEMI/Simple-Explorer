import React,{ useCallback, useRef, useState } from 'react'
import { Search } from 'lucide-react';
import { useInfiniteScroll } from "./hooks/useInfiniteScroll"
import { ExplorerItem } from "./types/index"
import Loading from "./components/Loading"
import ExploreCart from "./components/ExploreCart"
import './App.css'

function App() {
  const [items, setItems] = useState<ExplorerItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const page = useRef(1);

  const loadMoreItems = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const newItems: ExplorerItem[] = Array.from({ length: 6 }, (_, i) => ({
      id: (page.current - 1) * 6 + i,
      title: `Explorer Item ${(page.current - 1) * 6 + i + 1}`,
      description: 'This is a beautiful place to explore and discover new things.',
      image: `https://source.unsplash.com/random/800x600?nature&sig=${(page.current - 1) * 6 + i}`,
      category: ['Nature', 'Adventure', 'Travel', 'Discovery'][Math.floor(Math.random() * 4)]
    }));

    setItems(prev => [...prev, ...newItems]);
    page.current += 1;
    setLoading(false);
  }, [loading]);

  const observer = useInfiniteScroll(loadMoreItems);
  

  React.useEffect(() => {
    loadMoreItems();
  }, []);

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (

    <div className='min-w-screen grid columns-2'>
      <div className='pl-7 py-4 font-mono shadow-md mb-6'>
        <h1 className='font-semibold text-3xl'>Explorer</h1>
      </div>
      <div className='w-full mb-10 flex items-center relative'>
        <input type="text"
        className='w-4/5 ml-7 bg-blue-300 rounded-full py-2 pl-10 pr-3 font-mono border-b border-red-200 shadow-md'
        value={searchQuery}
        onChange={(e)=>setSearchQuery(e.target.value)}
         />
         <Search className='absolute left-10 cursor-pointer'/>
      </div>


      <div className='grid grid-cols-1 md:grid-cols-2  px-4 gap-2'>
        {filteredItems.map((item) => (
          <ExploreCart key={item.id} item={item}/>
        ))}
      </div>

        {loading && <Loading />}    

        <div
        ref={node => {
          if(node && observer){
            observer.observe(node)
          }
        }}
        className='h-4'></div>

    </div>
  )
}

export default App
