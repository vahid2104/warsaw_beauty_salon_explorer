import { useEffect, useMemo, useState } from "react";
import { MapPin, Search, Star, Scissors } from "lucide-react";
import type { SalonListItem } from "../../../types/salon";
import { getSalons } from "../../../services/salonsApi";
import { mainListingStyles as styles } from "./mainListing.styles";

type MainListingProps = {
  onViewDetails: (id: number) => void;
};

const DISTRICTS = [
  "All Districts",
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
  "All Categories",
  "Beauty Salon",
  "Hair Salon",
  "Nail Salon",
  "Skin Care Clinic",
  "Barber",
  "Spa",
];

const SORT_OPTIONS = ["Highest Rating", "Most Reviews", "Name A-Z"];

export default function MainListing({ onViewDetails }: MainListingProps) {
  const [salons, setSalons] = useState<SalonListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Highest Rating");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSalons() {
      try {
        setLoading(true);
        setError(null);

        const data = await getSalons({
          search: searchTerm,
          district: selectedDistrict,
          category: selectedCategory,
        });

        setSalons(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load salons. Please check if backend is running.");
      } finally {
        setLoading(false);
      }
    }

    const timeoutId = setTimeout(loadSalons, 250);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedDistrict, selectedCategory]);

  const sortedSalons = useMemo(() => {
    const copy = [...salons];

    if (sortBy === "Highest Rating") {
      return copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    if (sortBy === "Most Reviews") {
      return copy.sort((a, b) => (b.reviewsCount ?? 0) - (a.reviewsCount ?? 0));
    }

    if (sortBy === "Name A-Z") {
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    }

    return copy;
  }, [salons, sortBy]);

  const ratedSalons = salons.filter((salon) => salon.rating !== null);

  const averageRating =
    ratedSalons.length > 0
      ? (
          ratedSalons.reduce((sum, salon) => sum + (salon.rating ?? 0), 0) /
          ratedSalons.length
        ).toFixed(1)
      : "0";

  const districtsCovered = new Set(salons.map((salon) => salon.district)).size;

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navInner}>
            <h1 className={styles.navTitle}>Warsaw Beauty Salon Explorer</h1>
          </div>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h2 className={styles.heroTitle}>Find beauty salons in Warsaw</h2>
            <p className={styles.heroText}>
              Browse real salon data by district, service type, and rating
            </p>

            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search by name, address, or service..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mainContainer}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-2xl font-semibold text-gray-900">
              {salons.length}
            </p>
            <p className="text-sm text-gray-500">Total salons</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-2xl font-semibold text-gray-900">
              {averageRating}
            </p>
            <p className="text-sm text-gray-500">Average rating</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-2xl font-semibold text-gray-900">
              {districtsCovered}
            </p>
            <p className="text-sm text-gray-500">Districts covered</p>
          </div>
        </div>

        <div className={styles.filtersBox}>
          <div className={styles.filtersRow}>
            <div className={styles.filtersGroup}>
              <div className={styles.filterItem}>
                <label className={styles.label}>District</label>
                <select
                  className={styles.select}
                  value={selectedDistrict}
                  onChange={(event) => setSelectedDistrict(event.target.value)}
                >
                  {DISTRICTS.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterItem}>
                <label className={styles.label}>Category</label>
                <select
                  className={styles.select}
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.sortItem}>
              <label className={styles.label}>Sort by</label>
              <select
                className={styles.select}
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading && (
          <div className={styles.grid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div className={styles.loadingCard} key={index}>
                <div className={styles.loadingTitle} />
                <div className={styles.loadingSubtitle} />
                <div className={styles.loadingLines}>
                  <div className={styles.loadingLineFull} />
                  <div className={styles.loadingLineShort} />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className={styles.resultsCount}>
              <p className={styles.resultsText}>
                Found{" "}
                <span className={styles.resultsNumber}>
                  {sortedSalons.length}
                </span>{" "}
                salons
              </p>
            </div>

            {sortedSalons.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIconBox}>
                  <Scissors className={styles.emptyIcon} />
                </div>
                <h3 className={styles.emptyTitle}>No salons found</h3>
                <p className={styles.emptyText}>
                  Try changing your search or filter options.
                </p>
              </div>
            ) : (
              <div className={styles.grid}>
                {sortedSalons.map((salon) => (
                  <article className={styles.salonCard} key={salon.id}>
                    <div className={styles.salonCardContent}>
                      <div className={styles.salonHeader}>
                        <div className={styles.salonHeaderContent}>
                          <h3 className={styles.salonName}>{salon.name}</h3>

                          <div className={styles.salonMeta}>
                            <span className={styles.categoryBadge}>
                              {salon.category}
                            </span>
                            <span className={styles.dot}>•</span>
                            <span>{salon.priceRange ?? "Price not available"}</span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.ratingRow}>
                        <Star className={styles.starIcon} />
                        <span className={styles.ratingText}>
                          {salon.rating ?? "N/A"}
                        </span>
                        <span className={styles.reviewsText}>
                          {salon.reviewsCount !== null
                            ? `(${salon.reviewsCount} reviews)`
                            : "(No reviews)"}
                        </span>
                      </div>

                      <div className={styles.addressBox}>
                        <div className={styles.addressRow}>
                          <MapPin className={styles.mapIcon} />
                          <div>
                            <p>{salon.district}</p>
                            <p className={styles.addressText}>
                              {salon.address}
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        className={styles.detailsButton}
                        onClick={() => onViewDetails(salon.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}