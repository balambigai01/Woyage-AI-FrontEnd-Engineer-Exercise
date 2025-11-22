'use client'
import React, { useState } from 'react'


type Props = {
categories: string[];
selectedCategory: string;
onCategoryChange: (c: string) => void;
minPrice: number | undefined;
maxPrice: number | undefined;
    onPriceChange: (min?: number, max?: number) => void;
    rating: number | null;
    onRatingChange: (rating: number | null) => void;
}


export default function Filters({ categories, selectedCategory, onCategoryChange, minPrice, maxPrice, onPriceChange ,rating,onRatingChange}: Props) {
    const [open,setOpen] = useState(false)
return (
<div className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-4">
<div>
<label className="text-xs font-medium">Category</label>
<select
value={selectedCategory}
onChange={(e) => onCategoryChange(e.target.value)}
className="mt-2 w-full rounded-md border px-2 py-2"
>
<option value="">All</option>
{categories.map(c => (
<option key={c} value={c}>{c}</option>
))}
</select>
</div>

        <div className='border-b border-b-gray-300 p-3 '>
            <button onClick={() => setOpen(!open)} className='flex flex-row justify-between w-full '>
               
                <label className='text-xs font-medium' id="accordion-collapse-heading-1">Customer Ratings</label>
                <svg
          className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="m5 15 7-7 7 7" />
        </svg>
               </button>  
           {open && (
                <div className="p-4 flex-1  flex-col space-y-2">
                    <div className=' flex gap-3'>
          <input type="checkbox" id="rating" checked={rating === 4}
      onChange={(e) => onRatingChange(e.target.checked ? 4 : null)}/>
          <label htmlFor="rating" className="cursor-pointer" 
   >
            4 & above ratings
                        </label></div>
                   
                        <div className=' flex gap-3'>
                      <input type="checkbox" id="rating"  checked ={rating===3}  onChange={(e) => onRatingChange(e.target.checked ? 3 : null)}/>
          <label htmlFor="rating" className="cursor-pointer">
            3 & above ratings
                        </label></div>
                <div className=' flex gap-3'>
                      <input type="checkbox" id="rating"  checked ={rating===2}  onChange={(e) => onRatingChange(e.target.checked ? 2 : null)}/>
          <label htmlFor="rating" className="cursor-pointer">
            2 & above ratings
          </label>
                        </div>
        </div>
      )}
   
</div>
<div>
<label className="text-xs font-medium">Price range</label>
<div className="flex gap-2 mt-2">
<input
type="number"
placeholder="min"
value={minPrice ?? ''}
onChange={(e) => onPriceChange(e.target.value ? Number(e.target.value) : undefined, maxPrice)}
className="w-1/2 rounded-md border px-2 py-2"
/>
<input
type="number"
placeholder="max"
value={maxPrice ?? ''}
onChange={(e) => onPriceChange(minPrice, e.target.value ? Number(e.target.value) : undefined)}
className="w-1/2 rounded-md border px-2 py-2"
/>
</div>
</div>
</div>
)
}