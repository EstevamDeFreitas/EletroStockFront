export interface SaleSummaryDTO{
  monthlyProductValue : ProductValue[];
}

export interface ProductValue{
  productName : string;
  values : ValueByMonth<number>[];
}

export interface ValueByMonth<T>{
  data : T;
  month : Date;
}
