interface IMeta {
  name: String,
  description: String,
  image: String,
  externalLink?: String,
  symbol?: String,
}

export const createCollectionMeta = (meta: IMeta) => {
  return {
    symbol: meta.symbol,
    name: meta.name,
    description: meta.description,
    image: meta.image,
    external_link: meta.externalLink || ''
  }
}