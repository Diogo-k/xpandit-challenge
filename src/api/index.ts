import axios from "axios";

interface Pagination {
  page: any;
  size: any;
}

// interface Filters {
//   start: string;
//   end: string;
// }

type Options = {
  pagination: Pagination;
  filters: any;
};

export const getWithFilters = ({ pagination, filters }: Options) => {
  let filterString = "?";

  if (filters) {
    for (let k in filters) {
      if (
        typeof filters[k] !== "undefined" &&
        filters[k] !== null &&
        filters[k] !== ""
      )
        filterString += "".concat(k, "=").concat(filters[k], "&");
    }
  }
  if (pagination)
    filterString += "size="
      .concat(pagination.size, "&page=")
      .concat(pagination.page, "");

  return axios
    .get(
      `https://movie-challenge-api-xpand.azurewebsites.net/api/movies${filterString}`
    )
    .then((res) => res.data);
};
