import { LoaderCircle } from 'lucide-react';

function Loading() {
  return (
    <div className='min-w-screen py-5'>
      <LoaderCircle size={32} className='text-blue-700 animate-spin m-auto' />
    </div>
  )
}

export default Loading