import React from "react";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: "1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

const SidebarWidget = ({ filterElements, selectFilter }) => {
  const getIconSource = (name) => {
    switch (name) {
      case "brightness":
        return "http://localhost:3000/toolsIcons/Brightness.png";
      case "contrast":
        return "http://localhost:3000/toolsIcons/Contrast.png";
      case "grayscale":
        return "http://localhost:3000/toolsIcons/Grayscale.png";
      case "sepia":
        return "http://localhost:3000/toolsIcons/Sepia.png";
      case "saturate":
        return "http://localhost:3000/toolsIcons/Saturation.png";
      case "hue":
        return "http://localhost:3000/toolsIcons/Hue.png";
      case "blur":
        return "http://localhost:3000/toolsIcons/Blur.png";
      case "rotate":
        return "http://localhost:3000/toolsIcons/Rotate.png";
      case "vertical":
        return "http://localhost:3000/toolsIcons/FlipVertical.png";
      case "horizontal":
        return "http://localhost:3000/toolsIcons/FlipHorizontal.png";
      default:
        return "";
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Box sx={{ paddingTop: "1rem" }}>
          <List>
            {filterElements.map((element, index) => (
              <React.Fragment key={element.name}>
                <Divider />
                <Tooltip title={element.name} placement="right">
                  <ListItemButton onClick={() => selectFilter(index)}>
                    <ListItemIcon
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={getIconSource(element.name)}
                        alt={element.name}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </Tooltip>
                {index === filterElements.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default SidebarWidget;
