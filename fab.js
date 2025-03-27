class Blur {
    div;
    constructor(message) {
        const oBody = window.top?.document.querySelector("body");
        this.div = window.top?.document.createElement("div");
        this.div.id = "blurred_background";
        this.div.innerHTML = `<style>
        #blurred_background{
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            backdrop-filter: blur(8px);
            z-index: 1001;
        }
        </style>
        <div>${message}</div>`;
        oBody?.insertAdjacentElement("afterbegin", this.div);
    }
    close() {
        this.div.remove();
    }
}

const suffix = (Math.random() * 100).toFixed().toString();

document.querySelector("body").insertAdjacentHTML("beforeend", `
    <style>
    #fab${suffix}, #modal${suffix} {
        position: fixed;
        bottom: 1em;
        right: 1em;
        font-size: 0.8em;
        padding: 0.3em 0.6em;
        z-index: 1002;
    }
    #clear${suffix} {
        position: absolute;
        top: -1em;
        right: 1em;
    }
    </style>
    <button id="fab${suffix}">Order Here</button>
`);

document.querySelector(`#fab${suffix}`).addEventListener("click", evt => {
    const blur = new Blur(`<div id="modal${suffix}"><div><x-chat /></div><button id="clear${suffix}">clear</button></div>`);
    document.querySelector(`#clear${suffix}`).addEventListener("click", () => blur.close());
});
