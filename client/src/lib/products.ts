/**
 * 格柏蕾蒂產品資料庫
 * 包含所有產品系列、分類與價格資訊
 */

export interface Product {
  id: string;
  name: string;
  productNumber: string;  // 產品編號（如 38號、6號）
  productTitle: string;   // 產品名稱（如 修護柔敏膠原凝露）
  category: string;
  series: string;
  price: number;
  memberPrice?: number;   // 會員價
  description: string;
  image?: string;
  benefits?: string[];
  size?: string;
  volume?: string;
  pv?: number;            // PV 點數
  featured?: boolean;
  featuredOrder?: number;
  // 詳細信息
  ingredients?: string;   // 主要成分
  usage?: string;         // 用途
  instructions?: string;  // 用法
  storage?: string;       // 保存方式
  precautions?: string[]; // 使用注意事項
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

// 產品分類
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'all',
    name: '全部產品',
    icon: '🌿',
    description: '所有格柏蕾蒂產品'
  },
  {
    id: 'micro-lifting-small',
    name: '熨斗系列(小)',
    icon: '✨',
    description: '重啟肃膚年輕密碼'
  },
  {
    id: 'micro-lifting-large',
    name: '熨斗系列(大)',
    icon: '✨',
    description: '重啟肃膚年輕密碼'
  },
  {
    id: 'cleansing',
    name: '淨膚系列',
    icon: '🧼',
    description: '穩膚修護全面舒緩'
  },
  {
    id: 'skin-care',
    name: '都都好系列',
    icon: '🎯',
    description: '控油抗痘、修護肌膚'
  },
  {
    id: 'brightening',
    name: '晶亮系列',
    icon: '💎',
    description: '肌因修護、重建健康肌本'
  },
  {
    id: 'elasticity',
    name: 'Q彈精緻系列',
    icon: '🎀',
    description: '提升肌膚彈性與光澤'
  },
  {
    id: 'essential-oil',
    name: '精油系列',
    icon: '🌸',
    description: '天然植物精油護理'
  },
  {
    id: 'cleaning',
    name: '清潔系列',
    icon: '🧴',
    description: '深層清潔護理'
  },
  {
    id: 'special',
    name: '特殊系列',
    icon: '🌟',
    description: '專業護理產品'
  },
  {
    id: 'bust',
    name: '美胸系列',
    icon: '💄',
    description: '提升胸部線條與彈性'
  }
];

// 完整產品清單
export const PRODUCTS: Product[] = [
  // 熨斗系列(小)
  {
    id: '0-1',
    productNumber: '0號',
    productTitle: '晶瑩剔透修膚霜(小)',
    name: '(0號)晶瑩剔透修膚霜(小)',
    category: 'micro-lifting-small',
    series: '熨斗系列(小)',
    price: 3320,
    memberPrice: 2980,
    description: '強化皮膚防禦力、舒緩肌膚、水嫩、光滑',
    image: '/01.jpg',
    benefits: ['修護', '晶亮', '緊緻'],
    size: '小',
    volume: '30ml',
    pv: 2533,
    ingredients: '金縷梅、玻尿酸、山茶花提取液、蘆薈汁葉萃取液',
    usage: '增強皮膚防禦力，舒緩肌膚、水嫩、光滑',
    instructions: '微整系列第1瓶，0號是一道防護膜，早、晚潔膚後，取適量塗抹於臉上',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '金縷梅萃取具天然收斂毛孔、控油效果，擁有抗發炎與抗菌特性',
      '幫助皮膚回復健康穩定'
    ]
  },
  {
    id: '1-1',
    productNumber: '1號',
    productTitle: '水合柔膚精華液(小)',
    name: '(1號)水合柔膚精華液(小)',
    category: 'micro-lifting-small',
    series: '熨斗系列(小)',
    price: 4430,
    memberPrice: 3980,
    description: '以複合式植物配方、補水，舒緩乾燥不適感及肌膚壓力',
    image: '/01.jpg',
    benefits: ['保濕', '柔膚', '水合'],
    size: '小',
    volume: '30ml',
    pv: 3383,
    ingredients: '蘆薈汁葉萃取液、銀杏萃取液、玻尿酸',
    usage: '以複合式植物配方，讓肌膚補水，舒緩肌膚（乾燥）不適感、舒緩肌膚壓力',
    instructions: '0號使用後，接續使用1號，使臉部快速補水，能使後面其他產品使用快速吸收，早晚取適量塗抹於臉上',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '蘆薈汁葉萃取是「肌膚的天然急救箱」，富含天然多醣體與胺基酸，能迅速補充水分',
      '促進肌膚自我修復、加快受損組織癒合，減少肌膚發炎與感染機會'
    ]
  },
  {
    id: '2號-熨斗小-s',
    productNumber: '2號',
    productTitle: '回春精華液(小)',
    name: '(2號)回春精華液(小)',
    category: 'micro-lifting-small',
    series: '熨斗系列(小)',
    price: 3100,
    memberPrice: 2780,
    description: '淡化(撒平)筲紋、細紋、紋路，使肉沂緊致、水嫩',
    image: '/01.jpg',
    benefits: ['回春', '逆齢', '精華'],
    size: '小',
    volume: '30ml',
    pv: 2250,
    ingredients: '歐錦葵花萃取液、榲基海帶提取物、玻尿酸、歐洲緞萃取液',
    usage: '淡化（撫平）皺紋、細紋、紋路，肌膚緊緻、水嫩',
    instructions: '在1號使用完後，早、晚潔膚後，取適量2號塗抹於臉上，用手掌溫度將臉頰的肌膚往太陽穴方向按摩提拉來回做4-5次即可',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '歐錦葵花萃取含有類黃酮與維他命C等抗氧化成分，能幫助對抗自由基傷害',
      '平滑肌膚並延緩肌膚老化現象，提升肌膚防禦力'
    ]
  },
  {
    id: '3-1',
    productNumber: '3號',
    productTitle: '亮采A精華液(小)',
    name: '(3號)亮采A精華液(小)',
    category: 'micro-lifting-small',
    series: '熨斗系列(小)',
    price: 3320,
    memberPrice: 2980,
    description: '回複肌膚彈性，使肌膚皙白水嫩',
    image: '/01.jpg',
    benefits: ['亮采', '提亮', '精華'],
    size: '小',
    volume: '30ml',
    pv: 2533,
    ingredients: '蘆薈汁葉萃取液、榲基海帶提取物、玻尿酸',
    usage: '回復肌膚彈性，使肌膚暫白水嫩',
    instructions: '早晚潔膚後，2號使用完後取適量3號塗抹於臉上，快速塗勻請勿拍打按摩',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '榲基海帶提取物來自北大西洋冷水域的褐藻，含有大量天然海藻多醣體，能在肌膚表面形成保濕薄膜',
      '快速補水同時鎖住水分，改善乾燥、粗糙與脫屑問題，強化角質層結構'
    ]
  },
  {
    id: '4號-熨斗小-s',
    productNumber: '4號',
    productTitle: '亮采B精華霜(小)',
    name: '(4號)亮采B精華霜(小)',
    category: 'micro-lifting-small',
    series: '熨斗系列(小)',
    price: 3100,
    memberPrice: 2780,
    description: '滋潤肌膚，預防皮膚乾燥，使肌膚回複柔順平和的線條及嫩白',
    image: '/02.jpg',
    benefits: ['亮采', '修護', '精華'],
    size: '小',
    volume: '30ml',
    pv: 2250,
    ingredients: '銀杏葉萃取液、全綠葉澳洲堅果籽油、蘆薈汁葉萃取液、葡萄籽萃取液、玻尿酸',
    usage: '滋潤肌膚，預防皮膚乾燥，使肌膚回復柔順平和的線條及嫩白',
    instructions: '早晚潔膚後，3號使用完後取適量4號塗抹於臉上，快速塗勻請勿拍打按摩',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '葡萄籽萃取能夠保護並促進膠原蛋白與彈力蛋白的生成，減少黑色素生成',
      '抗發炎特性可穩定肌膚，修護外在刺激造成的傷害，幫助恢復健康的肌膚狀態'
    ]
  },
  {
    id: '5-1號-熨斗小-s',
    productNumber: '5-1號',
    productTitle: '亮采膠原保濕乳(小)',
    name: '(5-1號)亮采膠原保濕乳(小)',
    category: 'micro-lifting-small',
    series: '熨斗系列(小)',
    price: 3100,
    memberPrice: 2780,
    description: '形成保護膜，潤滋、舒緩肌膚乾燥、預防乾裂，能使肌膚光滑',
    image: '/02.jpg',
    benefits: ['膠原', '保濕', '修護'],
    size: '小',
    volume: '30ml',
    pv: 2250,
    ingredients: '去離子水、蘆薈汁葉萃取液、葡萄籽萃取、銀杏萃取液、玻尿酸',
    usage: '形成肌膚保護膜，減少肌膚乾澀、脫屑，潤澤滋養，舒緩肌膚乾燥，預防乾裂，使肌膚潤澤光滑',
    instructions: '早晚潔膚後，4號使用完後取適量5-1號塗抹於臉上；乾燥、脫屑肌膚可加強使用（油性、痘痘肌膚不適合），適合超乾性、粗糙、冬天缺水、脫屑發紅肌',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '銀杏葉萃取液具有非常強的抗氧化、抗發炎與保護膠原蛋白作用，減少膠原流失',
      '延緩鬆弛細紋產生，減少泛紅、發炎反應，穩定膚況'
    ]
  },
  {
    id: '5-2號-熨斗小-s',
    productNumber: '5-2號',
    productTitle: '龍血膠原保濕乳(小)',
    name: '(5-2號)龍血膠原保濕乳(小)',
    category: 'micro-lifting-small',
    series: '熨斗系列(小)',
    price: 3100,
    memberPrice: 2780,
    description: '形成肌膚保護膜，調理肌膚油水平衡',
    image: '/01.jpg',
    benefits: ['膠原', '保濕', '龍血'],
    size: '小',
    volume: '30ml',
    pv: 2250,
    ingredients: '去離子水、綠葉龍血樹萃取、蘆薈汁葉萃取液、葡萄籽提取物、銀杏萃取液',
    usage: '形成肌膚保護膜，也能調理肌膚油水平衡',
    instructions: '早晚潔膚後，4號使用完後取適量5-2號塗抹於臉上',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '綠葉龍血樹萃取被稱為「天然癒合劑」，具有強效修護、抗炎舒緩、抗老化與肌膚防禦力提升等多重功能',
      '被譽為「天然肌膚守護膜」'
    ]
  },
  {
    id: '6號-熨斗小-s',
    productNumber: '6號',
    productTitle: '晶緻人蔘C白修護霜(小)',
    name: '(6號)晶緻人蔘C白修護霜(小)',
    category: 'micro-lifting-small',
    series: '熨斗系列(小)',
    price: 3100,
    memberPrice: 2780,
    description: '人蔘萃取液，可淡化皺紋，延緩肌膚老化， 使皮膚水嫩白皙',
    image: '/02.jpg',
    benefits: ['中性肌', '黑眼圈', '美白'],
    size: '小',
    volume: '30ml',
    pv: 2250,
    featured: true,
    featuredOrder: 2,
    ingredients: '去離子水、蘆藤汇葉萃取液、德國洋甘菊萃取液、銀枘葉萃取液、模基海帶提取物、月見草萃取液、人蔘萃取液',
    usage: '延緩老化，提亮膚色，褪黑去黃，使肌膚水嫩皙白。',
    instructions: '早晩潔膚後，5號使用完後取適量6號涂抹於臉上',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: ['人蔘萃取具有人蔘皂苷，能深入肌底激活細胞', '提升肌膚代謝力，涂抹在肌膚上能快速形成一層隱形防護膜']
  },
  {
    id: '7-1',
    productNumber: '7號',
    productTitle: '活膚煥采亮顏乳(小)',
    name: '(7號)活膚煥采亮顏乳(小)',
    category: 'micro-lifting-small',
    series: '熨斗系列(小)',
    price: 2550,
    memberPrice: 2250,
    description: '防曬養膚一瓶搞定，月見草油是女性聖品，避免皮膚紫外線傷害',
    image: '/02.jpg',
    benefits: ['防曬隔離', '提亮', '修復'],
    size: '小',
    volume: '30ml',
    pv: 1750,
    featured: true,
    featuredOrder: 6,
    ingredients: '去離子水、月見花萃取、德國洋甘菊萃取液、桑白根萃取液、玻尿酸、石榴果皮萃取',
    usage: '內含有50%的防塵隔離效果與50%的保養品',
    instructions: '早上潔膚後，6號使用完後取適量7號與塗抹於臉上',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: ['月見草油是女性聖品，能使皮膚遇到紫外線傷害時，與防塵隔離成分互相配合，一邊防塵隔離一邊修補', '石榴果皮萃取能夠有效中和自由基，抵禦光老化與環境壓力對肌膚造成的傷害，延緩肌膚鬆弛，抑制黑色素生成']
  },
  {
    id: '26號-熨斗小-s',
    productNumber: '26號',
    productTitle: '柔敏C白精華噴液(小)',
    name: '(26號)柔敏C白精華噴液(小)',
    category: 'micro-lifting-small',
    series: '熨斗系列(小)',
    price: 3100,
    memberPrice: 2780,
    description: '使肌膚補充水分，使肌膚光滑、水嫩，白天防曬後仍可補水保濕',
    image: '/03.jpg',
    benefits: ['柔敏', '美白', '噫液'],
    size: '小',
    volume: '120ml',
    pv: 2250,
    ingredients: '蘋果萃取液、榲基海帶提取物、透明質酸',
    usage: '使肌膚補充水分，使肌膚光滑、水嫩，白天防曬後仍可進行補水保濕',
    instructions: '於所有保養品、彩妝品後使用，每3～4小時補充一次，距離臉部約15-20公分讓噴霧散射出的幅度更廣，才能均勻吸收，請勿拍打肌膚，讓噴液自然吸收',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '蘋果萃取液富含多種天然營養素，幫助溫和代謝老廢角質，改善毛孔粗大、膚色暗沉',
      '讓肌膚更細緻透亮，有效抵禦自由基傷害，減少細紋與彈性流失'
    ]
  },

  // 熨斗系列(大)
  {
    id: '0-2',
    productNumber: '0號',
    productTitle: '晶瑩剔透修膚霜(大)',
    name: '(0號)晶瑩剔透修膚霜(大)',
    category: 'micro-lifting-large',
    series: '熨斗系列(大)',
    price: 9300,
    memberPrice: 8380,
    description: '強化皮膚防禦力、舒緩肌膚、水嫩、光滑',
    image: '/03.jpg',
    benefits: ['修護', '晶亮', '緊緻'],
    size: '大',
    volume: '120ml',
    pv: 7038,
    ingredients: '金縷梅、玻尿酸、山茶花提取液、蘆薈汁葉萃取液',
    usage: '增強皮膚防禦力，舒緩肌膚、水嫩、光滑',
    instructions: '微整系列第1瓶，0號是一道防護膜，早、晚潔膚後，取適量塗抹於臉上',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '金縷梅萃取具天然收斂毛孔、控油效果，擁有抗發炎與抗菌特性',
      '幫助皮膚回復健康穩定'
    ]
},
  {
    id: '1-2',
    productNumber: '1號',
    productTitle: '水合柔膚精華液(大)',
    name: '(1號)水合柔膚精華液(大)',
    category: 'micro-lifting-large',
    series: '熨斗系列(大)',
    price: 9300,
    memberPrice: 8380,
    description: '以複合式植物配方、補水，舒緩乾燥不適感及肌膚壓力',
    image: '/03.jpg',
    benefits: ['保濕', '柔膚', '水合'],
    size: '大',
    volume: '120ml',
    pv: 7038,
    ingredients: '蘆薈汁葉萃取液、銀杏萃取液、玻尿酸',
    usage: '以複合式植物配方，讓肌膚補水，舒緩肌膚（乾燥）不適感、舒緩肌膚壓力',
    instructions: '0號使用後，接續使用1號，使臉部快速補水，能使後面其他產品使用快速吸收，早晚取適量塗抹於臉上',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '蘆薈汁葉萃取是「肌膚的天然急救箱」，富含天然多醣體與胺基酸，能迅速補充水分',
      '促進肌膚自我修復、加快受損組織癒合，減少肌膚發炎與感染機會'
    ]
},
  {
    id: '2-2',
    productNumber: '2號',
    productTitle: '回春精華液(大)',
    name: '(2號)回春精華液(大)',
    category: 'micro-lifting-large',
    series: '熨斗系列(大)',
    price: 9300,
    memberPrice: 8380,
    description: '淡化(撫平)皺紋、細紋、紋路，使肌膚緊緻、水嫩',
    image: '/03.jpg',
    benefits: ['回春', '逆齡', '精華'],
    size: '大',
    volume: '120ml',
    pv: 7038,
    ingredients: '歐錦葵花萃取液、榲基海帶提取物、玻尿酸、歐洲緞萃取液',
    usage: '淡化（撫平）皺紋、細紋、紋路，肌膚緊緻、水嫩',
    instructions: '在1號使用完後，早、晚潔膚後，取適量2號塗抹於臉上，用手掌溫度將臉頰的肌膚往太陽穴方向按摩提拉來回做4-5次即可',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '歐錦葵花萃取含有類黃酮與維他命C等抗氧化成分，能幫助對抗自由基傷害',
      '平滑肌膚並延緩肌膚老化現象，提升肌膚防禦力'
    ]
},
  {
    id: '3-2',
    productNumber: '3號',
    productTitle: '亮采A精華液(大)',
    name: '(3號)亮采A精華液(大)',
    category: 'micro-lifting-large',
    series: '熨斗系列(大)',
    price: 9300,
    memberPrice: 8380,
    description: '回復肌膚彈性，使肌膚皙白水嫩',
    image: '/03.jpg',
    benefits: ['亮采', '提亮', '精華'],
    size: '大',
    volume: '120ml',
    pv: 7038,
    ingredients: '蘆薈汁葉萃取液、榲基海帶提取物、玻尿酸',
    usage: '回復肌膚彈性，使肌膚暫白水嫩',
    instructions: '早晚潔膚後，2號使用完後取適量3號塗抹於臉上，快速塗勻請勿拍打按摩',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '榲基海帶提取物來自北大西洋冷水域的褐藻，含有大量天然海藻多醣體，能在肌膚表面形成保濕薄膜',
      '快速補水同時鎖住水分，改善乾燥、粗糙與脫屑問題，強化角質層結構'
    ]
},
  {
    id: '4-2',
    productNumber: '4號',
    productTitle: '亮采B精華霜(大)',
    name: '(4號)亮采B精華霜(大)',
    category: 'micro-lifting-large',
    series: '熨斗系列(大)',
    price: 3100,
    memberPrice: 8180,
    description: '滋潤肌膚，預防皮膚乾燥，使肌膚回復柔順平和的線條及嫩白',
    image: '/03.jpg',
    benefits: ['亮采', '修護', '精華'],
    size: '大',
    volume: '120ml',
    pv: 6783,
    ingredients: '銀杏葉萃取液、全綠葉澳洲堅果籽油、蘆薈汁葉萃取液、葡萄籽萃取液、玻尿酸',
    usage: '滋潤肌膚，預防皮膚乾燥，使肌膚回復柔順平和的線條及嫩白',
    instructions: '早晚潔膚後，3號使用完後取適量4號塗抹於臉上，快速塗勻請勿拍打按摩',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '葡萄籽萃取能夠保護並促進膠原蛋白與彈力蛋白的生成，減少黑色素生成',
      '抗發炎特性可穩定肌膚，修護外在刺激造成的傷害，幫助恢復健康的肌膚狀態'
    ]
},
  {
    id: '5-1-2',
    productNumber: '5-1號',
    productTitle: '亮采膠原保濕乳(大)',
    name: '(5-1號)亮采膠原保濕乳(大)',
    category: 'micro-lifting-large',
    series: '熨斗系列(大)',
    price: 9080,
    memberPrice: 8180,
    description: '形成保護膜，潤滋、舒緩肌膚乾燥、預防乾裂，能使肌膚光滑',
    image: '/03.jpg',
    benefits: ['膠原', '保濕', '修護'],
    size: '大',
    volume: '120ml',
    pv: 6783,
    ingredients: '去離子水、蘆薈汁葉萃取液、葡萄籽萃取、銀杏萃取液、玻尿酸',
    usage: '形成肌膚保護膜，減少肌膚乾澀、脫屑，潤澤滋養，舒緩肌膚乾燥，預防乾裂，使肌膚潤澤光滑',
    instructions: '早晚潔膚後，4號使用完後取適量5-1號塗抹於臉上；乾燥、脫屑肌膚可加強使用（油性、痘痘肌膚不適合），適合超乾性、粗糙、冬天缺水、脫屑發紅肌',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '銀杏葉萃取液具有非常強的抗氧化、抗發炎與保護膠原蛋白作用，減少膠原流失',
      '延緩鬆弛細紋產生，減少泛紅、發炎反應，穩定膚況'
    ]
},
  {
    id: '5-2-2',
    productNumber: '5-2號',
    productTitle: '龍血膠原保濕乳(大)',
    name: '(5-2號)龍血膠原保濕乳(大)',
    category: 'micro-lifting-large',
    series: '熨斗系列(大)',
    price: 9080,
    memberPrice: 8180,
    description: '形成肌膚保護膜，調理肌膚油水平衡',
    image: '/03.jpg',
    benefits: ['膠原', '保濕', '龍血'],
    size: '大',
    volume: '120ml',
    pv: 6783,
    ingredients: '去離子水、綠葉龍血樹萃取、蘆薈汁葉萃取液、葡萄籽提取物、銀杏萃取液',
    usage: '形成肌膚保護膜，也能調理肌膚油水平衡',
    instructions: '早晚潔膚後，4號使用完後取適量5-2號塗抹於臉上',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '綠葉龍血樹萃取被稱為「天然癒合劑」，具有強效修護、抗炎舒緩、抗老化與肌膚防禦力提升等多重功能',
      '被譽為「天然肌膚守護膜」'
    ]
},
  {
    id: '6-2',
    productNumber: '6號',
    productTitle: '晶緻人蔘C白修護霜(大)',
    name: '(6號)晶緻人蔘C白修護霜(大)',
    category: 'micro-lifting-large',
    series: '熨斗系列(大)',
    price: 9080,
    memberPrice: 8180,
    description: '人蔘萃取液，可淡化皺紋，延緩肌膚老化，使皮膚水嫩皙白',
    image: '/04.PNG',
    benefits: ['人蔘', '美白', '修護'],
    size: '大',
    volume: '120ml',
    pv: 6783,
    ingredients: '去離子水、蘆薈汁葉萃取液、德國洋甘菊萃取液、銀杏葉萃取液、榲基海帶提取物、月見草萃取液、人蔘萃取液',
    usage: '淡化皺紋，延緩肌膚老化，使皮膚水嫩皙白',
    instructions: '早晚潔膚後，5號（5-1或5-2）使用完後取適量6號塗抹於臉上',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '人蔘萃取富含人蔘皂苷，能深入肌底激活細胞，提升肌膚代謝力',
      '快速形成一層「隱形防護層」，有效隔離外界刺激（污染、灰塵、紫外線），提升肌膚自我防禦力'
    ]
},
  {
    id: '7-2',
    productNumber: '7號',
    productTitle: '活膚煥采亮顏乳(大)',
    name: '(7號)活膚煥采亮顏乳(大)',
    category: 'micro-lifting-large',
    series: '熨斗系列(大)',
    price: 7480,
    memberPrice: 6750,
    description: '防曬養膚一瓶搞定，月見草油是女性聖品，避免皮膚紫外線傷害',
    image: '/04.PNG',
    benefits: ['活膚', '煥采', '亮顏'],
    size: '大',
    volume: '120ml',
    pv: 5253,
    ingredients: '去離子水、月見花萃取、德國洋甘菊萃取液、桑白根萃取液、玻尿酸、石榴果皮萃取',
    usage: '內含50%防曬隔離效果與50%保養品，月見草油能使皮膚遇紫外線傷害時與防曬隔離成分互相配合，一個防曬隔離一個修護',
    instructions: '早上潔膚後，6號使用完後取適量7號均勻塗抹於臉上',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '石榴果皮萃取有效中和自由基，抵禦光老化與環境壓力對肌膚造成的傷害',
      '延緩肌膚鬆弛、暗沉，抑制黑色素生成，達到淡斑、亮白膚色效果'
    ]
},
  {
    id: '26-2',
    productNumber: '26號',
    productTitle: '柔敏C白精華噴液(大)',
    name: '(26號)柔敏C白精華噴液(大)',
    category: 'micro-lifting-large',
    series: '熨斗系列(大)',
    price: 9080,
    memberPrice: 8180,
    description: '使肌膚補充水分，使肌膚光滑、水嫩，白天防曬後仍可補水保濕',
    image: '/05.jpg',
    benefits: ['柔敏', '美白', '精華'],
    size: '大',
    volume: '500ml',
    pv: 6783,
    ingredients: '蘋果萃取液、榲基海帶提取物、透明質酸',
    usage: '使肌膚補充水分，使肌膚光滑、水嫩，白天防曬後仍可進行補水保濕',
    instructions: '於所有保養品、彩妝品後使用，每3～4小時補充一次，距離臉部約15-20公分讓噴霧散射出的幅度更廣，才能均勻吸收，請勿拍打肌膚，讓噴液自然吸收',
    storage: '存放於陰涼乾燥處，避免陽光直射',
    precautions: [
      '蘋果萃取液富含多種天然營養素，幫助溫和代謝老廢角質，改善毛孔粗大、膚色暗沉',
      '讓肌膚更細緻透亮，有效抵禦自由基傷害，減少細紋與彈性流失'
    ]
},

  // 都都好系列 (38系列)
  {
    id: '38-1-都都好-m',
    productNumber: '38-1',
    productTitle: '都都好亮顏乳',
    name: '38-1 都都好亮顏乳',
    category: 'skin-care',
    series: '都都好系列',
    price: 3100,
    memberPrice: 2780,
    description: '控油抵痘，淡化痘疤與粉刷，收斂毛孔',
    image: '/06.jpg',
    benefits: ['控油', '抵痘', '亮顏'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: '38-2-都都好-m',
    productNumber: '38-2',
    productTitle: '都都好美顔液',
    name: '38-2 都都好美顔液',
    category: 'skin-care',
    series: '都都好系列',
    price: 3100,
    memberPrice: 2780,
    description: '深層清潔，改善膚質',
    image: '/06.jpg',
    benefits: ['清潔', '美顔', '修護'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: '38-3-都都好-m',
    productNumber: '38-3',
    productTitle: '都都好美顔露',
    name: '38-3 都都好美顔露',
    category: 'skin-care',
    series: '都都好系列',
    price: 3100,
    memberPrice: 2780,
    description: '舅緩肌膚，增進吸收',
    image: '/07.jpg',
    benefits: ['舅緩', '保濕', '吸收'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: '38-4-都都好-m',
    productNumber: '38-4',
    productTitle: '都都好修護液',
    name: '38-4 都都好修護液',
    category: 'skin-care',
    series: '都都好系列',
    price: 3100,
    memberPrice: 2780,
    description: '修護受損肌膚，強化屏障',
    image: '/08.jpg',
    benefits: ['修護', '保護', '強化'],
    size: '標準',
    volume: '60ml',
    pv: 2250
  },
  {
    id: '38-5-都都好-m',
    productNumber: '38-5',
    productTitle: '都都好凝露',
    name: '38-5 都都好凝露',
    category: 'skin-care',
    series: '都都好系列',
    price: 3100,
    memberPrice: 2780,
    description: '凝聘精華，深層滋養',
    image: '/09.jpg',
    benefits: ['凝露', '滋養', '精華'],
    size: '標準',
    volume: '50ml',
    pv: 2250
  },
  {
    id: '38-6-都都好-m',
    productNumber: '38-6',
    productTitle: '都都好美顏霜',
    name: '38-6 都都好美顏霜',
    category: 'skin-care',
    series: '都都好系列',
    price: 3100,
    memberPrice: 2780,
    description: '痘痘肌專用，人蔘萃取液，能改善暗沉淡化痘疤，使肌膚嫩白',
    featured: true,
    featuredOrder: 3,
    image: '/07.jpg',
    benefits: ['痘痘肌', '痘疤', '美白'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: '38-7-都都好-m',
    productNumber: '38-7',
    productTitle: '都都好精華液',
    name: '38-7 都都好精華液',
    category: 'skin-care',
    series: '都都好系列',
    price: 3100,
    memberPrice: 2780,
    description: '高濃度精華，深層修護',
    image: '/03.jpg',
    benefits: ['精華', '修護', '高效'],
    size: '標準',
    volume: '120ml',
    pv: 2250
  },
  {
    id: '38-8-10',
    productNumber: '38-8',
    productTitle: '都都好精華粉與原液',
    name: '38-8 都都好精華粉與原液',
    category: 'skin-care',
    series: '都都好系列',
    price: 4400,
    description: '粉液結合，雙重功效',
    image: '/10.jpg',
    benefits: ['精華', '粉體', '高效'],
    size: '標準',
    volume: '10件組',
    pv: 3740
  },
  {
    id: '38-8-1',
    productNumber: '38-8',
    productTitle: '都都好精華粉與原液',
    name: '38-8 都都好精華粉與原液',
    category: 'skin-care',
    series: '都都好系列',
    price: 580,
    description: '粉液結合，雙重功效',
    image: '/10.jpg',
    benefits: ['精華', '粉體', '高效'],
    size: '標準',
    volume: '1件組',
    pv: 464
  },
  // 淨膚系列 (58系列)
  {
    id: '58-1',
    productNumber: '58-1',
    productTitle: '淨膚凝露',
    name: '58-1 淨膚凝露',
    category: 'cleansing',
    series: '淨膚系列',
    price: 2980,
    memberPrice: 2980,
    description: '溫和清潔，穩定膚況',
    image: '/11.jpg',
    benefits: ['清潔', '穩定', '溫和'],
    size: '標準',
    volume: '30ml',
    pv: 2533
  },
  {
    id: '58-2-淨膚-m',
    productNumber: '58-2',
    productTitle: '修護原液',
    name: '58-2 修護原液',
    category: 'cleansing',
    series: '淨膚系列',
    price: 3100,
    memberPrice: 2780,
    description: '深層修護，舒緩敏感',
    image: '/12.jpg',
    benefits: ['修護', '舒緩', '敏感'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: '58-3-淨膚-m',
    productNumber: '58-3',
    productTitle: '淨膚滋養露',
    name: '58-3 淨膚滋養露',
    category: 'cleansing',
    series: '淨膚系列',
    price: 3100,
    memberPrice: 2780,
    description: '滋養保濕，維持平衡',
    image: '/11.jpg',
    benefits: ['滋養', '保濕', '平衡'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: '58-4-淨膚-m',
    productNumber: '58-4',
    productTitle: '淨膚修護精華液',
    name: '58-4 淨膚修護精華液',
    category: 'cleansing',
    series: '淨膚系列',
    price: 3100,
    memberPrice: 2780,
    description: '精華濃縮，快速吸收',
    image: '/12.jpg',
    benefits: ['精華', '吸收', '修護'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: '58-5-淨膚-m',
    productNumber: '58-5',
    productTitle: '淨膚修護霜',
    name: '58-5 淨膚修護霜',
    category: 'cleansing',
    series: '淨膚系列',
    price: 3100,
    memberPrice: 2780,
    description: '豐富滋潤，全面護理',
    image: '/11.jpg',
    benefits: ['滋潤', '護理', '修護'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: '58-6-淨膚-m',
    productNumber: '58-6',
    productTitle: '淨膚珍珠霜',
    name: '58-6 淨膚珍珠霜',
    category: 'cleansing',
    series: '淨膚系列',
    price: 3100,
    memberPrice: 2780,
    description: '珍珠精華，提亮膚色',
    image: '/11.jpg',
    benefits: ['珍珠', '提亮', '光澤'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: '58-7-淨膚-m',
    productNumber: '58-7',
    productTitle: '貴婦淨膚霜',
    name: '58-7 貴婦淨膚霜',
    category: 'cleansing',
    series: '淨膚系列',
    price: 3100,
    memberPrice: 2780,
    description: '當歸萃取液，能淡化皺紋，延緩老化，使皮膚水嫩、白皙',
    featured: true,
    featuredOrder: 4,
    image: '/11.jpg',
    benefits: ['極乾肌', '淡斑', '美白'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: '58-8-淨膚-m',
    productNumber: '58-8',
    productTitle: '隱痕定格液',
    name: '58-8 隱痕定格液',
    category: 'cleansing',
    series: '淨膚系列',
    price: 2780,
    memberPrice: 2780,
    description: '淨膚精華，深層修護',
    image: '/03.jpg',
    benefits: ['精華', '修護', '淨膚'],
    size: '標準',
    volume: '120ml',
    pv: 2250
  },
  {
    id: '58-9-3',
    productNumber: '58-9',
    productTitle: '淨膚精華粉與原液',
    name: '58-9 淨膚精華粉與原液',
    category: 'cleansing',
    series: '淨膚系列',
    price: 1320,
    description: '粉液結合，經濟實惠',
    image: '/10.jpg',
    benefits: ['精華', '粉體', '經濟'],
    size: '標準',
    volume: '3件組',
    pv: 1122
  },
  {
    id: '58-9-1',
    productNumber: '58-9',
    productTitle: '淨膚精華粉與原液',
    name: '58-9 淨膚精華粉與原液',
    category: 'cleansing',
    series: '淨膚系列',
    price: 580,
    description: '粉液結合，經濟實惠',
    image: '/10.jpg',
    benefits: ['精華', '粉體', '經濟'],
    size: '標準',
    volume: '1件組',
    pv: 464
  },

  // 晶亮系列 (D系列)
  {
    id: 'd1-晶亮-m',
    productNumber: 'D1',
    productTitle: '晶亮凝露',
    name: 'D1-晶亮凝露',
    category: 'brightening',
    series: '晶亮系列',
    price: 3100,
    memberPrice: 2780,
    description: '晶亮膚色，恢復光澤',
    image: '/14.jpg',
    benefits: ['晶亮', '光澤', '恢復'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: 'd2-晶亮-m',
    productNumber: 'D2',
    productTitle: '晶亮柔敏原液',
    name: 'D2-晶亮柔敏原液',
    category: 'brightening',
    series: '晶亮系列',
    price: 3100,
    memberPrice: 2780,
    description: '柔敏配方，溫和有效',
    image: '/15.jpg',
    benefits: ['柔敏', '溫和', '有效'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: 'D3',
    productNumber: 'D3',
    productTitle: '絲光蛋白精華液',
    name: 'D3-絲光蛋白精華液',
    category: 'brightening',
    series: '晶亮系列',
    price: 2980,
    memberPrice: 2980,
    description: '蛋白精華，絲光質感',
    image: '/15.jpg',
    benefits: ['蛋白', '絲光', '精華'],
    size: '標準',
    volume: '30ml',
    pv: 2533
  },
  {
    id: 'd4-晶亮-m',
    productNumber: 'D4',
    productTitle: '晶亮精華霜',
    name: 'D4-晶亮精華霜',
    category: 'brightening',
    series: '晶亮系列',
    price: 3100,
    memberPrice: 2780,
    description: '精華濃縮，深層修護',
    image: '/14.jpg',
    benefits: ['精華', '修護', '濃縮'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: 'd5-晶亮-m',
    productNumber: 'D5',
    productTitle: '晶亮剔透霜',
    name: 'D5-晶亮剔透霜',
    category: 'brightening',
    series: '晶亮系列',
    price: 3100,
    memberPrice: 2780,
    description: '剔透質地，透亮膚色',
    image: '/14.jpg',
    benefits: ['剔透', '透亮', '質地'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: 'd6-晶亮-m',
    productNumber: 'D6',
    productTitle: '晶亮亮顏霜',
    name: 'D6-晶亮亮顏霜',
    category: 'brightening',
    series: '晶亮系列',
    price: 3100,
    memberPrice: 2780,
    description: '水解黑桑果能收斂肌膚、使肌膚具有防護力',
    featured: true,
    featuredOrder: 5,
    image: '/14.jpg',
    benefits: ['敏感肌', '酒糟肌', '美白'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: 'd7-晶亮-m',
    productNumber: 'D7',
    productTitle: '晶亮修護精華液',
    name: 'D7-晶亮修護精華液',
    category: 'brightening',
    series: '晶亮系列',
    price: 2780,
    memberPrice: 2780,
    description: '噴霧方便，隨時修護',
    image: '/03.jpg',
    benefits: ['噴霧', '修護', '便利'],
    size: '標準',
    volume: '120ml',
    pv: 2250
  },
  {
    id: 'D8-10',
    productNumber: 'D8',
    productTitle: '精華粉與原液',
    name: 'D8-精華粉與原液',
    category: 'brightening',
    series: '晶亮系列',
    price: 4400,
    description: '粉液結合，雙重功效',
    image: '/10.jpg',
    benefits: ['精華', '粉體', '高效'],
    size: '標準',
    volume: '10件組',
    pv: 3740
  },
  {
    id: 'D8-1',
    productNumber: 'D8',
    productTitle: '精華粉與原液',
    name: 'D8-精華粉與原液',
    category: 'brightening',
    series: '晶亮系列',
    price: 580,
    description: '粉液結合，雙重功效',
    image: '/10.jpg',
    benefits: ['精華', '粉體', '高效'],
    size: '標準',
    volume: '1件組',
    pv: 464
  },

  // Q彈精緻系列 (68系列)
  {
    id: '68膠原滋養再生露-q彈精緻-m',
    productNumber: '68 膠原滋養再生露',
    productTitle: '',
    name: '68 膠原滋養再生露',
    category: 'elasticity',
    series: 'Q彈精緻系列',
    price: 3100,
    memberPrice: 2780,
    description: '膠原滋養，再生修護',
    image: '/09.jpg',
    benefits: ['膠原', '滋養', '再生'],
    size: '標準',
    volume: '50ml',
    pv: 2250
  },
  {
    id: '68-1-q彈精緻-m',
    productNumber: '68-1',
    productTitle: 'Q彈精緻滋養液',
    name: '68-1 Q彈精緻滋養液',
    category: 'elasticity',
    series: 'Q彈精緻系列',
    price: 3100,
    memberPrice: 2780,
    description: 'Q彈滋養，精緻修護',
    image: '/18.jpg',
    benefits: ['Q彈', '滋養', '精緻'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: '68-2',
    productNumber: '68-2',
    productTitle: 'Q彈滋養凝露',
    name: '68-2 Q彈滋養凝露',
    category: 'elasticity',
    series: 'Q彈精緻系列',
    price: 3980,
    description: 'Q彈滋養，凝聚修護',
    image: '/09.jpg',
    benefits: ['Q彈', '滋養', '凝露'],
    size: '標準',
    volume: '50ml',
    pv: 3383
  },
  {
    id: '68-3-q彈精緻-m',
    productNumber: '68-3',
    productTitle: 'Q彈滋養霜',
    name: '68-3 Q彈滋養霜',
    category: 'elasticity',
    series: 'Q彈精緻系列',
    price: 3100,
    memberPrice: 2780,
    description: 'Q彈滋養，深層修護',
    image: '/18.jpg',
    benefits: ['Q彈', '滋養', '霜體'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: '68-4',
    productNumber: '68-4',
    productTitle: 'Q彈精緻霜',
    name: '68-4 Q彈精緻霜',
    category: 'elasticity',
    series: 'Q彈精緻系列',
    price: 2980,
    description: 'Q彈精緻，提升活力',
    image: '/17.jpg',
    benefits: ['Q彈', '精緻', '活力'],
    size: '標準',
    volume: '30ml',
    pv: 2533
  },
  {
    id: '68-5-q彈精緻-m',
    productNumber: '68-5',
    productTitle: 'Q彈精緻修護液',
    name: '68-5 Q彈精緻修護液',
    category: 'elasticity',
    series: 'Q彈精緻系列',
    price: 3100,
    memberPrice: 2780,
    description: 'Q彈精緻，修護深層',
    image: '/03.jpg',
    benefits: ['Q彈', '精緻', '修護'],
    size: '標準',
    volume: '120ml',
    pv: 2250
  },
  {
    id: '68-6-10',
    productNumber: '68-6',
    productTitle: 'Q彈精緻精華粉與原液',
    name: '68-6 Q彈精緻精華粉與原液',
    category: 'elasticity',
    series: 'Q彈精緻系列',
    price: 4400,
    description: '粉液結合，雙重功效',
    image: '/10.jpg',
    benefits: ['精華', '粉體', '高效'],
    size: '標準',
    volume: '10件組',
    pv: 3740
  },
  {
    id: '68-6-1',
    productNumber: '68-6',
    productTitle: 'Q彈精緻精華粉與原液',
    name: '68-6 Q彈精緻精華粉與原液',
    category: 'elasticity',
    series: 'Q彈精緻系列',
    price: 580,
    description: '粉液結合，雙重功效',
    image: '/10.jpg',
    benefits: ['精華', '粉體', '高效'],
    size: '標準',
    volume: '1件組',
    pv: 464
  },

  // 其他系列
  {
    id: 'special-38',
    productNumber: '38號',
    productTitle: '修護柔敏膠原凝露',
    name: '38號修護柔敏膠原凝露',
    category: 'special',
    series: '特殊系列',
    price: 4430,
    memberPrice: 3980,
    description: '超強舒緩、修復、保濕王者',
    featured: true,
    featuredOrder: 1,
    image: '/21.jpg',
    benefits: ['超強舒緩', '修復', '保濕王者'],
    size: '標準',
    volume: '300ml',
    pv: 3383,
    usage: '舒緩及修護肌膚，減少肌膚乾澀、脫屑、脫皮狀況，調理肌膚油水平衡。\n每天使用可提升肌膚對環境傷害的保護力，形成肌膚保護膜。',
    instructions: '清潔後，取適量塗抹全身上下所有部位(包含私密處)皆可使用！\n所有情況舉例：泛紅、敏感、過敏、曬傷、發炎、灼燒脫皮、皮膚炎、疹子…等皆可使用！\n\n✦ 薄塗用法\n全臉(或特定部位)像擦正常保養品用量塗抹即可，接著後續上其他保養品。\n\n✦ 厚敷用法\n全臉(或特定部位)塗抹約0.5公分厚度，敷15-20分鐘，用飲用水擦拭至剩薄薄一層厚，上後續保養品即可。\n\n✦ 加強過夜用法\n系列保養品上完後，全臉塗抹約0.2公分厚，睡醒用飲用水擦拭至薄薄一層，再重新上後續保養品即可。',
    ingredients: '蘆薈葉汁萃取、透明質酸、甘露醇萃取。',
    storage: '存放於陰涼乾燥處。避免陽光直射及潮濕環境。\n在家建議冰冷凍敷效果最佳!'
  },

  {
    id: 'special-21',
    productNumber: '21號',
    productTitle: '玫瑰角質乳液',
    name: '21號玫瑰角質乳液',
    category: 'special',
    series: '特殊系列',
    price: 850,
    description: '玉瑰爡角質，清潔修護',
    image: '/22.jpg',
    benefits: ['玉瑰爡', '角質', '清潔'],
    size: '標準',
    volume: '80ml',
    pv: 680
  },
  {
    id: 'special-1',
    productNumber: '極致水潤解渴霜',
    productTitle: '',
    name: '極致水潤解渴霜',
    category: 'special',
    series: '特殊系列',
    price: 2780,
    description: '極致保濕，深層滋養',
    image: '/14.jpg',
    benefits: ['保濕', '滋養', '解渴'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: 'special-2',
    productNumber: '舒緩乖乖修護乳',
    productTitle: '',
    name: '舒緩乖乖修護乳',
    category: 'special',
    series: '特殊系列',
    price: 2780,
    description: '舒緩敏感，溫和修護',
    image: '/14.jpg',
    benefits: ['舒緩', '敏感', '修護'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },
  {
    id: 'special-4',
    productNumber: '金頭腦皮膚調理液',
    productTitle: '',
    name: '金頭腦皮膚調理液',
    category: 'special',
    series: '特殊系列',
    price: 2780,
    description: '調理肌膚，平衡油水',
    image: '/24.jpg',
    benefits: ['調理', '平衡', '油水'],
    size: '標準',
    volume: '60ml',
    pv: 2250
  },
  {
    id: 'special-5',
    productNumber: '好皮敷修護液',
    productTitle: '',
    name: '好皮敷修護液',
    category: 'special',
    series: '特殊系列',
    price: 2780,
    description: '好皮敷修護，深層保護',
    image: '/24.jpg',
    benefits: ['好皮敷', '修護', '保護'],
    size: '標準',
    volume: '60ml',
    pv: 2250
  },
  {
    id: 'special-6',
    productNumber: '好皮敷凝露',
    productTitle: '',
    name: '好皮敷凝露',
    category: 'special',
    series: '特殊系列',
    price: 2780,
    description: '好皮敷凝聚，滋養修護',
    image: '/09.jpg',
    benefits: ['好皮敷', '凝露', '滋養'],
    size: '標準',
    volume: '50ml',
    pv: 2250
  },
  {
    id: 'special-7',
    productNumber: '',
    productTitle: '精緻美瞳眼霜',
    name: '精緻美瞳眼霜',
    category: 'special',
    series: '特殊系列',
    price: 2780,
    memberPrice: 2780,
    description: '精緻美瞳，修護眼周',
    image: '/01.jpg',
    benefits: ['精緻', '美瞳', '眼周'],
    size: '標準',
    volume: '30ml',
    pv: 2250
  },

  // 美胸系列
  {
    id: 'bust-1',
    productNumber: '',
    productTitle: 'UP活絡喚醒乳',
    name: 'UP活絡喚醒乳',
    category: 'bust',
    series: '美胸系列',
    price: 3980,
    description: '活絡喚醒，提升紋理',
    image: '/03.jpg',
    benefits: ['活絡', '喚醒', '提升'],
    size: '標準',
    volume: '120ml',
    pv: 3383
  },
  {
    id: 'bust-2',
    productNumber: '',
    productTitle: 'UP定點精華液',
    name: 'UP定點精華液',
    category: 'bust',
    series: '美胸系列',
    price: 2980,
    description: '定點精華，集中修護',
    image: '/01.jpg',
    benefits: ['定點', '精華', '集中'],
    size: '標準',
    volume: '30ml',
    pv: 2533
  },
  {
    id: 'bust-3',
    productNumber: '',
    productTitle: 'UP緊實精華液',
    name: 'UP緊實精華液',
    category: 'bust',
    series: '美胸系列',
    price: 2980,
    description: '緊實提升，修護保護',
    image: '/01.jpg',
    benefits: ['緊實', '提升', '修護'],
    size: '標準',
    volume: '30ml',
    pv: 2533
  },

  // 精油系列
  {
    id: 'Q1',
    productNumber: 'Q1',
    productTitle: '草本精油(安撫/舒緩)',
    name: 'Q1-草本精油(安撫/舒緩)',
    category: 'essential-oil',
    series: '精油系列',
    price: 1280,
    memberPrice: 980,
    description: '草本精油，安撫舒緩',
    image: '/27.jpg',
    benefits: ['草本', '安撫', '舒緩'],
    size: '標準',
    volume: '100ml',
    pv: 833,
    usage: '✦ 舒緩情緒與放鬆\n透過橙花與天竺葵精油的天然芳香氣息，在使用過程中幫助放鬆身心、舒緩日常壓力，帶來溫和療癒的放鬆感受。\n\n✦ 深層保濕滋養\n結合甜杏仁油與甘油的保濕修護特性，深入滋養乾燥肌膚，使肌膚回復柔嫩細緻、觸感絲滑。\n\n✦ 平衡肌膚油水\n幫助維持肌膚健康狀態，適合各類膚質作為日常身體護理使用。',
    instructions: '清潔後，取適量塗抹於全身肌膚乾燥處。',
    ingredients: '甘油、甜杏仁油、橙花精油、天竺葵精油',
    storage: '存放於陰涼乾燥處。\n避免陽光直射及潮濕環境。'
  },
  {
    id: 'Q2',
    productNumber: 'Q2',
    productTitle: '草本精油(通暢/活化)',
    name: 'Q2-草本精油(通暢/活化)',
    category: 'essential-oil',
    series: '精油系列',
    price: 1380,
    memberPrice: 1080,
    description: '草本精油，通暢活化',
    image: '/28.jpg',
    benefits: ['草本', '通暢', '活化'],
    size: '標準',
    volume: '100ml',
    pv: 918,
    ingredients: '甘油、甜杏仁油、橙花精油、天竺葵精油、薰衣草萃取、玻尿酸。',
    usage: '✦ 情緒安撫與紓壓\n透過橙花、天竺葵與薰衣草的植物芳香，在按摩過程中幫助放鬆神經、舒緩壓力。\n\n✦ 深層滋養修復\n甜杏仁油能修復乾燥的身體肌膚，使觸感變得絲滑柔軟。\n\n✦ 平衡肌膚油水\n幫助維持肌膚健康狀態，適合各類膚質作為日常身體護理使用。',
    instructions: '清潔肌膚後，取適量塗抹於全身肌膚乾燥處。',
    storage: '存放於陰涼乾燥處。\n避免陽光直射及潮濕環境。'
  },

  // 清潔系列
  {
    id: '22-small',
    productNumber: '22號',
    productTitle: '亮采99金卸妝乳',
    name: '22號亮采99金卸妝乳',
    category: 'cleaning',
    series: '清潔系列',
    price: 1380,
    description: '亮采99金卸妝，溫和清潔',
    image: '/03.jpg',
    benefits: ['卸妝', '清潔', '溫和'],
    size: '小',
    volume: '120ml',
    pv: 1173
  },
  {
    id: '22-large',
    productNumber: '22號',
    productTitle: '亮采99金卸妝乳',
    name: '22號亮采99金卸妝乳',
    category: 'cleaning',
    series: '清潔系列',
    price: 2980,
    description: '亮采99金卸妝，溫和清潔',
    image: '/05.jpg',
    benefits: ['卸妝', '清潔', '溫和'],
    size: '大',
    volume: '500ml',
    pv: 2533
  },
  {
    id: '23-small',
    productNumber: '23號',
    productTitle: '亮采99金潔顏蜜',
    name: '23號亮采99金潔顏蜜',
    category: 'cleaning',
    series: '清潔系列',
    price: 1380,
    description: '亮采99金潔顏，深層清潔',
    image: '/03.jpg',
    benefits: ['潔顏', '清潔', '深層'],
    size: '小',
    volume: '120ml',
    pv: 1173
  },
  {
    id: '23-large',
    productNumber: '23號',
    productTitle: '亮采99金潔顏蜜',
    name: '23號亮采99金潔顏蜜',
    category: 'cleaning',
    series: '清潔系列',
    price: 2980,
    description: '亮采99金潔顏，深層清潔',
    image: '/05.jpg',
    benefits: ['潔顏', '清潔', '深層'],
    size: '大',
    volume: '500ml',
    pv: 2533
  },

  // 安瓶保養組
  {
    id: 'ampoule-1',
    productNumber: '',
    productTitle: '熨斗系列安瓶保養組',
    name: '熨斗系列安瓶保養組',
    category: 'ampoule',
    series: '安瓶保養組',
    price: 2500,
    memberPrice: 2500,
    description: '微整形安瓶，集中修護',
    benefits: ['微整形', '安瓶', '修護'],
    size: '組合',
    volume: '9件組',
    pv: 2125
  },
  {
    id: 'ampoule-2',
    productNumber: '38都都好安瓶保養組',
    productTitle: '',
    name: '38都都好安瓶保養組',
    category: 'ampoule',
    series: '安瓶保養組',
    price: 2500,
    memberPrice: 2500,
    description: '都都好安瓶，美顏修護',
    benefits: ['都都好', '安瓶', '美顏'],
    size: '組合',
    volume: '7件組',
    pv: 2125
  },
  {
    id: 'ampoule-3',
    productNumber: '58淨膚安瓶保養組',
    productTitle: '',
    name: '58淨膚安瓶保養組',
    category: 'ampoule',
    series: '安瓶保養組',
    price: 2500,
    memberPrice: 2500,
    description: '淨膚安瓶，清潔修護',
    benefits: ['淨膚', '安瓶', '清潔'],
    size: '組合',
    volume: '8件組',
    pv: 2125
  },
  {
    id: 'ampoule-4',
    productNumber: '晶亮安瓶保養組',
    productTitle: '',
    name: '晶亮安瓶保養組',
    category: 'ampoule',
    series: '安瓶保養組',
    price: 2500,
    memberPrice: 2500,
    description: '晶亮安瓶，提亮修護',
    benefits: ['晶亮', '安瓶', '提亮'],
    size: '組合',
    volume: '7件組',
    pv: 2125
  }
];

// 肌膚檢測問卷
export interface SkinQuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    value: string;
  }[];
}

export const SKIN_QUIZ_QUESTIONS: SkinQuizQuestion[] = [
  {
    id: 'skin-type',
    question: '您的膚質類型是？',
    options: [
      { text: '油性肌膚', value: 'oily' },
      { text: '乾性肌膚', value: 'dry' },
      { text: '混合肌膚', value: 'combination' },
      { text: '中性肌膚', value: 'normal' }
    ]
  },
  {
    id: 'main-concern',
    question: '主要肌膚困擾是？',
    options: [
      { text: '痘痘/粉刺', value: 'acne' },
      { text: '暗沉/無光澤', value: 'dull' },
      { text: '乾燥/脫皮', value: 'dry' },
      { text: '敏感/泛紅', value: 'sensitive' },
      { text: '細紋/鬆弛', value: 'aging' },
      { text: '毛孔粗大', value: 'pores' }
    ]
  },
  {
    id: 'sensitivity',
    question: '肌膚是否敏感？',
    options: [
      { text: '非常敏感', value: 'very-sensitive' },
      { text: '有點敏感', value: 'somewhat-sensitive' },
      { text: '不敏感', value: 'not-sensitive' }
    ]
  },
  {
    id: 'age-group',
    question: '年齡區間？',
    options: [
      { text: '20-25歲', value: '20-25' },
      { text: '25-30歲', value: '25-30' },
      { text: '30-35歲', value: '30-35' },
      { text: '35-40歲', value: '35-40' },
      { text: '40歲以上', value: '40+' }
    ]
  },
  {
    id: 'goal',
    question: '護膚目標是？',
    options: [
      { text: '控油抗痘', value: 'acne-control' },
      { text: '保濕修護', value: 'moisturize' },
      { text: '抗衰老', value: 'anti-aging' },
      { text: '美白亮膚', value: 'brightening' },
      { text: '全面護理', value: 'comprehensive' }
    ]
  }
];

// 根據檢測結果推薦產品
export function getRecommendedProducts(answers: Record<string, string>): Product[] {
  const recommended: Product[] = [];
  
  const skinType = answers['skin-type'];
  const mainConcern = answers['main-concern'];
  const goal = answers['goal'];
  
  // 根據主要困擾推薦
  if (mainConcern === 'acne') {
    recommended.push(
      ...PRODUCTS.filter(p => p.series === '都都好系列').slice(0, 3)
    );
  } else if (mainConcern === 'dull') {
    recommended.push(
      ...PRODUCTS.filter(p => p.series === '晶亮系列').slice(0, 3)
    );
  } else if (mainConcern === 'dry') {
    recommended.push(
      ...PRODUCTS.filter(p => p.series === '淨膚系列').slice(0, 3)
    );
  } else if (mainConcern === 'sensitive') {
    recommended.push(
      ...PRODUCTS.filter(p => p.series === '淨膚系列' || p.series === '都都好系列').slice(0, 3)
    );
  } else if (mainConcern === 'aging') {
    recommended.push(
      ...PRODUCTS.filter(p => p.series === '晶亮系列' || p.series === 'Q彈精緻系列').slice(0, 3)
    );
  }
  
  // 如果推薦不足，補充基礎產品
  if (recommended.length < 3) {
    recommended.push(
      ...PRODUCTS.filter(p => !recommended.includes(p)).slice(0, 3 - recommended.length)
    );
  }
  
  return recommended.slice(0, 3);
}
