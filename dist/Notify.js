"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notify = void 0;
/**
 * The implementation of notifications.
 *
 * @see success
 * @see info
 * @see warning
 * @see error
 * @see remove
 * @see clear
 *
 * Notify:
 * [Github]{@link https://github.com/callisto2410/modstrap-notify}
 */
class Notify {
    /**
     * Default settings.
     *
     * @param properties
     */
    static set defaults(properties) {
        this._defaults = {
            ...this._defaults,
            ...properties,
        };
    }
    /**
     * The success notification.
     *
     * @param content Content of the notification. HTML is allowed.
     * @param properties Additional notification properties.
     */
    static success(content, properties = {}) {
        this.create({
            ...this._defaults,
            ...properties,
            content: content,
            type: "success",
        });
    }
    /**
     * The info notification.
     *
     * @param content Content of the notification. HTML is allowed.
     * @param properties Additional notification properties.
     */
    static info(content, properties = {}) {
        this.create({
            ...this._defaults,
            ...properties,
            content: content,
            type: "info",
        });
    }
    /**
     * The warning notification.
     *
     * @param content Content of the notification. HTML is allowed.
     * @param properties Additional notification properties.
     */
    static warning(content, properties = {}) {
        this.create({
            ...this._defaults,
            ...properties,
            content: content,
            type: "warning",
        });
    }
    /**
     * The error notification.
     *
     * @param content Content of the notification. HTML is allowed.
     * @param properties Additional notification properties.
     */
    static error(content, properties = {}) {
        this.create({
            ...this._defaults,
            ...properties,
            content: content,
            type: "error",
        });
    }
    /**
     * Deletes all notifications immediately.
     */
    static remove() {
        const containers = document.querySelectorAll("." + this.container);
        containers.forEach((container) => {
            container.remove();
        });
    }
    /**
     * Deletes all notifications using animation.
     */
    static clear() {
        const containers = document.querySelectorAll("." + this.container);
        containers.forEach((container) => {
            const elements = container.querySelectorAll("." + this.notify);
            elements.forEach((element) => {
                this.resetLifetime(element);
                this.toggleProgressbar(element);
                this.setLifetime(element, 0);
            });
        });
    }
    /**
     * Creates the new notification.
     *
     * @param properties
     * @private
     */
    static create(properties) {
        const container = this.createContainer(properties);
        const element = this.createNotify(properties);
        this.setLifetime(element);
        this.setListeners(element);
        element.notify.position.startsWith("top")
            ? container.prepend(element)
            : container.append(element);
        element.notify.onShow && element.notify.onShow();
    }
    /**
     * Sets the necessary event listeners.
     *
     * @param element
     * @private
     */
    static setListeners(element) {
        element.addEventListener("mouseover", () => {
            this.resetLifetime(element);
            this.toggleProgressbar(element);
        });
        element.addEventListener("mouseout", () => {
            this.setLifetime(element);
            this.toggleProgressbar(element, element.notify.duration);
        });
        element.addEventListener("click", () => {
            element.remove();
        });
    }
    /**
     * Returns the container for the notification.
     * If the container does not exist, creates and returns a new container.
     *
     * @param properties
     * @private
     */
    static createContainer(properties) {
        const selector = "notify-" + properties.position;
        let container = document.querySelector("." + selector);
        if (!container) {
            container = this.createElement(this.container, selector);
            document.body.append(container);
        }
        return container;
    }
    /**
     * Creates the new notification.
     *
     * @param properties
     * @private
     */
    static createNotify(properties) {
        const element = this.createElement(this.notify, "animate__animated", "animate__" + properties.animationIn, "notify-" + properties.type);
        element.notify = {
            ...properties,
            pic: this.createIcon(),
            description: this.createDescription(properties),
            progressbar: this.createProgressbar(properties),
        };
        element.style.animationDuration = element.notify.animationDuration + "ms";
        element.append(element.notify.pic, element.notify.description, element.notify.progressbar);
        return element;
    }
    /**
     * Sets the lifetime of the notification.
     *
     * @param element
     * @param duration
     * @private
     */
    static setLifetime(element, duration) {
        element.notify.timeout = window.setTimeout(() => {
            element.classList.add("animate__" + element.notify.animationOut);
            setTimeout(() => {
                const containers = document.querySelectorAll("." + this.container);
                element.remove();
                containers.forEach((container) => {
                    !container.hasChildNodes() && container.remove();
                });
                element.notify.onHide && element.notify.onHide();
            }, element.notify.animationDuration);
        }, duration !== null && duration !== void 0 ? duration : element.notify.duration);
    }
    /**
     * Resets the lifetime of the notification.
     *
     * @param element
     * @private
     */
    static resetLifetime(element) {
        window.clearTimeout(element.notify.timeout);
    }
    /**
     * Toggles the progressbar from the default state to the descending state.
     *
     * @param element
     * @param duration
     * @private
     */
    static toggleProgressbar(element, duration = 0) {
        element.notify.progressbar.style.transitionDuration = duration + "ms";
        element.notify.progressbar.classList.toggle(this.progressbarToZero);
    }
    /**
     * Creates and returns a new HTML element with the specified list of classes.
     *
     * @param classList
     * @private
     */
    static createElement(...classList) {
        const element = document.createElement("div");
        element.classList.add(...classList);
        return element;
    }
    /**
     * Creates and returns a new notification icon.
     *
     * @private
     */
    static createIcon() {
        return this.createElement(this.icon);
    }
    /**
     * Creates and returns a new notification description.
     *
     * @param properties
     * @private
     */
    static createDescription(properties) {
        const description = this.createElement(this.description);
        description.innerHTML = properties.content;
        return description;
    }
    /**
     * Creates and returns a new notification progressbar.
     *
     * @param properties
     * @private
     */
    static createProgressbar(properties) {
        const progressbar = this.createElement(this.progressbar);
        progressbar.style.transitionDuration = properties.duration + "ms";
        setTimeout(() => {
            progressbar.classList.toggle(this.progressbarToZero);
        }, 100);
        return progressbar;
    }
}
exports.Notify = Notify;
/**
 * CSS selector for the notification container.
 *
 * @private
 */
Notify.container = "notify-container";
/**
 * CSS selector for the notification.
 *
 * @private
 */
Notify.notify = "notify-content";
/**
 * CSS selector for the notification icon.
 *
 * @private
 */
Notify.icon = "notify-icon";
/**
 * CSS selector for the notification description.
 *
 * @private
 */
Notify.description = "notify-description";
/**
 * CSS selector for the notification progressbar.
 *
 * @private
 */
Notify.progressbar = "notify-progressbar";
/**
 * CSS selector for the descending notification progressbar.
 *
 * @private
 */
Notify.progressbarToZero = "notify-progressbar-to-zero";
/**
 * Default settings.
 *
 * @private
 */
Notify._defaults = {
    content: "Content is missing!",
    position: "top",
    type: "success",
    animationIn: "flipInX",
    animationOut: "flipOutX",
    duration: 10000,
    animationDuration: 750,
    timeout: -1,
};
exports.default = Notify;
