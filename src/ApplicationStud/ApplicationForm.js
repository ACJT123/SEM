import React, { useState } from "react";
import { Form, Button, Spin } from "antd";
import FormField from "./FormField";
import SelectField from "./SelectField";
import UploadField from "./UploadField";
import NumberField from "./NumberField";
import Success from "./Success";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wxiywbcwpvxhrcspydrx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4aXl3YmN3cHZ4aHJjc3B5ZHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM3NTA2NDksImV4cCI6MjAwOTMyNjY0OX0.gBF6C_LxOkJL2R0EaBiG5eZoIPgbjb-MPNbecP7XFWA"
);

const Header = () => (
  <div
    style={{ textAlign: "center" }}
    className="text-xl bg-blue-400 text-white p-4 mb"
  >
    <h1>New Student Application Form</h1>
  </div>
);

function ApplicationForm() {
  const [name, setName] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedIn, setSelectedIn] = useState("");
  const [selectedInOtherIhl, setSelectedInOtherIhl] = useState("");
  const [cpga, setCpga] = useState("");
  const [cert, setCert] = useState("");

  //ui
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpload = (file) => {
    // Handle file upload logic
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLevelChange = (value) => {
    setSelectedLevel(value);
  };

  const handleInChange = (value) => {
    setSelectedIn(value);
  };

  const handleInOtherIhlChange = (value) => {
    setSelectedInOtherIhl(value);
  };

  const handleSubmit = async (values) => {
    // Set the loading state to true
    setIsLoading(true);

    const data = {
      name: name,
      level_of_study: selectedLevel,
      status: "pending",
      certificate: cert,
    };

    // Insert the data into the Supabase table
    try {
      const { data: application, error } = await supabase
        .from("application")
        .insert([data]);

      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        setIsSuccess(true);
        console.log("Data inserted successfully:", application);

        // Reset the form or perform other actions after insertion
        resetForm();
      }
    } catch (error) {
      console.error("Error inserting data:", error.message);
    } finally {
      // Set the loading state back to false after submission completes
      setIsLoading(false);
    }
  };

  const [form] = Form.useForm();

  const resetForm = () => {
    form.resetFields();
    setSelectedLevel("");
    setSelectedIn("");
    setSelectedInOtherIhl("");
  };

  return (
    <>
      <Header />
      <Spin spinning={isLoading} tip="Submitting">
        {isSuccess ? (
          <Success />
        ) : (
          <Form
            className="mx-auto p-10"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
            layout="horizontal"
            form={form}
          >
            <FormField
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
              value={name}
              onChange={handleNameChange}
            />
            <SelectField
              name="level"
              label="Level of Study"
              options={[
                { value: "stpm", label: "STPM" },
                { value: "a-level", label: "A-Level" },
                { value: "uec", label: "UEC" },
                { value: "other-ihl", label: "Other IHL" },
                { value: "tarumt-taruc", label: "TAR UMT/TAR UC" },
              ]}
              onChange={handleLevelChange}
            />

            {selectedLevel === "tarumt-taruc" &&
              getTarumtTarucLevelStudyComponent(handleInChange)}

            {selectedLevel === "other-ihl" &&
              getOtherIhlLevelStudyComponent(handleInOtherIhlChange)}

            {(selectedIn === "tarumt-relavant-diploma" ||
              selectedInOtherIhl === "ihl-diploma") && (
              <>
                <NumberField
                  rules={[
                    { required: true, message: "Please enter your CPGA" },
                  ]}
                  name="cpga"
                  label="CPGA"
                  step={0.0001}
                  min={0.0}
                  max={4.0}
                  placeholder="0.0000"
                  onChange={handleInChange}
                />
              </>
            )}

            <UploadField
              name="cert"
              label="Certificate"
              handleUpload={handleUpload}
            />

            <Form.Item
              wrapperCol={{
                span: 10,
                offset: 8,
              }}
            >
              <Button type="secondary" htmlType="button" onClick={resetForm}>
                Reset
              </Button>

              <Button htmlType="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Spin>
    </>
  );
}

function getOtherIhlLevelStudyComponent(handleInOtherIhlChange) {
  return (
    <SelectField
      name="in"
      label="In"
      options={[
        { value: "ihl-foundation", label: "Foundation" },
        { value: "ihl-diploma", label: "Diploma" },
      ]}
      onChange={handleInOtherIhlChange}
    />
  );
}

function getTarumtTarucLevelStudyComponent(handleInChange) {
  return (
    <SelectField
      name="in"
      label="In"
      options={[
        {
          value: "tarumt-foundation-in-computing-track-a",
          label: "Foundation in Computing (Track A)",
        },
        {
          value: "tarumt-relavant-diploma",
          label: "Relevant Diploma (with minimum CPGA 2.50000)",
        },
      ]}
      onChange={handleInChange}
    />
  );
}

export default ApplicationForm;
