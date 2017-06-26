# vue.js-Order-Projrect
order project with vue.js and node.js (express.js)

it's very simple example of SPA on Vuejs, with login form 
(but login writed simple without token - do not use this in production. If you want to create login form to prod, you need to save token in express).

Also it's bad idea to use jquery in project, because if you want to send your request to anather domain (express.js use default port 
3000, and Vue think that it's another domain you must install vue-resourse and tune your backend CORS (i'll rewrite this in my project soon))

But if you want to see how you can fast create a project with backend and MySql - see this.
