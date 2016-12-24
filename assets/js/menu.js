class sideNavigation {

    constructor() {
        this.state = {
            isClosed : false,
            touchingNavigation: false
        }

        this.navigationContainer = document.querySelector('aside.side-navigation');

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
        this.state.touchingNavigation = true;
        this.tochStartPositionX = 0;
    }
    _trackTouch(event) {
        if(!this.state.touchingNavigation === true) return;

        console.log(event);
        let drag = event.DragEvent.screenX;
        this.tochStartPositionX += drag;
    }
    _endTouch(event) {
        this.
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