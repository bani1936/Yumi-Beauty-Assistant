import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLocation } from 'wouter';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface PromoCampaign {
  image: string;
  label?: string;
  // 這個活動專屬的贈品實拍照片（選填）。有填的話，活動圖右下角會出現「贈品實拍」標籤，
  // 點圖才會彈出照片牆；沒填就只是單純的活動圖，不會有標籤。
  gallery?: string[];
}

// 活動宣傳圖 — 每張圖是一個獨立活動，直向堆疊顯示。
// 之後要加新活動，只要把圖片放進 client/public/，把物件加進這個陣列最後面即可（會顯示在最下面）。
// 如果這個活動也有實品/贈品照片，把檔名列進 gallery 陣列即可自動加上「贈品實拍」標籤。
const PROMO_CAMPAIGNS: PromoCampaign[] = [
  {
    image: "/promo-campaign-1.png",
    label: "August 滿額禮",
    gallery: [
      "/promo-gift-1.jpg",
      "/promo-gift-2.jpg",
      "/promo-gift-3.jpg",
      "/promo-gift-4.jpg",
      "/promo-gift-5.jpg",
      "/promo-gift-6.jpg",
      "/promo-gift-7.jpg",
      "/promo-gift-8.jpg",
    ],
  },
  {
    image: "/promo-campaign-2.png",
    label: "盛夏不鬧肌",
  },
  {
    image: "/promo-campaign-3.png",
    label: "點點成金，PV換好禮",
  },
];

export default function Promotion() {
  const [, navigate] = useLocation();
  // 目前開啟中的「贈品實拍」照片牆是哪個活動（陣列 index），null 代表沒有開啟
  const [openGalleryIdx, setOpenGalleryIdx] = useState<number | null>(null);
  // 照片牆裡目前放大預覽的是第幾張，null 代表沒有開啟放大燈箱
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const currentCampaign = openGalleryIdx !== null ? PROMO_CAMPAIGNS[openGalleryIdx] : null;
  const currentGallery = currentCampaign?.gallery ?? [];

  const closeGallery = () => {
    setOpenGalleryIdx(null);
    setPreviewIndex(null);
  };

  const showPrev = () => {
    if (previewIndex === null) return;
    setPreviewIndex((previewIndex - 1 + currentGallery.length) % currentGallery.length);
  };

  const showNext = () => {
    if (previewIndex === null) return;
    setPreviewIndex((previewIndex + 1) % currentGallery.length);
  };

  return (
    <div className="min-h-screen pb-20" style={{ background: '#FAFAF8' }}>
      {/* 導航欄 */}
      <nav className="sticky top-24 z-40 bg-white/80 backdrop-blur-md border-b" style={{ borderColor: '#E8E4E0' }}>
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

      {/* 主視覺圖 — 多筆活動直向堆疊 */}
      <div className="container max-w-2xl mx-auto px-4 pt-8 space-y-6">
        {PROMO_CAMPAIGNS.map((campaign, idx) => {
          const hasGallery = !!campaign.gallery && campaign.gallery.length > 0;
          return (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden ${hasGallery ? 'cursor-pointer' : ''}`}
              style={{ border: '1px solid #E8E4E0' }}
              onClick={hasGallery ? () => setOpenGalleryIdx(idx) : undefined}
            >
              <ImageWithFallback
                src={campaign.image}
                fallbackSrc="/favicon.png"
                alt={campaign.label ? `最新活動：${campaign.label}` : `最新活動 ${idx + 1}`}
                className="w-full h-auto block"
              />
              {hasGallery && (
                <div
                  className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 rounded-full px-3 py-1.5 text-xs font-medium shadow-sm"
                  style={{ color: '#5a4632' }}
                >
                  贈品實拍
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 贈品實拍照片牆 */}
      <Dialog open={openGalleryIdx !== null} onOpenChange={(open) => { if (!open) closeGallery(); }}>
        <DialogContent className="max-w-2xl w-[92vw] max-h-[85vh] overflow-y-auto">
          <div className="text-center mb-4">
            <div className="text-[11px] tracking-[2px] font-semibold mb-2" style={{ color: '#B59A8A' }}>
              GIFT PREVIEW
            </div>
            <h2
              className="text-xl font-bold"
              style={{ color: '#5a4632', fontFamily: "'Playfair Display', serif" }}
            >
              {currentCampaign?.label ? `${currentCampaign.label}．贈品實拍` : '贈品實拍'}
            </h2>
            <p className="text-xs mt-2" style={{ color: '#B0A797' }}>點擊照片可放大預覽</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentGallery.map((src, idx) => (
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
        </DialogContent>
      </Dialog>

      {/* 放大預覽燈箱 */}
      <Dialog open={previewIndex !== null} onOpenChange={(open) => { if (!open) setPreviewIndex(null); }}>
        <DialogContent
          className="max-w-3xl w-[95vw] p-0 border-0 bg-transparent shadow-none flex items-center justify-center"
          showCloseButton={false}
        >
          {previewIndex !== null && (
            <div className="relative w-full flex items-center justify-center">
              <ImageWithFallback
                key={previewIndex}
                src={currentGallery[previewIndex]}
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
              {currentGallery.length > 1 && (
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
                {previewIndex + 1} / {currentGallery.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
