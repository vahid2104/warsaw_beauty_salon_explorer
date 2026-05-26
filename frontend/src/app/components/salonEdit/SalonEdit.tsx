import { useState } from "react";
import { ArrowLeft, Save, X, Plus } from "lucide-react";
import { salonData, Salon, districts, categories } from "../../../data/salons";
import { salonEditStyles as s } from "./salonEdit.styles";

type SalonEditProps = {
  salonId: string;
  onBack: () => void;
  onSave: (updatedSalon: Salon) => void;
};

export default function SalonEdit({
  salonId,
  onBack,
  onSave,
}: SalonEditProps) {
  const originalSalon = salonData.find((s) => s.id === salonId);

  if (!originalSalon) {
    return (
      <div className={s.notFoundPage}>
        <div className={s.notFoundBox}>
          <h2 className={s.notFoundTitle}>Salon not found</h2>
          <button onClick={onBack} className={s.notFoundButton}>
            Back
          </button>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState<Salon>({ ...originalSalon });
  const [newService, setNewService] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getInputClassName = (fieldName: string) => {
    return `${s.inputBase} ${
      errors[fieldName] ? s.inputError : s.inputNormal
    }`;
  };

  const handleInputChange = (field: keyof Salon, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const addService = () => {
    const trimmedService = newService.trim();

    if (trimmedService && !formData.services.includes(trimmedService)) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, trimmedService],
      }));
      setNewService("");
    }
  };

  const removeService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = "Rating must be between 0 and 5";
    }

    if (formData.reviewsCount < 0) {
      newErrors.reviewsCount = "Reviews count cannot be negative";
    }

    if (formData.services.length === 0) {
      newErrors.services = "At least one service is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className={s.page}>
      {/* Navigation */}
      <nav className={s.nav}>
        <div className={s.navContainer}>
          <div className={s.navInner}>
            <h1 className={s.navTitle}>Warsaw Beauty Salon Explorer</h1>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className={s.contentContainer}>
        {/* Back Button */}
        <button onClick={onBack} className={s.backButton}>
          <ArrowLeft className={s.backIcon} />
          <span>Cancel</span>
        </button>

        {/* Edit Form Card */}
        <div className={s.card}>
          {/* Header */}
          <div className={s.header}>
            <h1 className={s.headerTitle}>Edit Salon Details</h1>
            <p className={s.headerSubtitle}>
              Update information for {originalSalon.name}
            </p>
          </div>

          {/* Form */}
          <div className={s.form}>
            {/* Basic Information */}
            <div className={s.section}>
              <h3 className={s.sectionTitle}>Basic Information</h3>

              <div className={s.twoColumnGrid}>
                <div className={s.fieldGroup}>
                  <label htmlFor="name" className={s.label}>
                    Salon Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      handleInputChange("name", e.target.value)
                    }
                    className={getInputClassName("name")}
                  />
                  {errors.name && (
                    <p className={s.errorText}>{errors.name}</p>
                  )}
                </div>

                <div className={s.fieldGroup}>
                  <label htmlFor="category" className={s.label}>
                    Category *
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className={s.select}
                  >
                    {categories
                      .filter((c) => c !== "All Categories")
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>

                <div className={s.fieldGroup}>
                  <label htmlFor="district" className={s.label}>
                    District *
                  </label>
                  <select
                    id="district"
                    value={formData.district}
                    onChange={(e) =>
                      handleInputChange("district", e.target.value)
                    }
                    className={s.select}
                  >
                    {districts
                      .filter((d) => d !== "All Districts")
                      .map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                  </select>
                </div>

                <div className={s.fieldGroup}>
                  <label htmlFor="priceRange" className={s.label}>
                    Price Range *
                  </label>
                  <select
                    id="priceRange"
                    value={formData.priceRange}
                    onChange={(e) =>
                      handleInputChange("priceRange", e.target.value)
                    }
                    className={s.select}
                  >
                    <option value="$">$ - Budget</option>
                    <option value="$$">$$ - Moderate</option>
                    <option value="$$$">$$$ - Premium</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className={s.sectionWithBorder}>
              <h3 className={s.sectionTitle}>Contact Information</h3>

              <div className={s.fieldStack}>
                <div className={s.fieldGroup}>
                  <label htmlFor="address" className={s.label}>
                    Address *
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className={getInputClassName("address")}
                  />
                  {errors.address && (
                    <p className={s.errorText}>{errors.address}</p>
                  )}
                </div>

                <div className={s.twoColumnGrid}>
                  <div className={s.fieldGroup}>
                    <label htmlFor="phone" className={s.label}>
                      Phone *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className={getInputClassName("phone")}
                    />
                    {errors.phone && (
                      <p className={s.errorText}>{errors.phone}</p>
                    )}
                  </div>

                  <div className={s.fieldGroup}>
                    <label htmlFor="website" className={s.label}>
                      Website
                    </label>
                    <input
                      id="website"
                      type="url"
                      value={formData.website || ""}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      placeholder="https://"
                      className={`${s.inputBase} ${s.inputNormal}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className={s.sectionWithBorder}>
              <h3 className={s.sectionTitle}>Rating & Reviews</h3>

              <div className={s.twoColumnGrid}>
                <div className={s.fieldGroup}>
                  <label htmlFor="rating" className={s.label}>
                    Rating (0-5) *
                  </label>
                  <input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) =>
                      handleInputChange(
                        "rating",
                        Number.parseFloat(e.target.value)
                      )
                    }
                    className={getInputClassName("rating")}
                  />
                  {errors.rating && (
                    <p className={s.errorText}>{errors.rating}</p>
                  )}
                </div>

                <div className={s.fieldGroup}>
                  <label htmlFor="reviewsCount" className={s.label}>
                    Number of Reviews *
                  </label>
                  <input
                    id="reviewsCount"
                    type="number"
                    min="0"
                    value={formData.reviewsCount}
                    onChange={(e) =>
                      handleInputChange(
                        "reviewsCount",
                        Number.parseInt(e.target.value)
                      )
                    }
                    className={getInputClassName("reviewsCount")}
                  />
                  {errors.reviewsCount && (
                    <p className={s.errorText}>{errors.reviewsCount}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className={s.sectionWithBorder}>
              <h3 className={s.sectionTitle}>Services Offered *</h3>

              <div className={s.fieldStack}>
                <div className={s.serviceAddRow}>
                  <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addService();
                      }
                    }}
                    placeholder="Add a service..."
                    className={s.serviceInput}
                  />

                  <button
                    onClick={addService}
                    type="button"
                    className={s.addButton}
                  >
                    <Plus className={s.addIcon} />
                    Add
                  </button>
                </div>

                <div className={s.servicesList}>
                  {formData.services.map((service, idx) => (
                    <span key={idx} className={s.serviceBadge}>
                      {service}
                      <button
                        onClick={() => removeService(service)}
                        type="button"
                        className={s.removeServiceButton}
                      >
                        <X className={s.removeServiceIcon} />
                      </button>
                    </span>
                  ))}
                </div>

                {errors.services && (
                  <p className={s.serviceErrorText}>{errors.services}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className={s.sectionWithBorder}>
              <h3 className={s.sectionTitle}>Description</h3>

              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className={s.textarea}
              />
            </div>

            {/* Action Buttons */}
            <div className={s.actionButtons}>
              <button onClick={handleSave} className={s.saveButton}>
                <Save className={s.saveIcon} />
                Save Changes
              </button>

              <button onClick={onBack} className={s.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}