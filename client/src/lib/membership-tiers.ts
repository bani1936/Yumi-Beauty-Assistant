/**
 * 會員位階數據
 * 直銷模式 - 8 個位階
 */

export interface MembershipTier {
  id: string;
  name: string;
  commission: string;
  entryFee: string;
  requirements: string[];
  benefits: string[];
  color: string;
  icon: string;
  order: number;
}

// commission 字段現在表示「差額獎金」

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "member",
    name: "會員",
    commission: "0%",
    entryFee: "1000 元入會",
    requirements: ["入會費 1000 元"],
    benefits: ["會員身份", "累積 PV 點數"],
    color: "bg-gray-100",
    icon: "👤",
    order: 1,
  },
  {
    id: "group-leader",
    name: "組長",
    commission: "20%",
    entryFee: "3 萬 PV",
    requirements: [
      "自己直接購買 3 萬 PV",
      "自己加直 B 累積購買滿 3 萬 PV",
    ],
    benefits: [
      "20% 差額獎金",
      "20% 購買產品折扣",
      "終身線上課程(組長以上)",
    ],
    color: "bg-amber-50",
    icon: "👥",
    order: 2,
  },
  {
    id: "section-leader",
    name: "科長",
    commission: "30%",
    entryFee: "12 萬 PV",
    requirements: [
      "當月自己累積或直 B 累積 12 萬 PV 或自己直接購買 12 萬 PV",
      "當月介紹 1 位科長及 1 位組長，自己即晉升科長",
      "當月介紹 4 位直 B 組長自己即晉升科長",
      "無限期介紹直 B 累積 20 萬 PV 即晉升科長",
    ],
    benefits: [
      "30% 差額獎金",
      "30% 購買產品折扣",
      "終身線上課程(科長以上)",
      "終身實體技術課程(科長以上)",
    ],
    color: "bg-yellow-50",
    icon: "📊",
    order: 3,
  },
  {
    id: "small-plate-leader",
    name: "小盤督導",
    commission: "35%",
    entryFee: "32 萬 PV",
    requirements: [
      "整組累積 32 萬 PV，自己有 2 位直 B 科長後，自己或新推薦業績達 8 萬 PV：自己須為科長",
      "直切小盤：當月自己購買累積 32 萬 PV，不含直 B 業績",
      "加入成為科長當月起 3 個月內，推薦 2 位直 B 科長即可晉升小盤",
    ],
    benefits: [
      "輔導獎金領 2 代",
      "35% 差額獎金",
      "35% 購買產品折扣",
      "終身線上課程(小盤以上)",
      "終身實體技術課程(小盤以上)",
      "終身門店管理課程(小盤以上)",
    ],
    color: "bg-orange-50",
    icon: "🎯",
    order: 4,
  },
  {
    id: "mid-plate-leader",
    name: "中盤督導",
    commission: "37%",
    entryFee: "40400-56400",
    requirements: [
      "2 位直 B 小盤督導",
    ],
    benefits: [
      "輔導獎金領 4 代",
      "37% 差額獎金",
      "35% 購買產品折扣",
      "終身線上課程(小盤以上)",
      "終身實體技術課程(小盤以上)",
      "終身門店管理課程(小盤以上)",
    ],
    color: "bg-red-50",
    icon: "📈",
    order: 5,
  },
  {
    id: "large-plate-leader",
    name: "大盤督導",
    commission: "38%",
    entryFee: "43600-59600",
    requirements: [
      "1 位直 B 中盤督導及 3 位直 B 小盤督導",
    ],
    benefits: [
      "輔導獎金領 6 代",
      "38% 差額獎金",
      "35% 購買產品折扣",
      "終身線上課程(小盤以上)",
      "終身實體技術課程(小盤以上)",
      "終身門店管理課程(小盤以上)",
    ],
    color: "bg-pink-50",
    icon: "👑",
    order: 6,
  },
  {
    id: "agent-consultant",
    name: "代理顧問",
    commission: "40%",
    entryFee: "50000-66000",
    requirements: [
      "1 位直 B 大盤督導及 5 位直 B 小盤督導",
    ],
    benefits: [
      "輔導獎金領 8 代",
      "40% 差額獎金",
      "35% 購買產品折扣",
      "終身線上課程(小盤以上)",
      "終身實體技術課程(小盤以上)",
      "終身門店管理課程(小盤以上)",
    ],
    color: "bg-purple-50",
    icon: "🎓",
    order: 7,
  },
  {
    id: "supervisor",
    name: "總監",
    commission: "45%",
    entryFee: "66000-82000",
    requirements: [
      "2 位直 B 大盤督導及 6 位直 B 小盤督導",
    ],
    benefits: [
      "輔導獎金領 10 代",
      "45% 差額獎金",
      "35% 購買產品折扣",
      "終身線上課程(小盤以上)",
      "終身實體技術課程(小盤以上)",
      "終身門店管理課程(小盤以上)",
    ],
    color: "bg-indigo-50",
    icon: "💎",
    order: 8,
  },
];

export const getTierById = (id: string): MembershipTier | undefined => {
  return MEMBERSHIP_TIERS.find((tier) => tier.id === id);
};

export const getTierByOrder = (order: number): MembershipTier | undefined => {
  return MEMBERSHIP_TIERS.find((tier) => tier.order === order);
};
