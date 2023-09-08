import React from "react";
import { Input, Form } from "antd";
const { TextArea } = Input;
function TextAreaForAddress() {
  <>
    <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
  </>;
}
export default TextAreaForAddress;
