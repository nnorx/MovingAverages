import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useWindowDimensions from "../utils/useWindowDimensions";
import { smaContext } from "../App";
import "./appbar.css";

import { styled } from "@mui/material/styles";

const ToggleButton = styled(MuiToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#5A7D7C",
  },
});

export default function MenuAppBar() {
  const { setSma } = React.useContext(smaContext);
  const [toggle, setToggle] = React.useState<string | null>("90");
  const { width } = useWindowDimensions();

  const handleClick = (event: React.MouseEvent<HTMLElement>, value: string) => {
    if (value != null) {
      setSma(parseInt(value));
      setToggle(value);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#2B2D42" }}>
        <Toolbar sx={{ height: "30px" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            fontFamily="Roboto Mono"
            fontSize={"15px"}
            style={{ color: "#EDF2F4" }}
          >
            Fear and Greed Moving Averages
          </Typography>
          <ToggleButtonGroup
            value={toggle}
            exclusive
            onChange={handleClick}
            aria-label="text alignment"
            style={{ color: "#EDF2F4" }}
          >
            {width > 429 ? (
              <ToggleButton
                value="7"
                aria-label="7"
                style={{ color: "#EDF2F4", borderColor: "#EDF2F4" }}
              >
                7
              </ToggleButton>
            ) : null}

            <ToggleButton
              value="14"
              aria-label="14"
              style={{ color: "#EDF2F4", borderColor: "#EDF2F4" }}
            >
              14
            </ToggleButton>
            <ToggleButton
              value="30"
              aria-label="30"
              style={{ color: "#EDF2F4", borderColor: "#EDF2F4" }}
            >
              30
            </ToggleButton>
            <ToggleButton
              value="90"
              aria-label="90"
              style={{ color: "#EDF2F4", borderColor: "#EDF2F4" }}
            >
              90
            </ToggleButton>
            <ToggleButton
              value="180"
              aria-label="180"
              style={{ color: "#EDF2F4", borderColor: "#EDF2F4" }}
            >
              180
            </ToggleButton>
            <ToggleButton
              value="365"
              aria-label="365"
              style={{ color: "#EDF2F4", borderColor: "#EDF2F4" }}
            >
              365
            </ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
