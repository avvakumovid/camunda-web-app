import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import { useParams } from "react-router-dom";
import { useGetProccesXMLQuery } from "../store/processes/processes.api";
import { createForm } from "@bpmn-io/form-js";
import axios from "axios";

function Diagram() {
  const { processId } = useParams();
  const { isLoading, isError, data } = useGetProccesXMLQuery(processId);
  const [diagram, diagramSet] = useState("");
  const [modeller, modellerSet] = useState("");
  const container = document.getElementById("container");
  const formC = document.getElementById("form");
  let modeler;

  const downloadBpmnFile = xml => {
    const element = document.createElement("a");
    const file = new Blob([xml], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "diagram.bpmn";
    document.body.appendChild(element);
    element.click();
  };
  const deployProcess = async xml => {
    const file = new Blob([xml], {
      type: "text/plain",
    });
    const file2 = new File([xml], {
      type: "text/plain",
    });
    file.lastModifiedDate = new Date();
    file.name = "diagram.bpmn";
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);

    console.log("file2", file2);
    console.log("file", file);
    const formData = new FormData();
    formData.append("upload", file, "diagrama.bpmn");
    console.log("formData", formData);
    const response = await axios.post(
      "http://localhost:8080/engine-rest/deployment/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
  };
  const form = createForm({
    schema,
    data,
    container: formC,
  });
  useEffect(() => {
    if (data) {
      diagramSet(data.bpmn20Xml);
    }
  }, [data]);
  if (diagram.length > 0) {
    modeler = new Modeler({
      container,
      keyboard: {
        bindTo: document,
      },
    });

    modeler
      .importXML(diagram)
      .then(({ warnings }) => {
        if (warnings.length) {
          console.log("Warnings", warnings);
        }

        // const canvas = modeler.get("canvas");
        // canvas.setColor("CalmCustomerTask", {
        //   stroke: "green",
        //   fill: "yellow",
        // });
      })
      .catch(err => {
        console.log("error", err);
      });
  }

  return (
    <div className='App'>
      <div
        id='container'
        style={{
          border: "1px solid #000000",
          height: "85vh",
          width: "90vw",
          margin: "10px auto 0",
        }}
      ></div>
      <button
        className='p-2 rounded-lg bg-slate-500 text-white mt-2 mr-2'
        onClick={async () => {
          const { xml } = await modeler.saveXML({ format: true });

          downloadBpmnFile(xml);
          console.log(modeler._definitions.diagrams[0].plane.bpmnElement.name);
          console.log(modeler);
        }}
      >
        Сохранить
      </button>
      <button
        className='p-2 rounded-lg bg-slate-500 text-white mt-2'
        onClick={async () => {
          const { xml } = await modeler.saveXML({ format: true });

          deployProcess(xml);
        }}
      >
        Deploy
      </button>

      {/* <div id='form'></div> */}
    </div>
  );
}
export default Diagram;

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
