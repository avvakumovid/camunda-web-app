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
  // let processes = [];
  useEffect(() => {
    if (data) {
      const datsa = [...data];

      setprocesses(
        datsa
          .sort((a, b) => {
            if (a.name == b.name) {
              if (a.version > b.version) {
                return -1;
              }
              if (a.version < b.version) {
                return 1;
              }
            }
            if (a.name > b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
          })
          .map(p => {
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
    }
  }, [data]);
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className='p-3'>
      {processes}
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
