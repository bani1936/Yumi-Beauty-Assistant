import { ChevronLeft } from "lucide-react";
import { MEMBERSHIP_TIERS } from "@/lib/membership-tiers";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "會籍是終身嗎？",
    answer:
      "會籍自加入會員起首年至隔年年底，隔年起每年凡消費累積滿 15,000 PV，下一年度自動續會。",
  },
  {
    question: "差額獎金領取方式？",
    answer:
      "每年一月購買滿 20,000 PV 整年皆可領取；或要領取當月購買 2,250 PV 含以上，可領取差額獎金。",
  },
  {
    question: "PV 點數會過期嗎？",
    answer: "PV 點數不會過期，終身累積。",
  },
  {
    question: "刷卡可分期嗎？",
    answer: "永豐、台新、中信信用卡，享 3、6 期分期零利率。",
  },
];

export default function Membership() {
  const topTier = MEMBERSHIP_TIERS[MEMBERSHIP_TIERS.length - 1];

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

      {/* Hero 標題區 */}
      <section
        className="py-14 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #F0EAE2, #F5F1ED)" }}
      >
        <div
          className="text-xs font-semibold tracking-[3px] mb-3"
          style={{ color: "#B59A8A" }}
        >
          MEMBERSHIP PROGRAM
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "#5a4632" }}
        >
          會員位階與升級禮遇
        </h2>
        <p className="text-sm md:text-base" style={{ color: "#6B6B6B" }}>
          越早升級，回饋越高｜越早加入，越早享有終身課程資格
        </p>
      </section>

      {/* 位階卡片 */}
      <section className="px-4 -mt-8 relative z-10">
        <div className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {[...MEMBERSHIP_TIERS].reverse().map((tier) => {
            const isTop = tier.id === topTier.id;
            return (
              <div
                key={tier.id}
                className="rounded-2xl p-6 md:p-7"
                style={
                  isTop
                    ? {
                        background: "linear-gradient(160deg, #FBF6EE, #F3E8D8)",
                        border: "1.5px solid #C9A876",
                        boxShadow: "0 8px 24px rgba(139, 111, 71, 0.14)",
                      }
                    : {
                        background: "#fff",
                        border: "1px solid #E8E4E0",
                      }
                }
              >
                <div
                  className="text-xs tracking-wide mb-1"
                  style={{ color: isTop ? "#9c7a3f" : "#B59A8A" }}
                >
                  LV.{tier.order}
                  {isTop ? " · 最高位階" : ""}
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#5a4632", fontFamily: "'Playfair Display', serif" }}
                >
                  {tier.name}
                </h3>

                {/* 差額獎金／折扣／輔導獎金 - 最顯眼的核心數字 */}
                <div
                  className="text-center rounded-xl py-4 px-3 mb-5"
                  style={{ background: isTop ? "rgba(255,255,255,0.5)" : "#FBF6EE" }}
                >
                  <div className="text-xs mb-1" style={{ color: "#9c7a3f" }}>
                    差額獎金
                  </div>
                  <div
                    className="text-4xl font-bold leading-none"
                    style={{ color: "#8B6F47", fontFamily: "'Playfair Display', serif" }}
                  >
                    {tier.commission}
                  </div>
                  <div className="text-xs mt-2" style={{ color: "#B59A8A" }}>
                    產品折扣 {tier.discount}
                    {tier.guidanceGenerations
                      ? `　｜　輔導獎金領 ${tier.guidanceGenerations} 代`
                      : ""}
                  </div>
                </div>

                {/* 升等條件 - 精簡條列，符合任一即可 */}
                <div className="mb-5">
                  <div className="text-xs font-semibold mb-2" style={{ color: "#8B6F47" }}>
                    升等條件{tier.requirements.length > 1 ? "（符合任一即可）" : ""}
                  </div>
                  <div className="space-y-1.5">
                    {tier.requirements.map((req, idx) => (
                      <div key={idx} className="flex gap-1.5 text-xs leading-relaxed" style={{ color: "#6B6B6B" }}>
                        <span style={{ color: "#C9A876" }}>✓</span>
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 其他位階福利 - 標籤形式 */}
                {tier.perks.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold mb-2" style={{ color: "#8B6F47" }}>
                      位階福利
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {tier.perks.map((perk, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ background: "#F5F1ED", color: "#5a4632" }}
                        >
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 權益一覽比較表 */}
      <section className="px-4 mt-16">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-7">
            <div className="text-xs font-semibold tracking-[3px] mb-2" style={{ color: "#B59A8A" }}>
              COMPARE BENEFITS
            </div>
            <h2
              className="text-2xl font-bold"
              style={{ color: "#5a4632", fontFamily: "'Playfair Display', serif" }}
            >
              權益一覽
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#E8E4E0" }}>
            <table className="w-full border-collapse bg-white text-sm min-w-[720px]">
              <thead>
                <tr style={{ background: "#F5F1ED" }}>
                  <td className="p-4 font-semibold" style={{ color: "#6B6B6B" }}>
                    位階
                  </td>
                  {MEMBERSHIP_TIERS.map((tier) => {
                    const isTop = tier.id === topTier.id;
                    return (
                      <td
                        key={tier.id}
                        className="p-4 text-center font-semibold whitespace-nowrap"
                        style={
                          isTop
                            ? { background: "#F3E8D8", color: "#5a4632" }
                            : { color: "#6B6B6B" }
                        }
                      >
                        {tier.name}
                      </td>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t" style={{ borderColor: "#EEE9E3" }}>
                  <td className="p-4" style={{ color: "#8a8a8a" }}>
                    差額獎金
                  </td>
                  {MEMBERSHIP_TIERS.map((tier) => {
                    const isTop = tier.id === topTier.id;
                    return (
                      <td
                        key={tier.id}
                        className="p-4 text-center"
                        style={
                          isTop
                            ? { background: "#FBF6EE", color: "#8B6F47", fontWeight: 700 }
                            : {}
                        }
                      >
                        {tier.commission}
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-t" style={{ borderColor: "#EEE9E3", background: "#FAFAF8" }}>
                  <td className="p-4" style={{ color: "#8a8a8a" }}>
                    產品折扣
                  </td>
                  {MEMBERSHIP_TIERS.map((tier) => {
                    const isTop = tier.id === topTier.id;
                    return (
                      <td
                        key={tier.id}
                        className="p-4 text-center"
                        style={
                          isTop
                            ? { background: "#FBF6EE", color: "#8B6F47", fontWeight: 600 }
                            : {}
                        }
                      >
                        {tier.discount}
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-t" style={{ borderColor: "#EEE9E3" }}>
                  <td className="p-4" style={{ color: "#8a8a8a" }}>
                    輔導獎金
                  </td>
                  {MEMBERSHIP_TIERS.map((tier) => {
                    const isTop = tier.id === topTier.id;
                    const has = Boolean(tier.guidanceGenerations);
                    return (
                      <td
                        key={tier.id}
                        className="p-4 text-center"
                        style={
                          isTop
                            ? { background: "#FBF6EE", color: "#8B6F47", fontWeight: 700 }
                            : { color: has ? "#8B6F47" : "#c9c2b8" }
                        }
                      >
                        {has ? "✓" : "—"}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-center mt-3" style={{ color: "#B59A8A" }}>
            手機版可左右滑動查看完整表格
          </p>
        </div>
      </section>

      {/* 常見問題 FAQ */}
      <section className="mt-16 py-16 px-4" style={{ background: "#F5F1ED" }}>
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-xs font-semibold tracking-[3px] mb-2" style={{ color: "#B59A8A" }}>
              FAQ
            </div>
            <h2
              className="text-2xl font-bold"
              style={{ color: "#5a4632", fontFamily: "'Playfair Display', serif" }}
            >
              常見問題
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                style={{ borderColor: "#E0D9CD" }}
              >
                <AccordionTrigger
                  className="text-left font-semibold hover:no-underline"
                  style={{ color: "#5a4632" }}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent style={{ color: "#8a7a68" }}>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
