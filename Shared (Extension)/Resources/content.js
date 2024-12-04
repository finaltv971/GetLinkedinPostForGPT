function extractPostData(post) {
    return {
        UrlPost: post.querySelector('.update-components-actor__meta-link')?.href || '',
        Username: post.querySelector('.update-components-actor__title span[aria-hidden="true"]')?.innerText || '',
        Post: post.querySelector('.update-components-text')?.innerText || '',
        NbJaime: post.querySelector('.social-details-social-counts__reactions .social-details-social-counts__social-proof-container .social-details-social-counts__social-proof-fallback-number')?.innerText || '0',
        NbRepublication: post.querySelector('.social-details-social-counts__item--truncate-text')?.innerText.split(' ')[0] || '0', 
        NbCommentaire: post.querySelector('.social-details-social-counts__comments .social-details-social-counts__count-value')?.innerText.split(' ')[0] || '0'
    };
}

document.addEventListener('mouseover', function(event) {
    const post = event.target.closest('.feed-shared-update-v2');
    if (post) {
        if (!post.querySelector('.analyse-button')) {
            const button = document.createElement('button');
            button.innerText = 'Analyser';
            button.className = 'analyse-button';
            button.style.position = 'absolute';
            button.style.top = '10px';
            button.style.right = '10px';
            button.style.backgroundColor = '#0073b1';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.padding = '5px 10px';
            button.style.borderRadius = '5px';
            button.style.cursor = 'pointer';

            button.onclick = function() {
                const postData = extractPostData(post);
                browser.runtime.sendMessage({ action: 'analyzePost', data: postData });
                console.log('Post Data Sent:', postData);
            };

            post.style.position = 'relative';
            post.appendChild(button);
        }
    }
});
