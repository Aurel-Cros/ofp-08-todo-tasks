/*
Options format :
{
    content: "Text content of the element",
    attributes: [
        class: "text",
        id: "presentation",
        ...
    ]
}

*/
class MakeElement {
    create(tagName, options = {}) {
        this.options = options;
        this.build(tagName);
        this.addContent();
        this.addAttributes();

        return this.element;
    }
    build(tag) {
        this.element = document.createElement(tag);
    }
    addContent() {
        this.element.textContent = this.options.content;
    }
    addAttributes() {
        this.options.attributes?.forEach((attribute) => {
            this.element.setAttribute(attribute.name, attribute.value);
        })
    }
}
export { MakeElement };