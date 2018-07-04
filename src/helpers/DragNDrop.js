class DragNDrop {

    constructor(elementId)
    {
        this.el = document.getElementById(elementId);

        if (!this.el) {
            return;
        }

        this.el.onmousedown = (e) => {
            this.el.style.zIndex = 1000;

            document.onmousemove = (e) => {
                this.moveAt(e);
            };

            this.el.onmouseup = () => {
                document.onmousemove = null;
                this.el.onmouseup = null;
            }
        };

        this.el.ondragstart = () => {
            return false;
        };

    }

    moveAt(e){
        this.el.style.left = e.pageX - this.el.offsetWidth / 2 + 'px';
        this.el.style.top = e.pageY - this.el.offsetHeight / 2 + 'px';
    }

}

export default DragNDrop;