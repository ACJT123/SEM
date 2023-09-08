import React, { useEffect, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Form, Button, Spin, message, Steps, notification, theme } from "antd";
import ApplicationForm from "./ApplicationForm"; // Import the ApplicationForm component
import PersonalInformation from "./PersonalInformation/PersonalInformation";
import Qualification from "./Qualification/Qualification";

function Step() {
  const [current, setCurrent] = useState(0);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);

  const steps = [
    {
      title: "Personal Information",
      content: <PersonalInformation setIsContinueDisabled={setIsContinueDisabled} />, 
    },
    {
      title: "Choose Programme",
      content: <ApplicationForm />, 
    },
    {
      title: "Qualification",
      content: <Qualification />,
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];

  const { token } = theme.useToken();

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };

  

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Back
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button
            className="
              bg-blue-500
              text-white
            "
            type="primary"
            onClick={() => next()}
            disabled={isContinueDisabled}
          >
            Continue
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="default"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
      </div>
    </>
  );
}

export default Step;
