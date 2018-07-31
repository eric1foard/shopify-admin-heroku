export function hasValidDimensions(dim) {
    return dim && dim.width && dim.height &&
    typeof dim.width === 'number' &&
    typeof dim.height === 'number' &&
    dim.width > 0 && dim.height > 0;
}

export function isLowResolution(image) {
    return image && image.resolution_dpi < 300;
}