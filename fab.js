class Blur {
    div;
    constructor(message, targetButton) {
        const oBody = window.top?.document.querySelector("body");
        this.div = window.top?.document.createElement("div");
        this.div.id = "blurred_background";

        // Get button position
        const buttonRect = targetButton.getBoundingClientRect();
        const modalWidth = 300; // Approximate width of chat box
        const margin = 10; // Space between button and chat box

        // Calculate modal position near the button
        let leftPosition = buttonRect.right + margin; // Align to the right of the button
        let topPosition = buttonRect.top;

        // Prevent going off-screen on the right
        if (leftPosition + modalWidth > window.innerWidth) {
            leftPosition = buttonRect.left - modalWidth - margin; // Move to the left if needed
        }

        // Prevent going off-screen on the top
        if (topPosition + 200 > window.innerHeight) { // 200px is an estimated modal height
            topPosition = window.innerHeight - 200 - margin;
        }

        this.div.innerHTML = `
        <style>
        #blurred_background {
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
            top: 5px;
            right: 5px;
            background: red;
            color: white;
            border: none;
            padding: 5px;
            cursor: pointer;
            border-radius: 5px;
        }
        </style>
        <div id="modal_container">
            <button id="clear${suffix}">❌</button>
            ${message}
        </div>`;

        oBody?.insertAdjacentElement("afterbegin", this.div);
    }
    close(){
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
        font-size: 0.8em;
        padding: 0.6em 1em;
        z-index: 1000;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    </style>
    <button id="fab${suffix}">Order Here</button>
`);

document.querySelector(`#fab${suffix}`).addEventListener("click", evt => {
    const blur = new Blur(`<div><x-chat /></div>`, evt.target);
    document.querySelector(`#clear${suffix}`).addEventListener("click", () => blur.close());
});
