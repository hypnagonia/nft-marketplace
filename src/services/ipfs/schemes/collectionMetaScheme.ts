interface IMeta {
  name: String,
  description: String,
  image: String,
  externalLink?: String
}

export const createCollectionMeta = (meta: IMeta) => {
  return {
    name: meta.name,
    description: meta.description,
    image: meta.image,
    external_link: meta.externalLink || ''
  }
}