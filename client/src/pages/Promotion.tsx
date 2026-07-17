import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLocation } from 'wouter';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// 實品照片 — 之後把照片放進 client/public/，把檔名加進這個陣列即可自動顯示在下方相簿。
const GALLERY_IMAGES: string[] = [
  "/promo-gift-1.jpg",
  "/promo-gift-2.jpg",
  "/promo-gift-3.jpg",
  "/promo-gift-4.jpg",
  "/promo-gift-5.jpg",
  "/promo-gift-6.jpg",
  "/promo-gift-7.jpg",
  "/promo-gift-8.jpg",
];

export default function Promotion() {
  const [, navigate] = useLocation();
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const showPrev = () => {
    if (previewIndex === null) return;
    setPreviewIndex((previewIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };
  const showNext = () => {
    if (previewIndex === null) return;
    setPreviewIndex((previewIndex + 1) % GALLERY_IMAGES.length);
  };

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
            <p className="text-xs mt-2" style={{ color: '#B0A797' }}>點擊照片可放大預覽</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPreviewIndex(idx)}
                className="aspect-square rounded-xl overflow-hidden cursor-pointer transition-transform hover:-translate-y-0.5"
                style={{ border: '1px solid #E8E4E0', background: '#F5F1ED' }}
              >
                <ImageWithFallback
                  src={src}
                  fallbackSrc="/favicon.png"
                  alt={`活動贈品實拍 ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 放大預覽燈箱 */}
      <Dialog open={previewIndex !== null} onOpenChange={(open) => { if (!open) setPreviewIndex(null); }}>
        <DialogContent
          className="max-w-3xl w-[95vw] p-0 border-0 bg-transparent shadow-none flex items-center justify-center"
          showCloseButton={false}
        >
          {previewIndex !== null && (
            <div className="relative w-full flex items-center justify-center">
              <ImageWithFallback
                src={GALLERY_IMAGES[previewIndex]}
                fallbackSrc="/favicon.png"
                alt={`活動贈品實拍 ${previewIndex + 1}`}
                className="max-h-[80vh] w-auto rounded-xl object-contain"
              />

              <button
                type="button"
                onClick={() => setPreviewIndex(null)}
                className="absolute -top-3 -right-3 md:top-2 md:right-2 w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-md"
                style={{ color: '#5a4632' }}
              >
                <X className="w-5 h-5" />
              </button>

              {GALLERY_IMAGES.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrev}
                    className="absolute left-1 md:-left-14 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/90 shadow-md"
                    style={{ color: '#5a4632' }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="absolute right-1 md:-right-14 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/90 shadow-md"
                    style={{ color: '#5a4632' }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full bg-white/90"
                style={{ color: '#8a8a8a' }}
              >
                {previewIndex + 1} / {GALLERY_IMAGES.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
