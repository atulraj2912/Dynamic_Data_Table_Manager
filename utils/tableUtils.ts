import { TableRow, SortState } from '@/types';

export const sortData = (data: TableRow[], sortState: SortState): TableRow[] => {
  if (!sortState.column || !sortState.direction) {
    return data;
  }

  return [...data].sort((a, b) => {
    const aValue = a[sortState.column!];
    const bValue = b[sortState.column!];

    if (aValue === bValue) return 0;

    let comparison = 0;
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    } else {
      comparison = String(aValue).localeCompare(String(bValue));
    }

    return sortState.direction === 'asc' ? comparison : -comparison;
  });
};

export const filterData = (data: TableRow[], searchQuery: string): TableRow[] => {
  if (!searchQuery.trim()) {
    return data;
  }

  const query = searchQuery.toLowerCase();
  return data.filter(row => {
    return Object.values(row).some(value => 
      String(value).toLowerCase().includes(query)
    );
  });
};

export const paginateData = (data: TableRow[], page: number, rowsPerPage: number): TableRow[] => {
  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  return data.slice(start, end);
};
