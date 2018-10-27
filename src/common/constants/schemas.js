import { schema } from 'normalizr';

const detailsSchema = new schema.Entity('details', {
  idAttribute: 'id',
});

const productsSchema = new schema.Entity(
  'products',
  {
    detail: detailsSchema,
  },
  {
    idAttribute: 'id',
  },
);

const getAllProductInfoSchema = new schema.Entity(
  'getAllProductInfo',
  {},
  {
    idAttribute: 'brandId',
  },
);

const productDetailSchema = new schema.Entity('product_detail', {
  idAttribute: 'id',
});

const propertiesDetailSchema = new schema.Entity('properties_detail', {
  idAttribute: 'id',
});

const Schemas = {
  PRODUCTS_ARRAY: [productsSchema],
  GETALLPRODUCTINFO_ARRAY: [getAllProductInfoSchema],
  PRODUCTDETAIL: {
    product_detail: [productDetailSchema],
    properties_detail: [propertiesDetailSchema],
  },
};

export default Schemas;
