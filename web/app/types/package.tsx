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
  donor_name: string;
  donor_contact: string;
  orphanage: string;
};

export type withdrawal = {
  amount: number;
  reason: string;
  withdrawalDate: Date;
};

export type orphanage = {
  _id: string;
  name: string;
}