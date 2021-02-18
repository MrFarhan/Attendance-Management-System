import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// eslint-disable-next-line 
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line 
import firebase from "firebase"
import { useHistory } from "react-router-dom"
import { userDetailsAction, loadingAction } from '../Redux/Actions';
import pic from "./Circle-icons-profile.svg"
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button } from '@material-ui/core';


const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    [theme.breakpoints.up('md')]: {
      width: `100%`,
      // marginLeft: drawerWidth,
    },
    [theme.breakpoints.up('xl')]: {
      width: `100%`,
      // marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

var today = new Date().toString("ddMMyyyy")

function Appbar(props) {

  //variables declaration
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const loading = useSelector((state) => state.loading)
  const userDetails = useSelector((state) => state.userDetails)
  let attendance = useSelector((state) => state.attendance)
  const [anchorEl, setAnchorEl] = useState(false);
  let dp = userDetails?.dp || pic
  // eslint-disable-next-line
  const [checkin, setCheckin] = useState(false)
  let history = useHistory()
  let dispatch = useDispatch();

  // side bar items and click handler
  var menu = [{ "Text": "Attendance", "route": "attendance" }, { "Text": "Report", "route": "report" }]
  const HandelClick = (e) => {
    if (e.target.innerText === "Attendance") {
      history.push("/attendance")
    } else if (e.target.innerText === "Report") {
      history.push("/report")
    }
  }

//drawer handler
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List style={{ marginTop: "5em" }}>
        {menu.map((item, index) => (
          <ListItem button key={index} onClick={(e) => { HandelClick(e) }}>
            <ListItemText primary={item?.Text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const profileFunc = () => {
    setAnchorEl(null);
    history.push("/dashboard/profile")
  }
  const LogoutFunc = () => {
    setAnchorEl(null);
    firebase.auth().signOut()
    history.push("/")
    dispatch(userDetailsAction(false))
  }

  const handleClose = () => {
    setAnchorEl(null);

  }

  const Checkin = (e) => {
    const checkinTimeStamp = attendance && attendance[today]?.checkedin
    if (checkinTimeStamp) {
      setCheckin(true)
    }

    const start = Date.now();
    let UID = firebase.auth().currentUser?.uid
    firebase.database().ref(`Attendance/${UID}/${today}`).set({
      checkedin: start,

    })

    firebase.database().ref(`Users/${UID}`).update({
      checkedin: start,

    })
  }

  const Checkout = (e) => {
    const start = Date.now();

    let UID = firebase.auth().currentUser?.uid
    firebase.database().ref(`Attendance/${UID}/${today}`).update({
      checkedout: start,
    })
    firebase.database().ref(`Users/${UID}/`).update({
      checkedout: start,
    })
    setCheckin(false)
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const useruid = user.uid
        firebase.database().ref(`Users/${useruid}/`).on("value", (res) => {
          dispatch(userDetailsAction(res.val()))
          dispatch(loadingAction(false))
        })

      }
      else dispatch(loadingAction(false))

    });
    // eslint-disable-next-line
  }, [loading])

  if (loading) {
    return <p>...Loading</p>
  }

  // const clickHandle = () => {
  //   history.push("/dashboard")
  // }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Attendance Management System
          </Typography>


          {userDetails?.firstName ? <span className="appbarRightSide" >

            {userDetails.role !== "Admin" && userDetails.role !== "user" && userDetails.role === "authorized" ?
              (attendance && attendance[today]?.checkedin && !(attendance[today]?.checkedout) ?

                < Button variant="contained" onClick={((e) => Checkout(e))}>Check out</Button> :
                <Button variant="contained" disabled={attendance && attendance[today]?.checkedout} onClick={((e) => Checkin(e))}>Check in</Button>
              )

              : null}

            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userDetails?.firstName}
            </span>

            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              height="2em"
            >
              <img src={dp} className="dpIcon" alt="profile " />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={profileFunc}>Profile setting</MenuItem>
              <MenuItem onClick={LogoutFunc}>Log out</MenuItem>
            </Menu>
          </span> : null}


        </Toolbar>
      </AppBar>

      {/* {Side bar below} */}
      {!userDetails.firstName ? <></>
        :

        <div>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            {/* <div className={classes.toolbar} />
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
              facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
              donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
              adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
              imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
              arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
              donec massa sapien faucibus et molestie ac.
        </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
              facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
              tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
              consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
              vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
              hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
              tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
              nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
              accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
          </main>
        </div>
      }
    </div>
  );
}

Appbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Appbar;
