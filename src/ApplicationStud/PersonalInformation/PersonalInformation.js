import React, { useEffect, useState } from "react";
import { Form, Button, Spin, message, Steps, notification, theme } from "antd";
import FormField from "../FormField";
import RadioBtn from "./RadioBtn";
import SelectField from "../SelectField";

const PersonalInformation = (props) => {
  //get data from local storage
  const data = localStorage.getItem("applicationData");
  const personalInformation = JSON.parse(data);

  //fields
  const [name, setName] = useState(
    personalInformation ? personalInformation.name : ""
  );
  const [ic, setIc] = useState(
    personalInformation ? personalInformation.ic : ""
  );
  const [address, setAddress] = useState(
    personalInformation ? personalInformation.address : ""
  );
  const [gender, setGender] = useState(
    personalInformation ? personalInformation.gender : "Male"
  );
  const [postalCode, setPostalCode] = useState(
    personalInformation ? personalInformation.postalCode : ""
  );
  const [state, setState] = useState(
    personalInformation ? personalInformation.state : ""
  );
  const [city, setCity] = useState(
    personalInformation ? personalInformation.city : ""
  );
  const [phone, setPhone] = useState(
    personalInformation ? personalInformation.phone : ""
  );
  const [email, setEmail] = useState(
    personalInformation ? personalInformation.email : ""
  );

  // Function to validate whether all required fields are filled
  const validateFields = () => {
    const requiredFields = [
      name,
      ic,
      address,
      postalCode,
      state,
      city,
      phone,
      email,
    ];
    const areAllFieldsFilled = requiredFields.every((field) => field !== "");
    props.setIsContinueDisabled(!areAllFieldsFilled);
  };

  //handlers
  const handleNameChange = (e) => {
    setName(e.target.value);
    validateFields();
  };
  const handleIcChange = (e) => {
    setIc(e.target.value);
    validateFields();
  };
  const handleGenderChange = (selectedValue) => {
    setGender(selectedValue);
    console.log("Selected gender:", selectedValue);
    validateFields();
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    validateFields();
  };
  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
    validateFields();
  };
  const handleStateChange = (value) => {
    setState(value);
    validateFields();
  };
  const handleCityChange = (value) => {
    setCity(value);
    validateFields();
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    validateFields();
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateFields();
  };

  //selectField options
  const stateOptions = [
    { label: "Johor", value: "Johor" },
    { label: "Kedah", value: "Kedah" },
    { label: "Kelantan", value: "Kelantan" },
    { label: "Kuala Lumpur", value: "Kuala Lumpur" },
    { label: "Selangor", value: "Selangor" },
  ];
  const cityOptionsMap = {
    Johor: [
      { label: "Johor Bahru", value: "Johor Bahru" },
      { label: "Kota Bharu", value: "Kota Bharu" },
      { label: "Kluang", value: "Kluang" },
      { label: "Mersing", value: "Mersing" },
      { label: "Muar", value: "Muar" },
    ],
    Kedah: [
      { label: "Alor Setar", value: "Alor Setar" },
      { label: "Baling", value: "Baling" },
      { label: "Kota Setar", value: "Kota Setar" },
      { label: "Kuala Muda", value: "Kuala Muda" },
      { label: "Kubang Pasu", value: "Kubang Pasu" },
    ],
    Kelantan: [
      { label: "Bachok", value: "Bachok" },
      { label: "Gua Musang", value: "Gua Musang" },
      { label: "Jeli", value: "Jeli" },
      { label: "Kota Bharu", value: "Kota Bharu" },
      { label: "Kuala Krai", value: "Kuala Krai" },
    ],
    "Kuala Lumpur": [
      { label: "Cheras", value: "Cheras" },
      { label: "Kepong", value: "Kepong" },
      { label: "Kuala Lumpur", value: "Kuala Lumpur" },
      { label: "Lembah Pantai", value: "Lembah Pantai" },
      { label: "Titiwangsa", value: "Titiwangsa" },
    ],
    Selangor: [
      { label: "Gombak", value: "Gombak" },
      { label: "Hulu Langat", value: "Hulu Langat" },
      { label: "Hulu Selangor", value: "Hulu Selangor" },
      { label: "Klang", value: "Klang" },
      { label: "Kuala Langat", value: "Kuala Langat" },
    ],
  };
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  //useEffect
  useEffect(() => {
    props.setIsContinueDisabled(true);
  }, [props.setIsContinueDisabled]);


  //useEffect to save data to local storage
    useEffect(() => {
        const personalInformation = {
            name,
            ic,
            address,
            gender,
            postalCode,
            state,
            city,
            phone,
            email,
        };
        localStorage.setItem(
            "applicationData",
            JSON.stringify(personalInformation)
        );

        //validate fields
        validateFields();
    }, [
        name,
        ic,
        address,
        gender,
        postalCode,
        state,
        city,
        phone,
        email,
    ]);

    //TODO - state and city cannot persist after come back from next setp




  return (
    <>
      <Form
        className="mx-auto p-10"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
      >
        <FormField
          label="Name"
          name="name"
          value={name}
          defaultValue={name}
          onChange={handleNameChange}
        />
        <FormField label="IC" name="ic" value={ic} onChange={handleIcChange} />
        <RadioBtn
          options={genderOptions}
          onChange={handleGenderChange}
          label="Gender: "
          choose={gender}
        />
        <FormField
          label="Address"
          name="address"
          value={address}
          onChange={handleAddressChange}
        />
        <FormField
          label="Postal Code"
          name="postalCode"
          value={postalCode}
          onChange={handlePostalCodeChange}
        />
        <SelectField
          name="State"
          label="State"
          options={stateOptions}
          value={state}
          onChange={(value) => handleStateChange(value)}
        />
        <SelectField
          name="City"
          label="City"
          options={cityOptionsMap[state] || []}
          value={city}
          onChange={(value) => handleCityChange(value)}
        />
        <FormField
          label="Phone"
          name="phone"
          value={phone}
          onChange={handlePhoneChange}
        />
        <FormField
          label="Email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      </Form>
    </>
  );
};

export default PersonalInformation;
