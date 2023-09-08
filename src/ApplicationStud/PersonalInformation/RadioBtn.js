import React, { useState, useEffect } from 'react';
import { Radio } from 'antd';

function RadioBtn({ options, onChange, label, choose }) {
  const [value, setValue] = useState(choose || (options.length > 0 ? options[0].value : null));

  useEffect(() => {
    if (choose !== value) {
      setValue(choose);
    }
  }, [choose]);

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    onChange(selectedValue);
  };

  const radioButtons = options.map((option) => (
    <Radio key={option.value} value={option.value}>
      {option.label}
    </Radio>
  ));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' }}>
      {label && <div>{label}</div>}
      <Radio.Group onChange={handleOptionChange} value={value} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' }}>
        {radioButtons}
      </Radio.Group>
    </div>
  );
}

export default RadioBtn;
