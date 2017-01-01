class sideNavigation {

    constructor() {
        this.navigationContainer = document.querySelector('aside.side-navigation');

        this._setup();
        this._bindings();
        this._functionBindings();
    }
    _setup() {
        this.isClosed = false;
        this.touchingNavigation = false;
    }
    _bindings() {
        this.navigationContainer.addEventListener('touchstart', this._initiateTouch);
        this.navigationContainer.addEventListener('touchmove', this._trackTouch);
        this.navigationContainer.addEventListener('touchend', this._endTouch);
    }
    _functionBindings() {
        this._initiateTouch = this._initiateTouch.bind(this);
        this._trackTouch = this._trackTouch.bind(this);
        this._endTouch = this._endTouch.bind(this);
    }

    _initiateTouch(event) {
        if(this.isClosed) return;

        this.touchingNavigation = true;
        this.touchStartPositionX = 0;
        this.touchAnimatePositionX = this.touchStartPositionX;

        //requestAnimationFrame(this.updateMenuPosition);
    }
    _trackTouch(event) {
        if(!this.touchingNavigation) return;

        this.touchAnimatePositionX = event.touches[0].pageX;
        console.info(this.touchAnimatePositionX)
    }
    _endTouch(event) {
        if(!this.touchingNavigation) return;

        this.touchingNavigation = false;
        let dragRatio = Math.min(0, this.touchAnimatePositionX - this.touchStartPositionX);

        if (dragRatio < 0) {
            this.hideNavigation();
        }
    }

    updateMenuPosition() {
        if(!this.touchingNavigation) return;

        requestAnimationFrame(this._trackTouch);

        let dragRatio = Math.min(0, this.touchAnimatePositionX - this.touchStartPositionX);
        this.navigationContainer.style.transform = `translateX(${dragRatio}px)`;
    }
    hideNavigation() {
        this.isClosed = true;
        this.propagateState();
    }
    openNavigation () {
        this.isClosed = false;
        this.propagateState();
    }
    propagateState() {
        if(this.isClosed) {
            navigationContainer.classList.add('navigation-closed');
        } else {
            navigationContainer.classList.remove('navigation-closed');
        }
    }
}

let sidenav = new sideNavigation();