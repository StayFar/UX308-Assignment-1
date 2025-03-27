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

document.querySelector("body").insertAdjacentHTML("beforeend", `
    <style>
    /* Keep "Order Here" button in bottom-right corner */
    #fab${suffix} {
        position: fixed;
        bottom: 1em;
        right: 1em;
        font-size: 0.9em;
        padding: 0.4em 0.8em;
        z-index: 1000;
    }

    /* Position chat modal near the button */
    #modal${suffix} {
        position: fixed;
        bottom: 4em; /* Slightly above the button */
        right: 1em;
        width: 320px; /* Adjust as needed */
        background: white;
        padding: 1em;
        border-radius: 8px;
        box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
    }

    /* Style the clear button */
    #clear${suffix} {
        position: absolute;
        top: -1em;
        right: 1em;
    }
    </style>
    <button id="fab${suffix}">Order Here</button>
`);

document.querySelector(`#fab${suffix}`).addEventListener("click", evt => {
    const blur = new Blur(`
        <div id="modal${suffix}">
            <div><x-chat /></div>
            <button id="clear${suffix}">clear</button>
        </div>
    `);
    document.querySelector(`#clear${suffix}`).addEventListener("click", () => blur.close());
});
