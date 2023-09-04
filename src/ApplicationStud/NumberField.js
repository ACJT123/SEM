import React from "react";
import { Form, InputNumber } from "antd";

function NumberField({ name, label, rules, step, min, max, placeholder }) {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <InputNumber
        step={step}
        min={min}
        max={max}
        placeholder={placeholder}
      />
    </Form.Item>
  );
}

export default NumberField;