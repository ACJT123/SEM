import React, { useEffect, useState } from "react";
import SelectField from "../SelectField";
import AddResultTable from "./AddResultTable";
import NumberField from "../NumberField";

function Qualification() {
  //fields
  const [qualification, setQualification] = useState("");
  const [previousQualification, setPreviousQualification] = useState("");

  // Handlers
  const handleQualificationChange = (value) => {
    setQualification(value);
  };

  const handlePreviousQualificationChange = (value) => {
    setPreviousQualification(value);
  };

  const isDiplomaQualification =
    qualification === "TARUMT Relavant Diploma" ||
    qualification === "IHL Diploma";

  //options
  const qualificationOptions = [
    {
      label: "STPM",
      value: "STPM",
    },
    {
      label: "A-Level",
      value: "A-Level",
    },
    {
      label: "UEC",
      value: "UEC",
    },
    {
      value: "TARUMT Foundation In Computing Track A",
      label: "TARUMT Foundation In Computing Track A",
    },
    {
      value: "TARUMT Relavant Diploma",
      label: "TARUMT Relavant Diploma",
    },
    {
      value: "IHL Foundation",
      label: "IHL Foundation",
    },
    {
      value: "IHL Diploma",
      label: "IHL Diploma",
    },
  ];
  const previousQualificationOptions = [
    {
      label: "SPM",
      value: "SPM",
    },
    {
      label: "O-Level",
      value: "O-Level",
    },
    {
      label: "UEC",
      value: "UEC",
    },
  ];
  // useEffect(() => {
  //   if (
  //     qualification === "TARUMT Relavant Diploma" ||
  //     qualification === "TARUMT Foundation In Computing Track A"
  //   ) {
  //     setPreviousQualification(previousQualificationOptions[0].value);
  //   }
  // }, [qualification]);

  return (
    <>
      <h1
        className="
          text-gray-800
          font-semibold
          pb-2
        "
      >
        Choose qualifications
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "50%",
          }}
        >
          <SelectField
            label="Qualification"
            name="qualification"
            value={qualification}
            onChange={handleQualificationChange}
            options={qualificationOptions}
          />
        </div>
        <div
          style={{
            width: "50%",
          }}
        >
          <SelectField
            label="Previous Qualification"
            name="previous qualification"
            value={previousQualification}
            onChange={handlePreviousQualificationChange}
            options={previousQualificationOptions || []}
            disable={
              qualification === "TARUMT Relavant Diploma" ||
              qualification === "TARUMT Foundation In Computing Track A" ||
              qualification === "UEC"
            }
          />
        </div>
      </div>
      <div>
        <h1
          className="
          text-gray-800
          font-semibold
          pb-2
        "
        >
          Enter grades
        </h1>
        <AddResultTable
          previousQualification={previousQualification}
          qualification={qualification}
        />
      </div>
      {isDiplomaQualification && (
        <div>
          <NumberField
            label="CGPA"
            name="cpga"
            placeholder="0.0000"
            step={0.0001}
          />
        </div>
      )}
    </>
  );
}

export default Qualification;
