import React, { useState, useEffect, version } from "react";
import Process from "../components/process/Process";
import { useAllProcessesQuery } from "../store/processes/processes.api";
import ProcessStartModal from "../components/processStartModal/ProcessStartModal";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../store/slice/processSlice";

export default function ProcessesDefinition() {
  const { isError, isLoading, data } = useAllProcessesQuery();
  const { showModal, processKey, processFields, processBody, processHtmlForm } =
    useSelector(state => state.process);
  const [processes, setprocesses] = useState([]);
  const [processesA, setprocessesA] = useState([]);
  // let processes = [];
  let a = [];
  useEffect(() => {
    if (data) {
      const processes = [...data];

      const grpoupedProcesses = {};
      setprocesses(
        processes.map(p => {
          return (
            <Process
              deploymentId={p.deploymentId}
              name={p.name}
              pkey={p.key}
              key={p.id}
              id={p.id}
              setShowModal={setShowModal}
              version={p.version}
            />
          );
        })
      );
      processes.forEach(p => {
        if (!grpoupedProcesses[p.key]) {
          grpoupedProcesses[p.key] = {
            name: p.name,
            versions: [{ version: p.version, id: p.id }],
          };
        } else {
          grpoupedProcesses[p.key].versions.push({
            version: p.version,
            id: p.id,
          });
        }
      });

      for (const key in grpoupedProcesses) {
        a.push(
          <Process
            setShowModal={setShowModal}
            process={grpoupedProcesses[key]}
          />
        );
      }
      setprocessesA(a);
    }
  }, [data]);
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className='p-3'>

      {processesA}
      <ProcessStartModal
        show={showModal}
        setShowModal={setShowModal}
        name={"sad"}
        fields={processFields}
        processBody={processBody}
        processHtmlForm={processHtmlForm}
      />
    </div>
  );
}
