import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { ChevronLeft, ChevronDown, Plus, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PRODUCTS } from '@/lib/products';

interface CartItem {
  productId: string;
  quantity: number;
}

export default function ProductCalculator() {
  const [, navigate] = useLocation();
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error('Failed to parse cart:', e);
        return [];
      }
    }
    return [];
  });
  const [expandedSeries, setExpandedSeries] = useState<Set<string>>(new Set(['熨斗系列']));

  // 每當購物車變化時，保存到 localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // 按系列分組產品
  const productsByCategory = PRODUCTS.reduce((acc, product) => {
    if (!acc[product.series]) {
      acc[product.series] = [];
    }
    acc[product.series].push(product);
    return acc;
  }, {} as Record<string, typeof PRODUCTS>);

  const toggleSeries = (series: string) => {
    const newExpanded = new Set(expandedSeries);
    if (newExpanded.has(series)) {
      newExpanded.delete(series);
    } else {
      newExpanded.add(series);
    }
    setExpandedSeries(newExpanded);
  };

  const addToCart = (productId: string) => {
    const existing = cart.find(item => item.productId === productId);
    if (existing) {
      setCart(cart.map(item => 
        item.productId === productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { productId, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      const existing = cart.find(item => item.productId === productId);
      if (existing) {
        setCart(cart.map(item => 
          item.productId === productId 
            ? { ...item, quantity }
            : item
        ));
      } else {
        // 如果購物車中不存在此產品，新增它
        setCart([...cart, { productId, quantity }]);
      }
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const getProductById = (id: string) => PRODUCTS.find(p => p.id === id);

  const subtotal = cart.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product?.memberPrice || product?.price || 0) * item.quantity;
  }, 0);

  // 計算點數（根據每個產品的 PV 乘上數量）
  const points = cart.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product?.pv || 0) * item.quantity;
  }, 0);

  // 計算折扣金額
  const calculateDiscount = (totalPoints: number): number => {
    if (totalPoints < 30000) {
      return 0;
    } else if (totalPoints <= 120000) {
      return Math.round((totalPoints - 30000) * 0.2);
    } else if (totalPoints <= 320000) {
      return Math.round(18000 + (totalPoints - 120000) * 0.3);
    } else {
      return Math.round(18000 + 60000 + (totalPoints - 320000) * 0.35);
    }
  };


  const discount = calculateDiscount(points);
  const finalPrice = subtotal - discount;

  // 計算進度條資訊
  const getProgressInfo = (totalPoints: number) => {
    const thresholds = [30000, 120000, 320000];
    let currentThreshold = 0;
    let nextThreshold = 30000;
    let currentLevel = 0;

    if (totalPoints < 30000) {
      currentThreshold = 0;
      nextThreshold = 30000;
      currentLevel = 0;
    } else if (totalPoints < 120000) {
      currentThreshold = 30000;
      nextThreshold = 120000;
      currentLevel = 1;
    } else if (totalPoints < 320000) {
      currentThreshold = 120000;
      nextThreshold = 320000;
      currentLevel = 2;
    } else {
      currentThreshold = 320000;
      nextThreshold = 320000;
      currentLevel = 3;
    }

    const progress = totalPoints < nextThreshold 
      ? Math.round(((totalPoints - currentThreshold) / (nextThreshold - currentThreshold)) * 100)
      : 100;
    
    const remaining = Math.max(0, nextThreshold - totalPoints);

    return { currentLevel, nextThreshold, progress, remaining };
  };

  const progressInfo = getProgressInfo(points);

  return (
    <div className="min-h-screen bg-background pb-40 md:pb-32">
      {/* 導航欄 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-foreground" style={{fontFamily: '"Noto Sans TC", sans-serif', fontSize: '16px', fontWeight: '400'}}>返回主頁</h1>
        </div>
      </nav>

      {/* 主要內容 */}
      <section className="py-8 md:py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              首購計算機
            </h2>
            <p className="text-muted-foreground mb-4">
              專為團購及首次購買顧客計算金額
            </p>
            {cart.length > 0 && (
              <button
                onClick={() => setCart([])}
                className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors text-sm font-medium"
              >
                🗑️ 清空全部
              </button>
            )}
          </div>

          {/* 系列分組 */}
          <div className="space-y-2 md:space-y-4">
            {Object.entries(productsByCategory).map(([series, products]) => {
              const isExpanded = expandedSeries.has(series);
              return (
                <div key={series} className="border border-border rounded-lg overflow-hidden">
                  {/* 系列標題 */}
                  <button
                    onClick={() => toggleSeries(series)}
                    className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#d4c3b2' }}
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="text-base md:text-lg font-semibold text-foreground">
                        {series}
                      </h3>
                      {(() => {
                        const seriesCount = cart.filter(item => {
                          const product = getProductById(item.productId);
                          return product?.series === series;
                        }).reduce((sum, item) => sum + item.quantity, 0);
                        
                        return seriesCount > 0 && (
                          <div className="flex items-center justify-center w-5 h-5 text-white rounded-full text-xs font-bold" style={{ backgroundColor: '#d4a5a5' }}>
                            {seriesCount}
                          </div>
                        );
                      })()}
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* 產品列表 */}
                  {isExpanded && (
                    <div className="divide-y divide-border">
                      {products.map(product => {
                        const cartItem = cart.find(item => item.productId === product.id);
                        return (
                          <div 
                            key={product.id}
                            className="px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center md:justify-between hover:bg-secondary/30 transition-colors gap-3 md:gap-0"
                          >
                            {/* 產品資訊 */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                                <h4 className="text-sm font-semibold text-foreground">
                                  {product.name}
                                </h4>
                                {product.pv && (
                                  <span className="text-xs text-muted-foreground font-normal">
                                    PV {product.pv}
                                  </span>
                                )}
                              </div>
                              {product.volume && (
                                <p className="text-xs text-muted-foreground">
                                  {product.volume}
                                </p>
                              )}
                            </div>

                            {/* 價格與控制 - 固定寬度 */}
                            <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4 w-full md:w-auto">
                              <span className="text-base md:text-lg font-bold text-primary min-w-fit">
                                NT${product.memberPrice || product.price}
                              </span>

                              <div className="w-24">
                                <div className="flex items-center justify-end gap-1 bg-background border border-border rounded-lg p-1">
                                  <button
                                    onClick={() => updateQuantity(product.id, (cartItem?.quantity ?? 0) - 1)}
                                    className="p-1 hover:bg-secondary rounded transition-colors flex-shrink-0"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="w-6 text-center font-semibold text-sm flex-shrink-0">
                                    {cartItem?.quantity ?? 0}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(product.id, (cartItem?.quantity ?? 0) + 1)}
                                    className="p-1 hover:bg-secondary rounded transition-colors flex-shrink-0"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 進度條 - 桌面版本 */}
      <div className="hidden md:block fixed bottom-32 left-0 right-0 bg-background border-b border-border px-4 py-4">
        <div className="container max-w-4xl mx-auto">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                {progressInfo.currentLevel === 3 
                  ? '已達最高等級 🎉' 
                  : `距離下一個折扣門檻：${progressInfo.remaining.toLocaleString()} 點`}
              </p>
              <p className="text-xs font-semibold text-primary">
                {progressInfo.progress}%
              </p>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-300"
                style={{ width: `${progressInfo.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 進度條 - 手機版本 */}
      <div className="md:hidden fixed bottom-32 left-0 right-0 bg-background border-b-0 px-4 py-1">
        <div className="space-y-0.5">
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              {progressInfo.currentLevel === 3 
                ? '已達最高等級 🎉' 
                : `距離下一個折扣門檻：${progressInfo.remaining.toLocaleString()} 點`}
            </p>
            <p className="text-xs font-semibold text-primary">
              {progressInfo.progress}%
            </p>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-300"
              style={{ width: `${progressInfo.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 固定底部總結 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-0 shadow-lg">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          {/* 桌面版本 */}
          <div className="hidden md:grid grid-cols-4 gap-4 items-center">
            {/* 左側資訊 */}
            <div className="col-span-1">
              <p className="text-sm text-muted-foreground mb-2">
                已選 {cart.length} 項
              </p>
              <p className="text-sm text-muted-foreground">
                獲得 {points.toLocaleString()} 點
              </p>
            </div>

            {/* 折扣資訊 */}
            <div className="text-left">
              <p className="text-sm text-muted-foreground mb-1">折扣金額</p>
              <p className="text-lg font-semibold text-accent">
                -NT$ {discount.toLocaleString()}
              </p>
            </div>

            {/* 加總金額 */}
            <div className="col-span-1 text-left">
              <p className="text-sm text-muted-foreground mb-1">加總金額</p>
              <p className="text-2xl font-bold text-primary">
                NT$ {finalPrice.toLocaleString()}
              </p>
            </div>

            {/* 查看購物車按鈕 */}
            {cart.length > 0 && (
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => {
                    localStorage.setItem('cart', JSON.stringify(cart));
                    window.location.href = '/cart-detail';
                  }}
                  className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
                >
                  查看購物車
                </button>
              </div>
            )}
          </div>

          {/* 手機版本 */}
          <div className="md:hidden space-y-0">
            {/* 上面：左邊資訊 + 右邊加總金額和查看購物車 */}
            <div className="flex justify-between items-end">
              {/* 左邊 */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  已選 {cart.length} 項
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  獲得 {points.toLocaleString()} 點
                </p>
                <p className="text-xs text-muted-foreground mb-1">折扣金額</p>
                <p className="text-sm font-semibold text-accent">
                  -NT$ {discount.toLocaleString()}
                </p>
              </div>

              {/* 右邊：加總金額 + 查看購物車按鈕 */}
              <div className="flex flex-col items-end gap-2">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">加總金額</p>
                  <p className="text-lg font-bold text-primary">
                    NT$ {finalPrice.toLocaleString()}
                  </p>
                </div>
                {cart.length > 0 && (
                  <button
                    onClick={() => {
                      localStorage.setItem('cart', JSON.stringify(cart));
                      window.location.href = '/cart-detail';
                    }}
                    className="px-3 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors text-xs whitespace-nowrap h-fit"
                  >
                    查看購物車
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
