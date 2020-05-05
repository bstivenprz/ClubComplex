import React, { useState, useContext } from "react";

/** Material UI */
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListSubheader from "@material-ui/core/ListSubheader";
import HistoryIcon from "@material-ui/icons/History";
import BusinessIcon from "@material-ui/icons/Business";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

/** Components */
import Profile from "./components/Profile";
import Titles from "./components/Titles";
import History from "./components/History";

/** Media Files */
import ProfilePic from "../../../../resources/images/defaultProfilePicture.jpg";

/** Services */
import Auth from "../../../../services/Authorization";
import ContextClient from "../../../../helpers/ContextClient";

export default function UserMenu() {
  const { user } = useContext(ContextClient);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState({
    profile: false,
    titles: false,
    history: false,
  });

  const handleProfileOpen = (prop) => {
    handleClose();
    setOpen({ ...open, [prop]: true });
  };

  const handleProfileClose = (prop) => {
    setOpen({ ...open, [prop]: false });
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar src={ProfilePic} />
      </IconButton>
      <Menu
        elevation={2}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <AttachMoneyIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText
            primary="Saldo en cuenta"
            secondary={
              user &&
              "$ " +
                Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "COP",
                }).format(user.accountBalance)
            }
          />
        </MenuItem>
        <Divider />
        <ListSubheader component="div" id="nested-list-subheader">
          Portafolio
        </ListSubheader>
        <MenuItem onClick={() => handleProfileOpen("titles")}>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Títulos" />
        </MenuItem>
        <MenuItem onClick={() => handleProfileOpen("history")}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Movimientos recientes" />
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText
            primary="Código de invitación"
            secondary={user && user.referralCode}
          />
        </MenuItem>
        <MenuItem onClick={() => handleProfileOpen("profile")}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Cuenta" />
        </MenuItem>
        <MenuItem onClick={Auth.logOut}>
          <ListItemIcon>
            <ExitToAppIcon style={{ color: "red" }} />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" style={{ color: "red" }} />
        </MenuItem>
      </Menu>
      <Profile onClose={handleProfileClose} open={open.profile} />
      <Titles onClose={handleProfileClose} open={open.titles} />
      <History onClose={handleProfileClose} open={open.history} />
    </div>
  );
}
