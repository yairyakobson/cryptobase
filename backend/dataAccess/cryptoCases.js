import CustomCrypto from "../models/CustomCrypto.js"

export const createCrypto = async(cryptoData) =>{
  return await CustomCrypto.create(cryptoData);
}

export const findCrypto = async(query) =>{
  return await CustomCrypto.findOne(query);
}

export const readSingleCrypto = async(query) =>{
  return await CustomCrypto.findOne(query);
}

export const readCryptos = async() =>{
  return await CustomCrypto.find();
}

export const deleteCrypto = async(query) =>{
  return await CustomCrypto.findOneAndDelete(query);
}