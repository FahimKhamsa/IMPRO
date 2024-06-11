import React, { useState } from "react";
import { Box, Slider, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import ImageboxWidget from "scenes/widgets/ImageboxWidget";
import SidebarWidget from "scenes/widgets/SidebarWidget";

const EditorPage = () => {
  const initialState = {
    image: null,
    brightness: 100,
    grayscale: 0,
    sepia: 0,
    saturate: 100,
    contrast: 100,
    hue: 0,
    blur: 0,
    rotate: 0,
    vertical: 1,
    horizontal: 1,
  };

  const [imageState, setImageState] = useState(initialState);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  const filterElements = [
    {
      name: "brightness",
      minValue: 0,
      maxValue: 200,
      curValue: imageState.brightness,
    },
    {
      name: "contrast",
      minValue: 0,
      maxValue: 200,
      curValue: imageState.contrast,
    },
    {
      name: "grayscale",
      minValue: 0,
      maxValue: 200,
      curValue: imageState.grayscale,
    },
    { name: "sepia", minValue: 0, maxValue: 200, curValue: imageState.sepia },
    {
      name: "saturate",
      minValue: 0,
      maxValue: 200,
      curValue: imageState.saturate,
    },
    { name: "hue", minValue: 0, maxValue: 360, curValue: imageState.hue },
    { name: "blur", minValue: 0, maxValue: 5, curValue: imageState.blur },
    { name: "rotate", minValue: 0, maxValue: 360, curValue: imageState.rotate },
    {
      name: "vertical",
      minValue: -1,
      maxValue: 1,
      curValue: imageState.vertical,
    },
    {
      name: "horizontal",
      minValue: -1,
      maxValue: 1,
      curValue: imageState.horizontal,
    },
  ];

  const handleSliderChange = (event, newValue) => {
    const selectedOption = filterElements[selectedOptionIndex].name;

    if (selectedOption === "vertical" || selectedOption === "horizontal") {
      setImageState((prevState) => {
        const newState = {
          ...prevState,
          [selectedOption]: imageState[selectedOption] === 1 ? -1 : 1,
        };
        setHistory([...history, prevState]);
        setFuture([]);
        return newState;
      });
    }

    setImageState((prevState) => {
      const newState = { ...prevState, [selectedOption]: newValue };
      setHistory([...history, prevState]);
      setFuture([]);
      return newState;
    });
  };

  const getCurValue = () => {
    const selectedOption = filterElements[selectedOptionIndex].name;
    return imageState[selectedOption];
  };

  const deleteImage = () => {
    setImageState(initialState);
    setHistory([]);
    setFuture([]);
  };

  const resetImage = () => {
    setImageState((prevState) => ({
      ...prevState,
      brightness: 100,
      grayscale: 0,
      sepia: 0,
      saturate: 100,
      contrast: 100,
      hue: 0,
      blur: 0,
      rotate: 0,
      vertical: 1,
      horizontal: 1,
    }));
  };

  const undoChange = () => {
    if (history.length > 0) {
      const lastState = history.pop();
      setFuture([imageState, ...future]);
      setImageState(lastState);
      setHistory([...history]);
    }
  };

  const redoChange = () => {
    if (future.length > 0) {
      const nextState = future.shift();
      setHistory([...history, imageState]);
      setImageState(nextState);
      setFuture([...future]);
    }
  };

  const generateUniqueImageName = () => {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(7);
    return `image_${timestamp}_${randomString}`;
  };

  const saveImage = () => {
    const image = new Image();
    image.src = imageState.image;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;

      context.filter = `brightness(${imageState.brightness}%) grayscale(${imageState.grayscale}%)
                        sepia(${imageState.sepia}%) saturate(${imageState.saturate}%) 
                        contrast(${imageState.contrast}%) hue-rotate(${imageState.hue}deg) 
                        blur(${imageState.blur}px)`;

      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate((imageState.rotate * Math.PI) / 180);
      context.scale(imageState.vertical, imageState.horizontal);
      context.drawImage(image, -image.width / 2, -image.height / 2);
      context.setTransform(1, 0, 0, 1, 0, 0);

      const link = document.createElement("a");
      link.download = generateUniqueImageName();
      link.href = canvas.toDataURL();
      link.click();
    };
  };
  // eslint-disable-next-line
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          paddingTop: "1rem",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            minWidth: "30px",
            padding: "1.5rem 3% 1.5rem 6%",
          }}
        >
          <SidebarWidget
            filterElements={filterElements}
            selectFilter={(index) => setSelectedOptionIndex(index)}
          />
        </Box>
        <Box
          sx={{
            padding: "2rem 0",
          }}
        >
          <Slider
            sx={{
              '& input[type="range"]': {
                WebkitAppearance: "slider-vertical",
              },
            }}
            orientation="vertical"
            value={getCurValue()}
            aria-label="Default"
            valueLabelDisplay="auto"
            min={filterElements[selectedOptionIndex].minValue}
            max={filterElements[selectedOptionIndex].maxValue}
            onChange={handleSliderChange}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: "1.5rem 6% 1.5rem 3%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          <ImageboxWidget
            imageState={imageState}
            setImageState={setImageState}
            deleteImage={deleteImage}
            resetImage={resetImage}
            undoChange={undoChange}
            redoChange={redoChange}
            saveImage={saveImage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EditorPage;
