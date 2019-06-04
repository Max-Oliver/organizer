export default class {

    constructor(notification) {
        this.notify = notification;
    }

    success(title, message) {
        this.notify({
            group: 'feedback',
            duration: 4000,
            type: "success",
            title: title,
            text: message
        });
    }

    warning(title, message) {
        this.notify({
            group: 'feedback',
            duration: 4000,
            type: "warning",
            title: title,
            text: message
        });
    }

    error(title, message) {
        this.notify({
            group: 'feedback',
            duration: 4000,
            type: "error",
            title: title,
            text: message
        });
    }

    info(title, message) {
        this.notify({
            group: 'feedback',
            duration: 5000,
            type: "info",
            title: title,
            text: message
        });
    }

    handler(error) {
        if (error && error.data) {
            if (error.status == 400) {
                if (error.data.message) {
                    this.warning("Algo salio mal :( ", error.data.message)
                } else {
                    this.error("Algo salio mal :( ", error.data)
                }
            } else if (error.status == 500) {
                this.error("Ooops algo salio mal :(", "Por favor contacte con soporte")
            } else if (error.status == "validation") {
                this.warning("Oooops ", error.data.error);
            }
        } else {
            this.error("Ooops algo salio mal :(")
        }
        console.error(error);
    }
}