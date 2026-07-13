import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Order {
  items: OrderItem[];
  subtotal: number;
  discount: number;
  finalPrice: number;
  totalPV: number;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  timestamp: string;
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 從 localStorage 讀取訂單數據
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Failed to parse orders:", e);
      }
    }
    setIsLoading(false);
  }, []);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("zh-TW");
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">載入中...</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* 導航欄 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">訂單查詢</h1>
        </div>
      </nav>

      {/* 主要內容 */}
      <section className="py-8">
        <div className="container max-w-4xl mx-auto px-4">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">沒有訂單記錄</p>
              <Button onClick={() => window.history.back()}>返回</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-muted-foreground">共 {orders.length} 筆訂單</p>

              {orders.map((order, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-border overflow-hidden"
                >
                  {/* 訂單頭部 */}
                  <div className="bg-secondary/10 px-4 md:px-6 py-4 border-b border-border">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                      <div>
                        <p className="font-semibold">訂單編號：{order.timestamp.split("T")[0]}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(order.timestamp)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">NT$ {order.finalPrice.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* 客戶信息 */}
                  <div className="px-4 md:px-6 py-4 border-b border-border bg-secondary/5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">姓名</p>
                        <p className="font-semibold">{order.customer.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">電話</p>
                        <p className="font-semibold">{order.customer.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">地址</p>
                        <p className="font-semibold text-sm">{order.customer.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* 訂單明細 */}
                  <div className="px-4 md:px-6 py-4 border-b border-border">
                    <p className="font-semibold mb-3">訂單明細</p>
                    <div className="space-y-2">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">
                            {item.productName} × {item.quantity}
                          </span>
                          <span className="font-semibold">NT$ {item.subtotal.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 訂單總結 */}
                  <div className="px-4 md:px-6 py-4 space-y-2 bg-secondary/5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">小計</span>
                      <span className="font-semibold">NT$ {order.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">折扣</span>
                      <span className="font-semibold text-accent">-NT$ {order.discount.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between">
                      <span className="font-semibold">總金額</span>
                      <span className="font-bold text-primary">NT$ {order.finalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-border">
                      <span className="text-muted-foreground">總 PV 點數</span>
                      <span className="font-semibold">{order.totalPV.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
