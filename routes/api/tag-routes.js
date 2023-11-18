const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({include: [Product]})
    .then((dbTags) => {
      res.json(dbTags);
    })
    .catch((err) => {
      res.status(500).json({
        msg: "oh no an error",
        err,
      });
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, {include: Product})
    .then((dbTag) => {
      res.json(dbTag);
    })
    .catch((err) => {
      res.status(500).json({
        msg: "oh no an error",
        err,
      });
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.status(500).json({
        msg: "oh no an error!",
        err,
      });
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name:req.body.tag_name
    },
    {
      where: {
        id:req.params.id
      }
    }
  ).then((upTag) => {
    if(upTag) {
      res.json(upTag);
    } else {
      res.status(404).json({msg: "no such tag to delete"});
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
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
        id:req.params.id
    }
  }).then((delTag) => {
    console.log('delTag: ',delTag)
    if (delTag) {
      res.json(delTag);
    } else {
      res.status(404).json({ msg: "no such tag to delete" });
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
