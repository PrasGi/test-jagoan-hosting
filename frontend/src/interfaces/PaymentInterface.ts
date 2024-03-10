import HouseInterface from "./HouseInterface";
import ResidentInterface from "./ResidentInterface";

interface PaymentInterface {
  id: number;
  resident: ResidentInterface;
  house: HouseInterface;
  type_payment: string;
  type_time_payment: string;
  amount: string;
  status_payment: number;
  created_at: Date;
  updated_at: Date;
}

export default PaymentInterface;
