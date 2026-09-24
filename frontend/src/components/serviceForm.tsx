// import { useContext, useState, type SetStateAction } from "react";
// import { createMicroservice } from "../api/MicroserviceService";
// import { ServiceContext } from "../context/serviceContext";
// import type { Environment } from "../types";
// import { Button, Form, Input, Select, TextArea } from "./styles";

// export const IncidentForm: React.FC = () => {
//   const context = useContext(ServiceContext);
//   if (!context)
//     throw new Error("Microservice Form must be used within MicroserviceProvider");
//   const { dispatch } = context;
//   const [name, setName] = useState("");
//   const [version, setVersion] = useState("");
//   const [environment, setEnvironment] = useState<Environment>("development");
//   const resetForm = () => {
//     setName("");
//     setVersion("");
//     setEnvironment("development");
//   };
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const newMicroservice = await createMicroservice({
//         name,
//         version,
//         environment,
//       });
//       dispatch({ type: "ADD_MICROSERVICE", payload: newMicroservice });
//       resetForm();
//     } catch (error) {
//       console.error(error);
//       alert("Failed to create microservice. Please try again.");
//     }
//   };
//   return (
//     <Form onSubmit={handleSubmit}>
//       <h3>New Microservice</h3>
//       <Input
//         placeholder="Name"
//         value={name}
//         onChange={(e: { target: { value: SetStateAction<string>; }; }) => setName(e.target.value)}
//         required
//       />
//       <TextArea
//         placeholder="Version"
//         value={version}
//         onChange={(e: { target: { value: SetStateAction<string>; }; }) => setVersion(e.target.value)}
//         required
//       />
//       <Select
//         value={environment}
//         onChange={(e: { target: { value: string; }; }) => setEnvironment(e.target.value as Environment)}
//       >
//         <option value="development">Development</option>
//         <option value="staging">Staging</option>
//         <option value="production">Production</option>
//       </Select>
//       <Button type="submit">Submit Ticket</Button>
//     </Form>
//   );
// };
