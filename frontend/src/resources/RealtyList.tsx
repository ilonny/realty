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
} from "react-admin";
import authProvider from "../authProvider";
import { Chip, Card, CardContent } from "@mui/material";
import MailIcon from "@mui/icons-material/MailOutline";
import CategoryIcon from "@mui/icons-material/LocalOffer";
import { TableCell, TableRow, Checkbox } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

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

  const FilteSelectSearch = (props: any) => {
    const { filterValues, setFilters } = useListFilterContext();
    const translate = useTranslate();

    const {
      source = "q",
      label = translate("ra.action.search"),
      placeholder,
      ...rest
    } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target) {
        setFilters({ ...filterValues, [source]: event.target.value }, null);
      } else {
        const { [source]: _, ...filters } = filterValues;
        setFilters(filters, null, false);
      }
    };

    const initialValues = useMemo(
      () => ({
        [source]: filterValues[source],
      }),
      [filterValues, source]
    );

    const form = useFormGroup({ defaultValues: initialValues });

    const onSubmit = () => undefined;
    return (
      <FormProvider {...form}>
        <form onSubmit={onSubmit}>
          <SelectInput
            resettable
            helperText={false}
            source={source}
            onChange={handleChange}
            size="small"
            label={rest.hiddenLabel ? false : label}
            placeholder={placeholder ?? (rest.hiddenLabel ? label : undefined)}
            {...rest}
          />
        </form>
      </FormProvider>
    );
  };

  const PostFilterSidebar = () => {
    const seriesData = useGetList("series");
    const roomsData = useGetList("rooms");
    const stateData = useGetList("state");
    const districtData = useGetList("district");
    const apartment_complexData = useGetList("apartment_complex");
    const { displayedFilters, filterValues, setFilters, hideFilter } =
      useListContext();
    const form = useForm({
      defaultValues: filterValues,
    });

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
    console.log("filterValues", filterValues, displayedFilters);
    return (
      <Card sx={{ order: -1, mr: 2, mt: 0, width: 300 }}>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <FilterLiveSearch source="id" label="Недвижимость ID" />
              <AutocompleteInput
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
