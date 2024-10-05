document.addEventListener("DOMContentLoaded", function() {
    var select = function(s) {
        return document.querySelector(s);
    },
    dragger = select('#dragger'),
    display = select('#display'),
    downText = select('.downText'),
    upText = select('.upText'),
    maxDrag = 300;

    // Initial setup for GSAP
    TweenMax.set('svg', { visibility: 'visible' });
    TweenMax.set(upText, { alpha: 0 });
    
    // Timeline for the balloon animation
    var tl = new TimelineMax({ paused: true });
    tl.addLabel("blobUp")
        .to(display, 1, { attr: { cy: '-=40', r: 30 } })
        .to(dragger, 1, { attr: { r: 8 } }, '-=1')
        .set(dragger, { strokeWidth: 4 }, '-=1')
        .to(downText, 1, { alpha: 0 }, '-=1')
        .to(upText, 1, { alpha: 1 }, '-=1')
        .addPause()
        .addLabel("blobDown")
        .to(display, 1, { attr: { cy: 299.5, r: 0 }, ease: Expo.easeOut })
        .to(dragger, 1, { attr: { r: 15 } }, '-=1')
        .set(dragger, { strokeWidth: 0 }, '-=1')
        .to(downText, 1, { alpha: 1 }, '-=1')
        .to(upText, 0.2, { alpha: 0, attr: { y: '+=5' } }, '-=1');

    // Draggable setup
    Draggable.create(dragger, {
        type: 'x',
        cursor: 'pointer',
        throwProps: true,
        bounds: { minX: 0, maxX: maxDrag },
        onPress: function() {
            tl.play('blobUp');
        },
        onRelease: function() {
            tl.play('blobDown');
        },
        onDrag: dragUpdate,
        onThrowUpdate: dragUpdate
    });

    // Function to update slider and display values
    function dragUpdate() {
        var dragVal = Math.round((this.x / maxDrag) * 100);
        downText.textContent = dragVal;
        upText.textContent = dragVal;

        // Move the balloon display with the dragger
        TweenMax.set(display, {
            x: this.x
        });

        // Update text positions
        TweenMax.set(downText, {
            x: this.x + 146,
            y: 304
        });
        TweenMax.set(upText, {
            x: this.x + 145,
            y: 266
        });
    }

    // Initial position for the dragger
    TweenMax.to(dragger, 1, {
        x: 0,
        onUpdate: dragUpdate,
        ease: Power1.easeInOut
    });
});
