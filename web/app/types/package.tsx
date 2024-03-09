export type Package = {
  name: string;
  price: number;
  invoiceDate: string; // Assuming invoiceDate is a string representing the date
  orphanageName: string;
  amount: number;
  status: string;
};

export type donation = {
  amount: number;
  date: string;
  meal_time: string;
  type: string;
  visiting_time: string;
};
