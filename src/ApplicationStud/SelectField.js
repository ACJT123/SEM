import React from "react";
import { Form, Select } from "antd";

function SelectField({ name, label, options, onChange }) {
  return (
    <Form.Item name={name} label={label} rules={[{ required: true, message: `Please select your ${label}` }]}>
      <Select placeholder={`Select your ${label}`} onChange={onChange}>
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}

export default SelectField;
