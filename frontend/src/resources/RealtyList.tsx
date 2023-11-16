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
  SelectInput,
  SavedQueriesList,
  FilterLiveSearch,
  FilterList,
  FilterListItem,
} from "react-admin";
import authProvider from "../authProvider";
import { Chip, Card, CardContent } from "@mui/material";
import MailIcon from "@mui/icons-material/MailOutline";
import CategoryIcon from "@mui/icons-material/LocalOffer";
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

  const PostFilterSidebar = () => (
    <Card sx={{ order: -1, mr: 2, mt: 0, width: 200 }}>
      <CardContent>
        <FilterList label="Категория" icon={null}>
          <FilterListItem label="Вторичная" value={{ category_id: 1 }} />
          <FilterListItem label="Новостройка" value={{ category_id: 2 }} />
          <FilterListItem label="Элитка" value={{ category_id: 3 }} />
          <FilterListItem label="Дома и участки" value={{ category_id: 4 }} />
          <FilterListItem label="Коммерческая" value={{ category_id: 5 }} />
        </FilterList>
        <FilterLiveSearch label="Недвижимость ID" />
        {/* <QuickFilter
          key={1}
          source="user_id"
          label="Только мои"
          defaultValue={userId}
        /> */}
        {/* <FilterList label="Subscribed to newsletter" icon={<MailIcon />}>
          <FilterListItem label="Yes" value={{ has_newsletter: true }} />
          <FilterListItem label="No" value={{ has_newsletter: false }} />
        </FilterList>
        <FilterList label="Category" icon={<CategoryIcon />}>
          <FilterListItem label="Tests" value={{ category: "tests" }} />
          <FilterListItem label="News" value={{ category: "news" }} />
          <FilterListItem label="Deals" value={{ category: "deals" }} />
          <FilterListItem label="Tutorials" value={{ category: "tutorials" }} />
        </FilterList> */}
      </CardContent>
    </Card>
  );

  const filters: any = [
    <QuickFilter
      key={1}
      source="user_id"
      label="Только мои"
      defaultValue={userId}
    />,
    <SelectInput key={2} source="category_id" label="Категория" />,
  ];

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
                // console.log("record", record);
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
    <List aside={<PostFilterSidebar />}>
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
