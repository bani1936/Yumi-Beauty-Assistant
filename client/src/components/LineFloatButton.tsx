import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

// 官方 LINE 帳號連結
const LINE_URL = "https://lin.ee/QaAtcuU";

export default function LineFloatButton() {
  return (
    <a
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="加入 LINE 官方帳號"
      // 手機版：fixed 貼在畫面右上方，跟頁面「返回主頁」列同高，避免擋住下方結算列
      // 電腦版（md 以上）：fixed 鎖在畫面右側中間偏下
      className="fixed z-[999] w-[38px] h-[38px] rounded-full shadow-lg transition-transform hover:scale-105 top-20 right-4 md:top-[62%] md:right-6"
    >
      <ImageWithFallback
        src="/line-icon.png"
        fallbackSrc="/favicon.png"
        alt="LINE"
        className="w-full h-full object-contain"
      />
    </a>
  );
}
