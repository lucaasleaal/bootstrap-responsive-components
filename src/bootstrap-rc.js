//modified from https://philipwalton.com/articles/responsive-components-a-solution-to-the-container-queries-problem/
if ('ResizeObserver' in self) {
  // Create a single ResizeObserver instance to handle all
  // container elements. The instance is created with a callback,
  // which is invoked as soon as an element is observed as well
  // as any time that element's size changes.
  var ro = new ResizeObserver(function(entries) {
    // Default breakpoints that should apply to all observed
    // elements that don't define their own custom breakpoints.
    var defaultBreakpoints = {
      LG: 1200,
      MD: 992,
      SM: 768,
      XS: 1
    };

    entries.forEach(function(entry) {
      // If breakpoints are defined on the observed element,
      // use them. Otherwise use the defaults.
      var breakpoints = entry.target.dataset.breakpoints ?
          JSON.parse(entry.target.dataset.breakpoints) :
          defaultBreakpoints;

      // Update the matching breakpoints on the observed element.
      Object.keys(breakpoints).forEach(function(breakpoint) {
        console.log('remove'+ breakpoint);
        entry.target.classList.remove(breakpoint);
      });
      Object.keys(breakpoints).every(function(breakpoint) {
        var minWidth = breakpoints[breakpoint];
        if (entry.contentRect.width >= minWidth) {
          console.log('add'+ breakpoint);
          entry.target.classList.add(breakpoint);
          return false;
        }
        return true;
      });
    });
  });

  // Find all elements with the `data-observe-resizes` attribute
  // and start observing them.
  var elements = document.querySelectorAll('[data-observe-resizes]');
  for (var element, i = 0; element = elements[i]; i++) {
    ro.observe(element);
  }
}