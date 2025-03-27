class Blur {
    div;
    constructor(message, targetButton) {
        const oBody = window.top?.document.querySelector("body");
        this.div = window.top?.document.createElement("div");
        this.div.id = "blurred_background";

        // Get button position
        const buttonRect = targetButton.getBoundingClientRect();
        const modalWidth = 300; // Approximate width of the chat box
        const margin = 10; // Space between button and chat box

        // Calculate modal position
        let leftPosition = buttonRect.right - modalWidth; // Align to the right
        let topPosition = buttonRect.top - margin;

        // Prevent going out of bounds
        if (leftPosition < 0) leftPosition = margin; // Keep inside viewport

        this.div.innerHTML = `<style>
        #blurred_background {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            backdrop-filter: blur(8px);
            z-index: 1001;
        }
        #modal_container {
            position: absolute;
            top: ${topPosition}px;
            left: ${leftPosition}px;
            width: ${modalWidth}px;
            background: white;
            padding: 1em;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        #clear${suffix} {
            position: absolute;
            top: -1em;
            right: 1em;
        }
        </style>
        <div id="modal_container">${message}</div>`;

        oBody?.insertAdjacentElement("afterbegin", this.div);
    }
    close(){
        this.div.remove();
    }
}

const suffix = (Math.random() * 100).toFixed().toString();

document.querySelector("body").insertAdjacentHTML("beforeend", `
    <style>
    #button_container {
        position: relative;
        display: inline-block;
    }
    #fab${suffix} {
        position: fixed;
        bottom: 1em;
        right: 1em;
        font-size: 0.8em;
        padding: 0.3em 0.6em;
        z-index: 1000;
    }
    </style>
    <div id="button_container">
        <button id="fab${suffix}">Order Here</button>
    </div>
`);

document.querySelector(`#fab${suffix}`).addEventListener("click", evt => {
    const blur = new Blur(`<div><x-chat /></div><button id="clear${suffix}">clear</button>`, evt.target);
    document.querySelector(`#clear${suffix}`).addEventListener("click", () => blur.close());
});
