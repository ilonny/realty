import { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  SearchInput,
} from "react-admin";
import authProvider from "../authProvider";
import { Chip } from "@mui/material";

const QuickFilter = ({ label }) => {
  return <Chip sx={{ marginBottom: 1 }} label={label} />;
};

export const RealtyList = (props) => {
  console.log("props", props);
  const [userId, setUserId] = useState();
  useEffect(() => {
    authProvider?.getIdentity &&
      authProvider?.getIdentity().then((user) => {
        setUserId(user.id);
      });
  }, []);

  if (!userId) {
    return null;
  }

  const filters = [
    <QuickFilter source="user_id" label="Только мои" defaultValue={userId} />,
  ];

  return (
    <List filters={filters}>
      <Datagrid
        rowClick={(id, res, rec) => {
          console.log("id: ", id, res, rec);
          return `/${res}/${id}/${userId == rec.agent_id ? "edit" : "show"}`;
        }}
      >
        <TextField source="id" label="ID" />
        <TextField source="name" label="Название" />
      </Datagrid>
    </List>
  );
};
