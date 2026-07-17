// 各系列的「完整使用流程」— 對應店家提供的使用說明圖
// productNumber 需對應 products.ts 裡的 productNumber 欄位

export interface UsageStep {
  step: number;
  productNumber: string;
  note?: string;
}

export interface SeriesUsageGuide {
  steps: UsageStep[];
  fullSetLabel: string; // 整套提示橫幅顯示的編號清單文字
}

export const USAGE_SEQUENCES: Record<string, SeriesUsageGuide> = {
  '熨斗系列(小)': {
    steps: [
      { step: 1, productNumber: '26號', note: '距離 15 公分噴灑，不需拍打' },
      { step: 2, productNumber: '0號' },
      { step: 3, productNumber: '1號' },
      { step: 4, productNumber: '2號', note: '使用前搖一搖，搭配拉提手法按摩' },
      { step: 5, productNumber: '3號' },
      { step: 6, productNumber: '4號' },
      { step: 7, productNumber: '5-2號' },
      { step: 8, productNumber: '6號' },
      { step: 9, productNumber: '7號' },
      { step: 10, productNumber: '26號', note: '全臉噴灑，作為最後一道防護與保濕' },
    ],
    fullSetLabel: '0號、1號、2號、3號、4號、5-1或5-2號、6號、7號、26號',
  },
  '熨斗系列(大)': {
    steps: [
      { step: 1, productNumber: '26號', note: '距離 15 公分噴灑，不需拍打' },
      { step: 2, productNumber: '0號' },
      { step: 3, productNumber: '1號' },
      { step: 4, productNumber: '2號', note: '使用前搖一搖，搭配拉提手法按摩' },
      { step: 5, productNumber: '3號' },
      { step: 6, productNumber: '4號' },
      { step: 7, productNumber: '5-2號' },
      { step: 8, productNumber: '6號' },
      { step: 9, productNumber: '7號' },
      { step: 10, productNumber: '26號', note: '全臉噴灑，作為最後一道防護與保濕' },
    ],
    fullSetLabel: '0號、1號、2號、3號、4號、5-1或5-2號、6號、7號、26號',
  },
  '都都好系列': {
    steps: [
      { step: 1, productNumber: '38-7', note: '距離 15 公分噴灑，不需拍打' },
      { step: 2, productNumber: '38-1' },
      { step: 3, productNumber: '38-2' },
      { step: 4, productNumber: '38-3' },
      { step: 5, productNumber: '38-4' },
      { step: 6, productNumber: '38-5' },
      { step: 7, productNumber: '38-6' },
      { step: 8, productNumber: '38-7', note: '全臉噴灑，作為最後一道防護與保濕' },
    ],
    fullSetLabel: '38-1、38-2、38-3、38-4、38-5、38-6、38-7',
  },
  '淨膚系列': {
    steps: [
      { step: 1, productNumber: '58-8', note: '距離 15 公分噴灑，不需拍打' },
      { step: 2, productNumber: '58-1' },
      { step: 3, productNumber: '58-2' },
      { step: 4, productNumber: '58-3' },
      { step: 5, productNumber: '58-4' },
      { step: 6, productNumber: '58-5' },
      { step: 7, productNumber: '58-6' },
      { step: 8, productNumber: '58-7' },
      { step: 9, productNumber: '58-8', note: '全臉噴灑，作為最後一道防護與保濕' },
    ],
    fullSetLabel: '58-1、58-2、58-3、58-4、58-5、58-6、58-7、58-8',
  },
};
