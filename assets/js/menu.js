class sideNavigation {

    constructor() {

        this.state = {
            isClosed : false,
            hidesContent: true
        }

        this._bindings();
        this._functionBindings();
    }

    _bindings() {
        this.navigationContainer = document.querySelector('.side-navigation');
        this.navigationContainer.addEventListener('mouseDown', this._initiateTouch);
        this.navigationContainer.addEventListener('dragstart', this._trackTouch);
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
        this.tochStartPositionX =+ drag;
    }

}

let sidenav = new sideNavigation();