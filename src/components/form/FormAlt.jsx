import React from "react";
import { createForm } from "@bpmn-io/form-js";

export default function FormAlt({}) {
  const container = document.getElementById("form");
  const data = {
    creditor: "payment",
  };
  const form = createForm({
    schema,
    data,
    container,
  });
  return <div id='form'></div>;
}

const schema = {
  components: [
    {
      text: "# File an Invoice\n\nAdd your invoice details below.",
      type: "text",
      id: "Field_038dlz1",
    },
    {
      key: "creditor",
      label: "Creditor",
      type: "textfield",
      validate: {
        required: true,
      },
      id: "Field_11cf8aw",
    },
    {
      description: "An invoice number in the format: C-123.",
      key: "invoiceNumber",
      label: "Invoice Number",
      type: "textfield",
      validate: {
        pattern: "^C-[0-9]+$",
      },
      id: "Field_1uc5d0r",
    },
    {
      action: "submit",
      key: "submit",
      label: "Submit",
      type: "button",
      id: "Field_0h0h7y4",
    },
  ],
  schemaVersion: 4,
  exporter: {
    name: "form-js (https://demo.bpmn.io)",
    version: "0.7.2",
  },
  type: "default",
  id: "Form_0gfq3gx",
};
