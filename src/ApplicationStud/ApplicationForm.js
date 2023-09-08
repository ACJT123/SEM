import React, { useEffect, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Form, Button, Spin, message, Steps, notification, theme } from "antd";
import FormField from "./FormField";
import SelectField from "./SelectField";
import UploadField from "./UploadField";
import NumberField from "./NumberField";
import Success from "./Success";
import ValidateApplications from "./ValidateApplications";
import Step from "./Step";
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
  const [cpga, setCpga] = useState("");
  const [cert, setCert] = useState(null);
  


  //ui
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, msg) => {
    api.info({
      message: msg.message,
      description: msg.description,
      icon: msg.icon,
      placement,
    });
  };

  //selectField options
  const tarumtOptions = [
    {
      value: "TARUMT Foundation In Computing Track A",
      label: "Foundation in Computing (Track A)",
    },
    {
      value: "TARUMT Relavant Diploma",
      label: "Relavant Diploma (with minimum CPGA 2.50000)",
    },
  ];
  const otherIhlOptions = [
    {
      value: "IHL Foundation",
      label: "Foundation",
    },
    {
      value: "IHL Diploma",
      label: "Diploma",
    },
  ];

  //fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await supabase.from("application").select();
        console.log("Data fetched:", data);

        // Check if the application is approved and trigger a notification
        if (data && data.length > 0) {
          const lastApplication = data[data.length - 1]; // Assuming you want to check the latest application
          if (lastApplication.status === "Approved") {
            const msg = {
              message: "Your application has been approved!",
              description: "Please check your email for further instructions.",
              icon: <SmileOutlined style={{ color: "#108ee9" }} />,
            };
            openNotification("topRight", msg); // You can customize the notification placement
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    fetchData();
    supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "application",
        },
        (payload) => {
          fetchData();
        }
      )
      .subscribe();
  }, []);

  //handlers
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCpgaChange = (value) => {
    setCpga(value);
  };

  const handleLevelChange = (value) => {
    setSelectedLevel(value);
  };

  const handleInChange = (value) => {
    setSelectedIn(value);
  };

  const handleCertificateUpload = (info) => {
    // 'info' contains information about the uploaded file
    if (info.fileList.length > 0) {
      const uploadedFile = info.fileList[0].originFileObj;
      setCert(uploadedFile);
    }

    return info.fileList; // Return the fileList to update the Form.Item
  };

  const handleSubmit = async () => {
    if (
      !(
        name === "" ||
        selectedLevel === "" ||
        (selectedLevel === "TAR UMT/TAR UC" && selectedIn === "") ||
        (selectedLevel === "Other IHL" && selectedIn === "") ||
        ((selectedIn === "TARUMT Relavant Diploma") === "" && cpga === "") ||
        ((selectedIn === "IHL Diploma") === "" && cpga === "") ||
        cert === null
      )
    ) {
      setLoading(true);

      await supabase.storage.from("Certificates").upload(`${name}.pdf`, cert, {
        cacheControl: "3600",
        upsert: false,
      });

      const { data, error } = supabase.storage
        .from("Certificates")
        .getPublicUrl(`${name}.pdf`);

      const url = data.publicUrl;

      const applicationData = {
        name: name,
        level_of_study:
          selectedLevel === "TAR UMT/TAR UC" || selectedLevel === "Other IHL"
            ? selectedIn
            : selectedLevel,
        status: "Pending",
        cpga: parseFloat(cpga),
        certificate: url,
      };

      console.log("Data to be inserted:", applicationData);

      // Check if the data is valid for submission
      if (ValidateApplications(applicationData)) {
        try {
          const { datadata: application, error } = await supabase
            .from("application")
            .insert([applicationData]);

          if (error) {
            console.error("Error inserting data:", error.message);
          } else {
            setLoading(false);
            setMessage(true);
            console.log("Data inserted successfully:", application);
            resetForm();
          }
        } catch (error) {
          console.error("Error inserting data:", error.message);
        }
      } else {
        await supabase.storage.from("Certificates").remove([`${name}.pdf`]);
        setLoading(false);
        setMessage(false);
      }
    }
  };

  const [form] = Form.useForm();

  const resetForm = () => {
    form.resetFields();
    setSelectedLevel("");
    setSelectedIn("");
  };

  return (
    <>
      {contextHolder}
      {/* <Header /> */}

      <Spin spinning={loading} tip="Submitting">
        {message ? (
          <Success
            title="Your application has been submitted successfully!"
            subTitle="Please wait for the admin to approve your application."
            backToHome={() => {
              setMessage(false);
            }}
          />
        ) : (
          <Form
            className="mx-auto p-10"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
            layout="horizontal"
            form={form}
          >
            <FormField
              name="Name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
              value={name}
              onChange={handleNameChange}
            />
            <SelectField
              name="Level of Study"
              label="Level of Study"
              options={[
                { value: "STPM", label: "STPM" },
                { value: "A-Level", label: "A-Level" },
                { value: "UEC", label: "UEC" },
                { value: "Other IHL", label: "Other IHL" },
                { value: "TAR UMT/TAR UC", label: "TAR UMT/TAR UC" },
              ]}
              onChange={handleLevelChange}
            />

            {selectedLevel === "TAR UMT/TAR UC" &&
              getInLevelStudyComponent(handleInChange, tarumtOptions)}

            {selectedLevel === "Other IHL" &&
              getInLevelStudyComponent(handleInChange, otherIhlOptions)}

            {(selectedIn === "TARUMT Relavant Diploma" ||
              selectedIn === "IHL Diploma") && (
              <NumberField
                rules={[
                  { required: true, message: "Please enter your CPGA" },
                  { type: "number", message: "Please enter a valid number" },
                ]}
                name="cpga"
                label="CPGA"
                step={0.0001}
                min={0.0}
                max={4.0}
                placeholder="0.0000"
                value={cpga}
                onChange={handleCpgaChange}
              />
            )}

            <UploadField
              name="cert"
              label="Certificate"
              handleUpload={handleCertificateUpload}
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

function getInLevelStudyComponent(handleInChange, option) {
  return (
    <SelectField
      name="in"
      label="In"
      options={option}
      onChange={handleInChange}
    />
  );
}

export default ApplicationForm;
