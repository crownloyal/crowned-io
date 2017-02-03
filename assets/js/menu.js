class sideNavigation {

    constructor() {
        this.navigationContainer = document.querySelector('aside.side-navigation');

        this._setup();
        this._functionBindings();
        this._bindings();
    }
    _setup() {
        this.state = {
            isClosed : false,
            touchingNavigation : false,
            lastInteraction : 0
        }
        this.touch = {
            startPositionX : 0,
            animatePositionX : 0,
            swipeLimit : -60,
            distanceX : () => { 
                return this.touch.animatePositionX - this.touch.startPositionX;
            },
            dragDirection : () => {
                if (this.touch.startPositionX > this.touch.animatePositionX) {
                    return "left";
                } else {
                    return "right";
                } 
            },

            timer : 0
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
        this.touch.animatePositionX = event.touches[0].pageX;

        if(!this.state.touchingNavigation || this.touch.dragDirection() === 'right') return;

        this.navigationContainer.style.transform = 'translateX(' + this.touch.distanceX() + 'px)';
        this.navigationContainer.style.opacity = 1 + this.touch.distanceX()*0.01;
    }
    _endTouch(event) {
        if(!this.state.touchingNavigation) { return; }

        if(this.touch.dragDirection() === 'left' && this.touch.swipeLimit > this.touch.distanceX()) {
            this.hideNavigation();
        } else {
            this.resetNavigation();
        }
        // reset touch timer & touch state
        this.state.touchingNavigation = false;
        this.touch.timer = 0;
        this.timeout();
    }

    hideNavigation() {
        this.state.isClosed = true;
        this.navigationContainer.style.opacity = 0;
        this.navigationContainer.style.transform = 'translateX(-102%)';
        this.propagateState();
    }
    openNavigation () {
        this.state.isClosed = false;
        this.propagateState();
    }
    resetNavigation() {
        this.openNavigation();
        this.navigationContainer.style.transform = 'translateX(0%)';
        this.navigationContainer.style.opacity = 1;
    }
    propagateState() {
        if(this.state.isClosed) {
            this.navigationContainer.classList.add('navigation-closed');
        } else {
            this.navigationContainer.classList.remove('navigation-closed');
        }
    }
    timeout() {
        this.state.lastInteraction = new Date();
    }
}

let sidenav = new sideNavigation();