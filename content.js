console.log('content.js loaded');


const getNumberReaction = (str) => {
    const regex = /Tất cả cảm xúc:\s*(\d+)/;

    const match = str.match(regex);

    if (match) {
        return parseInt(match[1], 10);
    } 
    return 0
}

const process_get_all_post_facebook =  new Promise((resolve, reject) => {
    const post_elements = []
    setTimeout(() => {
        const posts = document.querySelectorAll('div[class="x1yztbdb x1n2onr6 xh8yej3 x1ja2u2z"]')
        
        const name = posts[0].getElementsByClassName('html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs')[0].innerText
        const profile_owner_post = posts[0].querySelector('a[role="link"]').href.split("/")[6]
        const content = posts[0].getElementsByClassName('x1iorvi4 x1pi30zi x1l90r2v x1swvt13')[0].innerText
        
        const links_images = []
        const tag_img = posts[0].getElementsByTagName('img')
        for(let j = 0; j < tag_img.length; j++){
            if(tag_img[j].getAttribute('src').includes("https://scontent.") ){
                links_images.push(tag_img[j].getAttribute('src'))
        }

        const str_reactions = posts[0].getElementsByClassName('x6s0dn4 xi81zsa x78zum5 x6prxxf x13a6bvl xvq8zen xdj266r xat24cr x1d52u69 xktsk01 x889kno x1a8lsjc xkhd6sd x4uap5 x80vd3b x1q0q8m5 xso031l')[0].innerText
        const number_reactions = getNumberReaction(str_reactions)   

        // Crawl Comments 
        const comments = document.querySelectorAll('div[class="html-div x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1gslohp"] div')
        for(let i = 0; i < comments.length; i++){
            
        }    
    }
        // resolve()
    }, 5000)
}
)

process_get_all_post_facebook.then((result) => {
    console.log("Done")
})