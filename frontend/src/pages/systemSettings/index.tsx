import { useState } from "react";
// import russianMessages from "ra-language-russian";
// import polyglotI18nProvider from "ra-i18n-polyglot";

import {
  Admin,
  EditGuesser,
  ListGuesser,
  Resource,
  ShowGuesser,
} from "react-admin";

import authProvider from "../../authProvider";
import { dataProvider } from "../../dataProvider";
import { DistrcitCreate } from "../../resources/DistrcitCreate";

// const i18nProvider = polyglotI18nProvider(() => {
//   return {
//     ...russianMessages,
//     resources: {
//       shoe: {
//         name: "owner |||| Owners",
//         fields: {
//           model: "Собственники",
//           stock: "Nb in stock",
//           color: "Color",
//         },
//       },
//     },
//   };
// }, "ru");

export const SystemSettings = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  authProvider?.getIdentity &&
    authProvider?.getIdentity().then((user) => {
      setIsAdmin(user.role === "admin");
    });
  return (
    <div>other</div>
    // <Admin
    //   dataProvider={dataProvider}
    //   authProvider={authProvider}
    //   // i18nProvider={i18nProvider}
    // >
    //   {isAdmin && (
    //     <>
    //       <Resource
    //         name="district"
    //         create={DistrcitCreate}
    //         list={ListGuesser}
    //         edit={EditGuesser}
    //         show={ShowGuesser}
    //         options={{
    //           label: "Районы",
    //         }}
    //       />
    //       <Resource
    //         name="series"
    //         create={DistrcitCreate}
    //         list={ListGuesser}
    //         edit={EditGuesser}
    //         show={ShowGuesser}
    //         options={{
    //           label: "Серии",
    //         }}
    //       />
    //       <Resource
    //         name="rooms"
    //         create={DistrcitCreate}
    //         list={ListGuesser}
    //         edit={EditGuesser}
    //         show={ShowGuesser}
    //         options={{
    //           label: "Комнаты",
    //         }}
    //       />
    //       <Resource
    //         name="state"
    //         create={DistrcitCreate}
    //         list={ListGuesser}
    //         edit={EditGuesser}
    //         show={ShowGuesser}
    //         options={{
    //           label: "Состояния недвижимости",
    //         }}
    //       />
    //       <Resource
    //         name="type"
    //         create={DistrcitCreate}
    //         list={ListGuesser}
    //         edit={EditGuesser}
    //         show={ShowGuesser}
    //         options={{
    //           label: "Типы отношений",
    //         }}
    //       />
    //       <Resource
    //         name="category"
    //         create={DistrcitCreate}
    //         list={ListGuesser}
    //         edit={EditGuesser}
    //         show={ShowGuesser}
    //         options={{
    //           label: "Категории недвижимости",
    //         }}
    //       />
    //       <Resource
    //         name="communication"
    //         create={DistrcitCreate}
    //         list={ListGuesser}
    //         edit={EditGuesser}
    //         show={ShowGuesser}
    //         options={{
    //           label: "Типы коммуникаций",
    //         }}
    //       />
    //       <Resource
    //         name="developer"
    //         create={DistrcitCreate}
    //         list={ListGuesser}
    //         edit={EditGuesser}
    //         show={ShowGuesser}
    //         options={{
    //           label: "Застройщики",
    //         }}
    //       />
    //       <Resource
    //         name="apartment_complex"
    //         create={DistrcitCreate}
    //         list={ListGuesser}
    //         edit={EditGuesser}
    //         show={ShowGuesser}
    //         options={{
    //           label: "Жилые комплексы",
    //         }}
    //       />
    //     </>
    //   )}
    // </Admin>
  );
};
