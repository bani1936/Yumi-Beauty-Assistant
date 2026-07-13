import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { PRODUCTS } from "@/lib/products";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CheckoutForm {
  name: string;
  phone: string;
  address: string;
}

export default function CartDetail() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    name: "",
    phone: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<CheckoutForm>>({});

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

  // 計算總金額和總 PV
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

  const validateForm = (): boolean => {
    const errors: Partial<CheckoutForm> = {};

    // 電話格式驗證（如果填寫了的話）
    if (formData.phone.trim() && !/^[\d\-\+\(\)\s]+$/.test(formData.phone)) {
      errors.phone = "電話格式不正確";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = () => {
    if (!validateForm()) {
      return;
    }

    // 準備訂單數據
    const orderData = {
      items: cart,
      subtotal,
      discount,
      finalPrice,
      totalPV,
      customer: formData,
    };

    // 保存訂單數據到 sessionStorage 用於訂單明細頁面
    sessionStorage.setItem("currentOrder", JSON.stringify(orderData));

    // 關閉對話框並跳轉到訂單明細頁面
    setShowCheckout(false);
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
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
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

              const itemSubtotal = (product.memberPrice || product.price) * item.quantity;

              return (
                <div
                  key={item.productId}
                  className="px-4 md:px-6 py-4 border-b border-border last:border-b-0 hover:bg-secondary/5 transition-colors"
                >
                  {/* 桌面版本 */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4">
                      <p className="font-medium text-foreground text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{product.volume}</p>
                    </div>
                    <div className="col-span-3 text-right">
                      <p className="text-sm font-semibold">NT$ {(product.memberPrice || product.price).toLocaleString()}</p>
                    </div>
                    <div className="col-span-2 text-right flex items-center justify-end gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-secondary rounded transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-secondary rounded transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                    <div className="col-span-3 text-right">
                      <p className="text-sm font-semibold" style={{ color: '#8b6f47' }}>NT$ {itemSubtotal.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* 手機版本 */}
                  <div className="md:hidden space-y-1">
                    <div className="flex justify-between items-center gap-2">
                      <p className="font-medium text-foreground text-xs flex-1 truncate">{product.name}</p>
                      <p className="text-xs font-semibold whitespace-nowrap" style={{ color: '#8b6f47' }}>NT$ {itemSubtotal.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{product.volume}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-1.5 py-0.5 hover:bg-secondary rounded transition-colors text-xs"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-1.5 py-0.5 hover:bg-secondary rounded transition-colors text-xs"
                        >
                          +
                        </button>
                        <span className="text-xs text-muted-foreground ml-1">× NT$ {(product.memberPrice || product.price).toLocaleString()}</span>
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
              <span className="text-muted-foreground">小計</span>
              <span className="font-semibold">NT$ {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">折扣</span>
              <span className="font-semibold text-accent">-NT$ {discount.toLocaleString()}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-center">
              <span className="font-semibold">總金額</span>
              <span className="text-2xl font-bold text-primary">NT$ {finalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-border">
              <span className="text-muted-foreground">總 PV 點數</span>
              <span className="font-semibold text-foreground">{totalPV.toLocaleString()}</span>
            </div>
          </div>

          {/* 確認訂單按鈕 */}
          <div className="flex justify-center">
            <Button
              onClick={() => setShowCheckout(true)}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold"
            >
              確認訂單
            </Button>
          </div>
        </div>
      </section>

      {/* 結帳表單對話框 */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>確認訂單</DialogTitle>
            <DialogDescription>
              請填寫您的基本信息以完成訂單
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* 訂單摘要 */}
            <div className="bg-secondary/10 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">小計</span>
                <span className="font-semibold">NT$ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">折扣</span>
                <span className="font-semibold text-accent">-NT$ {discount.toLocaleString()}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-semibold">總金額</span>
                <span className="text-lg font-bold text-primary">NT$ {finalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* 表單 */}
            <div className="space-y-4">
              {/* 姓名 */}
              <div className="space-y-2">
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  placeholder="請輸入您的姓名"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (formErrors.name) {
                      setFormErrors({ ...formErrors, name: undefined });
                    }
                  }}
                  className={formErrors.name ? "border-red-500" : ""}
                />
                {formErrors.name && (
                  <p className="text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>

              {/* 電話 */}
              <div className="space-y-2">
                <Label htmlFor="phone">電話</Label>
                <Input
                  id="phone"
                  placeholder="請輸入您的電話號碼"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (formErrors.phone) {
                      setFormErrors({ ...formErrors, phone: undefined });
                    }
                  }}
                  className={formErrors.phone ? "border-red-500" : ""}
                />
                {formErrors.phone && (
                  <p className="text-sm text-red-500">{formErrors.phone}</p>
                )}
              </div>

              {/* 地址 */}
              <div className="space-y-2">
                <Label htmlFor="address">收件地址</Label>
                <Textarea
                  id="address"
                  placeholder="請輸入您的收件地址"
                  value={formData.address}
                  onChange={(e) => {
                    setFormData({ ...formData, address: e.target.value });
                    if (formErrors.address) {
                      setFormErrors({ ...formErrors, address: undefined });
                    }
                  }}
                  className={`resize-none ${formErrors.address ? "border-red-500" : ""}`}
                  rows={3}
                />
                {formErrors.address && (
                  <p className="text-sm text-red-500">{formErrors.address}</p>
                )}
              </div>
            </div>

            {/* 按鈕 */}
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowCheckout(false)}
              >
                取消
              </Button>
              <Button
                onClick={handleSubmitOrder}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                提交訂單
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
