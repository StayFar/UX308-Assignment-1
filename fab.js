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
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #modal${suffix} {
            position: fixed;
            bottom: 2em;
            right: 2em;
            background: white;
            padding: 1em;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1002;
        }
        #clear${suffix} {
            position: absolute;
            top: 10px;
            right: 10px;
            background: red;
            color: white;
            border: none;
            padding: 0.5em;
            cursor: pointer;
        }
        </style>
        <div id="modal${suffix}"><div><x-chat /></div><button id="clear${suffix}">Clear</button></div>`;
        oBody?.insertAdjacentElement("afterbegin", this.div);
    }
    close() {
        this.div.remove();
    }
}

const suffix = (Math.random() * 100).toFixed().toString();

document.querySelector("body").insertAdjacentHTML("beforeend", `
    <style>
    #fab${suffix} {
        position: fixed;
        bottom: 1em;
        right: 1em;
        font-size: 1em;
        padding: 0.5em 1em;
        background: blue;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1003;
    }
    </style>
    <button id="fab${suffix}">Order Here</button>
`);

document.querySelector(`#fab${suffix}`).addEventListener("click", evt => {
    const blur = new Blur();
    document.querySelector(`#clear${suffix}`).addEventListener("click", () => blur.close());
});
