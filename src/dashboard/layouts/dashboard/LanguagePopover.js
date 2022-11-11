import { useRef, useState } from "react";
// material
import { alpha } from "@mui/material/styles";
import { Box, MenuItem, ListItemText, IconButton } from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
import i18n from "../../i18n";

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: "en-US",
    label: "EN",
  },
  {
    value: "ar",
    label: "AR",
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          color: "#E87B5A",
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        {i18n.dir() === "ltr" ? LANGS[0].label : LANGS[1].label}
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
      >
        <Box sx={{ py: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === i18n.language}
              onClick={() => {
                i18n.changeLanguage(option.value);
                handleClose();
              }}
              sx={{ py: 1, px: "auto" }}
            >
              <ListItemText primaryTypographyProps={{ variant: "body2" }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
