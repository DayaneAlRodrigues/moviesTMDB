import styled from "styled-components";
const PaginationContainer = styled.div `

`;

const PageButton = styled.button `

`;

const PageInfo = styled.span `

`;

const Pagination = ({currentPage, totalPages, onPageChange}) =>{
    const pagesToShow =[];
    const maxPages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage + 1 < maxPages) {
        startPage = Math.max(1, endPage - maxPages + 1);
    }

    for ( let i= startPage; i <= endPage; i++){
        pagesToShow.push(i);
    }

    return (
        <PaginationContainer>
            <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Anterior
            </PageButton>

            {startPage > 1 && (
                <>
                <PageButton onClick={() => onPageChange(1)}>1</PageButton>
                {startPage > 2 && <PageInfo>...</PageInfo>}
                </>
            )}

            {pagesToShow.map((page) => (
                <PageButton
                key={page}
                active={page === currentPage}
                onClick={() => onPageChange(page)}
                >
                {page}
                </PageButton>
            ))}

            {endPage < totalPages && (
                <>
                {endPage < totalPages - 1 && <PageInfo>...</PageInfo>}
                <PageButton onClick={() => onPageChange(totalPages)}>{totalPages}</PageButton>
                </>
            )}

            <PageButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Próxima
            </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;