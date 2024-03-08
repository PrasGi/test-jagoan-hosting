import HouseInterface from "../interfaces/HouseInterface";
import AddHouseInterface from "../interfaces/AddHouseInterface";

class HouseService {
  getAllData = async () => {
    const response = await fetch("http://localhost:8000/api/houses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    const datas = await response.json();
    const data: HouseInterface[] = datas.data;

    return data;
  };

  addData = async (house: AddHouseInterface) => {
    const response = await fetch("http://localhost:8000/api/houses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: house.name,
        status: house.status,
      }),
    });

    const datas = await response.json();
    return datas;
  };

  updateData = async (house: HouseInterface) => {
    let id = 0;

    if (house) {
      id = house.id;
    }

    const response = await fetch(`http://localhost:8000/api/houses/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        _method: "PUT",
        name: house.name,
        status: house.status,
      }),
    });

    const datas = await response.json();
    return datas;
  };

  deleteData = async (id: number) => {
    const response = await fetch(`http://localhost:8000/api/houses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    const datas = await response.json();
    return datas;
  };
}

export default HouseService;
