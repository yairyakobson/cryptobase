import Joi from "joi";

const joiCustomCryptoSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),

  logo: Joi.alternatives().try(
    Joi.string().pattern(/^data:image\/\w+;base64,/).allow(null),
    Joi.object({
      public_id: Joi.string().allow(null),
      url: Joi.string().uri().allow(null),
      signed_url: Joi.string().uri().allow(null),
    }).optional()
  ).optional(),

  symbol: Joi.string().required(),
  description: Joi.string().required(),
});

export default joiCustomCryptoSchema;