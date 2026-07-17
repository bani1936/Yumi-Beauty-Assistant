import { useLocation } from 'wouter';
import { ChevronLeft } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { USAGE_SEQUENCES } from '@/lib/usage-sequences';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import * as React from 'react';

export default function ProductDetail() {
  const [, navigate] = useLocation();
  const productId = new URLSearchParams(window.location.search).get('id');
  const product = PRODUCTS.find(p => p.id === productId);

  const handleGoBack = () => {
    // 從 URL 參數獲取來源分類
    const fromCategory = new URLSearchParams(window.location.search).get('from');
    
    if (fromCategory) {
      // 如果有來源分類，返回到該分類
      navigate(`/products?category=${encodeURIComponent(fromCategory)}`);
    } else {
      // 否則根據產品類別返回到相應的篩選頁面
      if (product?.category === 'essential-oil') {
        navigate('/products?category=精油系列');
      } else if (product?.category === 'micro-lifting-small') {
        navigate('/products?category=熨斗系列(小)');
      } else if (product?.category === 'micro-lifting-large') {
        navigate('/products?category=熨斗系列(大)');
      } else if (product?.category === 'skin-care') {
        navigate('/products?category=都都好系列');
      } else if (product?.category === 'cleansing') {
        navigate('/products?category=淨膚系列');
      } else if (product?.category === 'brightening') {
        navigate('/products?category=晶亮系列');
      } else if (product?.category === 'elasticity') {
        navigate('/products?category=Q彈精緻系列');
      } else if (product?.category === 'special') {
        navigate('/products?category=特殊系列');
      } else if (product?.category === 'bust') {
        navigate('/products?category=美胸系列');
      } else if (product?.category === 'cleaning') {
        navigate('/products?category=清潔系列');
      } else {
        navigate('/products');
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">產品未找到</h1>
          <Button onClick={() => navigate('/products')}>返回產品列表</Button>
        </div>
      </div>
    );
  }

  const memberPrice = product.memberPrice || product.price * 0.85;
  const discount = Math.round(((product.price - memberPrice) / product.price) * 100);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* 導航欄 */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          <h1 className="text-lg font-semibold flex-1 text-center px-4 truncate">
            {product.productNumber ? `${product.productNumber} ` : ''}{product.productTitle.replace('(小)', '').replace('(大)', '').trim()}
          </h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* 左側：產品圖片 */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full aspect-square bg-secondary rounded-lg overflow-hidden mb-4 flex items-center justify-center">
              {product.image ? (
                <ImageWithFallback
                  src={product.image}
                  fallbackSrc="/favicon.png"
                  alt={product.productTitle}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-6xl">{product.benefits?.[0] || '✨'}</div>
              )}
            </div>
            <div className="flex gap-2 w-full">
              <span className="flex-1 px-3 py-2 bg-secondary rounded text-center text-sm font-medium">
                {product.series}
              </span>
              <span className="flex-1 px-3 py-2 bg-secondary rounded text-center text-sm font-medium">
                {product.volume || '容量未標示'}
              </span>
            </div>
          </div>

          {/* 右側：產品信息 */}
          <div className="flex flex-col">
            {/* 產品編號與名稱 */}
            <div className="mb-6">
              {product.productNumber && (
                <h2 className="text-3xl font-bold mb-2" style={{ color: '#8b6f47' }}>
                  {product.productNumber}
                </h2>
              )}
              <h3 className="text-xl font-semibold mb-4">{product.productTitle}</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* 價格區塊 */}
            <Card className="p-6 mb-6 bg-secondary/50">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">原價</div>
                  <div className="text-2xl font-bold line-through text-muted-foreground">
                    ${product.price}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">會員價</div>
                  <div className="text-3xl font-bold" style={{ color: '#8b6f47' }}>
                    ${Math.round(memberPrice)}
                  </div>
                  {discount > 0 && (
                    <div className="text-xs text-accent font-semibold">
                      省 {discount}%
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">PV 點數</div>
                  <div className="text-2xl font-bold">{product.pv || 0}</div>
                </div>
              </div>
            </Card>


          </div>
        </div>

        {/* 完整使用流程 + 整套提示橫幅 */}
        {USAGE_SEQUENCES[product.series] && (
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
                  {product.productNumber} {product.productTitle} 是「{product.series.replace('(小)', '').replace('(大)', '').trim()}」整組保養的其中一環，完整保養建議：
                  {USAGE_SEQUENCES[product.series].fullSetLabel}
                  　｜　使用完畢後，單一品項亦可個別回購
                </div>
              </div>
            </div>

            <div className="text-xs font-semibold mb-3" style={{ color: "#8B6F47" }}>
              使用順序 &amp; 用法
            </div>
            <div className="flex flex-wrap gap-x-1 gap-y-4">
              {USAGE_SEQUENCES[product.series].steps.map((step, idx) => {
                const stepProduct = PRODUCTS.find(
                  (p) => p.productNumber === step.productNumber && p.category === product.category
                );
                const isCurrent = step.productNumber === product.productNumber;
                const isLast = idx === USAGE_SEQUENCES[product.series].steps.length - 1;
                return (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center text-center w-[84px]">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2"
                        style={
                          isCurrent
                            ? { background: "#C9A876", color: "#fff", boxShadow: "0 0 0 3px #F3E8D8" }
                            : { background: "#5a4632", color: "#fff" }
                        }
                      >
                        {step.step}
                      </div>
                      <div className="text-xs font-semibold" style={{ color: isCurrent ? "#9c7a3f" : "#5a4632" }}>
                        {step.productNumber}
                      </div>
                      {stepProduct && (
                        <div className="text-[10px] leading-tight mt-0.5 line-clamp-2" style={{ color: "#9c8a76" }}>
                          {stepProduct.productTitle}
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

        {/* 詳細信息 - 單頁滾動式 */}
        <div className="space-y-8">
          {/* 產品用途 */}
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: '#8b6f47' }}>
              🎯 產品用途
            </h3>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {product.usage || product.description}
            </p>
          </Card>

          {/* 使用方法 */}
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: '#8b6f47' }}>
              💧 使用方法
            </h3>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {product.instructions || '清潔後，取適量塗抹於全身肌膚乾燥處。'}
            </p>
          </Card>

          {/* 主要成分 */}
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: '#8b6f47' }}>
              🌿 主要成分
            </h3>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {product.ingredients || '天然植物精油配方'}
            </p>
          </Card>

          {/* 保存方式 */}
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: '#8b6f47' }}>
              🏠 保存方式
            </h3>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {product.storage || '存放於陰涼乾燥處。避免陽光直射及潮濕環境。'}
            </p>

            {/* 使用注意事項 */}
            {product.precautions && product.precautions.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-bold mb-3 text-foreground">⚠️ 使用注意事項</h4>
                <ul className="space-y-2">
                  {product.precautions.map((precaution, idx) => (
                    <li key={`precaution-${idx}`} className="flex gap-3 text-sm text-foreground">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span>{precaution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
