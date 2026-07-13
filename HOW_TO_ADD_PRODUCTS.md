# 如何新增產品和設定點數

## 📝 產品文件位置

產品資料儲存在：`client/src/lib/products.ts`

## 🎯 第一步：了解產品結構

每個產品需要以下資訊：

```typescript
{
  id: '產品編號',                    // 唯一識別碼，例如 '0-1'
  name: '產品名稱',                  // 例如 '(0號)晶瑩剔透修膚霜(小)'
  category: '分類ID',                // 見下方分類列表
  series: '系列名稱',                // 例如 '微整形系列'
  price: 2780,                       // 價格（整數）
  description: '產品描述',           // 簡短說明
  benefits: ['功效1', '功效2'],     // 產品功效標籤
  size: '規格',                      // 例如 '小'
  volume: '容量'                     // 例如 '30ml'
}
```

## 📂 產品分類 ID 列表

在 `products.ts` 中已定義的分類：

| 分類 ID | 分類名稱 | 說明 |
|---------|---------|------|
| `skin-care` | 都都好系列 | 控油抗痘、修護肌膚 |
| `micro-lifting` | 微整型系列 | 重啟肌膚年輕密碼 |
| `cleansing` | 淨膚系列 | 穩膚修護全面舒緩 |
| `brightening` | 晶亮系列 | 肌因修護、重建健康肌本 |
| `elasticity` | Q彈精緻系列 | 提升肌膚彈性與光澤 |
| `essential-oil` | 精油系列 | 天然植物精油護理 |
| `special` | 特殊系列 | 專業護理產品 |

## ✅ 第二步：新增產品

### 方法 1：使用管理介面（推薦）

1. 在網站右上角找到「管理」或「設定」選項
2. 進入「產品管理」頁面
3. 點擊「新增產品」按鈕
4. 填寫產品資訊
5. 保存

### 方法 2：直接編輯文件

1. 打開 `client/src/lib/products.ts`
2. 找到 `export const PRODUCTS: Product[] = [` 這一行
3. 在陣列中新增您的產品

**範例：新增微整形系列產品**

```typescript
{
  id: '0-1',
  name: '(0號)晶瑩剔透修膚霜(小)',
  category: 'micro-lifting',
  series: '微整形系列',
  price: 2780,
  description: '晶瑩剔透，修護肌膚',
  benefits: ['修護', '晶亮', '緊緻'],
  size: '小',
  volume: '30ml'
},
```

## 💰 第三步：設定點數系統

### 目前的點數計算方式

現在系統使用**自動計算**：
- **每 NT$100 = 1 點**
- 例如：購買 NT$2,780 的產品 = 27 點

### 自訂點數系統（進階）

如果您想要自訂每個產品的點數（例如不同產品有不同點數比例），需要：

1. 在 `Product` 介面中新增 `points` 欄位：

```typescript
export interface Product {
  id: string;
  name: string;
  category: string;
  series: string;
  price: number;
  description: string;
  image?: string;
  benefits?: string[];
  size?: string;
  volume?: string;
  points?: number;  // 新增這一行
}
```

2. 在每個產品中設定點數：

```typescript
{
  id: '0-1',
  name: '(0號)晶瑩剔透修膚霜(小)',
  category: 'micro-lifting',
  series: '微整形系列',
  price: 2780,
  description: '晶瑩剔透，修護肌膚',
  benefits: ['修護', '晶亮', '緊緻'],
  size: '小',
  volume: '30ml',
  points: 50  // 自訂點數
},
```

3. 更新 `ProductCalculator.tsx` 中的點數計算邏輯：

找到這一行：
```typescript
const points = Math.floor(subtotal / 100);
```

改為：
```typescript
const points = cart.reduce((sum, item) => {
  const product = getProductById(item.productId);
  const productPoints = product?.points || Math.floor(product?.price || 0 / 100);
  return sum + productPoints * item.quantity;
}, 0);
```

## 🔄 完成後的步驟

1. **保存文件** - 編輯完成後保存
2. **自動更新** - 網站會自動重新載入並顯示新產品
3. **測試** - 在產品計算機中測試新產品是否正確顯示

## 📋 常見問題

**Q: 我想新增一個全新的系列，該怎麼做？**

A: 需要同時更新兩個地方：
1. 在 `PRODUCT_CATEGORIES` 中新增分類
2. 在 `PRODUCTS` 中新增該系列的產品

**Q: 產品 ID 有什麼規則嗎？**

A: ID 需要唯一，建議格式為 `系列代碼-序號`，例如：
- 微整形系列：`0-1`, `0-2`, `0-3`
- 都都好系列：`38-1`, `38-2`, `38-3`

**Q: 我想改變點數計算方式，怎麼辦？**

A: 聯繫開發者進行自訂。或按照上方「自訂點數系統」的步驟自己修改。

## 💡 提示

- 產品名稱建議簡潔清晰
- 功效標籤最多 3-4 個
- 價格必須是整數（不支援小數點）
- 系列名稱要與現有系列一致，或新增新系列

有任何問題，歡迎詢問！
