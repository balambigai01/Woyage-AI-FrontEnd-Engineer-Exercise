'use client'
import Filters from "@/components/Filter";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { GetProducts } from "@/data-access/apis";
import { Product } from "@/types/dummyapi";
import { useEffect, useMemo, useState } from "react";


export default  function Home() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors,setErrors] = useState<string | null>(null)
  
   const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState<number | undefined>()
  const [maxPrice, setMaxPrice] = useState<number | undefined>()
  const [rating, setRating] = useState<number | null>(null)


  useEffect(() => {
    let mounted = true;
    const loadProducts = async () => {
      setLoading(true)
      try {
      
        const data = await GetProducts()
        if (mounted) setProducts(data)
      } catch (error) {
        if (mounted) setErrors(String(error))
      } finally {
        if (mounted) setLoading(false)
      }
    }
      loadProducts()
      return ()=>{mounted=false}
  },[])


   const categories = useMemo(() => {
    if (!products) return []
    const setCat = new Set<string>()
    products.forEach(p => p.category && setCat.add(p.category))
    return Array.from(setCat)
  }, [products])


   const filtered = useMemo(() => {
    if (!products) return []

    return products.filter(p => {
      if (category && p.category !== category) return false
      if (minPrice !== undefined && p.price < minPrice) return false
      if (maxPrice !== undefined && p.price > maxPrice) return false
      if (rating !== null && p.rating < rating) return false;

      if (search) {
        const q = search.toLowerCase()
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q)
        ) return false
      }
      return true
    })
  }, [products, category, minPrice, maxPrice, search,rating])
  return (
   <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">

      {/* SIDEBAR FILTERS */}
    
      <aside className="p-4 bg-white rounded-lg shadow-sm">
  <div className="flex justify-between items-center mb-4">
    <p className="text-md font-medium">Filter</p>
    {(search || category || minPrice || maxPrice) && (
      <button
        className="text-gray-400 hover:text-gray-600"
        onClick={() => {
          setSearch('')
          setCategory('')
          setMinPrice(undefined)
          setMaxPrice(undefined)
        }}
      >
        Clear All
      </button>
    )}
  </div>
        <Filters
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={(min, max) => {
            setMinPrice(min)
            setMaxPrice(max)
          }}
          rating={rating}
          onRatingChange={setRating}
        />
      </aside>

      {/* MAIN CONTENT */}
      <section>

        {/* Search + Reset */}
        <div className="mb-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>

        
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-10 text-lg font-medium">
            Loading products...
          </div>
        )}

        {/* Error state */}
        {errors && (
          <div className="text-red-600 py-4">
            Failed to load products: {errors}
          </div>
        )}

        {/* No products */}
        {!loading && filtered.length === 0 && (
          <div className="py-4 text-gray-500">
            No products found for selected filters.
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

      </section>
    </div>
  )
}