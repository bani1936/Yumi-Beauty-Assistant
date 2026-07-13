import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { SKIN_QUIZ_QUESTIONS, getRecommendedProducts } from '@/lib/products';

export default function SkinDetection() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    if (currentStep < SKIN_QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const recommended = getRecommendedProducts(newAnswers);
      setRecommendations(recommended);
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendations([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
          <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-foreground">檢測結果</h1>
          </div>
        </nav>

        <section className="py-12 md:py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                您的肌膚檢測結果
              </h2>
              <p className="text-lg text-muted-foreground">
                根據您的回答，我們為您推薦以下產品
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {recommendations.map((product) => (
                <Card key={product.id} className="p-6 border-0 shadow-sm hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold text-lg text-foreground mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">NT${product.price}</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                      查看詳情
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <Button 
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
                onClick={handleReset}
              >
                重新檢測
              </Button>
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold"
                onClick={() => navigate('/product-calculator')}
              >
                前往計算機
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const question = SKIN_QUIZ_QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / SKIN_QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-foreground">肌膚檢測小幫手</h1>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 py-12 md:py-20">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663525050333/8gDTFRnMHV4AzsqzqxyAFz/skin-detection-hero-DbkuYC4hfaBovqo4VRNcXJ.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="container max-w-2xl mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              了解您的肌膚
            </h2>
            <p className="text-lg text-muted-foreground">
              透過簡單的問卷，我們將為您提供個人化的產品推薦
            </p>
          </div>

          <div className="w-full bg-secondary rounded-full h-2 mb-8">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <Card className="p-8 border-0 shadow-lg">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                {question.question}
              </h3>

              <div className="space-y-3">
                {question.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.id, option.value)}
                    className="w-full p-4 text-left border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              第 {currentStep + 1} / {SKIN_QUIZ_QUESTIONS.length} 題
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
