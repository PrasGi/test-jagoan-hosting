interface ResidentInterface {
  id: number;
  image_ktp: string | File | null;
  fullname: string;
  status_resident: string;
  phone_number: string;
  status_merried: string;
  created_at: string;
  updated_at: string;
}

export default ResidentInterface;
