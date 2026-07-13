import { useEffect, useState } from 'react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

/**
 * SplashScreen Component
 * 
 * 啟動畫面組件，在應用初始加載時顯示品牌 logo 和名稱。
 * 使用品牌色系（深棕金 #8B6F47）和柔和玫瑰色 (#D4A5A5）打造優雅的過渡體驗。
 * 
 * 特性：
 * - 響應式設計，支持手機和桌面
 * - 流暢的淡入淡出動畫
 * - Logo 縮放進入效果
 * - 品牌名稱漸顯效果
 * - 支持自定義時長
 */
export default function SplashScreen({ onComplete, duration = 2000 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      // 等待淡出動畫完成後隱藏組件
      const exitTimer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 500);
      return () => clearTimeout(exitTimer);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #FAFAF8 0%, #F5F1ED 100%)',
      }}
    >
      {/* 背景裝飾元素 */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: '#8B6F47' }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: '#D4A5A5' }}
        />
      </div>

      {/* 主容器 */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-6">
        {/* Logo 容器 - 縮放進入效果 */}
        <div
          className="animate-in fade-in zoom-in-50 duration-700"
          style={{
            animation: isExiting
              ? 'none'
              : 'splashLogoEnter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}
        >
          <ImageWithFallback
            src="/logo-circle.png"
            fallbackSrc="/favicon.png"
            alt="Logo"
            className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-lg"
          />
        </div>

        <div
          className="text-center"
          style={{
            animation: isExiting
              ? 'none'
              : 'splashTextEnter 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards',
            opacity: 0,
          }}
        >
          <h1
            className="text-2xl md:text-3xl font-semibold tracking-wide"
            style={{ color: '#8B6F47' }}
          >
            Yumí 米米美學｜高端皮膚管理
          </h1>
          <p
            className="text-sm md:text-base mt-2 font-light tracking-widest"
            style={{ color: '#D4A5A5' }}
          >
            Yumí Beauty Assistant
          </p>
        </div>

        {/* 加載指示器 - 優雅的點動畫 */}
        <div
          className="flex gap-2 mt-4"
          style={{
            animation: isExiting
              ? 'none'
              : 'splashFadeIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards',
            opacity: 0,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: '#D4A5A5',
                animation: `splashDot 1.4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 動畫定義 */}
      <style>{`
        @keyframes splashLogoEnter {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes splashTextEnter {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes splashFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes splashDot {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
            transform: translateY(-8px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes splashLogoEnter,
          @keyframes splashTextEnter,
          @keyframes splashFadeIn,
          @keyframes splashDot {
            from, to {
              opacity: 1;
              transform: none;
            }
          }
        }
      `}</style>
    </div>
  );
}
