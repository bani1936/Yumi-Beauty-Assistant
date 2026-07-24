import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { useLocation } from 'wouter';
import { ChevronLeft, ShoppingCart, Grid3x3, List } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import * as React from 'react';
import { PRODUCTS, PRODUCT_CATEGORIES, SERIES_INTROS } from '@/lib/products';
import { USAGE_SEQUENCES } from '@/lib/usage-sequences';
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
    <div className="min-h-screen" style={{ background: "#FAFAF8" }}>
      {/* 麵包屑導航 */}
      <div className="bg-white border-b" style={{ borderColor: "#E8E4E0" }}>
        <div className="container max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm" style={{ color: "#9c8a76" }}>
            <button
              onClick={() => navigate('/')}
              className="hover:opacity-70 transition-opacity"
            >
              全部商品
            </button>
            <span>›</span>
            <span style={{ color: "#5a4632" }} className="font-medium">系列產品介紹</span>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 左側分類菜單（電腦版） */}
          <div className="hidden md:block">
            <div className="text-xs tracking-wider mb-4" style={{ color: "#9c8a76" }}>系列分類</div>
            <div className="flex flex-col gap-0.5">
              {DISPLAY_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="text-left pl-3 pr-2 py-2.5 text-sm transition-all"
                    style={
                      isActive
                        ? {
                            borderLeft: "2px solid #C9A876",
                            background: "#FBF6EE",
                            color: "#8B6F47",
                            fontWeight: 700,
                          }
                        : {
                            borderLeft: "2px solid transparent",
                            color: "#6B6B6B",
                          }
                    }
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 右側內容區 */}
          <div className="md:col-span-3">
            {/* 手機版分類下拉選單 */}
            <div className="md:hidden mb-6">
              <div className="mb-2 text-xs tracking-wider" style={{ color: "#9c8a76" }}>選擇系列</div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger
                  className="w-full h-12 text-sm font-medium transition-all"
                  style={{ border: "1px solid #E0D5C5", background: "#FBF6EE", color: "#5a4632" }}
                >
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
            </div>

            {/* 頁面標題 */}
            <div className="mb-6">
              <div className="text-[11px] tracking-[2px] font-semibold mb-1.5" style={{ color: "#B59A8A" }}>
                FULL COLLECTION
              </div>
              <h1
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "#5a4632", fontFamily: "'Playfair Display', serif" }}
              >
                {selectedCategory}
              </h1>
            </div>

            {/* 系列介紹：主打功效與特色 */}
            {SERIES_INTROS[selectedCategory] && (
              <div
                className="rounded-2xl p-6 md:p-8 mb-8"
                style={{ background: "#FBF6EE", border: "1px solid #E8DCC8" }}
              >
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#6B6B6B" }}>
                  {SERIES_INTROS[selectedCategory].description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mb-4">
                  {SERIES_INTROS[selectedCategory].features.map((f, idx) => (
                    <div key={idx} className="flex gap-2 text-sm leading-relaxed">
                      <span className="flex-shrink-0" style={{ color: "#C9A876" }}>✦</span>
                      <span style={{ color: "#4a4038" }}>
                        <span className="font-semibold" style={{ color: "#8B6F47" }}>
                          {f.title}：
                        </span>
                        {f.description}
                      </span>
                    </div>
                  ))}
                </div>
                {SERIES_INTROS[selectedCategory].closing && (
                  <p className="text-sm font-medium pt-3" style={{ color: "#8B6F47", borderTop: "1px solid #E8DCC8" }}>
                    {SERIES_INTROS[selectedCategory].closing}
                  </p>
                )}
              </div>
            )}

            {/* 明星商品強打橫幅：膠原凝露 */}
            {selectedCategory === '明星商品' && (
              <div
                className="rounded-2xl overflow-hidden mb-8 grid grid-cols-1 md:grid-cols-2"
                style={{ border: '1px solid #E8DCC8' }}
              >
                <div className="aspect-[4/3] md:aspect-auto">
                  <ImageWithFallback
                    src="/collagen-gel-hero.jpg"
                    fallbackSrc="/favicon.png"
                    alt="膠原凝露 - 舒緩・修復・保濕王者"
                    className="w-full h-full object-cover object-left"
                  />
                </div>
                <div
                  className="p-7 md:p-10 flex flex-col justify-center"
                  style={{ background: 'linear-gradient(160deg, #FBF6EE, #F3E8D8)' }}
                >
                  <div className="text-[11px] tracking-[2px] font-semibold mb-2" style={{ color: '#9c7a3f' }}>
                    MONTHLY MUST-HAVE
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold mb-2"
                    style={{ color: '#5a4632', fontFamily: "'Playfair Display', serif" }}
                  >
                    膠原凝露
                  </h2>
                  <p className="text-sm font-medium mb-4" style={{ color: '#8B6F47' }}>
                    舒緩・修復・保濕王者
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['舒緩敏感', '修復受損', '深層保濕', '全臉全身皆可用'].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-full font-medium"
                        style={{ background: 'rgba(255,255,255,0.6)', color: '#8B6F47' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/product-detail?id=special-38&from=' + encodeURIComponent('明星商品'))}
                    className="inline-flex items-center gap-2 self-start text-sm font-semibold px-5 py-2.5 rounded-full transition-transform hover:scale-105"
                    style={{ background: '#8B6F47', color: '#fff' }}
                  >
                    查看詳情
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* 完整使用流程 + 整套提示橫幅 */}
            {USAGE_SEQUENCES[selectedCategory] && (
              <div
                className="rounded-2xl p-5 md:p-7 mb-8"
                style={{ background: "#FBF6EE", border: "1px solid #E8DCC8" }}
              >
                <div className="flex items-start gap-3 mb-6">
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base"
                    style={{ background: "#8B6F47", color: "#fff" }}
                  >
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold mb-1" style={{ color: "#5a4632" }}>
                      整套使用效果最佳
                    </div>
                    <div className="text-sm leading-relaxed" style={{ color: "#8a7a68" }}>
                      完整保養建議：{USAGE_SEQUENCES[selectedCategory].fullSetLabel}
                      　｜　使用完畢後，單一產品可個別購買
                    </div>
                  </div>
                </div>

                <div className="text-xs font-semibold mb-3" style={{ color: "#8B6F47" }}>
                  使用順序 &amp; 用法
                </div>
                <div className="flex flex-wrap gap-x-1 gap-y-4">
                  {USAGE_SEQUENCES[selectedCategory].steps.map((step, idx) => {
                    const product = PRODUCTS.find(
                      (p) => p.productNumber === step.productNumber && p.category === CATEGORY_MAP[selectedCategory]
                    );
                    const isLast = idx === USAGE_SEQUENCES[selectedCategory].steps.length - 1;
                    return (
                      <React.Fragment key={idx}>
                        <div className="flex flex-col items-center text-center w-[84px]">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2"
                            style={{ background: "#5a4632", color: "#fff" }}
                          >
                            {step.step}
                          </div>
                          <div className="text-xs font-semibold" style={{ color: "#5a4632" }}>
                            {step.productNumber}
                          </div>
                          {product && (
                            <div className="text-[10px] leading-tight mt-0.5 line-clamp-2" style={{ color: "#9c8a76" }}>
                              {product.productTitle}
                            </div>
                          )}
                          {step.note && (
                            <div className="text-[10px] leading-tight mt-1" style={{ color: "#B59A8A" }}>
                              {step.note}
                            </div>
                          )}
                        </div>
                        {!isLast && (
                          <div className="flex items-center text-sm" style={{ color: "#D8CFC2" }}>
                            →
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 排序和視圖選項 */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger
                    className="w-40 h-9 text-xs rounded-full"
                    style={{ border: "1px solid #E8E4E0", color: "#6B6B6B" }}
                  >
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
              <div className="hidden md:flex items-center gap-1.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className="p-2 rounded-full transition-colors"
                  style={
                    viewMode === 'grid'
                      ? { background: "#FBF6EE", color: "#8B6F47" }
                      : { background: "transparent", color: "#B0A797" }
                  }
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className="p-2 rounded-full transition-colors"
                  style={
                    viewMode === 'list'
                      ? { background: "#FBF6EE", color: "#8B6F47" }
                      : { background: "transparent", color: "#B0A797" }
                  }
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
                  className="overflow-hidden cursor-pointer relative transition-all hover:-translate-y-0.5"
                  style={{ border: "1px solid #E8E4E0", boxShadow: "none" }}
                  onClick={() => navigate(`/product-detail?id=${product.id}&from=${encodeURIComponent(selectedCategory)}`)}
                >
                  {/* 產品圖片 */}
                  <div className="aspect-square overflow-hidden relative" style={{ background: "#F5F1ED" }}>
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
                      {product.productNumber && (
                        <div className="text-sm md:text-base font-bold mb-0.5" style={{ color: "#8B6F47" }}>
                          {product.productNumber}
                        </div>
                      )}
                      <div className="text-sm md:text-base font-semibold line-clamp-2" style={{ color: "#3a332b" }}>
                        {product.productTitle}
                      </div>
                    </div>

                    <div className="flex items-center justify-center mb-3">
                      <span
                        className="text-lg md:text-xl font-bold"
                        style={{ color: "#8B6F47", fontFamily: "'Playfair Display', serif" }}
                      >
                        NT$ {product.memberPrice || product.price}
                      </span>
                    </div>
                    {/* 福利標籤 */}
                    {product.benefits && product.benefits.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {product.benefits.filter(b => b).map((benefit) => (
                          <span
                            key={benefit}
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{ background: "#F5F1ED", color: "#8B6F47" }}
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
