export default function calculateAspectRatioFit(img) {
    const parentWidth = img.parentNode.clientWidth;
    const parentHeight = img.parentNode.clientHeight;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    if (imgWidth > imgHeight) {
        img.width = parentWidth;
    } else {
        img.height = parentHeight;
    }
}