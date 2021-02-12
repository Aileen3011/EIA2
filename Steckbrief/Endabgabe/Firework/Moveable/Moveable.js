"use strict";
var Firework;
(function (Firework) {
    class Moveable {
        constructor(_position) {
            this.expendable = false;
            if (_position)
                this.position = _position.copy();
            else
                this.position = new Firework.Vector(0, 0);
            this.velocity = new Firework.Vector(0, 0);
        }
        move(_timeslice) {
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
        }
    }
    Firework.Moveable = Moveable;
})(Firework || (Firework = {}));
//# sourceMappingURL=Moveable.js.map