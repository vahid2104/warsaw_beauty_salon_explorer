import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, Plus, Save, X } from "lucide-react";
import type { Salon } from "../../../types/salon";
import { getSalonById, updateSalon } from "../../../services/salonsApi";
import { salonEditStyles as styles } from "./salonEdit.styles";

type SalonEditProps = {
  salonId: number;
  onCancel: () => void;
  onSaved: () => void;
};

const DISTRICTS = [
  "Bemowo",
  "Bielany",
  "Wola",
  "Śródmieście",
  "Mokotów",
  "Żoliborz",
  "Ochota",
  "Praga",
  "Wilanów",
  "Targówek",
];

const CATEGORIES = [
  "Beauty Salon",
  "Hair Salon",
  "Nail Salon",
  "Skin Care Clinic",
  "Barber",
  "Spa",
];

const PRICE_RANGES = ["$", "$$", "$$$"];

const emptySalon: Salon = {
  id: 0,
  name: "",
  category: "Beauty Salon",
  address: "",
  district: "Bemowo",
  phone: null,
  website: null,
  services: [],
  priceRange: null,
  rating: null,
  reviewsCount: null,
  description: null,
};

export default function SalonEdit({
  salonId,
  onCancel,
  onSaved,
}: SalonEditProps) {
  const [formData, setFormData] = useState<Salon>(emptySalon);
  const [newService, setNewService] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadSalon() {
      try {
        setLoading(true);
        setError(null);

        const data = await getSalonById(salonId);
        setFormData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load salon for editing.");
      } finally {
        setLoading(false);
      }
    }

    loadSalon();
  }, [salonId]);

  const updateField = <K extends keyof Salon>(field: K, value: Salon[K]) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleAddService = () => {
    const cleanedService = newService.trim();

    if (!cleanedService) return;

    if (formData.services.includes(cleanedService)) {
      setNewService("");
      return;
    }

    setFormData((previous) => ({
      ...previous,
      services: [...previous.services, cleanedService],
    }));

    setNewService("");
  };

  const handleRemoveService = (service: string) => {
    setFormData((previous) => ({
      ...previous,
      services: previous.services.filter((item) => item !== service),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError(null);
      setSuccessMessage("");

      const { id, ...payload } = formData;

      await updateSalon(id, {
        ...payload,
        phone: payload.phone || null,
        website: payload.website || null,
        priceRange: payload.priceRange || null,
        rating:
          payload.rating === null || Number.isNaN(Number(payload.rating))
            ? null
            : Number(payload.rating),
        reviewsCount:
          payload.reviewsCount === null ||
          Number.isNaN(Number(payload.reviewsCount))
            ? null
            : Number(payload.reviewsCount),
        description: payload.description || null,
      });

      setSuccessMessage("Salon details saved successfully.");

      setTimeout(() => {
        onSaved();
      }, 600);
    } catch (err) {
      console.error(err);
      setError("Failed to save salon details.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className={styles.notFoundPage}>
        <div className={styles.notFoundBox}>
          <p className="mb-4 text-gray-600">Loading edit form...</p>
          <button className={styles.notFoundButton} onClick={onCancel}>
            Back
          </button>
        </div>
      </main>
    );
  }

  if (error && !formData.id) {
    return (
      <main className={styles.notFoundPage}>
        <div className={styles.notFoundBox}>
          <h2 className={styles.notFoundTitle}>{error}</h2>
          <button className={styles.notFoundButton} onClick={onCancel}>
            Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navInner}>
            <h1 className={styles.navTitle}>Warsaw Beauty Salon Explorer</h1>
          </div>
        </div>
      </nav>

      <section className={styles.contentContainer}>
        <button className={styles.backButton} onClick={onCancel}>
          <ArrowLeft className={styles.backIcon} />
          Back to details
        </button>

        <article className={styles.card}>
          <header className={styles.header}>
            <h2 className={styles.headerTitle}>Edit Salon Details</h2>
            <p className={styles.headerSubtitle}>
              Update information for {formData.name}
            </p>
          </header>

          <form className={styles.form} onSubmit={handleSubmit}>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Basic Information</h3>

              <div className={styles.twoColumnGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Salon Name *</label>
                  <input
                    className={`${styles.inputBase} ${styles.inputNormal}`}
                    type="text"
                    value={formData.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Category *</label>
                  <select
                    className={styles.select}
                    value={formData.category}
                    onChange={(event) =>
                      updateField("category", event.target.value)
                    }
                    required
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>District *</label>
                  <select
                    className={styles.select}
                    value={formData.district}
                    onChange={(event) =>
                      updateField("district", event.target.value)
                    }
                    required
                  >
                    {DISTRICTS.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Price Range</label>
                  <select
                    className={styles.select}
                    value={formData.priceRange ?? ""}
                    onChange={(event) =>
                      updateField("priceRange", event.target.value || null)
                    }
                  >
                    <option value="">Not available</option>
                    {PRICE_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className={styles.sectionWithBorder}>
              <h3 className={styles.sectionTitle}>Contact Information</h3>

              <div className={styles.fieldStack}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Address *</label>
                  <input
                    className={`${styles.inputBase} ${styles.inputNormal}`}
                    type="text"
                    value={formData.address}
                    onChange={(event) =>
                      updateField("address", event.target.value)
                    }
                    required
                  />
                </div>

                <div className={styles.twoColumnGrid}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Phone</label>
                    <input
                      className={`${styles.inputBase} ${styles.inputNormal}`}
                      type="text"
                      value={formData.phone ?? ""}
                      onChange={(event) =>
                        updateField("phone", event.target.value || null)
                      }
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Website</label>
                    <input
                      className={`${styles.inputBase} ${styles.inputNormal}`}
                      type="url"
                      value={formData.website ?? ""}
                      onChange={(event) =>
                        updateField("website", event.target.value || null)
                      }
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.sectionWithBorder}>
              <h3 className={styles.sectionTitle}>Rating & Reviews</h3>

              <div className={styles.twoColumnGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Rating (0-5)</label>
                  <input
                    className={`${styles.inputBase} ${styles.inputNormal}`}
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating ?? ""}
                    onChange={(event) =>
                      updateField(
                        "rating",
                        event.target.value === ""
                          ? null
                          : Number(event.target.value)
                      )
                    }
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Number of Reviews</label>
                  <input
                    className={`${styles.inputBase} ${styles.inputNormal}`}
                    type="number"
                    min="0"
                    value={formData.reviewsCount ?? ""}
                    onChange={(event) =>
                      updateField(
                        "reviewsCount",
                        event.target.value === ""
                          ? null
                          : Number(event.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </section>

            <section className={styles.sectionWithBorder}>
              <h3 className={styles.sectionTitle}>Services Offered</h3>

              <div className={styles.serviceAddRow}>
                <input
                  className={styles.serviceInput}
                  type="text"
                  value={newService}
                  onChange={(event) => setNewService(event.target.value)}
                  placeholder="Add a service..."
                />

                <button
                  className={styles.addButton}
                  type="button"
                  onClick={handleAddService}
                >
                  <Plus className={styles.addIcon} />
                  Add
                </button>
              </div>

              {formData.services.length > 0 ? (
                <div className={styles.servicesList}>
                  {formData.services.map((service) => (
                    <span className={styles.serviceBadge} key={service}>
                      {service}
                      <button
                        className={styles.removeServiceButton}
                        type="button"
                        onClick={() => handleRemoveService(service)}
                        aria-label={`Remove ${service}`}
                      >
                        <X className={styles.removeServiceIcon} />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No services added yet.
                </p>
              )}
            </section>

            <section className={styles.sectionWithBorder}>
              <h3 className={styles.sectionTitle}>Description</h3>

              <textarea
                className={styles.textarea}
                rows={5}
                value={formData.description ?? ""}
                onChange={(event) =>
                  updateField("description", event.target.value || null)
                }
                placeholder="Short description about the salon..."
              />
            </section>

            {error && <p className={styles.errorText}>{error}</p>}

            {successMessage && (
              <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                {successMessage}
              </p>
            )}

            <div className={styles.actionButtons}>
              <button
                className={styles.saveButton}
                type="submit"
                disabled={saving}
              >
                <Save className={styles.saveIcon} />
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                className={styles.cancelButton}
                type="button"
                onClick={onCancel}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </form>
        </article>
      </section>
    </main>
  );
}