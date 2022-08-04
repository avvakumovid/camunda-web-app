import React from "react";
import Radio from "./inputs/Radio";
import Checkbox from "./inputs/Checkbox";
import Select from "./inputs/Select";
import Number from "./inputs/Number";

export default function Form({ fields }) {
  const inputs = fields.map(field => {
    switch (field.type) {
      case "radio":
        return (
          <Radio
            required={field.validate.required}
            values={field.values}
            name={field.key}
            label={field.label}
            key={field.key}
          />
        );
      case "checkbox":
        return (
          <Checkbox key={field.key} value={field.key} label={field.label} />
        );
      case "select":
        return (
          <Select
            key={field.key}
            name={field.key}
            id={field.key}
            options={field.values}
            label={field.label}
          />
        );
      case "number":
        return <Number key={field.key} id={field.key} label={field.label} />;
      default:
        return (
          <>
            <span>{field.type}</span>
            <br />
          </>
        );
    }
  });
  return <form className='p-3  rounded-xl max-w-lg'>{inputs}</form>;
}
