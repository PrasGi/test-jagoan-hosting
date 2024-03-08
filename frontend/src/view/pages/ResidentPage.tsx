import { useEffect, useState } from "react";
import ResidentService from "../../services/ResidentService";
import ResourceHelper from "../../utils/ResourceHelper";
import Empty from "../components/Empty";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ResidentInterface from "../../interfaces/ResidentInterface";
import AddResidentInterface from "../../interfaces/AddResidentInterface";

const ResidentPage = () => {
  const residentService = new ResidentService();
  const [success, setSuccess] = useState("");
  const [datas, setDatas] = useState<ResidentInterface[]>([]);
  const [selectedResident, setSelectedResident] =
    useState<ResidentInterface | null>(null);

  const addResident: AddResidentInterface = {
    fullname: "",
    status_resident: "kontrak",
    phone_number: "",
    status_merried: "sudah menikah",
    image_ktp: null,
  };
  const [residentAdd, setResidentAdd] = useState(addResident);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await residentService.getAllData();
        setDatas(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async () => {
    const response = await residentService.addData(residentAdd);
    const data = await residentService.getAllData();
    setDatas(data);

    if (response.status_code == 201) {
      setSuccess(response.message);
      setResidentAdd({
        fullname: "",
        status_resident: "",
        phone_number: "",
        status_merried: "",
        image_ktp: null,
      });
    }
  };

  const handleEditModal = (resident: ResidentInterface) => {
    setSelectedResident(resident);
  };

  const handleUpdate = async () => {
    const response = await residentService.updateData(selectedResident);
    const data = await residentService.getAllData();
    setDatas(data);

    if (response.status_code == 200) {
      setSuccess(response.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure want to delete this data?")) {
      const response = await residentService.deleteData(id);
      const data = await residentService.getAllData();
      setDatas(data);

      if (response.status_code == 200) {
        setSuccess(response.message);
      }
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
                <th scope="col">KTP</th>
                <th scope="col">Fullname</th>
                <th scope="col">Status Resident</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Status Merried</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        src={"http://localhost:8000/storage/" + data.image_ktp}
                        className="img-fluid"
                        style={{ width: "70px" }}
                        alt={data.fullname}
                      />
                    </td>
                    <td>{data.fullname}</td>
                    <td>{data.status_resident}</td>
                    <td>{data.phone_number}</td>
                    <td>{data.status_merried}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning me-1"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                        onClick={() => handleEditModal(data)} // Handle edit modal
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => {
                          handleDelete(data.id);
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>

      {/* Update Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Resident
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Form untuk edit data */}
              {selectedResident && (
                <form>
                  <div className="mb-3">
                    <label htmlFor="ktp" className="form-label">
                      KTP (optional)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          const file = files[0];
                          const image_ktp = file ? file : null;
                          setSelectedResident({
                            ...selectedResident,
                            image_ktp: image_ktp,
                          });
                          // Lakukan sesuatu dengan file yang dipilih
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">
                      Fullname
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      value={selectedResident.fullname}
                      onChange={(e) => {
                        setSelectedResident({
                          ...selectedResident,
                          fullname: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="statusResident" className="form-label">
                      Status Resident
                    </label>
                    <select
                      value={selectedResident.status_resident}
                      onChange={(e) => {
                        setSelectedResident({
                          ...selectedResident,
                          status_resident: e.target.value,
                        });
                      }}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="kontrak">kontrak</option>
                      <option value="tetap">tetap</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      value={selectedResident.phone_number}
                      onChange={(e) => {
                        setSelectedResident({
                          ...selectedResident,
                          phone_number: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="statusMerried" className="form-label">
                      Status Merried
                    </label>
                    <select
                      value={selectedResident.status_merried}
                      onChange={(e) => {
                        setSelectedResident({
                          ...selectedResident,
                          status_merried: e.target.value,
                        });
                      }}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="sudah menikah">sudah menikah</option>
                      <option value="belum menikah">belum menikah</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

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
                Add Resident
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
                  <label htmlFor="add-image-ktp" className="form-label">
                    KTP (optional)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="add-image-ktp"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        const file = files[0];
                        setResidentAdd({
                          ...residentAdd,
                          image_ktp: file,
                        });
                      }
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="add-fullname" className="form-label">
                    Fullname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="add-fullname"
                    value={residentAdd.fullname || ""}
                    onChange={(e) =>
                      setResidentAdd({
                        ...residentAdd,
                        fullname: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="add-status-resident" className="form-label">
                    Status Resident
                  </label>
                  <select
                    className="form-select"
                    id="add-status-resident"
                    value={residentAdd.status_resident}
                    onChange={(e) =>
                      setResidentAdd({
                        ...residentAdd,
                        status_resident: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="kontrak">Kontrak</option>
                    <option value="tetap">Tetap</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="add-phone-number" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="add-phone-number"
                    value={residentAdd.phone_number || ""}
                    onChange={(e) =>
                      setResidentAdd({
                        ...residentAdd,
                        phone_number: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="add-status-merried" className="form-label">
                    Status Merried
                  </label>
                  <select
                    className="form-select"
                    id="add-status-merried"
                    value={residentAdd.status_merried}
                    onChange={(e) =>
                      setResidentAdd({
                        ...residentAdd,
                        status_merried: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="sudah menikah">Sudah Menikah</option>
                    <option value="belum menikah">Belum Menikah</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAdd} // Call handleAdd when "Save" button clicked
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

export default ResidentPage;
