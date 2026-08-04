import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { PRODUCTS } from "@/lib/products";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface CartItem {
  productId: string;
  quantity: number;
}

export default function CartDetail() {
  const [, navigate] = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 從 localStorage 讀取購物車數據
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }
    setIsLoading(false);
  }, []);

  // 每當購物車變化時，保存到 localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getProductById = (id: string) => {
    return PRODUCTS.find((p) => p.id === id);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      // 移除產品
      setCart(cart.filter(item => item.productId !== productId));
    } else {
      // 更新數量
      setCart(cart.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  // 原價總金額（未套用會員價）
  const originalSubtotal = cart.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  // 會員價總金額和總 PV
  const subtotal = cart.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product?.memberPrice || product?.price || 0) * item.quantity;
  }, 0);

  const totalPV = cart.reduce((sum, item) => {
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

  const discount = calculateDiscount(totalPV);
  const finalPrice = subtotal - discount;

  // 確認訂單：不再彈出表單，直接帶著空白的收件人資訊跳轉到訂單明細，
  // 訂購人姓名等資訊改在訂單明細頁面填寫
  const handleConfirmOrder = () => {
    const orderData = {
      items: cart,
      originalSubtotal,
      subtotal,
      discount,
      finalPrice,
      totalPV,
      customer: { name: "", phone: "", address: "" },
    };

    sessionStorage.setItem("currentOrder", JSON.stringify(orderData));
    navigate("/order-detail");
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">載入中...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">購物車是空的</p>
        <Button onClick={() => window.history.back()}>返回</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* 導航欄 */}
      <nav
        className="sticky top-16 z-40 bg-white border-b border-border isolate"
        style={{ transform: 'translateZ(0)', WebkitTransform: 'translate3d(0,0,0)' }}
      >
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">購物車詳細</h1>
        </div>
      </nav>

      {/* 主要內容 */}
      <section className="py-8">
        <div className="container max-w-4xl mx-auto px-4">
          {/* 購物車明細表 */}
          <div className="bg-white rounded-lg border border-border overflow-hidden mb-8">
            {/* 表頭 */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 md:px-6 py-4 bg-secondary/20 border-b border-border font-semibold text-sm">
              <div className="col-span-4">產品名稱</div>
              <div className="col-span-3 text-right">單價</div>
              <div className="col-span-2 text-right">數量</div>
              <div className="col-span-3 text-right">小計</div>
            </div>

            {/* 購物車項目 */}
            {cart.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;

              const unitPrice = product.memberPrice || product.price;
              const hasDiscount = !!product.memberPrice && product.memberPrice < product.price;
              const itemSubtotal = unitPrice * item.quantity;
              const itemOriginalSubtotal = product.price * item.quantity;

              return (
                <div
                  key={item.productId}
                  className="px-4 md:px-6 py-4 border-b border-border last:border-b-0 hover:bg-secondary/5 transition-colors"
                >
                  {/* 桌面版本 */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 flex items-center gap-3 min-w-0">
                      <ImageWithFallback
                        src={product.image}
                        fallbackSrc="/favicon.png"
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        style={{ background: '#F5F1ED' }}
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{product.volume}</p>
                      </div>
                    </div>
                    <div className="col-span-3 text-right">
                      {hasDiscount && (
                        <p className="text-xs text-muted-foreground line-through">NT$ {product.price.toLocaleString()}</p>
                      )}
                      <p className="text-sm font-semibold">NT$ {unitPrice.toLocaleString()}</p>
                    </div>
                    <div className="col-span-2 flex items-center justify-end">
                      <div className="flex items-center gap-1 bg-background border border-border rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 hover:bg-secondary rounded transition-colors flex-shrink-0"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-semibold text-sm flex-shrink-0">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 hover:bg-secondary rounded transition-colors flex-shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="col-span-3 text-right">
                      {hasDiscount && (
                        <p className="text-xs text-muted-foreground line-through">NT$ {itemOriginalSubtotal.toLocaleString()}</p>
                      )}
                      <p className="text-sm font-semibold" style={{ color: '#8b6f47' }}>NT$ {itemSubtotal.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* 手機版本 */}
                  <div className="md:hidden flex gap-3">
                    <ImageWithFallback
                      src={product.image}
                      fallbackSrc="/favicon.png"
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      style={{ background: '#F5F1ED' }}
                    />
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex justify-between items-center gap-2">
                        <p className="font-medium text-foreground text-xs flex-1 truncate">{product.name}</p>
                        <div className="text-right whitespace-nowrap flex-shrink-0">
                          {hasDiscount && (
                            <p className="text-[10px] text-muted-foreground line-through leading-tight">NT$ {itemOriginalSubtotal.toLocaleString()}</p>
                          )}
                          <p className="text-xs font-semibold" style={{ color: '#8b6f47' }}>NT$ {itemSubtotal.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground leading-snug">
                          <div>{product.volume}</div>
                          <div>NT$ {unitPrice.toLocaleString()}</div>
                        </div>
                        <div className="flex items-center gap-1 bg-background border border-border rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-1 hover:bg-secondary rounded transition-colors flex-shrink-0"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center text-xs font-semibold flex-shrink-0">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-1 hover:bg-secondary rounded transition-colors flex-shrink-0"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 總結資訊 */}
          <div className="bg-secondary/10 rounded-lg p-6 space-y-3 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">原價</span>
              <span className="font-semibold text-muted-foreground">NT$ {originalSubtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">會員價</span>
              <span className="font-semibold">NT$ {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">折扣金額(PV)</span>
              <span className="font-semibold text-accent">-NT$ {discount.toLocaleString()}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-center">
              <span className="font-semibold">總付款金額</span>
              <span className="text-2xl font-bold text-primary">NT$ {finalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-border">
              <span className="text-muted-foreground">獲得 PV</span>
              <span className="font-semibold text-foreground">{totalPV.toLocaleString()}</span>
            </div>
          </div>

          {/* 確認訂單按鈕：直接跳轉到訂單明細，不再彈出表單 */}
          <div className="flex justify-center">
            <Button
              onClick={handleConfirmOrder}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold"
            >
              確認訂單
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
