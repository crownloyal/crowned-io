class sideNavigation {

    constructor() {

        this.state = {
            isClosed : false
        }

        this.navigationContainer = document.querySelector('.side-navigation');

        this._bindings();
        this._functionBindings();
    }

    _bindings() {
        this.navigationContainer.addEventListener('mouseDown', this._initiateTouch);
        this.navigationContainer.addEventListener('dragStart', this._trackTouch);
    }
    _functionBindings() {
        this._initiateTouch = this._initiateTouch.bind(this);
        this._trackTouch = this._trackTouch.bind(this);
    }

    _initiateTouch(event) {
        this.tochStartPositionX = 0;
    }
    _trackTouch(event) {
        let drag = event.DragEvent.screenX;
        this.tochStartPositionX += drag;
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
            navigationContainer.className = currentClasses + navigation-closed;
        } else {
            navigationContainer.className = currentClasses - navigation-closed;
        }
    }
}

let sidenav = new sideNavigation();