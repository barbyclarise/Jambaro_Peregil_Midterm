import { useContext, useEffect } from "react";
import { MicroserviceContext } from "../context/microserviceContext";
import {
  deleteMicroservice,
  fetchMicroservices,
  updateMicroservice,
} from "../api/MicroserviceService";
import type { ServiceStatus } from "../types";
import { Button, Card, Grid, Select } from "./styles";

export const ServiceList: React.FC = () => {
  const context = useContext(MicroserviceContext);
  if (!context)
    throw new Error("ServiceList must be used within an MicroserviceProvider.");
  const { state, dispatch } = context;
  useEffect(() => {
    const loadMicroservices = async () => {
      try {
        const data = await fetchMicroservices();
        dispatch({ type: "FETCH_SERVICES_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: (error as Error).message });
      }
    };
    loadMicroservices();
  }, [dispatch]);
  const handleStatusChange = async (id: number, status: ServiceStatus) => {
    try {
      const updated = await updateMicroservice(id, { status });
      dispatch({ type: "UPDATE_SERVICE_SUCCESS", payload: updated });
    } catch (error) {
      alert((error as Error).message);
    }
  };
  const handleDelete = async (id: number) => {
    try {
      await deleteMicroservice(id);
      dispatch({ type: "DELETE_SERVICE_SUCCESS", payload: "id" });
    } catch (error) {
      alert((error as Error).message);
    }
  };
  if (state.loading) return <p>Loading microservices...</p>;
  if (state.error) return <p>Error: {state.error}</p>;
  return (
    <Grid>
      {state.microservices.map((microservice) => (
        <Card key={microservice.name}>
          <h4>{microservice.version}</h4>
          <p>{microservice.environment}</p>
          <p>
            <strong>Environment:</strong> {microservice.environment}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <Select
              value={microservice.status}
              onChange={(e: { target: { value: string; }; }) =>
                handleStatusChange(
                  microservice.id,
                  e.target.value as ServiceStatus,
                )
              }
            >
              <option value="healthy">Healthy</option>
              <option value="degraded">Degraded</option>
              <option value="down">Down</option>
            </Select>
          </p>
          <Button onClick={() => handleDelete(microservice.id)}>Delete</Button>
        </Card>
      ))}
    </Grid>
  );
};
