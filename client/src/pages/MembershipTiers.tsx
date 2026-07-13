import { useState } from "react";
import { ChevronLeft, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MEMBERSHIP_TIERS } from "@/lib/membership-tiers";

export default function MembershipTiers() {
  const [selectedTier, setSelectedTier] = useState(MEMBERSHIP_TIERS[0]);
  const [viewMode, setViewMode] = useState<"grid" | "detail">("grid");

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Yumí 米米美學｜高端皮膚管理 - 會員位階",
        text: "查看完整的會員位階晉升條件和佣金結構",
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* 導航欄 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">會員位階</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              title="列印"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              title="分享"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* 主要內容 */}
      <section className="py-8">
        <div className="container max-w-6xl mx-auto px-4">
          {/* 標題 */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#8b6f47" }}>
              會員位階晉升體系
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              8 個位階，清晰的晉升路徑，完整的獎勵體系。選擇您想了解的位階，查看詳細的晉升條件和福利。
            </p>
          </div>

          {/* 視圖切換 */}
          <div className="flex justify-center mb-8">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "detail")}>
              <TabsList>
                <TabsTrigger value="grid">位階對比</TabsTrigger>
                <TabsTrigger value="detail">詳細資訊</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* 位階對比視圖 */}
          {viewMode === "grid" && (
            <div className="space-y-6">
              {/* 位階卡片網格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {MEMBERSHIP_TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => {
                      setSelectedTier(tier);
                      setViewMode("detail");
                    }}
                    className={`cursor-pointer transition-all transform hover:scale-105 ${tier.color} rounded-lg p-6 border-2 border-transparent hover:border-primary`}
                  >
                    <div className="text-4xl mb-3">{tier.icon}</div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#8b6f47" }}>
                      {tier.name}
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground">佣金比例</p>
                        <p className="text-2xl font-bold text-accent">{tier.commission}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">入會條件</p>
                        <p className="text-sm font-semibold">{tier.entryFee}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTier(tier);
                        setViewMode("detail");
                      }}
                    >
                      查看詳情
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 詳細資訊視圖 */}
          {viewMode === "detail" && (
            <div className="space-y-6">
              {/* 返回按鈕 */}
              <Button
                variant="outline"
                onClick={() => setViewMode("grid")}
                className="mb-4"
              >
                ← 返回位階列表
              </Button>

              {/* 詳細卡片 */}
              <Card className="overflow-hidden border-2" style={{ borderColor: "#8b6f47" }}>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-6xl mb-4">{selectedTier.icon}</div>
                      <h2 className="text-4xl font-bold mb-2" style={{ color: "#8b6f47" }}>
                        {selectedTier.name}
                      </h2>
                      <p className="text-muted-foreground">第 {selectedTier.order} 個位階</p>
                    </div>
                    <div className="text-right">
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-1">佣金比例</p>
                        <p className="text-4xl font-bold text-accent">{selectedTier.commission}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">入會條件</p>
                        <p className="text-lg font-semibold">{selectedTier.entryFee}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  {/* 晉升條件 */}
                  <div>
                    <h3 className="text-xl font-bold mb-4" style={{ color: "#8b6f47" }}>
                      📋 晉升條件
                    </h3>
                    <ul className="space-y-3">
                      {selectedTier.requirements.map((req, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-accent font-bold">✓</span>
                          <span className="text-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 福利和獎勵 */}
                  <div>
                    <h3 className="text-xl font-bold mb-4" style={{ color: "#8b6f47" }}>
                      🎁 福利和獎勵
                    </h3>
                    <ul className="space-y-3">
                      {selectedTier.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-accent font-bold">★</span>
                          <span className="text-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 晉升路徑 */}
                  {selectedTier.order < MEMBERSHIP_TIERS.length && (
                    <div className="bg-secondary/10 rounded-lg p-6">
                      <h3 className="text-lg font-bold mb-4" style={{ color: "#8b6f47" }}>
                        ⬆️ 下一個位階
                      </h3>
                      {MEMBERSHIP_TIERS[selectedTier.order] && (
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">晉升至</p>
                            <p className="text-xl font-bold">
                              {MEMBERSHIP_TIERS[selectedTier.order].name}
                            </p>
                          </div>
                          <div className="flex-1 border-t-2 border-dashed border-border"></div>
                          <Button
                            onClick={() => {
                              setSelectedTier(MEMBERSHIP_TIERS[selectedTier.order]);
                            }}
                            className="bg-primary hover:bg-primary/90 text-white"
                          >
                            查看條件
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>

              {/* 位階導航 */}
              <div className="flex gap-2 flex-wrap justify-center">
                {MEMBERSHIP_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedTier.id === tier.id
                        ? "bg-primary text-white"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {tier.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 底部提示 */}
          <div className="mt-12 p-6 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-center text-foreground">
              💡 提示：下載或分享此頁面，讓您的客戶更清楚了解會員位階體系。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
