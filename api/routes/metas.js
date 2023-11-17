const { body, validationResult } = require('express-validator');
var express = require('express');
const { pedirTodas, pedir, crear, actualizar, borrar } = require('../db/pedidos');
var router = express.Router();


let metas =[
  {
    "id": "1",
    "detalles": "Correr por 30 minutos",
    "periodo": "día",
    "eventos": 1,
    "icono": "🏃‍♂️",
    "meta": 365,
    "plazo": "2030-01-01",
    "completado": 5
  },
  {
    "id": "2",
    "detalles": "Leer libros",
    "periodo": "año",
    "eventos": 6,
    "icono": "📚",
    "meta": 12,
    "plazo": "2030-01-01",
    "completado": 0
  },
  {
    "id": "3",
    "detalles": "Viajar a parques nacionales",
    "periodo": "mes",
    "eventos": 1,
    "icono": "✈️",
    "meta": 60,
    "plazo": "2030-01-01",
    "completado": 40
  }
];

/* GET lista de metas */
router.get('/', function(req, res, next) {
  pedirTodas('metas',(err,metas)=>{
      if(err){
         return next(err);
      }
      console.log(metas)
      res.send(metas);
  });
});

/* GET Meta con id */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  pedir('metas', id, (err, meta) => {
    if (err) {
      return next(err);
    }
    if (!meta.length) {
      return res.sendStatus(404);
    }
    res.send(meta[0]);
  });
});

/* POST Crear meta */
router.post('/',
  body('detalles').isLength({ min: 5 }),
  body('periodo').not().isEmpty(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const nuevaMeta = req.body;
    crear('metas', nuevaMeta, (err, meta) => {
      if (err) {
        return next(err);
      }
      res.send(meta);
    });
  });

/* PUT Actualizar meta */
router.put('/:id',
  body('detalles').isLength({ min: 5 }),
  body('periodo').not().isEmpty(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    const id = req.params.id;
    if (body.id !== +id) {
      return res.sendStatus(409);
    }
    pedir('metas', id, (err, meta) => {
      if (err) {
        return next(err);
      }
      if (!meta.length) {
        return res.sendStatus(404);
      }
      actualizar('metas', id, body, (err, actualizada) => {
        if (err) {
          return next(err);
        }
        res.send(actualizada);
      });
    });
  });

/* DELETE Borrar meta */
router.delete('/:id', function (req, res, next) {
  const id = req.params.id;
  pedir('metas', id, (err, meta) => {
    if (err) {
      return next(err);
    }
    if (!meta.length) {
      return res.sendStatus(404);
    }
    borrar('metas', id, (err) => {
      if (err) {
        return next(err);
      }
      res.sendStatus(204);
    });
  });
});

module.exports = router;
