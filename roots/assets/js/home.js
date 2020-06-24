
const numbersdata='https://api.covid19india.org/data.json';
const newsurl='http://newsapi.org/v2/top-headlines?country=in&apiKey=7e754275e858439ea61a252d83d646b3';
async function  getdata(){

   const response= await fetch(numbersdata);
    const json =await response.json();
    const {statewise}=json;
   console.log(statewise)


   var col = [];
       for (var i = 0; i < statewise.length; i++) {
           delete statewise[i]._id
           delete statewise[i].deltaconfirmed
           delete statewise[i].deltadeaths
           delete statewise[i].deltarecovered
           delete statewise[i].lastupdatedtime
           delete statewise[i].migrated
           delete statewise[i].statecode
           delete statewise[i].statenotes
           delete statewise[i].migratedother

           for (var key in statewise[i]) {
               if (col.indexOf(key) === -1) {
                   col.push(key);
               }
           }
       }

       var table = document.createElement("table");

       // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

       var tr = table.insertRow(-1);                   // TABLE ROW.

       var th = document.createElement("th");      // TABLE HEADER.
       th.innerHTML = col[4];
       tr.appendChild(th);

       var th = document.createElement("th");      // TABLE HEADER.
       th.innerHTML = col[1];
       tr.appendChild(th);

       var th = document.createElement("th");      // TABLE HEADER.
       th.innerHTML = col[0];
       tr.appendChild(th);

       for (var i = 2; i <col.length-1 ; i++) {
           var th = document.createElement("th");      // TABLE HEADER.
           th.innerHTML = col[i];
           tr.appendChild(th);
       }

       // ADD JSON DATA TO THE TABLE AS ROWS.
       for (var i = 1; i < statewise.length; i++) {

           tr = table.insertRow(-1);
           var tabCell = tr.insertCell(-1);
           tabCell.innerHTML = statewise[i][col[4]];


           var tabCell = tr.insertCell(-1);
           tabCell.innerHTML = statewise[i][col[1]];


           var tabCell = tr.insertCell(-1);
           tabCell.innerHTML = statewise[i][col[0]];

           for (var j = 2; j < col.length-1; j++) {
               var tabCell = tr.insertCell(-1);
               tabCell.innerHTML = statewise[i][col[j]];
           }
       }

       //last row for total cases
       /*tr = table.insertRow(-1);
       var tabCell = tr.insertCell(-1);
       tabCell.innerHTML = statewise[0][col[4]];

       var tabCell = tr.insertCell(-1);
       tabCell.innerHTML = statewise[0][col[1]];

       var tabCell = tr.insertCell(-1);
       tabCell.innerHTML = statewise[0][col[0]];

       for (var j = 2; j < col.length-1; j++){
       var tabCell = tr.insertCell(-1);
       tabCell.innerHTML = statewise[0][col[j]];
     }*/

       // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
       var divContainer = document.getElementById("showData");
       divContainer.innerHTML = "";
       divContainer.appendChild(table);

}
getdata();

async function news(){
 const response= await fetch(newsurl);
  const news =await response.json();
  const articles= news.articles;

  console.log(articles[0].title);
}

news();
