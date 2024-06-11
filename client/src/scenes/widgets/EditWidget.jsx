import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useNavigate } from "react-router-dom";

const EditWidget = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;

  return (
    <WidgetWrapper onClick={() => navigate(`/editor`)}>
      <FlexBetween>
        <Typography color={dark} variant="h3" fontWeight="700">
          Start Editing 😉
        </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:8000/assets/editor.png"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
    </WidgetWrapper>
  );
};

export default EditWidget;
