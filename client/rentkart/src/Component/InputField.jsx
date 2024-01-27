import { useState, useCallback, useEffect } from 'react';

export default function InputField({ inputType, value, onChange, tagType, placeHolder = "Enter field", isRequired = true, inputFieldClass }) {
  const [inputVal, setInputVal] = useState(value || "");

  const handleChange = useCallback((event) => {
    if(event?.target.value) {
    setInputVal(event?.target.value);
    onChange(event?.target.value);
    }
  } , [inputVal])

  useEffect(() => {
    setInputVal(value)
  }, [value])

  return (
   <>
   { tagType === 'input' ? 
      <input
        value={inputVal}
        className={inputFieldClass}
        placeholder={placeHolder}
        required={isRequired}
        type={inputType || "text"}
        onChange={handleChange}
      />
      : <textarea 
          value={inputVal}
          className={inputFieldClass}
          placeholder={placeHolder}
          required={isRequired}
          type={inputType || "text"}
          onChange={handleChange}
        />
   }
   </>
  )
}
