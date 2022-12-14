import React, { useState, useEffect, useRef } from "react";
import { getCurrentUser } from "../../../services/usersServices";
import { createNewCategory } from "../../../services/categoriesServices";
import categorySchema from "../../../validation/categoryValidation";
import joi from "joi-browser";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faXmark,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { Navigate } from "react-router";
import { motion } from "framer-motion";


const NAME_REGEX = /^[A-Za-z\s]{1,15}$/;
const URL_REGEX =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
const ALT_REGEX = /^[A-Za-z0-9]{3,15}$/;

const CreateCategory = ({ theme, setTheme }) => {
  const user = getCurrentUser();
  const isAdmin = user?.isAdmin;

  // Side Navbar
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [url, setUrl] = useState("");
  const [validUrl, setValidUrl] = useState(false);
  const [urlFocus, setUrlFocus] = useState(false);

  const [alt, setAlt] = useState("");
  const [validAlt, setValidAlt] = useState(false);
  const [altFocus, setAltFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const nameRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = URL_REGEX.test(url);
    setValidUrl(result);
  }, [url]);

  useEffect(() => {
    const result = ALT_REGEX.test(alt);
    setValidAlt(result);
  }, [alt]);

  useEffect(() => {
    setErrMsg("");
  }, [name, url, alt]);

  const handleNameChange = (ev) => {
    setName(ev.target.value);
  };
  const handleUrlChange = (ev) => {
    setUrl(ev.target.value);
  };
  const handleAltChange = (ev) => {
    setAlt(ev.target.value);
  };

  const handleOnSubmit = async (ev) => {
    if (ev) {
      ev.preventDefault();
    }
    const v1 = NAME_REGEX.test(name);
    const v2 = URL_REGEX.test(url);
    const v3 = ALT_REGEX.test(alt);

    if (!v1 || !v2 || !v3) {
      setErrMsg("invalid Entry");
      return;
    }

    ev.preventDefault();
    const category = {
      name: name,
      url: url,
      alt: alt,
    };

    try {
      const validatedValue = joi.validate({ name, url, alt }, categorySchema, {
        abortEarly: false,
      });

      const { error } = validatedValue;

      if (!error) {
        await createNewCategory(category);
        toast.success(`category created successfully`);
        window.location = "/";
      }
    } catch (err) {}
  };

  return (
    <>
      {!user && <Navigate to="/" />}
      {!isAdmin && <Navigate to="/" />}

      <div className={theme ? "theme-dark long-category" : ""}>
        <div className="main container">
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <form onSubmit={handleOnSubmit}>
                <div className="fadeIn first">
                  <h1 className="text-center title-shop">Create Category</h1>
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label label-dark">
                    Name:
                    <span className={validName ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !name ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="text"
                    className={
                      validName
                        ? "form-control green-input"
                        : "form-control red-input"
                    }
                    id="name"
                    onChange={handleNameChange}
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="namenote"
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                    ref={nameRef}
                    autoComplete="off"
                    required
                  />
                  {theme ? (
                    <p
                      id="namenote"
                      className={
                        nameFocus && name && !validName
                          ? "instructions-dark"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must To Include 1 - 15 Characters
                    </p>
                  ) : (
                    <p
                      id="namenote"
                      className={
                        nameFocus && name && !validName
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must To Including 1 - 15 Characters
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="url" className="form-label label-dark">
                    URL:
                    <span className={validUrl ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validUrl || !url ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="text"
                    className={
                      validUrl
                        ? "form-control green-input"
                        : "form-control red-input"
                    }
                    id="url"
                    aria-describedby="urlnote"
                    onChange={handleUrlChange}
                    onFocus={() => setUrlFocus(true)}
                    onBlur={() => setUrlFocus(false)}
                    autoComplete="off"
                    required
                  />
                  {theme ? (
                    <p
                      id="urlnote"
                      className={
                        urlFocus && !validUrl
                          ? "instructions-dark"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must Be URL
                    </p>
                  ) : (
                    <p
                      id="urlnote"
                      className={
                        urlFocus && !validUrl ? "instructions" : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must Be URL
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="alt" className="form-label label-dark">
                    Alt:
                    <span className={validAlt ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validAlt || !alt ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="text"
                    className={
                      validAlt
                        ? "form-control green-input"
                        : "form-control red-input"
                    }
                    id="alt"
                    aria-describedby="altnote"
                    onChange={handleAltChange}
                    onFocus={() => setAltFocus(true)}
                    onBlur={() => setAltFocus(false)}
                    autoComplete="off"
                    required
                  />
                  {theme ? (
                    <p
                      id="altnote"
                      className={
                        altFocus && !validAlt ? "instructions-dark" : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                       Must To Include 3 - 15 Characters
                    </p>
                  ) : (
                    <p
                      id="altnote"
                      className={
                        altFocus && !validAlt ? "instructions" : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                       Must To Include 3 - 15 Characters
                    </p>
                  )}
                </div>

                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
              <div>
                <motion.nav
                  animate={show ? "open" : "closed"}
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div>
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
                <motion.button
                  className={show ? "toggle x" : "toggle arrow"}
                  onClick={() => setShow((show) => !show)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.1 }}
                >
                  {show ? (
                    <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                  ) : (
                    <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
