import React, { useState } from "react";
import Process from "../components/process/Process";
import { useAllProcessesQuery } from "../store/processes/processes.api";
import ProcessStartModal from "../components/processStartModal/ProcessStartModal";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../store/slice/processSlice";

export default function ProcessesDefinition() {
  const { isError, isLoading, data } = useAllProcessesQuery();
  const { showModal, processKey, processFields, processBody } = useSelector(
    state => state.process
  );
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className='p-3'>
      {data.map(p => (
        <Process
          deploymentId={p.deploymentId}
          name={p.name}
          pkey={p.key}
          key={p.id}
          id={p.id}
          setShowModal={setShowModal}
        />
      ))}
      <ProcessStartModal
        show={showModal}
        setShowModal={setShowModal}
        name={"sad"}
        fields={processFields}
        processBody={processBody}
      />
    </div>
  );
}
