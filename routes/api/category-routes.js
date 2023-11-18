const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({include: Product})
    .then((dbCategories) => {
      res.json(dbCategories);
    })
    .catch((err) => {
      res.status(500).json({
        msg: "oh no an error",
        err,
      });
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id, {include: Product})
    .then((dbCategory) => {
      res.json(dbCategory);
    })
    .catch((err) => {
      res.status(500).json({
        msg: 'oh no an error',
        err,
      });
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.status(500).json({
        msg: "oh no an error!",
        err,
      });
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name:req.body.category_name
    },
    {
      where: {
        id:req.params.id
      }
    }
  ).then((upCategory) => {
    if(upCategory) {
      res.json(upCategory);
    } else {
      res.status(404).json({msg: "no such category to delete"});
    }
  })
  .catch((err) => {
    res.status(500).json({
      msg: 'oh no an error!',
      err,
    });
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
        id:req.params.id
    }
}).then((delCategory) => {
    console.log('delCategory: ',delCategory)
    if (delCategory) {
      res.json(delCategory);
    } else {
      res.status(404).json({ msg: "no such category to delete" });
    }
  })
  .catch((err) => {
    res.status(500).json({
      msg: "oh no an error!",
      err,
    });
  });
});

module.exports = router;
