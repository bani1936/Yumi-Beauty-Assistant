// 滿額贈禮設定
// basis: 'pv' 代表門檻用訂單 PV 判斷；'amount' 代表門檻用實際結算金額（總付款金額）判斷
// chooseFrom: 'ampoule' | 'spray' | 'salonSeries' | 'pv2250' | null（null 代表固定贈品，不需選擇）

export type GiftChooseFrom = 'ampoule' | 'spray' | 'salonSeries' | 'pv2250' | null;

export interface GiftItem {
  label: string;
  qty: number;
  unit: string;
  chooseFrom: GiftChooseFrom;
}

export interface GiftTier {
  id: string;
  thresholdValue: number;
  basis: 'pv' | 'amount';
  items: GiftItem[];
}

// 安瓶保養組可任選的系列（對應商品庫中實際的 4 款安瓶保養組商品）
export const AMPOULE_SET_OPTIONS = [
  '熨斗系列安瓶保養組',
  '38都都好安瓶保養組',
  '58淨膚安瓶保養組',
  '晶亮安瓶保養組',
];

// 120ml 噴液任選的可選商品
export const SPRAY_120ML_OPTIONS = [
  '(26號)柔敏C白精華噴液(小)',
  '38-7 都都好精華液',
  '58-8 隱痕定格液',
  'D7-晶亮修護精華液',
];

// 系列保養沙龍組可任選的系列
export const SALON_SET_SERIES_OPTIONS = [
  '熨斗系列',
  '淨膚系列',
  '都都好系列',
  '晶亮系列',
];

export const GIFT_TIERS: GiftTier[] = [
  {
    id: 'tier1',
    thresholdValue: 19000,
    basis: 'pv',
    items: [
      { label: '安瓶保養組', qty: 1, unit: '組', chooseFrom: 'ampoule' },
    ],
  },
  {
    id: 'tier2',
    thresholdValue: 30000,
    basis: 'pv',
    items: [
      { label: '安瓶保養組', qty: 2, unit: '組', chooseFrom: 'ampoule' },
    ],
  },
  {
    id: 'tier3',
    thresholdValue: 88000,
    basis: 'pv',
    items: [
      { label: '安瓶保養組', qty: 5, unit: '組', chooseFrom: 'ampoule' },
      { label: '120ml噴液任選', qty: 1, unit: '瓶', chooseFrom: 'spray' },
      { label: '2250PV產品任選', qty: 1, unit: '瓶', chooseFrom: 'pv2250' },
    ],
  },
  {
    id: 'tier4',
    thresholdValue: 120000,
    basis: 'pv',
    items: [
      { label: '安瓶保養組', qty: 11, unit: '組', chooseFrom: 'ampoule' },
      { label: '120ml噴液任選', qty: 1, unit: '瓶', chooseFrom: 'spray' },
      { label: '38修護柔敏膠原凝露', qty: 1, unit: '瓶', chooseFrom: null },
      { label: '2250PV產品任選', qty: 1, unit: '瓶', chooseFrom: 'pv2250' },
    ],
  },
  {
    id: 'tier5',
    thresholdValue: 298000,
    basis: 'amount',
    items: [
      { label: '無痕塑形筋膜儀', qty: 1, unit: '台', chooseFrom: null },
      { label: '安瓶保養組', qty: 23, unit: '組', chooseFrom: 'ampoule' },
      { label: '38修護柔敏膠原凝露', qty: 2, unit: '瓶', chooseFrom: null },
      { label: '系列保養沙龍組', qty: 1, unit: '套', chooseFrom: 'salonSeries' },
      { label: '2250PV產品任選', qty: 1, unit: '瓶', chooseFrom: 'pv2250' },
    ],
  },
];
