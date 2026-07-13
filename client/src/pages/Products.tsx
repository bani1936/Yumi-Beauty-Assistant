import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { useLocation } from 'wouter';
import { ChevronLeft, ShoppingCart, Grid3x3, List } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import * as React from 'react';
import { PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/products';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// 分類映射
const CATEGORY_MAP: Record<string, string> = {
  '明星商品': 'all',
  '熨斗系列(小)': 'micro-lifting-small',
  '熨斗系列(大)': 'micro-lifting-large',
  '都都好系列': 'skin-care',
  '淨膚系列': 'cleansing',
  '晶亮系列': 'brightening',
  'Q彈精緻系列': 'elasticity',
  '特殊系列': 'special',
  '美胸系列': 'bust',
  '精油系列': 'essential-oil',
  '清潔系列': 'cleaning',
};

const DISPLAY_CATEGORIES = [
  '明星商品',
  '熨斗系列(小)',
  '熨斗系列(大)',
  '都都好系列',
  '淨膚系列',
  '晶亮系列',
  'Q彈精緻系列',
  '特殊系列',
  '美胸系列',
  '精油系列',
  '清潔系列',
];

export default function Products() {
  const [, navigate] = useLocation();
  
  // 從 URL 參數獲取初始分類
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromUrl = urlParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || '明星商品');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProducts = useMemo(() => {
    let filtered = [...PRODUCTS];

    if (selectedCategory === '明星商品') {
      filtered = filtered.filter(p => p.featured === true);
    } else {
      const categoryId = CATEGORY_MAP[selectedCategory];
      filtered = filtered.filter(p => p.category === categoryId);
    }

    // 排序邏輯
    if (selectedCategory === '明星商品') {
      // 明星商品按 featuredOrder 排序
      filtered.sort((a, b) => (a.featuredOrder || 999) - (b.featuredOrder || 999));
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      // 按產品編號排序
      filtered.sort((a, b) => {
        const aNum = parseInt(a.productNumber?.split('-')[0] || '999');
        const bNum = parseInt(b.productNumber?.split('-')[0] || '999');
        if (aNum !== bNum) return aNum - bNum;
        const aSub = parseInt(a.productNumber?.split('-')[1] || '0');
        const bSub = parseInt(b.productNumber?.split('-')[1] || '0');
        return aSub - bSub;
      });
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  // 當 URL 參數改變時更新分類
  React.useEffect(() => {
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  return (
    <div className="min-h-screen bg-background">
      {/* 麵包屑導航 */}
      <div className="bg-white border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <button
              onClick={() => navigate('/')}
              className="hover:text-foreground transition-colors"
            >
              全部商品
            </button>
            <span>›</span>
            <span className="text-foreground font-medium">系列產品介紹</span>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 左側分類菜單（電腦版） */}
          <div className="hidden md:block">
            <h3 className="font-semibold text-foreground mb-4"></h3>
            <div className="space-y-2">
              {DISPLAY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-white'
                      : 'hover:bg-muted'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 右側內容區 */}
          <div className="md:col-span-3">
            {/* 手機版分類下拉選單 */}
            <div className="md:hidden mb-6">
              <div className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">選擇系列</div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full border-2 border-primary bg-gradient-to-r from-primary/5 to-primary/10 hover:border-primary/80 transition-all shadow-md h-14 text-base font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DISPLAY_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2 text-xs text-muted-foreground text-center"></div>
            </div>

            {/* 頁面標題 */}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {selectedCategory}
            </h1>

            {/* 排序和視圖選項 */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">最新上架</SelectItem>
                    <SelectItem value="price-low">價格低到高</SelectItem>
                    <SelectItem value="price-high">價格高到低</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 視圖切換（電腦版） */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 產品網格 */}
            <div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-2 md:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative"
                  onClick={() => navigate(`/product-detail?id=${product.id}&from=${encodeURIComponent(selectedCategory)}`)}
                >
                  {/* 產品圖片 */}
                  <div className="aspect-square bg-muted overflow-hidden relative">
                    <ImageWithFallback
                      src={product.image}
                      fallbackSrc="/favicon.png"
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  {/* 產品信息 */}
                  <div className="p-4 text-center">
                    {/* 產品編號和名稱分兩行顯示 */}
                    <div className="mb-2">
                      <div className="text-sm md:text-base font-bold text-foreground">
                        {product.productNumber}
                      </div>
                      <div className="text-sm md:text-base font-semibold text-foreground line-clamp-2">
                        {product.productTitle}
                      </div>
                    </div>

                    <div className="flex items-center justify-center mb-3">
                      <span className="text-lg font-bold text-primary">
                        NT$ {product.memberPrice || product.price}
                      </span>
                    </div>
                    {/* 福利標籤 */}
                    {product.benefits && product.benefits.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {product.benefits.filter(b => b).map((benefit) => (
                          <span
                            key={benefit}
                            className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* 分頁信息 */}
            {filteredProducts.length > 0 && (
              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>
                  共 {filteredProducts.length} 筆相關商品
                  <br />
                  第 1 頁 / 共 1 頁
                </p>
              </div>
            )}

            {/* 無產品提示 */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">此分類暫無商品</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
