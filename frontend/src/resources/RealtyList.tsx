import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
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
  Filter,
  ReferenceInput,
  useGetList,
  FilterForm,
  FilterFormInput,
  FilterLiveSearchProps,
  useListFilterContext,
  useTranslate,
  useFormGroup,
  AutocompleteInput,
  Button,
  useGetOne,
} from "react-admin";
import authProvider from "../authProvider";
import { Chip, Card, CardContent, FormControl } from "@mui/material";
import MailIcon from "@mui/icons-material/MailOutline";
import CategoryIcon from "@mui/icons-material/LocalOffer";
import { TableCell, TableRow, Checkbox } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

const QuickFilter = ({ label }) => {
  return <Chip sx={{ marginBottom: 1 }} label={label} />;
};

export const RealtyList = (props) => {
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState();
  useEffect(() => {
    authProvider?.getIdentity &&
      authProvider?.getIdentity().then((user) => {
        setUserId(user.id);
        setUserData(user);
      });
  }, []);

  if (!userId) {
    return null;
  }

  const PostFilterSidebar = () => {
    const seriesData = useGetList("series");
    const [agents, setAgents] = useState([]);
    const roomsData = useGetList("rooms");
    const stateData = useGetList("state");
    const districtData = useGetList("district");
    const apartment_complexData = useGetList("apartment_complex");
    const { displayedFilters, filterValues, setFilters, hideFilter } =
      useListContext();
    const form = useForm({
      defaultValues: filterValues,
    });

    useEffect(() => {
      fetch(import.meta.env.VITE_SIMPLE_REST_URL + "/" + "user/get-agents")
        .then((res) => res.json())
        .then((res) => {
          setAgents(res);
        });
    }, []);

    // if (!displayedFilters.main) return null;

    const onSubmit = (values) => {
      if (Object.keys(values).length > 0) {
        setFilters(values);
      } else {
        hideFilter("main");
      }
    };

    const resetFilter = () => {
      setFilters({}, []);
    };

    return (
      <Card sx={{ order: -1, mr: 2, mt: 0, width: 300 }}>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Button onClick={() => {
                setFilters({})
                form.reset()
                setTimeout(() => {
                  window.location.reload()
                }, 1000);
              }}>Сбросить все фильтры</Button>
              <FilterList label="Категория" icon={null}>
                <FilterListItem label="Вторичная" value={{ category_id: 1 }} />
                <FilterListItem
                  label="Новостройка"
                  value={{ category_id: 2 }}
                />
                <FilterListItem label="Элитка" value={{ category_id: 3 }} />
                <FilterListItem
                  label="Дома и участки"
                  value={{ category_id: 4 }}
                />
                <FilterListItem
                  label="Коммерческая"
                  value={{ category_id: 5 }}
                />
              </FilterList>
              <AutocompleteInput
                style={{ maxWidth: 223 }}
                source="agent_id"
                choices={agents || []}
                optionText={(agentData) => {
                  return `${
                    agentData.surname ? agentData.surname + " " : ""
                  }${" "}
                  ${agentData.name ? agentData.name + " " : ""}${" "}
                  ${agentData.thirdname ? agentData.thirdname + " " : ""}`;
                }}
                optionValue="id"
                label="Агент"
                onChange={(val) => {
                  console.log("val", val);
                  setFilters({ ...filterValues, agent_id: val }, {});
                }}
              />
              <FilterLiveSearch source="id" label="Недвижимость ID" />
              <AutocompleteInput
                style={{ maxWidth: 223 }}
                source="district_id"
                choices={districtData?.data || []}
                optionText="name"
                optionValue="id"
                label="Район"
                onChange={(val) => {
                  console.log("val", val);
                  setFilters({ ...filterValues, district_id: val }, {});
                }}
              />
              <AutocompleteInput
                style={{ maxWidth: 223 }}
                source="apartment_complex_id"
                choices={apartment_complexData?.data || []}
                optionText="name"
                optionValue="id"
                label="Жилой комплекс"
                onChange={(val) => {
                  console.log("val", val);
                  setFilters(
                    { ...filterValues, apartment_complex_id: val },
                    {}
                  );
                }}
              />
              <FilterList label="Цена от / до" icon={null}>
                <FilterLiveSearch source="price_min" label="Цена от" />
                <FilterLiveSearch source="price_max" label="Цена до" />{" "}
              </FilterList>
              <FilterList label="Серия" icon={null}>
                {seriesData?.data?.map((s) => {
                  return (
                    <FilterListItem
                      label={s.name}
                      value={{ series_id: s.id }}
                    />
                  );
                })}
              </FilterList>
              <FilterList label="Комнаты" icon={null}>
                {roomsData?.data?.map((s) => {
                  return (
                    <FilterListItem label={s.name} value={{ rooms_id: s.id }} />
                  );
                })}
              </FilterList>
              <FilterList label="Состояние" icon={null}>
                {stateData?.data?.map((s) => {
                  return (
                    <FilterListItem label={s.name} value={{ state_id: s.id }} />
                  );
                })}
              </FilterList>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    );
  };

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
  }: DatagridRowProps) => {
    const agentData = useGetOne("user", { id: record.agent_id });
    const districtData = useGetOne("district", { id: record.district_id });
    let address;
    try {
      address = JSON.parse(record.address);
    } catch (e) {}
    // console.log("record", record);
    return id ? (
      <RecordContextProvider value={record}>
        <TableRow onClick={rowClick}>
          {React.Children.map(children, (field) => {
            if (field.props.source === "photo") {
              let photoSrc;
              try {
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
            if (field.props.source === "name") {
              return React.isValidElement<FieldProps>(field) &&
                field.props.source ? (
                <TableCell key={`${id}-${field.props.source}`}>
                  ID: {record.id}
                  <br />
                  <strong>{record.name}</strong>
                  <br />
                  {districtData?.data?.name || ""}
                  {address?.formatted_address ? (
                    <>
                      <br />
                      {address?.formatted_address}
                    </>
                  ) : (
                    <></>
                  )}
                </TableCell>
              ) : null;
            }
            if (field.props.source === "price") {
              const c =
                record.price &&
                record.total_area &&
                (record.price / record.total_area).toFixed(3);
              return React.isValidElement<FieldProps>(field) &&
                field.props.source ? (
                <TableCell key={`${id}-${field.props.source}`}>
                  <strong>{record.price}$</strong>
                  <br />
                  {record?.total_area ? `${record?.total_area} кв. м.` : ""}
                </TableCell>
              ) : null;
            }
            if (field.props.source === "agent_id") {
              return (
                <TableCell>
                  Агент: <br />
                  <strong>
                    {agentData?.data?.name} {agentData?.data?.phone}
                  </strong>
                  <hr />
                  {record?.owner_name ? (
                    <div>
                      Собственник: <br />
                      <strong>
                        {record?.owner_name} {record?.owner_phone}
                      </strong>
                    </div>
                  ) : (
                    <></>
                  )}
                </TableCell>
              );
            }
            return React.isValidElement<FieldProps>(field) &&
              field.props.source ? (
              <TableCell key={`${id}-${field.props.source}`}>{field}</TableCell>
            ) : null;
          })}
          {(() => {
            return (
              <TableCell>
                {userId == record?.agent_id || userData?.role == "admin" ? (
                  <EditButton />
                ) : (
                  <ShowButton />
                )}
              </TableCell>
            );
          })()}
        </TableRow>
      </RecordContextProvider>
    ) : null;
  };

  const MyDatagridBody = (props: DatagridBodyProps) => (
    <DatagridBody {...props} row={<MyDatagridRow />} />
  );
  const MyDatagrid = (props: DatagridProps) => (
    <Datagrid {...props} body={<MyDatagridBody />} />
  );

  return (
    <List aside={<PostFilterSidebar />} bulkActionButtons={false}>
      <WithListContext
        render={({ data }) => {
          // console.log("data??", data);
          // return data?.map((el) => {});
          return (
            <MyDatagrid
              bulkActionButtons={false}
              contentEditable={false}
              rowClick={(id, res, rec) => {
                console.log("id: ", id, res, rec);
                return `/${res}/${id}/${
                  userId == rec.agent_id ? "edit" : "show"
                }`;
              }}
            >
              <TextField source="id" label="ID" />
              <TextField source="photo" label="Фото" />
              <TextField source="name" label="Об объекте" />
              <TextField source="price" label="Цена" />
              <ReferenceField
                source="agent_id"
                reference="user"
                label="Контакты"
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
