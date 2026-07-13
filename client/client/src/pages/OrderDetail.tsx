import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { PRODUCTS } from "@/lib/products";

interface CartItem {
  productId: string;
  quantity: number;
}

interface OrderData {
  items: CartItem[];
  subtotal: number;
  discount: number;
  finalPrice: number;
  totalPV: number;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
}

export default function OrderDetail() {
  const [, navigate] = useLocation();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 從 sessionStorage 讀取當前訂單數據
    const currentOrder = sessionStorage.getItem("currentOrder");
    if (currentOrder) {
      try {
        setOrder(JSON.parse(currentOrder));
      } catch (e) {
        console.error("Failed to parse order:", e);
      }
    }
    setIsLoading(false);
  }, []);

  const getProductById = (id: string) => {
    return PRODUCTS.find((p) => p.id === id);
  };

  const handleConfirmOrder = () => {
    if (!order) return;

    // 保存訂單到 localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push({
      ...order,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("orders", JSON.stringify(orders));

    // 清空購物車和當前訂單
    localStorage.removeItem("cart");
    sessionStorage.removeItem("currentOrder");

    // 顯示成功消息並返回首頁
    alert("訂單已成功提交！訂單編號：" + Date.now());
    navigate("/");
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">載入中...</div>;
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">沒有訂單數據</p>
        <Button onClick={() => window.history.back()}>返回</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* 導航欄 */}
      <nav className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <ImageWithFallback
            src="/pasted_file_RWyk1P_image_34c8cc43.png"
            fallbackSrc="/favicon.png"
            alt="Yumí Logo"
            className="w-6 h-6 rounded-full object-cover"
          />
          <h1 className="text-lg font-semibold">訂單明細</h1>
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
            {order.items.map((item) => {
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
                    <div className="col-span-2 text-right">
                      <span className="text-sm font-semibold">{item.quantity}</span>
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
                        <span className="text-xs font-semibold">{item.quantity}</span>
                        <span className="text-xs text-muted-foreground ml-1">× NT$ {(product.memberPrice || product.price).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 客戶信息 */}
          <div className="bg-secondary/10 rounded-lg p-6 mb-8 space-y-3">
            <div className="border-b border-border pb-3">
              <p className="text-sm text-muted-foreground">收件人</p>
              <p className="font-semibold">{order.customer.name}</p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="text-sm text-muted-foreground">電話</p>
              <p className="font-semibold">{order.customer.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">收件地址</p>
              <p className="font-semibold">{order.customer.address}</p>
            </div>
          </div>

          {/* 總結資訊 */}
          <div className="bg-secondary/10 rounded-lg p-6 space-y-3 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">小計</span>
              <span className="font-semibold">NT$ {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">折扣</span>
              <span className="font-semibold text-accent">-NT$ {order.discount.toLocaleString()}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-center">
              <span className="font-semibold">總金額</span>
              <span className="text-2xl font-bold text-primary">NT$ {order.finalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-border">
              <span className="text-muted-foreground">總 PV 點數</span>
              <span className="font-semibold text-foreground">{order.totalPV.toLocaleString()}</span>
            </div>
          </div>


        </div>
      </section>
    </div>
  );
}
