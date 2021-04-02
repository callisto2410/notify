import "../../node_modules/animate.css/animate.css";

import "../../src/notify.scss";
import "./main.scss";

import Notify, {NotifyPosition} from "../../src/notify";

Notify.defaults = {
    duration: 15000,
};

document.body.addEventListener("click", (event: Event) => {
    const target = event.target as HTMLDivElement | null;
    if (!target) return;

    if (target.classList.contains("content-button--notify")) {
        let {
            type,
            position,
        } = target.dataset;

        if (!position) position = "top";

        switch (type) {
            case "success":
                Notify.success("For example, when designing a brochure or book, a designer ...");
                break;
            case "info":
                Notify.info("For example, when designing a brochure or book, a designer ...");
                break;
            case "warning":
                Notify.warning("For example, when designing a brochure or book, a designer ...");
                break;
            case "error":
                Notify.error("For example, when designing a brochure or book, a designer ...");
                break;
            default:
                const random = Math.floor((Math.random() * 4));
                let method = Notify.success.bind(Notify);

                if (random === 1) method = Notify.info.bind(Notify);
                if (random === 2) method = Notify.warning.bind(Notify);
                if (random === 3) method = Notify.error.bind(Notify);

                method(`<strong>For example:</strong> When designing a brochure or book, a designer ...`, {
                    position: position as NotifyPosition,
                    duration: 5000,
                });
        }
    }

    if (target.classList.contains("content-button--control")) {
        if (target.classList.contains("remove")) Notify.remove();
        if (target.classList.contains("clear")) Notify.clear();
    }
});
