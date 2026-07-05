import vendorsData from "../mocks/vendors.json";

const VENDORS_KEY = "egrcp_vendors";

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const initializeVendors = () => {
  const vendors = localStorage.getItem(VENDORS_KEY);

  if (!vendors) {
    localStorage.setItem(
      VENDORS_KEY,
      JSON.stringify(vendorsData.vendors)
    );
  }
};

initializeVendors();

const vendorService = {
  async getAll() {
    await delay(500);

    return JSON.parse(
      localStorage.getItem(VENDORS_KEY)
    );
  },

  async getById(id) {
    await delay(300);

    const vendors = JSON.parse(
      localStorage.getItem(VENDORS_KEY)
    );

    const vendor = vendors.find(
      (v) => Number(v.id) === Number(id)
    );

    if (!vendor) {
      throw new Error("Vendor not found.");
    }

    return vendor;
  },

  async create(vendor) {
    await delay(500);

    const vendors = JSON.parse(
      localStorage.getItem(VENDORS_KEY)
    );

    const newVendor = {
      ...vendor,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    vendors.unshift(newVendor);

    localStorage.setItem(
      VENDORS_KEY,
      JSON.stringify(vendors)
    );

    return newVendor;
  },

  async update(id, updatedVendor) {
    await delay(500);

    const vendors = JSON.parse(
      localStorage.getItem(VENDORS_KEY)
    );

    const index = vendors.findIndex(
      (v) => Number(v.id) === Number(id)
    );

    if (index === -1) {
      throw new Error("Vendor not found.");
    }

    vendors[index] = {
      ...vendors[index],
      ...updatedVendor,
    };

    localStorage.setItem(
      VENDORS_KEY,
      JSON.stringify(vendors)
    );

    return vendors[index];
  },

  async delete(id) {
    await delay(400);

    const vendors = JSON.parse(
      localStorage.getItem(VENDORS_KEY)
    );

    const filtered = vendors.filter(
      (v) => Number(v.id) !== Number(id)
    );

    localStorage.setItem(
      VENDORS_KEY,
      JSON.stringify(filtered)
    );

    return true;
  },
};

export default vendorService;