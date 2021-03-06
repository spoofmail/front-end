import React, { useState } from "react";

export default (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(_ => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    const setValue = value => {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    return [storedValue, setValue];
}