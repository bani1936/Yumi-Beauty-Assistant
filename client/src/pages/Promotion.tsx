import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

// 實品照片 — 之後把照片放進 client/public/，把檔名加進這個陣列即可自動顯示在下方相簿。
const GALLERY_IMAGES: string[] = [
  // 範例："/promo-bag-1.jpg", "/promo-bag-2.jpg",
];

export default function Promotion() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen pb-20" style={{ background: '#FAFAF8' }}>
      {/* 導航欄 */}
      <nav className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b" style={{ borderColor: '#E8E4E0' }}>
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold" style={{ color: '#5a4632' }}>最新活動</h1>
        </div>
      </nav>

      {/* 主視覺圖 */}
      <div className="container max-w-2xl mx-auto px-4 pt-8">
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E8E4E0' }}>
          <ImageWithFallback
            src="/promotion-hero.jpg"
            fallbackSrc="/favicon.png"
            alt="最新活動：新會員消費滿額晉升組長，贈送質感訂製旅行化妝包及居家安瓶保養組2組"
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* 實品照片相簿 */}
      {GALLERY_IMAGES.length > 0 && (
        <div className="container max-w-4xl mx-auto px-4 mt-10">
          <div className="text-center mb-6">
            <div className="text-[11px] tracking-[2px] font-semibold mb-2" style={{ color: '#B59A8A' }}>
              GIFT PREVIEW
            </div>
            <h2
              className="text-xl md:text-2xl font-bold"
              style={{ color: '#5a4632', fontFamily: "'Playfair Display', serif" }}
            >
              贈品實拍
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((src, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-xl overflow-hidden"
                style={{ border: '1px solid #E8E4E0', background: '#F5F1ED' }}
              >
                <ImageWithFallback
                  src={src}
                  fallbackSrc="/favicon.png"
                  alt={`活動贈品實拍 ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
