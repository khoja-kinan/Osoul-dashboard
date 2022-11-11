import { useState } from "react";
import PropTypes from "prop-types";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
//
import Iconify from "./Iconify";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  "&:before": {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: "none",
    position: "absolute",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

function NavItem({ item, active }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: "#495676",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    "&:before": { display: "block", bgcolor: "#495676" },
  };

  const activeSubStyle = {
    color: "#495676",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={
              open
                ? "eva:arrow-ios-downward-fill"
                : "eva:arrow-ios-forward-fill"
            }
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: "flex",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "text.disabled",
                        transition: (theme) =>
                          theme.transitions.create("transform"),
                        ...(isActiveSub && {
                          transform: "scale(2)",
                          bgcolor: "primary.main",
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, ...other }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const match = (path) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  const sidebarConfig = [
    {
      title: t("description.sideBarDashboard"),
      path: "/dashboard/app",
      icon: getIcon("eva:pie-chart-2-fill"),
    },
    {
      title: t("description.sideBarUser"),
      path: "/dashboard/user",
      icon: getIcon("eva:people-fill"),
    },
    {
      title: t("description.sideBarCites"),
      path: "/dashboard/cities",
      icon: getIcon("emojione-monotone:cityscape"),
    },

    {
      title: "المناطق",
      path: "/dashboard/areas",
      icon: getIcon("ic:outline-location-city"),
    },
    {
      title: "الأحياء",
      path: "/dashboard/neighborhoods",
      icon: getIcon("arcticons:city-transit"),
    },
    {
      title: "العقارات",
      path: "/dashboard/estates",
      icon: getIcon("map:real-estate-agency"),
    },
    {
      title: "الفئات",
      path: "/dashboard/categories",
      icon: getIcon("bxs:category-alt"),
    },
    {
      title: "الفئات الفرعية",
      path: "/dashboard/estate-types",
      icon: getIcon("mdi:format-list-bulleted-type"),
    },
    /*  {
      title: "الخصائص",
      path: "/dashboard/properies",
      icon: getIcon("mdi:format-list-bulleted-type"),
    }, */
    {
      title: "اشتراكات المناطق",
      path: "/dashboard/area-subscriptions",
      icon: getIcon("eos-icons:activate-subscriptions"),
    },
    {
      title: "اشتراكات الفئات",
      path: "/dashboard/category-subscriptions",
      icon: getIcon("eos-icons:activate-subscriptions"),
    },
    /* {
      title: "اشتراكات الأحياء",
      path: "/dashboard/neighborhood-subscriptions",
      icon: getIcon("eos-icons:activate-subscriptions"),
    }, */
  ];

  return (
    <Box {...other}>
      <List disablePadding>
        {sidebarConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
