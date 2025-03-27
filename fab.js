class Blur {
    div;
    constructor(message) {
        const oBody = window.top?.document.querySelector("body");
        this.div = window.top?.document.createElement("div");
        this.div.id = "blurred_background";
        this.div.innerHTML = `<style>
        #blurred_background{
            position:absolute;
            top:0;
            left:0;
            height:100vh;
            width:100vw;
            backdrop-filter: blur(8px);
            z-index:1001;
        }
        #blurred_background p{
            display: -webkit-box;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
        }
        #blurred_background div{
            padding: 0 1em;
        }
        </style>
        <div>${message}</div>`;
        oBody?.insertAdjacentElement("afterbegin", this.div);
    }
    close(){
        this.div.remove();
    }
}

const suffix = (Math.random() * 100).toFixed().toString();

// Inject styles to position the chat correctly
document.querySelector("body").insertAdjacentHTML("beforeend", `
    <style>
    /* Floating button - stays at bottom-right */
    #fab${suffix} {
        position: fixed;
        bottom: 1em;
        right: 1em;
        font-size: 1em;
        padding: 0.5em 1em;
        z-index: 1000;
        background-color: #ff4500; /* Customize */
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    /* Chat modal - positioned close to the button */
    #modal${suffix} {
        position: fixed;
        bottom: 4em; /* Just above the button */
        right: 1em;
        width: 350px;
        background: white;
        padding: 1em;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        display: none; /* Initially hidden */
        z-index: 1001;
    }

    /* Close button inside chat */
    #clear${suffix} {
        position: absolute;
        top: 5px;
        right: 10px;
        background: none;
        border: none;
        font-size: 1em;
        cursor: pointer;
    }
    </style>

    <button id="fab${suffix}">Order Here</button>
    <div id="modal${suffix}">
        <button id="clear${suffix}">×</button>
        <div><x-chat /></div>
    </div>
`);

// Get references to elements
const orderButton = document.querySelector(`#fab${suffix}`);
const chatModal = document.querySelector(`#modal${suffix}`);
const closeButton = document.querySelector(`#clear${suffix}`);

// Toggle chat visibility
orderButton.addEventListener("click", () => {
    chatModal.style.display = chatModal.style.display === "none" ? "block" : "none";
});

// Close chat
closeButton.addEventListener("click", () => {
    chatModal.style.display = "none";
});
