class sideNavigation {

    constructor() {
        this.navigationContainer = document.querySelector('aside.side-navigation');

        this.state = {
            isClosed : false,
            touchingNavigation : false
        }

        this._bindings();
        this._functionBindings();
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
        if(this.state.isClosed) return;

        this.state.touchingNavigation = true;
        this.tochStartPositionX = 0;
    }
    _trackTouch(event) {
        if(!this.state.touchingNavigation) return;

        let drag = event.DragEvent.screenX;
        this.tochStartPositionX += drag;
    }
    _endTouch(event) {
        if(!this.state.touchingNavigation) return;

        this.state.touchingNavigation = false;
    }

    hideNavigation() {
        this.state.isClosed = true;
        this.propagateState();
    }
    openNavigation () {
        this.state.isClosed = false;
        this.propagateState();
    }
    propagateState() {
        let currentClasses = navigationContainer.className.split(' ');

        if(this.state.isClosed) {
            navigationContainer.classList.add('navigation-closed');
        } else {
            navigationContainer.classList.remove('navigation-closed');
        }
    }
}

let sidenav = new sideNavigation();