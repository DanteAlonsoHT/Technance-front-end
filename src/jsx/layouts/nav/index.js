import React, { Fragment, useState } from "react";
import SideBar from "./SideBar";
import NavHader from "./NavHader";
import Header from "./Header";
import ChatBox from "../ChatBox";

const JobieNav = ({ title, onClick: ClickToAddEvent, onClick2, onClick3, message, handleCheckedMessages }) => {
   const [toggle, setToggle] = useState("");
   const onClick = (name) => setToggle(toggle === name ? "" : name);
   return (
      <Fragment>
         <NavHader />
         <SideBar onClick={() => onClick2()} onClick3={() => onClick3()} />
         <Header
            onNote={() => onClick("chatbox")}
            onNotification={() => onClick("notification")}
            onProfile={() => onClick("profile")}
            toggle={toggle}
            title={title}
            onBox={() => onClick("box")}
            onClick={() => ClickToAddEvent()}
            message={message}
            handleCheckedMessages={handleCheckedMessages}
         />
         <ChatBox onClick={() => onClick("chatbox")} toggle={toggle} />
      </Fragment>
   );
};

export default JobieNav;
