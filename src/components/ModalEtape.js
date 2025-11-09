import React, { useState } from "react";
import { IconButton, Dialog, LinearProgress, Button } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "features/recipes/recipesSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function StepByStepModal() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState("next");
  const dispatch = useDispatch();

  const { open, steps, ingredients, title } = useSelector(
    (state) => state.recipes
  );

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
          "w-[90%] h-[90vh] mx-auto rounded-2xl bg-white shadow-lg flex flex-col justify-between p-6 relative overflow-hidden",
      }}
    >
      <div className="absolute top-0 w-[90%]">
        <h1 className="text-xl font-semibold mb-2">{title}</h1>
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

      <div className="flex flex-col items-center justify-center flex-grow text-center px-8 relative overflow-hidden">
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
                  {ingredient}
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
            top: "10%",
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
              top: "10%",
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
              top: "10%",
            }}
          >
            ✅
          </Button>
        )}
      </div>
    </Dialog>
  );
}
