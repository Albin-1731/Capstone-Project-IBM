import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products, brands } from '../data/products';
import ProductCard from '../components/product/ProductCard';

const CATEGORIES = ['All', 'Lifestyle', 'Running', 'Skateboarding'];
const SIZES = ['37', '38', '39', '40', '41', '42', '43', '44', '45'];
const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rating' },
];

interface FilterPanelProps {
  category: string;
  setCategory: (v: string) => void;
  selectedBrands: string[];
  toggleBrand: (b: string) => void;
  selectedSizes: string[];
  toggleSize: (s: string) => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

function FilterPanel({
  category, setCategory, selectedBrands, toggleBrand,
  selectedSizes, toggleSize, priceRange, setPriceRange,
  hasActiveFilters, clearFilters,
}: FilterPanelProps) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-bold text-sm text-gray-900 mb-3">Kategori</h4>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                category === cat ? 'bg-black text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="font-bold text-sm text-gray-900 mb-3">Merek</h4>
        <div className="space-y-1.5">
          {brands.map((brand) => (
            <label key={brand.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.name)}
                onChange={() => toggleBrand(brand.name)}
                className="w-4 h-4 accent-lime-500 rounded"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1">{brand.name}</span>
              <span className="text-xs text-gray-400">{brand.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="font-bold text-sm text-gray-900 mb-3">Ukuran</h4>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all border ${
                selectedSizes.includes(size)
                  ? 'bg-black text-white border-black'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-bold text-sm text-gray-900 mb-3">Rentang Harga</h4>
        <input
          type="range"
          min={0}
          max={5000000}
          step={100000}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-lime-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Rp0</span>
          <span>Rp{(priceRange[1] / 1000000).toFixed(1)}jt</span>
        </div>
      </div>

      {hasActiveFilters && (
        <button onClick={clearFilters} className="w-full btn-secondary text-sm py-2">
          <X size={14} /> Reset Filter
        </button>
      )}
    </div>
  );
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [sort, setSort] = useState('popular');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const s = searchParams.get('search');
    const c = searchParams.get('category');
    if (s) setSearch(s);
    if (c) setCategory(c);
  }, [searchParams]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'All') {
      result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [search, category, selectedBrands, selectedSizes, priceRange, sort]);

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
    setSelectedBrands([]);
    setSelectedSizes([]);
    setPriceRange([0, 5000000]);
    setSort('popular');
    setSearchParams({});
  };

  const hasActiveFilters = !!(search || category !== 'All' || selectedBrands.length > 0 || selectedSizes.length > 0);

  const filterPanelProps: FilterPanelProps = {
    category, setCategory, selectedBrands, toggleBrand,
    selectedSizes, toggleSize, priceRange, setPriceRange,
    hasActiveFilters, clearFilters,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Shop All Shoes</h1>
        <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} produk ditemukan</p>
      </div>

      {/* Search + Sort bar */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari sepatu, merek, atau kategori..."
            className="input-field pl-10"
          />
        </div>
        <div className="relative hidden sm:block">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-field pr-10 appearance-none cursor-pointer w-44"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="lg:hidden btn-secondary text-sm py-2 px-4"
        >
          <SlidersHorizontal size={16} /> Filter
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <SlidersHorizontal size={16} /> Filter
            </h3>
            <FilterPanel {...filterPanelProps} />
          </div>
        </aside>

        {/* Mobile Filters Overlay */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setFiltersOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">Filter</h3>
                <button onClick={() => setFiltersOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <FilterPanel {...filterPanelProps} />
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">👟</p>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Tidak ada produk ditemukan</h3>
              <p className="text-gray-500 text-sm mb-4">Coba ubah filter atau kata kunci pencarian Anda</p>
              <button onClick={clearFilters} className="btn-primary">Reset Filter</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
