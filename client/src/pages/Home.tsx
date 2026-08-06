import { Card } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { Gift, Calculator, Sparkles, Users } from 'lucide-react';

export default function Home() {
  const [, navigate] = useLocation();

  const TOOL_CARDS = [
    {
      id: 'promotion',
      icon: <Gift className="w-7 h-7" />,
      title: '最新活動',
      description: '新會員限定好禮，滿額即享升級禮遇',
      buttonText: '了解詳情',
      path: '/promotion',
      highlight: true,
    },
    {
      id: 'products',
      icon: <Sparkles className="w-7 h-7" />,
      title: '全系列產品',
      description: '',
      buttonText: '點我瀏覽',
      path: '/products',
      highlight: false,
    },
    {
      id: 'membership',
      icon: <Users className="w-7 h-7" />,
      title: '會員制度',
      description: '',
      buttonText: '快速了解',
      path: '/membership',
      highlight: false,
    },
    {
      id: 'product-calculator',
      icon: <Calculator className="w-7 h-7" />,
      title: '首購金額試算',
      description: '',
      buttonText: '快速計算',
      path: '/product-calculator',
      highlight: false,
    }
  ];

  const HEADING_FONT = "'Songti TC', 'Noto Serif TC', 'PMingLiU', 'Playfair Display', serif";

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF8' }}>

      {/* Hero 標題區 */}
      <section
        className="py-14 md:py-16 text-center px-4"
        style={{ background: 'linear-gradient(135deg, #F0EAE2, #F5F1ED)' }}
      >
        <div className="text-[11px] tracking-[2px] font-semibold mb-3" style={{ color: '#B59A8A' }}>
          PROFESSIONAL SKIN MANAGEMENT
        </div>
        <h1
          className="text-2xl md:text-3xl font-bold mb-3"
          style={{ color: '#5a4632', fontFamily: HEADING_FONT }}
        >
          Yumí 米米美學｜高端皮膚管理
        </h1>
        <p className="text-sm md:text-base" style={{ color: '#8a8a8a' }}>
          專屬您的產品導覽與會員服務中心
        </p>
      </section>

      <section className="py-14 md:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TOOL_CARDS.map((tool) => (
              <Card
                key={tool.id}
                className="h-full p-8 cursor-pointer group overflow-hidden transition-all hover:-translate-y-1 rounded-sm"
                style={
                  tool.highlight
                    ? {
                        background: 'linear-gradient(160deg, #FBF6EE, #F3E8D8)',
                        border: '1.5px solid #C9A876',
                        boxShadow: 'none',
                      }
                    : {
                        background: '#fff',
                        border: '1px solid #E8E4E0',
                        boxShadow: 'none',
                      }
                }
                onClick={() => navigate(tool.path)}
              >
                <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
                  <div
                    className="mb-6 flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300"
                    style={
                      tool.highlight
                        ? { background: 'rgba(255,255,255,0.6)', color: '#8B6F47' }
                        : { background: '#F5F1ED', color: '#8B6F47' }
                    }
                  >
                    {tool.icon}
                  </div>

                  {tool.highlight && (
                    <div className="text-[11px] tracking-[1.5px] font-semibold mb-2" style={{ color: '#9c7a3f' }}>
                      LATEST PROMOTION
                    </div>
                  )}

                  <h3
                    className={`text-xl md:text-2xl font-semibold ${tool.description ? 'mb-3' : ''}`}
                    style={{ color: '#5a4632', fontFamily: HEADING_FONT }}
                  >
                    {tool.title}
                  </h3>

                  {tool.description && (
                    <p className="leading-relaxed text-sm md:text-base whitespace-pre-line" style={{ color: '#8a8a8a' }}>
                      {tool.description}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center text-sm text-white/50">
            <p>Copyright © 2026 Yumí 米米美學｜高端皮膚管理</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
