export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    
    return (
        <div className="p-4">
        <input value={value} onChange={(e) => onChange(e.target.value)}
        placeholder="Search products by title or description"
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring" />
            </div>
    )
}