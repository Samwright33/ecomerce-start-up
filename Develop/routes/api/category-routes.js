const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  await Category.findAll({
    attributes: ["id", "category_name"],
    include: [{
      model: Product,
      attributes: [
        "id", "product_name", "price", "stock", "category_id"
      ]
      }],
    })
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.json(err);
    })
});

  // finding one category by its id
router.get('/:id', async (req, res) => {
  await Category.findByPk(req.parms.id, {
    attributes: ["id", "category_name"],
    include: [{
      model: Product,
      attributes: [
        "id", "product_name", "price", "stock", "category_id"
      ]
  }],
})
  .then((categories) => {
    res.json(categories);
  })
});

router.post('/', async (req, res) => {
  // create a new category
await Category.create(req.body)
  .then((newCategory) => res.status(200).json(newCategory))
  .catch((err) => {
    res.json(err);
  })
};

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
  .then(cat => Category.findByPk(req.params.id))
  .then((updatedCategory) => res.status(200).json(updatedCategory))
  .catch((err) => {
    res.json(err);
    })
})


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  await Category.destroy({
		where: {
			id: req.params.id,
		},
	})
	.catch((err) => {
		res.json(err)
	});
});

module.exports = router;
