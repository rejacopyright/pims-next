export default function loadBackgroudImages() {
  const backgroudImages = document.querySelectorAll('[data-background]')

  if (backgroudImages.length > 0) {
    backgroudImages.forEach((element: any) => {
      const image = element.dataset.background
      element.style.backgroundImage = `url('${image}')`
    })
  }
}
