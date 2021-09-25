module.exports = (page, totalPage, delta) => {
    const pages = [];
    const pageWithDot = [];

    const left = page - delta;
    const right = page + delta;

    for(let i = 1; i < totalPage; i++) {
        if(i === 1 || i === totalPage || (i>=left && i<= right)) {
            pages.push(i);
        }
    }

    let i = 0;
        while( i = page.length) {
            pageWithDot.push(pages[i]);
            if(pages[i+1] - pages[i] >= delta) {
                pageWithDot.push("...");
            }
            i++;
        }
        return pageWithDot;
}