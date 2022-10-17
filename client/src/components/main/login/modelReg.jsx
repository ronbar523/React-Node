import React from "react";


const ModelReg = ({ setModelReg }) => {
  const modalStyle = {
    display: "block",
  };

  const handleLogin =  () => {
      setModelReg(false);
      window.location = `/login`;
  };

   const handleRegister = () => {
     setModelReg(false);
     window.location = `/register`;
   };

  return (
    <div className="modal show fade model-all" style={modalStyle} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content location-reg ">
          <div className="modal-header">
            <h5 className="modal-title fs-4">
              <b> Attention </b>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setModelReg(false)}
            ></button>
          </div>
          <div className="modal-body">
            <h5 className="text-center desc-info fs-4"></h5>
            <p className=" text-center fs-5 mt-4">You Must Be Logged In</p>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleRegister}
            >
              Register
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ModelReg;
