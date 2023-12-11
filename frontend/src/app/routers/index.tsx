import React, { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { OwnerList } from "../../pages/Owner";
import { ScreenWidget } from "../../widgets/ScreenWidget";

export const Routers: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<ScreenWidget />}>
        <Route path="/owner" element={<OwnerList />} />
        <Route path="/realty" element={<div>realty</div>} />
        <Route path="/user" element={<div>user</div>} />
        <Route path="/*" element={<Navigate replace to="/owner" />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
