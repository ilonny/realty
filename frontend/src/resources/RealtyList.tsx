import React, { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  SearchInput,
  WithListContext,
  useListContext,
  DatagridRowProps,
  RecordContextProvider,
  FieldProps,
  DatagridBodyProps,
  DatagridBody,
  DatagridProps,
  ReferenceField,
  WrapperField,
  EditButton,
  ShowButton,
} from "react-admin";
import authProvider from "../authProvider";
import { Chip } from "@mui/material";
import { TableCell, TableRow, Checkbox } from "@mui/material";

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

  const ImagesShow = (props) => {
    // const { record } = useListContext();
    console.log("props", props);
    return;
    if (!record.photos) return null;
    try {
      const photos = JSON.parse(record.photos).map((p) => {
        return {
          src: import.meta.env.VITE_SIMPLE_REST_URL + "/" + p,
        };
      });
      return photos.map((p) => {
        return <img src={p.src} style={{ maxWidth: 500 }} />;
      });
    } catch (err) {
      return <></>;
    }
  };

  const MyDatagridRow = ({
    record,
    id,
    onToggleItem,
    children,
    selected,
    selectable,
    rowClick,
  }: DatagridRowProps) =>
    id ? (
      <RecordContextProvider value={record}>
        <TableRow onClick={rowClick}>
          <TableCell padding="none">
            {selectable && (
              <Checkbox
                checked={selected}
                onClick={(event) => {
                  if (onToggleItem) {
                    onToggleItem(id, event);
                  }
                }}
              />
            )}
          </TableCell>
          {React.Children.map(children, (field) => {
            if (field.props.source === "photo") {
              let photoSrc;
              try {
                console.log("record", record);
                // photoSrc = JSON.parse(record.photos);
                photoSrc =
                  import.meta.env.VITE_SIMPLE_REST_URL +
                  "/" +
                  record.main_photo;
              } catch (e) {}
              return (
                <TableCell key={`${id}-${field.props.source}`}>
                  {photoSrc ? (
                    <img style={{ maxWidth: 200 }} src={photoSrc} />
                  ) : (
                    <p>Нет фото</p>
                  )}
                </TableCell>
              );
            }
            return React.isValidElement<FieldProps>(field) &&
              field.props.source ? (
              <TableCell key={`${id}-${field.props.source}`}>{field}</TableCell>
            ) : null;
          })}
          <TableCell>
            {userId == record?.agent_id ? <EditButton /> : <ShowButton />}
          </TableCell>
        </TableRow>
      </RecordContextProvider>
    ) : null;

  const MyDatagridBody = (props: DatagridBodyProps) => (
    <DatagridBody {...props} row={<MyDatagridRow />} />
  );
  const MyDatagrid = (props: DatagridProps) => (
    <Datagrid {...props} body={<MyDatagridBody />} />
  );

  return (
    <List filters={filters}>
      <WithListContext
        render={({ data }) => {
          // console.log("data??", data);
          // return data?.map((el) => {});
          return (
            <MyDatagrid
              rowClick={(id, res, rec) => {
                console.log("id: ", id, res, rec);
                return `/${res}/${id}/${
                  userId == rec.agent_id ? "edit" : "show"
                }`;
              }}
            >
              <TextField source="id" label="ID" />
              <TextField source="name" label="Название" />
              <TextField source="photo" label="Фото" />
              <ReferenceField
                source="agent_id"
                reference="user"
                label="Агент"
                link={false}
              >
                <TextField source="name" /> <TextField source="phone" />
              </ReferenceField>
              <WrapperField label="Actions">
                <EditButton />
              </WrapperField>
            </MyDatagrid>
          );
        }}
      />
    </List>
  );
};
