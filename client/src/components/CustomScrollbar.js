import React, { useState } from "react";
import { Range } from "react-range";

const CustomScrollbar = ({ title, upperLimit, lowerLimit, initialValue, isRange, onChange }) => {
  const [values, setValues] = useState(initialValue || [lowerLimit, upperLimit]);
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleEnabled = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <button
          onClick={toggleEnabled}
          className={`px-2 py-0.5 rounded-md text-xs font-semibold text-white ${
            isEnabled ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          {isEnabled ? "Disable" : "Enable"}
        </button>
      </div>
      <Range
        disabled={!isEnabled}
        values={values}
        step={1}
        min={lowerLimit}
        max={upperLimit}
        onChange={(vals) => {
          setValues(vals);
          if (onChange) {
            onChange(vals);
          }
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className="h-2 w-full bg-gray-300 rounded-md relative"
          >
            <div
              ref={props.ref}
              style={{
                ...props.style,
                height: "2px",
                width: "100%",
                background: isEnabled ? "blue" : "gray",
                borderRadius: "2px",
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "16px",
              width: "16px",
              borderRadius: "50%",
              outline: "none",
              backgroundColor: "#FFF",
              border: "1px solid #AAA",
              boxShadow: "none",
            }}
          >
            <div className="absolute text-xs font-semibold text-blue-600 -mt-6">
              {Math.round(values[index])}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CustomScrollbar;