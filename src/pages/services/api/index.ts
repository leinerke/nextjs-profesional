const API = process.env.NEXT_PUBLICK_API_URL;
const VERSION = process.env.NEXT_PUBLICK_API_VERSION;

const endPoints = {
  products: {
    getProducts: `${API}/api/${VERSION}/products/`,
    postProducts: `${API}/api/${VERSION}/products/`,
    getProduct: (id: number) => `${API}/api/${VERSION}/products/${id}`,
    putProducts: (id: number) => `${API}/api/${VERSION}/products/${id}`,
    deleteProducts: (id: number) => `${API}/api/${VERSION}/products/${id}`,
  },
  users: {
    getUsers: `${API}/api/${VERSION}/users`,
    postUsers: `${API}/api/${VERSION}/users`,
  },
  auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    profile: `${API}/api/${VERSION}/auth/profile`,
  },
  categories: {
    getCategories: `${API}/api/${VERSION}/categories`,
    postCategories: `${API}/api/${VERSION}/categories`,
    getCategoriesProduct: (id: number) => `${API}/api/${VERSION}/categories/${id}/products`,
    putCategories: (id: number) => `${API}/api/${VERSION}/categories/${id}`,
  },
  files: {
    postFiles: `${API}/api/${VERSION}/files/upload`,
    getFiles: (fileName: string) => `${API}/api/${VERSION}/${fileName}`,
  },
};

export default endPoints;
