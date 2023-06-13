import classNames from "classnames";
import { Container } from "reactstrap";
import { Route, Routes } from "react-router-dom";

import Topbar from "./TopBar";
import AttachmentPage from "../pages/attachments/AttachmentPage";

interface ContentProps {
    sideBarIsOpen: boolean,
    toggleSideBar: () => void
}

const Content = ({ sideBarIsOpen, toggleSideBar }: ContentProps) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sideBarIsOpen })}
  >
    <Topbar toggleSideBar={toggleSideBar} />
    <Routes>
        <Route path="/" element={<h1>Welcome</h1>} />
        <Route path="/attachments" element={<AttachmentPage/>}/>
    </Routes>
  </Container>
);

export default Content;
