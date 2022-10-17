import React from "react";


const modelSummaryInfo = ({ setModelSummary, totalPrice }) => {
  const modalStyle = {
    display: "block",
  };

  return (
    <>
      <div
        className="modal show fade model-all border"
        style={modalStyle}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content location ">
            <div className="modal-header">
              <h5 className="modal-title fs-2">
                <b> Summary </b>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setModelSummary(false)}
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="my-4 ms-1 fs-3">Total Price: {totalPrice()}$</h5>
              <h5 className="mb-2 ms-1 fs-3">Shipping Cost: Free!</h5>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setModelSummary(false)}
              >
                <span className="fs-6">Close</span>
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                <span className="fs-6">Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default modelSummaryInfo;
