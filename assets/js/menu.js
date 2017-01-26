class sideNavigation {

    constructor() {
        this.navigationContainer = document.querySelector('aside.side-navigation');

        this._setup();
        this._functionBindings();
        this._bindings();
        console.dir(this);
    }
    _setup() {
        this.state = {
            isClosed : false,
            touchingNavigation : false
        }
        this.touch = {
            startPositionX : 0,
            animatePositionX : 0
        }
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
        this.touch.startPositionX = event.touches[0].pageX;
    }
    _trackTouch(event) {
        if(!this.state.touchingNavigation) return;

        this.touch.animatePositionX = event.touches[0].pageX;
        const animateX = this.touch.animatePositionX - this.touch.startPositionX;
        this.navigationContainer.style.transform = `translate ${animateX}`;
    }
    _endTouch(event) {
        const toggleLimit = 60;

        if(!this.state.touchingNavigation) return;

        this.state.touchingNavigation = false;
        let dragDirection = Math.min(0, this.touch.startPositionX - this.touch.animatePositionX);

        if(dragDirection < toggleLimit) {
            this.hideNavigation();
        }
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
        if(this.state.isClosed) {
            this.navigationContainer.classList.add('navigation-closed');
        } else {
            this.navigationContainer.classList.remove('navigation-closed');
        }
    }
    timeout() {
        this.lastInteraction = date.now();
    }
}

let sidenav = new sideNavigation();