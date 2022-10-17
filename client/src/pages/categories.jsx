import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCategory } from "../services/categoriesServices";
import CategoryCard from "../components/main/categories/categoryCard";
import {
  getCurrentUser,
} from "../services/usersServices";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faXmark,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";




const Categories = ({theme, setTheme}) => {
  // Get User Info From Token
  const user = getCurrentUser();

  // Get All Category And Sort
  const [categoryArr, setCategoryArr] = useState([]);

  useEffect(() => {
    getAllCategory().then((res) => setCategoryArr(res.data));
  }, []);

  categoryArr.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  // Search Category
  const [filter, setFilter] = useState("");

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  const dataSearch = categoryArr.filter((item) => {
    return item.name
      .toLowerCase()
      .includes(filter.toLowerCase() || Number(filter));
  });

  // Slider
  const [noOfElement, setNoOfElement] = useState(3);

  const loadMore = () => {
    if (categoryArr.length > noOfElement) {
      setNoOfElement(noOfElement + 3);
    }
  };

  const loadLess = () => {
    if (noOfElement > 5) {
      setNoOfElement(noOfElement - 3);
    } 
    if(filter.length > 0){
      setNoOfElement(noOfElement * 0 + 3)
    }

  };

  // Side Navbar
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const [show, setShow] = useState(false);

  const [modelDelete, setModelDelete] = useState(false);

  return (
    <>
      <div className={theme ? "theme-dark" : ""}>
        <div className="categories-page">
          <h1
            className={
              modelDelete
                ? "text-center title-shop openModel"
                : "text-center title-shop"
            }
          >
            Shop
          </h1>
          {user?.isAdmin && filter.length === 0 ? (
            <div className="col-12 mb-2">
              <Link to={`/create`}>
                <button
                  className={
                    modelDelete
                      ? "btn btn-primary mt-4 fs-6 openModel"
                      : "btn btn-primary mt-4 fs-6"
                  }
                >
                  Create Category
                </button>
              </Link>
            </div>
          ) : null}
          <h4
            className={
              modelDelete
                ? "from-label fs-5 search-location mt-3 openModel"
                : "from-label fs-5 search-location mt-3"
            }
          >
            Search: &nbsp;
          </h4>
          <input
            type="text"
            className={
              modelDelete
                ? "from-control search-location col-sm-6 col-md-5 col-lg-4 mb-2 openModel"
                : "from-control search-location col-sm-6 col-md-5 col-lg-4 mb-2"
            }
            value={filter}
            onChange={(e) => {
              searchText(e);
            }}
          />
          <div
            className="
          row justify-content-center mt-3"
          >
            {filter.length === 0 &&
              categoryArr.slice(0, noOfElement).map((item, index) => {
                return (
                  <CategoryCard
                    key={index}
                    item={item}
                    modelDelete={modelDelete}
                    setModelDelete={setModelDelete}
                  />
                );
              })}

            {filter.length > 0 && dataSearch.length > 0 ? (
              dataSearch.slice(0, noOfElement).map((item, index) => {
                return (
                  <CategoryCard
                    key={index}
                    item={item}
                    modelDelete={modelDelete}
                    setModelDelete={setModelDelete}
                  />
                );
              })
            ) : filter.length > 0 && dataSearch.length === 0 ? (
              <div>
                <h3 className="text-center mt-4"> Category Doesn't Found</h3>
              </div>
            ) : null}

            {(filter.length !== 0 && dataSearch.length !== 0) ||
            filter.length === 0 ? (
              <button
                disabled={
                  (noOfElement >= dataSearch.length && dataSearch.length > 0) ||
                  (noOfElement >= categoryArr.length &&
                    categoryArr.length > 0) ||
                  (filter.length >= 1 && dataSearch.length <= 0) ||
                  modelDelete
                }
                className={
                  theme
                    ? "btn btn-light d-block py-1 col-12 container mb-1"
                    : "btn btn-primary d-block py-1 col-12 container mb-1"
                }
                onClick={() => loadMore()}
              >
                Load More &nbsp;
                <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
              </button>
            ) : null}
            {(filter.length !== 0 && dataSearch.length !== 0) ||
            filter.length === 0 ? (
              <button
                className={
                  theme
                    ? "btn btn-light d-block py-1 col-12 container mb-4"
                    : "btn btn-primary d-block py-1 col-12 container mb-4"
                }
                disabled={noOfElement <= 3 || modelDelete}
                onClick={() => loadLess()}
              >
                Load Less &nbsp;
                <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
              </button>
            ) : null}

            {filter.length >= 1 && dataSearch.length === 0 ? (
              <div className="add-size"></div>
            ) : null}
          </div>
          <div>
            <motion.nav
              animate={show ? "open" : "closed"}
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <motion.div className={modelDelete ? "openModel" : ""}>
                <hr className="hr-nav"></hr>
                {/* Dark */}
                {theme ? (
                  <h5 className="theme-title fs-4"> Switch Light</h5>
                ) : (
                  <h5 className="theme-title fs-4"> Switch Dark</h5>
                )}
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={() => {
                      setTheme(!theme);
                      setShow(false);
                    }}
                  />
                  <span className="slider round"></span>
                </label>
              </motion.div>
            </motion.nav>
            {!modelDelete && !show ? (
              <motion.button
                className="toggle arrow"
                onClick={() => setShow((show) => !show)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
              >
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              </motion.button>
            ) : !modelDelete && show ? (
              <motion.button
                className="toggle x"
                onClick={() => setShow((show) => !show)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
              >
                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
              </motion.button>
            ) : modelDelete && !show ? (
              <motion.button
                className="toggle arrow openModel2"
                onClick={() => setShow((show) => !show)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
              >
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              </motion.button>
            ) : modelDelete && show ? (
              <motion.button
                className="toggle x openModel"
                onClick={() => setShow((show) => !show)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
              >
                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
              </motion.button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
