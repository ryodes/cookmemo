import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import Home from "pages/Home";
import About from "pages/About";
import Recipes from "pages/Recipes";
import NewRecipes from "pages/NewRecipes";
import UpdateRecipes from "pages/UpdateRecipes";
import Login from "pages/Login";
import Page404 from "pages/Page404";
import ProtectedRoute from "router/ProtectedRoute";
import GuestGuard from "router/GuestGuard";
import RecipeDemo from "components/ModalEtape";

export default function AppRouter() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <main className="p-4">
          <RecipeDemo />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/recipes"
              element={
                <ProtectedRoute>
                  <Recipes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/newRecipe"
              element={
                <ProtectedRoute>
                  <NewRecipes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateRecipe/:id"
              element={
                <ProtectedRoute>
                  <UpdateRecipes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <GuestGuard>
                  <Login />
                </GuestGuard>
              }
            />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
