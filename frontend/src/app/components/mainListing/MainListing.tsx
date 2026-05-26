import { useState, useMemo } from "react";
import { Search, Star, MapPin } from "lucide-react";
import {
  salonData,
  districts,
  categories,
  sortOptions,
  Salon,
} from "../../../data/salons";
import { mainListingStyles as s } from "./mainListing.styles";

type MainListingProps = {
  onSelectSalon: (salonId: string) => void;
};

export default function MainListing({ onSelectSalon }: MainListingProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("rating");
  const [isLoading] = useState(false);

  const filteredAndSortedSalons = useMemo(() => {
    let filtered = [...salonData];

    if (searchQuery) {
      filtered = filtered.filter(
        (salon) =>
          salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          salon.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          salon.services.some((service) =>
            service.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (selectedDistrict !== "All Districts") {
      filtered = filtered.filter((salon) => salon.district === selectedDistrict);
    }

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((salon) => salon.category === selectedCategory);
    }

    filtered.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    return filtered;
  }, [searchQuery, selectedDistrict, selectedCategory, sortBy]);

  const EmptyState = () => (
    <div className={s.emptyState}>
      <div className={s.emptyIconBox}>
        <Search className={s.emptyIcon} />
      </div>
      <h3 className={s.emptyTitle}>No salons found</h3>
      <p className={s.emptyText}>
        Try adjusting your filters or search terms to find what you're looking for.
      </p>
    </div>
  );

  const LoadingState = () => (
    <div className={s.grid}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className={s.loadingCard}>
          <div className={s.loadingTitle}></div>
          <div className={s.loadingSubtitle}></div>
          <div className={s.loadingLines}>
            <div className={s.loadingLineFull}></div>
            <div className={s.loadingLineShort}></div>
          </div>
        </div>
      ))}
    </div>
  );

  const SalonCard = ({ salon }: { salon: Salon }) => (
    <div className={s.salonCard}>
      <div className={s.salonCardContent}>
        <div className={s.salonHeader}>
          <div className={s.salonHeaderContent}>
            <h3 className={s.salonName}>{salon.name}</h3>

            <div className={s.salonMeta}>
              <span className={s.categoryBadge}>{salon.category}</span>
              <span className={s.dot}>•</span>
              <span>{salon.priceRange}</span>
            </div>
          </div>
        </div>

        <div className={s.ratingRow}>
          <Star className={s.starIcon} />
          <span className={s.ratingText}>{salon.rating.toFixed(1)}</span>
          <span className={s.reviewsText}>
            ({salon.reviewsCount} reviews)
          </span>
        </div>

        <div className={s.addressBox}>
          <div className={s.addressRow}>
            <MapPin className={s.mapIcon} />
            <div>
              <div>{salon.district}</div>
              <div className={s.addressText}>{salon.address}</div>
            </div>
          </div>
        </div>

        <div className={s.servicesBox}>
          {salon.services.slice(0, 3).map((service, idx) => (
            <span key={idx} className={s.serviceBadge}>
              {service}
            </span>
          ))}

          {salon.services.length > 3 && (
            <span className={s.moreServices}>
              +{salon.services.length - 3} more
            </span>
          )}
        </div>

        <button
          onClick={() => onSelectSalon(salon.id)}
          className={s.detailsButton}
        >
          View Details
        </button>
      </div>
    </div>
  );

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

      {/* Hero Section */}
      <div className={s.hero}>
        <div className={s.heroContainer}>
          <div className={s.heroContent}>
            <h1 className={s.heroTitle}>Find beauty salons in Warsaw</h1>
            <p className={s.heroText}>
              Browse real salon data by district, service type, and rating
            </p>

            <div className={s.searchWrapper}>
              <Search className={s.searchIcon} />
              <input
                type="text"
                placeholder="Search by name, address, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={s.searchInput}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={s.mainContainer}>
        {/* Filters and Sort */}
        <div className={s.filtersBox}>
          <div className={s.filtersRow}>
            <div className={s.filtersGroup}>
              <div className={s.filterItem}>
                <label className={s.label}>District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className={s.select}
                >
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div className={s.filterItem}>
                <label className={s.label}>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={s.select}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={s.sortItem}>
              <label className={s.label}>Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={s.select}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className={s.resultsCount}>
          <p className={s.resultsText}>
            Found{" "}
            <span className={s.resultsNumber}>
              {filteredAndSortedSalons.length}
            </span>{" "}
            {filteredAndSortedSalons.length === 1 ? "salon" : "salons"}
          </p>
        </div>

        {/* Salon Cards */}
        {isLoading ? (
          <LoadingState />
        ) : filteredAndSortedSalons.length === 0 ? (
          <EmptyState />
        ) : (
          <div className={s.grid}>
            {filteredAndSortedSalons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}