const Category = require("../../models/admin/Category");
const CategoryDescription = require("../../models/admin/CategoryDescription");
const Product = require("../../models/admin/Product");
const ProductDescription = require("../../models/admin/ProductDescription");

// Category has many CategoryDescription 
const categoryDescriptionAssoc = Category.hasMany(CategoryDescription, {
    foreignKey: {
      name: "category_id"
    },
    as: "category_description_assoc",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })

const productDescriptionAssoc = Product.hasMany(ProductDescription,{
  foreignKey: {
    name: "product_id"
  },
  as: "product_description_assoc",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

  
module.exports = {categoryDescriptionAssoc, productDescriptionAssoc}