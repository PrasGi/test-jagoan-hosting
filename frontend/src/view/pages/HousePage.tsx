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
  const [dataResident, setDataResident] = useState<ResidentInterface[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<HouseInterface | null>(
    null
  );

  const [addHouse, setAddHouse] = useState({
    name: "",
    status: "tidak dihuni",
  });

  const [storeResidentToHouse, setStoreResidentToHouse] = useState({
    houseId: "0",
    residentId: "0",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataHouse = await houseService.getAllData();
        const dataResident = await residentService.getAllData();
        setDatas(dataHouse);
        setDataResident(dataResident);
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
    setSelectedHouse(house);
  };

  const handleHistoryModal = (house: HouseInterface) => {
    setSelectedHouse(house);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure want to delete this data?")) {
      houseService.deleteData(id);
      const data = await houseService.getAllData();
      setDatas(data);
    }
  };

  const handleStoreResidentToHouse = async () => {
    const datas = await houseService.storeResidentToHouse(storeResidentToHouse);
    if (datas.status_code == 201) {
      setSuccess(datas.message);
      const data = await houseService.getAllData();
      setDatas(data);
    }
    setStoreResidentToHouse({
      houseId: "0",
      residentId: "0",
    });
  };

  return (
    <>
      <ResourceHelper />
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <button
          type="button"
          className="btn btn-dark me-2 mb-2"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
        >
          <i className="bi bi-plus"></i> add house
        </button>
        <button
          type="button"
          className="btn btn-dark me-2 mb-2"
          data-bs-toggle="modal"
          data-bs-target="#storeModal"
        >
          <i className="bi bi-plus"></i> add resident to house
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
                        className="btn btn-dark me-1"
                        data-bs-toggle="modal"
                        data-bs-target="#historyModal"
                        onClick={() => handleHistoryModal(data)}
                      >
                        <i className="bi bi-clock-history"></i>
                      </button>
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
        aria-labelledby="addModalLabel"
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
          aria-labelledby="updateModalLabel"
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

      {/* view Modal */}
      {selectedHouse && selectedHouse.resident && (
        <div
          className="modal fade"
          id="viewModal"
          tabIndex={-1}
          aria-labelledby="viewModalLabel"
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
                {selectedHouse.status == "dihuni" ? (
                  <form>
                    <div className="mb-3">
                      <label htmlFor="add-fullname" className="form-label">
                        Name resident
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="add-fullname"
                        value={selectedHouse.resident[0].fullname}
                        readOnly
                      />
                    </div>
                  </form>
                ) : (
                  <p>doesn't have resident now</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {selectedHouse && selectedHouse.resident_histories && (
        <>
          <div
            className="modal fade"
            id="historyModal"
            tabIndex={-1}
            aria-labelledby="storeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Store Resident To House
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
                        History resident house {selectedHouse.name}
                      </label>
                      <table className="table table-bordered shadow-sm">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name resident</th>
                            <th scope="col">Status Resident</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedHouse.resident_histories.map(
                            (data, index) => {
                              return (
                                <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{data.fullname}</td>
                                  <td>{data.status_resident}</td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleStoreResidentToHouse} // Call handleAdd when "Save" button clicked
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Store Resident To House Modal */}
      <div
        className="modal fade"
        id="storeModal"
        tabIndex={-1}
        aria-labelledby="storeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Store Resident To House
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
                  <label htmlFor="add-store-resident" className="form-label">
                    Resident
                  </label>
                  <select
                    className="form-select"
                    id="add-store-resident"
                    value={storeResidentToHouse.residentId}
                    onChange={(e) =>
                      setStoreResidentToHouse({
                        ...storeResidentToHouse,
                        residentId: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="0">Select resident</option>
                    {dataResident.map((resident) => {
                      return (
                        <option
                          key={`${resident.id}${resident.fullname}`}
                          value={resident.id}
                        >
                          {resident.fullname}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="add-store-house" className="form-label">
                    House
                  </label>
                  <select
                    className="form-select"
                    id="add-store-house"
                    value={storeResidentToHouse.houseId}
                    onChange={(e) =>
                      setStoreResidentToHouse({
                        ...storeResidentToHouse,
                        houseId: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="0">Select house</option>
                    {datas.map((house) => {
                      return (
                        <option
                          key={`${house.id}${house.name}`}
                          value={house.id}
                        >
                          {house.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleStoreResidentToHouse} // Call handleAdd when "Save" button clicked
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

export default HousePage;
