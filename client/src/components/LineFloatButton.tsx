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
      // 手機版：absolute，跟著頁面內容一起捲動（不會鎖在螢幕上）
      // 電腦版（md 以上）：fixed，固定鎖在畫面右側同一個位置
      className="absolute md:fixed z-[999] w-[38px] h-[38px] rounded-full shadow-lg transition-transform hover:scale-105 top-[640px] right-4 md:top-[62%] md:right-6"
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
