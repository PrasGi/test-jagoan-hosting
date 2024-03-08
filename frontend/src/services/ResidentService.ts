import ResidentInterface from "../interfaces/ResidentInterface";
import AddResidentInterface from "../interfaces/AddResidentInterface";

class ResidentService {
  getAllData = async () => {
    const response = await fetch("http://localhost:8000/api/residents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    const datas = await response.json();
    const data: ResidentInterface[] = datas.data;

    return data;
  };

  addData = async (resident: AddResidentInterface | null) => {
    const formData = new FormData();

    if (resident) {
      // Menambahkan data ke formData
      formData.append("fullname", resident.fullname);
      formData.append("status_resident", resident.status_resident);
      formData.append("phone_number", resident.phone_number);
      formData.append("status_merried", resident.status_merried);
      // Memeriksa apakah image_ktp adalah file
      if (resident.image_ktp instanceof File) {
        formData.append("image_ktp", resident.image_ktp);
      }
    }

    const response = await fetch("http://localhost:8000/api/residents", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: formData,
    });

    const datas = await response.json();

    return datas;
  };

  updateData = async (resident: ResidentInterface | null) => {
    console.log(resident);
    const formData = new FormData();

    if (resident) {
      // Menambahkan data ke formData
      formData.append("_method", "PUT");
      formData.append("fullname", resident.fullname);
      formData.append("status_resident", resident.status_resident);
      formData.append("phone_number", resident.phone_number);
      formData.append("status_merried", resident.status_merried);
      // Memeriksa apakah image_ktp adalah file
      if (resident.image_ktp instanceof File) {
        formData.append("image_ktp", resident.image_ktp);
      }
    }

    const response = await fetch(
      "http://localhost:8000/api/residents/" + resident?.id,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: formData,
      }
    );

    const datas = await response.json();

    return datas;
  };

  deleteData = async (id: number) => {
    const response = await fetch("http://localhost:8000/api/residents/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });

    const datas = await response.json();
    console.log(datas);

    return datas;
  };
}

export default ResidentService;
