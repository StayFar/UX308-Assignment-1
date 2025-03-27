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

const suffix = (Math.random()*100).toFixed().toString();

document.querySelector("body").insertAdjacentHTML("beforeend", `
    <style>
    /* Make "Order Here" button move with scrolling */
    #fab${suffix} {
        position: fixed; /* Stays in place when scrolling */
        bottom: 1em;
        right: 1em;
        font-size: 0.9em;
        padding: 0.4em 0.8em;
        z-index: 1000; /* Ensures it stays above other elements */
    }
    
    /* Keep chat modal position unchanged */
    #modal${suffix} {
        position: absolute; /* Stays within the blurred background */
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 1em;
        border-radius: 8px;
        box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
    }
    #clear${suffix} {
        position: absolute;
        top: -1em;
        right: 1em;
    }
    </style>
    <button id="fab${suffix}">Order Here</button>
    `);

document.querySelector(`#fab${suffix}`).addEventListener("click", evt=>{
    const blur = new Blur(`<div id="modal${suffix}"><div><x-chat /></div><button id="clear${suffix}">clear</button></div>`);
    document.querySelector(`#clear${suffix}`).addEventListener("click", () => blur.close());
});
