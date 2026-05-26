import { ArrowLeft, Star, MapPin, Phone, ExternalLink, Edit } from "lucide-react";
import { salonData } from "../../../data/salons";
import { salonDetailStyles as s } from "./salonDetail.styles";

type SalonDetailProps = {
  salonId: string;
  onBack: () => void;
  onEdit: (salonId: string) => void;
};

export default function SalonDetail({
  salonId,
  onBack,
  onEdit,
}: SalonDetailProps) {
  const salon = salonData.find((s) => s.id === salonId);

  if (!salon) {
    return (
      <div className={s.notFoundPage}>
        <div className={s.notFoundBox}>
          <h2 className={s.notFoundTitle}>Salon not found</h2>
          <button onClick={onBack} className={s.backToListingsButton}>
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

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
          <span>Back to all salons</span>
        </button>

        {/* Salon Profile Card */}
        <div className={s.profileCard}>
          {/* Header */}
          <div className={s.profileHeader}>
            <div className={s.profileHeaderContent}>
              <div className={s.profileHeaderLeft}>
                <div className={s.titleRow}>
                  <h1 className={s.salonTitle}>{salon.name}</h1>
                  <span className={s.categoryBadge}>{salon.category}</span>
                </div>

                <div className={s.ratingInfo}>
                  <div className={s.ratingBox}>
                    <Star className={s.starIcon} />
                    <span className={s.ratingText}>
                      {salon.rating.toFixed(1)}
                    </span>
                  </div>

                  <span className={s.headerSeparator}>•</span>
                  <span className={s.headerMutedText}>
                    {salon.reviewsCount} reviews
                  </span>
                  <span className={s.headerSeparator}>•</span>
                  <span className={s.headerMutedText}>{salon.priceRange}</span>
                </div>
              </div>

              <button
                onClick={() => onEdit(salon.id)}
                className={s.editButton}
              >
                <Edit className={s.editIcon} />
                Edit
              </button>
            </div>
          </div>

          {/* Body */}
          <div className={s.body}>
            <div className={s.mainGrid}>
              {/* Left Column - Contact Info */}
              <div>
                <h3 className={s.sectionTitle}>Contact Information</h3>

                <div className={s.contactList}>
                  <div className={s.contactItem}>
                    <MapPin className={s.contactIcon} />
                    <div>
                      <div className={s.contactLabel}>Address</div>
                      <div className={s.contactValue}>{salon.address}</div>
                      <div className={s.districtText}>
                        District: {salon.district}
                      </div>
                    </div>
                  </div>

                  <div className={s.contactItem}>
                    <Phone className={s.contactIcon} />
                    <div>
                      <div className={s.contactLabel}>Phone</div>
                      <a href={`tel:${salon.phone}`} className={s.phoneLink}>
                        {salon.phone}
                      </a>
                    </div>
                  </div>

                  {salon.website && (
                    <div className={s.contactItem}>
                      <ExternalLink className={s.contactIcon} />
                      <div>
                        <div className={s.contactLabel}>Website</div>
                        <a
                          href={salon.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={s.websiteLink}
                        >
                          Visit website
                          <ExternalLink className={s.websiteSmallIcon} />
                        </a>
                      </div>
                    </div>
                  )}

                  <div className={s.priceBox}>
                    <div className={s.contactLabel}>Price Range</div>
                    <div className={s.contactValue}>{salon.priceRange}</div>
                    <div className={s.priceHint}>
                      $ = Budget • $$ = Moderate • $$$ = Premium
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Services & Description */}
              <div>
                <h3 className={s.sectionTitle}>Services Offered</h3>

                <div className={s.servicesBox}>
                  {salon.services.map((service, idx) => (
                    <span key={idx} className={s.serviceBadge}>
                      {service}
                    </span>
                  ))}
                </div>

                <h3 className={s.aboutTitle}>About</h3>
                <p className={s.description}>{salon.description}</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className={s.statsSection}>
              <h3 className={s.sectionTitle}>At a Glance</h3>

              <div className={s.statsGrid}>
                <div className={s.statCard}>
                  <div className={s.statNumber}>
                    {salon.rating.toFixed(1)}
                  </div>
                  <div className={s.statLabel}>Average Rating</div>
                </div>

                <div className={s.statCard}>
                  <div className={s.statNumber}>{salon.reviewsCount}</div>
                  <div className={s.statLabel}>Total Reviews</div>
                </div>

                <div className={s.statCard}>
                  <div className={s.statNumber}>{salon.services.length}</div>
                  <div className={s.statLabel}>Services Offered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}