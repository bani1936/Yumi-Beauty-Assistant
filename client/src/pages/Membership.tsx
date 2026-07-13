import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MEMBERSHIP_TIERS } from "@/lib/membership-tiers";

export default function Membership() {
  const [selectedTier, setSelectedTier] = useState(MEMBERSHIP_TIERS[0]);
  const [viewMode, setViewMode] = useState<"grid" | "detail">("grid");

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
            <h1 className="text-lg font-semibold">會員制度</h1>
          </div>
        </div>
      </nav>

      {/* 主要內容 */}
      <section className="py-8">
        <div className="container max-w-6xl mx-auto px-4">
          {/* 標題 */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#8b6f47" }}>
              會員位階及升級條件
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              越早升級，現金回饋越多❤️‍🔥
            </p>
          </div>

          {/* 視圖切換 */}
          <div className="flex justify-center mb-8">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "detail")}>
              <TabsList>
                <TabsTrigger value="grid">所有等級</TabsTrigger>
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
                    className={`${tier.color} rounded-lg p-6 border-2 border-transparent hover:border-primary transition-all`}
                  >
                    <div className="text-4xl mb-3">{tier.icon}</div>
                    <h3 className="text-lg font-bold mb-4" style={{ color: "#8b6f47" }}>
                      {tier.name}
                    </h3>
                    <div className="space-y-2 mb-6">
                      <div>
                        <p className="text-xs text-muted-foreground">回饋金</p>
                        <p className="text-2xl font-bold text-accent">{tier.commission}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setSelectedTier(tier);
                        setViewMode("detail");
                      }}
                    >
                      了解更多
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 詳細資訊視圖 */}
          {viewMode === "detail" && (
            <div className="space-y-6">
              {/* 頂部：視圖切換和位階導航 */}
              <div className="flex flex-col gap-4">
                {/* 位階導航 - 移到上方 */}
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

              {/* 詳細卡片 */}
              <Card className="overflow-hidden border-2" style={{ borderColor: "#8b6f47" }}>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-6xl mb-4">{selectedTier.icon}</div>
                      <h2 className="text-4xl font-bold mb-2" style={{ color: "#8b6f47" }}>
                        {selectedTier.name}
                      </h2>
                      <p className="text-muted-foreground"></p>
                    </div>
                    <div className="text-right">
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-1">差額獎金</p>
                        <p className="text-4xl font-bold text-accent">{selectedTier.commission}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1"></p>
                        <p className="text-lg font-semibold"></p>
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
                      🎁 位階福利
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
                        ⬇️ 下一個位階
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


            </div>
          )}
        </div>
      </section>
    </div>
  );
}
