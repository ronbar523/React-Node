import React, { useState } from "react";
import { toast } from "react-toastify";

import { deleteMyUser, logout } from "../../services/usersServices";

const DeleteMyUser = ({user, theme}) => {

  const [modelDelete, setModelDelete] = useState(true);

  const modalStyle = {
    display: "block",
  };

  const handleDelete = async () => {
    try {
      await deleteMyUser(user.email);
      setModelDelete(false);
      toast.success(`Your user is deleted`);
      setTimeout(() => {
        logout();
        window.location = "/";
      }, 1000);
    } catch (err) {
      toast.error(`Something happened`);
    }
  };

  const handleCancel = () => {
    window.location = "/";
  }

  return (
    <>
      {modelDelete ? (
        <div
          className={
            theme
              ? "modal show fade model-all border theme-dark"
              : "modal show fade model-all border"
          }
          style={modalStyle}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content location ">
              <div className="modal-header">
                <h5 className="modal-title fs-4">
                  <b> Delete Your User </b>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCancel}
                ></button>
              </div>
              <div className="modal-body">
                <h5 className="text-center desc-info fs-4">
                  <b> Delete Your User </b>
                </h5>
                <p className="fs-5 mt-4 text-center">
                  Are you sure you want to <b className="text-danger">Delete Your User?</b>
                </p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger d-inline"
                  data-bs-dismiss="modal"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DeleteMyUser;
