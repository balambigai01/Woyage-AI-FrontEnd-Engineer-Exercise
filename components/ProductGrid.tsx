'use client'

import { Product } from "@/types/dummyapi"
import ProductCard from "./ProductCard"

export default function ProductGrid({ response }: { response: Product[] }) {
    
    if(response.length ===0) <div className="p-8 text-center text-gray-600">No Product Found.</div>
    return (
        <div>
            {response.map((Response)=>(<ProductCard key={Response.id} product={Response}/>))}
        </div>
    )
}