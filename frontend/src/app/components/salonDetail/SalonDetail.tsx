import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import type { Salon } from "../../../types/salon";
import { getSalonById } from "../../../services/salonsApi";
import { salonDetailStyles as styles } from "./salonDetail.styles";

type SalonDetailProps = {
  salonId: number;
  onBack: () => void;
  onEdit: (id: number) => void;
};

export default function SalonDetail({
  salonId,
  onBack,
  onEdit,
}: SalonDetailProps) {
  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSalon() {
      try {
        setLoading(true);
        setError(null);

        const data = await getSalonById(salonId);
        setSalon(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load salon details.");
      } finally {
        setLoading(false);
      }
    }

    loadSalon();
  }, [salonId]);

  if (loading) {
    return (
      <main className={styles.notFoundPage}>
        <div className={styles.notFoundBox}>
          <p className="mb-4 text-gray-600">Loading salon details...</p>
          <button className={styles.backToListingsButton} onClick={onBack}>
            Back to all salons
          </button>
        </div>
      </main>
    );
  }

  if (error || !salon) {
    return (
      <main className={styles.notFoundPage}>
        <div className={styles.notFoundBox}>
          <h2 className={styles.notFoundTitle}>
            {error ?? "Salon not found"}
          </h2>
          <button className={styles.backToListingsButton} onClick={onBack}>
            Back to all salons
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
        <button className={styles.backButton} onClick={onBack}>
          <ArrowLeft className={styles.backIcon} />
          Back to all salons
        </button>

        <article className={styles.profileCard}>
          <header className={styles.profileHeader}>
            <div className={styles.profileHeaderContent}>
              <div className={styles.profileHeaderLeft}>
                <div className={styles.titleRow}>
                  <h2 className={styles.salonTitle}>{salon.name}</h2>
                  <span className={styles.categoryBadge}>
                    {salon.category}
                  </span>
                </div>

                <div className={styles.ratingInfo}>
                  <div className={styles.ratingBox}>
                    <Star className={styles.starIcon} />
                    <span className={styles.ratingText}>
                      {salon.rating ?? "N/A"}
                    </span>
                  </div>

                  <span className={styles.headerSeparator}>•</span>

                  <span className={styles.headerMutedText}>
                    {salon.reviewsCount !== null
                      ? `${salon.reviewsCount} reviews`
                      : "No reviews"}
                  </span>

                  <span className={styles.headerSeparator}>•</span>

                  <span className={styles.headerMutedText}>
                    {salon.priceRange ?? "Price not available"}
                  </span>
                </div>
              </div>

              <button
                className={styles.editButton}
                onClick={() => onEdit(salon.id)}
              >
                <Edit className={styles.editIcon} />
                Edit
              </button>
            </div>
          </header>

          <div className={styles.body}>
            <div className={styles.mainGrid}>
              <section>
                <h3 className={styles.sectionTitle}>Contact Information</h3>

                <div className={styles.contactList}>
                  <div className={styles.contactItem}>
                    <MapPin className={styles.contactIcon} />
                    <div>
                      <p className={styles.contactLabel}>Address</p>
                      <p className={styles.contactValue}>{salon.address}</p>
                      <p className={styles.districtText}>
                        District: {salon.district}
                      </p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <Phone className={styles.contactIcon} />
                    <div>
                      <p className={styles.contactLabel}>Phone</p>
                      {salon.phone ? (
                        <a
                          className={styles.phoneLink}
                          href={`tel:${salon.phone}`}
                        >
                          {salon.phone}
                        </a>
                      ) : (
                        <p className={styles.contactValue}>Not available</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <ExternalLink className={styles.contactIcon} />
                    <div>
                      <p className={styles.contactLabel}>Website</p>
                      {salon.website ? (
                        <a
                          className={styles.websiteLink}
                          href={salon.website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visit website
                          <ExternalLink className={styles.websiteSmallIcon} />
                        </a>
                      ) : (
                        <p className={styles.contactValue}>Not available</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.priceBox}>
                    <p className={styles.contactLabel}>Price Range</p>
                    <p className={styles.contactValue}>
                      {salon.priceRange ?? "Not available"}
                    </p>
                    <p className={styles.priceHint}>
                      $ - Budget · $$ - Moderate · $$$ - Premium
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className={styles.sectionTitle}>Services Offered</h3>

                {salon.services.length > 0 ? (
                  <div className={styles.servicesBox}>
                    {salon.services.map((service) => (
                      <span className={styles.serviceBadge} key={service}>
                        {service}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className={styles.description}>No services listed.</p>
                )}

                <h3 className={styles.aboutTitle}>About</h3>
                <p className={styles.description}>
                  {salon.description ?? "No description available."}
                </p>
              </section>
            </div>

            <section className={styles.statsSection}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <p className={styles.statNumber}>
                    {salon.rating ?? "N/A"}
                  </p>
                  <p className={styles.statLabel}>Average Rating</p>
                </div>

                <div className={styles.statCard}>
                  <p className={styles.statNumber}>
                    {salon.reviewsCount ?? 0}
                  </p>
                  <p className={styles.statLabel}>Total Reviews</p>
                </div>

                <div className={styles.statCard}>
                  <p className={styles.statNumber}>
                    {salon.services.length}
                  </p>
                  <p className={styles.statLabel}>Services Offered</p>
                </div>
              </div>
            </section>
          </div>
        </article>
      </section>
    </main>
  );
}