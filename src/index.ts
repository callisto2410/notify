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

export type NotifyPosition = 'top-left' | 'top' | 'top-end' | 'bottom-left' | 'bottom' | 'bottom-right';

export type NotifyType = 'success' | 'info' | 'warning' | 'error';

export type NotifyAnimation =
    | 'bounce' | 'flash' | 'pulse' | 'rubberBand' | 'shakeX' | 'shakeY' | 'headShake' | 'swing' | 'tada' | 'wobble'
    | 'jello' | 'heartBeat' | 'backInDown' | 'backInLeft' | 'backInRight' | 'backInUp' | 'backOutDown' | 'backOutLeft'
    | 'backOutRight' | 'backOutUp' | 'bounceIn' | 'bounceInDown' | 'bounceInLeft' | 'bounceInRight' | 'bounceInUp'
    | 'bounceOut' | 'bounceOutDown' | 'bounceOutLeft' | 'bounceOutRight' | 'bounceOutUp' | 'fadeIn' | 'fadeInDown'
    | 'fadeInDownBig' | 'fadeInLeft' | 'fadeInLeftBig' | 'fadeInRight' | 'fadeInRightBig' | 'fadeInUp' | 'fadeInUpBig'
    | 'fadeInTopLeft' | 'fadeInTopRight' | 'fadeInBottomLeft' | 'fadeInBottomRight' | 'fadeOut' | 'fadeOutDown'
    | 'fadeOutDownBig' | 'fadeOutLeft' | 'fadeOutLeftBig' | 'fadeOutRight' | 'fadeOutRightBig' | 'fadeOutUp'
    | 'fadeOutUpBig' | 'fadeOutTopLeft' | 'fadeOutTopRight' | 'fadeOutBottomRight' | 'fadeOutBottomLeft' | 'flip'
    | 'flipInX' | 'flipInY' | 'flipOutX' | 'flipOutY' | 'lightSpeedInRight' | 'lightSpeedInLeft' | 'lightSpeedOutRight'
    | 'lightSpeedOutLeft' | 'rotateIn' | 'rotateInDownLeft' | 'rotateInDownRight' | 'rotateInUpLeft' | 'rotateInUpRight'
    | 'rotateOut' | 'rotateOutDownLeft' | 'rotateOutDownRight' | 'rotateOutUpLeft' | 'rotateOutUpRight' | 'hinge'
    | 'jackInTheBox' | 'rollIn' | 'rollOut' | 'zoomIn' | 'zoomInDown' | 'zoomInLeft' | 'zoomInRight' | 'zoomInUp'
    | 'zoomOut' | 'zoomOutDown' | 'zoomOutLeft' | 'zoomOutRight' | 'zoomOutUp' | 'slideInDown' | 'slideInLeft'
    | 'slideInRight' | 'slideInUp' | 'slideOutDown' | 'slideOutLeft' | 'slideOutRight' | 'slideOutUp';

export class Notify {
    /**
     * CSS selector for the notification container.
     *
     * @private
     */
    private readonly container = 'notify-container';

    /**
     * CSS selector for the notification.
     *
     * @private
     */
    private readonly notify = 'notify-content';

    /**
     * CSS selector for the notification icon.
     *
     * @private
     */
    private readonly icon = 'notify-content__icon';

    /**
     * CSS selector for the notification description.
     *
     * @private
     */
    private readonly description = 'notify-content__description';

    /**
     * CSS selector for the notification progressbar.
     *
     * @private
     */
    private readonly progressbar = 'notify-content__progressbar';

    /**
     * CSS selector for the descending notification progressbar.
     *
     * @private
     */
    private readonly progressbarToZero = 'notify-content__progressbar--to-zero';

    /**
     * Default settings.
     *
     * @private
     */
    private readonly defaults: NotifyDefaults = {
        content: 'Content is missing!',
        position: 'top',
        animationIn: 'flipInX',
        animationOut: 'flipOutX',
        duration: 15000,
        animationDuration: 750,
        type: 'success',
        timeout: -1,
    };

    /**
     * Notify constructor.
     *
     * @param properties
     */
    constructor(properties: Partial<NotifyProperties> = {}) {
        this.defaults = {
            ...this.defaults,
            ...properties,
        };
    }

    /**
     * The success notification.
     *
     * @param content Content of the notification. HTML is allowed.
     * @param properties Additional notification properties.
     */
    success(content: string, properties: Partial<NotifyProperties> = {}): void {
        this.create({
            ...this.defaults,
            ...properties,
            content: content,
            type: 'success',
        });
    }

    /**
     * The info notification.
     *
     * @param content Content of the notification. HTML is allowed.
     * @param properties Additional notification properties.
     */
    info(content: string, properties: Partial<NotifyProperties> = {}): void {
        this.create({
            ...this.defaults,
            ...properties,
            content: content,
            type: 'info',
        });
    }

    /**
     * The warning notification.
     *
     * @param content Content of the notification. HTML is allowed.
     * @param properties Additional notification properties.
     */
    warning(content: string, properties: Partial<NotifyProperties> = {}): void {
        this.create({
            ...this.defaults,
            ...properties,
            content: content,
            type: 'warning',
        });
    }

    /**
     * The error notification.
     *
     * @param content Content of the notification. HTML is allowed.
     * @param properties Additional notification properties.
     */
    error(content: string, properties: Partial<NotifyProperties> = {}): void {
        this.create({
            ...this.defaults,
            ...properties,
            content: content,
            type: 'error',
        });
    }

    /**
     * Deletes all notifications immediately.
     */
    remove(): void {
        const containers = document.querySelectorAll('.' + this.container) as NodeListOf<HTMLElement>;

        containers.forEach((container) => {
            container.remove();
        });
    }

    /**
     * Deletes all notifications using animation.
     */
    clear(): void {
        const containers = document.querySelectorAll('.' + this.container) as NodeListOf<HTMLElement>;

        containers.forEach((container) => {
            const elements = container.querySelectorAll('.' + this.notify) as NodeListOf<NotifyElement>;

            elements.forEach((element) => {
                Notify.resetLifetime(element);
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
    private create(properties: NotifyDefaults): void {
        const container = this.createContainer(properties);
        const element = this.createNotify(properties);

        this.setLifetime(element);
        this.setListeners(element);

        element.notify.position.startsWith('top')
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
    private setListeners(element: NotifyElement): void {
        element.addEventListener('mouseover', () => {
            Notify.resetLifetime(element);
            this.toggleProgressbar(element);
        });

        element.addEventListener('mouseout', () => {
            this.setLifetime(element);
            this.toggleProgressbar(element, element.notify.duration);
        });

        element.addEventListener('click', () => {
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
    private createContainer(properties: NotifyDefaults): HTMLElement {
        const selector = this.container + '--' + properties.position;
        let container = document.querySelector('.' + selector) as HTMLElement | null;

        if (!container) {
            container = Notify.createElement(this.container, selector);
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
    private createNotify(properties: NotifyDefaults): NotifyElement {
        const element = Notify.createElement(
            this.notify,
            'animate__animated',
            'animate__' + properties.animationIn,
            this.notify + '--' + properties.type,
        ) as NotifyElement;

        element.notify = {
            ...properties,
            pic: this.createIcon(),
            description: this.createDescription(properties),
            progressbar: this.createProgressbar(properties),
        };

        element.style.animationDuration = element.notify.animationDuration + 'ms';

        element.append(
            element.notify.pic,
            element.notify.description,
            element.notify.progressbar,
        );

        return element;
    }

    /**
     * Sets the lifetime of the notification.
     *
     * @param element
     * @param duration
     * @private
     */
    private setLifetime(element: NotifyElement, duration?: number): void {
        element.notify.timeout = window.setTimeout(() => {
            element.classList.add('animate__' + element.notify.animationOut);

            setTimeout(() => {
                const containers = document.querySelectorAll('.' + this.container) as NodeListOf<HTMLElement>;

                element.remove();
                containers.forEach((container) => {
                    !container.hasChildNodes() && container.remove();
                });

                element.notify.onHide && element.notify.onHide();
            }, element.notify.animationDuration);
        }, duration ?? element.notify.duration);
    }

    /**
     * Resets the lifetime of the notification.
     *
     * @param element
     * @private
     */
    private static resetLifetime(element: NotifyElement): void {
        window.clearTimeout(element.notify.timeout);
    }

    /**
     * Toggles the progressbar from the default state to the descending state.
     *
     * @param element
     * @param duration
     * @private
     */
    private toggleProgressbar(element: NotifyElement, duration: number = 0): void {
        element.notify.progressbar.style.transitionDuration = duration + 'ms';
        element.notify.progressbar.classList.toggle(this.progressbarToZero);
    }

    /**
     * Creates and returns a new HTML element with the specified list of classes.
     *
     * @param classList
     * @private
     */
    private static createElement(...classList: string[]): HTMLElement {
        const element = document.createElement('div');
        element.classList.add(...classList);

        return element;
    }

    /**
     * Creates and returns a new notification icon.
     *
     * @private
     */
    private createIcon(): HTMLElement {
        return Notify.createElement(this.icon);
    }

    /**
     * Creates and returns a new notification description.
     *
     * @param properties
     * @private
     */
    private createDescription(properties: NotifyDefaults): HTMLElement {
        const description = Notify.createElement(this.description);
        description.innerHTML = properties.content;

        return description;
    }

    /**
     * Creates and returns a new notification progressbar.
     *
     * @param properties
     * @private
     */
    private createProgressbar(properties: NotifyDefaults): HTMLElement {
        const progressbar = Notify.createElement(this.progressbar);
        progressbar.style.transitionDuration = properties.duration + 'ms';

        setTimeout(() => {
            progressbar.classList.toggle(this.progressbarToZero);
        }, 100);

        return progressbar;
    }
}
