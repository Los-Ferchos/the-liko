import PageButton from "../../buttons/PageButton";
import useWindowSize from "../../hooks/useWindowSize";

/**
 * Pagination component displays a dynamic number of page buttons based on the total pages and screen size.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.totalPages - The total number of pages.
 * @param {number} props.currentPage - The current active page.
 * @param {Function} props.handlePageChange - The function to handle page changes.
 * 
 * @returns {JSX.Element} Rendered Pagination component.
 */
const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  const { width } = useWindowSize(); 

  const maxButtons = {
    large: 8,
    medium: 6,
    small: 4
  };

  /**
   * Calculates and returns the visible pages based on the total pages and screen size.
   *
   * @function
   * @returns {Array} Array of visible page numbers and ellipses.
   */
  const getVisiblePages = () => {
    const screenSize = width > 768 ? 'large' : width > 480 ? 'medium' : 'small';
    const maxVisiblePages = maxButtons[screenSize];

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const firstPages = Array.from({ length: Math.floor(maxVisiblePages / 2) }, (_, index) => index + 1);
    const lastPages = Array.from({ length: Math.floor(maxVisiblePages / 2) }, (_, index) => totalPages - index).reverse();

    return [...firstPages, '...', ...lastPages];
  };

  return (
    <div>
      {getVisiblePages().map((page, index) =>
        page === '...' ? (
          <span style={{ marginRight: 5, marginLeft: 5 }} key={index}>...</span>
        ) : (
          <PageButton
            key={index}
            isCurrent={currentPage === page}
            page={page}
            onClick={() => handlePageChange(page)}
          />
        )
      )}
    </div>
  );
};

export default Pagination;
