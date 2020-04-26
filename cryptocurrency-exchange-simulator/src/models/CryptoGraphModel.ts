export interface CryptoGraphModel {
  date: Date;
  price: number;
  type: string;
  amount: number;
  tid: number
}

export interface CryptoGraphModelView {
  date: string;
  price: number;
  amount: number;
}

export interface ChartModel {
  labels: Array<string>,
  datasets: [
    {
      label: string,
      backgroundColor: string,
      data: Array<number>
    }
  ]
}