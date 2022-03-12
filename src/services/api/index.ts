const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    profile: `${API}/api/${VERSION}/auth/profile`,
  },
  products: {
    getProduct: (id: number) => `${API}/api/${VERSION}/products/${id}/`,
    getProducts: (limit: number, offset: number) => `${API}/api/${VERSION}/products?limit=${limit}&offset=${offset}`,
    addProducts: `${API}/api/${VERSION}/products`,
    updateProducts: (id: number) => `${API}/api/${VERSION}/products/${id}/`,
    deleteProducts: (id: number) => `${API}/api/${VERSION}/products/${id}/`,
  },
  categories: {
    getCategoriesList: `${API}/api/${VERSION}/categories/`,
    addCategory: `${API}/api/${VERSION}/categories/`,
    getCategoryItems: (id: number) => `${API}/api/${VERSION}/categories/${id}/products/`,
    updateCategory: (id: number) => `${API}/api/${VERSION}/categories/${id}/`,
  },
  files: {
    addImage: `${API}/api/${VERSION}/files/upload/`,
  },
};

export default endPoints;
