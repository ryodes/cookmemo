import React, { useState } from "react";
import { IconButton, Dialog, LinearProgress, Button } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "features/recipes/recipesSlice";

export default function StepByStepModal() {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();

  const { open, steps } = useSelector((state) => state.recipes);

  if (!steps.length) return null; // sécurité

  const handleClose = () => {
    dispatch(closeModal());
    setCurrentStep(0);
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={false} // permet de dépasser les limites habituelles
        PaperProps={{
          className:
            "w-[90%] h-[90vh] mx-auto rounded-2xl bg-blue shadow-lg flex flex-col justify-between p-6 relative",
        }}
      >
        <div className="absolute top-0 w-[90%]">
          <h1 className="text-3xl font-semibold">titlre</h1>
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

        <div className="flex flex-col items-center justify-center flex-grow text-center px-8">
          <h2 className="text-3xl font-semibold mb-6">
            Étape {currentStep + 1} sur {steps.length}
          </h2>
          <p className="text-2xl text-gray-700 leading-relaxed max-w-3xl">
            {steps[currentStep]}
          </p>
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
    </>
  );
}
