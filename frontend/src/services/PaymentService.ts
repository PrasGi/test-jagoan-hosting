import AddPaymentInterface from "../interfaces/AddPaymentInterface";
import PaymentInterface from "../interfaces/PaymentInterface";
import SumaryResumeInterface from "../interfaces/SumaryResumeInterface";

class PaymentService {
  getAllData = async () => {
    const response = await fetch(
      "http://localhost:8000/api/house-payment-histories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );

    const datas = await response.json();
    const data: PaymentInterface[] = datas.data;

    return data;
  };

  getDetailResume = async (month: number = 0, year: number = 0) => {
    let url = "http://localhost:8000/api/house-payment-histories/report/detail";

    // Menambahkan parameter month jika tidak sama dengan 0
    if (month != 0) {
      console.log({ month: month });
      url += `?month=${month}`;
    }

    // Menambahkan parameter year jika tidak sama dengan 0
    if (year != 0) {
      console.log({ year: year });
      // Memeriksa apakah parameter month telah ditambahkan sebelumnya
      url += month !== 0 ? `&year=${year}` : `?year=${year}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });

    const datas = await response.json();
    const data: PaymentInterface[] = datas.data;

    return data;
  };

  getSumaryResume = async () => {
    const response = await fetch(
      "http://localhost:8000/api/house-payment-histories/report/sumary",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );

    const datas = await response.json();
    const data: SumaryResumeInterface[] = datas.data;

    return data;
  };

  addData = async (payment: AddPaymentInterface) => {
    const response = await fetch(
      "http://localhost:8000/api/house-payment-histories",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          resident_id: payment.resident_id,
          house_id: payment.house_id,
          type_payment: payment.type_payment,
          type_time_payment: payment.type_time_payment,
          amount: payment.amount,
          status_payment: payment.status_payment,
        }),
      }
    );

    const datas = await response.json();
    return datas;
  };

  changeStatus = async (payment: PaymentInterface) => {
    let id = 0;

    if (payment) {
      id = payment.id;
    }

    const response = await fetch(
      `http://localhost:8000/api/house-payment-histories/change-status/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          _method: "PUT",
        }),
      }
    );

    const datas = await response.json();
    return datas;
  };

  deleteData = async (id: number) => {
    const response = await fetch(
      `http://localhost:8000/api/house-payment-histories/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );

    const datas = await response.json();
    return datas;
  };
}

export default PaymentService;
