const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The '/api/tags' endpoint

router.get('/', async (req, res) => {
  await Tag.findAll ({
    attributes: ["id", "tag_name"],
    include: [{
      model: Product,
      attributes: [
        "id", "product_name", "price", "stock", "category_id"
      ],
      through: "productTag",
    }],
  })
  .then((tagData) => {
    res.json(tagData);
  })
  .catch((err) => {
    res.json(err);
  })
});

  // find a tag by its id
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [{
      model: Product,
      attributes: [
        "id", "product_name", "price", "stock", "category_id"
      ],
      through: "productTag",
    }],
  })
.then((newTag) => {
  res.json(newTag);
})
  .catch((err) => {
    res.json(err);
  })
});

 // create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((Tag) => {
    res,json(Tag);
  })
  .catch((err) => {
    res.json(err);
  })
});

 // update a tag's name by its id
router.put('/:id', (req, res) => {
  Tag.update ({
		where: {
			id: req.params.id,
		},
	})
  .then((Tag) => {
    res.json(Tag);
  })

  .catch((err) => {
    res.json(err);
  })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its id
  await Tag.destroy({
		where: {
			id: req.params.id,
		},
	})
	.catch((err) => {
		res.json(err)
	});
});

module.exports = router;
