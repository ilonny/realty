import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Authorized } from "../../widgets/authorized";
import { Unauthorized } from "../../widgets/unauthorized";
import { OwnerDetail, OwnerList } from "../../pages/owner";
import { RealtyList } from "../../pages/realty";
import { UserList, UserDetail } from "../../pages/user";
import { Login } from "../../pages/login";
import { RealtyDetail } from "../../pages/realty/RealtyDetail";
import { AdminPanel } from "../../AdminPanel";

export const Routers: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Unauthorized />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<Authorized />}>
        <Route path="/owner" element={<OwnerList />} />
        <Route path="/owner/:ownerId" element={<OwnerDetail />} />
        <Route path="/owner/create" element={<OwnerDetail />} />
        <Route path="/realty" element={<RealtyList />} />
        <Route path="/realty/:realtyId" element={<RealtyDetail />} />
        <Route path="/realty/create" element={<RealtyDetail />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/:userId" element={<UserDetail />} />
        <Route path="/user/create" element={<UserDetail />} />
        {/* <Route path="/other" element={<AdminPanel/>} /> */}
        <Route path="/*" element={<Navigate replace to="/owner" />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
