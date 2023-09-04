import React from "react";
import { Form, Input } from "antd";

function FormField({ name, label, rules, value, onChange }) {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input 
      value={value}
      onChange={onChange}
        placeholder={`Please enter your ${label.toLowerCase()}`}
      />
    </Form.Item>
  );
}

export default FormField;
