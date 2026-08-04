import { Button } from "@/components/ui/button";
import { ChevronLeft, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { PRODUCTS } from "@/lib/products";

// 動態載入外部腳本（避免重複載入）
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`無法載入 ${src}`));
    document.body.appendChild(script);
  });
}

// 產生「日期+時間+姓名」檔名，例如 2608041359_蔡依廷
function buildOrderFileName(name: string) {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const yy = pad(now.getFullYear() % 100);
  const mm = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const min = pad(now.getMinutes());
  const safeName = (name || "顧客").trim().replace(/[\\/:*?"<>|]/g, "");
  return `${yy}${mm}${dd}${hh}${min}_${safeName}`;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface OrderData {
  items: CartItem[];
  originalSubtotal: number;
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
  const [isSavingPdf, setIsSavingPdf] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

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

  const handleSavePdf = async () => {
    if (!order || !printRef.current || isSavingPdf) return;
    setIsSavingPdf(true);
    try {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");

      const html2canvas = (window as any).html2canvas;
      const { jsPDF } = (window as any).jspdf;

      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${buildOrderFileName(order.customer.name)}.pdf`);
    } catch (err) {
      console.error("儲存訂單 PDF 失敗:", err);
      alert("儲存 PDF 時發生問題，請稍後再試一次。");
    } finally {
      setIsSavingPdf(false);
    }
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
      <nav
        className="sticky top-24 z-40 bg-white border-b border-border isolate"
        style={{ transform: 'translateZ(0)', WebkitTransform: 'translate3d(0,0,0)' }}
      >
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
                    <div className="col-span-2 text-right">
                      <span className="text-sm font-semibold">{item.quantity}</span>
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
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-medium text-foreground text-xs flex-1 truncate">{product.name}</p>
                        <div className="text-right whitespace-nowrap flex-shrink-0">
                          {hasDiscount && (
                            <p className="text-[10px] text-muted-foreground line-through leading-tight">NT$ {itemOriginalSubtotal.toLocaleString()}</p>
                          )}
                          <p className="text-xs font-semibold" style={{ color: '#8b6f47' }}>NT$ {itemSubtotal.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{product.volume}</span>
                        <span>數量 {item.quantity} × NT$ {unitPrice.toLocaleString()}</span>
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
              <span className="text-muted-foreground">原價</span>
              <span className="font-semibold text-muted-foreground">NT$ {order.originalSubtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">會員價</span>
              <span className="font-semibold">NT$ {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">折扣金額(PV)</span>
              <span className="font-semibold text-accent">-NT$ {order.discount.toLocaleString()}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-center">
              <span className="font-semibold">總付款金額</span>
              <span className="text-2xl font-bold text-primary">NT$ {order.finalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-border">
              <span className="text-muted-foreground">獲得 PV</span>
              <span className="font-semibold text-foreground">{order.totalPV.toLocaleString()}</span>
            </div>
          </div>

          {/* 儲存訂單 PDF */}
          <Button
            onClick={handleSavePdf}
            disabled={isSavingPdf}
            className="w-full py-6 text-base"
            style={{ background: '#5a4632', color: '#fff' }}
          >
            <Download className="w-4 h-4 mr-2" />
            {isSavingPdf ? "產生 PDF 中…" : "儲存訂單（PDF）"}
          </Button>

        </div>
      </section>

      {/* 隱藏的列印版訂單明細，僅供產生 PDF 截圖使用 */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <div
          ref={printRef}
          style={{
            width: '780px',
            background: '#ffffff',
            padding: '48px 44px',
            fontFamily: "'Noto Sans TC', sans-serif",
            color: '#3a2f24',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', letterSpacing: '3px', color: '#B0A797' }}>YUMÍ 米米美學｜高端皮膚管理</div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#3a2f24', marginTop: '6px' }}>訂單明細</div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '13px',
              color: '#5a4632',
              borderTop: '0.5px solid #E8E4E0',
              borderBottom: '0.5px solid #E8E4E0',
              padding: '12px 0',
              marginBottom: '20px',
            }}
          >
            <div>訂購日期：{new Date().toLocaleString('zh-TW', { hour12: false })}</div>
            <div>訂購人：{order.customer.name}</div>
            <div>電話：{order.customer.phone}</div>
          </div>

          <div style={{ fontSize: '13px', color: '#8a7960', marginBottom: '16px' }}>
            收件地址：{order.customer.address}
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #5a4632' }}>
                <th style={{ textAlign: 'left', padding: '8px 4px', color: '#5a4632' }}>品名</th>
                <th style={{ textAlign: 'center', padding: '8px 4px', color: '#5a4632' }}>規格</th>
                <th style={{ textAlign: 'center', padding: '8px 4px', color: '#5a4632' }}>數量</th>
                <th style={{ textAlign: 'right', padding: '8px 4px', color: '#5a4632' }}>單價</th>
                <th style={{ textAlign: 'right', padding: '8px 4px', color: '#5a4632' }}>小計</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                const unitPrice = product.memberPrice || product.price;
                const itemSubtotal = unitPrice * item.quantity;
                return (
                  <tr key={item.productId} style={{ borderBottom: '0.5px solid #E8E4E0' }}>
                    <td style={{ padding: '8px 4px', color: '#3a2f24' }}>{product.name}</td>
                    <td style={{ textAlign: 'center', padding: '8px 4px', color: '#8a7960' }}>{product.volume}</td>
                    <td style={{ textAlign: 'center', padding: '8px 4px', color: '#8a7960' }}>{item.quantity}</td>
                    <td style={{ textAlign: 'right', padding: '8px 4px', color: '#8a7960' }}>{unitPrice.toLocaleString()}</td>
                    <td style={{ textAlign: 'right', padding: '8px 4px', color: '#3a2f24' }}>{itemSubtotal.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '2px solid #5a4632' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#8a7960', marginBottom: '6px' }}>
              <span>原價合計</span><span>NT$ {order.originalSubtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#8a7960', marginBottom: '6px' }}>
              <span>折扣金額(PV)</span><span>-NT$ {order.discount.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 700, color: '#b3714a' }}>
              <span>訂單總額</span><span>NT$ {order.finalPrice.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#8a7960', marginTop: '8px' }}>
              <span>獲得 PV</span><span>{order.totalPV.toLocaleString()}</span>
            </div>
          </div>

          <div style={{ marginTop: '28px', textAlign: 'center', fontSize: '11px', color: '#c9bfae' }}>
            感謝您的訂購 · Yumí 米米美學
          </div>
        </div>
      </div>
    </div>
  );
}
