import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import {
  Undo as UndoIcon,
  Redo as RedoIcon,
  Image as ImageIcon,
  RestartAlt as RestartAltIcon,
  SaveAlt as SaveAltIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
// import ReactCrop from "react-image-crop";
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

const ImageboxWidget = ({
  imageState,
  setImageState,
  deleteImage,
  resetImage,
  undoChange,
  redoChange,
  saveImage,
  downloadImage,
}) => {
  const imageHandle = (event) => {
    if (event.target.files.length !== 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageState({
          ...imageState,
          image: reader.result,
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // const [crop, setCrop] = useState("");

  return (
    <WidgetWrapper>
      <Card
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            {imageState.image ? (
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  filter: `brightness(${imageState.brightness}%) grayscale(${imageState.grayscale}%) sepia(${imageState.sepia}%) saturate(${imageState.saturate}%) contrast(${imageState.contrast}%) hue-rotate(${imageState.hue}deg) blur(${imageState.blur}px)`,
                  transform: `rotate(${imageState.rotate}deg) scaleX(${imageState.horizontal}) scaleY(${imageState.vertical})`,
                }}
                src={imageState.image}
                alt="Uploaded"
              />
            ) : (
              <label
                htmlFor="upload"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ImageIcon sx={{ fontSize: 50, color: "gray" }} />
                  <Typography variant="body1" color="textSecondary">
                    Upload Image
                  </Typography>
                </Box>
              </label>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <FlexBetween>
            <Box>
              <IconButton
                onClick={deleteImage}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={resetImage}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <RestartAltIcon />
              </IconButton>
              <IconButton
                onClick={undoChange}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <UndoIcon />
              </IconButton>
              <IconButton
                onClick={redoChange}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <RedoIcon />
              </IconButton>
              <IconButton
                onClick={saveImage}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <SaveAltIcon />
              </IconButton>
            </Box>
            <Button variant="contained" component="label">
              Upload File
              <input onChange={imageHandle} type="file" hidden id="upload" />
            </Button>
          </FlexBetween>
        </CardActions>
      </Card>
    </WidgetWrapper>
  );
};

export default ImageboxWidget;
