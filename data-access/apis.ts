import { Product } from "@/types/dummyapi";

export const GetProducts = async():Promise<Product[]> => {
    const data = await fetch('https://dummyjson.com/products')
    if(!data.ok) throw new Error('Failed to fetch products');
    const res = await data.json()
    console.log("res",res.products)
    return res.products as Product[];
}