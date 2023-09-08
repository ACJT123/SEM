import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table, Select } from "antd";

const AddResultTable = (props) => {
  const tarumtQualification = [
    {
      key: "1",
      subject: "Bahasa Malaysia",
    },
  ];
  const spmPreviousQualification = [
    {
      key: "1",
      subject: "Bahasa Malaysia",
    },
    {
      key: "2",
      subject: "Additional Mathematics",
    },
    {
      key: "3",
      subject: "English",
    },
  ];
  const uecPreviousQualification = [
    {
      key: "1",
      subject: "Bahasa Malaysia",
    },
    {
      key: "2",
      subject: "English",
    },
  ];
  const oLevelPreviousQualification = [
    {
      key: "1",
      subject: "Bahasa Malaysia",
    },
    {
      key: "2",
      subject: "English",
    },
    {
      key: "3",
      subject: "Mathematics-Additional",
    },
    {
      key: "4",
      subject: "Mathematics",
    },
  ];

  const [rows, setRows] = useState();

  // Initialize the rows based on props.previousQualification
  useEffect(() => {
    if (props.previousQualification === "SPM") {
      setRows(spmPreviousQualification);
    } else if (props.previousQualification === "UEC") {
      setRows(uecPreviousQualification);
    } else if (props.previousQualification === "O-Level") {
      setRows(oLevelPreviousQualification);
    }

    return () => {};
  }, [props.previousQualification]);

  useEffect(() => {
    if (
      props.qualification === "TARUMT Relavant Diploma" ||
      props.qualification === "TARUMT Foundation In Computing Track A"
    ) {
      setRows(tarumtQualification);
    }

    return () => {};
  }, [props.qualification]);

  // Debugging logs
  console.log("props.previousQualification:", props.previousQualification);
  console.log("Initial value of rows:", rows);

  //user choose the subject and grades from selct field
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [submittedData, setSubmittedData] = useState([]);

  //add new row
  const addRow = () => {
    const newRow = {
      key: rows.length + 1,
      subject: subject,
      grade: grade,
    };
    setRows([...rows, newRow]);
  };

  //delete row
  const deleteRow = (key) => {
    setRows(rows.filter((item) => item.key !== key));
  };

  //selectField options
  const subjectOptions = [
    {
      value: "Mathematics",
      label: "Mathematics",
    },
    {
      value: "English",
      label: "English",
    },
    {
      value: "Bahasa Malaysia",
      label: "Bahasa Malaysia",
    },
    {
      value: "Science",
      label: "Science",
    },
    {
      value: "History",
      label: "History",
    },
  ];
  const gradeOptions = [
    {
      value: "A",
      label: "A",
    },
    {
      value: "B",
      label: "B",
    },
    {
      value: "C",
      label: "C",
    },
    {
      value: "D",
      label: "D",
    },
    {
      value: "E",
      label: "E",
    },
  ];

  const handleSubmit = () => {
    // When the user submits, you can access all selected subjects with their grades from the `rows` state.
    console.log(rows);
  };

  //useEffect
  useEffect(() => {
    console.log(rows);
  }, [rows]);

  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      width: "30%",
      render: (text, record) => (
        <Select
          style={{
            width: "200px",
          }}
          value={text} // Use value instead of defaultValue
          onChange={(value) => handleSubjectChange(value, record.key)}
        >
          {subjectOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      render: (text, record) => (
        <Select
          value={text} // Use value instead of defaultValue
          onChange={(value) => handleGradeChange(value, record.key)}
        >
          {gradeOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteRow(record.key)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleSubjectChange = (value, key) => {
    // Update the subject for the specified row key
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.key === key ? { ...row, subject: value } : row
      )
    );
  };

  const handleGradeChange = (value, key) => {
    // Update the grade for the specified row key
    setRows((prevRows) =>
      prevRows.map((row) => (row.key === key ? { ...row, grade: value } : row))
    );
  };
  return (
    <>
      <Button
        type="default"
        onClick={() => addRow()}
        style={{
          marginBottom: "10px",
        }}
        disabled={
          props.qualification === "" ||
          (!(
            props.qualification === "TARUMT Relavant Diploma" ||
            props.qualification === "TARUMT Foundation In Computing Track A"
          ) &&
            props.previousQualification === "")
        }
      >
        Add Row
      </Button>
      {/* <Button
        type="primary"
        onClick={() => handleSubmit()}
        style={{
          marginTop: "10px",
          marginLeft: "10px",
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
        }}
      >
        Submit
      </Button> */}
      <Table columns={columns} dataSource={rows} pagination={false} />
    </>
  );
};

export default AddResultTable;
