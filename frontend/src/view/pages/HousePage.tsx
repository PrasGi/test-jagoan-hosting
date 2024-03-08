import { useEffect, useState } from "react";
import HouseService from "../../services/HouseService";
import ResourceHelper from "../../utils/ResourceHelper";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HouseInterface from "../../interfaces/HouseInterface";
import Empty from "../components/Empty";
import ResidentService from "../../services/ResidentService";
import ResidentInterface from "../../interfaces/ResidentInterface";

const HousePage = () => {
  const houseService = new HouseService();
  const residentService = new ResidentService();
  const [datas, setDatas] = useState<HouseInterface[]>([]);
  const dataResident = residentService.getAllData();
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<HouseInterface | null>(
    null
  );
  const [addHouse, setAddHouse] = useState({
    name: "",
    status: "tidak dihuni",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await houseService.getAllData();
        console.log(data);
        setDatas(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async () => {
    try {
      const response = await houseService.addData(addHouse);
      const data = await houseService.getAllData();
      setDatas(data);
      setAddHouse({
        name: "",
        status: "tidak dihuni",
      });
      setSuccess(response.message);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (selectedHouse) {
        const response = await houseService.updateData(selectedHouse);
        const data = await houseService.getAllData();
        setDatas(data);
        setSuccess(response.message);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleUpdateModal = (house: HouseInterface) => {
    setSelectedHouse(house);
  };

  const handleViewModal = (house: HouseInterface) => {
    console.log(house);
    setSelectedHouse(house);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure want to delete this data?")) {
      houseService.deleteData(id);
      const data = await houseService.getAllData();
      setDatas(data);
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
                <th scope="col">Name House</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.name}</td>
                    <td>{data.status}</td>
                    <td>
                      {data.status == "dihuni" ? (
                        <button
                          type="button"
                          className="btn btn-dark me-1"
                          data-bs-toggle="modal"
                          data-bs-target="#viewModal"
                          onClick={() => handleViewModal(data)}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                      ) : (
                        ""
                      )}
                      <button
                        type="button"
                        className="btn btn-warning me-1"
                        data-bs-toggle="modal"
                        data-bs-target="#updateModal"
                        onClick={() => handleUpdateModal(data)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(data.id)}
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
                Add House
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
                  <label htmlFor="add-fullname" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="add-fullname"
                    value={addHouse.name}
                    onChange={(e) =>
                      setAddHouse({
                        ...addHouse,
                        name: e.target.value,
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
                    value={addHouse.status}
                    onChange={(e) =>
                      setAddHouse({
                        ...addHouse,
                        status: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="dihuni">dihuni</option>
                    <option value="tidak dihuni">tidak dihuni</option>
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

      {/* Update Modal */}
      {selectedHouse && (
        <div
          className="modal fade"
          id="updateModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update House
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
                    <label htmlFor="add-fullname" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="add-fullname"
                      value={selectedHouse.name}
                      onChange={(e) =>
                        setSelectedHouse({
                          ...selectedHouse,
                          name: e.target.value,
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
                      value={selectedHouse.status}
                      onChange={(e) =>
                        setSelectedHouse({
                          ...selectedHouse,
                          status: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="dihuni">dihuni</option>
                      <option value="tidak dihuni">tidak dihuni</option>
                    </select>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate} // Call handleAdd when "Save" button clicked
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {selectedHouse && selectedHouse.resident && (
        <div
          className="modal fade"
          id="viewModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Resident House
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
                    <label htmlFor="add-fullname" className="form-label">
                      Name resident
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="add-fullname"
                      value={selectedHouse.resident.fullname}
                      readOnly
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HousePage;
