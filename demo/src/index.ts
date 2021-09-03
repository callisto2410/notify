import 'animate.css';

import './index.scss';

import '../../src/index.scss';
import {Notify, NotifyPosition} from '../../src';

let notify = new Notify({
    duration: 20000,
});

document.body.addEventListener('click', (event: Event) => {
    let target = event.target as HTMLDivElement | null;
    if (!target) return;

    if (target.classList.contains('content-button--notify')) {
        let {
            type,
            position,
        } = target.dataset;

        !position && (position = 'top');

        switch (type) {
            case 'success':
                notify.success('For example, when designing a brochure or book, a designer ...');
                break;
            case 'info':
                notify.info('For example, when designing a brochure or book, a designer ...');
                break;
            case 'warning':
                notify.warning('For example, when designing a brochure or book, a designer ...');
                break;
            case 'error':
                notify.error('For example, when designing a brochure or book, a designer ...');
                break;
            default:
                let random = Math.floor((Math.random() * 4));
                let method = notify.success.bind(notify);

                random === 1 && (method = notify.info.bind(notify));
                random === 2 && (method = notify.warning.bind(notify));
                random === 3 && (method = notify.error.bind(notify));

                method(`<strong>For example:</strong> When designing a brochure or book, a designer ...`, {
                    position: position as NotifyPosition,
                    duration: 10000,
                });
        }
    }

    if (target.classList.contains('content-button--control')) {
        target.classList.contains('content-button--remove') && notify.remove();
        target.classList.contains('content-button--clear') && notify.clear();
        target.classList.contains('content-button--toggle-wallpaper') && document.body.classList.toggle('use-wallpaper');
    }
});
