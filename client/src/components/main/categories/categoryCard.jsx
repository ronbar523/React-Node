import React, { useState } from "react";
import { getCurrentUser } from "../../../services/usersServices";
import { Link } from "react-router-dom";
import DeleteCategory from "./deleteCategory"



const CategoryCard = ({ item, modelDelete, setModelDelete }) => {

  const user = getCurrentUser();

  const theName = item.name;

  const name = theName.charAt(0).toUpperCase() + theName.slice(1).toLowerCase();

  return (
    <div className="col-11 col-md-6 col-lg-4 mx-0 mb-4">
      <div className="card p-0 overflow-hidden h-100 shadow">
        <div className={modelDelete ? "card-body openModel" : "card-body"}>
          <img src={item.url} alt={item.alt} className="card-image" />
        </div>
        <div className="text-center">
          <h5 className={modelDelete ? "item-name fs-4 openModel"  : "item-name fs-4"}>{name}</h5>
          <Link to={item.name}>
            <button
              className={
                modelDelete
                  ? "btn btn-primary fs-6 mb-4 shop-now openModel"
                  : "btn btn-primary fs-6 mb-4 shop-now"
              }
            >
              {" "}
              Shop Now{" "}
            </button>
          </Link>

          {user && user.isAdmin ? (
            <div>
              <button
                className={
                  modelDelete
                    ? "btn btn-outline-danger button-card mb-3 openModel"
                    : "btn btn-outline-danger button-card mb-3"
                }
                onClick={() => setModelDelete(true)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/dovoajyj.json"
                  trigger="hover"
                  title="Delete"
                ></lord-icon>
              </button>
              <Link to={`/update/${item._id}`}>
                <button
                  className={
                    modelDelete
                      ? "btn btn-outline-warning button-card mb-3 ms-2 openModel"
                      : "btn btn-outline-warning button-card mb-3 ms-2"
                  }
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/oclwxpmm.json"
                    trigger="hover"
                    title="Edit"
                  ></lord-icon>
                </button>
              </Link>
            </div>
          ) : null}

          {modelDelete ? (
            <DeleteCategory item={item} setModelDelete={setModelDelete} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
