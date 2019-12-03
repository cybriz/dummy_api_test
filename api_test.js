fetch('https://jsonplaceholder.typicode.com/comments').then(resp => resp.json()).then(repos => {
    let postId = repos.map(itm => itm.postId);

    let map = postId.reduce(function (p, c) {
        p[c] = (p[c] || 0) + 1;
        return p;
    }, {});

    let sortedByNumberOfComments = Object.keys(map).sort(function (a, b) {
        return a - b;
    });
    
    let limitTopFivePostIds = sortedByNumberOfComments.slice(0, 5)
    
    for(let i=0; i < limitTopFivePostIds.length; i++) {
        getFromAPI(`https://jsonplaceholder.typicode.com/posts/${limitTopFivePostIds[i]}`, getData)
    }
    
    //sub function
    function getFromAPI(url, callback) {
        let obj;
        return fetch(url)
            .then(response => response.json())
            .then(result => obj = result)
            .then(() => callback(obj))
    }
    
    //   async function getFromAPI(url, callback) {
    //     try{
    //       const response = await fetch(url)
    //       const json = await response.json();
    //       console.log("async/await based");
    //       console.log(json);
    //     } catch (e) {
    //       console.log(e);
    //     }
    // }
    
    let data = [];
    function getData(res) {
        data.push(res);
        
        data.sort((a,b)=>{return parseFloat(a.id) - parseFloat(b.id);})
        
        let results = "";
        data.forEach( (x) => {
            results += "<p> Id: " + x.id + "<ul>"
            Object.keys(x).forEach( (p) => {
                results += "<li>" + (p + ": " + x[p]) + "</li>";
            });
            results += "</ul> </p> <hr>"
        })
        results += "";
        document.getElementById("myDiv").innerHTML = results;
    }
}).catch(e => {
    console.error(e);
})

