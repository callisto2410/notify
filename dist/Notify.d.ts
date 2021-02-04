export interface NotifyElement extends HTMLElement {
    notify: NotifyDefaults & NotifyElements;
}
export interface NotifyElements {
    pic: HTMLElement;
    description: HTMLElement;
    progressbar: HTMLElement;
}
export interface NotifyProperties {
    /**
     * The content of the notification, the use of HTML code is allowed.
     */
    content: string;
    /**
     * Position of the notification on the screen.
     */
    position: NotifyPosition;
    /**
     * Animation when displaying a notification.
     */
    animationIn: NotifyAnimation;
    /**
     * Animation when hiding a notification.
     */
    animationOut: NotifyAnimation;
    /**
     * Duration of the notification display.
     */
    duration: number;
    /**
     * Duration of the notification animation.
     */
    animationDuration: number;
    /**
     * The lifecycle hook is called when creating a notification.
     */
    onShow?(): void;
    /**
     * The lifecycle hook is called when a notification is deleted.
     */
    onHide?(): void;
}
export interface NotifyDefaults extends NotifyProperties {
    type: NotifyType;
    timeout: number;
}
export declare type NotifyPosition = "top-left" | "top" | "top-end" | "bottom-left" | "bottom" | "bottom-right";
export declare type NotifyType = "success" | "info" | "warning" | "error";
export declare type NotifyAnimation = "bounce" | "flash" | "pulse" | "rubberBand" | "shakeX" | "shakeY" | "headShake" | "swing" | "tada" | "wobble" | "jello" | "heartBeat" | "backInDown" | "backInLeft" | "backInRight" | "backInUp" | "backOutDown" | "backOutLeft" | "backOutRight" | "backOutUp" | "bounceIn" | "bounceInDown" | "bounceInLeft" | "bounceInRight" | "bounceInUp" | "bounceOut" | "bounceOutDown" | "bounceOutLeft" | "bounceOutRight" | "bounceOutUp" | "fadeIn" | "fadeInDown" | "fadeInDownBig" | "fadeInLeft" | "fadeInLeftBig" | "fadeInRight" | "fadeInRightBig" | "fadeInUp" | "fadeInUpBig" | "fadeInTopLeft" | "fadeInTopRight" | "fadeInBottomLeft" | "fadeInBottomRight" | "fadeOut" | "fadeOutDown" | "fadeOutDownBig" | "fadeOutLeft" | "fadeOutLeftBig" | "fadeOutRight" | "fadeOutRightBig" | "fadeOutUp" | "fadeOutUpBig" | "fadeOutTopLeft" | "fadeOutTopRight" | "fadeOutBottomRight" | "fadeOutBottomLeft" | "flip" | "flipInX" | "flipInY" | "flipOutX" | "flipOutY" | "lightSpeedInRight" | "lightSpeedInLeft" | "lightSpeedOutRight" | "lightSpeedOutLeft" | "rotateIn" | "rotateInDownLeft" | "rotateInDownRight" | "rotateInUpLeft" | "rotateInUpRight" | "rotateOut" | "rotateOutDownLeft" | "rotateOutDownRight" | "rotateOutUpLeft" | "rotateOutUpRight" | "hinge" | "jackInTheBox" | "rollIn" | "rollOut" | "zoomIn" | "zoomInDown" | "zoomInLeft" | "zoomInRight" | "zoomInUp" | "zoomOut" | "zoomOutDown" | "zoomOutLeft" | "zoomOutRight" | "zoomOutUp" | "slideInDown" | "slideInLeft" | "slideInRight" | "slideInUp" | "slideOutDown" | "slideOutLeft" | "slideOutRight" | "slideOutUp";
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
export declare class Notify {
    /**
     * CSS selector for the notification container.
     *
     * @private
     */
    private static readonly container;
    /**
     * CSS selector for the notification.
     *
     * @private
     */
    private static readonly notify;
    /**
     * CSS selector for the notification icon.
     *
     * @private
     */
    private static readonly icon;
    /**
     * CSS selector for the notification description.
     *
     * @private
     */
    private static readonly description;
    /**
     * CSS selector for the notification progressbar.
     *
     * @private
     */
    private static readonly progressbar;
    /**
     * CSS selector for the descending notification progressbar.
     *
     * @private
     */
    private static readonly progressbarToZero;
    /**
     * Default settings.
     *
     * @private
     */
    private static _defaults;
    /**
     * Default settings.
     *
     * @param properties
     */
    static set defaults(properties: Partial<NotifyProperties>);
    /**
     * The success notification.
     *
     * @param content Content of the notification. HTML is allowed.
     * @param properties Additional notification properties.
     */
    static success(content: string, properties?: Partial<NotifyProperties>): void;
    /**
     * The info notification.
     *
     * @param content Content of the notification. HTML is allowed.
     * @param properties Additional notification properties.
     */
    static info(content: string, properties?: Partial<NotifyProperties>): void;
    /**
     * The warning notification.
     *
     * @param content Content of the notification. HTML is allowed.
     * @param properties Additional notification properties.
     */
    static warning(content: string, properties?: Partial<NotifyProperties>): void;
    /**
     * The error notification.
     *
     * @param content Content of the notification. HTML is allowed.
     * @param properties Additional notification properties.
     */
    static error(content: string, properties?: Partial<NotifyProperties>): void;
    /**
     * Deletes all notifications immediately.
     */
    static remove(): void;
    /**
     * Deletes all notifications using animation.
     */
    static clear(): void;
    /**
     * Creates the new notification.
     *
     * @param properties
     * @private
     */
    private static create;
    /**
     * Sets the necessary event listeners.
     *
     * @param element
     * @private
     */
    private static setListeners;
    /**
     * Returns the container for the notification.
     * If the container does not exist, creates and returns a new container.
     *
     * @param properties
     * @private
     */
    private static createContainer;
    /**
     * Creates the new notification.
     *
     * @param properties
     * @private
     */
    private static createNotify;
    /**
     * Sets the lifetime of the notification.
     *
     * @param element
     * @param duration
     * @private
     */
    private static setLifetime;
    /**
     * Resets the lifetime of the notification.
     *
     * @param element
     * @private
     */
    private static resetLifetime;
    /**
     * Toggles the progressbar from the default state to the descending state.
     *
     * @param element
     * @param duration
     * @private
     */
    private static toggleProgressbar;
    /**
     * Creates and returns a new HTML element with the specified list of classes.
     *
     * @param classList
     * @private
     */
    private static createElement;
    /**
     * Creates and returns a new notification icon.
     *
     * @private
     */
    private static createIcon;
    /**
     * Creates and returns a new notification description.
     *
     * @param properties
     * @private
     */
    private static createDescription;
    /**
     * Creates and returns a new notification progressbar.
     *
     * @param properties
     * @private
     */
    private static createProgressbar;
}
export default Notify;
