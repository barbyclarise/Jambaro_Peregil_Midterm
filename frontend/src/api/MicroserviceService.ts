import type { Microservice, Environment, ServiceStatus } from "../types";

const API_BASE = "http://localhost:3000/api";

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
};
export const fetchMicroservices = async (): Promise<Microservice[]> => {
  const response = await fetch(`${API_BASE}/microservices`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch microservices");
  return response.json();
};
export const createMicroservice = async (
  microservice: Pick<Microservice, "name" | "endpointUrl" | "environment" | "status" | "version">,
): Promise<Microservice> => {
  const response = await fetch(`${API_BASE}/microservices`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(microservice),
  });
  if (!response.ok) throw new Error("Failed to create microservice.");
  return response.json();
};
export const updateMicroservice = async (
  id: number,
  changes: { status?: ServiceStatus; environment?: Environment },
): Promise<Microservice> => {
  const response = await fetch(`${API_BASE}/incidents/${id}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(changes),
  });
  if (!response.ok) throw new Error("Failed to update microservice.");
  return response.json();
};
export const deleteMicroservice = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE}/microservices/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete microservice.");
};
