const imgNotFoundUrl = '/not-found.png'

function getPreferredImageSize(preferredSizes, sizes) {
  const arrPrefSizes = Array.isArray(preferredSizes) ? preferredSizes : [preferredSizes];

  for (let size of arrPrefSizes) {
    const sz = sizes.find(item => item === size);

    if (sz) {
      return sz;
    }
  }

  return 'original';
}

function getImageUrl(sizes, preferredSizes, base, path) {
  const size = getPreferredImageSize(preferredSizes, sizes);

  return `${base}${size}${path}`;
}

export function getPosterUrl(config, path, preferredSizes = "original") {
  if (!config || !config.images || !config.images.poster_sizes || !config.images.base_url || !path) {
    return null;
  }

  return getImageUrl(config.images.poster_sizes, preferredSizes, config.images.base_url, path);
}

export function getBackdropUrl(config, path, preferredSizes = "original") {
  if (!config || !config.images || !config.images.backdrop_sizes || !config.images.base_url || !path) {
    return null;
  }

  return getImageUrl(config.images.backdrop_sizes, preferredSizes, config.images.base_url, path);
}