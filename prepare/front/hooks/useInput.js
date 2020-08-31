import { useState, useCallback } from "react";

const useInput = (initialValue = null) => {
    const [value, setValue] = useState(initialValue);
    const onChange = useCallback((e) => {
        setValue(e.target.value);
    });
    return [value, onChange, setValue];
};

export default useInput;
