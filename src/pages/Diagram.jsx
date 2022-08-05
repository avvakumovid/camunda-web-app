import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import { useParams } from "react-router-dom";
import { useGetProccesXMLQuery } from "../store/processes/processes.api";

function Diagram() {
  const { processId } = useParams();
  const { isLoading, isError, data } = useGetProccesXMLQuery(processId);
  const [diagram, diagramSet] = useState("");
  const container = document.getElementById("container");

  useEffect(() => {
    if (data) {
      diagramSet(data.bpmn20Xml);
    }
  }, [data]);
  if (diagram.length > 0) {
    const modeler = new Modeler({
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

        const canvas = modeler.get("reading");
        canvas.setColor("CalmCustomerTask", {
          stroke: "green",
          fill: "yellow",
        });
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
          height: "90vh",
          width: "90vw",
          margin: "auto",
        }}
      ></div>
    </div>
  );
}
export default Diagram;
