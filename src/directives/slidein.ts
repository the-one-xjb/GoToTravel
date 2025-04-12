const OFFSET = 100;
const DURATION = 500;
const map = new WeakMap();

const ob = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const animation = map.get(entry.target);
      if (animation) {
        animation.play();
        ob.unobserve(entry.target);
      }
    }
  }
});

export default {
  mounted(el: HTMLElement) {
    const img = el.querySelector('img');
    if (img) {
      img.addEventListener('load', () => {
        const animation = el.animate(
          [
            { transform: `translateY(${OFFSET}px)`, opacity: 0 },
            { transform: `translateY(0px)`, opacity: 1 },
          ],
          {
            duration: DURATION,
            easing: 'ease-in-out',
            fill: 'forwards',
          }
        );
        animation.pause();
        ob.observe(el);
        map.set(el, animation);
      });
    }
  },
  unmounted(el: any) {
    ob.unobserve(el);
  },
};

