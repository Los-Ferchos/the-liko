import PageButton from "../../buttons/PageButton";
import useWindowSize from "../../hooks/useWindowSize";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const { width, height } = useWindowSize();

    const maxButtons = {
      large: 8,
      medium: 6,
      small: 4
    };
  
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
  }

export default Pagination;
  