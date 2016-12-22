class sideNavigation {

    constructor() {

        this.state = {
            isClosed : false
        }

        this.navigationContainer = document.querySelector('aside.side-navigation');

        this._bindings();
        this._functionBindings();
    }

    _bindings() {
        this.navigationContainer = this.navigationContainer.addEventListener('mouseDown', this._initiateTouch);
        //this.navigationContainer = this.navigationContainer.addEventListener('dragstart', this._trackTouch);
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
    hideNavigation() {
        console.info(navigationContainer);
        this.state.isClosed = true;
        //navigationContainer.className += '';
    }

}

let sidenav = new sideNavigation();