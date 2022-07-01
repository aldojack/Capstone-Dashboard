export function createElement(type, options = {}) {
    const element = document.createElement(type);

    Object.entries(options).forEach(([key, value]) => {

        if (key === 'class') {
            value.forEach((className) => element.classList.add(className))
            return;
        }

        if (key === 'text') {
            element.textContent = value;
            return;
        }
        element.setAttribute(key, value);
    })
    return element;
}