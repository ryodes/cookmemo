import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { IconButton, Dialog, LinearProgress, Button, Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { adjustIngredientQuantity } from "utils";
import { closeModal } from "features/recipes/recipesSlice";
import { motion, AnimatePresence } from "framer-motion";
import NbPartInline from "components/NbPartLine";

export default function StepByStepModal() {
  const [touchStartX, setTouchStartX] = useState(0);

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState("next");
  const dispatch = useDispatch();
  const [ratio, setRatio] = useState(1);

  const { open, steps, ingredients, title, nbPart } = useSelector(
    (state) => state.recipes
  );

  const [nbPartModifier, setNbPartModifier] = useState(4);

  useEffect(() => {
    setNbPartModifier(nbPart);
  }, [nbPart]);

  useEffect(() => {
    setRatio(nbPartModifier / nbPart);
  }, [nbPartModifier, nbPart]);

  if (!steps.length) return null;

  const handleClose = () => {
    dispatch(closeModal());
    setCurrentStep(0);
  };

  const nextStep = () => {
    setDirection("next");
    setCurrentStep((next) => {
      return Math.min(next + 1, steps.length - 1);
    });
  };

  const prevStep = () => {
    setDirection("prev");
    setCurrentStep((prev) => {
      return Math.max(prev - 1, 0);
    });
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches ? e.touches[0].clientX : e.clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = touchStartX - endX;

    if (Math.abs(diff) > 60) {
      if (diff > 0) nextStep();
      else prevStep();
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const variants = {
    enter: (direction) => ({
      x: direction === "next" ? 100 : -100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction === "next" ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={false}
      PaperProps={{
        className:
          "w-[90%] h-[90vh] mx-auto rounded-2xl bg-white shadow-lg flex flex-col justify-between px-6 relative overflow-hidden",
      }}
    >
      <div className="w-[93%] z-20">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <h1 className="text-xl font-semibold my-auto capitalize">{title}</h1>
          <NbPartInline value={nbPartModifier} onChange={setNbPartModifier} />
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 12, borderRadius: 1 }}
        />
      </div>

      <div style={{ position: "absolute", top: "5px", right: "5px" }}>
        <IconButton aria-label="start" onClick={handleClose}>
          <HighlightOffIcon />
        </IconButton>
      </div>

      <div
        className="flex flex-col items-center justify-center flex-grow text-center px-8 relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute w-full"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Étape {currentStep + 1} sur {steps.length}
            </h2>
            <div className="relative max-h-52 overflow-y-auto p-4">
              <p className="text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto max-w-[80%]">
                {steps[currentStep]}
              </p>
              <div className="sticky bottom-[-15px] left-0 w-full h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>

            <u className="text-gray-400 mt-3">Ingredients:</u>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-400">
                  {adjustIngredientQuantity(ingredient, ratio)}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-6 px-8 pb-4">
        <Button
          variant="outlined"
          onClick={prevStep}
          disabled={currentStep === 0}
          sx={{
            fontSize: "1rem",
            padding: "10px 24px",
            position: { sm: "absolute", xs: "relative" },
            left: "5px",
            height: "80%",
            top: "15%",
          }}
        >
          ⬅️
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={nextStep}
            sx={{
              fontSize: "1rem",
              padding: "10px 24px",
              backgroundColor: "#4CAF50",
              "&:hover": { backgroundColor: "#45a049" },
              position: { sm: "absolute", xs: "relative" },
              right: "5px",
              height: "80%",
              top: "15%",
            }}
          >
            ➡️
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={handleClose}
            sx={{
              fontSize: "1rem",
              padding: "10px 24px",
              position: { sm: "absolute", xs: "relative" },
              right: "5px",
              height: "80%",
              top: "15%",
            }}
          >
            ✅
          </Button>
        )}
      </div>
    </Dialog>
  );
}
