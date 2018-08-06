export function hasValidDimensions(height, width) {
    return Boolean(height && width);
}

export function isLowResolution(image) {
    return image && image.resolution_dpi < 300;
}