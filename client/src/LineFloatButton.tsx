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
      className="line-float-btn fixed z-[999] w-8 h-8 rounded-full shadow-lg transition-transform hover:scale-105"
      style={{ right: "24px", top: "62%" }}
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
