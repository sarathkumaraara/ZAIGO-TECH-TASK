/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Spinner,
} from "reactstrap";

//redux

import { Link, useNavigate } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions

import {
  accountLogin,
} from "../services/clients/clientsExport";
import { setAuthorization } from "../services/constant";
import { ErrorToastify } from "../components/Toastify";
import { ToastContainer } from "react-toastify";

const Login: React.FC = ( ) => {
    const navigate = useNavigate()
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);


  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "sarath@gmail.com",
      password: "dummy@123",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      accountLogin(values)
        .then((res: any) => {
          const data = res.data;
          console.log(data)
          if (data) {
            setAuthorization(data.token, data.userDetails._id);
            sessionStorage.setItem("accessToken", data.token);
            sessionStorage.setItem(
              "userDetails",
              JSON.stringify(data.userDetails)
            );
            sessionStorage.setItem("userId", data.userDetails._id);
            navigate("/dashboard", {
              state: {
                email_id: data.userDetails.email,
                credential: values,
                type: "signin",
              },
            });
            localStorage.setItem("isRemembered", JSON.stringify(rememberMe));
            localStorage.setItem("uid", data.userDetails._id);
          } else {
            ErrorToastify(
              "Unable To Authenticate, Kindly Please Try Again.."
            );
          }
          setLoading(false);
        })
        .catch((err:any) => {
          console.error(err.message);
          ErrorToastify("Unable To Authenticate, Kindly Please Try Again.");
          setLoading(false);
        });
    },
  });

  const handle_remember = () => {
    setRememberMe(!rememberMe);
  };

  return (
          <Container>
            <Row className="">
              <Col lg={12}>
                <div className="text-center mt-sm-3 mb-2 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo">
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">
                    Task Management System
                  </p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Welcome Back !</h5>
                    </div>
                    <div className="p-2 mt-4">
                      <Form
                      autoComplete="off"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                        action="#"
                      >
                        <div className="mb-3">
                          <Label
                            htmlFor="email"
                            className="form-label"
                          >
                            Email
                          </Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="text"
                            autoComplete="off"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email}
                            invalid={
                              !!(
                                validation.touched.email &&
                                validation.errors.email
                              )
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              name="password"
                              value={validation.values.password}
                              type={passwordShow ? "text" : "password"}
                              className="form-control pe-5"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                !!(
                                  validation.touched.password &&
                                  validation.errors.password
                                )
                              }
                            />
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}

                            <Button
                              style={{
                                backgroundColor: "white",
                                borderColor: "lightgrey",
                              }}
                              onClick={() => setPasswordShow(!passwordShow)}
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted bg-transparent border-0"
                              type="button"
                              id="password-addon"
                            >
                              <span>
                                <i className="ri-eye-fill align-middle"></i>
                              </span>
                            </Button>
                          </div>
                        </div>

                        <div className="form-check">
                          <Input
                            type="checkbox"
                            id="auth-remember-check"
                            checked={rememberMe}
                            onChange={handle_remember}
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="auth-remember-check"
                          >
                            Remember me
                          </Label>
                        </div>

                        <div className="mt-4">
                          <Button
                            disabled={loading}
                            color="success"
                            className="btn btn-success w-100"
                            type="submit"
                          >
                            {loading ? (
                              <Spinner size="sm" className="me-2">
                                Loading...
                              </Spinner>
                            ) : null}
                            Sign In
                          </Button>
                        </div>
                      </Form>
                      <ToastContainer/>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
  );
};

export default Login;
