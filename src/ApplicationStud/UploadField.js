import React from "react";
import { Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function UploadField({ name, label, handleUpload }) {
  return (
    <Form.Item
      name={name}
      label={label}
      valuePropName="fileList"
      getValueFromEvent={handleUpload}
      rules={[
        {
          required: true,
          message: "Please upload a certificate",
          validator: (_, fileList) => {
            return fileList && fileList.length > 0;
          },
        },
      ]}
    >
      <Upload
        name="file"
        beforeUpload={() => false}
        accept=".pdf,.doc,.docx"
        maxCount={1}
        multiple={false}
      >
        <Button icon={<UploadOutlined />}>{`Upload ${label}`}</Button>
      </Upload>
    </Form.Item>
  );
}

export default UploadField;
