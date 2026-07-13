import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { Leaf, Calculator, Sparkles, Users } from 'lucide-react';

export default function Home() {
  const [, navigate] = useLocation();

  const TOOL_CARDS = [
    {
      id: 'products',
      icon: <Sparkles className="w-8 h-8" />,
      title: '全系列產品',
      description: '介紹系列產品效果及用法',
      buttonText: '點我瀏覽',
      path: '/products',
    },
    {
      id: 'product-calculator',
      icon: <Calculator className="w-8 h-8" />,
      title: '首購計算機',
      description: '團購及首購會員顧客使用',
      buttonText: '快速計算',
      path: '/product-calculator',
    },
    {
      id: 'membership',
      icon: <Users className="w-8 h-8" />,
      title: '會員制度',
      description: '會員權益、位階升級條件、回饋金比例',
      buttonText: '快速了解',
      path: '/membership',
    },
    {
      id: 'skin-detection',
      icon: <Leaf className="w-8 h-8" />,
      title: '肌膚檢測小幫手',
      description: '透過互動問答判斷膚質，客製化產品建議',
      buttonText: '開始諮詢',
      path: '/skin-detection',
    }
  ];

  return (
    <div className="min-h-screen bg-background">

      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TOOL_CARDS.map((tool) => (
              <Card 
                key={tool.id} 
                className="h-full p-8 border-0 shadow-sm hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden" 
                onClick={() => navigate(tool.path)}
              >
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-6 inline-block p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {tool.icon}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                    {tool.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-primary font-medium text-sm">
                    {tool.buttonText}
                    <span className="text-lg">→</span>
                  </div>
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
