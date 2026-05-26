import { useState } from "react";
import MainListing from "./components/mainListing/MainListing";
import SalonDetail from "./components/salonDetail/SalonDetail";
import SalonEdit from "./components/salonEdit/SalonEdit";

type View = "listing" | "detail" | "edit";

function App() {
  const [currentView, setCurrentView] = useState<View>("listing");
  const [selectedSalonId, setSelectedSalonId] = useState<number | null>(null);

  const handleViewDetails = (id: number) => {
    setSelectedSalonId(id);
    setCurrentView("detail");
  };

  const handleEditSalon = (id: number) => {
    setSelectedSalonId(id);
    setCurrentView("edit");
  };

  const handleBackToList = () => {
    setSelectedSalonId(null);
    setCurrentView("listing");
  };

  const handleBackToDetail = () => {
    setCurrentView("detail");
  };

  return (
    <>
      {currentView === "listing" && (
        <MainListing onViewDetails={handleViewDetails} />
      )}

      {currentView === "detail" && selectedSalonId !== null && (
        <SalonDetail
          salonId={selectedSalonId}
          onBack={handleBackToList}
          onEdit={handleEditSalon}
        />
      )}

      {currentView === "edit" && selectedSalonId !== null && (
        <SalonEdit
          salonId={selectedSalonId}
          onCancel={handleBackToDetail}
          onSaved={handleBackToDetail}
        />
      )}
    </>
  );
}

export default App;