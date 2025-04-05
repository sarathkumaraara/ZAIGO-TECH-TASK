/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardTitle, Col, FormGroup, Input, Label, Row } from "reactstrap";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { getAllTaskList } from "../services/clients/tasks";
import { ErrorToastify } from "../components/Toastify";
import { ToastContainer } from "react-toastify";

const Dashboard: React.FC = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("todo");

  const fetchData = async () => {
    try {
      const result: any = await getAllTaskList(0, status);
      if (result.data) {
        setData(result.data);
      }
    } catch (error: any) {
      console.log(error.message);
      ErrorToastify("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [status]);
  const columns: any = [
    {
      name: "Title",
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: any) => row.description,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
      sortable: true,
    },
    {
      name: "Assigned To",
      selector: (row: any) => row.assignedTo.name,
      sortable: true,
    },
    {
      name: "Created By",
      selector: (row: any) => row.createdBy.name,
      sortable: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#3b3b3b",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        padding: "12px 15px",
        fontSize: "14px",
        color: "#555",
        borderBottom: "1px solid #ddd",
      },
    },
  };
  const handleChange = ({ target }: any) => {
    setStatus(target.value);
  };

  return (
    <Card>
      <Row className="justify-content-between my-4 text-white bg-primary rounded-4 mx-auto">
        <span className="justify-content-between align-items-center mx-auto fs-4 fw-bold">Task Management System</span>
      </Row>
      <Row>
        <Col lg={4}></Col>
        <Col lg={4}></Col>
        <Col lg={4}>
            <Row>
            <div>Select Status</div>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              onChange={handleChange}
            >
              <option>todo</option>
              <option>inprogress</option>
              <option>completed</option>
            </Input>
            </Row>
        </Col>
      </Row>
      <DataTable columns={columns} data={data} customStyles={customStyles} />
      <ToastContainer />
    </Card>
  );
};

export default Dashboard;
