import { useState } from "react";
import MainListing from "./components/mainListing/MainListing";
import SalonDetail from "./components/salonDetail/SalonDetail";
import SalonEdit from "./components/salonEdit/SalonEdit";
import { Salon } from "../data/salons";
import { toast, Toaster } from "sonner";

type View = "listing" | "detail" | "edit";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("listing");
  const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null);

  const handleSelectSalon = (salonId: string) => {
    setSelectedSalonId(salonId);
    setCurrentView("detail");
  };

  const handleBackToListing = () => {
    setCurrentView("listing");
    setSelectedSalonId(null);
  };

  const handleEdit = (salonId: string) => {
    setSelectedSalonId(salonId);
    setCurrentView("edit");
  };

  const handleBackToDetail = () => {
    setCurrentView("detail");
  };

  const handleSave = (updatedSalon: Salon) => {
    // In a real application, this would save to a backend
    console.log("Saving salon:", updatedSalon);
    toast.success("Salon updated successfully!");
    setCurrentView("detail");
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      {currentView === "listing" && <MainListing onSelectSalon={handleSelectSalon} />}

      {currentView === "detail" && selectedSalonId && (
        <SalonDetail
          salonId={selectedSalonId}
          onBack={handleBackToListing}
          onEdit={handleEdit}
        />
      )}

      {currentView === "edit" && selectedSalonId && (
        <SalonEdit
          salonId={selectedSalonId}
          onBack={handleBackToDetail}
          onSave={handleSave}
        />
      )}
    </>
  );
}