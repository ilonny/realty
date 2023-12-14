import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ScreenWidget } from "../../widgets/screenWidget";
import { OwnerList } from "../../pages/owner";
import { RealtyList } from "../../pages/realty";
import { UserList } from "../../pages/user";
import { SystemSettings } from "../../pages/systemSettings";

export const Routers: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<ScreenWidget />}>
        <Route path="/owner" element={<OwnerList />} />
        <Route path="/realty" element={<RealtyList />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/other" element={<SystemSettings />} />
        <Route path="/*" element={<Navigate replace to="/owner" />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
