import React from "react";
import { toast } from "react-toastify";
import { deleteAllMyProducts } from "../../../services/productServices";

const DeleteAllMyProducts = ({ setModelDeleteAll }) => {
  const modalStyle = {
    display: "block",
  };

 

  const handleDelete = async () => {
    try {
      await deleteAllMyProducts();     
      setModelDeleteAll(false);
      toast.success(`All Yours Product It's Deleted`);
      window.location = `/my_products`;
    } catch (err) {
      toast.error(`Something happened`);
    }
  };

  return (
    <div
      className="modal show fade model-all border"
      style={modalStyle}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content location ">
          <div className="modal-header">
            <h5 className="modal-title fs-4">
              <b> Delete Your Products </b>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setModelDeleteAll(false)}
            ></button>
          </div>
          <div className="modal-body">
            <h5 className="text-center desc-info fs-4">
              <b className="text-danger"> Delete Your Products </b>
            </h5>
            <p className=" text-center fs-5 mt-4">
              Are you sure that you want to delete
              <span className="text-danger">
                <b>&nbsp;all your products</b>
              </span>
              ?
            </p>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setModelDeleteAll(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAllMyProducts;
