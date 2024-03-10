import { useEffect, useState } from "react";
import PaymentService from "../../services/PaymentService";
import ResourceHelper from "../../utils/ResourceHelper";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PaymentInterface from "../../interfaces/PaymentInterface";
import AddPaymentInterface from "../../interfaces/AddPaymentInterface";
import Empty from "../components/Empty";
import ResidentService from "../../services/ResidentService";
import HouseService from "../../services/HouseService";
import HouseInterface from "../../interfaces/HouseInterface";
import ResidentInterface from "../../interfaces/ResidentInterface";

const PaymentPage = () => {
  const paymentService = new PaymentService();
  const residentService = new ResidentService();
  const houseService = new HouseService();
  const [success, setSuccess] = useState("");
  const [datas, setDatas] = useState<PaymentInterface[]>([]);
  const [dataResident, setDataResident] = useState<ResidentInterface[]>([]);
  const [dataHouse, setDataHouse] = useState<HouseInterface[]>([]);

  const addPayment: AddPaymentInterface = {
    resident_id: "0",
    house_id: "0",
    type_payment: "iuran kebersihan",
    type_time_payment: "bulanan",
    amount: "",
    status_payment: "0",
  };

  const [paymentAdd, setPaymentAdd] = useState(addPayment);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await paymentService.getAllData();
        setDatas(data);
        const dataResident = await residentService.getAllData();
        const dataHouse = await houseService.getAllData();
        setDataResident(dataResident);
        setDataHouse(dataHouse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddPayment = async () => {
    const response = await paymentService.addData(paymentAdd);
    const data = await paymentService.getAllData();
    setDatas(data);
    if (response) {
      setSuccess("Payment added successfully");
    }

    setPaymentAdd({
      resident_id: "0",
      house_id: "0",
      type_payment: "iuran kebersihan",
      type_time_payment: "bulanan",
      amount: "",
      status_payment: "0",
    });
  };

  const handleStatusChange = async (payment: PaymentInterface) => {
    const response = await paymentService.changeStatus(payment);
    const data = await paymentService.getAllData();
    setDatas(data);
    if (response) {
      setSuccess("Status changed successfully");
    }
  };

  return (
    <>
      <ResourceHelper />
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <button
          type="button"
          className="btn btn-dark mb-2"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
        >
          <i className="bi bi-plus"></i> add data
        </button>
        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}
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
                <th scope="col">Action</th>
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
                      {data.status_payment == 0 ? (
                        <button
                          type="button"
                          className="btn btn-danger me-1"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          onClick={() => handleStatusChange(data)} // Handle edit modal
                        >
                          <i className="bi bi-toggle-off"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-success me-1"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          onClick={() => handleStatusChange(data)} // Handle edit modal
                        >
                          <i className="bi bi-toggle-on"></i>
                        </button>
                      )}
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

      {/* Add Modal */}
      <div
        className="modal fade"
        id="addModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Payment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="add-status-resident" className="form-label">
                    Resident
                  </label>
                  <select
                    className="form-select"
                    id="add-status-resident"
                    value={paymentAdd.resident_id}
                    onChange={(e) =>
                      setPaymentAdd({
                        ...paymentAdd,
                        resident_id: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="0">Select resident</option>
                    {dataResident.map((resident, index) => {
                      return (
                        <option key={index} value={resident.id}>
                          {resident.fullname}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="add-status-resident" className="form-label">
                    House
                  </label>
                  <select
                    className="form-select"
                    id="add-status-resident"
                    value={paymentAdd.house_id}
                    onChange={(e) =>
                      setPaymentAdd({
                        ...paymentAdd,
                        house_id: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="0">Select house</option>
                    {dataHouse.map((resident, index) => {
                      return (
                        <option key={index} value={resident.id}>
                          {resident.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="add-status-resident" className="form-label">
                    Type Payment
                  </label>
                  <select
                    className="form-select"
                    id="add-status-resident"
                    value={paymentAdd.type_payment}
                    onChange={(e) =>
                      setPaymentAdd({
                        ...paymentAdd,
                        type_payment: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="iuran kebersihan">Iuran Kebersihan</option>
                    <option value="iuran satpam">Iuran Satpam</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="add-status-resident" className="form-label">
                    Type Time Payment
                  </label>
                  <select
                    className="form-select"
                    id="add-status-resident"
                    value={paymentAdd.type_time_payment}
                    onChange={(e) =>
                      setPaymentAdd({
                        ...paymentAdd,
                        type_time_payment: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="bulanan">Bulanan</option>
                    <option value="tahunan">Tahunan</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="add-status-merried" className="form-label">
                    Amount
                  </label>
                  <input
                    className="form-control"
                    id="add-status-merried"
                    value={paymentAdd.amount}
                    onChange={(e) =>
                      setPaymentAdd({
                        ...paymentAdd,
                        amount: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="add-status-resident" className="form-label">
                    Status Payment
                  </label>
                  <select
                    className="form-select"
                    id="add-status-resident"
                    value={paymentAdd.status_payment}
                    onChange={(e) =>
                      setPaymentAdd({
                        ...paymentAdd,
                        status_payment: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="0">Belum lunas</option>
                    <option value="1">Lunas</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddPayment} // Call handleAdd when "Save" button clicked
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
