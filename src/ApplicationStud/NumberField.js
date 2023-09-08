import React from "react";
import { Form, InputNumber } from "antd";

function NumberField({ name, label, rules, step, min, max, placeholder, value, onChange}) {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <InputNumber
        value={value || undefined} // Ensure value is either a number or undefined
        onChange={onChange}
        step={step}
        min={min}
        max={max}
        placeholder={placeholder}
        maxLength={6}
      />
    </Form.Item>
  );
}

export default NumberField;
