'use client'


import { Product } from "@/types/dummyapi"
import Image from "next/image"

export default function ProductCard({ product }: { product: Product }) {
    console.log("res",product)
    return (
        <>
            <div className="bg-white shadow-sm rounded-2xl p-4 flex flex-col gap-3">
  <div className="relative w-full aspect-4/3 bg-gray-100 rounded-lg overflow-hidden">
  <Image 
    src={product.thumbnail ?? product.images?.[0]} 
    alt={product.title} 
    fill
    className="object-cover"
    loading="lazy"
    sizes="(max-width: 768px) 100vw, 25vw"
  />
</div>

                <div className="flex-1">
                    <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
                     <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description} </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.brand} •  {product.category}  </p>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-semibold">
                            ₹{product.price}
                        </div>
                        {product.rating && (
 <div className="text-xs text-gray-500">⭐ {product.rating}</div>
 )}
                    </div>
                    </div>
        </div>
        </>
    )
}
