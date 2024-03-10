import { useEffect, useState } from "react";
import PaymentInterface from "../../interfaces/PaymentInterface";
import PaymentService from "../../services/PaymentService";
import Empty from "../components/Empty";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ResourceHelper from "../../utils/ResourceHelper";

const DetailPage = () => {
  const paymentService = new PaymentService();
  const [datas, setDatas] = useState<PaymentInterface[]>([]);
  const [month, setMonth] = useState<number>(0); // Mengubah inisialisasi menjadi number
  const [year, setYear] = useState<number>(0); // Mengubah inisialisasi menjadi number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await paymentService.getDetailResume(month, year);
        setDatas(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ResourceHelper />
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <select
              className="form-select"
              id="add-status-resident"
              value={month}
              onChange={async (e) => {
                setMonth(parseInt(e.target.value));
                const data = await paymentService.getDetailResume(
                  parseInt(e.target.value),
                  year
                );
                setDatas(data);
              }}
              required
            >
              <option value="0">Select month filter</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              id="add-status-resident"
              value={year}
              onChange={async (e) => {
                setYear(parseInt(e.target.value));
                const data = await paymentService.getDetailResume(
                  month,
                  parseInt(e.target.value)
                );
                setDatas(data);
              }}
              required
            >
              <option value="0">Select year filter</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>

        {datas.length <= 0 ? (
          <Empty />
        ) : (
          <table className="table table-bordered shadow-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Resident Name</th>
                <th scope="col">House Name</th>
                <th scope="col">Type Payment</th>
                <th scope="col">Type Time Payment</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.resident.fullname}</td>
                    <td>{data.house.name}</td>
                    <td>{data.type_payment}</td>
                    <td>{data.type_time_payment}</td>
                    <td>{data.amount}</td>
                    <td>
                      {data.status_payment == 0 ? "belum lunas" : "lunas"}
                    </td>
                    <td>
                      {data.created_at instanceof Date
                        ? data.created_at.toDateString()
                        : data.created_at}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
};

export default DetailPage;
