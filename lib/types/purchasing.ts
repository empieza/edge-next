
export type PurchasingVariantType = {
  name: string,
  price: number,
  default: boolean,
  stock: number,
}

export type ShippingFeeType = {
  countryCode: string,
  price: number,
  name: string
}

export type PurchashingOptionsType = {
  multiple: boolean,
  stock: number,
  sku: string,
  currency: string,
  price: number,
  options?: PurchasingVariantType[]
}