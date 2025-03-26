const suffix = (Math.random()*100).toFixed().toString();

document.querySelector("body").insertAdjacentHTML("beforeend", `
    <style>
    #fab${suffix}, #modal${suffix} {
        position: absolute;
        bottom: 1em;
        right: 1em;
    }
    #fab${suffix} {
        font-size: 1em;
        padding: 0.5em 1em;
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

