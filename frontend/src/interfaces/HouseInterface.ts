import ResidentInterface from "./ResidentInterface";

interface HouseInterface {
  id: number;
  name: string;
  status: string;
  resident: ResidentInterface[] | null;
  resident_histories: ResidentInterface[] | null;
  created_at: Date;
  updated_at: Date;
}

export default HouseInterface;
